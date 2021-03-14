import { Typography, Box } from "@material-ui/core";
const Footer = () => {
	return (
		<Box mt={10}>
			<Typography variant="body2" color="textSecondary" align="center">
				{"Copyright © "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		</Box>
	);
};

export default Footer;
