
const {SendEmailCommand} = require( "@aws-sdk/client-ses");
const  sesClient =require( "./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {

      CcAddresses: [
      
      ],
      ToAddresses: [
        toAddress,
       
      ],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<html><body><h1>HTML_FORMAT_BODY</h1></body></html>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test email from AWS SES",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "recipient@example.com",
    "sender@example.com",
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      /** @type { import('@aws-sdk/client-ses').MessageRejected} */
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};


module.exports = { run };