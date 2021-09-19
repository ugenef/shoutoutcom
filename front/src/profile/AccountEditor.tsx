import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import {Button, Typography} from "@material-ui/core";
import {Redirect} from "react-router-dom";


const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainGrid: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    accountInput: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(70),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(40),
        },
    },
    descriptionInput: {
        marginBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(70),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(40),
        },
    },
    descriptionAdvice: {
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(70),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(40),
        },
    },
    addButton: {
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(70),
        },
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(40),
        },
    }
});

interface IProps {
    classes?: any;
    predefinedAccount?: string;
    predefinedDescription?: string;
    titleText: string;
    buttonText: string;
    onSuccessfulInput: (account: string, description: string) => void;
}

interface IState {
    account?: string;
    description?: string;
    accountInputError: boolean;
    descriptionInputError: boolean;
    editorState: EditorState;
}

enum EditorState {
    WaitingForInput = 1,
    Loading = 2,
}

class AccountEditor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            editorState: EditorState.WaitingForInput,
            accountInputError: false,
            descriptionInputError: false,
            account: props.predefinedAccount,
            description: props.predefinedDescription};
        this.buttonClick = this.buttonClick.bind(this);
        this.handleAccountInputEnd = this.handleAccountInputEnd.bind(this);
        this.handleDescriptionInputEnd = this.handleDescriptionInputEnd.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    //TODO enforce validation: probably just check username with insta API
    handleAccountInputEnd() {
        if (this.state.account) {
            const trimmedValue = this.state.account.trim();
            const valueWithAt = trimmedValue.startsWith('@') ?
                trimmedValue : '@' + trimmedValue;
            this.setState({account: valueWithAt, accountInputError: false});
        } else {
            this.setState({accountInputError: true});
        }
    }

    handleDescriptionInputEnd() {
        if (this.state.description) {
            this.setState({descriptionInputError: false});
        } else {
            this.setState({descriptionInputError: true});
        }
    }

    handleDescriptionChange(newValue: string) {
        this.setState({description: newValue});
    }

    handleAccountChange(newValue: string) {
        this.setState({account: newValue});
    }

    buttonClick() {
        let canFinishInput = true;
        if (!this.state.account) {
            canFinishInput = false;
            this.setState({accountInputError: true});
        }

        if (!this.state.description) {
            canFinishInput = false;
            this.setState({descriptionInputError: true});
        }

        if (!canFinishInput) {
            return;
        }

        this.setState({editorState: EditorState.Loading});
        this.props.onSuccessfulInput(this.state.account as string, this.state.description as string);
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Grid container className={classes.mainGrid}>
                    <Typography component="h2" variant="h5" className={classes.title}>
                        {this.props.titleText}
                    </Typography>
                    <TextField className={classes.accountInput}
                               id="outlined-search"
                               label={this.state.accountInputError ? "Fill me plz =)" : "Account name"}
                               type="search"
                               variant="outlined"
                               placeholder='@my_sweet_insta'
                               value={this.state.account ?? ''}
                               disabled={this.props.predefinedAccount != null}
                               inputProps={{maxLength: 31}}
                               error={this.state.accountInputError}
                               onFocus={() => this.setState({accountInputError: false})}
                               onChange={e => this.handleAccountChange(e.target.value)}
                               onBlur={this.handleAccountInputEnd}
                    />
                    <Typography variant="subtitle1" paragraph className={classes.descriptionAdvice}>
                        Provide here some detailed description
                        about who you are (140 char max). Tweeter format
                    </Typography>
                    <TextField className={classes.descriptionInput}
                               id="outlined-textarea"
                               label={this.state.descriptionInputError ?
                                   "Type something plz =)" : "Description"}
                               rows={3}
                               multiline
                               variant="outlined"
                               error={this.state.descriptionInputError}
                               onBlur={this.handleDescriptionInputEnd}
                               value={this.state.description ?? ''}
                               onChange={e => this.handleDescriptionChange(e.target.value)}
                               onFocus={() => this.setState({descriptionInputError: false})}
                               inputProps={{maxLength: 140}}
                    />
                    <Button
                        variant="outlined"
                        className={classes.addButton}
                        disabled={this.state.editorState === EditorState.Loading}
                        onClick={this.buttonClick}>
                        {this.state.editorState === EditorState.Loading ? "Saving changes..." : this.props.buttonText}
                    </Button>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(AccountEditor);
