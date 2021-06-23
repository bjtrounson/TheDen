import { NextApiResponse } from 'next';
import { LogProcessor } from '../../../model/LogProcessorModel'

interface APIRequest {
    query: {
        cursor: string,
        channel: string
        limit: number,
        username: string
    }
}

export default async function handler(req: APIRequest, res: NextApiResponse) {
    const channelName = req.query.channel
    const cursor = req.query.cursor;
    const limit = req.query.limit;
    const username = req.query.username;
    const processor = new LogProcessor(channelName, cursor, limit, username)
    const logs = processor.processLogQuery()
    const allEmoteNames = processor.extractEmoteNames(await logs)
    const cleanEmoteNames = processor.removeInvalidEmotes(allEmoteNames)
    const replacedLogs = processor.replaceEmoteNamesWithImages(await logs, cleanEmoteNames)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(replacedLogs)
}