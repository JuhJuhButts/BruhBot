const Discord = require(`discord.js`);
const bot = new Discord.Client();
const { prefix, token } = require(`./config.json`);

bot.once(`ready`, () => {
	console.log(`Login successful.`);
});

bot.on(`message`, message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	switch(command) {
		case `-purpose`:
			message.channel.send(`You don\`t have a purpose either. Shut up, ` + message.member).catch(err => {
				console.error(err);
				message.channel.send(`There was an error trying to execute that command. Try again or just admit that you're a dumbass.`);
			});
			break;
		case `-kick`:
		case `k`:
		if (message.member.hasPermission(`KICK_MEMBERS`)){
			if (message.mentions.members.first().kickable){
			message.mentions.members.first().kick(args[0])
			message.channel.send(`They have been sent to the abyss with a key to get out.`)
			bot.channels.cache.get(`722710030649917440`).send(`${message.mentions.members.first()} - kicked just now - ${args[1]}`)
			return;
			} else message.channel.send(`No can do officer`)
		} else {
			message.channel.send(`I'd say 'nice try, asshole' but that wasn't a nice try. The asshole part still applies though`)
			return;
		} 
		default:
			message.channel.send(`:moyai: that\`s not even a valid command what\`s wrong with you`)
}});

bot.login(token);