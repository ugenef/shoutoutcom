import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import {Link} from "@material-ui/core";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
});

interface IProps {
    classes?: any;
    backLink: string;
    postLink: string;
}

interface IState {
    postContents: string;
}

class BlogPost extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const {classes, backLink, postLink} = this.props;
        fetch(postLink)
            .then(res => res.text())
            .then(text => this.setState({postContents: text}));
    }
//    font-family: medium-content-serif-font,Georgia,Cambria,"Times New Roman",Times,serif;
    render() {
        const {classes, backLink, postLink} = this.props;
        return (
            <Grid item xs={12} md={8}>
                <Markdown className="markdown">
                    {this.state?.postContents ?? 'Loading'}
                </Markdown>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(BlogPost);
