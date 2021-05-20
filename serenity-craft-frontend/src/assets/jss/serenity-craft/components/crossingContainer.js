import CrossingBackgr from "assets/img/crossing-card-backgr.png";

const crossingContainer = {
    root: {
        backgroundImage: `url(${CrossingBackgr})`,
        height: 350,
        fontFamily: "'Grandstander', cursive",
        maxWidth: 500
    },
    avatar: {
        display: 'flex',
        margin: '0 auto',
        height: 160,
        borderRadius: 100
    },
    cover: {
        minHeight: 300,
        maxHeight: 310,
        '& img': {
            borderRadius: 15,
            height: 300,
            objectFit: 'contain',
            margin: '30px 15px 0'
        }
    },
    info: {
        fontFamily: "'Grandstander', cursive",
        margin: '0 auto'
    },
    right: {
        float: "right!important",
        display: "block"
    }
};

export default crossingContainer;