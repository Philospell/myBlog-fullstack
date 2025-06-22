# MyBlog Fullstack 프로젝트 진행 기록

**목표**: MySQL + Node.js + React를 이용해  
RESTful 설계 기반의 실제 동작하는 블로그를 만들어보며  
프론트/서버/DB의 전반적인 기초를 모두 다뤄보는 프로젝트입니다.

---

# 🧾 블로그 프로젝트 진행 로그 (최신순)

---

## ✅ 12일차 (2025.06.22 · 일요일)

### 📌 진행 내용

- 클라이언트 라우팅 구성 (react-router-dom)
    - BrowserRouter, <Routes>, <Route> 기본 구성
    - /posts/:id 경로에 따라 PostDetail 컴포넌트로 이동
- 클라이언트에서 /posts/:id API 호출 구현 및 화면 출력
- 서버 /posts/:id 라우트 수정
    - users.nickname을 author로 함께 반환하도록 JOIN 쿼리 작성
- 클라이언트에서 author, title, content를 PostDetail 페이지에서 확인 가능하게 구현
- 새로고침 시 에러 해결: Webpack의 publicPath: '/' 설정으로 SPA 경로 보완
- SQL의 JOIN, INNER JOIN, LEFT JOIN, RIGHT JOIN 개념 및 동작 방식 학습
- 삭제된 사용자와의 관계에서 INNER JOIN과 LEFT JOIN의 차이 이해

### ❓ 핵심 질문 요약

<details>
<summary>🟠 새로고침 시 bundle.js 오류가 났던 이유는 무엇인가요?</summary>
<b>답변:</b> Webpack 설정에서 <code>publicPath: '/'</code>를 명시하지 않으면, 동적 라우팅 주소(`/posts/3`)가 HTML이 아닌 JS로 인식되지 않아 발생합니다.
</details>

<details>
<summary>🟠 `export default const PostDetail`은 왜 에러가 나나요?</summary>
<b>답변:</b> JavaScript 문법상 <code>export default</code>는 선언이 아닌 <code>값</code>에 써야 하므로, <code>const PostDetail = () => {}</code> 다음 <code>export default PostDetail</code>처럼 분리해야 합니다.
</details>

<details>
<summary>🟠 React 17 이후에는 `import React from 'react'`를 생략해도 되지 않나요?</summary>
<b>답변:</b> 맞지만, Babel 설정에 따라 여전히 필요한 경우도 있음. 문제가 생긴다면 명시적으로 넣는 것이 안전합니다.
</details>


<details>
<summary>🟠 `/posts/:id` 요청에서 작성자의 nickname을 어떻게 함께 가져오나요?</summary>
<b>답변:</b> `posts.user_id`와 `users.id`를 기준으로 <code>INNER JOIN</code> 하여 <code>users.nickname</code>을 <code>author</code>로 받아옵니다.
</details>

<details>
<summary>🟠 INNER JOIN과 LEFT JOIN의 차이는 무엇인가요?</summary>
<b>답변:</b> <code>INNER JOIN</code>은 양쪽 테이블 모두에 데이터가 있어야 결과에 포함되며, <code>LEFT JOIN</code>은 왼쪽 테이블 기준으로 오른쪽이 없으면 <code>NULL</code>로 채웁니다.
</details>

<details>
<summary>🟠 삭제된 유저의 글이 남아있다면 INNER JOIN으로는 어떻게 되나요?</summary>
<b>답변:</b> <code>INNER JOIN</code>에서는 해당 글이 조회되지 않습니다. 유저 정보가 없기 때문입니다.
</details>

---

## ✅ 11일차 (2025.06.21 · 토요일)

### 📌 진행 내용

- 클라이언트에서 실제 API 호출 (`GET /posts`)하여 게시글 목록 표시
- 클라이언트 코드에서 `import/export` 사용 시 type: commonjs 세팅 오류 해결
- Webpack dev server와 Node 서버가 각각 3001, 3000 포트에서 정상 구동 확인
- CORS 정책과 브라우저-서버 간 보안 흐름에 대한 개념 완전 정리
- 서버에서 `cors` 미들웨어 적용 (`Access-Control-Allow-Origin`) - 3001번 포트 오픈
- 개발 환경에서 서로 다른 포트를 사용하는 클라이언트-서버 구성 실습
- CORS 관련 흐름도와 네트워크 레벨 동작 방식에 대한 이해 완료

### ❓ 핵심 질문 요약

<details>
<summary>🟠 CORS는 서버 보안 설정인가요, 브라우저 보안 장치인가요?</summary>
<b>답변:</b> CORS는 <b>브라우저 보안 정책</b>으로, 서버는 그에 맞춰 응답 헤더를 내려줄 뿐입니다.
</details>

<details>
<summary>🟠 서버에서 CORS를 허용하면 뭐가 문제인가요?</summary>
<b>답변:</b> 악성 사이트가 사용자 브라우저를 통해 무단 요청을 시도할 수 있습니다. 이를 막기 위해 서버는 <code>Access-Control-Allow-Origin</code>을 제한적으로 설정해야 합니다.
</details>

<details>
<summary>🟠 브라우저가 CORS 응답을 검사하는 타이밍은 언제인가요?</summary>
<b>답변:</b> 요청을 보낸 후 응답 헤더에서 <code>Access-Control-Allow-Origin</code>을 확인해, 허용되지 않으면 JS 실행을 차단합니다.
</details>

<details>
<summary>🟠 오픈 API 서버는 CORS 어떻게 설정하나요?</summary>
<b>답변:</b> 오픈 API 서버는 일반적으로 CORS를 모두 허용하되, 인증을 위해 API Key나 OAuth 등을 요구합니다.
</details>

<details>
<summary>🟠 OAuth도 탈취 위험이 있나요?</summary>
<b>답변:</b> 네. OAuth 토큰이 탈취되면 타인의 권한으로 접근할 수 있습니다. HTTPS 등으로 보호 필요.
</details>

---


## ✅ 10일차 (2025.06.19 · 목요일)

### 📌 진행 내용

- 기존 server/ 하위에서 Git만 구성되어 있던 구조를 루트 기준의 Git 프로젝트로 재정비
- client/ 폴더를 수동으로 생성하여 server/와 나란히 위치하도록 변경 (Fullstack 디렉토리 구조 완성)
- 기존 server/.git 제거 후 루트에서 git init → .gitignore 포함 후 GitHub 원격 저장소 연결
- client/ 폴더 하위에 src, public, index.html, index.js 등 직접 구성
- Webpack으로 직접 React 환경 구성, 기본 index.jsx 파일 devserver로 올라오는 것까지 확인.

### ❓ 핵심 질문 요약

<details>
<summary>🟠 기존 Git 저장소(server/.git)는 어떻게 제거하나요?</summary>
<b>답변:</b> <code>rm -rf server/.git</code> 명령어로 삭제. 권한 문제시 <code>sudo</code> 사용.
</details>

<details>
<summary>🟠 Module not found: './src' 오류는 왜 발생했나요?</summary>
<b>답변:</b> <code>client/</code> 폴더에 <code>webpack.config.js</code> 파일 이름 오류를 내서 Webpack이 진입점을 찾지 못한 것.
</details>

---

## ✅ 9일차 (2025.06.18 · 수요일)

### 📌 진행 내용

- 로그인 상태 확인 강화
- 같은 계정 재로그인 시 안내 메시지 반환
- 다른 계정 로그인 시 처리 방식 고민
- 존재하지 않는 사용자와 비밀번호 불일치 구분 없이 처리 (보안 강화)
- 서버 로그에서는 디버깅 용도로만 구분 표시

### ❓ 핵심 질문 요약

<details>
<summary>🟠 이미 로그인된 상태에서 또 로그인 시도하면?</summary>
같은 이메일이면 "이미 로그인" 메시지, 다르면 정책에 따라 새 로그인 허용 또는 제한.
</details>

<details>
<summary>🟠 다른 계정으로 로그인 시도하면 어떻게 해야 하지?</summary>
로그아웃 후 재로그인 유도 방식이 일반적.
</details>

<details>
<summary>🟠 다른 계정으로 로그인 시도하면 어떻게 해야 하지?</summary>
로그아웃 후 재로그인 유도 방식이 일반적.
</details>

<details>
<summary>🟠 없는 사용자라고 알려주는 게 보안상 문제 있지 않나?</summary>
맞음. 보통 사용자 유무와 상관없이 같은 에러 메시지로 처리.
</details>


---

## ✅ 8일차 (2025.06.17 · 화요일)

### 📌 진행 내용

게시글 수정 및 삭제 기능

| HTTP Method | URL           | 설명             |
|-------------|---------------|------------------|
| `PUT`       | `/posts/:id`  | 게시글 수정      |
| `DELETE`    | `/posts/:id`  | 게시글 삭제      |

- 로그인한 사용자만 본인의 게시글 수정/삭제 가능
- 존재하지 않는 게시글은 `404`, 권한 없는 경우 `403` 반환
- 에러 핸들링은 `try/catch` + `next(err)` 구조로 처리
- `updated_at`은 `NOW()`로 갱신

---

## ✅ 7일차 (2025.06.15 · 일요일)

### 📌 진행 내용

- `GET /posts` 게시글 전체 조회 구현
- `GET /posts/:id` 게시글 상세 조회 구현
- RESTful 설계 철학에 따라 조회 API는 로그인 없이 접근 가능
- `[rows] = await db.promise().query(...)` 구조 분해 방식 학습
- `db.query()` vs `db.execute()` 차이 학습
- `mysql2/promise`를 사용하여 async/await 적용
- 전역 에러 및 404 처리 라우터 추가
- `next(err)`로 에러를 전파하는 방식 학습
- `app.listen(...)` → 서버를 실제로 실행
- `app.use(...)` → 요청 처리 방식 등록

### ❓ 핵심 질문 요약

<details>
<summary>🟠 :id는 약속된 문법인가?</summary>
Express에서 `:id`는 `req.params.id`로 자동 매핑되는 URL 파라미터 문법입니다.
</details>

<details>
<summary>🟠 db.query() vs db.execute() 차이?</summary>
`query()`는 일반 쿼리 실행, `execute()`는 prepared statement로 SQL 인젝션 방지에 유리합니다.
</details>

<details>
<summary>🟠 mysql2/promise는 왜 쓰는가?</summary>
콜백 기반 대신 async/await 문법을 사용할 수 있도록 도와줍니다.
</details>

<details>
<summary>🟠 [rows]만 구조분해 해도 되는 이유?</summary>
`query()`는 `[rows, fields]`를 반환하며, 보통 `rows`만 필요합니다.
</details>

<details>
<summary>🟠 게시글 조회는 로그인 필요 없나?</summary>
공개 API이므로 로그인 없이도 접근 가능합니다.
</details>

<details>
<summary>🟠 예상치 못한 에러는 어디서 처리?</summary>
`catch → next(err)`로 전역 에러 미들웨어에서 처리합니다.
</details>

<details>
<summary>🟠 app.listen()과 app.use()의 역할은?</summary>
`listen()`은 서버 실행, `use()`는 라우팅 또는 미들웨어 등록 역할입니다.
</details>

---

## ✅ 6일차 (2025.06.14 · 토요일)

### 📌 진행 내용

- `POST /posts` 글 작성 구현
- 로그인된 유저의 세션 정보로 `user_id` 연결
- `isLoggedIn` 미들웨어로 작성 제한
- 게시글 테이블 존재 여부 확인 및 적용

### ❓ 핵심 질문 요약

<details>
<summary>🟠 req.body 구조 분해 실패 원인?</summary>
`express.json()` 미사용 시 body가 파싱되지 않아 undefined입니다.
</details>

<details>
<summary>🟠 express.json() 왜 필요한가?</summary>
`application/json` 형식의 요청 본문을 파싱해 `req.body`에 넣어줍니다.
</details>

<details>
<summary>🟠 브라우저 → 서버 → DB 흐름?</summary>
브라우저 → POST → 서버 → DB → 결과 응답 → 브라우저로 되돌아오는 흐름입니다.
</details>

<details>
<summary>🟠 글 작성 시 유저 정보는 어디서 오나?</summary>
세션에 저장된 로그인된 유저 정보를 사용합니다.
</details>

---

## ✅ 5일차 (2025.06.13 · 금요일)

### 📌 진행 내용

- 로그인 구현 (`POST /login`)
- 로그인 성공 시 세션에 user 저장
- 로그아웃 구현 (`POST /logout`)
- 로그인 여부 미들웨어 `isLoggedIn` 구현
- 세션/쿠키 기반 인증 흐름 파악
- JWT/세션 보안 개념 정리

### ❓ 핵심 질문 요약

<details>
<summary>🟠 세션 ID 탈취 위험은?</summary>
HTTP/비암호화 환경에선 탈취 가능성이 있으며, 이를 방지하려면 HTTPS가 필수입니다.
</details>

<details>
<summary>🟠 인증 = 보안인가?</summary>
아닙니다. 인증은 사용자를 식별하는 절차일 뿐, 보안은 그 이후의 책임입니다.
</details>

<details>
<summary>🟠 세션 ID는 클라이언트 어디 저장?</summary>
브라우저 쿠키에 저장되어 서버로 전송됩니다.
</details>

<details>
<summary>🟠 로그아웃 후에도 쿠키가 남는 이유?</summary>
브라우저는 명시적으로 삭제하지 않는 한 쿠키를 유지합니다.
</details>

<details>
<summary>🟠 set-cookie는 언제 생기나?</summary>
로그인 성공 후 `req.session.user`에 값을 넣을 때 자동으로 생성됩니다.
</details>

---

## ✅ 4일차 (2025.06.12 · 목요일)

### 📌 진행 내용

- `POST /users` 회원가입 구현
- `bcrypt`로 비밀번호 암호화
- `express.json()` 적용
- 회원가입 성공 시 201 응답

### ❓ 핵심 질문 요약

<details>
<summary>🟠 bcrypt.hash(..., 10)의 숫자 의미?</summary>
해시 알고리즘의 반복 횟수 (cost factor)로 보안 난이도입니다.
</details>

<details>
<summary>🟠 req.body 없으면 어떤 문제?</summary>
요청 본문을 파싱하지 못해 서버가 값을 읽지 못합니다.
</details>

<details>
<summary>🟠 비밀번호 해시된 거 기억 안나면?</summary>
직접 로그인은 불가능하지만 DB에서 덮어쓰면 됩니다.
</details>

<details>
<summary>🟠 HTTP 상태코드 언제 어떤 걸 쓰나?</summary>
- 200: 성공  
- 201: 리소스 생성  
- 400: 잘못된 요청  
- 401: 인증 필요  
- 500: 서버 에러
</details>

---

## ✅ 3일차 (2025.06.11 · 수요일)

### 📌 진행 내용

- `app.js` Express 서버 설정 완료
- `server/routes/users.js` 모듈화
- DB 연결 모듈화 및 재사용 가능하게 설정
- 서버 실행 테스트

### ❓ 핵심 질문 요약

<details>
<summary>🟠 파일마다 DB 연결을 해야 하나?</summary>
재사용 가능한 DB 모듈로 분리하면 여러 라우트에서 공유 가능합니다.
</details>

<details>
<summary>🟠 라우터 구조는 어떻게 나누는가?</summary>
기능 단위(users, posts 등)로 routes 폴더에 나눕니다.
</details>

<details>
<summary>🟠 전역 use로 라우터 등록 시 경로 구성은?</summary>
`app.use('/users', usersRouter)`는 `/users/...` 경로에서 동작합니다.
</details>

---

## ✅ 2일차 (2025.06.10 · 화요일)

### 📌 진행 내용

- `users`, `posts` 테이블 생성
- `created_at`, `updated_at` 자동 설정
- `FOREIGN KEY` 설정
- 이메일 수정 테스트

### ❓ 핵심 질문 요약

<details>
<summary>🟠 PRIMARY KEY = FOREIGN KEY 가능?</summary>
일반적으로는 별개이며, 1:1 관계일 때 예외적으로 가능하긴 합니다.
</details>

<details>
<summary>🟠 CURRENT_TIMESTAMP 기능은?</summary>
데이터 생성 또는 갱신 시 자동으로 시간 값을 입력해줍니다.
</details>

<details>
<summary>🟠 외래키 설정 순서는?</summary>
참조 대상 테이블이 먼저 존재해야 외래키 제약조건 설정이 가능합니다.
</details>

<details>
<summary>🟠 이메일 수정 SQL은?</summary>
`UPDATE users SET email='new@email.com' WHERE id=1;`
</details>

---

## ✅ 1일차 (2025.06.09 · 월요일)

### 📌 진행 내용

- 전체 프로젝트 설계 구성
- `myblog` 데이터베이스 생성
- `utf8mb4` 인코딩 설정
- 전체 학습 흐름 목차 설정

### ❓ 핵심 질문 요약

<details>
<summary>🟠 utf8mb4 vs utf8 차이?</summary>
`utf8mb4`는 이모지 포함 모든 유니코드 문자 지원. `utf8`은 3바이트까지만 지원.
</details>

<details>
<summary>🟠 CREATE DATABASE 구문 해석?</summary>
`CHARACTER SET`, `COLLATE` 설정으로 DB 인코딩 방식을 지정합니다.
</details>

<details>
<summary>🟠 로컬 DB로 시작해도 되는가?</summary>
초기 학습 및 테스트에는 로컬이 좋고, 나중에 클라우드로 이전 가능합니다.
</details>