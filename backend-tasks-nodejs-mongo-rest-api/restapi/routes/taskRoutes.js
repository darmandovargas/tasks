'use strict';
// Routes and methods definition
module.exports = function(app) {
    var task = require('../controllers/taskCtrl');
    app.route('/tasks')
        .get(task.tasks)
        .post(task.add);
    app.route('/tasks/:taskId')
        .get(task.gettask)
        .put(task.update)
        .delete(task.delete);
    app.route('/tasksByName/:taskName')
        .get(task.gettaskbyname)
        .put(task.update)
        .delete(task.delete);
};