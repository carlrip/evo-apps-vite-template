import i18next, { type i18n } from "i18next";
import { initReactI18next } from "react-i18next";

const DEFAULT_LANGUAGE = "en-GB";
export const CHANGE_LANGUAGE_EVENT = "access-app-change-language";
export const CHANGED_LANGUAGE_EVENT = "access-app-changed-language";

export async function initializeI18next({
  defaultLanguage = DEFAULT_LANGUAGE,
  translationsPath,
}: {
  defaultLanguage?: string;
  translationsPath: string;
}): Promise<i18n> {
  const mfeI18n = i18next.createInstance();

  const initialTranslations = await loadTranslation({
    language: defaultLanguage,
    translationsPath,
  });

  await mfeI18n.use(initReactI18next).init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: false,
    resources: {
      [defaultLanguage]: { translation: initialTranslations },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

  return mfeI18n;
}

export async function changeLanguage({
  i18n,
  language,
  translationsPath,
  instanceId,
}: {
  i18n: i18n;
  language: string;
  translationsPath: string;
  instanceId: string;
}) {
  if (!i18n) {
    console.warn("i18n not initialized yet. Language change will be ignored.");
    return;
  }
  if (!i18n.hasResourceBundle(language, "translation")) {
    const translations = await loadTranslation({ language, translationsPath });
    i18n.addResourceBundle(language, "translation", translations);
  }
  await i18n.changeLanguage(language);
  window.dispatchEvent(
    new CustomEvent(CHANGED_LANGUAGE_EVENT, {
      detail: {
        language,
        instanceId,
      },
    }),
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
