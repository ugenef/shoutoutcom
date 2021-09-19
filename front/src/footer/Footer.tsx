import * as React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

interface IProps {
    description: string;
    title: string;
}

interface IState {
}


class Footer extends React.Component<IProps, IState> {
    render() {
        const {description, title} = this.props;
        return (
            <Box component="footer" sx={{py: 6}}>
                <Container maxWidth="lg">
                    <Typography variant="h6" align="center" gutterBottom>
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                    <Copyright/>
                </Container>
            </Box>
        );

    }
}

export default Footer;