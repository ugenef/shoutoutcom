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
        flexFlow: 'row',
        justifyContent: 'space-between',
        minHeight:  theme.spacing(16)
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        maxWidth: 160,
        minWidth: 160,
        flex: 999
    },
});

interface IProps {
    classes?: any;
    step: {
        description: string;
        image: string;
        imageLabel: string;
        title: string;
        link?: string;
        linkCaption?: string;
    };
}

interface IState {
}

class Step extends React.Component<IProps, IState> {
    render() {
        const {classes, step} = this.props;

        return (
            <Grid item xs={12} md={6}>
                <CardActionArea component='a' href={step.link}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography component="h2" variant="h5">
                                {step.title}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {step.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                {step.linkCaption}
                            </Typography>
                        </CardContent>
                        <CardMedia className={classes.cardMedia} image={step.image} title={step.title}/>
                    </Card>
                </CardActionArea>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Step);