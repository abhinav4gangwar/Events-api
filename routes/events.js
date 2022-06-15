const express = require('express')
const router = express.Router()

const {
    getHome,
    getEvent,
    getAllEvents,
    createEvent,
    modifyEvent,
    deleteEvent,

} = require('../controllers/events')

router.route('/').get(getHome)
router.route('/event').get(getEvent)
router.route('/events').get(getAllEvents)
router.route('/events').post(createEvent)
router.route('/events/:id').put(modifyEvent).delete(deleteEvent)


module.exports = router