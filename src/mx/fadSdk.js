import FadSDK from "@fad-producto/fad-sdk";

export function getSdkInstance() {
  // TODO: set environment dynamically
  const TOKEN =
    "WVFDSTdGclFBWEt4TytScXpNS1NtdGZtMnhBQU1FWEdkSzMrNFpMMmFVaHR2Mk4xYTVhdmQxS0cvTm5BV2VUbzBVemdOMEQ4UVhyRjV1elFsMFJEaFNXWTBjWTRBSStrMG5IZDQzUjZRZEtVMFBkaWJkOXFQZFBsYUdsbmQram0=";
  const options = {
    environment: FadSDK.getFadEnvironments().UAT,
  };
  return new FadSDK(TOKEN, options);
}
