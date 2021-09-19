import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";

const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
});

interface IProps {
    classes?: any;
    posts: ReadonlyArray<string>;
    title: string;
}

interface IState {
    postContents: string;
}

class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            postContents: "Loading..."
        };
        const {classes, posts, title} = this.props;
        posts.forEach(p => fetch(p).then(res => res.text()).then(text => this.setState({postContents: text})));
    }

    render() {
        const {classes, posts, title} = this.props;
        return (
            <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Divider/>
                {posts.map((post) => (
                    <Markdown className="markdown" key={this.state.postContents.substring(0, 40)}>
                        {this.state.postContents}
                    </Markdown>
                ))}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Main);
