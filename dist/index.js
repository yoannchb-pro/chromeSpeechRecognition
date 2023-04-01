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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const hideChromeInstance_1 = __importDefault(require("./utils/hideChromeInstance"));
const listenSpeechRecogntion_1 = __importDefault(require("./extra/listenSpeechRecogntion"));
function chromeSpeechRecognition(callback, chromePath, speechRecognitionOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_core_1.default.launch({
            args: ["--window-position=-3000,-3000"],
            headless: false,
            executablePath: chromePath,
        });
        const browserProcess = yield browser.process();
        (0, hideChromeInstance_1.default)(browserProcess.pid);
        (0, listenSpeechRecogntion_1.default)(browser, callback, speechRecognitionOptions);
        return browser;
    });
}
exports.default = chromeSpeechRecognition;
//# sourceMappingURL=index.js.map