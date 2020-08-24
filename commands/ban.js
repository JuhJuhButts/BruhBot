module.exports = {
	name: 'ban',
	description: 'Bans target from The Bruh Chat',
	aliases: ['b', 'an'],
	guildOnly: true,
	args: true,
	execute(message, args, Discord) {
        const { banReplies } = require('./randomMessages.json');
        message.channel.send(banReplies[Math.floor(Math.random() * banReplies.length)])
	},
};