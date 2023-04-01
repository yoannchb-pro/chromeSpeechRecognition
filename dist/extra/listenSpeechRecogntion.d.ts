import { Browser } from "puppeteer-core";
declare function listenSpeechRecognition(browser: Browser, callback: (text: string) => void, speechRecognitionOptions?: unknown): Promise<void>;
export default listenSpeechRecognition;
