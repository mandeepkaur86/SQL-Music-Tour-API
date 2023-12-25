// DEPENDENCIES
const events = require('express').Router()
const{ Op } =require('sequelize')
const db = require('../models')
const { Event } = db


// ROUTES:

// Find all Events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']]
        })
        res.status(200).json(foundEvents)        
    } catch (error) {
        res.status(500).json(error)
    }
})

// Find a Specific Event
events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: {event_id: req.params.id}
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Create an Event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Event created successfuly!',
            data: newEvent
        })
    } 
    catch (error) {
        res.status(500).json(error)
    }
})
//syntax to create event
// {
//     "name": "EventName",
//     "date": "2023-09-10",
//     "start_time": "2023-09-10T00:00:00" ,
//     "end_time": "2023-09-10T00:00:00"
//   }

// Update an Event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvent} event(s)`
        })
    } catch (error) {
        res.status(500).json(error)    
    }
})

// Delete an Event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfuly deleted ${deletedEvent} event(s)`
        })
    } 
    catch (error) {
        res.status(500).json(error)
    }
})

// EXPORT
module.exports = events