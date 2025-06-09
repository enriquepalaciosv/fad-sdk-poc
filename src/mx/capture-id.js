import { getSdkInstance } from "./fadSdk";

const initCapture = async () => {
  const fadSDK = getSdkInstance();
  try {
    const captureIdResponse = await fadSDK.startCaptureId();
    console.log(captureIdResponse);
    // TODO: send returned data to rails
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
};

export function setupCaptureID(element) {
  element.addEventListener("click", () => initCapture());
}
