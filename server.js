const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    let oyy = `nama : ${req.body.name} \nemail : ${req.body.email} \npesannya adalah : \n${req.body.message}`
    client.messages.create({
        from: 'whatsapp:+6287753889031',
        to: 'whatsapp:+6282335283181',
        body: oyy
    }).then(message => console.log(message.sid));
    res.send('Data received');
});

app.get('/', (req, res) => {
    res.send('Welcome to Satrio Server!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});