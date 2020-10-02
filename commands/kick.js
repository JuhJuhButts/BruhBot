module.exports = {
	name: 'kick',
	description: 'Kicks target from The Bruh Chat',
	aliases: ['k'],
	execute(message, args, Discord) {
		const { kickReplies } = require('../info/randomMessages.json');
		const embed = new Discord.MessageEmbed()
			.setTitle('Kikced!')
			.setColor('#00ff00')
			.setDescription(kickReplies[Math.floor(Math.random() * kickReplies.length)])
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setFooter('Nobody was kickededinged in the makeing of this joek');
		message.channel.send(embed)
	},
};