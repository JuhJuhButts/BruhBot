module.exports = { // eslint-disable-line no-undef
	name: 'purpose',
	description: 'Explains the relevance of its purpose.',
	args: false,
	execute(message, args, Discord) {
		const { purposeReplies } = require(`../info/json/randomMessages.json`); // eslint-disable-line no-undef
		const randomMessage = purposeReplies[Math.floor(Math.random() * purposeReplies.length)];
		const embed = new Discord.MessageEmbed()
			.setTitle('My Purpose')
			.setColor('#03b1fc')
			.setDescription(randomMessage);
		message.channel.send(embed)
	},
};