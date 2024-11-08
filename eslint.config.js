import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		settings: {
			react: {
				version: "detect",
			},
		},
		rules: {
			"@typescript-eslint/ban-ts-comment": "off",
			"no-console": "warn",
			"react/prop-types": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"react/no-unescaped-entities": "off",
			"@typescript-eslint/no-unused-vars": "off",
			semi: ["error", "always"],
			quotes: ["error", "double"],
			"react/react-in-jsx-scope": "off",
			"react/jsx-no-target-blank": "off",
		},
	},
];
