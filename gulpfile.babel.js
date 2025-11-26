import gulp from "gulp";
import del from "del";
import ws from "gulp-webserver";
import fileinclude from "gulp-file-include";
import replace from "gulp-replace";

// 경로 설정
const routes = {
  html: {
    watch: ["src/*.html", "src/components/**/*.html", "src/common/**/*.html"],
    src: "src/*.html", // 루트의 HTML 파일만 빌드 (include용 파일 제외)
    dest: "app"
  }
};

// HTML 처리 (파일 include + 절대 경로 변환)
const html = () =>
  gulp
    .src(routes.html.src)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    // 상대 경로를 절대 경로로 변환
    .pipe(replace(/src="assets\//g, 'src="/assets/'))
    .pipe(replace(/href="assets\//g, 'href="/assets/'))
    .pipe(replace(/url\(['"]?assets\//g, "url('/assets/"))
    .pipe(replace(/url\(['"]?\.\.\/images\//g, "url('/assets/images/"))
    .pipe(replace(/background-image:\s*url\(['"]?assets\//g, "background-image: url('/assets/"))
    // srcset 처리: srcset 내의 모든 assets/를 /assets/로 변환
    .pipe(replace(/srcset="([^"]*)"/g, (match, p1) => {
      const replaced = p1.replace(/assets\//g, '/assets/');
      return `srcset="${replaced}"`;
    }))
    .pipe(gulp.dest(routes.html.dest));

// HTML 처리 (파일 include + 절대 경로 변환) - 배포용 (개발용과 동일)
const htmlBuild = () =>
  gulp
    .src(routes.html.src)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file"
      })
    )
    // 상대 경로를 절대 경로로 변환
    .pipe(replace(/src="assets\//g, 'src="/assets/'))
    .pipe(replace(/href="assets\//g, 'href="/assets/'))
    .pipe(replace(/url\(['"]?assets\//g, "url('/assets/"))
    .pipe(replace(/url\(['"]?\.\.\/images\//g, "url('/assets/images/"))
    .pipe(replace(/background-image:\s*url\(['"]?assets\//g, "background-image: url('/assets/"))
    // srcset 처리: srcset 내의 모든 assets/를 /assets/로 변환
    .pipe(replace(/srcset="([^"]*)"/g, (match, p1) => {
      const replaced = p1.replace(/assets\//g, '/assets/');
      return `srcset="${replaced}"`;
    }))
    .pipe(gulp.dest(routes.html.dest));

// 웹서버 실행
const webserver = () =>
  gulp.src("app").pipe(
    ws({
      livereload: true,
      open: true,
      port: 8081
    })
  );

// 빌드 폴더 정리
const clean = () => del(["app/", ".publish"]);

// 파일 변경 감시
const watch = () => {
  // HTML: 루트 파일과 include용 파일 모두 감시 (include용 파일 변경 시에도 루트 파일 재빌드)
  gulp.watch(routes.html.watch, html);
};

// 에셋 빌드 (개발용)
const assets = gulp.series([html]);

// 에셋 빌드 (배포용)
const assetsBuild = gulp.series([htmlBuild]);

// 라이브 서버 (웹서버 + 감시)
const live = gulp.parallel([webserver, watch]);

// 개발 모드 (빌드 + 라이브 서버)
export const dev = gulp.series([assets, live]);

// 앱 빌드 - 개발용
export const app = gulp.series([assets]);

// 앱 빌드 - 배포용 (절대 경로)
export const appBuild = gulp.series([assetsBuild]);

// 빌드 (앱 빌드 + 라이브 서버) - 개발용
export const build = gulp.series([app, live]);

// 배포 (앱 빌드 + 절대 경로 변환)
export const deploy = gulp.series([appBuild]);

// 기본 작업
export default dev;

