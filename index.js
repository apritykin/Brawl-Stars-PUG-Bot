const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = '';

const pugSize = 6; // Maximum amount of players in the PUG
var pugMembers = ["person1", "person2", "person3", "person4","person5"]; // Array to hold the members in the PUG
var teamA = [];
var teamB = [];

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
    if (pugMembers.length <= 4){
        pugMembers.push(msg.author.username);
        msg.channel.send(`${msg.author} added to queue ${pugMembers.length}/6.`); // Mention the user that they are added into the queue
        // msg.reply(' added to queue. ' + `${pugMembers.length}/6`);
        msg.delete()
        .then(msg => console.log(pugMembers))
        .catch(console.error);
    }
    // If the length is 5, then the next person to enter will complete the PUG rosters
    else if (pugMembers.length = 5){
        pugMembers.push(msg.author.username);
        msg.channel.send(`${msg.author} added to queue ${pugMembers.length}/6.`); // Mention the user that they are added into the queue
        // msg.reply(' added to queue. ' + `${pugMembers.length}/6`);
        msg.delete()
        .then(msg => console.log(pugMembers))
        .catch(console.error);
        createTeams();
    }
    else{
        console.log("There was an error!");        
    }
    
}

function createTeams(){
    // Shuffle to array of 6 into a random order
    shuffle(pugMembers);
    console.log(`Current shifted: ${pugMembers}`);
    teamA = pugMembers.slice(0,3);
    teamB = pugMembers.slice(3);
    
    console.log("TEAM A: " + teamA);
    console.log("TEAM B: " + teamB);
}

// Shuffle the array into random sort
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
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