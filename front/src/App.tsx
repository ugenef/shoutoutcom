import React from 'react';
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
import About from "./about/About";
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
