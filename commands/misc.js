let _utils = require('@services/utils');

let ping = {};
ping.aliases = ['ping'];
ping.prettyName = 'Ping';
ping.help = 'Yo';
ping.executeViaIntegration = true;
ping.callback = function() {
    return 'Pong!';
};

let kys = {};
kys.aliases = ['kys'];
kys.prettyName = 'Kill Yourself';
kys.help = 'OOf';
kys.executeViaIntegration = true;
kys.callback = function() {
    return ':cry: :gun:';
};

let git = {};
git.aliases = ['git'];
git.prettyName = 'GitHub';
git.help = 'View this on GitHub';
git.executeViaIntegration = true;
git.callback = function() {
    return 'https://github.com/jtsalisbury/discord-cbot';
};

let gimme = {};
gimme.aliases = ['gimme'];
gimme.prettyName = 'Gimme';
gimme.help = 'Gimme a random meme';
gimme.executeViaIntegration = true;
gimme.callback = async function() {
    let res = await _utils.HTTPGet('https://meme-api.herokuapp.com/gimme', {});

    return `${res.title}\n${res.url}`;
};

let say = {};
say.aliases = ['say'];
say.prettyName = 'Say';
say.help = 'Make the bot say something!';
say.executeViaIntegration = true;
say.params = [
    {
        name: 'string',
        type: 'string'
    }
];
say.callback = function(message, string) {
    message.channel.bulkDelete([message]);

    if (string.indexOf('!') > -1) {
        return 'You can\'t send a message to call another command!';
    }

    return string;
}

let insult = {};
insult.aliases = ['insult'];
insult.prettyName = 'Insult';
insult.help = 'Generate an insult';
insult.executeViaIntegration = false;
insult.params = [
    {
        name: 'user',
        type: 'string',
        optional: true
    }
];
insult.callback = async function(message, user) {
    // Grab insult
    let res = await _utils.HTTPGet('https://insult.mattbas.org/api/insult');

    // Determine if a user was passed
    if (message.mentions.users.size > 0) {
        let id = message.mentions.users.values().next().value.id;

        res = '<@' + id + '>, ' + res.charAt(0).toLowerCase() + res.substring(1);
    } else if (user) {
        res = user + ', ' + res.charAt(0).toLowerCase() + res.substring(1);
    }

    return res;
}

let trump = {};
trump.aliases = ['trump'];
trump.prettyName = 'Trump';
trump.help = 'Gets a random Trump quote';
trump.executeViaIntegration = false;;
trump.callback = async function(message) {
    let res = await _utils.HTTPGet('https://api.whatdoestrumpthink.com/api/v1/quotes/random');

    if (!res || !res.message) {
        return 'No quotes found';
    }

    return `**Donald Trump:** ${res.message}`;
}

module.exports.commands = [ping, kys, git, gimme, say, insult, trump];