import { Tasks } from '../../imports/api/tasks.js';
import { Template } from 'meteor/templating';
 
Template.toDoList.helpers({
	tasks() {
		return Tasks.find({}, { sort: { createdAt: -1 } });
	}
});

Template.toDoList.events({
	addTask(newTask) {
		// Insert a task into the collection
		Tasks.insert({
			text: newTask,
			createdAt: new Date
		});

		// Clear form
		this.newTask = '';
	},
	setChecked(task) {
		// Set the checked property to the opposite of its current value
		Tasks.update(task._id, {
			$set: {
				checked: !task.checked
			},
		});
	},

	removeTask(task) {
		Tasks.remove(task._id);
	}
})