import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../../../components/Nav'
import Footer from '../../../components/Footer'
import Table from 'react-bootstrap/Table'
import styles from '../../../styles/logs.module.css'
import parse from 'html-react-parser';
import sanitizeHtml from 'sanitize-html';

function userLogs ({ logs }) {
    return <>
        <Header/>
        <main className={styles.main}>
            <div className={styles.tablewrapper}>
                <Table striped bordered hover variant='dark'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Channel Name</th>
                            <th>Date Sent</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(logs => (
                            <tr>
                                <td>{logs.display_name}</td>
                                <td>{logs.channel_name}</td>
                                <td>{logs.date_sent}</td>
                                <td>{parse(logs.message)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </main>
        <Footer/>
    </>
}

async function getLogs(username) {
    const logRes = await fetch(`http://127.0.0.1:4000/logs/${username}`);
    const logs = await logRes.json();
    const channelRes = await fetch(`http://127.0.0.1:4000/channels`);
    const channels = await channelRes.json();
    const globalEmoteURLS = [`https://api.twitchemotes.com/api/v4/channels/${channels.id}`]
    const bttvEmoteURLS = channels.map(channels => { 
        const emoteURLS = [`https://api.betterttv.net/3/cached/users/twitch/${channels.id}`]
        return emoteURLS;
    })
    const ffzEmoteURLS = channels.map(channels => {
        const emoteURLS = [`https://api.frankerfacez.com/v1/room/id/${channels.id}`]
        return emoteURLS;
    })
    
    async function emoteSource(url) {
        const fetchEmotesRes = await fetch(url);
        const fetchedEmotes = await fetchEmotesRes.json();
        return fetchedEmotes;
    }

    var fetchedEmotes = await emoteSource('https://api.betterttv.net/3/cached/emotes/global')
    for (var emotes of fetchedEmotes) { 
        for (var log of logs) {
            var r = await new RegExp('\\b'+ emotes.code + '\\b', 'g');
            log.message = await log.message.replace(r, sanitizeHtml('<img src="' + 'https://cdn.betterttv.net/emote/' + emotes.id + '/1x">', {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
                }))
        }
    }

    for (var urls of bttvEmoteURLS) {
        var fetchedEmotes = await emoteSource(urls[0])
        for (var emotes of fetchedEmotes.sharedEmotes) { 
            for (var log of logs) {
                var r = await new RegExp('\\b'+ emotes.code + '\\b', 'g');
                log.message = await log.message.replace(r, sanitizeHtml('<img src="' + 'https://cdn.betterttv.net/emote/' + emotes.id + '/1x">', {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
                }))
            }
        }
        for (var emotes of fetchedEmotes.channelEmotes) { 
            for (var log of logs) {
                var r = await new RegExp('\\b'+ emotes.code + '\\b', 'g');
                log.message = await log.message.replace(r, sanitizeHtml('<img src="' + 'https://cdn.betterttv.net/emote/' + emotes.id + '/1x">', {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
                }))
            }
        }   
    }

    var fetchedEmotes = await emoteSource('https://api.frankerfacez.com/v1/set/global')
    for (var set in fetchedEmotes.sets) {
        for (var emotes of fetchedEmotes.sets[set]["emoticons"]) {
            for (var log of logs) {
                var r = new RegExp('\\b' + emotes.name + '\\b', 'g');
                log.message = await log.message.replace(r, sanitizeHtml('<img src="https://cdn.frankerfacez.com/emote/' + emotes.id + '/1">', {
                    allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
                }))
            }
        }
    }

    for (var urls of ffzEmoteURLS) { 
        var fetchedEmotes = await emoteSource(urls[0])
        for (var set in fetchedEmotes.sets) {
            for (var emotes of fetchedEmotes.sets[set]["emoticons"]) {
                for (var log of logs) {
                    var r = new RegExp('\\b' + emotes.name + '\\b', 'g');
                    log.message = await log.message.replace(r, sanitizeHtml('<img src="https://cdn.frankerfacez.com/emote/' + emotes.id + '/1">', {
                        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
                    }))
                }
            }
        }
    }
    return await logs
}

export const getServerSideProps = async (context) => { 
    var logs = await getLogs(context.params.username);
    return {
        props: {
            logs
        }
    }
}

export default userLogs