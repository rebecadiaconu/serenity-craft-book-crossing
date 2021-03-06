import React, { useState, useEffect, useRef, forwardRef } from 'react';
import SweetAlert from "react-bootstrap-sweetalert";
import { realtime } from "util/realtime";
import { reportSort } from "util/general";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// Redux 
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "redux/actions/userActions";
import { getReports, setSearchValue, acceptReport } from "redux/actions/adminActions";
import { Actions } from 'redux/types';

// Components

// template
import Button from "components-template/CustomButtons/Button";
import Danger from "components-template/Typography/Danger.js";
import GridContainer from 'components-template/Grid/GridContainer';
import GridItem from 'components-template/Grid/GridItem';

// serenity
import ReportInfo from 'components-serenity/Report/ReportInfo';
import ReportCard from "components-serenity/Report/ReportCard";
import SortInput from "util/components/SortInput";

// @material-ui core
import TextField from "@material-ui/core/TextField";
import { 
    CircularProgress,
    Dialog,
    FormControlLabel,
    InputAdornment,
    makeStyles, 
    Radio,
    RadioGroup,
    Slide,
    Tooltip, 
    Typography
 } from '@material-ui/core';

// icons
import Search from "@material-ui/icons/Search";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Styles
import backgrImage from "assets/img/backgr6.jpg";
import styles from "assets/jss/serenity-craft/components/user/justAdminStyle";
import alertStyles from "assets/jss/serenity-craft/util/sweetAlertStyle.js";
import formStyles from "assets/jss/serenity-craft/util/formStyle"
const useForm = makeStyles(formStyles);
const useAlert = makeStyles(alertStyles);
const useStyles = makeStyles((theme) => ({
    ...styles,
    inputColor: {
        color: 'white'
    }
}));

let ps;

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DecideOnAccept = ({ open }) => {
    const classes = useForm();
    const dispatch = useDispatch();
    const [decision, setDecision] = useState(null);
    const [error, setError] = useState(null);
    const { loadingButton } = useSelector((state) => state.ui);
    const { report, accept } = useSelector((state) => state.admin);

    const handleChange = (value) => {
        setDecision(value);
    };

    const handleClose = () => {
        dispatch({ type: Actions.ADMIN.STOP_ACCEPT });
    };

    const onSubmit = () =>{
        if (decision !== 'delete' && decision != 'notification' && decision !== 'ban') setError('You must choose one of them!');
        else if (report && accept) {
            let formData = {
                decision: decision,
                report: report
            };
            dispatch(acceptReport(report, formData));
        }
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
        >
            <GridContainer
                display="flex"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{width: '98%', position: 'relative', marginLeft: 7, textAlign: "center"}}
            >
                 <GridItem xs={12} sm={12} md={12}>
                    <Typography variant="h4" className={classes.header}>
                        What to do with this wrong content?
                    </Typography>
                </GridItem> 
                <GridItem xs={12} sm={12} md={12} style={{marginTop: 30, position: 'relative'}}>
                <RadioGroup value={decision} onChange={(event) => handleChange(event.target.value)}>
                    {
                        
                       report.type !== "crossing" && <FormControlLabel value="delete" control={<Radio />} label="Delete / cancel it" />
                    }
                    <FormControlLabel value="notification" control={<Radio />} label="Send user a warning" />
                    <FormControlLabel value="ban" control={<Radio />} label="Ban user for 30 days" />
                {
                    error && <Danger>{error}</Danger>
                }
                </RadioGroup>
                    <Button 
                        color="success"
                        disabled={loadingButton}
                        onClick={onSubmit}
                        className={classes.submitButton}
                    >
                        ACCEPT REPORT
                        {
                            loadingButton && (
                                <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={32} color='secondary' />
                            )
                        }
                    </Button>
                </GridItem>
            </GridContainer>
        </Dialog>
    )
};

const JustAdmin = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const alertClasses = useAlert();
    const { admin, initReports, reports, view, report, accept, searchValue } = useSelector((state) => state.admin);
    const { message, errors, loading } = useSelector((state) => state.ui);
    const [alert, setAlert] = useState(null);

    const mainPanel = useRef(null);

    useEffect(() => {
        dispatch(getReports());
        return () => {
            dispatch({ type: Actions.UI.CLEAR_ACTION });
        }
    }, []);

    useEffect(() => {
        if (!!admin) {

            realtime.ref(`/reports/`).on("child_added", (snapshot) => {
                if (reports.filter((report) => report.reportId === snapshot.val().reportId).length === 0) dispatch(getReports());
            });
        }
    }, [admin]);

    useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        
            document.body.style.overflow = "hidden";
        }
    
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
        };
    
    }, []);

    useEffect(() => {
        if (message) successAlert(message);
    }, [message]);

    useEffect(() => {
        if (errors?.error) errorAlert(errors.error);
    }, [errors]);

    const handleSearch = (event) => {
        if (event.target.value !== searchValue) dispatch(setSearchValue(event.target.value, initReports));
    };

    const handleLogOut = () => {
        dispatch(logOutUser());
    };;

    const successAlert = (text) => {
        setAlert(
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Done!"
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {text}
            </SweetAlert>
        );
    };

    const errorAlert = (error) => {
        setAlert(
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Error"
                onConfirm={() => setAlert(null)}
                onCancel={() => setAlert(null)}
                confirmBtnCssClass={alertClasses.button + " " + alertClasses.success}
            >
                {error}
            </SweetAlert>
        );
    };

    return (
        <div>
            <div
                ref={mainPanel}
                className={classes.fullPage}
                style={{ backgroundImage: `url(${backgrImage})` , position: 'fixed', width: '100%'}}
            >   
            {
                accept && admin && <DecideOnAccept open={accept} />
            }
                {alert}
                <Tooltip title="Log out" classes={{ tooltip: classes.tooltip}}>
                    <Button color="rose" round justIcon className={classes.logOutBtn} onClick={handleLogOut}>
                        <ExitToAppIcon />
                    </Button>
                </Tooltip>
                {
                    view && report && <ReportInfo open={view} report={report} />
                }
                <GridContainer
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                <GridItem xs={12} sm={12} md={4}>
                    <Typography variant="h3" className={classes.header}>
                        Serenity Craft User Reports
                    </Typography>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <TextField
                                style={{color: 'white'}}
                                id="book-search"
                                label="SEARCH"
                                fullWidth
                                onChange={handleSearch}
                                InputProps={{
                                    className: classes.inputColor,
                                    input: classes.inputColor,
                                    endAdornment: <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>,
                                }}
                                InputLabelProps={{
                                    className: classes.inputColor
                                }}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={6}>
                            <SortInput admin label="Filter by status" items={reportSort} defaultValue={0} />
                        </GridItem>
                    </GridContainer>
                {
                    loading ? (
                        <CircularProgress style={{position: 'absolute', margin: '0 auto', left: 0, right: 0}} size={72} color='secondary' />
                    ) : (
                        admin && reports && (
                            reports.length > 0 ? (
                                reports.map((report) => {
                                    return <ReportCard key={report.reportId} report={report} />
                                })
                            ) : (
                                <h2>No new reports for now...</h2>
                            )
                        )
                    )
                }  
                </GridItem>
                </GridContainer>
            </div>
        </div>
    )
}

export default JustAdmin;
