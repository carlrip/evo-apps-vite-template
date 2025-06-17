import { LOCAL, LOCAL_DIST } from "./constants";
export function AccessApp({ shell }: { shell?: string }) {
  return (
    // @ts-expect-error TODO
    <access-app
      esm-path={`${LOCAL_DIST}`}
      config-path={`${LOCAL}/access-app.config.json`}
      package-json-path={`${LOCAL}/package.json`}
      shell={shell}
    >
      {/* @ts-expect-error TODO */}
    </access-app>
  );
}
