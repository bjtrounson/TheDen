import Head from 'next/head'
import Nav from '../../../components/Nav'
import LogsTable from '../../../components/LogsTable'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { Fab } from '@material-ui/core'
import DownArrowIcon from '@material-ui/icons/KeyboardArrowDown'
import UpArrowIcon from '@material-ui/icons/KeyboardArrowUp'
import { createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import { ChatMessages } from '../../../model/LogProcessorModel'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

interface Props {
    channelName: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        padding: 20,
        boxShadow: 'box-shadow: inset 0px 4px 4px #00000040;'
    },
    fabWrapper: {
        display: 'grid',
        alignItems: 'center',
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(4),
    },
    fab: {
        marginBottom: '1em'
    },
  }))

const fetcher = (url: string): Promise<ChatMessages> => fetch(url).then(res => res.json())

const Logs: NextPage<Props> = ({ channelName }) => {
    const classes = useStyles();

    // States and Logs Fetching
    const [limit, setLimit] = useState(10);
    const [cursor, setCursor] = useState<string | undefined>("");
    const [username, setUsername] = useState<string | undefined>("");
    const [backCursor, setBackCursor] = useState<string | undefined>("");
    const { data, error } = useSWR(`/api/logs/${channelName}?cursor=${cursor}&limit=${limit}&username=${username}`, fetcher)
    useEffect(() => {
        setCursor("")
    }, [])

    // Navigate Forward Pagination Button
    const navigateForward = () => {
        setBackCursor(cursor)
        setCursor(data?.metadata.paginationCursor)
    }

    // Navigate Backward Pagination Button
    const navigateBackward = () => {
        setCursor(backCursor)
    }

    const handleUpScrollFab = () => {
        window.scrollTo({top: 0, left: 0, behavior: "smooth"})
    }

    const handleDownScrollFab = () => {
        window.scrollTo({top: document.getElementById("__next")!.scrollHeight, left: 0, behavior: "smooth"})
    }

    return (
        <div>
            <Head>
                <title>The Den | {channelName}</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </Head>
            <Nav/>
            <div className={classes.root}>
                <LogsTable logs={data!} navigateForward={navigateForward} navigateBackward={navigateBackward} limit={limit} setLimit={setLimit} isError={error} isLoading={!data && !error} username={username} setUsername={setUsername} />
                <div className={classes.fabWrapper}>
                    <Fab size="small" color="secondary" className={classes.fab} onClick={handleUpScrollFab}>
                        <UpArrowIcon />
                    </Fab>
                    <Fab size="small" color="secondary" className={classes.fab} onClick={handleDownScrollFab}>
                        <DownArrowIcon />
                    </Fab>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => { 
    const { channelName } = context.params!;

    return {
        props: {
            channelName
        }
    }
}

export default Logs