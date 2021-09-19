import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {List, ListItem, Typography, ListItemIcon, ListItemText} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";


const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
    description:{
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    addButton: {
        marginLeft: theme.spacing(2)
    },
});

interface IProps {
    classes?: any;
}

interface IState {
}

const promoters = [
    {name: '@super-promo', link: 'https://instagram.com', description: 'Im a super ultra big promoter'},
    {name: '@ultra_promo', link: '#', description: 'Best promo on wild west'},
    {name: '@megapromo', link: '#', description: 'The one who write very very long self description'},
    {name: '@fashion-promo2000', link: '#', description: 'I will promote your fashion man'},
    {name: '@another.promo', link: '#', description: 'I will promote your fashion man'},
]

class PromotersList extends React.Component<IProps, IState> {
    generate(promoters: any[], element: any) {
        return promoters.map((value) =>
            React.cloneElement(element, {
                key: value.name,
            }),
        );
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Grid>
                    <div className={classes.description}>
                        <Typography component="h2" variant="h5">
                            List of Instagram promoters
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            Tap to one and negotiate about your next shout-out!
                        </Typography>
                    </div>

                    <Grid item xs={12} md={6}>
                        <Button component="a" href='/profile/accounts/add' className={classes.addButton}
                                variant="outlined"
                                startIcon={<AddCircleOutlineIcon/>}
                        >
                            Add account
                        </Button>
                        <List dense={false}>
                            {
                                promoters.map((p) =>
                                    <ListItem component='a' key={p.name} button href={p.link}>
                                        <ListItemIcon>
                                            <InstagramIcon fontSize='large'/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={p.name}
                                            secondary={p.description}
                                        />
                                    </ListItem>)
                            }
                        </List>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(PromotersList);
