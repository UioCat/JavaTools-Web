import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { HomeApp } from '../Layouts/Home';
import { AboutApp } from '../Layouts/About';
import { DocApp } from '../Layouts/Doc';
import { SideBar } from "./SideBar";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="App" {...a11yProps(0)} />
                    <Tab label="Home" {...a11yProps(1)} />
                    <Tab label="Document" {...a11yProps(2)} />
                    <Tab label="About" {...a11yProps(3)} />
                </Tabs>
            </AppBar>

            {/* Add Tab */}
            <TabPanel value={value} index={0}>
                <HomeApp />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <SideBar />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DocApp />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <AboutApp />
            </TabPanel>
        </div>
    );
}

export { NavBar }