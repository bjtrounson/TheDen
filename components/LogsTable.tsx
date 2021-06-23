import { Dispatch, FormEvent, FunctionComponent, SetStateAction, useState } from "react";
import dateFormat from 'dateformat'
import parse from 'html-react-parser'
import { LinearProgress } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import { ChatMessages, Logs } from "../model/LogProcessorModel";
import { NextPage } from "next";
import { LocalFloristSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        padding: 20,
        boxShadow: '0px 4px 4px #00000040'
    },
    tableHeader: {
        display: 'grid',
        gridTemplateColumns: '1fr .5fr .5fr',
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
        wordWrap: 'normal'
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
    },
    counterWrapper: {
        padding: '0 1em 0 0'
    }
  }))

interface LogsTable {
    logs: ChatMessages,
    navigateForward: () => void,
    navigateBackward: () => void,
    isError: ErrorEvent,
    isLoading: boolean,
    limit: number,
    setLimit: Dispatch<SetStateAction<number>>,
    username: string,
    setUsername: Dispatch<SetStateAction<string>>
}

const LogsTable: FunctionComponent<LogsTable> = ({logs, navigateForward, navigateBackward, isError, isLoading, limit, setLimit, username, setUsername}) => {

    // Theme & Styles
    const classes = useStyles();
    const theme = useTheme();
    const [tempUser, setTempUser] = useState("")

    const handleUserChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUsername(tempUser)
        setTempUser("")
    }

    return (
        <div>
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
                    <div className={classes.tableHeaderColumn}>
                        <form onSubmit={handleUserChange}>
                            <input type="text" placeholder="Filter Users" value={tempUser} onChange={e => setTempUser(e.target.value)}/>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                {isError ? <div><Alert severity="error">This is an error alert — <strong>Try Refreshing!</strong></Alert></div> : isLoading ? <LinearProgress color="secondary" /> :
                    logs.chatMessages.map((logs: Logs) => (
                        <div id={logs.messageId} key={logs.messageId} className={classes.tableBody}>
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
                    <div className={classes.counterWrapper}>
                        <h4>Total Logs: {() => { if (logs.metadata.totalCount === undefined) {return 0} return logs.metadata.totalCount}}</h4>
                    </div>
                    <div className={classes.limitWrapper}>
                        <select className={classes.limiter} value={limit} onChange={e => setLimit(parseInt(e.target.value))}>
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className={classes.controlWrapper}>
                        <a className={classes.control} onClick={navigateBackward}><span className="material-icons">navigate_before</span></a>
                        <a className={classes.control} onClick={navigateForward}><span className="material-icons">keyboard_arrow_right</span></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogsTable;