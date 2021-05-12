const scrollTopStyle = {
    toTop: {
        zIndex: 2,
        position: "fixed",
        bottom: "2vh",
        backgroundColor: "#DCDCDC",
        color: "black",
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: "#397BA6",
            backgroundColor: "#DCDCDC"
        },
        right: "5%"
    }
};
  
export default scrollTopStyle;
  