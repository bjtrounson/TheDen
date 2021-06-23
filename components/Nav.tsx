import React, { useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx';
import { makeStyles, createStyles, fade } from '@material-ui/core/styles';
import { AppBar, Drawer, IconButton, Toolbar, CssBaseline, ListItem, Divider, List, FormControl, MenuItem, Select, InputLabel, Typography, Button} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MenuIcon from '@material-ui/icons/Menu'
import DocIcon from '@material-ui/icons/Description'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import useTheme from '@material-ui/core/styles/useTheme';
import { signIn, signOut, useSession } from 'next-auth/client'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      flexShrink: 0,
    },
    drawerPaper: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerIcons: {
        color: theme.palette.primary.contrastText,
    },
    grow: {
      flexGrow: 1,
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
          display: 'flex',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      searchButton: {
          
      },
      form: {
          color: theme.palette.primary.contrastText,
          width: '100%'
      },
      inputRoot: {
        color: theme.palette.primary.contrastText,
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`
      },
      inputLabel: {
          color: theme.palette.primary.contrastText,
          "&:hover": {
            color: theme.palette.primary.contrastText
        }
      },
      inputSelect: {
        color: theme.palette.primary.contrastText,
      },
      title: {
        flexGrow: 1,
      },
  }),
);

const Nav = () => {
    const router = useRouter();
    const classes = useStyles();
    const theme = useTheme();
    const [user, setUser] = useState("");
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="static"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              The Den
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader} color='inherit'>
            <IconButton onClick={handleDrawerClose} className={classes.drawerIcons}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>
            <Divider />
            <List>
            <ListItem>
              <div className={classes.search}>
                  <div className={classes.searchIcon}>
                      <SearchIcon />
                  </div>
                  <div color="primary" className={classes.inputRoot}>
                      <FormControl className={classes.form}>
                          <InputLabel className={classes.inputLabel} id="demo-simple-select-label">Twitch Channel</InputLabel>
                          <Select
                              className={classes.inputSelect}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={user}
                              onChange={(e) => {setUser(e.target.value)}}
                          >
                          <MenuItem onClick={() => {router.push(`/logs/EsfandTV`)}} color="primary" value={"EsfandTV"}>EsfandTV</MenuItem>
                          <MenuItem onClick={() => {router.push(`/logs/Asmongold`)}} color="primary" value={"Asmongold"}>Asmongold</MenuItem>
                          <MenuItem onClick={() => {router.push(`/logs/Mizkif`)}} color="primary" value={"Mizkif"}>Mizkif</MenuItem>
                          </Select>
                      </FormControl>
                  </div>
              </div>
            </ListItem>
            <Divider />
            {['Home', 'Clips', 'Documentation'].map((text, index) => (
                <ListItem button key={text} onClick={() => {
                    if (text == 'Home') {
                        router.push(`/`)
                    } else {
                        router.push(`/${text.toLowerCase()}`)
                    }}}>
                <ListItemIcon className={classes.drawerIcons}>{text == 'Home' ? <HomeIcon /> : text == 'Clips' ? <MovieIcon /> : text == 'Documentation' ? <DocIcon/> : null}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            <Divider/>
            </List>
        </Drawer>
      </div>
    )
}

export default Nav


