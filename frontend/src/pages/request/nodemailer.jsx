const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'crisis.avengers@gmail.com',
    pass: 'crisisavengers' 
  }
});

const sendMail=(to,
  subject,
  text)=>{
    try{

      const mailOptions = {
        from: 'crisis.avengers@gmail.com',
        to: to,
        subject:subject,
        text: text
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } 
        else{
          console.log('Email sent:', info.response);
        }
      });
    }
    catch(e){
      console.log(e)
    }
}


export default sendMail

