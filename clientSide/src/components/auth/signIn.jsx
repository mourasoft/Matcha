import {
	Container,
	CssBaseline,
	Typography,
	Grid,
	TextField,
	Button,
	Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import useForm from "../../Helpers/useForm";
import validateSignIn from "../../Helpers/validationSignIn";
import { useState } from "react";
// const theme = createMuiTheme({
// 	palette: {
// 		primary: {
// 			main: "#556cd6",
// 		},
// 		secondary: {
// 			main: "#19857b",
// 		},
// 		error: {
// 			main: "#38a2e3",
// 		},
// 		background: {
// 			default: "#fff",
// 		},
// 	},
// });

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		//   border: "black solid "
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(2, 0, 2),
	},
}));

const SignIn = () => {
	const classes = useStyles();
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({
		email: "",
		password: "",
	});
	const { handleChange, values, handleSubmit, errors } = useForm(
		validateSignIn,
		data,
		setData,
		formErrors,
		setFormErrors
	);
	console.log(values);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email or UserName"
								name="email"
								autoComplete="email"
								defaultValue={values.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email && errors.email}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								defaultValue={values.password}
								onChange={handleChange}
								error={errors.password ? true : false}
								helperText={errors.password && errors.password}
							/>
						</Grid>
						<Grid item>
							<Link to="/forgot" variant="body2">
								Forgot Password?
							</Link>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link to="/signup" variant="body2">
								Don't have an account? Sign Up
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			{/* Footer */}
			{/* <Box mt={5}>
	  <Copyright />
	</Box> */}
		</Container>
	);
};

export default SignIn;
