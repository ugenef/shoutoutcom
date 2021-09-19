import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import Step from "./Step";
import {Typography} from "@material-ui/core";

const steps = [
    {
        order: 1,
        title: 'Step 1',
        description:
            'Go to our page with promoters and pick one',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
        link: '/promoters',
        linkCaption: 'Tap to jump to list',
    },
    {
        order: 2,
        title: 'Step 2',
        description:
            'Negotiate about your next shout-out',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        order: 3,
        title: 'Profit!',
        description:
            'Enjoy thousads of new subscribers on your account!',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    }
];


const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
        flexFlow: 'column',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    step: {
      minHeight:  theme.spacing(12)
    },
    description:{
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
});

interface IProps {
    classes?: any;
}

interface IState {
}

class About extends React.Component<IProps, IState> {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.description}>
                    <Typography component="h2" variant="h5">
                        Want new Instagram subscribers?
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        Great! This site was made especially for this purpose. Here is how it works:
                    </Typography>
                </div>
                <Grid item container justifyContent='center' spacing={2} className={classes.mainGrid}>
                    {steps.sort(p => p.order).map((p) => (
                        <Step key={p.title} step={p}/>
                    ))}
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(About);
