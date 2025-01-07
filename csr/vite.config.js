import { resolve } from "path";
//vite.config.js
export default {
  build: {
    minify: false,
    modulePreload: {
      polyfill: false,
    },
  },
  lib: {
    // 라이브러리의 진입점 파일 위치 지정
    entry: resolve(__dirname, "lib/main.js"),

    // 전역 변수로 사용될 때의 이름 (UMD 빌드에서 사용)
    name: "index",

    // 출력될 파일 이름 (예: my-lib.js, my-lib.umd.js)
    fileName: "my-lib",
  },
};
