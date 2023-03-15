const Task = require('../models/task')
const express = require('express');
const router = axpress.Router()

//add todo
router.post('/', async (req, res) => {
    try{
        const task = await new Task(req.body).save();
        res.send(task)
    }catch (error) {
        res.send(error)

    }
})

//get todos from database
router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.send(tasks)
    } catch (error) {
        res.send(error)
    }

})

//update / edit
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({
            _id: req.params.id},
            req.body
        )
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        res.send(task)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router;