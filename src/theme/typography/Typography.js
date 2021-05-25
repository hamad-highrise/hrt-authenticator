import * as React from 'react';
import { Text } from 'react-native';

import styles from './styles.typography';

const AppTitle = ({ children, styles: extraStyles }) => {
	const finalStyles = [
		styles.default,
		styles.appTitle,
		...(Array.isArray(extraStyles) ? extraStyles : []),
		typeof extraStyles === 'object' ? extraStyles : {}
	];
	return <Text style={finalStyles}>{children}</Text>;
};

const HeaderTitle = ({ children, styles: extraStyles }) => {
	const finalStyles = [
		styles.default,
		styles.headerTitle,
		...(Array.isArray(extraStyles) ? extraStyles : []),
		typeof extraStyles === 'object' ? extraStyles : {}
	];
	return <Text style={finalStyles}>{children}</Text>;
};

const ScreenTitle = ({ children, style: extraStyles }) => {
	const finalStyles = [
		styles.default,
		styles.headerTitle,
		...(Array.isArray(extraStyles) ? extraStyles : []),
		typeof extraStyles === 'object' ? extraStyles : {}
	];
	return <Text style={finalStyles}>{children}</Text>;
};

const InputLabel = ({ children, style: extraStyles }) => {
	const finalStyles = [
		styles.default,
		styles.inputLabel,
		...(Array.isArray(extraStyles) ? extraStyles : []),
		typeof extraStyles === 'object' ? extraStyles : {}
	];
	return <Text style={finalStyles}>{children}</Text>;
};

export default { AppTitle, HeaderTitle, ScreenTitle, InputLabel };
export { AppTitle, HeaderTitle, ScreenTitle, InputLabel };
