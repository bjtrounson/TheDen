export default async function handler(req, res) {
    const channelName = req.query.channel
    const channelResults = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, {
        headers: {
            'Authorization': process.env.SECRET_OAUTH,
            'Client-Id': process.env.SECRET_CLIENTID
        }
    }).then((res) => { return res.json() });
    const cursor = req.query.cursor;
    const limit = req.query.limit;
    const channelID = channelResults.data[0].id;
    if (cursor == "" || cursor == undefined) {
        const logs = await fetch(`http://159.89.111.252/Logs/${channelID}/logs?limit=${limit}`).then((res) => { return res.json() })
        console.log(logs.chatMessages[0].emotes[0])
        await res.json(logs)
    } else {
        const logs = await fetch(`http://159.89.111.252/Logs/${channelID}/logs?cursor=${cursor}&limit=${limit}`).then((res) => { return res.json() })
        await res.json(logs)
    }
}