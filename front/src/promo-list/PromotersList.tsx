import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {List, ListItem, Typography, ListItemIcon, ListItemText} from "@material-ui/core";
import InstagramIcon from '@material-ui/icons/Instagram';
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";
import {BackendClientFactory, IBackendClient} from "../infra/back-api/BackendClient";
import {IProfileContext, ProfileContextFactory} from "../profile/ProfileContext";
import Account from "../profile/Account";


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
    accounts: Account[];
}

class PromotersList extends React.Component<IProps, IState> {
    private readonly back: IBackendClient = BackendClientFactory.get();

    constructor(props: IProps) {
        super(props);
        this.state = {accounts: []};
        this.back.getAccounts(0, 128)
            .then(accs => {
                const models = accs.map(a => new Account(a.name, a.link, a.description, a.extAccountId));
                this.setState({accounts: models});
            })
            .catch(reason => console.error(reason));
        this.saveClick = this.saveClick.bind(this);
    }

    private saveClick(extAccId: string){
        this.back.incClicks(extAccId)
            .catch(err => console.log(err))
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
                                this.state.accounts.map((p) =>
                                    <ListItem
                                        component='a'
                                        key={p.name}
                                        button
                                        href={p.link}
                                        onClick={()=>this.saveClick(p.extAccountId)}>
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
