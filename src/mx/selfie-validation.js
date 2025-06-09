const initSelfieValidation = () => {
  alert("Initiating Selfie Validation...");
};

export function setupSelfieValidation(element) {
  element.addEventListener("click", () => initSelfieValidation());
}
