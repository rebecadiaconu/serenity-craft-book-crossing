import React from 'react';

// Components
import Card from "components/Card/Card";
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardBody';
import CardAvatar from 'components/Card/CardAvatar';
import CardFooter from 'components/Card/CardFooter';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

// Styles
import styles from "assets/jss/serenity-craft/components/bookCard";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(styles);

const BookCard = ({ book }) => {
    const classes = useStyles();

    const handleClick = () => {

    };
    
    return (
        <Card className={classes.root} onClick={handleClick}>
            <GridContainer
                display="flex"
                justify="center"
                alignContent="center"    
            >
                <GridItem xs={5} sm={5} md={5}>
                    <CardHeader>
                        <h5>{book.title}</h5>
                        <p>{book.author}</p>
                    </CardHeader>
                    <CardBody>

                    </CardBody>
                    <CardFooter>

                    </CardFooter>
                </GridItem>
                <GridItem xs={7} sm={7} md={7}>
                    <CardAvatar className={classes.cover}>
                        <img src={book.coverImage} />
                    </CardAvatar>
                </GridItem>
            </GridContainer>
        </Card>
    )
}

export default BookCard;
