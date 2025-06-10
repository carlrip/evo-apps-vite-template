import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppOption } from "tbcaccess-apps-react-helpers";
import "./app.css";

function App({
  hostContext,
  appContext,
}: {
  hostContext: Record<string, unknown>;
  appContext: Record<string, unknown>;
}) {
  console.log(hostContext, appContext);
  const [count, setCount] = useState(0);
  const { t } = useTranslation();
  useAppOption((name) => {
    console.log(`option ${name} clicked`);
  });

  return (
    <div className="container">
      <h3 className="access-h3">{t("hello")}</h3>
      <button
        className="access-btn access-primary"
        onClick={() => setCount((count) => count + 1)}
      >
        {t("count", { count })}
      </button>
    </div>
  );
}

export default App;
