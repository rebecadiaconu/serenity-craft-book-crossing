import {
    cardTitle,
    tooltip,
    infoColor,
    roseColor
} from "assets/jss/material-dashboard-pro-react.js";

const addForm = {
    tooltip,
    header: {
        margin: '5px 0',
        fontFamily: "'Sacramento', cursive",
        textAlign: "left",
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
    expand: {
        position: 'absolute',
        right: 20
    },
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
    submitButton: {
        display: 'flex',
        margin: '10px auto'
    }
};

export default addForm;