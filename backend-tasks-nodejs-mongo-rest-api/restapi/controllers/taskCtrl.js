'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks');
// Get all tasks
exports.tasks = function (req, res) {
    Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        var response = {
            Task: task
        };
        //res.json(response);
        res.json(task);
    });
};
// Add a task
exports.add = function (req, res) {
    var new_task = new Task(req.body);
    new_task.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
// Get a task by id
exports.gettask = function (req, res) {
    Task.findById(mongoose.Types.ObjectId(req.query.taskId), function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
// Get a task by name
exports.gettaskbyname = function (req, res) {
    Task.find({ "name": { $regex: req.query.taskName } }).exec(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
// Update a task
exports.update = function (req, res) {
    var id = mongoose.Types.ObjectId(req.query.taskId);
    Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};
// Delete a task
exports.delete = function (req, res) {
    Task.remove({
        _id: req.params.taskId
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({ message: 'Task deleted successfully' });
    }).exec();
};
