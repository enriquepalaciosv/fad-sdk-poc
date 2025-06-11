import { getSdkInstance, FACETEC_PROCESS_TYPE } from "./fadSdk";

export function setupSelfieValidation(options) {
  const { selfieVerificationContainerId } = options;
  const container = document.getElementById(selfieVerificationContainerId);
  const button = document.createElement("button");
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
    const facetecResponse = await fadSDK.startFacetec(null, {}, MW_CONFIG);
    console.log(facetecResponse);
    onSelfieVerificationComplete(facetecResponse);
  } catch (err) {
    console.error(err);
    onSelfieVerificationComplete(err);
  } finally {
    fadSDK.end();
  }
}
