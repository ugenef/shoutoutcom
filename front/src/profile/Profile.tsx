import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import MyAccountsList from "./MyAccountsList";
import AddAccountForm from "./AddAccountForm";
import EditAccountForm from "./EditAccountForm";
import Account from "./Account";
import {Route} from "react-router-dom";
import {IUserContext, UserContextFactory} from "../user/UserContext";
import {User} from "../user/User";
import LoginPlease from "../auth/LoginPlease";

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
}

interface IState {
    pageState: PageState;
    accountToEdit?: Account;
    user?: User;
}

enum PageState{
    AccountsList = 1,
    AddAccountForm = 2,
    EditAccountForm = 3,
}

class Profile extends React.Component<IProps, IState> {
    private readonly userContext: IUserContext = UserContextFactory.get();

    constructor(props: IProps) {
        super(props);
        this.state = {pageState: PageState.AccountsList};
        this.userContext?.onUserChanged(u => this.setState({user: u}));
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {this.state.user ?
                <div>
                    <Route exact path="/profile">
                        <MyAccountsList/>
                    </Route>
                    <Route exact path="/profile/accounts/add">
                        <AddAccountForm />;
                    </Route>
                    <Route exact path="/profile/accounts/edit">
                        <EditAccountForm />;
                    </Route>
                </div> :
                <LoginPlease/>}
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Profile);
