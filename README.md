# Reserve Action

**배포 예약 및 자동화 서비스**

특정 시점에 외부 GitHub 레포지토리의 워크플로우(GitHub Actions)를 실행시켜, 원하는 시간에 배포와 같은 작업을 진행할 수 있도록 돕는 예약 서버입니다.

## ✨ 주요 기능

- **GitHub 워크플로우 연동**: Public 또는 Private 레포지토리의 GitHub Actions 워크플로우를 원격으로 트리거할 수 있습니다.
- **배포 스케줄링**: 달력과 시간 선택 기능을 통해 원하는 날짜와 시간에 배포 작업을 예약할 수 있습니다.
- **스케줄 관리**: 예약된 배포 목록을 한눈에 확인하고, 필요 없는 스케줄을 삭제할 수 있습니다.
- **안전한 인증**: Google OAuth 2.0을 이용한 로그인을 통해 안전하게 서비스를 이용할 수 있습니다.

## 🛠️ 기술 스택

- **Framework**: [Nuxt.js](https://nuxt.com/) (Vue.js, Nitro)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth 2.0
- **UI**: shadcn-vue, Tailwind CSS
- **Package Manager**: pnpm

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/reserve_action.git
cd reserve_action
```

### 2. 종속성 설치

pnpm을 사용하여 프로젝트 종속성을 설치합니다.

```bash
pnpm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 내용을 채워주세요.

```env
PORT=
DB_URL=
DB_NAME=

SESSION_PASSWORD=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=


GH_PAT=
GITHUB_OWNER=
GITHUB_REPO=
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

이제 브라우저에서 `http://localhost:3000`으로 접속하여 서비스를 확인할 수 있습니다.

## 📝 사용 방법

1.  Google 계정으로 로그인합니다.
2.  **Schedule Add** 페이지로 이동합니다.
3.  배포를 원하는 날짜와 시간을 선택합니다.
4.  `Add` 버튼을 눌러 스케줄을 등록합니다.
5.  등록된 스케줄은 **Schedules** 페이지에서 확인할 수 있습니다.

이제 예약된 시간이 되면 서버가 자동으로 해당 GitHub 레포지토리의 워크플로우를 실행합니다.
