import { getSdkInstance } from "./fadSdk";

async function initCapture(completedCallback) {
  const fadSDK = getSdkInstance();
  try {
    const { event, data } = await fadSDK.startCaptureId();
    if (event === "PROCESS_COMPLETED") {
      // TODO: set data format according to the contract
      // TODO: send returned data to rails
      completedCallback(data);
    } else {
      return { event, data, message: "Something went wrong" };
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
        console.error(JSON.stringify(err));
        break;
    }
    completedCallback(err);
  } finally {
    fadSDK.end();
  }
}

export function setupCaptureID(containerId, completedCallback) {
  const container = document.getElementById(containerId);
  const button = document.createElement("button");
  button.textContent = "Capture ID";
  button.addEventListener("click", () => initCapture(completedCallback));
  container.appendChild(button);
}
