import React from 'react';
import classNames from "classnames";
import { NavLink } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Badge from '@material-ui/core/Badge';

// @material-ui/icons
import GroupAddIcon from '@material-ui/icons/GroupAdd';

// Components
import Button from "components/CustomButtons/Button.js";

// Styles
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

const RequestsButton =() => {
    const classes = useStyles();
    const { authenticated, requests } = useSelector((state) => state.user);

    const managerClasses = classNames({
        [classes.managerClasses]: true
    });

    return (
        <div className={managerClasses}>
        {
            authenticated && (
              <NavLink to="/admin/requests" className={classes.iconButton}>
                <Button
                  color="transparent"
                  justIcon
                  aria-label="Requests"
                  aria-haspopup="true"
                  className={classes.buttonLink}
                >
                {
                    (requests && requests.length > 0) ? (
                      requests.filter((crossing) => !crossing.read).length > 0 ? (
                            <Badge max={99} badgeContent={requests.filter((crossing) => !crossing.read).length} color="error">
                                <GroupAddIcon className={ classes.headerLinksSvg + " " + classes.links} />
                            </Badge>
                        ) : (
                            <GroupAddIcon className={ classes.headerLinksSvg + " " + classes.links} />
                        )
                    ) : (
                        <GroupAddIcon className={ classes.headerLinksSvg + " " + classes.links} />
                    )
                }
                </Button>
              </NavLink>
            )
        }
        </div>
    )
}

export default RequestsButton;
