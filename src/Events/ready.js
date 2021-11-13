const { Event } = require("../Util/Classes/Event");

module.exports = new Event({
	name: "ready",
	run: async (d) => {
		d.client.owner = d.client.users.cache.get(d.client.Internal.owner()[0]) || (await d.client.users.fetch(d.client.Internal.owner()[0]));
		console.log(`The client '${d.client.user.tag}' is online.\nCounting data:\n[${d.commands.size}] Commands were loaded (${AliasesCount(d.commands)} Aliases.)\n[${d.client._eventsCount}] Events active.`);
	}
});

const AliasesCount = (commands) =>
	commands
		.map((cmd) => cmd?.aliases)
		.flat()
		.filter((data) => data).length;
