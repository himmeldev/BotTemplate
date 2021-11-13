const { Client, Collection, Intents } = require("discord.js");
const glob = require("glob");
const { promisify } = require("util");
const pGlob = promisify(glob);

class BotClient extends Client {
	commands = new Collection();
	statcord;

	constructor() {
		super({
			partials: ["MESSAGE", "CHANNEL", "REACTION"],
			restTimeOffset: 0,
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES]
		});
	}

	Internal = {
		owner: (id) => {
			const owners = require(process.cwd() + "/package.json").author.split(" ");

			if (!id) return owners;

			return owners.includes(id);
		}
	};

	async start(token) {
		const commands = await pGlob(`${process.cwd()}/src/Commands/**/*{.ts,.js}`);
		const SlashCommands = await pGlob(`${process.cwd()}/src/Interactions/SlashCommands/*{.ts,.js}`);

		commands.map(async (file) => {
			let cmd = require(file);

			if (!cmd?.name) return console.error(`Missing command name to ${file}`);

			if (this.commands.get(cmd.name)) {
				console.error(`Found two commands with the same name! (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(cmd.name).path + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(cmd.name, cmd);
		});

		SlashCommands.map(async (file) => {
			let cmd = require(file);

			if (!cmd.name) return console.error(`Missing command name to ${file}`);

			if (this.commands.get(`SlashCommand_${cmd.name}`)) {
				console.error(`Found two commands with the same name (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(`SlashCommand_${cmd.name}`) + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(`SlashCommand_${cmd.name}`, cmd);
		});

		this.login(token);
	}
}

module.exports = { BotClient };
