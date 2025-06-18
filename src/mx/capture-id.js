import { getSdkInstance } from "./fad-sdk";
import { postData } from "./api-service";
import { getField } from "./utils";
import { v4 as uuidv4 } from "uuid";

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
      const url = `${options.api_url}/mx/id/results`;
      const allFields = data.ocr.fields;
      const payload = {
        reference_id: uuidv4(),
        customer_guid: options.customer_guid,
        business_unit: options.business_unit,
        capture_result: {
          first_name: getField(allFields, "Given Names"),
          paternal_last_name: getField(allFields, "Surname"),
          maternal_last_name: getField(allFields, "Second Surname"),
          gender: getField(allFields, "Sex"),
          address1: getField(allFields, "Address Street"),
          curp_number: getField(allFields, "Personal Number"),
          ine_number: getField(allFields, "Document Number"),
          dob: getField(allFields, "Date of Birth"),
          rfc: getField(allFields, "unknown"),
          city: getField(allFields, "unknown"),
          province_code: getField(allFields, "unknown"),
          images: {
            front: data.image.front.data,
            back: data.image.back.data,
          },
        },
      };
      postData(url, payload)
        .then((response) => {
          onCaptureIdComplete({ sdkResult: result, apiResult: response });
        })
        .catch((error) => {
          onCaptureIdComplete({ sdkResult: result, apiResult: error });
        });
    } else {
      onCaptureIdComplete({ sdkResult: result });
    }
  } catch (err) {
    console.error("Error during ID capture:", err);
    onCaptureIdComplete({ sdkResult: err });
  } finally {
    fadSDK.end();
  }
}
