module.exports = {
	name: 'data',
	description: 'Adds/removes/queries data to `/home/joella/Documents/BruhBot/info.sqlite` if the commander is JuhJuhButt',
	guildOnly: false,
	args: true,
	execute(message, args, Discord, info) {
        const { errorReplies } = require('../info/errors.json');

        if (message.author.id === '268138992606773248') {
            const value = args.slice(2).join(" ");
            switch (args[0]) {
                case '+':
                    (async () => {
                        await info.set(args[1], value).catch(error => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('File an issue')
                                .setURL('https://joelne.digital/BBissue')
                                .setColor('#ff0000')
                                .setAuthor(message.member.nickname, message.author.avatarURL())
                                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                                .addField('Error:', error, true);
                            message.channel.send(embed);});
                    })();
                    break;
                case '-':
                    (async () => {
                        await info.delete(args[1]).catch(error => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('File an issue')
                                .setURL('https://joelne.digital/BBissue')
                                .setColor('#ff0000')
                                .setAuthor(message.member.nickname, message.author.avatarURL())
                                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                                .addField('Error:', error, true);
                            message.channel.send(embed);});
                    })();
                    break;
                case 'q':
                    (async () => {
                        let send = await info.get(args[1]).catch(error => {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('File an issue')
                                .setURL('https://joelne.digital/BBissue')
                                .setColor('#ff0000')
                                .setAuthor(message.member.nickname, message.author.avatarURL())
                                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                                .addField('Error:', error, true);
                            message.channel.send(embed);});
                        message.channel.send(send);
                    })();
                    break;
                case 'c':
                    (async () => {
                        await info.clear();
                    })();
                    break;
                default:
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found', true));
                    break;
            } 
        } else {
            const embed = new Discord.MessageEmbed()
                .setTitle('File an issue')
                .setURL('https://joelne.digital/BBissue')
                .setColor('#ff0000')
                .setAuthor(message.member.nickname, message.author.avatarURL())
                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                .addField('Error:', 'Insufficient permissions', true);
            message.channel.send(embed);
        }
	},
};