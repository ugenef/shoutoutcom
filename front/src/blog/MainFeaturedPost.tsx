import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
});

interface IProps {
    classes?: any;
    link: string;
    post: {
        description: string;
        image: string;
        imageLabel: string;
        title: string;
    };
}

interface IState {
}

class MainFeaturedPost extends React.Component<IProps, IState> {
    render() {
        const {classes, link, post} = this.props;

        return (
            <Paper className={classes.mainFeaturedPost} style={{backgroundImage: `url(${post.image})`}}>
                {/* Increase the priority of the hero background image */}
                {<img style={{display: 'none'}} src={post.image} alt={post.imageLabel}/>}
                <Grid container>
                    <Grid item md={6}>
                        <Box
                            sx={{
                                position: 'relative',
                                p: {xs: 3, md: 6},
                                pr: {md: 0},
                            }}
                        >
                            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                {post.title}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {post.description}
                            </Typography>
                            <Link variant="subtitle1" href={link}>
                                Continue reading...
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default withStyles(useStyles)(MainFeaturedPost);