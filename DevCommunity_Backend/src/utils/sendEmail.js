const {SendEmailCommand} = require('@aws-sdk/client-ses');
const sesClient = require('./sesClient');

return new SendEmailCommand({
    Destination: {
        ToAddresses: [toEmail],
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: htmlContent,
            },
            Text: {
                Charset: "UTF-8",
                Data: textContent,
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: subject,
        },
    },
    Source: fromEmail,

});



const {SendEmailCommand} = require('@aws-sdk/client-ses');
const sesClient = require('./sesClient');