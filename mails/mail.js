const nodemailer = require('nodemailer');
const { Eleve } = require('./retardEleve');
const { Tuteur } = require('./retardTuteur');

const getEmailData = (to, name, template) => {
  let data = null;

  switch (template) {
    case 'eleve':
      data = {
        from: 'PFE Polystage <pfepolystage@gmail.com>',
        to,
        subject: `Retard élève: ${name}`,
        html: Eleve(),
      };
      break;

    case 'tuteur':
      data = {
        from: 'PFE Polystage <pfepolystage@gmail.com>',
        to,
        subject: `Retard tuteur: ${name}`,
        html: Tuteur(),
      };
      break;

    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, type) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pfepolystage@gmail.com',
      pass: 'polytech',
    },
  });

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('email sent successfully');
      console.log(response);
      res.status(200).json({ message: 'Mail envoyé' });
      response.status(200).json({ message: 'Mail envoyé' });
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
