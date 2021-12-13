const { Router } = require('express');
const router = Router();

const nodemailer = require('nodemailer');

router.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;

    contentHTML = `
        <h1>Informacion del Contacto</h1>
        <ul>
            <li>Nombre: ${name}</li>
            <li>Correo: Electronico: ${email}</li>
            <li>Telefono: ${phone}</li>
        </ul>
        <p>${message}</p>
    `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 465,
        secure: false,
        auth: {
            user: '0b16981e3538b6',
            pass: '788f764bc300cd'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Jorge Loor" <nijelo3889@iistoria.com>', 
        to: 'nijelo3889@iistoria.com',
        subject: 'Mensaje desde mi Pagina',
        // text: 'Hello World'
        html: contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.redirect('/success.html');
});

module.exports = router;