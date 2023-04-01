import { EventEmitter } from "events";
import { Browser } from "puppeteer-core";

async function listenSpeechRecognition(
  browser: Browser,
  callback: (text: string) => void,
  speechRecognitionOptions: unknown = {}
) {
  const page = (await browser.pages())[0];
  await page.goto("chrome://version//");

  const emitter = new EventEmitter();

  emitter.on("transcript", (transcript) => {
    callback(transcript);
  });

  await page.exposeFunction("emitTranscript", (transcript: string) => {
    emitter.emit("transcript", transcript);
  });

  await page.evaluate((speechRecognitionOptions: any) => {
    (window as any).SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new (window as any).SpeechRecognition();
    recognition.interimResults = true;

    for (const option in speechRecognitionOptions) {
      recognition[option] = speechRecognitionOptions[option];
    }

    recognition.addEventListener("result", (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result) => result.transcript)
        .join("");

      (window as any).emitTranscript(transcript);
    });

    recognition.addEventListener("end", recognition.start);

    recognition.start();
  }, speechRecognitionOptions);
}

export default listenSpeechRecognition;
