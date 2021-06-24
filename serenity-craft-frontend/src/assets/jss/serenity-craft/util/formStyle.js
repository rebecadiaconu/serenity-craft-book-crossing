import {
    cardTitle,
    tooltip,
    infoColor,
} from "assets/jss/material-dashboard-pro-react.js";

const formStyle = {
    cardTitle,
    tooltip,
    chip: {
        maxWidth: 100,
        backgroundColor: infoColor[0],
        color: 'white',
        margin: '5px 5px',
        '&:hover': {
            backgroundColor: infoColor[0],
            color: 'white'
        }
    },
    expand: {
        position: 'absolute',
        right: 20
    },
    header: {
        margin: '15px 0',
        fontFamily: "'Sacramento', cursive",
        textAlign: "center",
    },
    logo: {
        position: 'absolute',
        top: -230,
        left: -40,
        height: 500,
        transform: 'rotate(90deg)'
    },
    textField: {
        width: '90%',
        margin: '10px auto'
    },
    submitButton: {
        display: 'flex',
        margin: '10px auto'
    }
};

export default formStyle;