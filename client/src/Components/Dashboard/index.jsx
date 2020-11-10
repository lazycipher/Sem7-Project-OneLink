import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Container,
    Paper,
    Grid,
    Button,
    LinearProgress,
    Snackbar,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Icon,
    Divider,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    Tooltip,
    IconButton
} from '@material-ui/core';
import {
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { clearErrors } from '../../store/actions/errorActions';
import { addLink, deleteLink } from '../../store/actions/authActions';
import ExistingLinks from './ExistingLinks';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem'
        },
        paper: {
            padding: theme.spacing(3),
            fontFamily: 'roboto',
            minWidth: '33vw'
        },
        item: {
            marginBottom: theme.spacing(1)
        },
        btnContainer: {
            display: 'flex'
        },
        btn: {
            margin: '0 auto'
        },
        socialName: {
            width: '35%',
            marginRight: '5%'
        },
        socialHref: {
            width: '60%'
        }
    }),
);

const Dashboard = ({ auth, isAuthenticated, error, clearErrors, addLink, deleteLink }) => {
    const URLRe = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    const classes = useStyles();
    const [points, setPoints] = useState([{ name: "", href: "", count: 0 }])
    const [snackbar, setSnakbar] = useState(false);

    const handleAddPoint = () => {
        setPoints([...points, { name: "", href: "", count: 0 }]);
    }

    const handleRemovePoint = (index) => {
        let values = [...points];
        values.splice(index, 1)
        setPoints(values)
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        for(const p of points) {
            if(URLRe.test(p.href)){
                console.log(p.href.slice(0,5))
                if(p.href.slice(0,4)==="http") {
                    addLink(points);
                }else {
                    setSnakbar(true);
                    return;
                }
            } else {
                setSnakbar(true);
                return;
            }
        }
    }
    const handleContentChange = (e, index) => {
        let values = [...points];
        values[index].href = e.target.value.toString();
        setPoints(values);
        
    }
    const handleSocialNameChange = (e, index) => {
        let values = [...points];
        values[index].name = e.target.value.toString();
        setPoints(values);
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnakbar(false);
    }
    return (
        <>
        <Container className={classes.container} maxWidth="md">
            <Paper className={classes.paper} elevation={3}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <form onSubmit={handleOnSubmit}>
                            {points.map((point, index) => (
                                <div key={index} className={classes.item}>
                                    <FormControl className={classes.socialName} size="small" variant="outlined">
                                        <InputLabel htmlFor={"outlined-adornment-text-" + index.toString()}>Website {index + 1}</InputLabel>
                                        <OutlinedInput
                                            id={"outlined-adornment-text-" + index.toString()}
                                            name={point.name}
                                            onChange={(e) => handleSocialNameChange(e, index)}
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.socialHref} size="small" variant="outlined">
                                        <InputLabel htmlFor={"outlined-adornment-text-" + index.toString()}>Link {index + 1}</InputLabel>
                                        <OutlinedInput
                                            id={"outlined-adornment-text-" + index.toString()}
                                            name={point.name}
                                            onChange={(e) => handleContentChange(e, index)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Tooltip title="remove" placement="top">
                                                        <IconButton color="secondary" onClick={() => handleRemovePoint(index)}>
                                                            <Icon>remove_circle_outline</Icon>
                                                        </IconButton>
                                                    </Tooltip>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                </div>
                            ))}
                            <div className={classes.btnContainer}>
                                <Tooltip className={classes.btn} title="add row" placement="top">
                                    <IconButton color="primary" onClick={handleAddPoint}>
                                        <Icon>add_circle_outline</Icon>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className={classes.btnContainer}>
                                <Button
                                    className={classes.btn}
                                    type="submit"
                                    variant="contained"
                                    size="medium"
                                    color="primary"
                                >
                                    Add!
                            </Button>
                            </div>
                        </form>
                    </Grid>
                    {/* For Errors When Anything Left Empty */}
                    <Snackbar
                        open={snackbar}
                        autoHideDuration={5000}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        onClose={handleCloseSnackbar}
                    >
                        <Alert variant="filled" onClose={handleCloseSnackbar} severity="error">
                            Invalid Content/URL!(Don't forget http or https)
                    </Alert>
                    </Snackbar>
                </Grid>
            </Paper>
        </Container>
        <ExistingLinks deleteLink={deleteLink} social={auth.user.social} />
        </>
    );
};

const mapStateToProps = (state) => {
    return ({
        auth: state.auth,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error,
    })
};

export default connect(mapStateToProps, { clearErrors, addLink, deleteLink })(Dashboard);
