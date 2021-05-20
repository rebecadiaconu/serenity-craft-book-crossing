import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Redux
import { useSelector } from "react-redux";

// Components
import BookContainer from "components serenity/Book/BookContainer";
import GridItem from "components/Grid/GridItem.js";

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
        breakpoint: { max: 1600, min: 464 },
        items: 2,
        partialVisibilityGutter: 30
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 30
    }
};

const BooksCarousel = () => {
    const { books } = useSelector((state) => state.user);

    return (
        <GridItem xs={12} sm={12} md={12}>
            <h2>My books</h2>
            <Carousel 
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={3000}
                centerMode={false}
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                partialVisible
                focusOnSelect={false}
                infinite={false}
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                showDots={false}
                sliderClass=""
                slidesToSlide={2}
                swipeable
            >
                {
                    books.map((book, index) => {
                        return (
                            <BookContainer key={index} book={book} carousel/>
                        )
                    })
                }
            </Carousel>
        </GridItem>
    )
}

export default BooksCarousel;