import Rollbar from "rollbar";
let rollbar = null;

export function initRollbar({ environment }) {
  rollbar = new Rollbar({
    accessToken: "e4c371f0e64a42f89699a077ce38eed3",
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: environment || "development",
      client: {
        javascript: {
          code_version: "1.0",
        },
      },
    },
  });
}

export function getRollbar() {
  return rollbar;
}
