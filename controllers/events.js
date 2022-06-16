const { MongoClient } = require("mongodb");
var ObjectId = require('mongodb').ObjectID;
const url = require('url')
const uri =
    "mongodb+srv://abhigg12433:Abhi1234.@cluster0.ofazqsb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

client.connect();
const database = client.db('agile');
const Events = database.collection('Events');


const getHome = async(req, res) => {
    const event = await Events.findOne({ tagline: 'abcde' });
    console.log(event)
    return res.status(200).json(event)

}


const getEvent = async(req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const eventID = queryObject.id;

    const event = await Events.findOne({ "_id": new ObjectId(eventID) })
    if (!event) {
        return res.send(`No event with id : ${eventID}`)
    }
    return res.status(200).json({ event })
}

const getAllEvents = async(req, res) => {
    const events = await Events.find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        return res.status(200).json({ result })
    });


}


const createEvent = async(req, res) => {
    console.log(req.body)
    const event = await Events.insertOne(req.body)
    res.status(201).json({ event })
}

const modifyEvent = async(req, res) => {
    const { id: eventID } = req.params
    const event = await Events.updateOne({ _id: new ObjectId(eventID) }, { $set: req.body })

    if (!event) {
        return `No event with id : ${eventID}`
    }

    res.status(200).json({ event })
}

const deleteEvent = async(req, res) => {
    const { id: eventID } = req.params
    const event = await Events.deleteOne({ _id: new ObjectId(eventID) })

    if (!event) {
        return `No event with id : ${eventID}`
    }

    res.status(200).json({ event })
}



module.exports = {
    getHome,
    getEvent,
    getAllEvents,
    createEvent,
    modifyEvent,
    deleteEvent,

}