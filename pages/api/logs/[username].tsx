import prisma from '../../../db.tsx'
import sanitizeHtml from 'sanitize-html'

export default async function handler(req, res) {
    const page = req.query.page
    const limit = req.query.limit

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const { username } = req.query
    const logs = await prisma.messages.findMany({
        where: {
            display_name: username
        },
        include: {
            channels: {
                select: {
                    channel_name: true
                }
            }
        }
    })
    const pageShrink = logs.slice(startIndex, endIndex)
    const fetchedEmotes = await fetch(`http://localhost:3000/api/emotes`).then((res) => { return res.json() });
    fetchedEmotes.forEach(emotes => {
        pageShrink.forEach(log => {
            var r = new RegExp(`\\b${emotes.name}\\b`, 'g');
            log.message = log.message.replace(r, sanitizeHtml(`<img src="${emotes.start_url}${emotes.code}${emotes.end_url}" alt="${emotes.name}">`, {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
            }))
        })
    })
    const resultData = [{dataInfo:  [{ length: logs.length / limit, page: page, limit: limit }]}, {messages: [...pageShrink]}]
    await res.json(resultData)
}