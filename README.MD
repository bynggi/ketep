# HTML Project

Gulp 4.0 기반의 HTML 프로젝트 빌드 시스템입니다.

## 프로젝트 구조

```
html-project/
├── src/                    # 소스 파일
│   ├── scss/              # SCSS 파일
│   ├── js/                # JavaScript 파일
│   ├── assets/            # 정적 파일 (이미지, 폰트, 비디오)
│   ├── include/           # HTML include 파일
│   └── index.html         # 메인 HTML 파일
├── app/                   # 빌드 결과물 (자동 생성)
├── gulpfile.babel.js      # Gulp 빌드 설정
└── package.json           # 프로젝트 의존성
```

## 설치

```bash
npm install
```

## 사용법

### 개발 모드
웹서버를 실행하고 파일 변경을 자동으로 감시합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:8081`로 접속할 수 있습니다.

### 빌드
프로덕션용 빌드를 생성합니다.

```bash
npm run build
```

### 배포
빌드된 파일을 배포합니다.

```bash
npm run deploy
```

### 정리
빌드 폴더를 삭제합니다.

```bash
npm run clean
```

## 주요 기능

- **SCSS 컴파일**: SCSS를 CSS로 컴파일하고 최적화
- **HTML Include**: `@@include()` 문법으로 HTML 파일 분리 및 재사용
- **자동 새로고침**: 파일 변경 시 브라우저 자동 새로고침
- **CSS 최적화**: Autoprefixer 및 CSS 최소화
- **정적 파일 처리**: 이미지, 폰트, 비디오 자동 복사

## HTML Include 사용법

HTML 파일에서 다른 파일을 포함하려면:

```html
@@include('include/header.html')
```

## 스크립트

- `npm run dev`: 개발 모드 실행
- `npm run build`: 프로덕션 빌드
- `npm run deploy`: 배포
- `npm run clean`: 빌드 폴더 정리
