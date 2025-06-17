import React from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { useGlobals } from "storybook/internal/preview-api";
import {
  registerAppRenderer,
  createEDSStylesheet,
} from "tbcaccess-app-renderer";
import { LANGUAGE_STORAGE_KEY, REGISTRY_URL } from "./constants";

export async function accessAppInit() {
  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  const startLang = storedLang ?? "en-GB";

  await i18next.init({
    fallbackLng: "en-GB",
    debug: false,
  });

  const evoStyleSheet = await createEDSStylesheet();
  await registerAppRenderer({
    registryUrl: REGISTRY_URL,
    evoStyleSheet,
    context: { token: "xyz" },
    defaultLanguage: startLang,
    i18n: i18next,
  });
  return { i18n: i18next };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAccessAppI18n(story: any, context: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [globals] = useGlobals();
  const language = globals.language;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    context.loaded.i18n.changeLanguage(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    window.dispatchEvent(
      new CustomEvent("access-app-change-language", {
        detail: { language },
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <I18nextProvider i18n={context.loaded.i18n}>{story()}</I18nextProvider>
  );
}
