import { MessageAttachment, TextChannel, User } from "discord.js";
import { D } from "../TypeScript/Interfaces";
const { inspect } = require("util");

export const HandleError = async (d: D, error: any) => await d.client.owner.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${error.toString()}`, files: [new MessageAttachment(Buffer.from(inspect(error), "utf-8"), "error.js")] });
