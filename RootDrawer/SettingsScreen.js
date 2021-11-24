import React from 'react';
import {
	Text,
	View,
	Assets,
	Constants,
	Button,
	Colors,
	Typography,
} from 'react-native-ui-lib'; //eslint-disable-line
import { styles } from './HomeTabs/CommonComponents.js';
import { logout } from './AuthenticateStack/FirebaseMethods.js';

export default function SettingsScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Button onPress={logout} label="Sign Out" backgroundColor="#ff0000" style={styles.button}/>
		</View>
	);
}
