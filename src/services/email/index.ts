import AWS from "aws-sdk";

export async function sendEmail(emailAddress: string, name: string): Promise<void> {
// Create sendTemplatedEmail params 
    const params = {
        Destination: { /* required */
            ToAddresses: [
            emailAddress,
            /* more To email addresses */
            ]
        },
        Source: 'info@helpmycase.co.uk', /* required */
        Template: 'HelpMyCase-RequestSubmitted', /* required */
        TemplateData: `{ "name":"${name}" }`, /* required */
    };

    // Create the promise and SES service object
    const sendPromise = new AWS.SES({apiVersion: '2010-12-01', region: 'eu-west-1'}).sendTemplatedEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sendPromise.then(
        function (data) {
            return;
    }).catch(
        function(err) {
        console.error(err, err.stack);
    });
}

export default sendEmail;
