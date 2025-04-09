import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
const config = [
  ...defaultConfig,
  {
    files: ["**/*.stories.tsx"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
];

export default config;
