import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-col items-center justify-center p-4">
      <h3 className="text-2xl font-bold mb-4" data-testid="title">
        {t("hello")}
      </h3>
      <Button onClick={() => setCount((count) => count + 1)}>
        {t("count", { count })}
      </Button>
    </div>
  );
}

export default App;
