import { createMocks } from 'node-mocks-http'
import { LogProcessor, ChatMessages } from '../model/LogProcessorModel'

describe('Log Processor Tests', () => {
    describe('processLogs methods tests', () => {
        test("should provide chat messages if cursor and username are null", async () => {
            const processor = new LogProcessor('esfandtv', null, 10, null);
            const expectedResults: ChatMessages
            const actualResults = await processor.processLogQuery()
            expect(actualResults).toEqual()
        })
    })
})