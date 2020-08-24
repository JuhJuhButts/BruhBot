module.exports = {
	name: 'kick',
	description: 'Kicks target from The Bruh Chat',
	aliases: ['k'],
	usage: '[<member>]',
	guildOnly: true,
	args: true,
	execute(message, args, Discord) {
		const { kickReplies } = require('../info/randomMessages.json');
		const embed = new Discord.MessageEmbed()
			.setTitle('Kikced!')
			.setColor('#00ff00')
			.setDescription(kickReplies[Math.floor(Math.random() * kickReplies.length)])
			.setAuthor(message.mentions.members.first().nickname, message.mentions.members.first().avatarURL())
			.setFooter('Nobody was kick in the makeing of this joek');
		message.channel.send(embed)
	},
};