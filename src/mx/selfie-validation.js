import { getSdkInstance, FACETEC_PROCESS_TYPE } from "./fadSdk";

async function initSelfieValidation(completedCallback) {
  const fadSDK = getSdkInstance();
  try {
    const MW_CONFIG = {
      useMiddleware: true,
      app: "rac",
      additionalInfo: {
        processTypeId: FACETEC_PROCESS_TYPE,
      },
    };
    const facetecResponse = await fadSDK.startFacetec(null, {}, MW_CONFIG);
    console.log({ facetecResponse });
    completedCallback(facetecResponse);
  } catch (err) {
    console.error(err);
    completedCallback(err);
  } finally {
    fadSDK.end();
  }
}

export function setupSelfieValidation(containerId, completedCallback) {
  const container = document.getElementById(containerId);
  const button = document.createElement("button");
  button.textContent = "Selfie Validation";
  button.addEventListener("click", () =>
    initSelfieValidation(completedCallback)
  );
  container.appendChild(button);
}
