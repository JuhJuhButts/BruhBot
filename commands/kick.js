module.exports = {
	name: 'kick',
	description: 'Kicks target from The Bruh Chat',
	aliases: ['k'],
	usage: '[<member>]',
	guildOnly: true,
	args: true,
	execute(message, args, Discord) {
		const { kickReplies } = require('../info/randomMessages.json');
		if (!args[0]) {
			const embed = new Discord.MessageEmbed()
				.setTitle('kikced!')
				.setColor('#00ff00')
				.setDescription(kickReplies[Math.floor(Math.random() * kickReplies.length)])
				.setAuthor(message.member.nickname, message.author.avatarURL())
				.setFooter('Nobody was ki** kcdd in the makeing of this joek');
			message.channel.send(embed);
		} else {
			const embed = new Discord.MessageEmbed()
				.setTitle('kikced!')
				.setColor('#00ff00')
				.setDescription(kickReplies[Math.floor(Math.random() * kickReplies.length)])
				.setAuthor(message.mentions.members.last().nickname, message.mentions.users.last().avatarURL())
				.setFooter('Nobody was ki** kcedd in the makeing of this joek');
			message.channel.send(embed);
		} 
	},
};