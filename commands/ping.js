module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['p'],
	guildOnly: false,
	args: false,
	execute(message, args, Discord) {
		const { pingReplies } = require(`./randomMessages.json`);
		const randomMessage = pingReplies[Math.floor(Math.random() * pingReplies.length)];

		message.channel.send(randomMessage)
	},
};