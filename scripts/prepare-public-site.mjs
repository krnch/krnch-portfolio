// Package only the public portfolio. Admin and Worker sources remain in Git.
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, '.public-site');
if (existsSync(output)) throw new Error('Remove the previous generated .public-site directory before packaging again.');
const files = ['index.html', 'hobby.html', 'resume.pdf'];
for (const relative of files) {
  const stat = lstatSync(join(root, relative));
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Expected regular public file: ${relative}`);
}
const configPath = join(root, 'deploy/public.staticwebapp.config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
if (config.auth || config.navigationFallback) throw new Error('Public deployment must not require custom auth or bypass deny rules via fallback.');
for (const route of ['/admin*', '/api*', '/chatbot*', '/.auth*', '/.auth/login/aad', '/.auth/login/github']) {
  if (!config.routes.some(rule => rule.route === route && rule.statusCode === 404)) throw new Error(`Missing deny rule: ${route}`);
}
mkdirSync(output);
for (const relative of files) cpSync(join(root, relative), join(output, relative));
cpSync(configPath, join(output, 'staticwebapp.config.json'));
console.log('Prepared public portfolio, hobby page, resume and Free-compatible configuration. No admin or chatbot backend included.');