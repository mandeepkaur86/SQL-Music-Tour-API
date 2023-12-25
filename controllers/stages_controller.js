// DEPENDENCIES
const stages = require('express').Router()

const db = require('../models')
const { Stage } = db
//Mandeep
// FIND ALL stages
stages.get('/', async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
    order:[['date', 'ASC']],
    
    })
    res.status(200).json(foundStages)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// FIND A SPECIFIC stages
stages.get('/:id', async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: {stage_id: req.params.id}
    })
    res.status(200).json(foundStage)
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// CREATE A stages
stages.post('/', async (req, res) => {
  try {
    const newStage = await Stage.create(req.body)
    res.status(200).json({
      message: 'Successfully make stages',
      data: newStage
    })
  }
  catch (error) {
    res.status(500).json(error)
  }
})

// UPDATE A stage
stages.put('/:id', async (req, res) => {
  try {
    const updatedStage = await Stage.update(req.body, {
      where: {
        stage_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully updated stage# ${updatedStage}`
    })
  }
  catch (err) {
    res.status(500).json(err)
  }
})

// DELETE A stage
stages.delete('/:id', async (req, res) => {
  try {
    const deletedStage = await Stage.destroy({
      where: {
        stage_id: req.params.id
      }
    })
    res.status(200).json({
      message: `Successfully deleted stage# ${deletedStage}`
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// EXPORT
module.exports = stages