module.exports = {
	name: 'ban',
	description: 'Pretends to ban someone. Arguments don\'t matter as I will always respond with the same message.',
	aliases: ['banned', 'bane', 'baned'],
	execute(message, Discord) {
		const { banReplies } = require('../info/randomMessages.json');
		const embed = new Discord.MessageEmbed()
			.setTitle('Baned!')
			.setColor('#00ff00')
			.setDescription(banReplies[Math.floor(Math.random() * banReplies.length)])
			.setAuthor(message.member.nickname, message.author.avatarURL())
			.setFooter('Nobody was ba** nedd in the makeing of this joek');
		message.channel.send(embed)
	},
};