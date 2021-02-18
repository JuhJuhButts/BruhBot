module.exports = { // eslint-disable-line no-undef
	name: 'ping',
	description: 'Ping!',
	aliases: [],
	args: false,
	usage: " ",
	// eslint-disable-next-line no-unused-vars
	execute(message, args, Discord, mainEnmap, Enmap) {
		const { pingReplies } = require(`../info/randomMessages.json`); // eslint-disable-line no-undef
		const randomMessage = pingReplies[Math.floor(Math.random() * pingReplies.length)];
		let then = new Date();
		message.channel.send('Pinging...');
		let now = new Date();
		let ping = now.getTime() - then.getTime();
		const embed = new Discord.MessageEmbed()
			.setColor('#03b1fc')
			.setTitle('Pong')
			.setDescription(randomMessage)
			.addField('Ping (ms)', ping, true);
		message.channel.send(embed);
	},
};