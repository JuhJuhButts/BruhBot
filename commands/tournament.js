module.exports = {
    name: 'tournament',
    description: 'Tournament commands. Creating a bracket is limited to @MasterOfPasta#9454 and @JuhJuhButt#3484. ',
    aliases: ['t', 'tourney', 'tournement', 'turnament', 'turnement', 'tournamant', 'tournement'],
    args: true,
    usage: ' has way too much stuff, use `/tournament help` instead',
    execute(message, args, Discord) {
        const fs = require('fs');
        const fse = require('fs-extra');
        const {JuhJuhButtID, TannmannID} = require('../info/config.json');
        const errorReplies = require('../info/errors.json')
        switch (args[0]) {
            case 'b':
            case 'bracket':
                switch (args[1]) {
                    case 'c':
                    case 'create':
                        if (message.member.id === JuhJuhButtID || message.member.id === TannmannID) {
                            if (args[2]) {
                                let fA = args[2]
                            } else {
                                const embed = new Discord.MessageEmbed()
                                    .setTitle('File an issue')
                                    .setURL('https://joelne.digital/BBissue')
                                    .setColor('#ff0000')
                                    .setAuthor(message.member.nickname, message.author.avatarURL())
                                    .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                                    .addField('Error:', 'Insufficient information', true);
                                message.channel.send(embed);
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

                        break;
                    case 'd':
                    case 'delete':

                        break;
                    case 'q':
                    case 'query':
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
            case 'b':
            case 'battle':
                switch (args[2]) {
                    case 's':
                    case 'start':
                    case 'b':
                    case 'begin':
                        break;
                    case 'e':
                    case 'end':
                    case 's':
                    case 'stop':
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