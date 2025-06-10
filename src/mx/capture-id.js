import { getSdkInstance } from "./fadSdk";

async function initCapture() {
  const fadSDK = getSdkInstance();
  try {
    const { event, data } = await fadSDK.startCaptureId();
    if (event === "PROCESS_COMPLETED") {
      const container = document.getElementById("jsoneditor");
      const options = { mode: "view" };
      const editor = new JSONEditor(container, options);      
      editor.set(data);
      // TODO: set data format according to the contract
      // TODO: send returned data to rails
    } else {
      const container = document.getElementById("jsoneditor");
      container.textContent = `Something failed: ${event}`;
    }
  } catch (err) {
    switch (err.code) {
      case fadSDK.Errors.CaptureId.NOT_READABLE_CAMERA:
        console.log("Webcam or mic is not ready");
        break;
      case fadSDK.Errors.CaptureId.FAIL_GET_OCR:
        console.log("restart component");
        break;
      case fadSDK.Errors.CaptureId.VIDEO_PLAYING_ERROR:
        console.log("restart component");
        break;
      case fadSDK.Errors.CaptureId.MODEL_FAILED:
        console.log("restart component");
        break;
      case fadSDK.Errors.CaptureId.TF_LITE_ERROR:
        console.log("restart component");
        break;
      default:
        // restart component
        console.error(JSON.stringify(err));
        break;
    }
  } finally {
    fadSDK.end();
  }
}

export function setupCaptureID(element) {
  element.addEventListener("click", () => initCapture());
}
