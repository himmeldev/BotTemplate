const { BotClient } = require("./Util/Classes/BotClient");
const { token, prefix } = require(process.cwd() + "/config.json");
const { Functions } = require(process.cwd() + "/src/Util/Handlers/LoadFunctions");
const { LoadEvents } = require("./Util/Handlers/LoadEvents");
const db = require("quick.db");

const client = new BotClient();

const d = {
	client,
	db,
	Functions,
	commands: client.commands,
	configuration: {
		prefix,
        token
	}
};

LoadEvents(d);

module.exports = {
	client,
	d
};

client.start(token);
