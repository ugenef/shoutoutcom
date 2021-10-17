import * as React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GitHubIcon from '@material-ui/icons/GitHub';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Link as RouterLink} from 'react-router-dom';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {IUserContext, UserContextFactory} from "../user/UserContext";
import {User} from "../user/User";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {HeaderConfig, IHeaderConfig} from "./HeaderConfig";
import {BackendClientFactory, IBackendClient} from "../infra/back-api/BackendClient";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    toolbar: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(1),
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row',
            alignItems: 'baseline',
            paddingLeft: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column',
            alignItems: 'center'
        },
    },
    navigation: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(1),
        flexFlow: 'row',
        [theme.breakpoints.down('sm')]: {
            marginLeft: theme.spacing(-6),
        },
    },
    toolbarTitle: {
        [theme.breakpoints.up('sm')]: {
            align: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            align: 'center'
        },
        flex: 1,
        fontSize: 30,
        fontFamily: 'lobster',
        fontWeight: 'bold'
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        fontSize: 20,
        color:"inherit",
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(5),
        },
    },
    signUpButton: {
        [theme.breakpoints.up('sm')]: {
            align: 'left',
            marginTop: theme.spacing(-1),
            marginLeft: theme.spacing(1),
            alignSelf: 'center',
        },
    },
    divider: {
        [theme.breakpoints.up('sm')]: {
            hidden: true
        },
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(2)
    },
});

interface IProps {
    classes?: any;
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}

interface IState {
}

class Header extends React.Component<IProps, IState> {
    private readonly config: IHeaderConfig = new HeaderConfig();
    private readonly back: IBackendClient = BackendClientFactory.get();
    private readonly userContext: IUserContext = UserContextFactory.get();

    constructor(props: IProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleFailure = this.handleFailure.bind(this);
    }

    handleLogin(response: (GoogleLoginResponse | GoogleLoginResponseOffline)){
        if('tokenId' in response){
            this.generateJwt(response);
        }
        console.log(response);
    }

    generateJwt(response: GoogleLoginResponse){
        this.back.get_jwt(response.tokenId)
            .then(jwt => {
                this.back.setJwt(jwt);
                this.userContext.setUser(new User(jwt));
            })
            .catch(err => console.error(err));
    }

    handleFailure(err: any){
        console.log(this.config.client_id);
        console.log(err);
    }

    render() {
        const {classes, sections, title} = this.props;
        return (
            <React.Fragment>
                <Grid container className={classes.toolbar}>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        noWrap
                        className={classes.toolbarTitle}
                    >
                        {title}
                    </Typography>
                    <Grid item className={classes.navigation}>
                        {sections.map((section) => (
                            <Link
                                component={RouterLink}
                                to={section.url}
                                noWrap
                                key={section.title}
                                variant="body2"
                                className={classes.toolbarLink}
                            >
                                {section.title}
                            </Link>
                        ))}
                    </Grid>
                    <GoogleLogin
                        clientId={this.config.client_id}
                        buttonText="Log in with Google"
                        onSuccess={this.handleLogin}
                        onFailure={this.handleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </Grid>
                {/*<Divider className={classes.divider}/>*/}
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Header);
