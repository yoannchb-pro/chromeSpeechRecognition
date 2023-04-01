import puppeteer, { PuppeteerLaunchOptions } from "puppeteer-core";
import hideChromeInstance from "./utils/hideChromeInstance";
import listenSpeechRecognition from "./extra/listenSpeechRecogntion";

async function chromeSpeechRecognition(
  callback: (text: string) => void,
  chromePath: string,
  speechRecognitionOptions?: unknown
) {
  const browser = await puppeteer.launch({
    args: ["--window-position=-3000,-3000"],
    headless: false,
    executablePath: chromePath,
  });

  const browserProcess = await browser.process();

  hideChromeInstance(browserProcess.pid);

  listenSpeechRecognition(browser, callback, speechRecognitionOptions);

  return browser;
}

export default chromeSpeechRecognition;
