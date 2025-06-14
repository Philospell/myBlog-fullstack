# MyBlog Fullstack 프로젝트 진행 기록

**목표**: MySQL + Node.js + React를 이용해  
RESTful 설계 기반의 실제 동작하는 블로그를 만들어보며  
프론트/서버/DB의 전반적인 기초를 모두 다뤄보는 프로젝트입니다.

---

## 📆 진도 기록 (1일차~6일차)

### ✅ 1일차 (2025-06-09, 월)
- `myblog` 데이터베이스 생성 (`utf8mb4_general_ci`)
- `users` 테이블 생성 (email, password, nickname, created_at 등 포함)
- `id`에 `AUTO_INCREMENT` + `PRIMARY KEY` 지정

### ✅ 2일차 (2025-06-10, 화)
- `posts` 테이블 설계 (title, content, user_id, created_at 등)
- `FOREIGN KEY (user_id)`로 users 테이블과 관계 설정
- `CURRENT_TIMESTAMP` 기본값으로 시간 자동 입력 처리
- `UPDATE` 쿼리 실습 (email 수정)

### ✅ 3일차 (2025-06-11, 수)
- `Express` 기본 서버 구축
- `MySQL`과의 연동 (`mysql2` + 커넥션 풀)
- 폴더 구조 구성 시작: `/routes`, `/db`, `/app.js`
- `POSTMAN`으로 서버 API 요청 테스트 성공

### ✅ 4일차 (2025-06-12, 목)
- POST `/users` API 구현 (회원가입, RESTful 설계 기준)
- `/login` API 구현 (로그인)
- `bcrypt`로 비밀번호 암호화 적용
- `express.json()` 적용 이유 학습 (req.body 파싱)

### ✅ 5일차 (2025-06-13, 금)
- `express-session` 기반 로그인 상태 유지 구현
- 세션 생성 → 쿠키 발급 → 세션 검사 흐름 전체 학습
- `isLoggedIn` 미들웨어 구현 및 적용
- `GET /profile`, `POST /logout` 구현 완료
- 세션 쿠키 유효성 확인 및 postman 테스트
- RESTful 철학 기반 API 설계 원칙 확립

### ✅ 6일차 (2025-06-14, 토)
- `Set-Cookie` 자동 발급 원리 확인
- 세션 파괴 vs 쿠키 삭제 차이 정리
- `res.setHeader()` 직접 처리 대신 라이브러리 자동처리 이해
- 인증 흐름 보안의 본질 개념 정리 (세션 탈취, HTTPS 필요성 등)
- `posts` 테이블 작성 완료 상태 확인
- `POST /posts` 글쓰기 API 구현 완료
  - 로그인된 유저만 가능 (`isLoggedIn` 적용)
  - 제목 + 내용 → DB 저장
  - postman으로 테스트 완료
- 오류 해결 및 `req.body`, `express.json()` 관련 흐름 심화 이해

---

## 🚀 다음 예정: 7일차

- 글 목록 조회 API (`GET /posts`)
- 글 상세 조회 API (`GET /posts/:id`)
- 글 수정 API (`PATCH /posts/:id`)
- 글 삭제 API (`DELETE /posts/:id`)
- 작성자 권한 검증 및 본인 글만 수정/삭제 가능하게 처리