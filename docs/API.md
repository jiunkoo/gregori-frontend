## Gregori Frontend API 문서

프론트엔드에서 사용하는 주요 HTTP API 엔드포인트를 정리한 문서입니다.  
이 문서의 내용은 `src/api/*.ts` 모듈을 기준으로 작성되었습니다.

### 1. 공통 사항

- **Base URL**
  - 로컬 개발 기준: `http://localhost:8080`
  - 프론트엔드에서는 `/api/...` 로 호출하며, Vite 프록시를 통해 백엔드로 전달됩니다.
- **경로 Prefix**
  - 모든 API는 `/api` 로 시작합니다. 예: `/api/auth/signin`
- **인증 & 쿠키**
  - Axios 인스턴스(`src/api/axios.ts`)는 `withCredentials: true` 로 설정되어 있어,  
    **세션 쿠키 기반 인증**을 사용하는 API와 연동됩니다.
- **헤더**
  - 기본 `Content-Type: application/json` 을 사용합니다.
- **에러 처리**
  - API 함수는 `axios` 의 `response.data` 를 그대로 반환합니다.
  - 프로젝트 내에서는 필요 시 `utils/result.ts` 의 `toResult` 등을 사용해 에러를 래핑할 수 있습니다.

---

### 2. 인증(Auth) API (`authAPI`)

파일: `src/api/auth.ts`

| 기능     | 메서드 | 경로                | 요청 본문 타입  | 설명            |
| -------- | ------ | ------------------- | --------------- | --------------- |
| 로그인   | POST   | `/api/auth/signin`  | `AuthSignInDto` | 사용자 로그인   |
| 로그아웃 | POST   | `/api/auth/signout` | -               | 사용자 로그아웃 |

- **요청 바디 예시 (개략)**
  - `AuthSignInDto`: 이메일/아이디, 패스워드 등의 로그인 정보 포함

---

### 3. 회원(Member) API (`memberAPI`)

파일: `src/api/member.ts`

| 기능          | 메서드 | 경로                   | 요청 본문 타입            | 설명                    |
| ------------- | ------ | ---------------------- | ------------------------- | ----------------------- |
| 회원가입      | POST   | `/api/member/register` | `MemberRegisterDto`       | 신규 회원 생성          |
| 내 정보 조회  | GET    | `/api/member`          | -                         | 로그인한 회원 정보 조회 |
| 이름 변경     | POST   | `/api/member/name`     | `MemberNameUpdateDto`     | 회원 이름 변경          |
| 비밀번호 변경 | POST   | `/api/member/password` | `MemberPasswordUpdateDto` | 회원 비밀번호 변경      |
| 회원 탈퇴     | DELETE | `/api/member`          | -                         | 현재 회원 탈퇴          |

- **비고**
  - 대부분 로그인(세션) 상태에서만 사용되는 API로 예상됩니다.

---

### 4. 상품(Product) API (`productAPI`)

파일: `src/api/product.ts`

| 기능           | 메서드 | 경로                | 요청 본문/쿼리 타입               | 설명                |
| -------------- | ------ | ------------------- | --------------------------------- | ------------------- |
| 상품 생성      | POST   | `/api/product`      | `ProductCreateDto`                | 신규 상품 등록      |
| 상품 수정      | PUT    | `/api/product`      | `ProductUpdateDto`                | 기존 상품 정보 수정 |
| 상품 삭제      | DELETE | `/api/product/{id}` | 경로 파라미터 `productId: number` | 상품 삭제           |
| 상품 단건 조회 | GET    | `/api/product/{id}` | 경로 파라미터 `productId: number` | 상품 상세 조회      |
| 상품 목록 조회 | GET    | `/api/product`      | 쿼리 파라미터 (아래 참조)         | 상품 리스트 조회    |

#### 상품 목록 조회 쿼리 파라미터

`getProducts` 함수에서 사용하는 파라미터 (`src/api/product.ts`):

- `keyword?: string` – 검색어 (상품명 등)
- `categoryId?: number` – 카테고리 필터
- `sellerId?: number` – 판매자 필터
- `page?: number` – 페이지 번호
- `sorter?: Sorter` – 정렬 기준 (정의는 `@models` 참고)

요청 예시 (쿼리):

```text
GET /api/product?keyword=coffee&categoryId=1&page=2&sorter=PRICE_ASC
```

---

### 5. 주문(Order) API (`orderAPI`)

파일: `src/api/order.ts`

| 기능                    | 메서드 | 경로                   | 요청 본문/쿼리 타입             | 설명                      |
| ----------------------- | ------ | ---------------------- | ------------------------------- | ------------------------- |
| 주문 생성               | POST   | `/api/order`           | `OrderRequestDto`               | 신규 주문 생성            |
| 주문 취소               | PATCH  | `/api/order/{orderId}` | 경로 파라미터 `orderId: number` | 주문 전체 취소            |
| 주문 상세 상태 업데이트 | PATCH  | `/api/order/detail`    | `OrderDetailStatusUpdateDto`    | 주문 상세(라인) 상태 변경 |
| 주문 단건 조회          | GET    | `/api/order/{orderId}` | 경로 파라미터 `orderId: number` | 특정 주문 상세 조회       |
| 주문 목록 조회          | GET    | `/api/order`           | 쿼리 파라미터 `page?: number`   | 주문 리스트 조회          |

#### 주문 목록 조회 쿼리 파라미터

- `page?: number` – 페이지 번호

예시:

```text
GET /api/order?page=1
```

---

### 6. 카테고리(Category) API (`categoryAPI`)

파일: `src/api/category.ts`

| 기능               | 메서드 | 경로                         | 요청 본문/쿼리 타입                | 설명                          |
| ------------------ | ------ | ---------------------------- | ---------------------------------- | ----------------------------- |
| 카테고리 생성      | POST   | `/api/category`              | `CategoryRequestDto`               | 카테고리 생성 (관리자용)      |
| 카테고리 이름 수정 | POST   | `/api/category/{categoryId}` | `CategoryRequestDto`               | 카테고리 이름 수정 (관리자용) |
| 카테고리 삭제      | DELETE | `/api/category/{categoryId}` | 경로 파라미터 `categoryId: number` | 카테고리 삭제 (관리자용)      |
| 카테고리 단건 조회 | GET    | `/api/category/{categoryId}` | 경로 파라미터 `categoryId: number` | 특정 카테고리 조회            |
| 카테고리 목록 조회 | GET    | `/api/category`              | 쿼리 파라미터 `page?: number`      | 카테고리 리스트 조회          |

#### 카테고리 목록 조회 쿼리 파라미터

- `page?: number` – 페이지 번호

예시:

```text
GET /api/category?page=1
```

---

### 7. 판매자(Seller) API (`sellerAPI`)

파일: `src/api/seller.ts`

| 기능             | 메서드 | 경로                     | 요청 본문/쿼리 타입              | 설명                |
| ---------------- | ------ | ------------------------ | -------------------------------- | ------------------- |
| 판매자 등록      | POST   | `/api/seller`            | `SellerRegisterDto`              | 신규 판매자 등록    |
| 판매자 정보 수정 | PATCH  | `/api/seller`            | `SellerUpdateDto`                | 내 판매자 정보 수정 |
| 판매자 삭제      | DELETE | `/api/seller/{sellerId}` | 경로 파라미터 `sellerId: number` | 판매자 삭제         |
| 판매자 단건 조회 | GET    | `/api/seller/{sellerId}` | 경로 파라미터 `sellerId: number` | 특정 판매자 조회    |
| 판매자 목록 조회 | GET    | `/api/seller`            | 쿼리 파라미터 `page?: number`    | 판매자 리스트 조회  |

#### 판매자 목록 조회 쿼리 파라미터

- `page?: number` – 페이지 번호

예시:

```text
GET /api/seller?page=1
```

---

### 8. 응답 타입 및 모델 참고

- 각 API 함수는 `response.data` 를 그대로 반환합니다.
- 실제 필드 구조는 `src/models/index.ts` 및 관련 Dto/Response 타입 정의를 참고해야 합니다.
- 대표적으로 다음과 같은 타입이 사용됩니다.
  - `AuthSignInDto`
  - `MemberRegisterDto`, `MemberNameUpdateDto`, `MemberPasswordUpdateDto`
  - `ProductCreateDto`, `ProductUpdateDto`, `ProductResponseDto`, `Sorter`
  - `OrderRequestDto`, `OrderResponseDto`, `OrderDetailStatusUpdateDto`
  - `CategoryRequestDto`, `Category`
  - `SellerRegisterDto`, `SellerUpdateDto`, `SellerResponseDto`

---

### 9. 추후 확장 아이디어

- 각 엔드포인트별 **요청/응답 JSON 예시** 추가
- 인증/인가 정책(어떤 역할이 필요한지) 명시
- 에러 코드/메시지 패턴 정리
- 백엔드 실제 스웨거(Swagger) 혹은 OpenAPI 스펙과의 링크 연결
