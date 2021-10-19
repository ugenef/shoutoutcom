import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {List, ListItem, Typography, ListItemIcon, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Account from "./Account";
import {User} from "../user/User";
import {BackendClientFactory, IBackendClient} from "../infra/back-api/BackendClient";

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
    addButton: {
        marginLeft: theme.spacing(2)
    },
    description: {
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
    rowGrid: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    editButton: {
        marginRight: theme.spacing(1),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});

interface IProps {
    classes?: any;
    user: User;
}

interface IState {
    accounts: Account[];
}

class MyAccountsList extends React.Component<IProps, IState> {
    private readonly back: IBackendClient = BackendClientFactory.get();

    constructor(props: IProps) {
        super(props);
        this.state = {accounts: []};
        this.back.getMyAccounts()
            .then(accs => {
                const models = accs.map(a => new Account(a.name, a.link, a.description));
                this.setState({accounts: models});
            })
            .catch(reason => console.error(reason));
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.description}>
                    <Typography component="h2" variant="h5">
                        List of your accounts
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                        Tap to one and negotiate about your next shout-out!
                    </Typography>
                </div>
                <Button component="a" href='/profile/accounts/add' className={classes.addButton}
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon/>}
                >
                    Add account
                </Button>
                {
                    this.state.accounts.map((p) => (
                        <div className={classes.rowGrid}>
                            <ListItem key={p.name}>
                                <ListItemText
                                    primary={p.name}
                                    secondary={p.description}
                                />
                            </ListItem>
                            <div className={classes.buttons}>
                                <Button component="a" href='/profile/accounts/edit' className={classes.editButton}
                                        variant="outlined"
                                >
                                    Edit
                                </Button>
                                <Button variant="outlined" color="secondary">
                                    Delete
                                </Button>
                            </div>
                        </div>))
                }
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(MyAccountsList);
