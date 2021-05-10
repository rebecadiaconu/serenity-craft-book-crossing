import React from 'react';

import Navbar from '../components/Navbar';
import BooksContainer from '../components/BooksContainer';

import Container from '@material-ui/core/Container';


const Home = () => {
    return (
        <Container>
            <Navbar />
            <BooksContainer />
        </Container>
    );
}

export default Home;
