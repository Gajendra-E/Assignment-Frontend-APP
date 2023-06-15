import React, { Component } from 'react';

import {
    Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Button, Dialog, DialogActions, Toolbar,
    DialogContent, DialogTitle, TextField, IconButton, TablePagination, TableContainer, Radio, RadioGroup, FormControlLabel, FormControl, FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from "redux";
import PropTypes from 'prop-types';
import moment from 'moment';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import { createUser } from '../src/actions'
import _ from 'underscore';

const styles = theme => ({
    container: {
		minHeight: "80vh",
		backgroundColor: "#eaeaea",
		backgroundRepeat: "no-repeat",

	},
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
        margin:'10px',
        padding:'10px',
        
    },
    cancelButton: {
        margin:'10px',
        padding:'10px',
        
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


    container: {
		minHeight: "80vh",
		backgroundColor: "#eaeaea",
		backgroundRepeat: "no-repeat",

	},
	card: {
		border: "1px solid #E1E7ED",
		backgroundColor: "#FFFFFF",
		boxShadow: "inset 0px 4px 0px #2FB0D5",
		borderRadius: 4,
		padding: 40,
		marginBottom: 90
	},
	inputRoot: {
		backgroundColor: "#FFFFFF",
		border: "1px solid #E1E7ED",
		borderRadius: "4px",
		fontSize: "13x !important",
		"&:hover": {
			border: "1px solid #2FB0D5",
			backgroundColor: "#FFFFFF"
		}
	},
	inputStyle: {
		fontFamily: "MaisonNeue-Book !important",
		fontSize: "13x !important",
		padding: "10px !important",
		color: "#6E8CA8",
		opacity: 1,
		"&&:after": {
			color: "#2FB0D5",
		}
	},
	underline: {
		"&&&:before": {
			borderBottom: "none"
		},
		"&&:after": {
			borderBottom: "none"
		}
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 50
	},
	textFieldContainer: {
		padding: "10px 0px"
	},
	textContainer: {
		borderRadius: 4,
		border: "1px solid #E1E7ED",
		backgroundColor: "#F7F8FA, 100%",
		padding: "5px 10px",
		margin: "15px 0px"
	},
	textStyle: {
		fontFamily: "MaisonNeue-Book",
		fontSize: "14px !important",
		padding: "3px 0px",
		color: "#6E8CA8"
	},
	buttonVariant: {
		boxShadow: "0px 0px 0px 0px #E1E7ED",
		backgroundColor: "#2FB0D5",
		margin: "15px 0px",
		fontFamily: "MaisonNeue-Book",
		color: "#fff",
		borderRadius: 3,
		padding: "8px 20px",
		height: "fit-content",
		'&:hover': {
			backgroundColor: "#2FB0D5",
		},
	},
	linkText: {
		fontFamily: "MaisonNeue-Book",
		fontSize: "14px !important",
		padding: "3px 5px",
		color: "#1844D6",
		cursor: "pointer"
	},
	errorText: {
		padding: 10,
		fontSize: 12,
		color: "#f44336",
		fontFamily: "MaisonNeue-Book"
	},
	cardTitle: {
		fontFamily: "MaisonNeue-Book",
		textAlign: "center",
		color: "#2FB0D5",
		fontWeight: "bold",
		fontSize: 20,
		padding: "10px 0px"
	}
})

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            name_error: false,
            date_of_birth: null,
            date_of_birth_error: false,
            invalid_age_error: false,
            invalid_date_of_birth_error: false,
            email: "",
            email_error: false,
            invalid_email_error: false,
            phone_number: "",
            phone_number_error: false,
        }
    }

  
   
    handleSubmit =async () => {

        let { name, email, phone_number, date_of_birth } = this.state

        let isError = false;
        if (name === "" || name === null) {
            this.setState({ name_error: true })
            isError = true;
        }
        if (email === "" || email === null) {
            this.setState({ email_error: true })
            isError = true;
        }

        if (email !== null && email !== "") {
            if (!this.validateEmail(email)) {
                this.setState({ invalid_email_error: true })
                isError = true
            }
        }


        if (phone_number === null || phone_number === "") {
            this.setState({ phone_number_error: true })
            isError = true
        } else {
            if (this.checkNumber(phone_number) !== true || phone_number.length !== 10) {
                this.setState({ invalid_phone_number_error: true })
                isError = true
            }
        }


        if (date_of_birth === null || date_of_birth === "") {
            this.setState({ date_of_birth_error: true })
            isError = true
        } else {
            let today = moment().format("YYYY-MM-DD")
            let selectDate = moment(date_of_birth).format("YYYY-MM-DD")

            if (selectDate === "Invalid date" || moment(selectDate).isAfter(today, "day")) {
                this.setState({ invalid_date_of_birth_error: true })
                isError = true
            }
        }
        if (this.validateAge(new Date(moment(date_of_birth).format('MM/DD/YYYY')))) {
            this.setState({ invalid_age_error: true, errorText: "Application is not yet available for users under 18 years of age." })
            isError = true;
        }

        if (isError === false) {
            let userObj = {};
            
            userObj.name = name;
            userObj.email = email;
            userObj.phone_number = phone_number;
            userObj.date_of_birth =  moment(date_of_birth, 'MM-DD-YYYY').format('YYYY-MM-DD 00:00');
    
          let result =await createUser(userObj);

          if(result.status==="Success"){
            this.props.history.push('/users'); 
          }
            
        }
    }

   
    validateAge = (date) => {
        var age = new Date().getFullYear() - new Date(date).getFullYear();
        var month = new Date().getMonth() - new Date(date).getMonth();
        if (month < 0 || (month === 0 && new Date().getDate() < new Date(date).getDate())) {
            age--;
        }
        return age <= 18
    }
    handleClose = () => {
        this.setState({
            name: "",
            name_error: false,
            date_of_birth: null,
            date_of_birth_error: false,
            invalid_age_error: false,
            invalid_date_of_birth_error: false,
            email: "",
            email_error: false,
            invalid_email_error: false,
            phone_number: "",
            phone_number_error: false,

        })
    }

 
    handleDateChange = (date) => {
        this.setState({ date_of_birth: date, date_of_birth_error: false, invalid_date_of_birth_error: false, invalid_age_error: false });
    }

    checkNumber = (number) => {
        var isNumber = /^-{0,1}\d+$/.test(number)
        return isNumber;
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    render() {
        const { classes } = this.props;
        return (
        	<div className={classes.container}>

<div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
					<Grid container justify="center" alignItems="center">
						<Grid item xs={11} sm={7} md={3}>
							<div className={classes.imageContainer}>
							</div>
							<div className={classes.card}>
								<Typography className={classes.cardTitle}>Registration Form</Typography>
								<div className={classes.textFieldContainer}>
                                
        <TextField
            id="name"
            label="Name"
            name="name"
            required
            className={classes.margin}
            value={this.state.recipient}
            onChange={(event) => this.setState({ name: event.target.value, name_error: false })}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                classes: { input: classes.inputStyle }
            }}
            fullWidth
            error={this.state.name_error === true ? true : false}
            helperText={this.state.name_error === true ? "Please enter name" : false}
        />
    </div>
    <div className={classes.textFieldContainer}>
        <TextField
            id="email"
            label="Email"
            name="email"
            required
            className={classes.margin}
            value={this.state.email}
            onChange={(event) => this.setState({ email: event.target.value, email_error: false, invalid_email_error: false })}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                classes: { input: classes.inputStyle }
            }}
            fullWidth
            error={this.state.email_error === true ? true : this.state.invalid_email_error === true ? true : false}
            helperText={this.state.email_error === true ? "Please enter Email" : this.state.invalid_email_error === true ? "Please enter valid email" : false} />
    </div>
    <div className={classes.textFieldContainer}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date Of Birth"
                    format="dd/MM/yyyy"
                    value={this.state.date_of_birth}
                    required
                    disableFuture={true}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        classes: { input: classes.inputStyle }
                    }}
                    fullWidth
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    error={this.state.date_of_birth_error === true ? true : this.state.invalid_date_of_birth_error === true ? true : this.state.invalid_age_error === true ? true : false}
                    helperText={this.state.date_of_birth_error === true ? "Please enter date of birth" : this.state.invalid_date_of_birth_error === true ? "Please enter correct  date" : this.state.invalid_age_error === true ? "age should be above 18" : false}
                />
            </Grid>
        </MuiPickersUtilsProvider>
    </div>
    <div className={classes.textFieldContainer}>
        <TextField
            id="phone_number"
            label="Phone Number"
            name="phone_number"
            className={classes.margin}
            value={this.state.phone_number}
            onChange={(event) => this.setState({ phone_number: event.target.value, phone_number_error: false, invalid_phone_number_error: false })}
            margin="normal"
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                classes: { input: classes.inputStyle }
            }}
            required
            fullWidth
            error={this.state.phone_number_error === true ? true : this.state.invalid_phone_number_error === true ? true : false}
            helperText={this.state.phone_number_error === true ? "Please enter mobile number" : this.state.invalid_phone_number_error === true ? "Invalid mobile number" : false}
        />
    </div>


    <Button fullWidth variant="contained" className={classes.buttonVariant}   onClick={() => this.handleSubmit()}>Log in</Button>
								
                            </div>
						</Grid>
					</Grid>
				</div>
			</div >













               
            )
    }
}
const mapStateToProps = (state) => {

    return {
        // user_site_visit_requests: state.userReducer.user_site_visit_requests
    }
}
RegistrationForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default compose(withStyles(styles))(RegistrationForm);

