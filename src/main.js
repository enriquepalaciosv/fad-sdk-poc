import { setupCaptureID } from "./mx/capture-id.js";
import { setupSelfieValidation } from "./mx/selfie-validation.js";

/**
 * @callback VerificationCallback
 * @param {Object} result - The result from the verification process.
 */

/**
 
* @typedef {Object} ValidatorOptions
 * @property {string} environment - The desired environment: development | production
 * @property {string} fadAppName - The app name registered in FAD ecosystem.
 * @property {string} fadToken - The Token to authenticate against FAD ecosystem.
 * @property {string} captureIdContainerId - The DOM element ID to render the Capture ID button.
 * @property {string} selfieVerificationContainerId - The DOM element ID to render the Selfie Verification button.
 * @property {string} api_url - The base URL of the API to send verification results to.
 * @property {string} business_unit - The business unit identifier.
 * @property {string} customer_guid - The unique identifier for the customer.
 * @property {VerificationCallback} onCaptureIdComplete - Called when ID card verification is done.
 * @property {VerificationCallback} onSelfieVerificationComplete - Called when selfie verification is done.
 */

class IdentityValidator {
  /**
   * Creates an instance of Verifier.
   * @param {ValidatorOptions} options
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Initializes and renders the Caputure ID button inside the provided container.
   */
  renderCaptureId() {
    setupCaptureID(this.options);
  }

  /**
   * Initializes and renders the Selfie Verification button inside the provided container.
   */
  renderSelfieVerification() {
    setupSelfieValidation(this.options);
  }
}

window.IdentityValidator = IdentityValidator;
