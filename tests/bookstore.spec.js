import { test, expect } from "@playwright/test";
import fs from "fs";

test("Bookstore", async ({ page }) => {
  // Navigate to Login page
  await page.goto("https://demoqa.com/login");

  //login
  await page.fill("#userName", "Yasaswini");
  await page.fill("#password", "Yasaswini@01");
  await page.click("#login");
  //assertion
  await expect(page.locator("#userName-value")).toHaveText("Yasaswini");
  await expect(page.locator('//button[text()="Log out"]')).toBeVisible();

  //bookstore button
  await page.click(
    "(//ul[@class='menu-list']/li[span[normalize-space()='Book Store']])[1]"
  );
  await expect(page).toHaveURL("https://demoqa.com/books");
  //Search "Learning JavaScript Design Patterns"
  await page.click("#searchBox");
  await page.fill("#searchBox", "Learning JavaScript Design Patterns");
  //validation of search result
  await expect(
    page.locator('a:has-text("Learning JavaScript Design Patterns")')
  ).toBeVisible();
  //Print Title, Author and Publisher into a file
  await page.waitForSelector(
    'a:has-text("Learning JavaScript Design Patterns")'
  );

  // Locate the row
  const bookRow = page.locator("div.rt-tr-group", {
    hasText: "Learning JavaScript Design Patterns",
  });
  // Extract values
  const title = await bookRow.locator("div.rt-td").nth(0).innerText();
  const author = await bookRow.locator("div.rt-td").nth(1).innerText();
  const publisher = await bookRow.locator("div.rt-td").nth(2).innerText();

  // Write to file
  fs.writeFileSync(
    "book-details.txt",
    `Title: ${title}
Author: ${author}
Publisher: ${publisher}`
  );

  //logout
  await page.click('button:has-text("Log out")');
  await expect(page).toHaveURL(/login/);
});


