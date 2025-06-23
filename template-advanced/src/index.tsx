import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { mountInit } from "./init.ts";
import App from "./app.tsx";

let reactRoot: ReturnType<typeof createRoot> | null = null;
let cleanup: () => void | undefined;

export async function mount({
  root: rootElement,
  hostContext,
  appContext,
  metaData,
  defaultLanguage,
}: {
  root: HTMLElement;
  hostContext: Record<string, unknown>;
  appContext: Record<string, unknown>;
  metaData: {
    code: { path: string; i18n?: { translationsPath?: string } };
  };
  defaultLanguage: string;
}) {
  const initResult = await mountInit({
    metaData,
    defaultLanguage,
    rootElement,
  });
  cleanup = initResult.cleanup;
  reactRoot = createRoot(rootElement);
  reactRoot.render(
    <StrictMode>
      {initResult.i18n ? (
        <I18nextProvider i18n={initResult.i18n}>
          <App hostContext={hostContext} appContext={appContext} />
        </I18nextProvider>
      ) : (
        <App hostContext={hostContext} appContext={appContext} />
      )}
    </StrictMode>
  );
  return { translate: (key: string) => initResult.i18n?.t(key) };
}

export function unmount() {
  if (cleanup) {
    cleanup();
  }
  if (reactRoot) {
    reactRoot.unmount();
    reactRoot = null;
  }
}
