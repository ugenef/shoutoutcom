import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";


const sidebar = {
    title: 'About',
    description:
        'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
    archives: [
        {title: 'March 2020', url: '#'},
        {title: 'February 2020', url: '#'},
        {title: 'January 2020', url: '#'},
        {title: 'November 1999', url: '#'},
        {title: 'October 1999', url: '#'},
        {title: 'September 1999', url: '#'},
        {title: 'August 1999', url: '#'},
        {title: 'July 1999', url: '#'},
        {title: 'June 1999', url: '#'},
        {title: 'May 1999', url: '#'},
        {title: 'April 1999', url: '#'},
    ],
    social: [
        {name: 'GitHub', icon: GitHubIcon},
        {name: 'Twitter', icon: TwitterIcon},
        {name: 'Facebook', icon: FacebookIcon},
    ],
};

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
});

interface IProps {
    classes?: any;
    archives: ReadonlyArray<{
        url: string;
        title: string;
    }>;
    description: string;
    social: ReadonlyArray<{
        icon: React.ElementType;
        name: string;
    }>;
    title: string;
}

interface IState {
}

class Sidebar extends React.Component<IProps, IState> {
    render() {
        const {classes, archives, description, social, title} = this.props;

        return (
            <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.sidebarAboutBox}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography>{description}</Typography>
                </Paper>
                <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                    Archives
                </Typography>
                {archives.map((archive) => (
                    <Link display="block" variant="body1" href={archive.url} key={archive.title}>
                        {archive.title}
                    </Link>
                ))}
                <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                    Social
                </Typography>
                {social.map((network) => (
                    <Link display="block" variant="body1" href="#">
                        <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid item>
                                <network.icon/>
                            </Grid>
                            <Grid item>{network.name}</Grid>
                        </Grid>
                    </Link>
                ))}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Sidebar);