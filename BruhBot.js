const fs = require('fs');
const Discord = require(`discord.js`);
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const { prefix, token } = require(`./info/config.json`);
const { errorReplies } = require(`./info/errors.json`);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

bot.once(`ready`, () => {
	bot.user.setActivity('Minecraft (do not disturb!!!!!!!!!)) ');
	console.log(`I'm in.`);
});

bot.on(`message`, message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
		|| bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) {
		const embed = new Discord.MessageEmbed()
			.setTitle('File an issue')
			.setURL('https://joelne.digital/BBissue')
			.setColor('#ff0000')
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
			.addField('Error:', 'Command not found', true);
		message.channel.send(embed)
		return;
	}

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.channel.send('lmao bro I don’t want to date you get out of my DMs');
	}

	if (command.args && !args.length) {
		let reply = `That's a pretty weak argument.`

		if (command.usage) {
			reply += `\nThis is how to do it right: \`${prefix}${command.name} ${command.usage}\``
		}
		message.channel.send(reply);
		return;
	}

	try {
		command.execute(message, args, Discord);
	} catch (error) {
		const embed = new Discord.MessageEmbed()
			.setTitle('File an issue')
			.setURL('https://joelne.digital/BBissue')
			.setColor('#ff0000')
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
			.addField('Error:', error, true);
		console.error(error);
		message.channel.send(embed);
}});

bot.login(token);