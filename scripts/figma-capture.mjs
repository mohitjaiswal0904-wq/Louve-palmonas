import puppeteer from "puppeteer";

const jobs = [
  {
    name: "Homepage mid A",
    url: "http://127.0.0.1:5173/",
    captureId: "0b33b719-065e-4ba9-a9ff-5279d5174532",
    keep: ["banner--bleed", "banner--split"],
  },
  {
    name: "Homepage mid B",
    url: "http://127.0.0.1:5173/",
    captureId: "0a7c0829-a1a7-4aa9-bf51-77908029e95a",
    keep: ["banner--atelier", "banner--feature"],
  },
];

const browser = await puppeteer.launch({
  headless: true,
  protocolTimeout: 600000,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const job of jobs) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
    console.log(`\n=== ${job.name} ===`);
    await page.goto(job.url, { waitUntil: "networkidle2", timeout: 90000 });
    await page.waitForSelector("div.page", { timeout: 60000 });
    await new Promise((r) => setTimeout(r, 2000));
    await page.evaluate((keep) => {
      const set = new Set(keep);
      document.querySelectorAll("main#explore > .banner").forEach((el) => {
        if (![...el.classList].some((c) => set.has(c))) el.remove();
      });
      document.querySelector(".popular")?.remove();
      document.querySelector(".header")?.remove();
    }, job.keep);

    const scriptRes = await fetch(
      "https://mcp.figma.com/mcp/html-to-design/capture.js",
    );
    await page.addScriptTag({ content: await scriptRes.text() });
    await page.waitForFunction(
      () => window.figma && typeof window.figma.captureForDesign === "function",
      { timeout: 30000 },
    );

    const endpoint = `https://mcp.figma.com/mcp/capture/${job.captureId}/submit`;
    await page.evaluate(
      ({ captureId, endpoint }) => {
        window.figma.captureForDesign({ captureId, endpoint, selector: "body" });
      },
      { captureId: job.captureId, endpoint },
    );
    console.log("Uploading…");
    await new Promise((r) => setTimeout(r, 120000));
    await page.close();
  }
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  await browser.close();
}
