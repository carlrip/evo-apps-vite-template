import { type i18n } from "i18next";
import {
  initializeI18next,
  changeLanguage,
  CHANGE_LANGUAGE_EVENT,
} from "./i18n";

export async function mountInit({
  metaData,
  defaultLanguage,
  instanceId,
}: {
  metaData: {
    code: { path: string; i18n?: { translationsPath?: string } };
  };
  defaultLanguage: string;
  instanceId: string;
}) {
  const isLanguageIndependent = !!metaData.code.i18n;
  let translationsPath: string | undefined;
  let i18n: i18n | undefined;

  function changeLanguageHandler(event: Event) {
    if (event instanceof CustomEvent) {
      const language = event.detail.language as string;
      changeLanguage({
        i18n: i18n!,
        language,
        translationsPath: translationsPath!,
        instanceId,
      });
    }
  }

  if (isLanguageIndependent) {
    translationsPath = `${metaData.code.path}/${
      metaData.code.i18n!.translationsPath
    }`;
    i18n = await initializeI18next({ defaultLanguage, translationsPath });

    window.addEventListener(CHANGE_LANGUAGE_EVENT, changeLanguageHandler);
  }

  function cleanup() {
    if (isLanguageIndependent) {
      window.removeEventListener(CHANGE_LANGUAGE_EVENT, changeLanguageHandler);
    }
  }

  return { cleanup, i18n };
}
