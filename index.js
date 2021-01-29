const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const { sendEmail } = require('./mails/mail');

app.post('/api/sendMail/eleve', (req, res) => {
  sendEmail('pfepolystage@gmail.com', req.body.name, 'eleve');
  res.status(200).json({ message: 'Mail envoyé' });
});

app.post('/api/sendMail/tuteur', (req, res) => {
  sendEmail('pfepolystage@gmail.com', req.body.name, 'tuteur');
  res.status(200).json({ message: 'Mail envoyé' });
});

app.listen(5000, () => {
  console.log('Server Running at 5000 ');
});
