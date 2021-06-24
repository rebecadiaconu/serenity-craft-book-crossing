import {
    tooltip,
    roseColor
} from "assets/jss/material-dashboard-pro-react.js";

const changeBookModal ={
    tooltip,
    card: {
        textAlign: 'center'
    },
    cover: {
        maxHeight: 300,
        '& img': {
            borderRadius: 10,
            height: 280,
            width: 170,
            objectFit: 'cover',
            margin: '15px 10px'
        }
    },
    footer: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: "'Grandstander', cursive",
        color: "#999999"
    },
    grid: {
        maxWidth: 1200,
        margin: '0 auto'
    },
    header: {
        margin: '30px 0 15px',
        fontFamily: "'Sacramento', cursive",
        textAlign: "center",
    },
    root: {
        minHeight: 800,
        maxHeight: 1100,
        margin: '0 auto'
    },
    selected: {
        border: '1px solid',
        borderColor: roseColor[0]
    },
    submitButton: {
        display: 'flex',
        margin: '10px auto'
    }
};

export default changeBookModal;