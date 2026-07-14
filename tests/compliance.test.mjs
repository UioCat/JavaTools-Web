import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const readSource = (relativePath) => {
  const sourcePath = new URL(`../${relativePath}`, import.meta.url);
  return existsSync(sourcePath) ? readFileSync(sourcePath, "utf8") : "";
};

test("the homepage footer links the complete ICP number to the MIIT system", () => {
  const appPage = readSource("src/pages/app/index.vue");
  const footer = readSource("src/layouts/footer/index.vue");

  assert.match(appPage, /<Footer\s*\/>/);
  assert.match(footer, /href="https:\/\/beian\.miit\.gov\.cn\/"/);
  assert.match(footer, />\s*浙ICP备20005026号-1\s*</);
});

test("the bill feature is not exposed in the sidebar navigation", () => {
  const router = readSource("src/router.ts");
  const navigationDefinition = router.match(
    /export const table = \[([\s\S]*?)\]\.map/
  );

  assert.ok(navigationDefinition, "sidebar navigation definition must exist");
  assert.doesNotMatch(navigationDefinition[1], /title:\s*["']账单["']/);
  assert.match(router, /path:\s*["']consume["']/);
});

test("the browser title uses the same configured website name as the header", () => {
  const document = readSource("index.html");
  const header = readSource("src/layouts/header/index.vue");
  const main = readSource("src/main.ts");

  assert.doesNotMatch(document, /%VITE_APP_NAME%/);
  assert.match(header, /import\.meta\.env\.VITE_APP_NAME/);
  assert.match(
    main,
    /document\.title\s*=\s*import\.meta\.env\.VITE_APP_NAME/
  );
});
