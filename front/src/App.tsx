import React from 'react';
import logo from './logo.svg';
import './App.css';
import Blog from "./blog/Blog";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import PromotersList from "./promo-list/PromotersList";
import BlogPost from "./blog/BlogPost";
import post1 from "./blog/blog-post.1.md";
import {Divider} from "@material-ui/core";
import About from "./about/About";
import AddAccountForm from "./profile/AddAccountForm";
import EditAccountForm from "./profile/EditAccountForm";
import MyAccountsList from "./profile/MyAccountsList";
import Profile from "./profile/Profile";

const sections = [
    { title: 'Get shout-out!', url: '/promoters' },
    { title: 'Blog', url: '/blog' },
    { title: 'About', url: '/about' },
];

function App() {
    return (
        <Router>
                <React.Fragment>
                    <CssBaseline/>
                    <Container maxWidth="lg">
                        <Header title='SHOUTOUT.COM' sections={sections}/>
                        <main>
                            <Switch>
                                <Route path="/promoters">
                                    <PromotersList/>
                                </Route>
                                <Route path="/blog">
                                    <Blog/>
                                </Route>
                                <Route path="/about">
                                    <About/>
                                </Route>
                                <Route path="/profile">
                                    <Profile/>
                                </Route>

                                <Route path="/">
                                    <About/>
                                </Route>
                            </Switch>
                        </main>
                    </Container>
                    <Footer
                        title="Footer"
                        description="Something here to give the footer a purpose!"
                    />
                </React.Fragment>
        </Router>
    );
}

export default App;
