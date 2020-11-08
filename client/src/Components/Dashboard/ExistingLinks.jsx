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
    IconButton,
    ListItemSecondaryAction
} from '@material-ui/core';
import {
    createStyles,
    makeStyles,
} from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { clearErrors } from '../../store/actions/errorActions';

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
            width: '100%'
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

const ExistingLinks = ({ social, deleteLink }) => {
    console.log('social: ', social)
    const classes = useStyles();

    const handleDeleteLink = (name, href) => {
        deleteLink(name, href);
    }
    return (
        <Container className={classes.container} maxWidth="md">
            <Paper className={classes.paper} elevation={3}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <List style={{width: '100%'}}>
                            {social && social.map(item => (
                            <div key={item.name+item.href.toString().slice(0,5)}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                        {item.name.slice(0,1)}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography variant="body1">{item.href}</Typography> }
                                        secondary={item.name}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={()=>handleDeleteLink(item.name, item.href)} edge="end" aria-label="delete">
                                            <Icon>delete</Icon>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider/>
                            </div>
                        ))}
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};


export default ExistingLinks;
