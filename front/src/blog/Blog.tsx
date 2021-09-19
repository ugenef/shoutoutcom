import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Styles} from "@material-ui/core/styles/withStyles";
import BlogPost from "./BlogPost";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

const posts = [
    {
        route: "post1",
        contentLink: post1,
        order: 1,
        title: 'Featured post',
        date: 'Nov 12',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        route: "post2",
        contentLink: post2,
        order: 2,
        title: 'Post title',
        date: 'Nov 11',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        route: "post3",
        contentLink: post3,
        order: 3,
        title: 'Post title',
        date: 'Nov 10',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    }
];



const useStyles: Styles<Theme, {}, string> = (theme: Theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
});

interface IProps {
    classes?: any;
}

interface IState {
}

class Blog extends React.Component<IProps, IState> {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Grid container justifyContent='center'>
                    {posts.map(p => (
                        <Route exact path={`/blog/${p.route}`}>
                            <BlogPost backLink={'/blog'} postLink={p.contentLink}/>
                        </Route>
                    ))}
                </Grid>
                <Route exact path="/blog">
                    <MainFeaturedPost link={`/blog/${posts[0].route}`} post={posts[0]}/>
                    <Grid container justifyContent='center' spacing={4} className={classes.mainGrid}>
                        {posts.sort(p => p.order).map((p) => (
                            <FeaturedPost key={p.title} link={`/blog/${p.route}`} post={p}/>
                        ))}
                    </Grid>
                </Route>
            </React.Fragment>
        );
    }
}

export default withStyles(useStyles)(Blog);
