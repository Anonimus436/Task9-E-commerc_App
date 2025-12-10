const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host : " " ,
    port : 587 ,
    secure : false ,
    auth : {user : "" , pass : ""}
})

const sendMessage = () => {
const mailOptions = {
    from : " " ,
    to : " " ,
    subject : " " ,
    text : " "
}

transporter.sendMail(mailOptions , (error , info) => {
    if(error){
        return console.log("Error sending Message :" , error.message)
    }
    console.log(`Message sent : ${info.messageId} - ${info.response}`)
})
}
module.exports = sendMessage ;
