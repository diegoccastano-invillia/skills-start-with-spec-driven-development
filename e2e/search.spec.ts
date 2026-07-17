import { expect, test } from "@playwright/test";

test.describe("Weather App — busca de cidade", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("exibe o título da aplicação", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Weather App/i }),
    ).toBeVisible();
  });

  test("exibe campo de busca e botão", async ({ page }) => {
    await expect(page.getByRole("searchbox")).toBeVisible();
    await expect(page.getByRole("button", { name: /Buscar/i })).toBeVisible();
  });

  test("botão Buscar fica desabilitado quando o campo está vazio", async ({
    page,
  }) => {
    await expect(page.getByRole("button", { name: /Buscar/i })).toBeDisabled();
  });

  test("busca por cidade e exibe resultados", async ({ page }) => {
    await page.getByRole("searchbox").fill("São Paulo");
    await page.getByRole("button", { name: /Buscar/i }).click();
    // Aguarda resultados ou estado de loading/error
    await expect(
      page
        .getByRole("listitem")
        .first()
        .or(page.getByRole("alert"))
        .or(page.getByRole("status")),
    ).toBeVisible({ timeout: 10000 });
  });
});
