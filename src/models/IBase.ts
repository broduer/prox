import { Message, TextChannel, VoiceChannel } from 'discord.js';

export interface IBaseParam {
    name: string;
    type: string;
    optional?: boolean;
    default?: any;
    value?: any;
}

export interface IBaseCommand {
    aliases: string[];
    prettyName: string;
    help: string;
    params: IBaseParam[];
    callback: (Message, ...any) => Promise<String> | Promise<void> | void;
    userPermissions?: string[];
    executePermissions?: string[];
    executeViaIntegration?: boolean;
}

export interface IBaseParamHandler {
    name: string;
    convert: (string, GuildMemberManager?) => any;
}

export interface IBaseMusicHandler {
    getName(): string;
    isMatch(link: string): boolean;
    getSongs(link: string): Promise<ISongData[]>;
    getStream(url: string): any;
    getNext(url: string): any;
}

export interface ISongData {
    title: string;
    url: string;
    artists: object;
    type: string;
    autoplay?: boolean;
    author?: string;
}

export interface ISongQueue {
    textChannel: TextChannel;
    voiceChannel: VoiceChannel;
    dispatcher: any;
    songs: ISongData[];
    volume: number;
    playing: boolean;
    autoplay: boolean;
}
