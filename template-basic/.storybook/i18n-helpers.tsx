import React from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { useGlobals } from "storybook/internal/preview-api";
import { LANGUAGE_STORAGE_KEY, LOCAL_DIST } from "./constants";

export async function i18nInit() {
  const storedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  const startLang = storedLang ?? "en-GB";

  await i18next.init({
    fallbackLng: "en-GB",
    debug: false,
    lng: startLang,
  });

  return { i18n: i18next };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withI18n(story: any, context: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [globals] = useGlobals();
  const language = globals.language ?? "en-GB";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    async function doIt() {
      if (!context.loaded.i18n.hasResourceBundle(language, "translation")) {
        const translationsPath = `${LOCAL_DIST}/locales`;
        const translations = await loadTranslation({
          language,
          translationsPath,
        });
        context.loaded.i18n.addResourceBundle(
          language,
          "translation",
          translations
        );
      }

      context.loaded.i18n.changeLanguage(language);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      window.dispatchEvent(
        new CustomEvent("access-app-change-language", {
          detail: { language },
        })
      );
    }
    doIt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <I18nextProvider i18n={context.loaded.i18n}>{story()}</I18nextProvider>
  );
}

async function loadTranslation({
  language,
  translationsPath,
}: {
  language: string;
  translationsPath: string;
}) {
  try {
    const response = await fetch(
      `${translationsPath}/${language}/translation.json`
    );
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${language}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading translations for ${language}:`, error);
    return {};
  }
}
