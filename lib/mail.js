const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "d149f6c04df78d",
      pass: "4aab1c5d88b75d"
    }
});

module.exports = {
    /**
     * Sends given message to given email address
     * @param {String} message Message in text or html format
     * @param {String} receiver Receive email address
     * @param {String} messageType message type text or html, default is text
     * @returns {Promise<true|false>} Promise object which resolves to true when mail is sent successfully else resolves to false
     */
    sendMail: function(message, receiver, messageType = 'text') {
        console.log(arguments);
        return new Promise((resolve, reject) => {
            let messageObject = {
                from: "prashantkumarbarman@gmail.com",
                to: receiver,
                subject: "New post created",
                [messageType]: message
           };
           transporter.sendMail(messageObject, function(err, info) {
                if(err) {
                    console.log(err);
                    resolve(false);
                } 
                else {
                    console.log(info);
                    resolve(true);
                }
            });
        });
    }
}