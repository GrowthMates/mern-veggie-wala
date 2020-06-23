const sgMail = require('@sendgrid/mail');


module.exports = {
    sendMail(msgOptions){
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        let msg={
            from:`Veggie Wala <${process.env.SENDGRID_SENDER_EMAIL}>`,
            ...msgOptions
        }
        return sgMail.send(msg)
    }
}


// USE THIS CODE TO SEND MAIL...
// const { sendMail } = require('./sendMail.email')   // It is the location of this file.

    // const msg = {
    //     to: `${req.body.email}`,
    //     subject: 'YOUR_SUBJECT_HERE',
    //     text: 'PLACE_ANY_TEXT',
    //     html: `<h2>Hello ${req.body.user}!</h2>
    //            <p>Your message</p>`,
    //   };
    //   sendMail(msg).then(mail=>console.log('message sent: ',mail)).catch(err  => {
    //       console.error('Not sent: ',err);
    //       if (err.response) {
    //       console.error('Not sent error---',err.response.body)
    //           }
    //     });