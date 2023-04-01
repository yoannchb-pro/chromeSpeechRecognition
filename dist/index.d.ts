declare function chromeSpeechRecognition(callback: (text: string) => void, chromePath: string, speechRecognitionOptions?: unknown): Promise<import("puppeteer-core").Browser>;
export default chromeSpeechRecognition;
