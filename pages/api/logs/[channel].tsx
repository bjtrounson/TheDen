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

interface Logs {
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

interface ChatMessages {
    chatMessages: Array<Logs>
}

async function processLogQuery(cursor: string, channelName: string, limit: number) {
    if (cursor === undefined || "") {
        const logs: ChatMessages = await fetch(`http://159.89.111.252/Logs?channelName=${channelName}&limit=${limit}`).then((res) => { return res.json() })
        return logs
    }
    const logs: ChatMessages = await fetch(`http://159.89.111.252/Logs?channelName=${channelName}&cursor=${cursor}&limit=${limit}`).then((res) => { return res.json() })
    return logs
}

function extractEmoteNames (logs: ChatMessages) {
    const emoteNames: Array<string> = []
    logs.chatMessages.forEach(log => {
        log.emotes.forEach(emotes => emoteNames.push(log.message.substring(emotes.startIndex, emotes.endIndex + 1)))
    })
    return emoteNames
}

function replaceEmoteNamesWithImages (logs: ChatMessages, emoteNames: Array<string>) {
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

function removeInvalidEmotes (emoteNames: Array<string>) {
    const invalidEmoteNames: Array<string> = [':)', ':(', ':o', ':Z', 'B)', ':\\', ';)', ';p', ':p', 'R)', 'o_O', ':D', '>(', '<3']
    invalidEmoteNames.forEach(invalidName => {
        emoteNames = emoteNames.filter(e => e !== invalidName)
    })
    return emoteNames
}

export default async function handler(req, res) {
    const channelName = req.query.channel
    const cursor = req.query.cursor;
    const limit = req.query.limit;
    const logs = processLogQuery(cursor, channelName, limit)
    const allEmoteNames = extractEmoteNames(await logs)
    const cleanEmoteNames = removeInvalidEmotes(allEmoteNames)
    const replacedLogs = replaceEmoteNamesWithImages(await logs, cleanEmoteNames)
    res.json(replacedLogs)
}