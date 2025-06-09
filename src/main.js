import { setupCaptureID } from "./mx/capture-id.js";
import { setupSelfieValidation } from "./mx/selfie-validation.js";

document.querySelector("#idv-js").innerHTML = `  
    <div class="card">
      <button id="capture" type="button">Capture ID</button>
      <button id="selfie" type="button">Selfie Validation</button>
    </div>
`;

setupCaptureID(document.querySelector("#capture"));
setupSelfieValidation(document.querySelector("#selfie"));
