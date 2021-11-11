const { MessageAttachment } = require("discord.js");
const { inspect } = require("util");

module.exports = {
	HandleError: async (target, d, error) => await target.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${inspect(error)}`, files: [new MessageAttachment(Buffer.from(error.toString(), "utf-8"), "error.js")] })
};
