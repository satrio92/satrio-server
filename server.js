const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

mongoose.connect('mongodb+srv://kukuh_satrio:kukuhsatrio123@cluster0.jf4gbun.mongodb.net/kukuhsatrio?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
})

// Define schema for shortlink
const shortlinkSchema = new mongoose.Schema({
    fullUrl: String,
    shortUrl: String,
});

// Create model for shortlink
const Shortlink = mongoose.model('Shortlink', shortlinkSchema);

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

// Endpoint for creating shortlinks
app.post('/shortlinks', async (req, res) => {
    const fullUrl = req.body.fullUrl;
    const shortUrl = shortid.generate();
  
    // Save shortlink to database
    const shortlink = new Shortlink({
      fullUrl: fullUrl,
      shortUrl: shortUrl,
    });
    await shortlink.save();
  
    // Return shortlink to client
    const response = {
      fullUrl: fullUrl,
      shortUrl: shortUrl,
    };
    res.send(response);
  });
  
  // Endpoint for redirecting shortlinks
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
  
    // Find shortlink in database
    const shortlink = await Shortlink.findOne({ shortUrl: shortUrl });
  
    if (!shortlink) {
      return res.status(404).send('Shortlink not found');
    }
  
    // Redirect to full URL
    // res.redirect(shortlink.fullUrl);
    res.send(shortlink.fullUrl);
  });

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});