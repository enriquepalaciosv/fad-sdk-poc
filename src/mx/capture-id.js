import { getSdkInstance } from "./fad-sdk";
import { postData } from "./api-service";
import { getField } from "./utils";
import { v4 as uuidv4 } from "uuid";
import { getRollbar } from "../utils/rollbar-service.js";

export function setupCaptureID(options) {
  const container = document.getElementById(options.captureIdContainerId);
  const button = document.createElement("button");
  button.id = "idvjs-capture-id-btn";
  button.textContent = "Capture ID";
  button.addEventListener("click", () => initCapture(options));
  container.appendChild(button);
}

async function initCapture(options) {
  const { environment, fadToken, onCaptureIdComplete } = options;
  const fadSDK = getSdkInstance(environment, fadToken);
  try {
    const result = await fadSDK.startCaptureId();
    const { event, data } = result;
    if (event === "PROCESS_COMPLETED") {
      const endpoint = `mx/id/results`;
      const allFields = data.ocr.fields;
      const payload = {
        reference_id: uuidv4(),
        customer_guid: options.customer_guid,
        business_unit: options.business_unit,
        capture_result: {
          images: {
            front: data.image.front.data,
            back: data.image.back.data,
          },
          given_names: getField(allFields, "Given Names"),
          paternal_last_name: getField(allFields, "Surname"),
          maternal_last_name: getField(allFields, "Second Surname"),
          gender: getField(allFields, "Sex"),
          address1: getField(allFields, "Address Street"),
          curp_number: getField(allFields, "Personal Number"),
          ine_number: getField(allFields, "Document Number"),
          dob: getField(allFields, "Date of Birth"),
          city: getField(allFields, "Address Colony"),
          province_code: getField(allFields, "Address Postal Code"),
          cic: getField(allFields, "Document Number"),
          ocr: getField(allFields, "OCR Number"),
          voter_key: getField(allFields, "Voter Key"),
          verification_number: getField(allFields, "Verification Number"),
          date_of_issue: getField(allFields, "Date of Issue"),
          year_of_registration: getField(allFields, "Year of Registration"),
          citizen_id: getField(allFields, "OCR Number").substring(0, 9),
          rfc: `${getField(allFields, "Personal Number")}`.substring(0, 10),
          /**
           * RFC is a Mexican tax identification number.
           * It is composed of the first 10 characters of the CURP (Clave Única de Registro de Población)
           * Followed by a 3-character  "homoclave" that is not available in the OCR data.
           * The "homoclave" is a unique identifier assigned by the tax authority to avoid duplicates.
           * The "homoclave" can be found in a document called "constacia de situación fiscal".
           * In this case, we are using only the first 10 characters of the CURP.
           * Reference: NA-AT tech team and https://www.sat.gob.mx/consulta/70072/clave-para-el-registro-federal-de-contribuyentes-rfc
           */
        },
      };
      postData(environment, endpoint, payload)
        .then((response) => {
          onCaptureIdComplete({ sdkResult: result, apiResult: response });
        })
        .catch((error) => {
          const rollbar = getRollbar();
          if (rollbar) {
            rollbar.error("Error in postData during ID capture", { error });
          }
          onCaptureIdComplete({ sdkResult: result, apiResult: error });
        });
    } else {
      onCaptureIdComplete({ sdkResult: result });
    }
  } catch (err) {
    console.error("Error during ID capture:", err);
    const rollbar = getRollbar();
    if (rollbar) {
      rollbar.error("Exception during ID capture", { error: err });
    }
    onCaptureIdComplete({ sdkResult: err });
  } finally {
    fadSDK.end();
  }
}
