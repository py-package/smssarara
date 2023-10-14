import SMSSarara, { SMSSararaOptions } from "../src";

describe("SMSSarara", () => {
  it("should be a class with a constructor that accepts an object", () => {
    expect(SMSSarara.constructor).toBeDefined();
    expect(typeof SMSSarara.constructor).toBe("function");
    expect(SMSSarara.constructor.length).toBe(1);
  });

  it("should throw an error if apiKey is not provided", () => {
    expect(() => {
      new SMSSarara({} as SMSSararaOptions);
    }).toThrowError("apiKey is required");
  });
});

describe("OTP", () => {
  let smsSarara: SMSSarara;

  beforeEach(() => {
    smsSarara = new SMSSarara({
      apiKey: "my-api-key",
      otpKey: "my-otp-key",
    });
  });

  describe("sendOTP", () => {
    it("should make a POST request to the correct URL with the correct headers and body", async () => {
      const mockResponse = { success: true };
      const mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });
      global.fetch = mockFetch;

      const mobile = "1234567890";
      const expectedUrl = "http://localhost:3000/api/v1/otps/request";
      const expectedHeaders = {
        "Content-Type": "application/json",
        OTP_TOKEN: "my-otp-key",
      };
      const expectedBody = JSON.stringify({ mobile });

      const response = await smsSarara.sendOTP(mobile);

      expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: expectedHeaders,
        body: expectedBody,
      });
      expect(response).toEqual(mockResponse);
    });
  });

  describe("verifyOTP", () => {
    it("should make a POST request to the correct URL with the correct headers and body", async () => {
      const mockResponse = { success: true };
      const mockFetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });
      global.fetch = mockFetch;

      const mobile = "1234567890";
      const code = "123456";
      const expectedUrl = "http://localhost:3000/api/v1/otps/verify";
      const expectedHeaders = {
        "Content-Type": "application/json",
        OTP_TOKEN: "my-otp-key",
      };
      const expectedBody = JSON.stringify({ mobile, code });

      const response = await smsSarara.verifyOTP(mobile, code);

      expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
        method: "POST",
        headers: expectedHeaders,
        body: expectedBody,
      });
      expect(response).toEqual(mockResponse);
    });
  });
});
