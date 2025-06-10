#!/usr/bin/env node
import { execSync } from "child_process";
import { cpSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const templateDir = resolve(__dirname, "template");

if (!process.argv[2]) {
  console.error("Error: app name is required");
  console.error("Usage: npx evo-apps-vite-template <app-name>");
  process.exit(1);
}

const appName = process.argv[2];

// Validate app name for folder name compatibility
const isValidFolderName = (name) => {
  // Check for empty or whitespace-only names
  if (!name || /^\s*$/.test(name)) {
    return false;
  }

  // Check for invalid characters in folder names
  // Windows: \ / : * ? " < > |
  // Unix: / (forward slash)
  const invalidChars = /[\\/:*?"<>|]/;
  if (invalidChars.test(name)) {
    return false;
  }

  // Check for reserved names (Windows)
  const reservedNames = [
    "CON",
    "PRN",
    "AUX",
    "NUL",
    "COM1",
    "COM2",
    "COM3",
    "COM4",
    "COM5",
    "COM6",
    "COM7",
    "COM8",
    "COM9",
    "LPT1",
    "LPT2",
    "LPT3",
    "LPT4",
    "LPT5",
    "LPT6",
    "LPT7",
    "LPT8",
    "LPT9",
  ];
  if (reservedNames.includes(name.toUpperCase())) {
    return false;
  }

  return true;
};

if (!isValidFolderName(appName)) {
  console.error("Error: Invalid app name");
  console.error(
    'The app name must be a valid folder name and cannot contain any of these characters: \\ / : * ? " < > |'
  );
  console.error("It also cannot be a reserved name like CON, PRN, AUX, etc.");
  process.exit(1);
}

const appPath = resolve(appName);

// Run Vite's create command for a React+TS app
execSync(`npm create vite@latest ${appName} -- --template react-ts`, {
  stdio: "inherit",
});

// Copy template files over the generated project
cpSync(templateDir, appPath, { recursive: true });
