import { getSdkInstance, FACETEC_PROCESS_TYPE } from "./fad-sdk";
import { postData } from "./api-service";
import { v4 as uuidv4 } from "uuid";

export function setupSelfieValidation(options) {
  const { selfieVerificationContainerId } = options;
  const container = document.getElementById(selfieVerificationContainerId);
  const button = document.createElement("button");
  button.id = "idvjs-selfie-btn";
  button.textContent = "Selfie Validation";
  button.addEventListener("click", () => initSelfieValidation(options));
  container.appendChild(button);
}

async function initSelfieValidation(options) {
  const { environment, fadToken, fadAppName, onSelfieVerificationComplete } =
    options;
  const fadSDK = getSdkInstance(environment, fadToken);
  try {
    const MW_CONFIG = {
      useMiddleware: true,
      app: fadAppName,
      additionalInfo: {
        processTypeId: FACETEC_PROCESS_TYPE,
      },
    };
    const result = await fadSDK.startFacetec(null, {}, MW_CONFIG);
    const { event, data } = result;
    if (event === "PROCESS_COMPLETED") {
      const url = `${options.api_url}/mx/likeness/results`;
      const payload = {
        reference_id: uuidv4(),
        transaction_guid: options.transaction_guid,
        customer_guid: options.customer_guid,
        business_unit: options.business_unit,
        likeness_results: data,
        return_images: ["front", "back", "face"],
      };
      postData(url, payload)
        .then((response) => {
          onSelfieVerificationComplete({
            sdkResult: result,
            apiResult: response,
          });
        })
        .catch((error) => {
          onSelfieVerificationComplete({ sdkResult: result, apiResult: error });
        });
    } else {
      onSelfieVerificationComplete({ sdkResult: result });
    }
  } catch (err) {
    console.error("Error during Facetec live:", err);
    onSelfieVerificationComplete({ sdkResult: err });
  } finally {
    fadSDK.end();
  }
}
