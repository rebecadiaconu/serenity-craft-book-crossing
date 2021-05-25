// import {
//     filterByLanguage,
//     filterByAuthor,
//     filterByPublisher,
//     filterByGenres,
//     filterByRating
// } from "../redux/actions/booksActions";

const defaultUserImage = "https://firebasestorage.googleapis.com/v0/b/serenity-craft-liceapp.appspot.com/o/no-image.jpg?alt=media";
const defaultBookImage = "https://firebasestorage.googleapis.com/v0/b/serenity-craft-liceapp.appspot.com/o/nobook-image2.png?alt=media";

const booksSort = [
    'Just added in',    // Desc
    'Last added in',    // Asc
    'Title A-Z',    // Asc
    'Title Z-A',    // Desc 
    'Rating Low to High',   // Asc  
    'Rating High to Low',    // Desc
    'Number of reviews Low to High',    // Asc
    'Number of reviews High to Low'     // Desc
];


const allGenres = [
    'Adventure',
    'Art',
    'Biographies and memoirs',
    'Children',
    'Comics and graphic novels',
    'Contemporary',
    'Cooking',
    'Development',
    'Dystopian',
    'Families and relationships',
    'Fantasy',
    'Fiction and literature',
    'Guide / How-to',
    'Health, sports and outdoors',
    'Historical fiction',
    'History',
    'Horror',
    'Humor',
    'Motivational',
    'Mystery',
    'Paranormal',
    'Romance',
    'Science-fiction',
    'Self-help / Personal',
    'Travel',
    'Thriller'
];


const getFilterData = (books) => {
    let publishers = new Set();
    let languages = new Set();
    let authors = new Set();

    books.map((book) => {
        authors.add(book.author.trim());
        languages.add((book.language.charAt(0).toUpperCase() + book.language.slice(1)).trim());
        publishers.add(book.publisher.trim());
    });

    const filterData = {
        authors: {
            onlyOne: false,
            label: 'Author',
            data: [...authors],
            type: "author"
            // filterFunction: filterByAuthor
        },
        publishers: {
            onlyOne: false,
            label: 'Publisher',
            data: [...publishers],
            type: "publisher"
            // filterFunction: filterByPublisher
        },
        languages: {
            onlyOne: false,
            label: 'Language',
            data: [...languages],
            type: "language"
            // filterFunction: filterByLanguage
        },
        genres: {
            onlyOne: false,
            label: 'Genre',
            data: allGenres,
            type: "genre"
            // filterFunction: filterByGenres
        },
        rating: {
            onlyOne: true,
            label: 'Minimum rating',
            data: [1, 2, 3, 4 ,5],
            type: "ratingMin"
            // filterFunction: filterByRating
        }   
    }

    return filterData;
};

const userReviewFirst = (reviews, username) => {
    console.log(username);
    let data = {};
    let indexData;

    reviews.map((review, index) => {
        if (review.username === username) {
            indexData = index;
            data = review;
        }
    });

    reviews.splice(indexData, 1);
    reviews.unshift(data);
    console.log(data);
    return reviews;
};

export { booksSort, allGenres, getFilterData, userReviewFirst, defaultUserImage, defaultBookImage };