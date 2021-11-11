import { Client, Collection, Intents } from "discord.js";
import { Command, InteractionCommand } from "./Commands";

import * as glob from "glob";
const { promisify } = require("util");

const pGlob = promisify(glob);

export class BotClient extends Client {
	commands: Collection<string, Command | InteractionCommand> = new Collection();

	constructor() {
		super({
			partials: ["MESSAGE", "CHANNEL", "REACTION"],
			restTimeOffset: 0,
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES]
		});
	}

	Internal = {
		owner: (id?: string) => {
			const owners = require(process.cwd() + "/package.json").author.split(" ");

			if (!id) return owners;

			return owners.includes(id);
		}
	};

	async start(token: string) {
		const commands = await pGlob(`${__dirname}/../../Commands/**/*{.js}`);
		const SlashCommands = await pGlob(`${__dirname}/../../Interactions/SlashCommands/*{.js}`);

		commands.map(async (file: string) => {
			let cmd: Command = await import(file);

			if (!cmd.name) return console.error(`Missing command name to ${file}`);

			if (this.commands.get(cmd.name)) {
				console.error(`Found two commands with the same name! (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(cmd.name).path + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(cmd.name, cmd);
		});

		SlashCommands.map(async (file: string) => {
			let cmd: InteractionCommand = await import(file);

			if (!cmd.name) return console.error(`Missing command name to ${file}`);

			if (this.commands.get(`SlashCommand_${cmd.name}`)) {
				console.error(`Found two commands with the same name! (${cmd.name})\nPaths:`);
				return console.error(this.commands.get(`SlashCommand_${cmd.name}`).path + "\n" + file);
			}

			Object.assign(cmd, { path: file });

			this.commands.set(`SlashCommand_${cmd.name}`, cmd);
		});

		this.login(token);
	}
}
