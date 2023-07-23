export class TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;

  constructor(data: any) {
    this.access_token = data.access_token;
    this.token_type = data.token_type;
    this.expires_in = data.expires_in;
    this.refresh_token = data.refresh_token;
    this.scope = data.scope;
  }
}
