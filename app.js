const express = require("express")
var bodyParser = require('body-parser');
const events = require('./routes/events');

const app = express()

const port = 2000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v3/app', events);


// const database = client.db('agile');
// const events = database.collection('Events');

// // Query for a movie that has the title 'Back to the Future'
// const query = { tagline: 'abcde' };
// const event = await events.findOne(query);

// console.log(event);




const start = async() => {
    await app.listen(port,
            console.log(`server is listening on port ${port}...`)
        )
        // client.close()
}

start().catch(console.dir);