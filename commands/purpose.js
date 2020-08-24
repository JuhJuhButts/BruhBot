module.exports = {
	name: 'purpose',
	description: 'Explains the relevance of its purpose.',
	guildOnly: true,
	args: false,
	execute(message, args, Discord) {
		const { purposeReplies } = require(`./randomMessages.json`);
		const randomMessage = purposeReplies[Math.floor(Math.random() * purposeReplies.length)];

		message.channel.send(randomMessage)
	},
};