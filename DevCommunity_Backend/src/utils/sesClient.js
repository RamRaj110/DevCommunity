const {SESClient} = require('@aws-sdk/client-ses');
 
 const sesClient = new SESClient({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.SSE_ACCESS_KEY,
        secretAccessKey: process.env.SSE_SECRET_KEY
    }
 });
 module.exports = sesClient;