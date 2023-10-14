import fetch from "cross-fetch";

export interface SMSSararaOptions {
  apiKey: string;
  otpKey?: string;
}

class SMSSarara {
  private host: string = "https://api.smssarara.app/api/v1";
  private apiKey: string;
  private otpKey?: string;

  constructor(data: SMSSararaOptions) {
    if (!data.apiKey) {
      throw new Error("apiKey is required");
    }
    this.apiKey = data.apiKey;
    this.otpKey = data.otpKey;
  }

  /**
   * The `sendOTP` function sends a request to a server to generate and send an OTP (One-Time Password)
   * to a specified mobile number.
   * @param {string} mobile - The `mobile` parameter is a string that represents the mobile number to
   * which the OTP (One-Time Password) will be sent.
   * @returns a JSON object.
   */
  public async sendOTP(mobile: string) {
    if (!this.otpKey) throw new Error("otpKey is required");
    if (!mobile) throw new Error("mobile no is required");

    const url = `${this.host}/otps/request`;
    const data = { mobile };
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          OTP_TOKEN: this.otpKey || "",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          if (response.status !== 200) {
            return reject(await response.json());
          }
          return resolve(await response.json());
        })
        .catch((error) => reject(error));
    });
  }

  /**
   * The function `verifyOTP` is used to verify an OTP (One-Time Password) by making a POST request to
   * a specified URL with the provided mobile number and OTP code.
   * @param {string} mobile - The `mobile` parameter is a string that represents the mobile number of
   * the user for whom the OTP (One-Time Password) is being verified.
   * @param {string} code - The `code` parameter is the OTP (One-Time Password) that is generated and
   * sent to the user's mobile number for verification.
   * @returns a JSON object.
   */
  public async verifyOTP(mobile: string, code: string) {
    if (!this.otpKey) throw new Error("otpKey is required");
    if (!mobile) throw new Error("mobile no is required");
    if (!code) throw new Error("otp is required");

    const url = `${this.host}/otps/verify`;
    const data = { mobile, code };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        OTP_TOKEN: this.otpKey || "",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }
}

export default SMSSarara;
