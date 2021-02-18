/* eslint-disable no-undef */
const fs = require('fs');
const Discord = require(`discord.js`);
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const { prefix, token, JuhJuhButtID } = require(`./info/config.json`);
const errorReplies = require(`./info/errors.json`);
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Enmap = require('enmap');
const mainEnmap = new Enmap({
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
		} else if (message.content.toLowerCase.has(["nigger", "nigga", "faggot", "fag"]) && !message.author.bot) {
			const embed = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setTitle('Soft-warn')
				.setDescription(`${message.author.tag} (${message.member.nickname}) sent a potentially offensive message. This could be dismissed by the Admins or lead to consequences.`)
				.addField('Message content', message.content, true)
				.addField('Link to message', message.url)
				.addField('About this soft-warn', 'Only warns issued via <@292953664492929025> can affect future punishments. Admins may issue a warn or punishment based on this message.')
				.setTimestamp()
				.setFooter('This action was performed automatically and may be a misfire.');
			bot.channels.cache.get('722710030649917440').send(embed);
		}
	}
	const args = message.content.slice(prefix.length).split(/ +/);

	const clean = text => {
		if (typeof (text) === "string")
			return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
			return text;
	}
	if (message.content.startsWith(prefix + "eval")) {
		if (message.author.id !== JuhJuhButtID) return;
		try {
			const code = args.join(" ");
			let evaled = eval(code);

			if (typeof evaled !== "string")
				// eslint-disable-next-line no-undef
				evaled = require("util").inspect(evaled);

			message.channel.send(clean(evaled), { code: "xl" });
		} catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	}

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
			.addField('Error', 'Command not found/invalid syntax', true);
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
			.addField('Error', 'Cannot execute commands in DMs', true));
		return;
	}

	if (command.args && !args.length) {
		const embed = new Discord.MessageEmbed()
			.setTitle('File an issue')
			.setURL('https://joelne.digital/BBissue')
			.setColor('#ff0000')
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
			.addField('Error', 'Insufficient information', true);

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
				.addField('Error', error, true);
			message.channel.send(embed);
		});
		return;
	}
	if (command === 'tourney' && !message.author.id === JuhJuhButtID) {
		message.channel.send('so basically this command isnt done yet. you should probably pay attention to joel when he says not to use it.');
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
			.addField('Error', error, true);
		console.error(error);
		message.channel.send(embed);
	}
});

bot.login(token);