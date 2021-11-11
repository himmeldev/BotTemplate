# Discord Bot Template for discord.js

Hey! Welcome, I have nothing to say, so just let's start explaining.

## Before starting, basic steps:

1. Use `npm i` or `yarn install` to install all the initial (required) packages.
2. Create a file called `config.json` **outside the `src` folder** with the next data:

```ts
{
    "token": string;
    "prefix": string;
}
```

## How to create commands, slash commands, or events:

There's already an event example in the path `src/Events/ready.js`, for commands it's like this:

```ts
module.exports = new Command({
    name: string;
	aliases?: string[] /** array of strings */;
	description?: string;
	cooldown?: {
		type: string;
		time?: string /** This is needed if 'cooldown.type' is not set to 'none' */;
	};
	usage?: string;
	examples?: string;
	category: string;
	path: string /** This is automatically managed. Used for checking purposes (Anti-commands duplication) */;
	run: RunCommand;
});
```

A example is:

```js
module.exports = new Command({
	name: "test",
	aliases: ["t"],
	description: "This is a test command!",
	cooldown: {
		type: "none"
	},
	category: "general",
	run: async (d) => {
		d.message.reply({ content: "Hi! The test command is working! " });
	}
});
```
