import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { crossingSort } from "util/general";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "redux/actions/userActions";

// Components

// template
import GridItem from "components-template/Grid/GridItem.js";
import GridContainer from 'components-template/Grid/GridContainer';

// serenity
import CrossingContainer from "components-serenity/Crossing/CrossingContainer";
import SortInput from "util/components/SortInput";

// @material-ui core
import {
    InputAdornment,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField"

// icons
import Search from "@material-ui/icons/Search";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
        partialVisibilityGutter: 40
    },
    desktop: {
        breakpoint: { max: 3000, min: 1600 },
        items: 3,
        partialVisibilityGutter: 40
    },
    tablet: {
        breakpoint: { max: 1600, min: 850 },
        items: 2,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 850, min: 0 },
        items: 1,
        partialVisibilityGutter: 30
    }
};

const CrossingsCarousel = () => {
    const dispatch = useDispatch();
    const { initCrossings, crossings, searchValue, credentials } = useSelector((state) => state.user);

    const handleSearch = (event) => {
        if (event.target.value !== searchValue) dispatch(setSearchValue(event.target.value, initCrossings));
    };

    return (
        <GridItem xs={12} sm={12} md={12}>
            <GridContainer
                alignItems="center"
                alignContent="center"
                justify="flex-start"
            >
                <GridItem xs={12} sm={12} md={4}>
                        <h2>My crossings</h2>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <TextField
                            id="book-search"
                            label="SEARCH"
                            fullWidth
                            onChange={handleSearch}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <Search />
                                </InputAdornment>,
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <SortInput crossing label="Filter by status" items={crossingSort} defaultValue={0} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                    {
                        crossings.length === 0 ? (
                            <h3 style={{textAlign: 'center'}}>No crossings found according to your filters...</h3>
                        ) : (
                            <Carousel 
                                additionalTransfrom={0}
                                arrows
                                autoPlay
                                autoPlaySpeed={3000}
                                centerMode={false}
                                className=""
                                containerClass="container"
                                dotListClass=""
                                draggable
                                partialVisible
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
                                {
                                    crossings
                                    .filter((crossing) => (crossing.sender === credentials.username && crossing.senderData.show) || (crossing.recipient === credentials.username && crossing.recipientData.show))
                                    .map((crossing, index) => {
                                        let color = "success";
                                        if (crossing.status === "pending") color="warning";
                                        if (crossing.status === "done") color="info";
                                        if (crossing.canceled) color="danger"
                                        return (
                                            crossing.senderData.show ?  <CrossingContainer crossing={crossing} key={index} color={color}/> : null
                                        )
                                    })
                                }
                            </Carousel>
                        )
                    }
                    </GridItem>
            </GridContainer>
        </GridItem>
    )
}

export default CrossingsCarousel;