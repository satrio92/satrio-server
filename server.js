const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const accountSid = 'AC0870d499d521669e07919bb86af72a07';
const authToken = '163c8b79b30cec52929f04477a495a6e';
const client = require('twilio')(accountSid, authToken);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// parse application/json
app.use(bodyParser.json());

app.post('/send-message', (req, res) => {
    let oyy = `
    nama : ${req.body.name} \nemail : ${req.body.email} \npesannya adalah : \n${req.body.message}`
    client.messages.create({
        from: 'whatsapp:+14155238886',
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