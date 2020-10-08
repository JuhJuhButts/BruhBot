module.exports = { // eslint-disable-line no-undef
	name: 'poll',
	description: 'A poll function. You can make it a "yes or no" or multiple choice poll. (For poll options that have multiple words, it would be a good idea to send the options first, then run the poll command.)',
	aliases: ['p'],
	args: false,
	// eslint-disable-next-line no-unused-vars
	execute(message, args, Discord, Enmap) {
		const pollEmbed = require('discord.js-poll-embed'); // eslint-disable-line no-undef
		const errorReplies = require('../info/errors.json') // eslint-disable-line no-undef
		const pollEnmap = new Enmap({
			name: "poll",
			dataDir: "./info/Enmap"
		});
		async function question(q, p) {
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setTitle("Interactive mode")
				.setColor('#03b1fc')
				.setDescription(q)
				.addField("Formatting:", "Begin your message with `\\` if you want me to ignore it")
				.addField("Allowed responses:", p);
			message.channel.send(embed);
		}
		question("Is this a yes or no question?", "true or false");
		const filter = m => !m.content.startsWith('\\') && m.author.id === message.author.id && (m.content === 'true' || m.content === 'false');
		const collector = message.channel.createMessageCollector(filter, { time: 60 });

		collector.on('collect', m => {
			if (m.content === 'true') {
				pollEnmap.set('yesOrNo', true);
			} else {
				pollEnmap.set('yesOrNo', false);
			}
			collector.stop();
		});
		collector.on('end', collected => {
			if (!collected) {
				const embed = new Discord.MessageEmbed()
					.setTitle('File an issue')
					.setURL('https://joelne.digital/BBissue')
					.setColor('#ff0000')
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
					.addField('Error', 'Insufficient information')
					.addField('Likely causes:', 'You sent an invalid value and/or time ran out');
				message.channel.send(embed);
			}
		});
		if (pollEnmap.get('yesOrNo') === false) {
			question("What choices should the poll have?", "Up to 10 choices, separated by a space");
			const filter = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
			const collector = message.channel.createMessageCollector(filter, { time: 120 });

			collector.on('collect', m => {
				pollEnmap.set('choices', m.content.split(/ +/));
				collector.stop();
			});
			collector.on('end', collected => {
				if (!collected) {
					const embed = new Discord.MessageEmbed()
						.setTitle('File an issue')
						.setURL('https://joelne.digital/BBissue')
						.setColor('#ff0000')
						.setAuthor(message.member.nickname, message.author.avatarURL())
						.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
						.addField('Error', 'Insufficient information')
						.addField('Likely causes:', 'You sent an invalid value and/or time ran out');
					message.channel.send(embed);
				}
			});
		} else {
			pollEnmap.set('choices', ["Yes", "No"]);
		}

		message.channel.send(pollEmbed(message, pollEnmap.get('title'), pollEnmap.get('choices')))
			.catch(error => {
				const embed = new Discord.MessageEmbed()
					.setTitle('File an issue')
					.setURL('https://joelne.digital/BBissue')
					.setColor('#ff0000')
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
					.addField('Error', error);
				message.channel.send(embed);
		});
	},
};