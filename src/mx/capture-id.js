import { getSdkInstance } from "./fadSdk";

export function setupCaptureID(options) {
  const container = document.getElementById(options.captureIdContainerId);
  const button = document.createElement("button");
  button.textContent = "Capture ID";
  button.addEventListener("click", () => initCapture(options));
  container.appendChild(button);
}

async function initCapture(options) {
  const { environment, fadToken, onCaptureIdComplete } = options;
  const fadSDK = getSdkInstance(environment, fadToken);
  try {
    const result = await fadSDK.startCaptureId();
    const { event, data } = result;
    if (event === "PROCESS_COMPLETED") {
      // TODO: send returned data to rails
      console.log(data);
    }
    onCaptureIdComplete(result);
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
        console.error(JSON.stringify(err));
        break;
    }
    onCaptureIdComplete(err);
  } finally {
    fadSDK.end();
  }
}
