interface Badges {
    type: number,
    imageUrls: [],
    version: string,
    name: string,
    title: string,
    description: string
}

interface Emotes {
    startIndex: number,
    endIndex: number,
    emoteUrl: Array<Array<string>>
}

export interface Logs {
    timestamp: string,
    messageId: string,
    userId: number,
    userDisplayName: string,
    channelId: number,
    channelDisplayName: string,
    userColor: string,
    badges: Array<Badges>,
    message: string,
    emotes: Array<Emotes>
}

export interface ChatMessages {
    chatMessages: Array<Logs>
    metadata: {
        paginationCursor: string,
        totalCount: number
    }
}

export interface LogProcessor {
    cursor: string | null,
    channel: string,
    limit: number,
    username: string | null
}

export class LogProcessor implements LogProcessor {
    constructor(newChannel: string, newCursor: string | null, newLimit: number, newUsername: string | null) {
        this.cursor = newCursor;
        this.channel = newChannel;
        this.limit = newLimit;
        this.username = newUsername;
    }

    async processLogQuery() {
        if (this.cursor === undefined || "") {
            if (this.username === undefined || "") {
                const logs: ChatMessages = await fetch(`https://preview.api.denhub.xyz/Logs?channelName=${this.channel}&limit=${this.limit}&order=desc`).then((res) => { return res.json() })
                return logs
            }
            const logs: ChatMessages = await fetch(`https://preview.api.denhub.xyz/Logs?channelName=${this.channel}&limit=${this.limit}&Username=${this.username}&order=desc`).then((res) => { return res.json() })
            return logs
        } else {
            if (this.username === undefined || "") {
                const logs: ChatMessages = await fetch(`https://preview.api.denhub.xyz/Logs?channelName=${this.channel}&cursor=${this.cursor}&limit=${this.limit}&order=desc`).then((res) => { return res.json() })
                return logs
            }
            const logs: ChatMessages = await fetch(`https://preview.api.denhub.xyz/Logs?channelName=${this.channel}&cursor=${this.cursor}&limit=${this.limit}&Username=${this.username}&order=desc`).then((res) => { return res.json() })
            return logs
        }
    }
    
    extractEmoteNames (logs: ChatMessages) {
        const emoteNames: Array<string> = []
        logs.chatMessages.forEach(log => {
            log.emotes.forEach(emotes => emoteNames.push(log.message.substring(emotes.startIndex, emotes.endIndex + 1)))
        })
        return emoteNames
    }
    
    replaceEmoteNamesWithImages (logs: ChatMessages, emoteNames: Array<string>) {
        logs.chatMessages.forEach(log => {
            log.emotes.forEach(emote => {
                emoteNames.forEach(emoteName => {
                    var r = new RegExp(`\\b${emoteName}\\b`, 'g');
                    log.message = log.message.replace(r, `<img src="${emote.emoteUrl[0]}" />`)
                })
            })
        })
        return logs
    }
    
    removeInvalidEmotes (emoteNames: Array<string>) {
        const invalidEmoteNames: Array<string> = [':)', ':(', ':o', ':Z', 'B)', ':\\', ';)', ';p', ':p', 'R)', 'o_O', ':D', '>(', '<3', ';-)']
        invalidEmoteNames.forEach(invalidName => {
            emoteNames = emoteNames.filter(e => e !== invalidName)
        })
        return emoteNames
    }    
}