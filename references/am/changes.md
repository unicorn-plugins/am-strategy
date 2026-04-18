# 교재 정리 변경 이력

> **원본**: `C:\Users\hiond\OneDrive\문서\교재\AM\pdf\AM 핵심이해.pdf` (112페이지, 유니콘주식회사 이해경)  
> **작성일**: 2026-04-18  
> **작성 프로세스**: 에듀 라이터 초안 → 모던 라이터 리뷰 → 에듀 라이터 업데이트

---

## 파일 구성

| 파일 | 원본 커리큘럼 | 원본 페이지 |
|------|------------|----------|
| [01-am-overview.md](01-am-overview.md) | 01. AM 개요 | pp.3~14 |
| [02-analysis-and-strategy.md](02-analysis-and-strategy.md) | 02. AM 현황분석 및 전략 수립 | pp.15~28 |
| [03-planning-and-design.md](03-planning-and-design.md) | 03. Rearchitect/Rebuild 서비스 기획 및 설계 | pp.29~94 |
| [04-finops.md](04-finops.md) | 04. FinOps | pp.95~111 |

---

## 구조/포맷 변경 (원본 내용 보존)

- PDF 텍스트 추출 시 발생한 **단어 중간 줄바꿈·공백 분리**를 정상 단어 단위로 병합
  - 예: "마이크로서비스\n는" → "마이크로서비스는"
  - 예: "서비스\n 간" → "서비스 간"
- 슬라이드 레이아웃의 **이중·삼중 컬럼 표**를 마크다운 테이블로 재구성하여 가독성 확보
- PDF의 다이어그램·아이콘·도식은 텍스트로 정리 가능한 정보만 포함 (논리 구조 설명은 유지하되 시각 요소는 생략)
- 각 문서 상단에 **커리큘럼 목표**, 하단에 **요약** 섹션을 추가 — 원본에 없던 부분이며 학습 효율을 위한 구조적 보완
- 프로젝트 마크다운 작성 가이드(명사체 종결 원칙, 120자 줄 제한)를 준수하여 표현 통일

---

## 검증된 정보 보강 (모던 라이터 리뷰 반영)

> 원본 PDF는 실무 중심으로 집필되어 일부 핵심 개념의 **창시자·연도·원 출처**가 생략되어 있음.  
> 학습자가 원전을 추적할 수 있도록 검증된 출처 정보만 최소 침습 방식으로 보강함.

### 01-am-overview.md

| 항목 | 보강 내용 | 출처 |
|------|---------|------|
| Strangler Fig 패턴 | 창시자 Martin Fowler, 2004년 "StranglerFigApplication" 에세이 | martinfowler.com/bliki/StranglerFigApplication.html |
| 콘웨이의 법칙 | 창시자 Melvin Conway, 1967년 논문 "How Do Committees Invent?" | 학술 공인 사실(1968년 *Datamation* 게재) |

### 02-analysis-and-strategy.md

| 항목 | 보강 내용 | 출처 |
|------|---------|------|
| DORA Metrics | DevOps Research and Assessment(Google 산하) 연간 *State of DevOps Report* 발표 | dora.dev |

### 03-planning-and-design.md

| 항목 | 보강 내용 | 출처 |
|------|---------|------|
| MoSCoW 분류법 | Dai Clegg, 1994년 Oracle UK 제안 | DSDM(Dynamic Systems Development Method) 표준 공인 |
| DDD | Eric Evans, 2003년 저서 *Domain-Driven Design: Tackling Complexity in the Heart of Software* | 저서 ISBN 978-0321125217 |
| CAP 이론 | Eric Brewer, 2000년 PODC 기조연설. 2002년 Seth Gilbert·Nancy Lynch가 공식 증명 | MIT TR 및 PODC 학회 기록 |
| Saga 패턴 | Hector Garcia-Molina & Kenneth Salem, "Sagas", ACM SIGMOD 1987 (Princeton University) | ACM Digital Library |
| 12-Factor App | Adam Wiggins(Heroku 공동창업자) 초판 2011 공개 | 12factor.net |

### 04-finops.md

| 항목 | 보강 내용 | 출처 |
|------|---------|------|
| (보강 없음 — 원본이 2025-2026 최신 프레임워크까지 이미 커버) | — | — |

---

## 보강하지 않은 영역 (검증 한계)

아래 항목은 원본에 포함되어 있으나 **제3자 공인 출처가 확실치 않아** 추가 검증 없이 원본 그대로 유지:

- 6R 전략의 구체 예산 범위(3천만~5천만 등) → Unicorn 컨설팅 내부 경험치로 추정. 일반화된 업계 표준 아님
- "50개 시스템 기준 24%·30%·16%·30%" TIME 모델 분포 → 예시 수치로 실제 조직별 편차 큼
- 한국 기업 전환 사례(KT·대한항공·KB·쿠팡 Vitamin Project·Samsung SmartThings·월마트)의 세부 수치 → 공개 자료와 교차 검증하지 않음

> **권장**: 학습자가 위 사례 수치를 인용할 때는 반드시 원출처를 추가 확인.

---

## 원본 대비 추가/축약 정책

- **추가**: 핵심 개념의 검증된 창시자·연도(위 표 참조)만 간략 각주 형태로 추가
- **축약**: 없음 — 원본의 모든 기술적 내용·표·수치·사례를 보존
- **재배치**: PDF 페이지 순서 그대로 유지. 단, 관련 슬라이드(예: 테스트 전략 ①·②)는 한 섹션으로 통합하여 흐름 개선
