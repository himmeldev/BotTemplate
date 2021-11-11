import { MessageAttachment, TextChannel, User } from "discord.js";
import { D } from "../TypeScript/Interfaces";
const { inspect } = require("util");

export const HandleError = async (target: User | TextChannel, d: D, error: any) => await target.send({ content: `A new error ocurred.\nChannel: ${d.channel}\nUser: ${d.user}\nResume: ${inspect(error)}`, files: [new MessageAttachment(Buffer.from(error.toString(), "utf-8"), "error.js")] });
