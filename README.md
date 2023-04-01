# chromeSpeechRecognition

Access chrome SpeechRecognition with puppeteer in headless mode

> NOTE: You will need to put chrome in the source directory

## Install

```
$ npm i chrome-speech-recognition
```

## Import

```js
import chromeSpeechRecognition from "chrome-speech-recognition";
//or
const chromeSpeechRecognition = require("chrome-speech-recognition").default;
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
