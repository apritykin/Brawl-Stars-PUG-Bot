const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = 'NTI1MDM0MDgwNDI1ODY5MzE0.Dvwxlw.9g_h_lTuxanfQeUc-NUVZh8Fxwk';

const pugSize = 6; // Maximum amount of players in the PUG
var pugMembers = []; // Array to hold the members in the PUG

function checkPugSize(){
    if (pugMembers.length == 6){
        //TODO Create the two teams
        console.log(`PUG IS FULL: ${pugMembers.length}`);
    }else{
        console.log(`THE PUG IS NOT FULL: ${pugMembers.length}`);
    }
}

function addUserPug(msg){
    // console.log(msg.author);
    // Add user to the pugMembers Array if the array is not full
    if (pugMembers.length <= 5){
        pugMembers.push(msg.author.username);
        msg.channel.send(`${msg.author} added to queue ${pugMembers.length}/6.`); // Mention the user that they are added into the queue
        // msg.reply(' added to queue. ' + `${pugMembers.length}/6`);
        msg.delete()
        .then(msg => console.log(pugMembers))
        .catch(console.error);
    }
    else{ // Create a new pug and pass the user into the array
        console.log("TODO: Create a new pug when current array is filled");
        // createNewPug(msg.author.username);
    }
    
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content == '!size'){
        msg.channel.send(`Current PUG Size: ${pugMembers.length}`);
        console.log(pugMembers);
    }
    if (msg.content === '!add'){
        // console.log(msg.author);
        checkPugSize();
        addUserPug(msg);
    }
});

client.login(TOKEN);