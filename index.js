require('dotenv').config(); // for process.env vars
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

const pugSize = 6; // Maximum amount of players in the PUG
var pugMembers = []; // Array to hold the members in the PUG
var teamA = [];
var teamB = [];
var gemMap = "";
var ballMap = "";
var heistMap = "";
var gemGrabMaps = ["Hard Rock Mine", "Crystal Cavern", "Deathcap Cave", "Stone Fort", "Undermine", "Deep Siege", "Chill Cave", "Echo Chamber", "Flooded Mine"];
var brawlBallMaps = ["Backyard Bowl", "Triple Dribble", "Pinhole Punt", "Sneaky Fields", "Super Stadium", "Puddle Splash", "Pool Party"];
var heistMaps = ["Kaboom Canyon", "Safe Zone", "Forks Out", "Rolling Rumble", "Twist and Shoot", "Bridge Too Far", "Corner Case"];

function checkPugSize(){
    if (pugMembers.length == 5){
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
        pickMaps();
        pugMatchDetail(msg);
    }
    else{
        console.log("There was an error!");        
    }
    
}

function pickMaps(){
    // Randomly select one map from each game mode and save it in the maps array.
    // [Gem Grab, Brawl Ball, Heist]
    gemMap = gemGrabMaps[Math.floor(Math.random()*gemGrabMaps.length)];
    ballMap = brawlBallMaps[Math.floor(Math.random()*brawlBallMaps.length)];
    heistMap = heistMaps[Math.floor(Math.random()*heistMaps.length)];
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

function pugMatchDetail(msg){
    var host_user = pugMembers[Math.floor(Math.random()*pugMembers.length)];
    const bsToken = client.emojis.find(emoji => emoji.name ==="bs_token");
    const bsStar = client.emojis.find(emoji => emoji.name ==="bs_star");
    const bsPurpleStar = client.emojis.find(emoji => emoji.name ==="bs_purple_star");
    const bsGem = client.emojis.find(emoji => emoji.name ==="bs_gem");
    const bsBall = client.emojis.find(emoji => emoji.name ==="bs_ball");
    const bsHeist = client.emojis.find(emoji => emoji.name ==="bs_heist");
    msg.channel.send({embed: {
        color: 0xD3D3D3,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: `PUG is Ready!`,
        description: "Below you will find PUG details.",
        fields: [{
            name: `${bsToken} Host User - ${host_user}`,
            value: "Please create a room and share the room code with those in this PUG"
          },
          {
            name: `${bsStar} Team A`,
            value: teamA.toString()
          },
          {
            name: `${bsStar} Team B`,
            value: teamB.toString()
          },
          {
            name: `${bsGem} Gem Grab`,
            value: gemMap
          },
          {
            name: `${bsBall} Brawl Ball`,
            value: ballMap
          },
          {
            name: `${bsHeist} Heist`,
            value: heistMap
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Developed by: Pritykin"
        }
      }
    });
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