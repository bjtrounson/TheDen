import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import parse from 'html-react-parser'
import useSWR from 'swr'
import Spinner from 'react-spinner-material'
import styles from '../../../styles/Logs.module.css'
import AutoSizeInput from 'react-input-autosize'
import Head from 'next/head'
import Nav from '../../../components/Nav'

const fetcher = (url) => fetch(url).then(res => res.json())

function useLogs (page, limit, username) {
    const { data, error, isValidating } = useSWR(`/api/logs/${username}/?page=${page}&limit=${limit}`, fetcher)

    return {
        logs: data,
        isLoading: !error && !data,
        isError: error
    }
}

export default function Logs({ username }) {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const { logs, isLoading, isError } = useLogs(page, limit, username)

    const navigateForward = () => {
        if (page == logs[0].dataInfo[0].length) {
            return null
        }
        setPage(page + 1)
    }

    const navigateBackward = () => {
        if (page == 1) {
            return null
        }
        setPage(page -1)
    }

    return (
        <div>
            <Head>
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
                        logs[1].messages.map((logs) => (
                            <div key={logs.id} className={styles.tBody}>
                                <div className={styles.tbCol}>
                                    <div className={styles.tbBold}>{logs.display_name}</div>
                                    <div className={styles.tbSmall}>{logs.channels.channel_name}</div>
                                </div>
                                <div className={styles.tbCol}>
                                    <div className={styles.tbBold}>{parse(logs.message)}</div>
                                    <div className={styles.tbSmall}>{dateFormat(logs.date_sent, "yyyy-mm-dd hh:MM:ss")}</div> 
                                </div>
                            </div>
                        ))
                    }
                    <div className={styles.pagination}>
                        <div className={styles.limitWrapper}>
                            <div className={styles.limitInput}>
                                <p>Page: </p><AutoSizeInput value={page} type="number" min={1} max={isLoading ? null : logs[0].dataInfo[0].length} onChange={e => setPage(e.target.value)}/><p>/ {isLoading ? null : Math.round(logs[0].dataInfo[0].length)}</p>
                            </div>
                            <select className={styles.limiter} value={limit} onChange={(e) => setLimit(e.target.value)}>
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
    const username = context.params.username;
    return {
        props: {
            username
        }
    }
}