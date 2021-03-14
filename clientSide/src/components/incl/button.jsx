import React from 'react';
import { Link } from 'react-router-dom';
import './button.css'

export  const Button = props => {
	return ( 
		<Link to='signup'>
			<button className="btn">Sign Up</button>
		</Link>
	);
}