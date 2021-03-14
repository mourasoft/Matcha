// import {
// 	Container,
// 	CssBaseline,
// 	Typography,
// 	Grid,
// 	TextField,
// 	Button,
// 	Avatar,
// 	FormLabel,
// 	RadioGroup,
// 	Radio,
// 	FormControlLabel,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import { Link } from "react-router-dom";

// // const theme = createMuiTheme({
// // 	palette: {
// // 		primary: {
// // 			main: "#556cd6",
// // 		},
// // 		secondary: {
// // 			main: "#19857b",
// // 		},
// // 		error: {
// // 			main: "#38a2e3",
// // 		},
// // 		background: {
// // 			default: "#fff",
// // 		},
// // 	},
// // });

// const useStyles = makeStyles((theme) => ({
// 	paper: {
// 		marginTop: theme.spacing(8),
// 		display: "flex",
// 		flexDirection: "column",
// 		alignItems: "center",
// 	},
// 	avatar: {
// 		margin: theme.spacing(1),
// 		backgroundColor: theme.palette.secondary.main,
// 	},
// 	form: {
// 		width: "100%", // Fix IE 11 issue.
// 		marginTop: theme.spacing(3),
// 	},
// 	submit: {
// 		margin: theme.spacing(2, 0, 2),
// 	},
// 	radio: {
// 		flexDirection: "row",
// 		justifyContent: "center",
// 	},
// }));

// const Profile = () => {
// 	const classes = useStyles();
// 	return (
// 		<Container component="main" maxWidth="xs">
// 			<CssBaseline />
// 			<div className={classes.paper}>
// 				<Avatar className={classes.avatar}></Avatar>
// 				<Typography component="h1" variant="h5">
// 					Profile
// 				</Typography>
// 				<form className={classes.form} noValidate>
// 					<Grid container spacing={2}>
// 						<Grid item xs={12}>
// 							<FormLabel component="legend">Gender</FormLabel>
// 							<RadioGroup
// 								className={classes.radio}
// 								aria-label="gender"
// 								name="gender1"
// 							>
// 								<FormControlLabel
// 									value="female"
// 									control={<Radio />}
// 									label="Female"
// 								/>
// 								<FormControlLabel
// 									value="male"
// 									control={<Radio />}
// 									label="Male"
// 								/>
// 								<FormControlLabel
// 									value="bisexual"
// 									control={<Radio />}
// 									label="Bisexual"
// 								/>
// 							</RadioGroup>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<FormLabel component="legend">Sexual preferences</FormLabel>
// 							<RadioGroup
// 								className={classes.radio}
// 								aria-label="gender"
// 								name="gender1"
// 							>
// 								<FormControlLabel
// 									value="female"
// 									control={<Radio />}
// 									label="Female"
// 								/>
// 								<FormControlLabel
// 									value="male"
// 									control={<Radio />}
// 									label="Male"
// 								/>
// 								<FormControlLabel
// 									value="bisexual"
// 									control={<Radio />}
// 									label="Bisexual"
// 								/>
// 							</RadioGroup>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								rows={4}
// 								multiline
// 								name="biography"
// 								label="Biography"
// 								type="text"
// 								id="Biography"
// 							/>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<TextField
// 								variant="outlined"
// 								required
// 								fullWidth
// 								id="tags"
// 								label="Tags"
// 								type="text"
// 								name="tags"
// 							/>
// 						</Grid>
// 					</Grid>
// 					<Button
// 						type="submit"
// 						fullWidth
// 						variant="contained"
// 						color="primary"
// 						className={classes.submit}
// 					>
// 						Sign Up
// 					</Button>
// 				</form>
// 			</div>
// 		</Container>
// 	);
// };

// export default Profile;
import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

export default class CreatableInputOnly extends Component<*, State> {
  state = {
    inputValue: '',
    value: [],
  };
  handleChange = (value: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value });
  };
  handleInputChange = (inputValue: string) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLElement>) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
        });
        event.preventDefault();
    }
  };
  render() {
    const { inputValue, value } = this.state;
    return (
      <CreatableSelect
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        placeholder="Type something and press enter..."
        value={value}
      />
    );
  }
}