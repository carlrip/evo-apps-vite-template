import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { mountInit } from "tbcaccess-apps-react-helpers";
import App from "./app.tsx";

const rootElement = document.getElementById("root")!;
const initResult = await mountInit({
  metaData: {
    code: {
      path: "./",
      i18n: { translationsPath: "locales" },
    },
  },
  defaultLanguage: "en-GB",
  rootElement,
});
createRoot(rootElement).render(
  <StrictMode>
    {initResult.i18n ? (
      <I18nextProvider i18n={initResult.i18n}>
        <App hostContext={{}} appContext={{}} />
      </I18nextProvider>
    ) : (
      <App hostContext={{}} appContext={{}} />
    )}
  </StrictMode>
);
