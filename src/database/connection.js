import Sequelize from 'sequelize';
import fs from "fs"

const config = require('./config/db.json')["development"];
const modelFiles = fs.readdirSync(__dirname + "/models/").filter((file) => file.endsWith(".js"));

const init = async () => {

    let connection = new Sequelize(config.database, config.username, config.password, config);

    

    await connection.authenticate();

    for (const file of modelFiles) {
        const model = await import(`${__dirname}/models/${file}`);
        model.default(connection);
    }

    for (const model of Object.values(connection.models))
        if (model.associate)
            model.associate(connection.models)


    return connection;

}

export default init;
