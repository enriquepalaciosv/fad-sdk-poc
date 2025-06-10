import { getSdkInstance } from "./fadSdk";

async function initSelfieValidation() {
  const fadSDK = getSdkInstance();
  try {
    const FACETEC_CREDENTIALS = {
      deviceKeyIdentifier: "dAaa7DjCJH7f4zuLwJFFlSjgAXL6k8q2",
      productionKeyText: {
        domains: "",
        expiryDate: "2025-08-10",
        key: "00304602210091cee8274291cd6f08811240024c99fb93063f2be6f5d082abeb817e8e5cb55e022100bd2e9e89e853ed405172ad0c51e23dfe05576ea748ef53965c2d182af75977bd",
      },
      baseURL: "https://uatmw.firmaautografa.com/middleware/facetec",
      publicFaceScanEncryptionKey:
        "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5PxZ3DLj+zP6T6HFgzzk\nM77LdzP3fojBoLasw7EfzvLMnJNUlyRb5m8e5QyyJxI+wRjsALHvFgLzGwxM8ehz\nDqqBZed+f4w33GgQXFZOS4AOvyPbALgCYoLehigLAbbCNTkeY5RDcmmSI/sbp+s6\nmAiAKKvCdIqe17bltZ/rfEoL3gPKEfLXeN549LTj3XBp0hvG4loQ6eC1E1tRzSkf\nGJD4GIVvR+j12gXAaftj3ahfYxioBH7F7HQxzmWkwDyn3bqU54eaiB7f0ftsPpWM\nceUaqkL2DZUvgN0efEJjnWy5y1/Gkq5GGWCROI9XG/SwXJ30BbVUehTbVcD70+ZF\n8QIDAQAB\n-----END PUBLIC KEY-----",
      middlewareInfo: {
        token: {
          tokenType: "Bearer",
          accessToken:
            "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.O9aIXEl0Td6kzMSgMn9_uN2AuZLKM8SP8IBwBXYfFF8AFcQJ9eUEgfBe4-EWWKfNxDPMemnnlUWC-jSLzI3uoFWx-cwf4mfn-wp0tOhvF784INh5AICngYq-isLj-C7KNFCk_-o7EtqhvYd01Onwhux864lG5mJROigdEq8QMMozaw8hGGImTptse3Cg852pej1IU44NSUK1KxZS9vVsoX6vk15CWEBI6QCgnniS3F_qyPcODRTM0kOlqtTOQPWnsk5G8QQthYspfq8xPqF3lhWV390Q_ruIrz5GLJyOp_gOaeJkqGEgoq-1iEsk0nXawtp4_W3xl2CRqke5AWL4nw.GGpRba02MmPjtbTi.1ztXMV6FXQHxs3FcOL7ncR-9Xlkcu8bfkITP3XTips5B1uSkwTK_3dLQ4hp-wxv-TkkjeQGO340tBEEfj0zBk7q2U24lI--vc0cVFlHpQC5Cyas84kVRrfjTjyufR9vGgcawLhKzXaBFJQmkKMb1VZcri8I0aX7OXgxBpm7_psO63xruwMEHWYo5tVC2hgP8lq5J8-Q1mWEkgvWfaVVSp5GQbsORHUyekU5YMLDyAuAhWwUProLcTs1qyIxEiD5xifaGQvRSR-AFXVVApLkSCPAsMexX1ws38Ws_fvN4J9lvClYdFAecN1rxI9V_mnVF3BDwyJ6mQRiYhhpscAcjr1IYeYg1bc7xlKpORl3gAjQpqNDAc8FxMY_DpDnGdezFB0pM1quFxs76V8llNlX3fG70BKpdzuuX6IF7Nx-2E3XIqRzFcsLg7BS6EgqzlCN5oNqtL_UT1YR2lY1nKFnqZWpYkdBiDM_lYY16ry-4YJD1En2M1y1WUBzr99fRkTJhf9kSvZeyDwLqRY-SnAjv7S0uvz2mj-2lzoax01ilyWEeYJ3akH8EO8oFy3qKHnG7BRES5NCPEBSDIrLonJyW_uCNxKvlWB1UCDXoBblw68CmlpKPlCj8DNPHULBrwNmyAPiTD5VoQ2cj8GDUIIvcrzpPsnp_8TTEOTRTj9ja_Jn8VF2NXoCEHIehPzhXi1vosAL4VUjpKIKusYgiKnsapbXHx6lTGwQF68EIhrihomAqMGQd4B6FaifLdezGXYC5GoOEP6oCJCjTqTv6A8OUiSyDAeoZvDTAnJEkdWnHA8J-jJ3n6ESAoOVn4Zt3AqY_q-PPePU-UoQ88RjcU88wv3k1dui7nSW1-w3HQ03W7ldulQpJ0ceFLR38v-LhFzQ05QhgcNuZimSv9Z8-KWA2UmQz8OsNqrUtjUU9ybUJrbk.E05-DqupFYnSFgqe5Xe2XA",
        },
        additionalInfo: {
          processId: "",
          processTypeId: 5,
          originId: 3,
          platform: "Web",
          appVersion: "1",
          appId: "rac",
        },
      },
    };
    const facetecResponse = await fadSDK.startFacetec(FACETEC_CREDENTIALS);
    console.log(facetecResponse);
  } catch (err) {
    const container = document.getElementById("jsoneditor");
    container.textContent = err.code;
  } finally {
    fadSDK.end();
  }
}

export function setupSelfieValidation(element) {
  element.addEventListener("click", () => initSelfieValidation());
}
