import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

interface IProps {
    classes?: any;
    link: string;
    post: {
        date: string;
        description: string;
        image: string;
        imageLabel: string;
        title: string;
    };
}

interface IState {
}

class FeaturedPost extends React.Component<IProps, IState> {
    render() {
        const {classes, link, post} = this.props;

        return (
            <Grid item xs={12} md={6}>
                <CardActionArea component="a" href={link}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                        <CardMedia className={classes.cardMedia} image={post.image} title={post.title}/>
                    </Card>
                </CardActionArea>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(FeaturedPost);