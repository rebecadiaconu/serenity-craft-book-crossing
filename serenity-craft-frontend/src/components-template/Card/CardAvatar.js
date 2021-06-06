import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui/core 
import { makeStyles } from "@material-ui/core/styles";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/cardAvatarStyle.js";
const useStyles = makeStyles(styles);

const CardAvatar = (props) => {
  const classes = useStyles();
  const {
    children,
    className,
    plain,
    profile,
    testimonial,
    testimonialFooter,
    ...rest
  } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [classes.cardAvatarTestimonial]: testimonial,
    [classes.cardAvatarTestimonialFooter]: testimonialFooter,
    [className]: className !== undefined
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  );
}

CardAvatar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  profile: PropTypes.bool,
  plain: PropTypes.bool,
  testimonial: PropTypes.bool,
  testimonialFooter: PropTypes.bool
};

export default CardAvatar;