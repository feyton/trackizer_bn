import { validationResult } from "express-validator";

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

export { genAPIKey };

export const resHandler = (res: any, code: any, messageData: any) => {
  const message = code < 400 ? "success" : "fail";
  const response: any = { status: message, code };
  if (typeof messageData === "string") {
    response.data = {
      message: messageData,
    };
  } else {
    response.data = messageData;
  }
  return res.status(code).json(response);
};

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const extractedErrors = {};
  errors.array().forEach((err: any) => {
    extractedErrors[err.path] = err.msg;
  });

  return resHandler(res, 400, extractedErrors);
};


/*
import nlp from "compromise";

// Function to extract transaction information using compromise.js and regex as a backup
function extractTransactionInfo(message: string) {
  let info: any = {};

  // Perform NLP analysis
  const doc = nlp(message);
  const amountMatch: any = doc.match("#Money");
  if (amountMatch.found) {
    const amountTerm = amountMatch.terms().get(0);
    info.amount = amountTerm.value();
    info.currency = amountTerm.unit();
  }

  // If compromise.js didn't find a match, use regex as a backup
  if (!info.amount) {
    const regexAmount = /(\d+(\.\d+)?) RWF/;
    const regexMatch = message.match(regexAmount);
    if (regexMatch) {
      info.amount = parseFloat(regexMatch[1].replace(",", ""));
      info.currency = "RWF"; // Assuming Rwandan Franc as currency
    }
  }

  // Add more information extraction using compromise.js and regex as needed
  // Extract payee/receiver/sender
  const senderMatch = doc.match("#Person");
  if (senderMatch.found) {
    info.sender = senderMatch.out("text");
  }

  // Extract date and time
  const dateTimeMatch = doc.match("#Date");
  if (dateTimeMatch.found) {
    info.date_time = new Date(dateTimeMatch.out("text"));
  }

  // Extract fees
  const feesMatch = message.match(/Fee\s*was\s*(\d+(\.\d+)?)\s*RWF/);
  if (feesMatch) {
    info.fees = parseFloat(feesMatch[1]);
  }
  return info;
}
*/