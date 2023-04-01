# chromeSpeechRecognition

Access chrome SpeechRecognition with puppeteer in headless mode

## Import

```js
import chromeSpeechRecognition from "chromeSpeechRecognition";
//or
const chromeSpeechRecognition = require("chromeSpeechRecognition").default;
```

## Example

```js
function callback(text) {
  console.log("The user said: ", text);
}

const chromePath = path.resolve(__dirname, "../chrome/chrome.exe");

const speechRecognitionOptions = {
  lang: "en",
};

const browser = await chromeSpeechRecognition(
  callback,
  chromePath,
  speechRecognitionOptions
);

//when you want to stop listening
setTimeout(() => browser.close(), 10000);
```
