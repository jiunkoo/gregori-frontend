## Gregori Frontend

React + TypeScript 기반의 Gregori 프론트엔드 애플리케이션입니다.  
개발 및 빌드는 Vite를 사용하며, 백엔드 API(`http://localhost:8080`)와 연동됩니다.

### 🔧 1. 요구 사항 (Prerequisites)

아래 환경이 필요합니다.

| **항목** | **권장 버전**     |
| -------- | ----------------- |
| Node.js  | LTS 18.x 이상     |
| npm      | Node.js 기본 포함 |

- **버전 확인**

```bash
node -v
npm -v
```

### 📦 2. 프로젝트 다운로드 및 설치

로컬 환경에 프로젝트를 준비합니다.

```bash
git clone <레포지토리 URL>
cd gregori-frontend
npm install
```

또는 이미 프로젝트가 다운로드되어 있다면:

```bash
cd /Users/koubit/Workspace/gregori-frontend
npm install
```

### ⚙️ 3. 환경 설정 (Environment Setup)

- **기본 설정**

  - 개발 서버 포트: `3000`

- **API 프록시**

  - `/api` 요청은 `http://localhost:8080` 으로 자동 프록시됩니다.
  - 예: `/api/members` → `http://localhost:8080/members`

- **(선택) 환경 변수 파일 생성**

  - 루트 디렉터리에 `.env` 파일을 생성해 환경 변수를 추가할 수 있습니다.

  예시 (`.env`):

  ```bash
  VITE_API_BASE_URL=http://localhost:8080
  VITE_APP_ENV=local
  ```

  - **참고**: Vite는 `VITE_` prefix 가 있는 환경 변수만 클라이언트 코드에서 사용할 수 있습니다.

### ▶️ 4. 실행 방법 (Run Instructions)

1. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 아래 주소로 접속:

   - `http://localhost:3000`

2. **프로덕션 빌드**

   ```bash
   npm run build
   ```

   - TypeScript 타입 체크 후 Vite 빌드를 실행합니다.
   - 빌드 결과물은 `dist/` 디렉터리에 생성됩니다.

3. **빌드 결과물 미리보기**

   ```bash
   npm run preview
   ```

   - 실제 배포 버전과 동일하게 동작하며, 기본 URL은 보통:
     - `http://localhost:4173`

4. **Lint 검사**

   ```bash
   npm run lint
   ```

   - 코드 스타일 및 정적 분석을 수행합니다.

### 📁 5. 주요 기술 스택

- **React 18**
- **TypeScript**
- **Vite** (Dev Server & Bundler)
- **Zustand** (State Management)
- **Axios** (HTTP Client)
- **React Router DOM** (Routing)

### 📂 6. 디렉터리 구조 요약

```text
src/
├── app/      # 엔트리포인트 & 글로벌 스타일
├── api/      # API 모듈 및 Axios 설정
├── features/ # 도메인별 UI & 비즈니스 로직
├── stores/   # Zustand 스토어
├── models/   # 타입 및 모델 정의
└── utils/    # 공용 유틸 함수
```

### 🔗 7. 경로 별칭 (Import Alias)

| **Alias**     | **실제 경로**               |
| ------------- | --------------------------- |
| `@`           | `./src`                     |
| `@components` | `./src/features/components` |
| `@api`        | `./src/api`                 |
| `@stores`     | `./src/stores`              |
| `@models`     | `./src/models`              |

- **예시**

```ts
import { memberAPI } from "@api/members";
import { useAuthStore } from "@stores/auth";
import Header from "@components/Header";
```

### 🧪 8. 로컬 실행 체크리스트

문제가 생기면 아래를 순서대로 확인하세요.

- **Node 버전 확인**

  ```bash
  node -v
  ```

- **백엔드 서버(`http://localhost:8080`)가 실행 중인지 확인**

  - 프론트엔드는 `/api` 요청을 자동으로 백엔드로 전달합니다.

- **포트 충돌 여부 확인 (3000 포트)**

  ```bash
  lsof -i :3000
  ```

- **필요 시 개발 서버 포트 변경 (`vite.config.ts`)**

  ```ts
  server: {
    port: 3001,
  }
  ```

### 📝 9. 추가 문서 확장 계획

향후 아래와 같은 문서를 추가로 확장할 수 있습니다.

- **API 문서**
- **화면 구조 / 플로우 문서**
- **테스트 전략 (Storybook, e2e 등)**

필요에 따라 해당 섹션을 별도 문서로 분리하거나 본 문서에 상세 내용을 추가할 수 있습니다.
