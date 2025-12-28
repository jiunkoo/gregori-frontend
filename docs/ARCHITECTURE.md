## Gregori Frontend 아키텍처 개요

Gregori Frontend는 **React + TypeScript + Vite** 기반의 SPA(single-page application)입니다.  
도메인(feature) 기반으로 디렉터리를 구성하고, **React Router**로 라우팅을, **Zustand**로 전역 인증 상태를 관리합니다.

---

### 1. 전체 디렉터리 구조 (요약)

애플리케이션의 핵심 코드는 `src/` 디렉터리에 위치합니다.

```text
src/
├── app/         # 진입점 및 루트 App 컴포넌트
├── api/         # Axios 인스턴스 및 도메인별 API 모듈
├── features/    # 도메인(화면) 단위 UI 및 비즈니스 로직
├── models/      # 공용 타입(Dto, Response, Enum 등)
├── stores/      # Zustand 전역 상태 스토어
└── utils/       # 공용 유틸 함수 (에러 처리, Result 래핑 등)
```

#### 1-1. `src/features` 구조

```text
src/features/
├── Home.tsx                # 메인 홈 화면
├── Header.tsx (+ *.css)    # 공통 헤더
├── Layout.tsx (+ *.css)    # 공통 레이아웃
├── auth/                   # 로그인/회원가입 관련 화면
├── products/               # 상품 목록/상세
├── orders/                 # 주문/주문 확인/주문 목록/상세
└── mypage/                 # 마이페이지 및 프로필/비밀번호 수정
```

- 각 하위 폴더는 보통 다음 파일들로 구성됩니다.
  - **`*.tsx`**: 화면/컴포넌트
  - **`*.constants.ts`**: 화면에서 사용하는 상수/텍스트
  - **`*.css`**: 해당 화면 전용 스타일

---

### 2. 진입점 및 라우팅 구조

#### 2-1. 루트 컴포넌트 (`src/app/App.tsx`)

- `BrowserRouter` + `Routes` 를 사용하여 전체 라우팅을 관리합니다.
- 주요 경로:
  - `/` → `Home`
  - `/login` → `Login`
  - `/register` → `Register`
  - `/products` → `ProductList`
  - `/products/:productId` → `ProductDetail`
  - `/order` → `Order` (**로그인 필요**)
  - `/order-confirm` → `OrderConfirm` (**로그인 필요**)
  - `/mypage` → `MyPage` (**로그인 필요**)
  - `/mypage/profile` → `MyPageProfileEdit` (**로그인 필요**)
  - `/mypage/password` → `MyPagePasswordEdit` (**로그인 필요**)
  - `/orderlist` → `OrderListPage` (**로그인 필요**)
  - `/orderdetail/:orderId` → `OrderDetail` (**로그인 필요**)
  - 그 외(`*`) → `/` 로 리다이렉트

#### 2-2. 인증 초기화 (`AuthInitializer`)

- 앱 렌더 직후 **한 번** 현재 로그인 상태를 확인합니다.
  - `memberAPI.getMember()` 호출 결과를 `toResult` 유틸로 감싸 에러를 처리합니다.
  - 성공 시 `useAuthStore.setUser` 로 `SessionMember`를 저장하고, 실패 시 인증되지 않은 상태로 간주합니다.
- 이 과정을 통해 **새로고침 후에도 세션 쿠키 기반 로그인 상태를 복원**합니다.

#### 2-3. 보호 라우트 (`ProtectedRoute`)

- `useAuthStore` 에서 `isAuthenticated`, `isAuthChecked` 값을 읽어와 라우트를 보호합니다.
  - `isAuthChecked === false` 인 동안은 아무것도 렌더하지 않습니다(초기 체크 중).
  - `isAuthenticated === false` 인 경우 `/login` 으로 리다이렉트합니다.
  - 그 외에는 자식 컴포넌트를 그대로 렌더링합니다.
- 로그인 필요 페이지는 모두 `ProtectedRoute`로 감싸서 접근 제어를 통일합니다.

---

### 3. 레이아웃 구조

#### 3-1. 공통 레이아웃 (`src/features/Layout.tsx`)

- 페이지 공통 골격(헤더, 마이페이지 사이드바 등)을 담당하는 컴포넌트입니다.
- 주요 props:
  - `children`: 실제 페이지 콘텐츠
  - `showNav?: boolean` – 헤더 내 네비게이션 표시 여부 (기본값: `true`)
  - `showMyPageSidebar?: boolean` – 마이페이지 사이드바 표시 여부

- 렌더링 패턴:
  - `showMyPageSidebar === true`
    - 상단에 `Header(showNav={false})` 를 두고,
    - 좌측에 `MyPageSidebar`, 우측에 실제 페이지 콘텐츠를 배치합니다.
  - 그 외
    - `Header(showNav={showNav})` + 메인 콘텐츠 영역만 렌더링합니다.

#### 3-2. 공통 헤더 & 마이페이지 사이드바

- `Header` 컴포넌트는 글로벌 네비게이션, 로그인/로그아웃, 마이페이지 등 상단 공통 영역을 담당합니다.
- `MyPageSidebar` 는 마이페이지 내 서브 네비게이션(프로필/비밀번호/주문 내역 등)을 담당합니다.

각 페이지 컴포넌트는 상황에 맞게 `Layout`을 감싸 사용하는 방식으로 화면 구조가 일관되게 유지됩니다.

---

### 4. 상태 관리 (Zustand)

#### 4-1. 인증 스토어 (`src/stores/authStore.ts`)

```ts
export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isAuthChecked: false,
  // ...
}));
```

- **상태 필드**
  - `user: SessionMember | null` – 로그인한 사용자 정보
  - `isAuthenticated: boolean` – 로그인 여부
  - `error: string | null` – 인증 관련 에러 메시지
  - `isAuthChecked: boolean` – 초기 인증 체크 완료 여부

- **액션**
  - `setUser(user)` – `user`, `isAuthenticated`, `isAuthChecked` 를 동시에 갱신
  - `setError(error)` – 에러 메시지 설정
  - `setAuthChecked(checked)` – 초기 인증 체크 완료 플래그 설정
  - `logout()` – 서버에 회원 탈퇴(로그아웃 의미) 요청 후, 로컬 인증 상태 초기화
  - `hasAuthority(authority)` – `Authority` 값에 따라 권한 보유 여부를 계산

- `logout` 구현 시에는:
  - `memberAPI.deleteMember()` 를 `toResult` 로 감싸 호출하고,
  - 실패 시 `getApiErrorMessage` 로 사용자 친화적인 메시지를 생성해 `error`에 저장한 뒤,
  - 최종적으로 로컬 상태를 초기화합니다.

---

### 5. API 계층

- 모든 HTTP 호출은 `src/api/axios.ts` 에 정의된 Axios 인스턴스를 통해 이루어집니다.

```ts
const api = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
```

- 각 도메인별 API 모듈:
  - `authAPI` (`src/api/auth.ts`)
  - `memberAPI` (`src/api/member.ts`)
  - `productAPI` (`src/api/product.ts`)
  - `orderAPI` (`src/api/order.ts`)
  - `categoryAPI` (`src/api/category.ts`)
  - `sellerAPI` (`src/api/seller.ts`)

각 API 함수는 `response.data`만 반환하도록 통일되어 있으며, 상세 엔드포인트/파라미터는 `docs/API.md`에 정리되어 있습니다.

---

### 6. 유틸리티 & 에러 처리

#### 6-1. `Result` 유틸 (`src/utils/result.ts`)

- 비동기 호출을 `Result<T>` 타입으로 래핑해, `try/catch` 를 호출부에 노출하지 않고 에러를 핸들링하기 위한 유틸입니다.

```ts
export type Result<T, E = unknown> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export async function toResult<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const value = await promise;
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error };
  }
}
```

- 사용 예시:
  - `AuthInitializer`에서 `memberAPI.getMember()` 호출 결과를 `toResult`로 감싸, 에러 상황에서도 앱이 깨지지 않고 정상 흐름을 이어갈 수 있도록 합니다.

#### 6-2. 에러 메시지 매핑 (`src/utils/error.ts`)

- Axios 에러/서버 에러를 사용자에게 보여줄 수 있는 메시지로 변환하는 책임을 가지며,
  주로 `authStore.logout` 등에서 사용됩니다.

---

### 7. 스타일링 전략

- 각 기능(페이지)별로 대응되는 `.css` 파일을 두어, **기능 단위로 스타일을 분리**합니다.
  - 예: `ProductList.tsx` ↔ `ProductList.css`
  - 예: `MyPage.tsx` ↔ `MyPage.css`
- `Layout.css`, `Header.css`, `common.css` 등은 여러 화면에서 공통으로 재사용되는 스타일을 정의합니다.

---

### 8. 확장 시 참고 사항

- **새 도메인/화면 추가**
  - `src/features/{domain}/` 폴더를 생성하고, `*.tsx`, `*.css`, `*.constants.ts` 를 함께 두는 패턴을 유지합니다.
  - 필요 시 `src/api/{domain}.ts`, 관련 Dto/타입을 `src/models`에 추가합니다.
  - 라우팅은 `src/app/App.tsx` 에 경로를 추가하고, 로그인 필요 여부에 따라 `ProtectedRoute` 사용 여부를 결정합니다.

- **전역 상태 추가**
  - 인증 이외의 전역 상태가 필요하다면, `src/stores/` 아래에 새로운 Zustand 스토어를 생성하는 패턴을 따릅니다.

이 문서는 전체 구조를 빠르게 이해하기 위한 개요이며, 개별 API나 화면 흐름에 대한 상세 내용은 `README.md`, `docs/API.md` 및 각 feature 파일을 참고하면 됩니다.



