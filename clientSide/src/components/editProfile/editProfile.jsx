import { useState , useEffect} from "react";
import {
	Grid,
	TextField,
	Button,
	Avatar,
	FormLabel,
	RadioGroup,
	Radio,
	FormControlLabel,
	FormControl,
	// Fab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Menu } from "../../Helpers/Tags";
import Creatable from "react-select/creatable";

const EditeProfile = () => {
	const classes = useStyles();

	const [value, setValue] = useState("");

	return (
		<form
			className={classes.form}
			autoComplete="off"
			//   onSubmit={handleSubmit}
			noValidate
		>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						name="fname"
						variant="outlined"
						required
						fullWidth
						id="firstName"
						label="First Name"
						defaultValue="First Name"
						// onChange={handleChange}
						// error={errors.firstName ? true : false}
						// helperText={errors.firstName && errors.firstName}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="lastName"
						label="Last Name"
						name="lname"
						//defaultValue={}
						//onChange={(e) => setValue(e.target.value)}
						// error={errors.lastName ? true : false}
						// helperText={errors.lastName && errors.lastName}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormLabel required component="legend">
						Gender
					</FormLabel>
					<RadioGroup
						className={classes.radio}
						aria-label="gender"
						name="gender"
						// value={data.gender}
						// onChange={handleChange}
					>
						<FormControlLabel value="1" control={<Radio />} label="Female" />
						<FormControlLabel value="2" control={<Radio />} label="Male" />
					</RadioGroup>
				</Grid>
				<Grid item xs={12}>
					<FormLabel required component="legend">
						Sexual preferences
					</FormLabel>
					<RadioGroup
						className={classes.radio}
						aria-label="gender"
						name="preferences"
						// value={data.preferences}
						// onChange={handleChange}
					>
						<FormControlLabel value="1" control={<Radio />} label="Female" />
						<FormControlLabel value="2" control={<Radio />} label="Male" />
						<FormControlLabel value="3" control={<Radio />} label="Bisexual" />
					</RadioGroup>
				</Grid>
				<Grid item xs={12}>
					<TextField
						variant="outlined"
						required
						fullWidth
						rows={6}
						multiline
						name="biography"
						label="Biography"
						type="text"
						id="Biography"
						// value={data.biography}
						// onChange={handleChange}
						// error={errors.bio ? true : false}
						// helperText={errors.bio && errors.bio}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="date"
						margin="normal"
						fullWidth
						required
						label="Birthday"
						name="birthday"
						type="date"
						// value={data.birthday}
						// onChange={handleChange}
						// InputLabelProps={{
						//   shrink: true,
						// }}
						// error={errors.birthday ? true : false}
						// helperText={errors.birthday && errors.birthday}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <FormControl fullWidth> */}
					<FormLabel required component="legend">
						Tags
					</FormLabel>
					<Creatable
						components={{ Menu }}
						isMulti
						name="tags"
						// isValidNewOption={isValidNewOption}
						// onChange={handleChangeTag}
					/>
				</Grid>

				{/* Profile picture */}
				<FormControl fullWidth>
					<FormLabel required component="legend">
						profile Picture
					</FormLabel>
					<div className={classes.Profile}>
						<label for="img">
							<Avatar
								// src={img.img}
								style={{ cursor: "pointer" }}
								className={classes.large}
							/>
						</label>
						<input
							name="img"
							accept="image/*"
							hidden
							id="img"
							type="file"
							//   onChange={photoUpload}
						/>
					</div>
				</FormControl>
				{/* all other picture */}
				<Grid item xs={12} className={classes.gallery}>
					{/* picture 1 */}
					<label for="img1">
						<Avatar
							//   src={img.img1}
							variant="square"
							className={classes.large}
						>
							<AddIcon />
						</Avatar>
					</label>
					<input
						name="img1"
						accept="image/*"
						hidden
						id="img1"
						type="file"
						// onChange={photoUpload}
					/>
					<label for="img2">
						<Avatar
							//   src={img.img2}
							variant="square"
							className={classes.large}
						>
							<AddIcon />
						</Avatar>
					</label>
					<input
						name="img2"
						accept="image/*"
						hidden
						id="img2"
						type="file"
						// onChange={photoUpload}
					/>
					{/* image3 */}
					<label for="img3">
						<Avatar
							//   src={img.img3}
							variant="square"
							className={classes.large}
						>
							<AddIcon />
						</Avatar>
					</label>
					<input
						name="img3"
						accept="image/*"
						hidden
						id="img3"
						type="file"
						// onChange={photoUpload}
					/>
					{/* image4 */}
					<label for="img4">
						<Avatar
							//   src={img.img4}
							variant="square"
							className={classes.large}
						>
							<AddIcon />
						</Avatar>
					</label>
					<input
						name="img4"
						accept="image/*"
						hidden
						id="img4"
						type="file"
						// onChange={photoUpload}
					/>

					{/* </div> */}
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

export default EditeProfile;

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
	radio: {
		flexDirection: "row",
		justifyContent: "center",
	},
	large: {
		width: theme.spacing(12),
		height: theme.spacing(12),
		margin: "6px",
	},
	Profile: {
		flexBasis: "30%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	gallery: {
		display: "flex",
		justifyContent: "space-around",
		// ["@media (max-width:780px)"]: {
		// 	alignItems: "center",
		// 	flexWrap: "wrap",
		// 	justifyContent: "space-around",
		// },
	},
}));
