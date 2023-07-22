export const environment = {
  production: true,
  identityProvider: "https://auth.issi.net",
  clientId: "team-hub.angular.staging",
  clientSecret: "very-strong-client-secret@1234",
  hostDirectoryExtension: "Home",
  //-------------------------------------- Need to Refactor -------------------------------
  cmpDelProfileUrl: "https://hub2.issi.net/cmp-reg-del",
  graphQLUrl: "https://hub2.issi.net/gqlapi/graphql",
  graphQLUrlws: "wss://hub2.issi.net/gqlapi/graphql",
  menuApiUrl: "https://demo2.issi.net/TEAM/RegDel/EventAdminApi_assoc/api/",
  paymentApi: "https://issi2.issi.net/payment/checkout",
  forgottenLoginIdEndpointUrl: "https://{0}2.issi.net/TEAM/password/forgottenLoginID.asp?ContactType=P",
  forgottenLoginIdEndpointUrlForEvent:
    "https://{0}2.issi.net/TEAM/password/forgottenLoginID.asp?EventDB={1}&ContactType=P",
  forgottenPasswordEndpointUrl: "https://{0}2.issi.net/TEAM/password/forgottenPassword.asp",
  paymentSettings: {
    TRANS_TYPE: "Sale", //Sale OR AuthOnly
    PROCESSOR_ID: 21,
    WEB_USER_ID: 2,
    PAYMENT_PAGE: "Payment Page",
    BANK_ACCOUNT_ID: 1,
  },
};
