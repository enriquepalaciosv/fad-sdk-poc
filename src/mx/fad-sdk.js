import FadSDK from "@fad-producto/fad-sdk";

export function getSdkInstance(env, token) {
  const options = {
    environment:
      env === "production"
        ? FadSDK.getFadEnvironments().PROD
        : FadSDK.getFadEnvironments().UAT,
  };
  return new FadSDK(token, options);
}

export const FACETEC_PROCESS_TYPE = FadSDK.Constants.Facetec.ProcessType.OTHER;
