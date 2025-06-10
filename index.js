#!/usr/bin/env node
import { execSync } from 'child_process';
import { cpSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templateDir = resolve(__dirname, 'template');
const targetDir = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

// Run Vite's create command for a React+TS app
execSync(`npm create vite@latest ${targetDir} -- --template react-ts`, { stdio: 'inherit' });

// Copy template files over the generated project
cpSync(templateDir, targetDir, { recursive: true });
