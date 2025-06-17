import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import App from "./app";
import {
  accessAppInit,
  withAccessAppI18n,
} from "../.storybook/access-app-helpers";
import { i18nInit, withI18n } from "../.storybook/i18n-helpers";
import { AccessApp } from "../.storybook/access-app";

const meta = {
  title: "Components/App",
  component: App,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  loaders: [i18nInit],
  decorators: [withI18n],
  args: {
    hostContext: {},
    appContext: {},
  },

  play: async ({ canvas }) => {
    expect(canvas.getByTestId("title")).toBeInTheDocument();
  },
};

export const InSpaces: Story = {
  loaders: [accessAppInit],
  decorators: [withAccessAppI18n],
  args: {
    hostContext: {},
    appContext: {},
  },
  render: () => {
    return <AccessApp shell="spaces" />;
  },
};
