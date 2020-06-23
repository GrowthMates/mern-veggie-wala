

module.exports = {
    emailVerification (user, token) {
        return {
            to:user.email,
            subject:"Email Verification",
            text:`Click the Link or copy and visit it to Confirm your Account ${process.env.CLIENT_URL}/confirm/${token}`,
            html:`<h3>Hello ${user.name}!</h3><br/>
            <strong>Click the Link to confirm your account.</strong><br/>
            <a href="${process.env.CLIENT_URL}/confirm/${token}">
            ${process.env.CLIENT_URL}/confirm/${token}</a>`
        }
       
    },

    orderConfirm (user, order) {
        return{
            to:user.email,
            subject:"Order Confirmation",
            text:`Thank you for Shopping from Us. Your Order No. is ${order.orderNo}`,
            html:`<h3>Hello ${user.name}!</h3><br/>
            <p>Thank you for Shopping from Us. Your Order No. is <storng>${order.orderNo}</strong></p>
            <p>You will receive your order within 24 hours.<br/>
                Please come back again.<br/>
                <i>regards</i> <a href="${process.env.CLIENT_URL}>"<strong>Veggie Wala</strong></a>
            </p>`
        }
        
    }
}