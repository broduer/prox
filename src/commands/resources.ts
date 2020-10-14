import { Message } from 'discord.js';
import { IBaseCommand } from '../models/IBase';
import * as _utils from '../services/utils';

let define = <IBaseCommand>{};
define.aliases = ['define'];
define.prettyName = 'Define';
define.help = 'Define a term or string provided';
define.params = [
    {
        name: 'term',
        type: 'string'
    }
];
define.executeViaIntegration = true;
define.callback = async function(_: Message, term: string) {
    let url = `http://api.urbandictionary.com/v0/define?term=${term}`;
    let result = await _utils.HTTPGet(url);
    let def = result['list'][0];

    if (!def) {
        return 'No definition found';
    } else {
        return `Definition of ${term}: ${def['definition']} \nExample: ${def['example']}`
    }
}

let search = <IBaseCommand>{};
search.aliases = ['search'];
search.prettyName = 'Search';
search.help = 'Searches Google for the first result and returns the link';
search.params = [
    {
        name: 'term',
        type: 'string'
    }
];
search.executeViaIntegration = true;
search.callback = async function(_: Message, term: string) {
    let getUrl = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=10&q=${term}&safeSearch=false`
    let headers = {
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
        "x-rapidapi-key": process.env.SEARCH_APIKEY
    }
    let result: any = await _utils.HTTPGet(getUrl, headers);

    if (!result) {
        return 'No results found';
    }

	return `We found ${result.totalCount} results. The first one was ${result.value[0].url}`;
}

module.exports.commands = [define, search];