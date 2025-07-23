# Identity Validator JS (idv.js)

The `IdentityValidator` class provides a simple interface to integrate ID card and selfie verification into your web application using FAD ecosystem services.

## 💻 Development

Make sure you have installed [Node.js](https://nodejs.org/en/) `v18.19.1` or higher and run the following commands in the root directory:

```
npm install
```

```
openssl req -x509 -newkey rsa:2048 -nodes -keyout localhost-key.pem -out localhost-cert.pem -days 365 -subj "/CN=localhost"
```

```
npm run dev
```

Open the following url in your browser https://localhost:5173 feel free to ignore the warning about using a self-signed certificate, HTTPS is needed for selfie verification.

## 🚀 Production

To build the project for production, run the following commands in the root directory:

```
npm install
npm run build
```

The production-ready JS library will be generated in `dist/idv.js` you can upload it to a web server or simply copy it to your project.

## 📦 Installation

Include the compiled JavaScript library in your HTML file.

```html
<script src="path/to/idv.js"></script>
```

## 🧩 Usage

Create a new instance of `IdentityValidator` by passing the required configuration options.

### Example

```js
const validator = new IdentityValidator({
  environment: "development",
  fadAppName: "rac",
  fadToken: "xxxxxxxxxxxxxxxxxxx",
  captureIdContainerId: "capture-id-button",
  selfieVerificationContainerId: "selfie-button",
  business_unit: "rac",
  transaction_id: "your_transaction_id",
  customer_guid: "cust-xxxxxx-xxxxx-xxxxxx-xxxxxx-xxxxxxxx",
  onCaptureIdComplete: (caputureIdResult) => {
    console.log("Capture ID completed:", caputureIdResult);
    // Implement your logic to handle the callback result e.g extracting the transaction_id
  },
  onSelfieVerificationComplete: (selfieVerificationResult) => {
    console.log("Selfie verification completed:", selfieVerificationResult);
    // Implement your logic to handle the callback result
  },
});

// Render buttons
validator.renderCaptureId();
validator.renderSelfieVerification();
```

### caputureIdResult Structure

The `caputureIdResult` object passed to the `onCaptureIdComplete` callback has the following structure:

```json
{
  "sdkResult": {
    "event": "result_message_from_sdk",
    "customer_guid": "cust-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "business_unit": "rac|acima",
    "capture_result": {
      "images": {
        "front": "front_image_base64_string",
        "back": "back_image_base64_string"
      },
      "ine_number": "ine_number_value",
      "ocr": "ocr_number_value",
      "voter_key": "voter_key_value",
      "verification_number": "verification_number_value",
      "date_of_issue": "date_of_issue_value",
      "year_of_registration": "year_of_registration_value",
      "citizen_id": "citizen_id_value",
      "dob": "date_of_birth_value",
      "curp_number": "curp_number_value",
      "paternal_last_name": "paternal_last_name_value",
      "maternal_last_name": "maternal_last_name_value",
      "gender": "gender_value",
      "given_names": "given_names_value"
    }
  },
  "apiResult": {
    "transaction_id": "unique guid for the capture results",
    "status": "OK",
    "error_message": "message available only if an error occurs"
  }
}
```

### selfieVerificationResult Structure

The `selfieVerificationResult` object passed to the `onSelfieVerificationComplete` callback has the following structure:

```json
{
  "sdkResult": {
    "event": "result_message_from_sdk",
    "base64Images": {
      "lowQuality": "low quality base64_string image",
      "highQuality": "high quality base64_string image"
    }
  },
  "apiResult": {    
    "matches": {
      "ine": true,
      "curp": true,
      // field_name: true | false
    },
    "transaction_id": "transaction_id from the previous Capture ID flow",
    "customer_guid": "cust-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "images": {
      "front": "base64 encoded image",
      "back": "base64 encoded image",
      "face": "base64 encoded image"
    }     
  }
}
````

## 📝 Customizing the Capture ID Button

When you call `renderCaptureId()`, a button will be automatically injected into the DOM element whose ID you provide as `captureIdContainerId`. This button will have the ID `idvjs-capture-id-btn`, allowing you to easily target and style it with your own CSS or JavaScript to match your application's UI requirements.

For example, you can customize its appearance in your CSS:

```css
#idvjs-capture-id-btn {
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  /* Add your custom styles here */
}
````

## 📝 Customizing the Selfie Verification Button

When you call `renderSelfieVerification()`, a button will be automatically injected into the DOM element whose ID you provide as `selfieVerificationContainerId`. This button will have the ID `idvjs-selfie-btn`, allowing you to easily target and style it with your own CSS or JavaScript to match your application's UI requirements.

For example, you can customize its appearance in your CSS:

```css
#idvjs-selfie-btn {
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  /* Add your custom styles here */
}
```

## 🧾 Options
All properties in the table below are required, except for `transaction_id`, which is only necessary for the Selfie Verification flow. You can omit `transaction_id` when using the Capture ID flow.

| Property                        | Type       | Description                                                                                  |
| ------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `environment`                   | `string`   | The environment to run in. Accepted values: `'development'`, `'production'`.                 |
| `fadAppName`                    | `string`   | Name of the app as registered in the FAD ecosystem, provided by NA-AT.                       |
| `fadToken`                      | `string`   | Token used to authenticate with FAD services, provided by NA-AT.                             |
| `captureIdContainerId`          | `string`   | The ID of the DOM element where the Capture ID button will be rendered.                      |
| `selfieVerificationContainerId` | `string`   | The ID of the DOM element where the Selfie Verification button will be rendered.             |
| `business_unit`                 | `string`   | Identifier of the business unit initiating the verification.                                 |
| `transaction_id`                | `string`   | Unique identifier returned by the api after the capture id flow has been processed.          |
| `customer_guid`                 | `string`   | Unique identifier for the customer being verified.                                           |
| `onCaptureIdComplete`           | `function` | Callback triggered upon completion of the Capture ID verification. Receives a result object. |
| `onSelfieVerificationComplete`  | `function` | Callback triggered upon completion of the Selfie verification. Receives a result object.     |

## 📘 API Reference

### `new IdentityValidator(options)`

Creates a new instance using the provided options.

### `renderCaptureId()`

Initializes and renders the Capture ID button into the target container.

### `renderSelfieVerification()`

Initializes and renders the Selfie Verification button into the target container.

## 🛠️ Requirements

- DOM elements with IDs specified in `captureIdContainerId` and `selfieVerificationContainerId` must exist in the HTML.
- Ensure your FAD token is valid and has the proper permissions for verification.

## 🧪 Callback Format

```js
function onVerificationComplete(result) {
  // Handle result: success, error, or data
  console.log(result);
}
```

## 🔒 Security

- Make sure not to expose sensitive data like the `fadToken` in public repositories.

- This JS library needs HTTPS to properly communicate with NA-AT SDK.
