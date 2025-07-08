# Identity Validator JS (idv.js)

The `IdentityValidator` class provides a simple interface to integrate ID card and selfie verification into your web application using FAD ecosystem services.

## 💻 Development

Make sure you have installed [Node.js](https://nodejs.org/en/) `v18.19.1` or higher and run the following commands in the root directory:

```
npm install
```

```
npm run dev
```

Open the following url in your browser http://localhost:5173/

## 📦 Installation

Include the compiled JavaScript in your HTML file or import it via module bundler if using modern JS tooling.

```html
<script src="path/to/idv.js"></script>
```

## 🧩 Usage

Create a new instance of `IdentityValidator` by passing the required configuration options.

### Example

```js
const validator = new IdentityValidator({
  environment: "development",
  fadAppName: "acima",
  fadToken: "xxxxxxxxxxxxxxxxxxx",
  captureIdContainerId: "capture-id-button",
  selfieVerificationContainerId: "selfie-button",
  api_url: "https://racbackend.com",
  business_unit: "acima",
  transaction_guid: "your_transaction_guid",
  customer_guid: "cust-xxxxxx-xxxxx-xxxxxx-xxxxxx-xxxxxxxx",
  onCaptureIdComplete: (result) => {
    console.log("Capture ID completed:", result);
    // Implement your actual logic to handle the callback result e.g extracting the transaction_guid
  },
  onSelfieVerificationComplete: (result) => {
    console.log("Selfie verification completed:", result);
    // Implement you actual logic to handle the callback result
  },
});

// Render buttons
validator.renderCaptureId();
validator.renderSelfieVerification();
```

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
```

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

**All properties in the table below are required.**

**Note:** The `transaction_guid` option is typically obtained after a successful Capture ID flow and may be provided dynamically when initializing or updating the validator instance.

| Property                        | Type       | Description                                                                                  |
| ------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `environment`                   | `string`   | The environment to run in. Accepted values: `'development'`, `'production'`.                 |
| `fadAppName`                    | `string`   | Name of the app as registered in the FAD ecosystem.                                          |
| `fadToken`                      | `string`   | Token used to authenticate with FAD services.                                                |
| `captureIdContainerId`          | `string`   | The ID of the DOM element where the Capture ID button will be rendered.                      |
| `selfieVerificationContainerId` | `string`   | The ID of the DOM element where the Selfie Verification button will be rendered.             |
| `business_unit`                 | `string`   | Identifier of the business unit initiating the verification.                                 |
| `transaction_guid`              | `string`   | Unique identifier returned by the api after the capture id flow has been processed.          |
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

Make sure not to expose sensitive data like the `fadToken` in public repositories.
