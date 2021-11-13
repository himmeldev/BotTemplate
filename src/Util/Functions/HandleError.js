const { MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports = {
	HandleError: async (d, error) => await d.client.owner.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${error.toString()}`, files: [new MessageAttachment(Buffer.from(inspect(error), "utf-8"), "error.js")] })
};
