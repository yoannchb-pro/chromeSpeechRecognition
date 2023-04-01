"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ref_napi_1 = __importDefault(require("ref-napi"));
const ffi_napi_1 = __importDefault(require("ffi-napi"));
const user32 = ffi_napi_1.default.Library("user32.dll", {
    EnumWindows: ["bool", ["pointer", "int32"]],
    GetWindowThreadProcessId: ["uint32", ["uint32", "pointer"]],
    ShowWindow: ["bool", ["uint32", "int32"]],
});
function hideChromeInstance(browserProcessId) {
    const windowProc = ffi_napi_1.default.Callback("bool", ["uint32", "int32"], function (hwnd) {
        const pidBuffer = ref_napi_1.default.alloc("uint32");
        user32.GetWindowThreadProcessId(hwnd, pidBuffer);
        const pid = pidBuffer.deref();
        if (pid === browserProcessId) {
            user32.ShowWindow(hwnd, 0);
        }
        return true;
    });
    user32.EnumWindows(windowProc, 0);
}
exports.default = hideChromeInstance;
//# sourceMappingURL=hideChromeInstance.js.map