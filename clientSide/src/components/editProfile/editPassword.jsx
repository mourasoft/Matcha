import { Grid, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

const EditPassword = () => {
	const classes = useStyles();
	return (
		<form className={classes.form} noValidate>
			<Grid container spacing={5}>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="password"
						label="Password"
						type="password"
						name="passwd"
						//   defaultValue={values.passwd}
						//   onChange={handleChange}
						//   error={errors.passwd ? true : false}
						//   helperText={errors.passwd && errors.passwd}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="confrim"
						type="password"
						label="Confirm"
						name="rpasswd"
						//   defaultValue={values.rpasswd}
						//   onChange={handleChange}
						//   error={errors.rpasswd ? true : false}
						//   helperText={errors.rpasswd && errors.rpasswd}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="oldPassword"
						type="oldPassword"
						label="oldPassword"
						name="oldPassword"
						//   defaultValue={values.rpasswd}
						//   onChange={handleChange}
						//   error={errors.rpasswd ? true : false}
						//   helperText={errors.rpasswd && errors.rpasswd}
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
				Change It
			</Button>
		</form>
	);
};

export default EditPassword;
