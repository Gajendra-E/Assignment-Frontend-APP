import React, { Component } from 'react';
import { BACK_END_POINT } from "../helpers/Constants";

import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Button, Dialog, DialogActions, Toolbar,
    DialogContent, DialogTitle, TextField, IconButton, TablePagination, TableContainer, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from "redux";
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import { fetchAllUsers } from '../actions'
import _ from 'underscore';

const styles = theme => ({
    fontCellHeader: {
        fontFamily: "Futura-Book",
        color: "#fff",
        fontWeight: 900,
        padding: '14px 20px 14px 10px',

    },
    fontTableCellBody: {
        fontWeight: 700,
        fontFamily: "Futura-Medium-bt",
        color: "#37474f",
        padding: '14px 20px 14px 10px',
    },
    addButton: {
        backgroundColor: "#2B99CD",
        color: "white",
        fontFamily: "unicode.futurab",
        borderRadius: "10",
        textTransform: 'none',
    },
    cancelButton: {
        backgroundColor: "#8fa3ad",
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(143, 163, 173, 0.8)',
        }
    },
    editButton: {
        backgroundColor: "#8fa3ad",
        margin: 2,
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'rgba(143, 163, 173, 0.8)',
        }
    },
    viewButton: {
        backgroundColor: "red",
        margin: 2,
        color: "white",
        fontFamily: "unicode.futurab",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'red',
        }
    },
    inputStyle: {
        fontFamily: "Futura-Book",
        fontSize: 14
    },
    labelStyle: {
        fontFamily: "Futura-Book",
        fontSize: 14
    },
    textStyle: {
        color: "#37474f",
        fontWeight: "bold",
        fontSize: 25,
        padding: 5
        //padding: 10   
    },
})

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users:null
        }
          
    }

 componentDidMount() {
        fetch(`${BACK_END_POINT}${"users"}`)
            .then(response => response.json())
            .then(data => 
                this.setState({users:data.payload}) );
   
    }


   
    render() {
        const { classes } = this.props;
        return (
            <div style={{ margin: 20 }}>
                <Grid item xs={12} sm={12} style={{ backgroundColor: "#fff", borderRadius: 5, boxShadow: "0ppx 0px rgba(0, 0, 0, 0.2)" }}>
                    <Toolbar style={{ justifyContent: "space-between", padding: "5px 20px 0px 0px", marginBottom: 10 }}>
                        <div></div>
                      <Typography className={classes.textStyle} style={{fontSize: "16", color: "#20478E", fontWeight: "bold" }}>Users</Typography>
                      <div></div>
                    </Toolbar>

                    <TableContainer style={{ backgroundColor: '#f2f2f2' }}>
                        <Table>
                            <TableHead style={{ background: "linear-gradient(to right, #2687C4, #2A98CA, #2EAAD4, #32BCD9)" }}>
                                <TableRow>
                                    <TableCell align="left" className={classes.fontCellHeader}>Name</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Email</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Phone Number</TableCell>
                                    <TableCell align="left" className={classes.fontCellHeader}>Date Of Birth</TableCell>
                          
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    this.state.users !== null && this.state.users.length > 0 ? (_.sortBy(this.state.users, 'id').map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.name}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.email}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{item.phone_number}</TableCell>
                                            <TableCell align="left" className={classes.fontTableCellBody}>{moment(item.date_of_birth).format("DD-MM-YYYY")}</TableCell>
                                           
                                        </TableRow>)
                                    ))
                                        :
                                        <TableCell colspan={4} style={{ textAlign: "center" }}>There are no users </TableCell>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                         </div>)
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default compose(withStyles(styles), )(Users);

