import { useEffect } from "react";

export const useAppOption = (handler: (name: string) => void) => {
  useEffect(() => {
    const handleAccessAppOption = (event: CustomEvent) => {
      handler(event.detail.name);
    };

    window.addEventListener(
      "access-app-option",
      handleAccessAppOption as EventListener
    );

    return () => {
      window.removeEventListener(
        "access-app-option",
        handleAccessAppOption as EventListener
      );
    };
  }, []);
};
