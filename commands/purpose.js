module.exports = {
	name: 'purpose',
	description: 'Explains the relevance of its purpose.',
	args: false,
	execute(message, args, Discord) {
		const { purposeReplies } = require(`../info/randomMessages.json`);
		const randomMessage = purposeReplies[Math.floor(Math.random() * purposeReplies.length)];
		const embed = new Discord.MessageEmbed()
			.setTitle('My Purpose')
			.setColor('#0000ff')
			.setDescription(randomMessage);
		message.channel.send(embed)
	},
};