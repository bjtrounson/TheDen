import { useEffect, useState } from 'react'
import dateFormat from 'dateformat'
import parse from 'html-react-parser'
import useSWR from 'swr'
import LinearProgress from '@material-ui/core/LinearProgress'
import styles from '../../../styles/Logs.module.css'
import Head from 'next/head'
import Nav from '../../../components/Nav'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import classes from '../../../styles/Logs.module.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        padding: 20,
        boxShadow: 'box-shadow: inset 0px 4px 4px #00000040;'
    },
    table: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        padding: 20,
        boxShadow: '0px 4px 4px #00000040'
    },
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '0em .1em 1em .1em'
    },
    tableHeaderColumn: {
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word'
    },
    tableHeaderBold: {
        font: `normal 700 18px/21px 'Roboto', sans-serif`
    },
    tableHeaderSmall: {
        font: `normal 700 11px/13px 'Roboto', sans-serif`
    },
    tableBody: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderBottom: `1px solid ${theme.palette.primary.contrastText}`
    },
    tableBodyColumn: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        wordWrap: 'break-word'
    },
    tableBodyBold: {
        font: `font: normal 400 18px/21px 'Roboto', sans-serif`
    },
    tableBodySmall: {
        font: `normal 400 11px/13px 'Roboto', sans-serif`
    },
    pagination: {
        display: 'flex',
        padding: '1em .5em',
        alignItems: 'center'
    },
    limitWrapper: {
        display: 'flex',
        marginRight: 'auto'
    },
    limiter: {
        appearance: 'none',
        padding: '.4em 1.4em .5em .3em',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        fontSize: '13px',
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: '.25em',
        boxShadow: '0px 4px 4px #00000040;',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat, repeat',
        backgroundPosition: 'right .3em top 80%, 0 0',
        backgroundSize: '1.5em 100%',
        cursor: 'pointer'
    },
    controlWrapper: {
        display: 'flex',
        marginLeft: 'auto'
    },
    control: {
        display: 'inline-flex',
        padding: '0 1em',
        marginRight: '.5em',
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        border: `1px solid ${theme.palette.secondary.main}`,
        boxShadow: '0px 4px 4px #00000040',
        borderRadius: '.25em',
        cursor: 'pointer'
    },
    links: {
        color: theme.palette.secondary.light,
        "&:hover": {
            color: theme.palette.secondary.main
        }
    }
  }))

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
    const classes = useStyles();
    const theme = useTheme();
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
            <div className={classes.root}>
                <div className={classes.table}>
                    <div className={classes.tableHeader}>
                        <div className={classes.tableHeaderColumn}>
                            <div className={classes.tableHeaderBold}>Display Name</div>
                            <div className={classes.tableHeaderSmall}>Channel Name</div>
                        </div>
                        <div className={classes.tableHeaderColumn}>
                            <div className={classes.tableHeaderBold}>Message</div>
                            <div className={classes.tableHeaderSmall}>Date Sent</div>
                        </div>
                    </div>
                    {isError ? <div></div> : isLoading ? <LinearProgress color="secondary" /> :
                        logs.chatMessages.map((logs) => (
                            <div key={logs.messageId} className={classes.tableBody}>
                                <div className={classes.tableBodyColumn}>
                                    <div className={classes.tableBodyBold}><a className={classes.links} href={`https://twitch.tv/${logs.userDisplayName}`}>{logs.userDisplayName}</a></div>
                                    <div className={classes.tableBodySmall}>{logs.channelDisplayName}</div>
                                </div>
                                <div className={classes.tableBodyColumn}>
                                    <div className={classes.tableBodyBold}>{parse(logs.message)}</div>
                                    <div className={classes.tableBodySmall}>{dateFormat(logs.timestamp, "dd/mm/yyyy hh:MM:sstt Z")}</div> 
                                </div>
                            </div>
                        ))
                    }
                    <div className={classes.pagination}>
                        <div className={classes.limitWrapper}>
                            <select className={classes.limiter} value={limit} onChange={e => setLimit(e.target.value)}>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                            </select>
                        </div>
                        <div className={classes.controlWrapper}>
                            <a className={classes.control} onClick={navigateBackward}><span className="material-icons">navigate_before</span></a>
                            <a className={classes.control} onClick={navigateForward}><span className="material-icons">keyboard_arrow_right</span></a>
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