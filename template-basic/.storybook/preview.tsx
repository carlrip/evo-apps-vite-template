import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
          {
            id: "heading-order",
            enabled: true,
          },
          {
            id: "aria-allowed-attr",
            enabled: true,
          },
          {
            id: "label",
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    initialGlobals: {
      viewport: { value: "ipad", isRotated: false },
    },
  },
  globalTypes: {
    language: {
      name: "Language",
      description: "Language for components",
      toolbar: {
        title: "Language",
        items: [
          { value: "en-GB", title: "English (GB)" },
          { value: "ro-RO", title: "Romanian (RO)" },
        ],
        dynamicTitle: true,
        icon: "globe",
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "access-dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
