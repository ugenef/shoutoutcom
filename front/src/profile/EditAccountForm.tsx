import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {Button, Typography} from "@material-ui/core";
import AccountEditor from "./AccountEditor";
import Account from "./Account";
import {Redirect} from "react-router-dom";
import {User} from "../user/User";
import {CreateAccountRequest} from "../infra/back-api/model/CreateAccountRequest";
import {BackendClientFactory, IBackendClient} from "../infra/back-api/BackendClient";
import {UpdateAccountRequest} from "../infra/back-api/model/UpdateAccountRequest";
import {IProfileContext, ProfileContextFactory} from "./ProfileContext";


const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
    }
});

interface IProps {
    classes?: any;
    user: User;
}

interface IState {
    submitted: boolean;
}

class EditAccountForm extends React.Component<IProps, IState> {
    private readonly back: IBackendClient = BackendClientFactory.get();
    private readonly profileContext: IProfileContext = ProfileContextFactory.get();

    constructor(props: IProps) {
        super(props);
        this.state = {submitted: false}
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(accountName: string, description: string, extAccountId: string) {
        const request = new UpdateAccountRequest(extAccountId, description);
        this.back.updateAccount(request, this.props.user.jwt)
            .then(res => this.setState({submitted: true}))
            .catch(err => console.error(err));
    }

    render() {
        const {classes} = this.props;
        const storedAccount = this.profileContext.getAccountToEdit();
        if(!storedAccount){
            console.error("No account to edit stored")
        }
        const account = storedAccount as Account;

        return (
            <React.Fragment>
                {this.state.submitted ? <Redirect to={"/profile"}/> :
                    <Grid container className={classes.mainGrid}>
                        <Grid item>
                            <AccountEditor
                                titleText="Edit your account"
                                buttonText="Save changes"
                                predefinedAccount={account?.name}
                                predefinedDescription={account?.description}
                                onSuccessfulInput={(name, desc) => this.submitForm(name, desc, account.extAccountId)}
                            >
                            </AccountEditor>
                        </Grid>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(EditAccountForm);
