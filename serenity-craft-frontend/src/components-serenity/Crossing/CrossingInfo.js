import React from 'react';
import Carousel from 'react-multi-carousel';
import { NavLink } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';

// Redux
import { useSelector, useDispatch } from "react-redux";
import { Actions } from 'redux/types';

// Components 

// template
import Button from "components-template/CustomButtons/Button.js";
import Card from "components-template/Card/Card";
import CardText from 'components-template/Card/CardText';
import CardHeader from 'components-template/Card/CardBody';
import CardAvatar from 'components-template/Card/CardAvatar';
import CardFooter from 'components-template/Card/CardFooter';
import GridItem from "components-template/Grid/GridItem.js";
import GridContainer from 'components-template/Grid/GridContainer';

// @material-ui core
import { makeStyles, Typography, Tooltip } from "@material-ui/core";

// icons
import EditIcon from '@material-ui/icons/Edit';

// Styles
import styles from "assets/jss/serenity-craft/components/crossingContainer";
const useStyles = makeStyles(styles);

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 2,
        // partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1650 },
        items: 2,
        // partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1650, min: 850 },
        items: 1,
        // partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 850, min: 0 },
        items: 1,
        // partialVisibilityGutter: 30
    }
};

const CrossingInfo = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { credentials } = useSelector((state) => state.user);
    const { crossing } = useSelector((state) => state.crossing);

    return (
        <GridItem xs={12} sm={12} md={7} style={{position: 'relative'}} >
        {
            crossing && (
                <>
                {
                    (credentials.username === crossing.recipient) && (
                        !crossing.senderProgress.sendBook ? (
                        <Tooltip title="Choose to receive other book!" classes={{ tooltip: classes.tooltip }}>
                            <Button disabled={crossing.canceled} size="sm" round justIcon color="rose" className={classes.changeBookBtn} onClick={() => dispatch({ type: Actions.CROSSING.CHANGE_BOOK })} ><EditIcon /></Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="The other user already send his book!" classes={{ tooltip: classes.tooltip }}>
                            <Button disabled={crossing.canceled} size="sm" round disabled justIcon color="rose" className={classes.changeBookBtn}><EditIcon /></Button>
                        </Tooltip>
                    ))
                }
                <Carousel 
                    additionalTransfrom={0}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite={true}
                    itemClass=""
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsive}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    <Card>
                        <GridContainer
                            display="flex"
                            justify="center"
                            alignContent="center"
                        >
                            <GridItem xs={6} sm={6} md={6}>
                                <CardHeader>
                                    <NavLink to={crossing.randomBookId === "deletedBook" ? `/auth/not-found` : `/admin/books/${crossing.randomBookId}`} className={classes.link}>
                                        <CardText color="warning" >
                                            <h5>{crossing.sender === credentials.username ? "What you give" : "What you get"}</h5>
                                            <p>{crossing.randomBook.title}, by {crossing.randomBook.author}</p>
                                        </CardText>
                                    </NavLink>
                                </CardHeader>
                                <NavLink to={crossing.sender === "deletedUser" ? `/auth/not-found` : (crossing.sender === credentials.username ? `/admin/user` : `/admin/users/${crossing.sender}`)} className={classes.link}>
                                    <CardAvatar profile className={classes.avatar}>
                                        <img src={crossing.senderData.userImage} />
                                    </CardAvatar>
                                </NavLink>
                                <CardFooter>
                                    <Typography className={classes.info} variant="body2" >{crossing.sender === credentials.username ? "You" : crossing.sender}</Typography>
                                </CardFooter>
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6}>
                                <NavLink to={crossing.randomBookId === "deletedBook" ? `/auth/not-found` : `/admin/books/${crossing.randomBookId}`} className={classes.link}>
                                    <CardAvatar className={classes.cover} >
                                        <img src={crossing.randomBook.coverImage} style={crossing.randomBookId === "deletedBook" ? {boxShadow: '1px 1px 10px 1px #ffcccb'} : null}/>
                                    </CardAvatar>
                                </NavLink>
                            </GridItem>
                        </GridContainer>
                    </Card>
                    <Card>
                        <GridContainer
                            display="flex"
                            justify="center"
                            alignContent="center"
                        >
                            <GridItem xs={6} sm={6} md={6}>
                                <CardHeader>
                                        <NavLink to={crossing.reqBookId === "deletedBook" ? `/auth/not-found` : `/admin/books/${crossing.reqBookId}`} className={classes.link}>
                                            <CardText color="warning" >
                                                <h5>{crossing.recipient === credentials.username ? "What you give" : "What you give"}</h5>
                                                <p>{crossing.reqBook.title}, by {crossing.reqBook.author}</p> 
                                            </CardText>
                                        </NavLink>
                                </CardHeader>
                                <NavLink to={crossing.recipient === "deletedUser" ? `/auth/not-found` : (crossing.recipient === credentials.username ? `/admin/user` : `/admin/users/${crossing.recipient}`)} className={classes.link}>
                                    <CardAvatar profile className={classes.avatar}>
                                        <img src={crossing.recipientData.userImage} />
                                    </CardAvatar>
                                </NavLink>
                                <CardFooter>
                                    <Typography className={classes.info} variant="body2" >{crossing.recipient === credentials.username ? "You" : crossing.recipient}</Typography>
                                </CardFooter>
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6}>
                                    <NavLink to={crossing.reqBookId === "deletedBook" ? `/auth/not-found` : `/admin/books/${crossing.reqBookId}`} className={classes.link}>
                                        <CardAvatar className={classes.cover}>
                                            <img src={crossing.reqBook.coverImage} style={ crossing.reqBookId === "deletedBook" ? {boxShadow: '1px 1px 10px 1px #ffcccb'} : null} />
                                        </CardAvatar>
                                    </NavLink>
                            </GridItem>
                        </GridContainer>
                    </Card>
                </Carousel>
                </>
            )
        }
        </GridItem>
    )
}

export default CrossingInfo;