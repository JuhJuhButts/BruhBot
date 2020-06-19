const fs = require('fs');
const Discord = require(`discord.js`);
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const { prefix, token } = require(`./config.json`);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.once(`ready`, () => {
	bot.user.setActivity('your complaining on joelne.digital/BBissue', { type: 'LISTENING' });
	console.log(`Login successful.`);
});

bot.on(`message`, message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	if (!bot.commands.has(commandName)) return;

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t do that in DMs, idiot');
	}

	if (command.args && !args.length) {
		let reply = `Gonna need more info, pal`

		if (command.usage) {
			reply += `\nThis is how to do it right: \`${prefix}${command.name} ${command.usage}\``
		}
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		bot.channels.cache.get(`723604098754019478`).send(error)
		message.reply(`There was an error trying to execute that command. Try again if you really feel like it.`);
}});

bot.login(token);