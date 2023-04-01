"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
function listenSpeechRecognition(browser, callback, speechRecognitionOptions = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const page = (yield browser.pages())[0];
        yield page.goto("chrome://version//");
        const emitter = new events_1.EventEmitter();
        emitter.on("transcript", (transcript) => {
            callback(transcript);
        });
        yield page.exposeFunction("emitTranscript", (transcript) => {
            emitter.emit("transcript", transcript);
        });
        yield page.evaluate((speechRecognitionOptions) => {
            window.SpeechRecognition =
                window.SpeechRecognition ||
                    window.webkitSpeechRecognition;
            const recognition = new window.SpeechRecognition();
            recognition.interimResults = true;
            for (const option in speechRecognitionOptions) {
                recognition[option] = speechRecognitionOptions[option];
            }
            recognition.addEventListener("result", (e) => {
                const transcript = Array.from(e.results)
                    .map((result) => result[0])
                    .map((result) => result.transcript)
                    .join("");
                window.emitTranscript(transcript);
            });
            recognition.addEventListener("end", recognition.start);
            recognition.start();
        }, speechRecognitionOptions);
    });
}
exports.default = listenSpeechRecognition;
//# sourceMappingURL=listenSpeechRecogntion.js.map