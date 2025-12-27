// @ts-check
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  // eslint.configs.recommended, // Закомментировано для отключения линтинга
  // ...tseslint.configs.recommendedTypeChecked, // Закомментировано для отключения линтинга
  // eslintPluginPrettierRecommended, // Закомментировано для отключения линтинга
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // {
  //   rules: {
  //     '@typescript-eslint/no-explicit-any': 'off',
  //     '@typescript-eslint/no-floating-promises': 'warn',
  //     '@typescript-eslint/no-unsafe-argument': 'warn',
  //     "prettier/prettier": ["error", { endOfLine: "auto" }],
  //   },
  // },
);
