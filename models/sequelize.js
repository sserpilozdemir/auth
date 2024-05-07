import Sequelize from 'sequelize';
import bcrypt from 'bcrypt';
import zlib from 'zlib';

import { DataTypes } from 'sequelize';

const sequelize = new Sequelize('todo', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres'
    // define: {
    //     freezeTableName: true
    // }
});

const User = sequelize.define('user', {

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 11]
        }
    },
    password: {
        type: DataTypes.STRING,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            myEmailValidator(value) {
                if (value === null) {
                    throw new Error("Email validation error!")
                }
            }
        }
    },
    role: {
        type: DataTypes.STRING,
        set(value) {
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('role', compressed);
        },
        get() {
            const value = this.getDataValue('role');
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));

            return uncompressed.toString();
        }
    }

},
    {
        freezeTableName: true,
        timeStamp: false
    });

// User.sync({ alter: true }).then(() => {
//     return "Success sync with database!";
// }).catch((err) => {
//     console.log("Error syncing the table", err);
// });


export default sequelize;

export { User };
