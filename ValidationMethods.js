import { Alert } from 'react-native';
import React from 'react';

const validUsername = /^[a-zA-Z0-9_]{1,20}$/;

export function removeSpaces(str) {
	return str.replace(/\s+/g, '');
}

export function validateTerpmail(e) {
	if (
		(e != null && e[0] != '' && e[1] == 'terpmail.umd.edu') ||
		e[1] == 'umd.edu'
	) {
		return true;
	}

	Alert.alert(
		'Your terpmail is your @terpmail.umd.edu OR your @umd.edu email if youre a staff member.'
	);
	return false;
}
export function validateUsername(username) {
	u = removeSpaces(username);
	if (u != null && username != '') {
		result = username.match(validUsername);
		if (result != null && result[0] != null) {
			return true;
		}
	}
	Alert.alert(
		'username must at least 1 character long, at most 20 characters long, only consist of a-z, A-Z, and/or 0-9.'
	);
	return false;
}
