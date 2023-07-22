export const environment = {
  production: true,
  identityProvider: "https://auth.teameventmanagement.com",
  clientId: "team-hub.angular.production",
  clientSecret: "very-strong-client-secret@1234",
  hostDirectoryExtension: "Home",
  //-------------------------------------- Need to Refactor -------------------------------
  cmpDelProfileUrl: "https://hub.teameventmanagement.com/cmp-reg-del",
  graphQLUrl: "https://hub.teameventmanagement.com/gqlapi",
  graphQLUrlws: "wss://hub.teameventmanagement.com/gqlapi",
  menuApiUrl: "https://demo.teameventmanagement.com/TEAM/RegDel/EventAdminApi_assoc/api/",
  paymentApi: "https://issi.teameventmanagement.com/payment/checkout",
  forgottenLoginIdEndpointUrl: "https://{0}.teameventmanagement.com/TEAM/password/forgottenLoginID.asp?ContactType=P",
  forgottenLoginIdEndpointUrlForEvent:
    "https://{0}.teameventmanagement.com/TEAM/password/forgottenLoginID.asp?EventDB={1}&ContactType=P",
  forgottenPasswordEndpointUrl: "https://{0}.teameventmanagement.com/TEAM/password/forgottenPassword.asp",
  paymentSettings: {
    TRANS_TYPE: "Sale", //Sale OR AuthOnly
    PROCESSOR_ID: 21,
    WEB_USER_ID: 2,
    PAYMENT_PAGE: "Payment Page",
    BANK_ACCOUNT_ID: 1,
  },
};
