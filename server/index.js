const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongodb = require('./database');

console.log('Port:', port);


const transporter = nodemailer.createTransport({

  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
      chipers: "SSLv3"
  },
    auth: {
        user: 'proyectosmidi@espol.edu.ec', // Enter here email address from which you want to send emails
        pass: 'Amomidi2001' // Enter here password for email account from which you want to send emails
    },
    tls: {
    rejectUnauthorized: false
    }
});

//Settings
app.set('port', port);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin: '/dist/proyectoscrum'}));
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Routes
app.use('/user',require('./routes/user.routes'));
app.use('/auth',require('./routes/auth.routes'));
app.use('/lineagrafica',require('./routes/lineagrafica.routes'));
app.use('/encuesta',require('./routes/encuesta.routes.js'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + port);
});



app.post('/send', function (req, res) { 

    let senderName = req.body.contactFormName;
    let senderEmail = req.body.contactFormEmail;
    let messageSubject = req.body.contactFormSubjects;
    let messageText = req.body.contactFormMessage;
    let copyToSender = req.body.contactFormCopy;
  
    let mailOptions = {
      to: ['proyectosmidi@espol.edu.ec','nsolorza@espol.edu.ec','dcarrera@espol.edu.ec'], // Enter here the email address on which you want to send emails from your customers
      from: senderName,
      subject: messageSubject,
      text: messageText,
      replyTo: senderEmail

    };
  
    if (senderName === '') {
      res.status(400);
      res.send({
      message: 'Bad request'
      });
      return;
    }
  
    if (senderEmail === '') {
      res.status(400);
      res.send({
      message: 'Bad request'
      });
      return;
    }
  
    if (messageSubject === '') {
      res.status(400);
      res.send({
      message: 'Bad request'
      });
      return;
    }
  
    if (messageText === '') {
      res.status(400);
      res.send({
      message: 'Bad request'
      });
      return;
    }
  
    transporter.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        res.end('error');
      } else {
        console.log('Message sent: ', response);
        res.end('sent');
      }
    });
  });