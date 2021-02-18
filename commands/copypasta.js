module.exports = { // eslint-disable-line no-undef
	name: 'copypasta',
	description: 'sends or adds copypasta.',
	aliases: ["paste", "rant", ""],
	args: false,
	usage: " ",
	// eslint-disable-next-line no-unused-vars
	execute(message, args, Discord, mainEnmap, Enmap) {
		// eslint-disable-next-line no-undef
		const errorReplies = require('../info/json/errors.json')
		const copypasta = new Enmap({
			name: "copypasta",
			dataDir: "../info/Enmap",
			polling: true,
			pollingInterval: 15000
		});
		const tempStorage = new Enmap({
			name: "temp",
			dataDir: "../info/Enmap"
		});
		if (args[0] === 'add' || args[0] === 'save') {
			if (args[1]) {
				const pasta = args.slice(2).join(' ');
				copypasta.set(args[1], pasta);
				const embed = new Discord.messageEmbed()
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setColor('#00ff00')
					.setTitle('Added copypasta')
					.addField('Copypasta ID', args[1])
					.addField('Copypasta', copypasta.get(args[1]));
				message.channel.send(embed);
			} else {
				const embed = new Discord.MessageEmbed()
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setTitle("Interactive mode")
					.setColor('#03b1fc')
					.setDescription("What is the ID of the copypasta? This will be used to refer to it when pasting.")
					.addField("Formatting:", "Begin your message with `\\` if you want me to ignore it")
					.addField("Allowed responses:", "A one-word ID with no spaces");
				message.channel.send(embed);
				const filter = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
				const collector = message.channel.createMessageCollector(filter, { time: 60 });

				collector.on('collect', async (m) => {
					await tempStorage.set('ID', m.content);
					await m.delete({ timeout: 5, reason: "interactive mode" });
					await message.client.user.lastMessage.delete();
					await collector.stop();
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
				}); const filter1 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
				const collector1 = message.channel.createMessageCollector(filter1, { time: 60 });

				collector1.on('collect', async (m) => {
					await copypasta.set(tempStorage.get("ID"), m.content);
					await m.delete({ timeout: 5, reason: "interactive mode" });
					await message.client.user.lastMessage.delete();
					await collector1.stop();
				});
				collector1.on('end', collected => {
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
			}
		} else {
			if (copypasta.get(args[0])) {
				message.channel.send(copypasta.get(args[0]))
			} else {
				const embed = new Discord.MessageEmbed()
					.setTitle('File an issue')
					.setURL('https://joelne.digital/BBissue')
					.setColor('#ff0000')
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
					.addField('Error', 'Copypasta not found');
				message.channel.send(embed);
			}
		}
		tempStorage.destroy();
	},
};