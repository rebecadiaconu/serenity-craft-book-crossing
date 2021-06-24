import {primaryColor} from "assets/jss/material-dashboard-pro-react";

const editProfileStyle = {
    central: {
        margin: '0 auto'
    },
    chip: {
        maxWidth: 100,
        backgroundColor: primaryColor[0],
        color: 'white',
        margin: '5px 5px',
        '&:hover': {
            backgroundColor: primaryColor[0],
            color: 'white'
        }
    },
    expand: {
        position: 'absolute',
        right: 20
    },
    imageContainer: {
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
    },
    mainInterests: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    multipleSelect: {
        maxHeight: 200
    },
    submitButton: {
        display: 'flex',
        margin: '30px auto 0'
    },
    textField: {
        margin: '10px auto'
    }
};

export default editProfileStyle;