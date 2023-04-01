const chromeSpeechRecognition = require("../dist/index.js").default;
const path = require("path");

(async function () {
  const browser = await chromeSpeechRecognition(
    function (text) {
      console.log(text);
    },
    path.resolve(__dirname, "../chrome/chrome.exe"),
    { lang: "en" }
  );
  setTimeout(() => browser.close(), 10000);
})();
