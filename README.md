# 탄소 배출 관리 대시보드 (Hana Eco Dashboard)

제품별 탄소 발자국(Product Carbon Footprint, PCF)을 관리하고 시각화할 수 있는 웹 대시보드입니다.

사용자는 활동 데이터를 직접 입력하거나 Excel 파일을 업로드할 수 있으며, 이를 기반으로 탄소 배출량을 계산하고 차트 및 테이블 형태로 확인할 수 있습니다.

---

# Repository

GitHub: `hana_eco Repository`

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
