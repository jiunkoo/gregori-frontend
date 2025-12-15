## Gregori Frontend

React + TypeScript 기반의 Gregori 프론트엔드 애플리케이션입니다. Vite를 사용해 개발/빌드가 이루어지며, API 서버(`http://localhost:8080`)와 연동되어 동작합니다.

### 요구 사항

- **Node.js**: 권장 버전은 LTS (예: 18.x 이상)
- **npm**: Node.js에 포함된 버전 사용

> 프로젝트 루트 경로: `/Users/koubit/Workspace/gregori-frontend`

### 설치

프로젝트 루트 디렉터리로 이동한 후 의존성을 설치합니다.

```bash
cd /Users/koubit/Workspace/gregori-frontend
npm install
```

### 환경 설정

- **Vite 개발 서버 포트**: `3000`
- **API 프록시**:
  - 프론트엔드에서 `/api`로 호출되는 요청은 `http://localhost:8080`으로 프록시됩니다.
  - 예: `/api/members` → `http://localhost:8080/members`

추가적인 환경 변수 파일(`.env`, `.env.local` 등)은 현재 구성에 따라 필요시 루트 디렉터리에 생성해 사용할 수 있습니다. (예: `VITE_API_BASE_URL` 등)

### 실행 명령어

`package.json`에 정의된 스크립트는 다음과 같습니다.

- **개발 서버 실행**

  ```bash
  npm run dev
  ```

  기본적으로 `http://localhost:3000` 에서 애플리케이션을 확인할 수 있습니다.

- **프로덕션 빌드**

  ```bash
  npm run build
  ```

  - TypeScript 타입 체크(`tsc`) 후 Vite 빌드가 수행됩니다.
  - 빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

- **빌드 결과물 미리보기**

  ```bash
  npm run preview
  ```

  - `npm run build` 후 실행하면, 로컬에서 프로덕션 빌드 결과를 확인할 수 있습니다.

- **Lint 검사**

  ```bash
  npm run lint
  ```

  - ESLint를 사용해 `ts`, `tsx` 파일에 대한 정적 분석을 수행합니다.

### 주요 기술 스택

- **프레임워크**: React 18
- **언어**: TypeScript
- **번들러/개발 서버**: Vite
- **상태 관리**: Zustand
- **HTTP 통신**: Axios
- **라우팅**: React Router DOM

### 디렉터리 구조 (요약)

- **`src/app`**: 진입점 및 전역 스타일, 루트 `App` 컴포넌트
- **`src/features`**: 도메인별(인증, 상품, 주문, 마이페이지 등) UI 및 로직
- **`src/api`**: Axios 인스턴스 및 각 도메인별 API 모듈
- **`src/stores`**: Zustand를 이용한 전역 상태 스토어
- **`src/models`**: 타입 정의 및 공용 모델
- **`src/utils`**: 공용 유틸리티 함수

### 개발 시 참고 사항

- **경로 별칭(Alias)**:
  - `@` → `./src`
  - `@components` → `./src/features/components`
  - `@api` → `./src/api`
  - `@stores` → `./src/stores`
  - `@models` → `./src/models`

  Vite 설정(`vite.config.ts`)에서 위와 같이 정의되어 있으므로, import 시 절대 경로 형태로 사용할 수 있습니다.

### 기타

- 이 문서는 기본적인 실행/환경 정보를 담고 있으며, 추후 기능별 사용법이나 화면 구조 등 추가 문서를 확장해 나갈 수 있습니다.


