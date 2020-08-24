module.exports = {
	name: 'ban',
	description: 'Bans target from The Bruh Chat',
	aliases: ['an'],  //because b/an
	usage: '[<member>]',
	guildOnly: true,
	args: true,
	execute(message, args, Discord) {
		const { banReplies } = require('../info/randomMessages.json');
		const embed = new Discord.MessageEmbed()
			.setTitle('Baned!')
			.setColor('#00ff00')
			.setDescription(banReplies[Math.floor(Math.random() * banReplies.length)])
			.setAuthor(message.mentions.members.first().nickname, message.mentions.members.first().avatarURL)
			.setFooter('Nobody was ba** nedd in the makeing of this joek');
        message.channel.send(embed)
	},
};