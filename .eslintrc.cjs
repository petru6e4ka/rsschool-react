module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'airbnb',
		'airbnb/hooks',
		'airbnb-typescript',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh', 'react-compiler'],
	rules: {
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'react/react-in-jsx-scope': 0,
		'react-compiler/react-compiler': 'error',
		'react/static-property-placement': 0,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			jsx: true,
		},
	},
};
