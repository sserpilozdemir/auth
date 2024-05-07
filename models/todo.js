import Sequelize from 'sequelize';
import { DataTypes } from 'sequelize';

const sequelize = new Sequelize('todo', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres'
    // define: {
    //     freezeTableName: true
    // }
});

const Todos = sequelize.define('todos', {
    task_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    group: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 20]
        }
    },
    subtask: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'support'
    },
    isUrgent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hours: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: {
            isNumeric: {
                msg: "Please enter a number for worklog!"
            }
        }
    }

},
    {
        freezeTableName: true,
        timestamps: false
    });

// Todos.sync({ alter: true }).then(() => {
//     return "Success sync todos table with database!";
// }).catch((err) => {
//     console.log("Error syncing the table", err);
// })

export default sequelize;
export { Todos };