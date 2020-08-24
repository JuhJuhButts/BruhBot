module.exports = {
	name: 'kick',
	description: 'Kicks target from The Bruh Chat',
	aliases: ['k'],
	guildOnly: true,
	args: true,
	execute(message, args, Discord) {
        const { kickReplies } = require('./randomMessages.json');
        message.channel.send(kickReplies[Math.floor(Math.random() * kickReplies.length)])
	},
};