import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // ▼▼▼ 여기부터 추가된 설정입니다 ▼▼▼
  {
    rules: {
      // 'any' 타입을 써도 에러 안 나게 하기
      "@typescript-eslint/no-explicit-any": "off",
      // 안 쓰는 변수 있어도 에러 안 나게 하기
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;