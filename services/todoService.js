import { where } from 'sequelize';
import { Todos } from '../models/todo.js';


const insertData = async (group, subtask, isUrgent, isDone, hours) => {
    try {
        const todoList = await Todos.create({
            group,
            subtask,
            isUrgent,
            isDone,
            hours
        });
        return todoList;
    } catch (err) {
        console.log('Getting error while inserting data to database!')
    }
};

const updateTodo = async (task_id, isDone) => {
    try {
        if (task_id === null) {
            res.status(400).json({ message: "Task id is required, please provide a valid task id." });
            return;
        }
        const update = await Todos.update({ isDone: isDone }, {
            where: { task_id: task_id }
        });
        return update[0];
    } catch (err) {
        console.log(`Getting error while updating todolist with this id ${task_id}`);
    }
}

export { insertData, updateTodo }