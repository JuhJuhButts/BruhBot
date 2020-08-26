module.exports = {
	name: 'ban',
	description: 'Bans target from The Bruh Chat',
	aliases: ['an'],  //because b/an
	usage: '[<member>]',
	guildOnly: true,
	args: false,
	execute(message, args, Discord) {
		const { banReplies } = require('../info/randomMessages.json');
		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setTitle('Baned!')
				.setColor('#00ff00')
				.setDescription(banReplies[Math.floor(Math.random() * banReplies.length)])
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setFooter('Nobody was ba** nedd in the makeing of this joek');
			message.channel.send(embed);
		} else {
			if (!message.mentions) {
				const embed = new Discord.MessageEmbed()
					.setTitle('Baned!')
					.setColor('#00ff00')
					.setDescription(banReplies[Math.floor(Math.random() * banReplies.length)])
					.setAuthor(args[0])
					.setFooter('Nobody was ba** nedd in the makeing of this joek');
				message.channel.send(embed);
				message.channel.send('right');
			} else {
				const embed = new Discord.MessageEmbed()
					.setTitle('Baned!')
					.setColor('#00ff00')
					.setDescription(banReplies[Math.floor(Math.random() * banReplies.length)])
					.setAuthor(message.mentions.members.last().nickname, message.mentions.users.last().avatarURL())
					.setFooter('Nobody was ba** nedd in the makeing of this joek');
				message.channel.send(embed);
				message.channel.send('Wrong')
			}
		} 
	},
};