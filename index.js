//#region Calling Packages
const ytdl = require('ytdl-core');
const streamOptions = {seek : 0, volume: 1};
const superagent = require("superagent");
const botconfig = require("./botconfig.json");
const colors = require("./colors.json");
const Discord = require('discord.js');
const bot = new Discord.Client();
//#endregion

//#region Global Settings
const prefix = botconfig.prefix;
var killers = [];
var musicURLs = [];
//#endregion

//#region Only Server
bot.on('message', async message => {

    //#region Variables
    // NON SENSITIVE
    let msg = message.content.toUpperCase();
    let splitmsgup = msg.split(" ");
    let cont = splitmsgup[0];
    let argsup = splitmsgup.slice(1); 
    // SENSITIVE
    let messageArray = message.content.split(" ");  
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    // HI
    let sender = message.author;
    //#endregion

    //#region Checking
    if(cont != prefix + "REVIVE" && msg.startsWith(prefix) && killers.includes(message.author.username)) return message.reply("You killed me, How do you expect me to work?");
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //#endregion            
    
    //#region Cat
    if (cont === prefix + "CAT"){
        let msg = await message.channel.send("Searching for a cute cat....");
        let {body} = await superagent
        .get('http://aws.random.cat/meow')
        if(!{body}) return message.channel.send("I couldn't find a cute cat, sorry ):")

        let cEmbed = new Discord.RichEmbed()
        .setColor(colors.Cyan)
        .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL)
        .setImage(body.file)
        .setTimestamp()
        .setFooter(`${bot.user.username} | Created By Mystery`, bot.user.displayAvatarURL)

        msg.channel.send({embed: cEmbed})

        msg.delete();
    }
    //#endregion

    //#region Coinflip
    if(cont === prefix + "COINFLIP" || cont === prefix + "CF"){
        let coinflipresults = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        if(coinflipresults <= 50){
            message.channel.send("Heads!")
        }
        if(coinflipresults > 50){
            message.channel.send("Tails!")
        }
    }
    //#endregion

    //#region Dog
    if (cont === prefix + "DOG"){
        let msg = await message.channel.send("Searching for a cute dog....");
        let {body} = await superagent
        .get('https://dog.ceo/api/breeds/image/random')
        if(!{body}) return message.channel.send("I couldn't find a cute dog, sorry ):")

        let dEmbed = new Discord.RichEmbed()
        .setColor(colors.Cyan)
        .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL)
        .setImage(body.message)
        .setTimestamp()
        .setFooter(`${bot.user.username} | Created By Mystery`, bot.user.displayAvatarURL)

        msg.channel.send({embed: dEmbed})

        msg.delete();
    }
    //#endregion

    //#region Ping
    if (cont === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        message.channel.send('Pong!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }
    //#endregion

    //#region Killing
    if (cont === prefix + 'DIE') {
        if(!killers.includes(message.author.username)){
            killers.push(message.author.username);
        }
        message.channel.send('You killed me ):');
    }

    if(cont === prefix + 'REVIVE'){
        if(!killers.includes(message.author.username)){
            return message.channel.send("You still didn't kill me :)\nAnd please don't!")
        }

        await killers.splice(message.author.username);
        message.channel.send("Oh... i'm back.. I'M BACK! IM BACK TO FULFILL YOUR NEEDS " + message.author);

    }
    //#endregion

    //#region Pissed
    if (cont === prefix + 'PISSED') {
        message.channel.send(message.member.user.username + ' is pissed');
    }
    //#endregion
      
    //#region RPS Rock Paper Scissors
    if(msg.startsWith(prefix + 'RPS')){
        let choice = "";
        for(var i = 0; i < args.length; i++){
            choice += argsup[i];
        }
        if(!choice){
            return message.channel.send("Please choose: `Rock/R` or `Paper/P` or `Scissors/S`");
        } 
        if(choice != 'R' && choice != 'P' && choice != 'S' && choice != 'ROCK' && choice != 'PAPER' && choice != 'SCISSORS'){
            return message.channel.send("I'm sorry, i couldn't understand what you chose");
        }
        // ROCK
        if(choice === "R" || choice === "ROCK"){
            let Botpick = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            // 1 rock 2 paper 3 scissors
            if(Botpick == 1){
                message.channel.send('You chose rock and i chose rock too!\nTie!');
            }

            if(Botpick == 2){
                message.channel.send('You chose rock and i chose paper!\nI won!');
            }

            if(Botpick == 3){
                message.channel.send('You chose rock and i chose scissors!\nYou won!');
            }
        }
        // PAPER
        if(choice === "P" || choice === "PAPER"){
            let Botpick = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            // 1 rock 2 paper 3 scissors
            if(Botpick == 1){
            message.channel.send('You chose paper and i chose rock!\nYou won!');
            }
        
            if(Botpick == 2){
                message.channel.send('You chose paper and i chose paper too!\nTie!');
            }
        
            if(Botpick == 3){
                message.channel.send('You chose paper and i chose scissors!\nI won!');
            }
        }
        // SCISSORS
        if(choice === "S" || choice === "SCISSORS"){
            let Botpick = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
            // 1 rock 2 paper 3 sciccors
            if(Botpick == 1){
                message.channel.send('You chose scissors and i chose rock!\nI won');
                }
            
                if(Botpick == 2){
                    message.channel.send('You chose scissors and i chose paper\nYou won');
                }
            
                if(Botpick == 3){
                    message.channel.send('You chose scissors and i chose scissors too!\nTie');
                }
        }
    }
    //#endregion
   
    //#region Report
    if(msg.startsWith(prefix + "REPORT")){
        var reportperson = "";
        var reason = "";
        let reported = message.mentions.members.first() || message.guild.members.get(args[0])
        if(cont != prefix + "REPORT"){
            return;
        }
        for(var i = 0; i < args.length; i++){
            reportperson += args[i];
        }
        if(!reportperson){
            return message.channel.send("Specify who you want to report please");
        }
        if(reportperson){
            reported += message.guild.members.find(x => x.user.username.toLowerCase() === args[0].toLowerCase());
        }
        if(!reported){
           return message.channel.send("I couldn't find the person you're trying to report");
        }
        for(var i = 1; i < args.length; i++){
            reason += " " + args[i];
        }
        if(!reason){ 
        return message.channel.send("What is the reason for the report?");
        }
        
        if(reported){
        for(var i = 0; i < args.length; i++){
            reportperson += args[i] + " ";
        } 
        message.channel.send("The report was sent, Thank you!").catch(error => message.channel.send("Someting went wrong, sorry"));
        message.guild.owner.send(sender + " reported " + reported + " for " + reason)
        }
    }
    //#endregion

    //#region Purge
    if (cont === prefix + 'PURGE') { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find(role => role.name == 'Owner')) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Owner\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages(args[0]); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
    //#endregion

    //#region User Generating Random Number
    if(cont === prefix + "RANDOMNUM" || cont === prefix + "RN"){
        let min = args[0]
        let max = args[1]
        if(args.length == 0){
            return message.channel.send("Please write your range")
        }
        if(isNaN(min) && min){
            return message.channel.send("Please use only numbers")
        }
        if(isNaN(max) && max){
            return message.channel.send("Please use only numbers")
        }
        if(!args[1]){
            return message.channel.send("Please write the second number")
        }
        if(args.length > 2){
            return message.channel.send("Please write only two numbers")
        }       
        if(+min > +max){
            message.channel.send(min);
            message.channel.send(max);
            return message.channel.send("I don't think it works like that... Did you mean: !Randomnum " + max + " " + min)
        }
        message.channel.send(Math.floor(Math.random() * (+max - +min + 1)) + +min);
    }
    //#endregion

    //#region Roll The Dice
    if (cont === prefix + "ROLLTHEDICE"){
        message.channel.send(Math.floor(Math.random() * 6) + 1);
    }
    //#endregion

    //#region Embed Server
    if (cont === prefix + "SERVERINFO"){
        let sEmbed = new Discord.RichEmbed()
        .setColor(colors.Cyan)
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .addField("**Server Name:**", `${message.guild.name}` , true)
        .addField("**Server Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter("TestByMystery | Created By Mystery", bot.user.displayAvatarURL)
        message.channel.send({embed: sEmbed})
    }
    //#endregion

    //#region Embed User
    if (cont === prefix + 'USERINFO'){
        let mentioned = message.mentions.members.first() || message.guild.members.get(args[0])  
        let mentions = "";
          
                      
        for(var i = 0; i < args.length; i++){
            mentions += args[i];
        }            
        if(mentions){
            let mentionedusername = message.guild.members.find(x => x.user.username.toLowerCase() === args[0].toLowerCase())
            if(!mentioned && !mentionedusername){
                return message.channel.send("I'm sorry, i couldn't find who you are trying to check");
            }

            if(mentionedusername){
                let uEmbed = new Discord.RichEmbed()
                .setColor(colors.Cyan)
                .setTitle(`Info about ${mentionedusername.user.username}`)
                .setThumbnail(mentionedusername.user.displayAvatarURL)
                .setAuthor(`${mentionedusername.user.username}`, mentionedusername.user.displayAvatarURL)
                .addField("**Username:**", `${mentionedusername}`, true)
                .addField("**Discriminator:**", `${mentionedusername.user.discriminator}`, true)                
                .addField("**ID:**", `${mentionedusername.id}`, true)
                .addField("**Status:**", `${mentionedusername.presence.status}`, true)
                .addField("**Created At:**", `${mentionedusername.user.createdAt.toDateString() +", " + mentionedusername.user.createdAt.toLocaleString()}`, true)
                .setFooter(`${bot.user.username} | Created By Mystery`, bot.user.displayAvatarURL)
                message.channel.send({embed: uEmbed})
                return;
            }
        }
                              
        if(!mentioned){
            let uEmbed = new Discord.RichEmbed()
            .setColor(colors.Cyan)
            .setTitle(`Info about ${message.author.username}`)
            .setThumbnail(message.author.displayAvatarURL)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .addField("**Username:**", `${message.author.username}`, true)
            .addField("**Discriminator:**", `${message.author.discriminator}`, true)
            .addField("**ID:**", `${message.author.id}`, true)
            .addField("**Status:**", `${message.author.presence.status}`, true)
            .addField("**Created At:**", `${message.author.createdAt.toDateString() +", "+ message.author.createdAt.toLocaleString()}`, true)
            .setFooter(`${bot.user.username} | Created By Mystery`, bot.user.displayAvatarURL)
            message.channel.send({embed: uEmbed}) 
            return;  
        }

        if(mentioned){
            let uEmbed = new Discord.RichEmbed()
            .setColor(colors.Cyan)
            .setTitle(`Info about ${mentioned.user.username}`)
            .setThumbnail(mentioned.user.displayAvatarURL)
            .setAuthor(`${mentioned.user.username}`, mentioned.user.displayAvatarURL)
            .addField("**Username:**", `${mentioned.user.username}`, true)
            .addField("**Discriminator:**", `${mentioned.user.discriminator}`, true)
            .addField("**ID:**", `${mentioned.id}`, true)
            .addField("**Status:**", `${mentioned.user.presence.status}`, true)
            .addField("**Created At:**", `${mentioned.user.createdAt.toDateString() +", "+ mentioned.user.createdAt.toLocaleString()}`, true)
            .setFooter(`${bot.user.username} | Created By Mystery`, bot.user.displayAvatarURL)
            message.channel.send({embed: uEmbed})   
            return;
        } 
        
        
               
    }
    //#endregion     
    
    //#region Play Music

    /*if(cont === "?PLAY"){
        let url = args[0];
        let voiceChannel = message.guild.channels.find(channel => channel.id === "603872484516691988");         
        if(!ytdl.validateURL(url)) return message.channel.send("Couldn't find the song you are searching for");
        if(ytdl.validateURL(url)){
            var flag = musicURLs.some(element => element === url);
            if(!flag){
                musicURLs.push(url);
                if(voiceChannel != null){
                    if(voiceChannel.connection){
                        const yembed = new Discord.RichEmbed()
                        .setAuthor(bot.user.username, bot.user.displayAvatarURL)
                        .setDescription("You've successfully added a song to the queue");
                        message.channel.send(yembed);
                    }
                    else{
                        try{
                            const voiceConntection = await voiceChannel.join();
                            await playSong(message.channel, voiceConntection, voiceChannel);
                        }
                        catch(ex){
                            console.log(ex);
                        }
                    }

                }
            }
        }
    }

    if(cont === "?QUEUE"){
        message.channel.send(musicURLs);
    }*/

    //#endregion

})
//#endregion

//#region Play Function
/*async function playSong(messageChannel, voiceConntection, voiceChannel){
    const stream = ytdl(musicURLs[0], {filter: 'audioonly'});
    const dispatcher = voiceConntection.playStream(stream, streamOptions);
    dispatcher.on('end', () => {
        musicURLs.shift();

        if(musicURLs.length === 0){
            voiceChannel.leave();
        }
        else{

            setTimeout(() => {
                playSong(messageChannel, voiceConntection, voiceChannel);
            }, 3000);

            
        }
    })
}*/
//#endregion

//#region DMS
bot.on('message', message =>{
    //#region Variables
    // NON SENSITIVE
    let msg = message.content.toUpperCase();
    let splitmsgup = msg.split(" ");
    let cont = splitmsgup[0];
    let argsup = splitmsgup.slice(1); 
    // SENSITIVE
    let messageArray = message.content.split(" ");  
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    // HI
    let sender = message.author;
    //#endregion
    
    //#region Checking If it's DMs
    if (message.channel.type != "dm") return;  
    //#endregion

    //#region Send DMs to console
    console.log(message.author.username +": " + message.content);
    //#endregion

    //#region Report
    if(cont === prefix + "REPORT"){
        var reportperson = "";
        var reason = "";
        let reported = args[0];
        if(!reported){
            return message.author.send("Specify who you want to report please");
        }
        for(var i = 1; i < args.length; i++){
            reason += args[i];
        }
        if(!reason){ 
            return message.author.send("What is the reason for the report?");
        }
                
        if(reported){
        for(var i = 0; i < args.length; i++){
            reportperson += " " + args[i];
            }
        } 
        message.author.send("The report was sent, Thank you!").catch(error => message.author.send("Someting went wrong, Sorry"));
        bot.users.get("367533131496161280").send(sender + " Reported " + reported + reportperson.replace(reported, "for"));           
        }
        //#endregion
        
    //#region Hello
    if(msg === "HELLO"){
        message.author.send("Hello " + message.author.username);
        return;
    }
    //#endregion

    //#region Your Creator
    if(msg === "WHO CREATED YOU?" || msg === "Who is your creator?"){
        message.author.send("My creator is Mystery");
        return;
    }
    //#endregion    
})
//#endregion

//#region Both server and dms
bot.on('message', message =>{
    //#region Variables
    let msg = message.content.toUpperCase();
    let splitmsgup = msg.split(" ");
    let cont = splitmsgup[0];
    let argsup = splitmsgup.slice(1); 
    // SENSITIVE
    let messageArray = message.content.split(" ");  
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    // HI
    let sender = message.author;
    //#endregion

    //#region HELP
    if(cont === prefix + "HELP"){
        let hembed = new Discord.RichEmbed()
        .setColor(colors.Cyan)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription("**Note: All the commands are NOT cap sensitive**")
        .addField("**!Ping**", "Try it")
        .addField("**!Die**", "Let out all your anger on the bot")
        .addField("**!Pissed**", "I don't know, i was bored")
        .addField("**!Report**", "**If you will use this command to spam or as a joke, you will get perm ban**\nReport someone using the command like this: `!Report <@User> <Reason>` (You don't have to ping)\n You can report someone using DM's, Just DM the bot, like this: `!Report <User> <Reason>`")
        .addField("**!Randomnum/Rn**", "Get a random number between the range you write\nExample: `!rn 1 50`\nSecond Example: `!Randomnum 1 50`")
        .addField("**!Serverinfo**", "Check some information about the server")
        .addField("**!Userinfo**", "Check some information about a member in the server, or check yours. \nTo check yours do " + "`!Userinfo` \nand to check some else's information do " + "`!Userinfo <@User>`\n**Note: You don't have to ping the person**")
        .addField("**!Rollthedice**", "Roll the dice and get a random number between 1 - 6")
        .addField("**!Rps r/p/s**", "A game of rock paper scissors, start the command with `!Rps` and then choose Rock/r, Paper/r or Scissors/s \nExample: `!Rps Rock`\nSecond Example: `!Rps R`")
        message.channel.send(hembed);
    }
    //#endregion
})
//#endregion

//#region Bot Online
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity("Under Pressure", {type : "PLAYING"});

});
//#endregion

bot.login(botconfig.token);
