/**
 * From: https://github.com/giuseppeg/giuseppeg.github.com/tree/master/_contact-form-fn
 * ## Requirements

- SendGrid account (free and very easy to set up) - https://sendgrid.com
- Verified email account on SendGrid - this is the one you use to forward enquires (send emails) to yourself.

  Verify it here https://sendgrid.com/docs/for-developers/sending-email/sender-identity/

- Vercel account - https://vercel.com
- Node.js

## Usage

### Configuration

The function requires the following ENV variables:

```shell
# Your email address
CONTACT_EMAIL

# SendGrid API Key
# https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key
SENDGRID_KEY

# Which origins are allowed to make requests to this API.
# This is a string of comma separated origins eg.
# "giuseppegurgone.com,ggurgone.com"
CORS_ORIGINS
```

On Vercel you might want to store these as Secrets.
 */

const cors = require("micro-cors");
const sgMail = require("@sendgrid/mail");

const origins = (process.env.CORS_ORIGINS || "").split(",").map((o) => {
  const t = o.trim();
  if (/^https?:\/\//.test(t)) {
    return t;
  }
  return `https://${t}`;
});

module.exports = async (req, res) => {
  const origin = /^https?:\/\/localhost(:\d+)?\/?$/.test(req.headers.origin)
    ? req.headers.origin
    : origins.find((o) => o === req.headers.origin);

  if (!origin) {
    return res.status(500).end();
  }
  return cors({ origin, allowMethods: ["POST", "OPTIONS"] })(handler)(req, res);
};

async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const requiredFieldsErrorMessages = {
    email: "Missing recipient email address",
    message: "Missing message",
    company: "Missing company name",
    project: "Missing project type",
    budget: "Missing budget information",
  };

  let status = 500;
  let message = "An error occurred while trying to send the message";
  const { body } = req;

  switch (true) {
    case req.method !== "POST":
      status = 405;
      message = "Accepts only POST requests";
      break;
    case !process.env.SENDGRID_KEY:
      status = 500;
      message = "SendGrid Key not configured";
      break;
    case !process.env.CONTACT_EMAIL:
      status = 500;
      message = "Destination email address not configured";
      break;
    case !body:
      status = 400;
      message = "Missing body";
      break;
    default: {
      const errors = Object.entries(requiredFieldsErrorMessages).filter(
        ([name]) => typeof body[name] == "undefined"
      );
      if (errors.length > 0) {
        status = 422;
        message = Object.fromEntries(errors);
        break;
      }

      try {
        sgMail.setApiKey(process.env.SENDGRID_KEY);
        await sgMail.send({
          to: process.env.CONTACT_EMAIL,
          from: process.env.CONTACT_EMAIL,
          subject: composeSubject(body),
          text: composeMessage(body),
        });
        status = 200;
        message = "OK";
      } catch (error) {
        // Use `error.response` to debug SendGrid failures.
        // The most common one normally is that
        // you haven't verified the sender (your) e-mail address i.e. process.env.CONTACT_EMAIL
        // See https://sendgrid.com/docs/for-developers/sending-email/sender-identity/
      }
      break;
    }
  }

  res.statusMessage = message;
  res.status(status).json({ message }).end();
}

function composeSubject(formParams) {
  return `${formParams.company} <> Fisioggiono | ${formParams.project}`;
}

function composeMessage(formParams) {
  const { message, ...others } = formParams;
  return `${message}\n\n${Object.entries(others)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n")}`;
}
