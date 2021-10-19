import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {Button, Typography} from "@material-ui/core";
import AccountEditor from "./AccountEditor";
import Account from "./Account";
import {Redirect} from "react-router-dom";
import {User} from "../user/User";


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

class AddAccountForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {submitted: false}
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(accountName: string, description: string) {
        console.log(accountName);
        console.log(description);
        this.setState({submitted: true});
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                {this.state.submitted ? <Redirect to={"/profile"}/> :
                    <Grid container className={classes.mainGrid}>
                        <Grid item>
                            <AccountEditor
                                titleText="Add your promotion account"
                                buttonText="Add account"
                                onSuccessfulInput={this.submitForm}
                            >
                            </AccountEditor>
                        </Grid>
                    </Grid>
                }
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(AddAccountForm);
