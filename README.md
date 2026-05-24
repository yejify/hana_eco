# 탄소 배출 관리 대시보드 (Hana Eco Dashboard)

제품별 탄소 발자국(Product Carbon Footprint, PCF)을 관리하고 시각화할 수 있는 웹 대시보드입니다.

사용자는 활동 데이터를 직접 입력하거나 Excel 파일을 업로드할 수 있으며, 이를 기반으로 탄소 배출량을 계산하고 차트 및 테이블 형태로 확인할 수 있습니다.

<img width="2880" height="3702" alt="화면 스크린샷" src="https://github.com/user-attachments/assets/249b12fb-e7f0-42d2-ba26-0f7cceb766b1" />

---

# Repository

GitHub: `hana_eco Repository`

---

# 프로젝트 실행 화면

## Dashboard

- 활동 데이터 등록
- 탄소 배출량 계산
- 차트 시각화
- 데이터 테이블 조회
- 수정 / 삭제 기능

## Excel Import

- Excel 파일 업로드
- 데이터 자동 매핑
- 대시보드 자동 반영

---

# 기술 스택

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts

## Backend / Database

- Next.js API Route
- Prisma
- SQLite

## Library

- xlsx

---

# 주요 기능

## 1. 활동 데이터 등록

사용자는 활동 데이터를 직접 입력할 수 있습니다.

### 입력 항목

- 날짜
- 활동 유형
- 설명
- 활동량
- 단위

### 지원 활동 유형

- electricity
- material
- transport
- waste

---

## 2. 탄소 배출량 계산

활동 유형별 배출계수를 기반으로 탄소 배출량을 계산합니다.

### 배출계수

| 활동 유형   | 배출계수 |
| ----------- | -------- |
| electricity | 0.5      |
| material    | 0.3      |
| transport   | 0.2      |
| waste       | 0.4      |

### 계산 방식

```ts
emission = amount * emissionFactor;
```

---

## 3. 데이터 시각화

Recharts를 활용하여 탄소 배출량 데이터를 시각화합니다.

### 제공 차트

- 활동 유형별 탄소 배출량
- 총 탄소 배출량 통계

---

## 4. 활동 데이터 관리

등록된 활동 데이터를 테이블 형태로 조회할 수 있습니다.

### 지원 기능

- 활동 데이터 목록 조회
- 활동 데이터 수정
- 활동 데이터 삭제

---

## 5. Excel Import

Excel 파일(.xlsx, .xls)을 업로드하여 활동 데이터를 일괄 등록할 수 있습니다.

### 지원 기능

- Excel 파일 업로드
- 동적 헤더 탐색
- 날짜 데이터 자동 변환
- 활동 유형 자동 매핑
- import 후 대시보드 자동 반영

---

# API 구조

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | /api/activities | 활동 데이터 조회 |
| POST | /api/activities | 활동 데이터 생성 |
| PATCH | /api/activities/[id] | 활동 데이터 수정 |
| DELETE | /api/activities/[id] | 활동 데이터 삭제 |

---

# 데이터 구조

```ts
export type ActivityType =
  | 'electricity'
  | 'material'
  | 'transport'
  | 'waste';

export type ActivityData = {
  id: string;
  activityDate: string;
  productName: string;
  activityType: ActivityType;
  amount: number;
  unit: string;
  emission: number;
  createdAt: string;
};
```

---

# 프로젝트 구조

```bash
.
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── app
│   ├── api
│   │   └── activities
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── dashboard
│   │   ├── DataTable.tsx
│   │   ├── EmissionChart.tsx
│   │   ├── ExcelImportButton.tsx
│   │   ├── FilterSection.tsx
│   │   ├── PageHeader.tsx
│   │   └── SummaryCards.tsx
│   └── layout
│       ├── AppContainer.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       └── Sidebar.tsx
├── constants
│   └── emissionFactors.ts
├── data
│   └── mockActivityData.ts
├── eslint.config.mjs
├── hooks
│   └── useActivities.ts
├── lib
│   └── prisma.ts
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── prisma
│   ├── dev.db
│   ├── migrations
│   │   ├── 20260524014620_init
│   │   ├── 20260524025317_add_activity_date
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── tsconfig.json
├── types
│   └── activity.ts
├── utils
│   └── calculateEmission.ts
└── yarn.lock
```

---

# 주요 구현 포인트

- Prisma + SQLite 기반 CRUD 구현
- Next.js API Route 기반 서버 처리
- 활동 유형별 탄소 배출량 계산 로직 구현
- Recharts 기반 데이터 시각화
- Excel Import 데이터 자동 매핑 처리
- 수정 / 삭제 기능 구현
- 대시보드 데이터 실시간 반영 처리

---

# Trouble Shooting

## Excel 날짜 파싱 문제

Excel serial date 형식과 문자열 날짜 형식이 혼합되어 들어오는 문제가 발생했습니다.

이를 해결하기 위해 날짜 타입을 분기 처리하고,
Excel serial date를 JavaScript Date 형식으로 변환하는 로직을 추가했습니다.

---

## Dynamic Header Parsing

Excel 템플릿마다 헤더 위치가 다른 문제가 있었습니다.

고정 row 기반 방식 대신,
실제 헤더명을 탐색하여 시작 위치를 찾는 방식으로 개선했습니다.

---

# 실행 방법

## 1. 패키지 설치

```bash
yarn install
```

## 2. Prisma Client 생성

```bash
yarn prisma generate
```

## 3. 개발 서버 실행

```bash
yarn dev
```

## 4. Production Build 실행

```bash
yarn build
yarn start
```

---

# 환경 변수

`.env`

```env
DATABASE_URL="file:./dev.db"
```

---

# Commit Convention

작업 과정을 확인할 수 있도록 기능 단위로 커밋을 분리하여 관리했습니다.

예시:

- feat: 활동 데이터 CRUD 구현
- feat: Excel Import 기능 추가
- fix: Excel 날짜 변환 오류 수정

---

# 향후 개선 사항

- Swagger/OpenAPI 문서화
- 사용자 인증 기능 추가
- PostgreSQL 환경 전환
- 탄소 배출량 필터링 기능 추가
- 기간별 통계 기능 추가

---
