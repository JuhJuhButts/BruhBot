module.exports = {
    name: 'tournament',
    description: 'Tournament commands. Creating a bracket is limited to @MasterOfPasta#9454 and @JuhJuhButt#3484. ',
    aliases: ['t', 'tourney', 'tournement', 'turnament', 'turnement', 'tournamant', 'tournement'],
    args: true,
    usage: ' has way too much stuff, use `/tournament help` instead',
    execute(message, args, Discord) {
        const fs = require('fs');
        const fse = require('fs-extra');
        const { JuhJuhButtID, TannmannID } = require('../info/config.json');
        const errorReplies = require('../info/errors.json')
        message.channel.send(args[0] + args[1] + args[2] + args[3]);
        switch (args[0]) {
            case 'b':
            case 'bracket':
                switch (args[1]) {
                    case 'c':
                    case 'create':
                        if (message.member.id === JuhJuhButtID || message.member.id === TannmannID) {
                            if (args[2]) {
                                const fighterAmount = args[2]
                                if (args[3]) {
                                    const isBoss = args[3]
                                } else {
                                    const isBoss = false
                                }
                            } else {
                                const fighterAmount = await awaitReply({ message, question: "How many contestants will be fighting?", limit: 120000, });
                                const isBoss = await awaitReply({ message, question: "Is there going to be a boss? (send `true` or `false`)", limit: 120000, });
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
                        break;
                    case 'a':
                    case 'add':
                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }

                break;
            case 'f':
            case 'fighter':
                switch (args[2]) {
                    case 'a':
                    case 'add':
                        const name = await awaitReply({ message, question: "What is the fighter's name?", limit: 120000, });
                        const description = await awaitReply({ message, question: "Describe the fighter.", limit: 300000, });
                        const image = await awaitReply({ message, question: "Send a link to an image of them.", limit: 120000, });
                        const INT = await awaitReply({ message, question: "Stats: on a scale of 1-100, how intelligent is this fighter?", limit: 120000, });
                        const PWR = await awaitReply({ message, question: "Stats: on a scale of 1-100, how powerful is this fighter?", limit: 120000, });
                        const DEF = await awaitReply({ message, question: "Stats: on a scale of 1-100, how well-defended is this fighter?", limit: 120000, });
                        const SPD = await awaitReply({ message, question: "Stats: on a scale of 1-100, how fast is this fighter?", limit: 120000, });

                        const embed = Discord.MessageEmbed()
                            .setTitle('Added fighter')
                            .setDescription(`Added by ${message.member.nickname}`)
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setColor('#00ff00')
                            .addField('Name:')

                        break;
                    case 'd':
                    case 'delete':

                        break;
                    case 'q':
                    case 'query':

                        break;
                    case 'p':
                    case 'profile':

                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }
                break;
            case 'g':
            case 'group':
                switch (args[2]) {
                    case 'a':
                    case 'add':

                        break;
                    case 'd':
                    case 'delete':

                        break;
                    case 'p':
                    case 'place':

                        break;
                    case 'e':
                    case 'edit':

                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }
                break;
            case 'b':
            case 'battle':
                switch (args[2]) {
                    case 's':
                    case 'start':

                        break;
                    case 'b':
                    case 'begin':

                        break;
                    case 'e':
                    case 'end':

                        break;
                    case 's':
                    case 'stop':

                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }
                break;
            case 'h':
            case 'help':
                message.channel.send('so basically this command isnt done yet. you should probably pay attention to joel when he says not to use it.')
                break;
            default:
                const embed = new Discord.MessageEmbed()
                    .setTitle('File an issue')
                    .setURL('https://joelne.digital/BBissue')
                    .setColor('#ff0000')
                    .setAuthor(message.member.nickname, message.author.avatarURL())
                    .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                    .addField('Error:', 'Command not found/invalid syntax', true);
                message.channel.send(embed)
                break;
        }
    },
};