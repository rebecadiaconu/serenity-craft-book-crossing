export const handleScroll = () => {
    if (window.scrollY > showBelow) {
        if (!show) setShow(true);
    } else {
        if (show) setShow(false);
    }
};