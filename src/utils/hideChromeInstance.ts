import ref from "ref-napi";
import ffi from "ffi-napi";

const user32 = ffi.Library("user32.dll", {
  EnumWindows: ["bool", ["pointer", "int32"]],
  GetWindowThreadProcessId: ["uint32", ["uint32", "pointer"]],
  ShowWindow: ["bool", ["uint32", "int32"]],
});

function hideChromeInstance(browserProcessId: number) {
  const windowProc = ffi.Callback(
    "bool",
    ["uint32", "int32"],
    function (hwnd: any) {
      const pidBuffer = ref.alloc("uint32");
      user32.GetWindowThreadProcessId(hwnd, pidBuffer);
      const pid = pidBuffer.deref();
      if (pid === browserProcessId) {
        user32.ShowWindow(hwnd, 0);
      }
      return true;
    }
  );
  user32.EnumWindows(windowProc, 0);
}

export default hideChromeInstance;
