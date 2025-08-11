const { verificationTemplate } = require("./mailTemplate")
const { mailClient, sender } = require("./mailtrap")

async function SendVerificationEmail(email,verificationToken){
    const recipients = [{email:"youremail@gmail.com"}]
    try {
        const res = await mailClient.send({
            from:sender,
            to:recipients,
            subject:"Verify Your Email To Get Started",
            html:verificationTemplate(verificationToken)
        })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

// SendVerificationEmail()
module.exports = {SendVerificationEmail}