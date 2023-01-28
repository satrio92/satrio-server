const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// parse application/json
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('Welcome to Satrio Server!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});