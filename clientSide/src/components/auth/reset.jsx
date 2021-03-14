import {
	Container,
	CssBaseline,
	Typography,
	Grid,
	TextField,
	Button,
	Avatar,
} from "@material-ui/core";
import {  makeStyles } from "@material-ui/core/styles";

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
const Reset = () => {
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Account recovery
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="password"
								label="Password"
								name="password"
								autoComplete="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="confrim"
								label="Confirm"
								name="confirm"
								autoComplete="confirm"
							/>
						</Grid>
						{/* <Grid item xs={12}>
			<FormControlLabel
			  control={<Checkbox value="allowExtraEmails" color="primary" />}
			  label="I want to receive inspiration, marketing promotions and updates via email."
			/>
		  </Grid> */}
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
			{/* Footer */}
			{/* <Box mt={5}>
	  <Copyright />
	</Box> */}
		</Container>
	);
};
export default Reset;
