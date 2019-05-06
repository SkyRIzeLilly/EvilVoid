// Require Dependencies

const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");


let bot = new Discord.Client();
let BotSettings = require("./botsettings.json");
let Embeds = require("./items/embed.js")
let package = require("./package.json")
// let mysql = require("./database/database.js")

bot.settings = BotSettings;
bot.commands = new Map();
bot.embeds = Embeds;
console.log(BotSettings);

console.log("Commands loading");
for (let file of fs.readdirSync("./commands/")) {
    console.log(`- Loading file ` + file.split(",")[0]);
    if (!file.endsWith('.js')) return;
    var commands = require(`./commands/${file}`);
    bot.commands.set(file.split('.')[0], commands);
}
console.log("");

//Start Up
bot.on("ready", async () => {
    console.log(`\nBot online.\nName + Tag: ${bot.user.username}#${bot.user.discriminator}\nPrefix: ${BotSettings.prefix}\nUsers: ${bot.users.size}\nGuilds: ${bot.guilds.size}`);
    bot.users.get(BotSettings.OwnerID).send(`\nBot online.\nName + Tag: **${bot.user.username}**#${bot.user.discriminator}\nPrefix: **${BotSettings.prefix}**\nUsers: **${bot.users.size}**\nGuilds: **${bot.guilds.size}**`);
    bot.user.setStatus("online"); //online, idle, dnd, invisible
});

//Status-Change
setInterval(async function () {

    let status = [`${BotSettings.prefix}help`, `${bot.users.size} users!`, `${bot.guilds.size} guilds!`, `my developer`, `your commands`, `version ${package.version}`, `errors`, `shitcode`, `the Cardinal System`];
    let changes = status[Math.floor(Math.random() * status.length)];


    bot.user.setActivity(changes, {
        type: "LISTENING"
    }); //PLAYING, STREAMING, LISTENING, WATCHING

}, 10000);


//Yui Server Join
bot.on("guildCreate", async guild => {

    let YuiJoin = `${bot.user.username}#${bot.user.discriminator}`;
    let NewtoxThumbJoin = `${bot.users.get(BotSettings.OwnerID).displayAvatarURL}`;

    let Joinembed = new Discord.RichEmbed()
        .setColor(message.vars.embedRandom)
        .setDescription(`Hello, ${bot.user.username} has been successfully added to this server! ${bot.emojis.get("506478556222717952")}\n \n${bot.user.username} is a bot made by **${bot.users.get(BotSettings.OwnerID).username}**#${bot.users.get(BotSettings.OwnerID).discriminator}.\n \n[For a list of all commands use ${BotSettings.prefix}help.](https://github.com/Newtox/Yui)`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setFooter(YuiJoin, NewtoxThumbJoin)
        .setTimestamp();


    bot.guilds.get(guild.id).owner.send(Joinembed);

});


// Login 

bot.login(BotSettings.token)

//Events

bot.on("guildMemberAdd", async member => {
    if (member.guild.id === "406946551538253828") {
        bot.channels.get("542765291659198474").send(`**${member.user.username}**#${member.user.discriminator} joined.`)
        member.addRole("406952857917456395")
    }
});

bot.on("guildMemberRemove", async member => {
    if (member.guild.id === "406946551538253828") {
        bot.channels.get("542765291659198474").send(`**${member.user.username}**#${member.user.discriminator} left.`)
    }
});

bot.on("message", async message => {
    //Mention
    if (message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`) {

        let YuiJoin = `${bot.user.username}#${bot.user.discriminator}`;
        let NewtoxThumbJoin = `${bot.users.get(BotSettings.OwnerID).displayAvatarURL}`;

        let mentionEmbed = new Discord.RichEmbed()
            .setColor(message.guild.member(bot.user.id).highestRole.color || message.vars.YuiRandom)
            .setDescription(`Hello, My name is ${bot.user.username}!\n \nMy Prefix is **${BotSettings.prefix}**\n \nFor a list of all commands use **${BotSettings.prefix}**help.`)
            .setThumbnail(bot.user.displayAvatarURL)
            .setFooter(YuiJoin, NewtoxThumbJoin)
            .setTimestamp();

        message.channel.send(mentionEmbed);
    }

    if (message.author.bot) return;

    if (message.content.startsWith(BotSettings.prefix)) {

        let randomOld = [`#a31f26`, `#fe447d`, `#f78f2e`, `#fedc0c`, `#d1f20a`, `#5cd05b`, `#03c1cd`, `#0e10e6`, `#9208e7`, `#f84c00`, `#f3f354`, `#bff1e5`, `#3bc335`, `#7af5ca`, `#448bff`, `#101ab3`, `#d645c8`, `#0afe15`, `#0acdfe`, `#ff9600`, `#b21ca1`];
        let randomColors = [`#f0b14d`, `#7289da`, `#ffb80c`, `#ff000e`, `#03c1cd`, `#0086ff`, `#772d69`, `#92e98d`, `#e527c0`, `#8066ae`, `#faff00`, `#ff9564`, `#fa93d3`, `#4fc3f7`];
        let YuiRandomColor = randomColors[Math.floor(Math.random() * randomColors.length)];

        //Vars
        let vars = {
            guild: message.guild,
            args: message.content.slice(BotSettings.prefix.length).trim().split(" "),
            msg: message.content.toLowerCase(),
            HelpFooter: `Use ${BotSettings.prefix}help <command> for more information about a command.`,
            HelpName: `Help`,
            YuiName: `${bot.user.tag}`,
            NewtoxLogo: `${bot.users.get(BotSettings.OwnerID).displayAvatarURL}`,
            NewtoxName: `${bot.users.get(BotSettings.OwnerID).tag}`,
            YuiLogo: `${bot.user.displayAvatarURL}`,
            AuthorLogo: `${message.author.displayAvatarURL}`,
            AuthorName: `${message.author.username}#${message.author.discriminator}`,
            QuestionIC: `https://cdn.discordapp.com/attachments/495571358604853258/500687248375808005/info.png`,
            tickblue: `https://cdn.discordapp.com/attachments/498143559485095936/507903884036014085/tickblue.png`,
            hammer: `https://cdn.discordapp.com/attachments/498143559485095936/507917365116272650/moderation.png`,
            categoryHelp: `https://cdn.discordapp.com/attachments/495571358604853258/510530358169698314/tada.png`,
            embedRandom: '#' + (Math.random() * 0xFFFFFF).toString(16),
            YuiRandom: YuiRandomColor
        }

        message.colors = {
            InfoColor: "#0086ff",
            ModColor: "#ff000e",
            NoColor: "#e74c3c",
            DevColor: "#7289da"
        }


        if (bot.commands.has(vars.args[0])) {
            let invoke = vars.args[0]
            vars.args.shift()
            message.args = vars.args;
            message.vars = vars;

            bot.commands.get(invoke).run(bot, message)
        
        } else if (!bot.commands.has(vars.args[0])) {
            message.delete();

            let ErrorCmd = new Discord.RichEmbed()
                .setColor("#a21018")
                .setTitle("Command execution failed.")
                .setDescription("This command does not exist.");

            let msgcmd = await message.channel.send(message.author, ErrorCmd);
            setTimeout(async () => {
                msgcmd.delete();
            }, 5000);
        }
    }


});
