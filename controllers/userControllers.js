import { Todos } from '../models/todo.js';


const insertActionTodo = async (req, res) => {
    const { username, group, subtask, isUrgent, isDone, hours } = req.body;

    try {
        const todoList = await Todos.create({
            group,
            subtask,
            isUrgent,
            isDone,
            hours
        });
        return res.status(201).json({ message: `Information is inserted to database by user ${username}`, task: todoList });
    } catch (err) {
        console.log("Error inserting todoList!");
        res.status(500).json({ message: "Failes to insert todoList!" });
    }

};

const updateTask = async (req, res) => {
    const { task_id, isDone } = req.body;
    try {
        if (task_id == null) {
            res.status(400).json({ message: "Task id is required, please provide a valid task id." });
            return;
        }
        const updated = await Todos.update({ isDone: isDone }, {
            where: { task_id: task_id }
        });
        if (updated[0] === 0) {
            res.status(404).json({ message: "No task found with the given ID." });
        } else {
            res.status(200).json({ message: `The task with ID ${task_id} has been updated to isDone ${isDone}.` });
        }
    } catch (err) {
        res.status(500).json({ message: `Error while updating task: ${err}` });
    }
};


export default { insertActionTodo, updateTask };