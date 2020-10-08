/* eslint-disable no-case-declarations */
module.exports = { // eslint-disable-line no-undef
	name: 'tourney',
	description: 'Tournament commands. Creating a bracket is limited to @MasterOfPasta#9454 and @JuhJuhButt#3484. ',
	aliases: ['t', 'tournament', 'tournement', 'turnament', 'turnement', 'tournamant', 'tournement'],
	args: true,
	usage: ' has way too much stuff, use `/tournament help` instead',
	execute(message, args, Discord, mainEnmap, Enmap) { // eslint-disable-line no-unused-vars
		const { JuhJuhButtID, TannmannID } = require('../info/config.json'); // eslint-disable-line no-undef
		const errorReplies = require('../info/errors.json') // eslint-disable-line no-undef
		const tourneyEnmap = new Enmap({
			name: "tourney",
			dataDir: "../info/Enmap"
		});
		const tempStorage = new Enmap({
			name: "temp",
			dataDir: "../info/Enmap"
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
		switch (args[0]) {
			case 'b':
			case 'bracket':
				switch (args[1]) {
					case 'c':
					case 'create':
						const allowedNumberOfFighters = [4, 16, 32, 64, 128];
						if (message.member.id === JuhJuhButtID || message.member.id === TannmannID) {
							if (parseInt(args[2]).isNaN && allowedNumberOfFighters.has(parseInt(args[2]))) {
								tourneyEnmap.set('fighterAmount', args[2]);
								if ((args[3] === 'true' || args[3] === 'false')) {
									if (args[3] === 'true') {
										tourneyEnmap.set('isBoss', true);
									} else {
										tourneyEnmap.set('isBoss', false);
									}
								} else {
									tourneyEnmap.set('isBoss', false);
								}
							} else {
								question("How many fighters will enter the tournament?", "4, 16, 32, 64, or 128");
								const filter = m => parseInt(m.content).isNaN && allowedNumberOfFighters.has(parseInt(m.content)) && !m.content.startsWith('\\') && m.author.id === message.author.id;
								const collector = message.channel.createMessageCollector(filter, { time: 60 });

								collector.on('collect', async m => {
									await tourneyEnmap.set('fighterAmount', m.content);
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
								});

								question("Is there going to be a boss?", "true or false");
								const filter1 = m => (m.content === 'true' || m.content === 'false') && !m.content.startsWith('\\') && m.author.id === message.author.id;
								const collector1 = message.channel.createMessageCollector(filter1, { time: 60 });

								collector1.on('collect', async m => {
									if (m.content === 'true') {
										await tourneyEnmap.set('isBoss', true);
									} else {
										await tourneyEnmap.set('isBoss', false);
									}
									await m.delete({ timeout: 5, reason: "interactive mode" });
									await message.client.user.lastMessage.delete();
									collector1.stop();
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
								const embed1 = new Discord.MessageEmbed()
									.setTitle('Created bracket')
									.setColor('#00ff00')
									.setAuthor(message.member.nickname, message.author.avatarURL())
									.addField('Number of fighters:', tourneyEnmap.get('fighterAmount'));
								if (tourneyEnmap.get(isBoss) === true) { // eslint-disable-line no-undef
									embed1.addField('Has boss battle:', ':white_check_mark:')
								} else {
									embed1.addField('Has boss battle:', ':x:')
								}
								message.channel.send(embed1);
							}
						} else {
							const embed = new Discord.MessageEmbed()
								.setTitle('File an issue')
								.setURL('https://joelne.digital/BBissue')
								.setColor('#ff0000')
								.setAuthor(message.member.nickname, message.author.avatarURL())
								.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
								.addField('Error', 'Insufficient permissions', true);
							message.channel.send(embed);
						}
						break;
					case 'a':
					case 'add':

						break;
					default:
						const embed = new Discord.MessageEmbed()
							.setTitle('File an issue')
							.setURL('https://joelne.digital/BBissue')
							.setColor('#ff0000')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
							.addField('Error', 'Command not found/invalid syntax', true);
						message.channel.send(embed);
						break;
				}

				break;
			case 'f':
			case 'fighter':
				switch (args[2]) {
					case 'a':
					case 'add':
						question("What is the fighter's name?", "A word with no spaces (you can use camelCase to identify those who require a space, e.g. Shadow the Hedgehog would become shadowTheHedgehog)")
						const filter = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector = message.channel.createMessageCollector(filter, { time: 60 });

						collector.on('collect', async m => {
							await tempStorage.set('fighterName', m.content);
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
						});
						message.channel.send("Describe the fighter briefly.");
						const filter1 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector1 = message.channel.createMessageCollector(filter1, { time: 60 });

						collector1.on('collect', async m => {
							await tempStorage.set('fighterDescription', m.content);
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
						message.channel.send("Attach an image of the fighter");
						const filter2 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector2 = message.channel.createMessageCollector(filter2, { time: 60 });

						collector2.on('collect', async m => {
							await tempStorage.set('fighterImage', m.attachment.url);
							await m.delete({ timeout: 5, reason: "interactive mode" });
							await message.client.user.lastMessage.delete();
							await collector2.stop();
						});
						collector2.on('end', collected => {
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
						message.channel.send("**Stats:** on a scale of 1-100, how intelligent is this fighter?");
						const filter3 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector3 = message.channel.createMessageCollector(filter3, { time: 60 });

						collector3.on('collect', async m => {
							await tempStorage.set('fighterInt', m.content);
							await m.delete({ timeout: 5, reason: "interactive mode" });
							await message.client.user.lastMessage.delete();
							await collector3.stop();
						});
						collector3.on('end', collected => {
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
						message.channel.send("**Stats:** on a scale of 1-100, how powerful is this fighter?");
						const filter4 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector4 = message.channel.createMessageCollector(filter4, { time: 60 });

						collector4.on('collect', async m => {
							await tempStorage.set('fighterPwr', m.content);
							await m.delete({ timeout: 5, reason: "interactive mode" });
							await message.client.user.lastMessage.delete();
							await collector4.stop();
						});
						collector4.on('end', collected => {
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
						message.channel.send("**Stats:** on a scale of 1-100, how well-defended is this fighter?");
						const filter5 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector5 = message.channel.createMessageCollector(filter5, { time: 60 });

						collector5.on('collect', async m => {
							await tempStorage.set('fighterDef', m.content);
							await m.delete({ timeout: 5, reason: "interactive mode" });
							await message.client.user.lastMessage.delete();
							await collector5.stop();
						});
						collector5.on('end', collected => {
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
						message.channel.send("**Stats:** on a scale of 1-100, how fast is this fighter?");
						const filter6 = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
						const collector6 = message.channel.createMessageCollector(filter6, { time: 60 });

						collector6.on('collect', async m => {
							await tempStorage.set('fighterSpd', m.content);
							await m.delete({ timeout: 5, reason: "interactive mode" });
							await message.client.user.lastMessage.delete();
							await collector6.stop();
						});
						collector6.on('end', collected => {
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
						const name = tempStorage.get('fighterName');
						const desc = tempStorage.get('fighterDescription');
						const image = tempStorage.get('fighterImage');
						const INT = tempStorage.get('fighterInt');
						const PWR = tempStorage.get('fighterPwr');
						const DEF = tempStorage.get('fighterDef');
						const SPD = tempStorage.get('fighterSpd');
						tourneyEnmap.push("fighters", {
							name: {
								"name": name,
								"description": desc,
								"image": image,
								"stats": {
									"INT": INT,
									"PWR": PWR,
									"DEF": DEF,
									"SPD": SPD
								}
							}
						});
						const embed = new Discord.MessageEmbed()
							.setTitle('Added fighter')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setColor('#00ff00')
							.addFields(
								{ name: 'Name:', value: tourneyEnmap.get("fighters", name.name) },
								{ name: 'Description:', value: tourneyEnmap.get("fighters", name.description) },
								{ name: 'INT:', value: tourneyEnmap.get("fighters", name.stats.INT), inline: true },
								{ name: 'PWR:', value: tourneyEnmap.get("fighters", name.stats.PWR), inline: true },
								{ name: 'DEF:', value: tourneyEnmap.get("fighters", name.stats.DEF), inline: true },
								{ name: 'SPD:', value: tourneyEnmap.get("fighters", name.stats.SPD), inline: true },)
							.setImage(tourneyEnmap.get("fighters", name.image));
						message.channel.send(embed);
						break;
					case 'd':
					case 'delete':

						break;
					case 'q':
					case 'query':
					case 'p':
					case 'profile':
						if (args[1]) {
							tempStorage.set('query', args[1]);
						} else {
							question("Whose stats would you like to view?", "A valid fighter")
							const filter = m => !m.content.startsWith('\\') && m.author.id === message.author.id;
							const collector = message.channel.createMessageCollector(filter, { time: 60 });

							collector.on('collect', async (m) => {
								await tempStorage.set('query', m);
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
							});
						}
						const query = new Discord.MessageEmbed()
							.setTitle('Added fighter')
								.setAuthor(message.member.nickname, message.author.avatarURL())
								.setColor('#00ff00')
								.addFields(
									{ name: 'Name:', value: tourneyEnmap.get("fighters", tourneyEnmap.get("fighters", tempStorage.get(query)).name) },
									{ name: 'Description:', value: tourneyEnmap.get("fighters", tourneyEnmap.get("fighters", tempStorage.get(query)).description) },
									{ name: 'INT:', value: tourneyEnmap.get("fighters", tourneyEnmap.get("fighters", tempStorage.get(query)).stats.INT), inline: true },
									{ name: 'PWR:', value: tourneyEnmap.get("fighters", tourneyEnmap.get("fighters", tempStorage.get(query)).stats.PWR), inline: true },
									{ name: 'DEF:', value: tourneyEnmap.get("fighters", tourneyEnmap.get("fighters", tempStorage.get(query)).stats.DEF), inline: true },
									{ name: 'SPD:', value: tourneyEnmap.get("fighters", tourneyEnmap.get("fighters", tempStorage.get(query)).stats.SPD), inline: true },)
							.setImage(tourneyEnmap.get("fighters", tempStorage.get(query).image));
							message.channel.send(query);
						break;
					default:
						const error = new Discord.MessageEmbed()
							.setTitle('File an issue')
							.setURL('https://joelne.digital/BBissue')
							.setColor('#ff0000')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
							.addField('Error', 'Command not found/invalid syntax', true);
						message.channel.send(error);
						break;
				}
				break;
			case 'g':
			case 'group':
				switch (args[2]) {
					case 'a':
					case 'add':

						break;
					case 'd':
					case 'delete':

						break;
					case 'p':
					case 'place':

						break;
					case 'e':
					case 'edit':

						break;
					default:
						const embed = new Discord.MessageEmbed()
							.setTitle('File an issue')
							.setURL('https://joelne.digital/BBissue')
							.setColor('#ff0000')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
							.addField('Error', 'Command not found/invalid syntax', true);
						message.channel.send(embed);
						break;
				}
				break;
			// eslint-disable-next-line no-duplicate-case
			case 'b':
			case 'battle':
				switch (args[2]) {
					case 's':
					case 'start':
					case 'b':
					case 'begin':

						break;
					case 'e':
					case 'end':
					case 'stop':
						switch (args[3]) {
							case
								message.channel.send(`${tourneyEnmap.get('currentFighters')[Math.floor(Math.random() * tourneyEnmap.get('currentFighters').length)]} has won!`);
						}
						break;
					default:
						const embed = new Discord.MessageEmbed()
							.setTitle('File an issue')
							.setURL('https://joelne.digital/BBissue')
							.setColor('#ff0000')
							.setAuthor(message.member.nickname, message.author.avatarURL())
							.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
							.addField('Error', 'Command not found/invalid syntax', true);
						message.channel.send(embed);
						break;
				}
				break;
			case 'h':
			case 'help':
				message.channel.send('so basically this command isnt done yet. you should probably pay attention to joel when he says not to use it.');
				break;
			default:
				const embed = new Discord.MessageEmbed()
					.setTitle('File an issue')
					.setURL('https://joelne.digital/BBissue')
					.setColor('#ff0000')
					.setAuthor(message.member.nickname, message.author.avatarURL())
					.setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
					.addField('Error', 'Command not found/invalid syntax', true);
				message.channel.send(embed);
				break;
		}
		tempStorage.destroy();
	},
};