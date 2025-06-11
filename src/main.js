import { setupCaptureID } from "./mx/capture-id.js";
import { setupSelfieValidation } from "./mx/selfie-validation.js";

/**
 * @callback VerificationCallback
 * @param {Object} result - The result from the verification process.
 */

/**
 * @typedef {Object} ValidatorOptions
 * @property {string} captureIdContainerId - The DOM element ID to render the Capture ID button.
 * @property {string} selfieVerificationContainerId - The DOM element ID to render the Selfie Verification button.
 * @property {string} api_url - The base URL of the API to send verification results to.
 * @property {string} business_unit - The business unit identifier.
 * @property {string} customer_guid - The unique identifier for the customer/user.
 * @property {VerificationCallback} onCaptureIdComplete - Called when card verification is done.
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
    const { captureIdContainerId, onCaptureIdComplete } = this.options;
    setupCaptureID(captureIdContainerId, onCaptureIdComplete);
  }

  /**
   * Initializes and renders the Selfie Verification button inside the provided container.
   */
  renderSelfieVerification() {
    const { selfieVerificationContainerId, onSelfieVerificationComplete } =
      this.options;
    setupSelfieValidation(
      selfieVerificationContainerId,
      onSelfieVerificationComplete
    );
  }
}

window.IdentityValidator = IdentityValidator;
