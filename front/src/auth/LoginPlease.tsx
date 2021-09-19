import * as React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {IUserContext, UserContextFactory} from "../user/UserContext";
import {User} from "../user/User";
import Button from "@material-ui/core/Button";
import GitHubIcon from "@material-ui/icons/GitHub";
import {Typography} from "@material-ui/core";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    typo:{
        marginBottom: theme.spacing(2)
    },
    button:{
        maxWidth: theme.spacing(35)
    }
});

interface IProps {
    classes?: any;
}

interface IState {

}

class LoginPlease extends React.Component<IProps, IState> {
    private readonly userContext: IUserContext = UserContextFactory.get();

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.mainDiv}>
                    <Typography className={classes.typo} component="h2" variant="h5">
                        Sign in to add your account to Shoutout.com for free
                    </Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<GitHubIcon/>}
                        className={classes.button}
                        onClick={() => this.userContext?.setUser(new User())}>
                        Sign up with Google
                    </Button>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(LoginPlease);
