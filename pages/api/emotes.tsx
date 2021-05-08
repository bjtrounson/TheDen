import prisma from '../../db.tsx'

export default async function handler(req, res) {
    const channels = await prisma.channels.findMany()
    let emotes = [];
    const globalEmoteURLS = [`https://api.twitchemotes.com/api/v4/channels/${channels.id}`]
    const bttvEmoteURLS = channels.map(channels => {
        const emoteURLS = [`https://api.betterttv.net/3/cached/users/twitch/${channels.id}`]
        return emoteURLS
    })
    const ffzEmoteURLS = channels.map(channels => {
        const emoteURLS = [`https://api.frankerfacez.com/v1/room/id/${channels.id}`]
        return emoteURLS
    })
    var bttvStartURL = 'https://cdn.betterttv.net/emote/'
    var bttvEndURL = '/1x'
    var ffzStartURL = 'https://cdn.frankerfacez.com/emote/'
    var ffzEndURL = '/1'
    async function emoteSource(url) {
        var fetchedData = await fetch(url).then((res) => { return res.json() })
        return fetchedData
    }

    ffzEmoteURLS.forEach(async (urls) => {
        var fetchedEmotes = await emoteSource(urls[0])
        for (var set in fetchedEmotes.sets) {
            fetchedEmotes.sets[set]["emoticons"].forEach(emote => {
                emotes.push({ name: emote.name, code: emote.id, start_url: ffzStartURL, end_url: ffzEndURL })
            })
        }
    })

    var fetchedEmotes = await emoteSource('https://api.betterttv.net/3/cached/emotes/global')
    fetchedEmotes.forEach(emote => {
        emotes.push({ name: emote.code, code: emote.id, start_url: bttvStartURL, end_url: bttvEndURL })
    })

    bttvEmoteURLS.forEach(async (urls)  => {
        var fetchedEmotes = await emoteSource(urls[0])
        fetchedEmotes.sharedEmotes.forEach(emote => {
            emotes.push({ name: emote.code, code: emote.id, start_url: bttvStartURL, end_url: bttvEndURL })
        })
        fetchedEmotes.channelEmotes.forEach(emote => {
            emotes.push({ name: emote.code, code: emote.id, start_url: bttvStartURL, end_url: bttvEndURL })
        })
    })

    var fetchedEmotes = await emoteSource('https://api.frankerfacez.com/v1/set/global')
    for (var set in fetchedEmotes.sets) {
        fetchedEmotes.sets[set]["emoticons"].forEach(emote => {
            emotes.push({ name: emote.name, code: emote.id, start_url: ffzStartURL, end_url: ffzEndURL })
        })
    }

    

    await res.json(emotes)

}