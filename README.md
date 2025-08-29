# 🚀 Reserve Action

> **워크플로우 예약 및 자동화 서버**  
> 특정 시점에 GitHub Actions 워크플로우를 실행하여, 원하는 시간에 배포와 같은 작업을 자동화할 수 있는 예약 서버입니다.

---

## ✨ 주요 기능

- 🔗 **GitHub 워크플로우 연동**: Public / Private 레포지토리 모두 지원
- 🗓️ **배포 스케줄링**: 달력과 시간 선택으로 원하는 시점에 예약 가능
- 📋 **스케줄 관리**: 예약된 배포 확인 및 삭제 기능 제공
- 🔒 **안전한 인증**: Google OAuth 2.0 기반 로그인

---

## 🛠️ 기술 스택

- **Framework**: [Nuxt.js](https://nuxt.com/) (Vue.js + Nitro)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose)
- **Authentication**: Google OAuth 2.0
- **UI**: [shadcn-vue](https://shadcn-vue.com/), Tailwind CSS
- **Package Manager**: pnpm

---

## 📦 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/reserve_action.git
cd reserve_action
```

### 2. 종속성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 값을 채워주세요:

```env
PORT=3000
DB_URL=mongodb://localhost:27017
DB_NAME=reserve_action

SESSION_PASSWORD=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GH_PAT=your_github_pat
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

➡️ 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📝 사용 방법

1. Google 계정으로 로그인
2. **Schedule Add** 페이지에서 배포 예약 등록
3. 날짜와 시간을 선택 후 **Add** 버튼 클릭
4. **Schedules** 페이지에서 예약 확인 및 관리
5. 예약된 시간이 되면 GitHub Actions 워크플로우 자동 실행

---

## 📸 스크린샷
