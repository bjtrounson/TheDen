import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import parse from 'html-react-parser'
import useSWR from 'swr'
import Spinner from 'react-spinner-material'
import styles from '../../../styles/Logs.module.css'
import Head from 'next/head'
import Nav from '../../../components/Nav'

String.prototype.replaceAt = function(startIndex, endIndex, replacement) {
    return this.substring(0, startIndex) +  replacement + this.substring(endIndex + 1);
}

const fetcher = (url) => fetch(url).then(res => res.json())

function useLogs (cursor, limit, channelName) {
    const { data, error, isValidating } = useSWR(`/api/logs/${channelName}?cursor=${cursor}&limit=${limit}`, fetcher)
    
    return {
        logs: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default function Logs({ channelName }) {
    const [limit, setLimit] = useState(10);
    const [cursor, setCursor] = useState("");
    const { logs, isLoading, isError } = useLogs(cursor, limit, channelName)

    const navigateForward = () => {
        setCursor(logs.paginationCursor)
    }

    const navigateBackward = () => {
        
    }

    return (
        <div>
            <Head>
                <title>The Den | {channelName}</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </Head>
            <Nav/>
            <div className={styles.main}>
                <div className={styles.table}>
                    <div className={styles.tHead}>
                        <div className={styles.thCol}>
                            <div className={styles.thBold}>Display Name</div>
                            <div className={styles.thSmall}>Channel Name</div>
                        </div>
                        <div className={styles.thCol}>
                            <div className={styles.thBold}>Message</div>
                            <div className={styles.thSmall}>Date Sent</div>
                        </div>
                    </div>
                    {isError ? <div></div> : isLoading ? <div className={styles.loading}><Spinner radius={64} color={"hsl(123, 38%, 57%)"} stroke={2} visible={true}/></div> :
                        logs.chatMessages.map((logs) => (
                            <div key={logs.messageId} className={styles.tBody}>
                                <div className={styles.tbCol}>
                                    <div className={styles.tbBold}><a className={styles.links} href={`https://twitch.tv/${logs.userDisplayName}`}>{logs.userDisplayName}</a></div>
                                    <div className={styles.tbSmall}>{logs.channelDisplayName}</div>
                                </div>
                                <div className={styles.tbCol}>
                                    <div className={styles.tbBold}>{logs.emotes[0] == undefined ? logs.message : logs.emotes.map((emotes) => (
                                        parse(logs.message.replaceAt(emotes.startIndex, emotes.endIndex, `<img src="${emotes.emoteUrl[0]}" />`))
                                    ))}</div>
                                    <div className={styles.tbSmall}>{dateFormat(logs.timestamp, "dd/mm/yyyy hh:MM:sstt Z")}</div> 
                                </div>
                            </div>
                        ))
                    }
                    <div className={styles.pagination}>
                        <div className={styles.limitWrapper}>
                            <select className={styles.limiter} value={limit} onChange={e => setLimit(e.target.value)}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </div>
                        <div className={styles.controlWrapper}>
                            <a className={styles.control} onClick={navigateBackward}><span className="material-icons">navigate_before</span></a>
                            <a className={styles.control} onClick={navigateForward}><span className="material-icons">keyboard_arrow_right</span></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => { 
    const channelName = context.params.channel;

    return {
        props: {
            channelName
        }
    }
}