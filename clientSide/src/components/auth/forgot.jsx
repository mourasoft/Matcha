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
import useForm from "../../Helpers/useForm";
import { useState } from "react";
import validateForgot from "../../Helpers/validationForgot";
// import { Link } from "react-router-dom";

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
const Forgot = () => {
	const classes = useStyles();
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		userName: "",
		password: "",
		confirm: "",
	});

	const [formErrors, setFormErrors] = useState({
		firstName: "",
		lastName: "",
		email: "",
		userName: "",
		password: "",
		confirm: "",
	});

	const { handleChange, values, handleSubmit, errors } = useForm(
		validateForgot,
		data,
		setData,
		formErrors,
		setFormErrors
	);
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Account recovery
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email"
								name="email"
								defaultValue={values.email}
								onChange={handleChange}
								error={errors.email ? true : false}
								helperText={errors.email && errors.email}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Recover It
					</Button>
				</form>
			</div>
		</Container>
	);
};
export default Forgot;
