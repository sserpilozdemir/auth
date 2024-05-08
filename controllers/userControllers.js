import { insertData, updateTodo } from '../services/todoService.js';

const insertActionTodo = async (req, res) => {
    const { username, group, subtask, isUrgent, isDone, hours } = req.body;
    try {
        await insertData(group, subtask, isUrgent, isDone, hours);
        return res.status(201).json({ message: `Information is inserted to database by ${username}.` });
    } catch (err) {
        console.log("Error inserting todoList! err : ", err);
        res.status(500).json({ message: "Failes to insert todoList!" });
    }
};

const updateTask = async (req, res) => {
    const { task_id, isDone } = req.body;
    try {
        if (typeof task_id !== 'number' || typeof isDone !== 'boolean') {
            return res.status(400).json({ message: "Please provide a valid task id or isDone !" });
        }
        const updated = updateTodo(task_id, isDone);

        if (updated === 0) {
            return res.status(404).json({ message: "No task found with the given ID." });
        } else {
            return res.status(200).json({ message: `The task with ID ${task_id} has been updated to isDone ${isDone}.` });
        }
    } catch (err) {
        res.status(500).json({ message: `Error while updating task: ${err}` });

    }
};


export default { insertActionTodo, updateTask };