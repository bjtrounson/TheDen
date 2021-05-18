import Head from 'next/head'
import Nav from '../components/Nav'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridSpacing, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Theme, createStyles } from '@material-ui/core'
import styles from '../styles/Clips.module.css'
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: 'var(--p-color)',
            padding: 20,
            flexGrow: 1,
        },
        clips: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.contrastText,
            maxWidth: 345,
            padding: 4,
            margin: 10
        },
        media: {
            height: 140,
        },
    })
);

export default function Clips() {
    const [spacing, setSpacing] = useState<GridSpacing>(2);
    const classes = useStyles();
    return (
        <div>
            <Head>
                <title>The Den | Clips</title>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            </Head>
            <Nav/>
            <Grid container className={classes.root} spacing={5}>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={spacing}>
                        {[0, 1, 2].map((value) => (
                            <Card key={value} className={classes.clips}>
                                <CardActionArea>
                                    <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Lizard
                                    </Typography>
                                    <Typography variant="body2" color="inherit" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color='inherit'>
                                    Share
                                    </Button>
                                    <Button size="small" color="inherit">
                                    Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}