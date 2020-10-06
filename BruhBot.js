/* eslint-disable no-undef */
const fs = require('fs');
const Discord = require(`discord.js`);
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const { prefix, token } = require(`./info/config.json`);
const errorReplies = require(`./info/errors.json`);
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Enmap = require('enmap'); // eslint-disable-line no-unused-vars
const mainEnmap = new Enmap({ // eslint-disable-line no-unused-vars
	name: "main",
	fetchAll: false,
	dataDir: "./info/Enmap",
	polling: true,
	pollingInterval: 5000
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);/* eslint-enable no-undef */
	bot.commands.set(command.name, command);
}

bot.once(`ready`, () => {
	bot.user.setActivity('Sonic Underground', { type: 'WATCHING' });
	console.log(`I'm in.`);
});

bot.on(`message`, message => {
	if (!mainEnmap.isReady) {
		const embed = new Discord.MessageEmbed()
			.setTitle('File an issue if you see this too much')
			.setURL('https://joelne.digital/BBissue')
			.setColor('#ff0000')
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setDescription('My database isn\'t ready yet. Wait ~5 seconds and try again.');
		message.channel.send(embed);
	}
	if (!message.content.startsWith(prefix) || message.author.bot) {
		if (message.content.toLowerCase().has(["darn", "damn", "shit", "fuck", "bitch", "ass", "cunt", "apple", "butt", "poop", "shucks", "frak", "shite", "frick", "dang"]) && !message.author.bot) {
			message.channel.send('OH NO! You said a bad word, I\'m going to have to ask you to leave my birthday party.');
		}
	}
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
			.addField('Error:', 'Command not found/invalid syntax', true);
		message.channel.send(embed)
		return;
	}

	if (message.channel.type !== 'text') {
		message.channel.send(new Discord.MessageEmbed()
			.setTitle('File an issue')
			.setURL('https://joelne.digital/BBissue')
			.setColor('#ff0000')
			.setAuthor(message.author.tag, message.author.avatarURL())
			.setDescription('lmao bro I don’t want to date you get out of my DMs')
			.addField('Error:', 'Cannot execute commands in DMs', true));
		return;
	}

	if (command.args && !args.length) {
		const embed = new Discord.MessageEmbed()
			.setTitle('File an issue')
			.setURL('https://joelne.digital/BBissue')
			.setColor('#ff0000')
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
			.addField('Error:', 'Insufficient information', true);

		if (command.usage) {
			embed.addField('Usage:', prefix + command.name + command.usage);
		}
		message.channel.send(embed).catch((error) => {
			const embed = new Discord.MessageEmbed()
				.setTitle('File an issue')
				.setURL('https://joelne.digital/BBissue')
				.setColor('#ff0000')
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
				.addField('Error:', error, true);
			message.channel.send(embed);
		});
		return;
	}

	try {
		command.execute(message, args, Discord, mainEnmap, Enmap);
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
	}
});

bot.login(token);