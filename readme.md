### SMSSarara

This is a simple SMS sending and receiving and otp client. It uses [SMS Sarara API](https://smssarara.com) to send and receive SMS.

#### Installation

```bash
npm install smssarara
```

#### Usage

**Initialization**

```javascript
const SMSSarara = require("smssarara");

const sms = SMSSarara({
  apiToken: "xxx-xxxxxxxxxx",
  otpToken: "xxx-xxxxxxxxxx",
});
```

**Sending OTP**

```javascript
const response = await sms.sendOtp("9841xxxxxx");

console.log(response);

// sample response
{
  status: "success",
  message: "OTP sent successfully",
}

// or

{
  status: "error",
  message: "...",
}

```

**Verifying OTP**

```javascript
const response = await sms.verifyOtp("9841xxxxxx", "123456");

console.log(response);

// sample response
{
  status: "success",
  message: "OTP verified successfully",
}

// or

{
  status: "error",
  message: "...",
}

```
