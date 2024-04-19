module.exports = {
	settings: {
		react: {
			version: "detect"
		}
	},
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"prettier"
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script"
			}
		}
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["@typescript-eslint", "react", "prettier"],
	rules: {
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"react/display-name": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/no-var-requires": "off"
	}
};
