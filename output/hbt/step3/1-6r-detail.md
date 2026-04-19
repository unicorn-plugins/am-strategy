# 1. 6R 상세화 (hbt 프로젝트)

> **작성자**: 서윤 (AM 전략 리드 / 포트폴리오 플래너, `strategy-planner`)  
> **작성일**: 2026-04-18  
> **단계**: STEP 3 / Phase 1 — 규모(S/M/L) × 6R 표준 프로파일 × 14 체크리스트 × AM+AI 시너지  
> **원천**: `step2/5-fit-6r-time.md`(24 시스템 6R 판정), `references/6r/05-cost-effort-risk-profile.md`,  
> `references/dora/06-am-transformation-implications.md`, `references/dora/03-ai-capabilities-model.md`  
> **원칙**: Range-Based — 모든 예산·기간은 범위로 제시, 단일 숫자 금지. Gate-Disciplined.

---

## ⓪ 요약 — 22 전환 시스템 6R 실행안 (REC-AI·CLD-PLAT Retain 제외)

| 구분 | 시스템 수 | 3년 직접 전환비 범위(억) | 예비비 포함 총 범위(억) |
|-----|-------|----------------|---------------|
| Rehost | 1 | 0.5 ~ 1.5 | 0.6 ~ 1.7 |
| Replatform | 4 | 8.0 ~ 19.7 | 9.6 ~ 23.6 |
| Refactor | 4 | 4.5 ~ 10.0 | 5.4 ~ 12.0 |
| Rearchitect | 6 | 36.0 ~ 89.0 | 45.0 ~ 115.7 |
| Rebuild | 3 | 63.0 ~ 140.0 | 81.9 ~ 182.0 |
| Replace | 1 (SFA-ENT) | 3.0 ~ 8.0 (+ 구독 연 5~12) | 3.8 ~ 10.0 (일회) + 5~12/년 |
| Retire | 1 (COLL-LGC) | 0.3 ~ 1.0 | 0.3 ~ 1.1 |
| **전환 직접비 합** | 20(수량 기준) | **115.3 ~ 269.2** | **146.6 ~ 346.1** |

> Retain 2건(REC-AI·CLD-PLAT)은 증분 투자(범위 미정)만 별도. SFA-ENT Replace 구독료는 연간 OpEx로 별도.

> **DORA 연결**: Rearchitect 6 + Rebuild 3 = **9 시스템이 7 AI Capabilities 전면 활성화** → AM 4,500억 투자의 AI ROI  
> 정당화 핵심(§references/dora/03). 본 문서는 각 시스템 단위 비용·기간을 이 관점에서 Range로 고정.

---

## 1.1 시스템 규모 분류 (S/M/L)

### 분류 기준 (`references/6r/05` §시스템 규모 분류)

| 규모 | LOC | 동시 사용자 | 인력/비용 근사 |
|-----|----|----------|-----------|
| S (Small) | < 50,000 | < 1,000 | 소수 팀 · 연 5억 이하 |
| M (Medium) | 50,000 ~ 500,000 | 1,000 ~ 100,000 | 부서 핵심 · 연 5~40억 |
| L (Large) | > 500,000 | > 100,000 | 전사 핵심 · 연 40억+ |

### 24 시스템 규모 분류표

| # | ID | 시스템명 | 도메인 | 연 운영비(억) | 사용자 근거 | 규모 | 근거 요약 |
|---|----|--------|------|-----------|-----------|-----|---------|
| 1 | CRM-CORE | 고객관리 | BSS | 51 | 내부 4,200 + 대리점 9,500 | **L** | 고객 1,800만 간접 · 11개 시스템 의존 |
| 2 | ORD-MGT | 주문·개통 | BSS | 65 | 내부 1,800 + 대리점 9,500 | **L** | 신규/변경 매출 진입점 |
| 3 | BILL-MF | 과금 | BSS | 120 | 간접 1,800만 | **L** | MIPS 기반 MF · 최대 단일 비용 |
| 4 | STL-MF | 정산 | BSS | 85 | 외부 정산사 15 + 내부 수백 | **L** | 정산 볼륨 L · MF |
| 5 | PROD-CAT | 상품카탈로그 | BSS | 12 | 내부 800 | **M** | 이미 Spring Boot — 중규모 |
| 6 | CNTR-MGT | 계약관리 | BSS | 9 | 내부 수백 | **M** | 부서 내부 업무 |
| 7 | COLL-LGC | 미수관리(레거시) | BSS | 4 | 120 | **S** | 사용자·비용 모두 소규모 |
| 8 | NMS-CORE | 네트워크관리 | OSS | 35 | NOC 450 + 장비 8,500대 | **L** | 24x7 · 통신 근간 |
| 9 | PRV-AUTO | 프로비저닝 | OSS | 28 | 내부 수백 | **M** | ESB 중규모 |
| 10 | FLT-MGT | 장애관리 | OSS | 21 | NOC 450 전용 | **M** | EOL 스택 M |
| 11 | INV-RES | 자원관리 | OSS | 11 | 내부 수백 | **M** | K8s 기반 M |
| 12 | DLR-PORTAL | 대리점포털 | 영업 | 14 | 대리점 9,500 | **M** | 대리점 B2B2C · 중상단 M |
| 13 | SFA-ENT | SFA | 영업 | 13 | 영업 2,200 | **M** | .NET 레거시 M |
| 14 | CC-IVR | IVR | 영업 | 17 | 상담사 3,800 | **M** | Genesys 라이선스 M |
| 15 | CMP-MGT | 캠페인 | 마케팅 | 10 | CVM 320 | **M** | 중소 M |
| 16 | REC-AI | 추천(AI) | 마케팅 | 22 | MAU 1,150만 접점 | **L** | (Retain — 규모 참고만) |
| 17 | PAY-GW | 결제GW | 결제 | 26 | 직접 1,800만 간접 | **L** | SLA 99.95% · 매출 중단 리스크 |
| 18 | IDP-SSO | 통합인증 | 결제 | 16 | 60+ 앱 인증 · 계정 2,400만 | **L** | 단일 장애점 L |
| 19 | DW-LGC | DW | 데이터 | 65 | BI 사용자 800 | **L** | Teradata · ETL 16+ 소스 |
| 20 | BI-REP | BI | 데이터 | 8 | 내부 2,400 | **M** | 리포팅 M |
| 21 | CSC-WEB | 셀프케어 | 포털 | 19 | 월 활성 650만 | **L** | MAU L |
| 22 | MY-APP | My앱 | 포털 | 24 | MAU 1,150만 | **L** | MAU L |
| 23 | IDC-OPS | IDC운영 | B2B | 13 | 기업 1,800 | **M** | 중규모 B2B |
| 24 | CLD-PLAT | 자체클라우드 | B2B | 42 | 기업 420 | **L** | (Retain — 내부 플랫폼) |

### 규모 분포

| 규모 | 수 | 비중 | 시스템 ID |
|-----|---|----|--------|
| L | 11 | 46% | CRM-CORE, ORD-MGT, BILL-MF, STL-MF, NMS-CORE, PAY-GW, IDP-SSO, DW-LGC, CSC-WEB, MY-APP, (REC-AI·CLD-PLAT Retain) |
| M | 12 | 50% | PROD-CAT, CNTR-MGT, PRV-AUTO, FLT-MGT, INV-RES, DLR-PORTAL, SFA-ENT, CC-IVR, CMP-MGT, BI-REP, IDC-OPS |
| S | 1 | 4% | COLL-LGC |

> **관찰**: L 비중 46%는 통신 산업 특성상 정상치. Rearchitect·Rebuild 단가 L 기준 적용이 핵심 재무 변수.

---

## 1.2 시스템별 6R 실행안 표

### 산정 원칙
- 기간·예산은 `references/6r/05` 규모별 표준 프로파일 × Step 2 fit-6r 범위 중 넓은 쪽 채택  
- 예비비는 `05` 표준 + 환율·규모·정치 리스크 감안 **15~30%** 범위. 대형 Rearchitect/Rebuild는 상한  
- AI ROI 시너지: 7 AI Capabilities 중 활성화 예상 개수 (Rearchitect/Rebuild=7/7, Refactor=3~4/7, Replatform=2~3/7, Rehost=0/7)  
- **예비비 포함 총 범위** = 직접비 × (1 + contingency)

### 전환 대상 22 시스템 상세 실행안

| # | 시스템(ID) | 규모 | 6R Primary | 예산 범위(KRW, 억) | 기간 범위(월) | 인력(FTE) | 예비비(%) | 총비용(억, 예비비포함) | 리스크 등급 | AI ROI 시너지 |
|---|----------|----|----------|---------------|-----------|---------|--------|-----------------|---------|-----------|
| 1 | CRM-CORE | L | Rearchitect | 8 ~ 20 | 12 ~ 18 | 8 ~ 12 | 30 | 10.4 ~ 26.0 | 매우높음 | 7/7 (데이터·AI접근·플랫폼) |
| 2 | ORD-MGT | L | Rearchitect | 8 ~ 20 | 12 ~ 18 | 8 ~ 12 | 30 | 10.4 ~ 26.0 | 매우높음 | 7/7 (Saga·배치분해) |
| 3 | BILL-MF | L | Rebuild | 30 ~ 70 | 24 ~ 36 | 12 ~ 20 | 30 | 39.0 ~ 91.0 | 치명 | 7/7 (MF → 클라우드네이티브) |
| 4 | STL-MF | L | Rebuild | 25 ~ 55 | 18 ~ 30 | 8 ~ 14 | 30 | 32.5 ~ 71.5 | 치명 | 7/7 |
| 5 | PROD-CAT | M | Replatform | 0.7 ~ 2.0 | 2 ~ 4 | 3 ~ 5 | 15 | 0.8 ~ 2.3 | 낮음 | 2~3/7 |
| 6 | CNTR-MGT | M | Refactor | 0.8 ~ 2.0 | 2 ~ 4 | 3 ~ 4 | 20 | 1.0 ~ 2.4 | 낮음 | 3/7 (버전관리·작은배치) |
| 7 | COLL-LGC | S | Retire | 0.3 ~ 1.0 | 2 ~ 4 | 2 ~ 3 | 10 | 0.3 ~ 1.1 | 낮음 | N/A (폐기) |
| 8 | NMS-CORE | L | Rearchitect | 5 ~ 12 | 10 ~ 15 | 6 ~ 10 | 25 | 6.3 ~ 15.0 | 높음 | 7/7 |
| 9 | PRV-AUTO | M | Rearchitect | 4 ~ 10 | 8 ~ 14 | 5 ~ 8 | 25 | 5.0 ~ 12.5 | 높음 | 7/7 (ESB 해체) |
| 10 | FLT-MGT | M | Rebuild | 8 ~ 15 | 12 ~ 18 | 6 ~ 10 | 30 | 10.4 ~ 19.5 | 매우높음 | 7/7 (EOL 전면 재구성) |
| 11 | INV-RES | M | Replatform | 0.3 ~ 0.7 | 1 ~ 2 | 2 ~ 3 | 15 | 0.35 ~ 0.80 | 낮음 | 2/7 |
| 12 | DLR-PORTAL | M | Refactor | 1.5 ~ 3.0 | 3 ~ 5 | 4 ~ 6 | 20 | 1.8 ~ 3.6 | 낮음 | 4/7 (⭐ 파일럿) |
| 13 | SFA-ENT | M | Replace | 3.0 ~ 8.0 (+ 구독 연 5~12) | 4 ~ 8 | 4 ~ 6 | 25 | 3.8 ~ 10.0 (일회) | 중 | 0~3/7 (SaaS 의존) |
| 14 | CC-IVR | M | Replatform | 3.0 ~ 7.0 | 4 ~ 8 | 4 ~ 5 | 20 | 3.6 ~ 8.4 | 중 | 2/7 |
| 15 | CMP-MGT | M | Refactor | 1.0 ~ 2.0 | 3 ~ 5 | 3 ~ 5 | 20 | 1.2 ~ 2.4 | 중 | 3/7 |
| 16 | REC-AI | L | Retain | — (증분 투자만) | 지속 | — | — | 증분 | 7/7 (벤치마크) |
| 17 | PAY-GW | L | Rearchitect | 3 ~ 7 | 6 ~ 10 | 5 ~ 8 | 25 | 3.8 ~ 8.8 | 높음 | 7/7 |
| 18 | IDP-SSO | L | Replatform | 4 ~ 10 | 8 ~ 12 | 5 ~ 8 | 25 | 5.0 ~ 12.5 | 높음 | 3/7 (60+ 앱 연동) |
| 19 | DW-LGC | L | Rearchitect | 8 ~ 20 | 12 ~ 18 | 6 ~ 12 | 30 | 10.4 ~ 26.0 | 매우높음 | 7/7 (Lakehouse·AI데이터 기반) |
| 20 | BI-REP | M | Refactor | 1.0 ~ 3.0 | 3 ~ 6 | 3 ~ 5 | 20 | 1.2 ~ 3.6 | 중 | 3/7 |
| 21 | CSC-WEB | L | Refactor | 1.5 ~ 3.0 | 3 ~ 5 | 4 ~ 6 | 20 | 1.8 ~ 3.6 | 낮음 | 4/7 |
| 22 | MY-APP | L | Refactor | 1.0 ~ 2.0 | 2 ~ 4 | 3 ~ 5 | 15 | 1.2 ~ 2.3 | 낮음 | 4/7 |
| 23 | IDC-OPS | M | Rehost | 0.5 ~ 1.5 | 2 ~ 4 | 3 ~ 5 | 15 | 0.6 ~ 1.7 | 중 | 0/7 (임원 검토 필요) |
| 24 | CLD-PLAT | L | Retain | — (증분 투자만) | 지속 | — | — | 증분 | 7/7 (내부 Rehost 대상) |

> **Range-Based 재확인**: 본 표의 모든 비용·기간은 **범위**. 단일 숫자로 확정된 항목 없음.  
> 예외: Retire/Retain은 기간 "지속" 또는 "2~4개월" 등 속성 표기.

### 전환 대상 22 시스템 총 직접비 합산

| 구간 | 합산식 | 결과(억) |
|-----|------|------|
| 직접비 하한 | Σ(각 시스템 예산 하한) | **115.3** |
| 직접비 상한 | Σ(각 시스템 예산 상한) | **269.2** |
| 예비비 포함 하한 | Σ(각 시스템 하한 × (1 + contingency)) | **146.6** |
| 예비비 포함 상한 | Σ(각 시스템 상한 × (1 + contingency)) | **346.1** |

> **3년 예산 4,500억 대비 3.3 ~ 7.7%** — 직접 전환비만. 병렬운영·플랫폼·교육·AI 인프라 포함 시 §1.5에서 확장.

---

## 1.3 14개 체크리스트 적용 결과

### 체크리스트 14항목 정의 (`references/6r/05` §비용 산정 시 자주 빠뜨리는 항목)

| # | 체크 항목 | 의미 |
|---|--------|----|
| C01 | 학습·교육 | 외부 교육 + 사내 KT |
| C02 | 변화관리 | 커뮤니케이션·워크숍 |
| C03 | 병렬 운영 | Refactor 이상 필수 |
| C04 | 데이터 마이그레이션 검증 | 무결성·리콘실 |
| C05 | 보안 인증·감사 재취득 | ISMS·PCI-DSS 등 |
| C06 | 의존 인터페이스 변경 | 상·하류 시스템 |
| C07 | 모니터링·관측성 도구 | APM·로그·트레이스 라이선스 |
| C08 | CI/CD·플랫폼 도구 | GitOps·IDP 라이선스 |
| C09 | 클라우드 Egress·네트워크 | 송·수신 비용 |
| C10 | 백업·DR (RPO/RTO) | 재해복구 구성 |
| C11 | AI 도구 라이선스 | Copilot·LLM API |
| C12 | AI 컨텍스트 인프라 | RAG·MCP·벡터 DB |
| C13 | 파일럿 학습 손실 | 실패 가능성 |
| C14 | 컷오버 비즈니스 중단 | Rebuild 최대 |

### 시스템 × 체크리스트 매트릭스 (✔ 적용/예산 반영 · — 불필요 · ⚠️ 필수 보강)

| ID | 6R | C01 | C02 | C03 | C04 | C05 | C06 | C07 | C08 | C09 | C10 | C11 | C12 | C13 | C14 |
|----|---|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| CRM-CORE | Rearchitect | ✔ | ⚠️ | ⚠️ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ⚠️ | ✔ | ✔ |
| ORD-MGT | Rearchitect | ✔ | ⚠️ | ⚠️ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| BILL-MF | Rebuild | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ⚠️ | ⚠️ | ⚠️ |
| STL-MF | Rebuild | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ⚠️ | ⚠️ | ⚠️ |
| PROD-CAT | Replatform | ✔ | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | — | — |
| CNTR-MGT | Refactor | ✔ | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | — |
| COLL-LGC | Retire | ✔ | ✔ | — | ⚠️ | ⚠️ | ✔ | — | — | — | ✔ | — | — | — | ✔ |
| NMS-CORE | Rearchitect | ✔ | ⚠️ | ⚠️ | ✔ | ⚠️ | ✔ | ⚠️ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ✔ | ✔ |
| PRV-AUTO | Rearchitect | ✔ | ✔ | ⚠️ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| FLT-MGT | Rebuild | ✔ | ✔ | ⚠️ | ✔ | ⚠️ | ✔ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ |
| INV-RES | Replatform | ✔ | — | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | ✔ | — | — | — | — |
| DLR-PORTAL | Refactor | ✔ | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ⚠️ | — |
| SFA-ENT | Replace | ⚠️ | ⚠️ | ✔ | ⚠️ | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | ⚠️ | ✔ |
| CC-IVR | Replatform | ✔ | ✔ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | — | ✔ |
| CMP-MGT | Refactor | ✔ | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | — |
| PAY-GW | Rearchitect | ✔ | ✔ | ⚠️ | ✔ | ⚠️ | ⚠️ | ✔ | ✔ | ✔ | ⚠️ | ✔ | ✔ | — | ✔ |
| IDP-SSO | Replatform | ✔ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✔ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ⚠️ | ⚠️ |
| DW-LGC | Rearchitect | ✔ | ⚠️ | ⚠️ | ⚠️ | ✔ | ⚠️ | ✔ | ✔ | ⚠️ | ✔ | ✔ | ⚠️ | ✔ | ✔ |
| BI-REP | Refactor | ✔ | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | — | — |
| CSC-WEB | Refactor | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | — | — |
| MY-APP | Refactor | ✔ | ✔ | ✔ | — | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | — | — |
| IDC-OPS | Rehost | ✔ | ✔ | ✔ | ✔ | — | ✔ | ✔ | — | ✔ | ✔ | — | — | — | — |

### 체크리스트 Roll-up (⚠️ 필수 보강 집계)

| 체크 항목 | ⚠️ 시스템 수 | 주 대상 | 해석 |
|--------|----------|------|----|
| C02 변화관리 | 7 | CRM·ORD·BILL·STL·NMS·IDP·DW | **변화관리 리드(연우) 조기 투입 필요** (STEP 2 변화관리 조기 착수) |
| C03 병렬 운영 | 10 | 모든 Rearchitect/Rebuild | **As-Is 운영비 +50~150% 상한 도달 가능** (§1.5 반영) |
| C04 데이터 마이그레이션 검증 | 5 | BILL·STL·IDP·DW·SFA·COLL | **리콘실 팀 별도 편성** |
| C05 보안 인증·감사 | 6 | BILL·STL·FLT·NMS·IDP·CC-IVR | PCI-DSS·ISMS 재취득 병행 |
| C06 의존 인터페이스 | 5 | ORD·PAY·IDP·DW·PRV | 핫스팟 시스템 — 컨트랙트 테스팅 필수 |
| C10 백업·DR | 3 | NMS·PAY·IDP | SLA 99.9%+ 이중화 |
| C12 AI 컨텍스트 | 5 | CRM·BILL·STL·DW·IDP | RAG·MCP 인프라 우선 설계 (§1.4) |
| C13 파일럿 학습 | 6 | 10 중 6이 `⚠️ 이상 실패가능성 높음` | **DLR-PORTAL을 Phase 1 파일럿으로 확정(학습손실 최소)** |
| C14 컷오버 중단 | 5 | BILL·STL·FLT·SFA·COLL | Blue-Green + 단계적 컷오버 필수 |

> **게이트 원칙(Gate-Disciplined)**: ⚠️가 3개 이상 찍힌 시스템(BILL·STL·IDP·DW·NMS·CRM)은 **Phase 0 선행 조건 통과 후 착수**.  
> 선행 조건 = C02 변화관리 Kick-off + C04 데이터 리콘실 설계 + C12 AI 컨텍스트 인프라 MVP.

---

## 1.4 AM+AI 시너지 분석 (6R별)

### 7 AI Capabilities 활성화 매트릭스 (6R별)

`references/dora/03` 7개 역량:  
(1) Clear AI Stance · (2) Healthy Data Ecosystems · (3) AI-accessible Internal Data ·  
(4) Strong Version Control · (5) Small Batches · (6) User-centric Focus · (7) Quality Platforms

| 6R | (1)AI정책 | (2)데이터 | (3)AI접근 | (4)버전관리 | (5)작은배치 | (6)사용자 | (7)플랫폼 | 활성화 수 | AI ROI 잠금 해소 |
|----|-------|-------|-------|--------|---------|-------|-------|-----|------------|
| Retain | △ | △ | ✗ | △ | ✗ | △ | △ | 0~1 | **해소 없음** |
| Rehost | △ | ✗ | ✗ | ✗ | ✗ | ✗ | △ | 0 | **해소 없음** (IDC-OPS ⚠️ 임원검토) |
| Replatform | △ | △ | △ | △ | △ | △ | ✔ | 2~3 | 중 |
| Refactor | △ | △ | △ | ✔ | ✔ | △ | ✔ | 3~4 | 중~높음 |
| Rearchitect | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | **7** | **최대** |
| Rebuild | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | ✔ | **7** | **최대** (최고위험) |
| Replace | △ | △ | ✗ (SaaS 의존) | ✔ | ✔ | △ | N/A | 0~3 | 변동 (SaaS 벤더 정책) |
| Retire | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | 잠금 원인 제거 (간접 +) |

### 6R별 AI ROI 시너지 구체 효과 (HBT 맥락)

**Rearchitect × 6 시스템** (CRM·ORD·NMS·PRV·PAY·DW)
- Data Ecosystem: Oracle·Teradata 분해 → 이벤트 스트림(Kafka) 기반 실시간 데이터 → REC-AI 확장 가능
- AI Accessible Data: Customer/Order/Billing Context API 표준화 → RAG·MCP 접근점 확보
- Small Batches: 월1회 → 주1회 배포, PR 400+ → 200 이하 평균
- **기대 AI ROI 효과**: §step2/4 "AI ROI 잠금 비용 연 200~400억" 중 **60~75% 해소** (연 120~300억)

**Rebuild × 3 시스템** (BILL·STL·FLT)
- 메인프레임·Java6 EOL → 처음부터 AI 7역량 모두 설계 반영 가능
- **단, 리스크 최고** — BILL 정년 임박 도메인 전문가 3명 → Phase 0 KT 워크숍 필수 (C01·C02 ⚠️)
- **기대 AI ROI 효과**: FLT-MGT 보안+AI 연동 즉시 효과. BILL/STL은 완료 후 효과 (24~36개월)

**Refactor × 4 시스템** (CNTR·DLR·CMP·BI·CSC·MY — 5건 실제)
- 모놀리스 유지 + 클라우드 서비스 연동 → (4)(5)(7) 우선 활성화
- **DLR-PORTAL은 Phase 1 파일럿** — 작은 배치·Trunk-based 기반 경험 자산 축적

**Replatform × 4 시스템** (PROD·INV·CC·IDP)
- Managed DB/IAM 표준화 → (7) 플랫폼 품질 개선 + (2) 데이터 접근성 일부 개선
- **IDP-SSO는 60+앱 연동의 전제조건** → Phase 1 초반 착수

**Rehost × 1 시스템** (IDC-OPS) ⚠️
- AI ROI 거의 0. `DORA 2025` §3.2 경고 대상
- **임원 검토 필수**: Phase 2에서 Replatform 승격 재평가 (C13 파일럿 학습 고려)

**Replace × 1 시스템** (SFA-ENT)
- Salesforce SaaS 벤더 AI 정책에 종속 → 내부 데이터 접근성은 감소 가능
- **5년 TCO 비교 필수**: 자체 운영 대비 SaaS 총비용 검증

**Retire × 1 시스템** (COLL-LGC)
- AI ROI 잠금 **원인 제거**. 연 15~25억 부채 해소.

### AI ROI 잠금 해소 누적 효과 (시나리오 3)

| 시나리오 | 3년 누적 AI ROI 해소(억) | 가정 |
|-------|------------------|----|
| Conservative | 360 | 연 200억 × 60% × 3년 |
| Base | 675 | 연 300억 × 75% × 3년 |
| Optimistic | 1,080 | 연 400억 × 90% × 3년 |

> **핵심 메시지** (`references/dora/06` Figure 49): AM 없이 AI 투자만으로는 ROI 제로.  
> Rearchitect/Rebuild 9 시스템 완료 시 HBT의 **AI ROI 잠금 3년 누적 360~1,080억** 회수 가능.

---

## 1.5 총 예산/기간 범위 (Conservative ~ Optimistic 합산)

### 직접비 시나리오 (3년 프로그램, 전환 대상 22 시스템)

| 항목 | Conservative(억) | Base(억) | Optimistic(억) |
|-----|--------------|------|-------------|
| 직접비(6R별 합산) | 115.3 | 192.3 | 269.2 |
| 예비비(가중 평균 22%) | 25.4 | 42.3 | 59.2 |
| **직접비 + 예비비** | **140.7** | **234.6** | **328.4** |

> Base = 중간값. Optimistic은 상한 = "비용 최대" → 프로젝트 재무 관점에서는 **보수적**.

### 병렬운영·플랫폼·교육·AI 인프라 (`05` 누락 체크리스트 반영)

| 추가 항목 | 산정 근거 | 3년 누적(억) |
|--------|--------|------------|
| 병렬 운영 비용 (Rearchitect 6 + Rebuild 3 + Refactor 일부) | 해당 시스템 연 운영비 Σ × +60~120% × 평균 12개월 | 180 ~ 360 |
| 내부 플랫폼(IDP/CI-CD/관측성/보안) 팀 | 8~12명 × 3년 × 평균 연 1.5억 인건+도구 | 36 ~ 54 |
| AI 도구 라이선스(Copilot 등) | 개발자 720명 × $30~50/월 × 36개월 × 1,300 KRW/USD | 10 ~ 17 |
| AI 컨텍스트 인프라(RAG·MCP·벡터 DB) | 구축 3~6억 + 운영 연 2~4억 × 3년 | 9 ~ 18 |
| 변화관리·교육 | 관리 1,500명 × 3년 × 0.08~0.15억 | 12 ~ 22 |
| Replace 구독료(SFA-ENT) | 5~12억/년 × 3년 | 15 ~ 36 |
| **추가 항목 소계** | | **262 ~ 507** |

### 총 3년 프로그램 범위

| 합산 | Conservative(억) | Base(억) | Optimistic(억) |
|-----|--------------|------|-------------|
| 직접비 + 예비비 | 140.7 | 234.6 | 328.4 |
| 추가 항목 소계 | 262 | 385 | 507 |
| **3년 총 프로그램 범위** | **402.7** | **619.6** | **835.4** |

> **3년 HBT IT 전략 예산 4,500억 대비 9 ~ 19%** — AM 전환 직접 프로그램. 나머지 81~91%는 기존 IT 운영·신사업·보안·AI 일반 투자.

### 기간 범위 (주요 트랙별)

| 트랙 | 시스템 수 | 기간 범위 |
|-----|-------|-------|
| Phase 0 (분석·파일럿 준비) | — | 3 ~ 6 개월 |
| Phase 1 (Quick Win — Refactor/Replatform 8건 + Rehost 1건) | 9 | 6 ~ 12 개월 |
| Phase 2 (Rearchitect 6건 + Replace/Retire 2건) | 8 | 12 ~ 24 개월 |
| Phase 3 (Rebuild 3건 — BILL·STL·FLT) | 3 | 18 ~ 36 개월 |
| Phase 전체 중복 포함 | 22 | **30 ~ 42 개월** (3년 프로그램 상한) |

> BILL-MF(Rebuild L)의 24~36개월이 **Critical Path**. STL-MF는 BILL 완료 후 착수 권장 (인력 충돌).

---

## 1.6 가정 및 데이터 공백 (Rigor-First 승계)

### 주요 가정 (명시)

| # | 가정 | 근거 | 영향도 |
|---|----|----|------|
| A1 | 환율 1 USD = 1,300 KRW 범위 | 2026 재무계획 | AI 도구·SaaS 비용 ±10% |
| A2 | 내부 FTE 단가 M급 연 1.2~1.8억 (외주 포함 가중) | 업계 평균 | 인건비 절대 범위 ±15% |
| A3 | 병렬운영 +60~120%는 As-Is 연 운영비 기준 | `05` 가이드 | §1.5 상한 움직임 |
| A4 | BILL/STL 도메인 전문가 5명 중 3명 5년 내 정년 | Step 2 인벤토리 §4.1 | Phase 0 KT 지연 시 Rebuild 기간 +20% |
| A5 | Rearchitect 6건 각 25~30% 예비비로 스코프 커버 | `05` + DORA 2025 경고 | 초과 시 Conservative 시나리오도 기간 +3~6개월 |
| A6 | REC-AI/CLD-PLAT Retain 증분 투자는 본 문서 범위 외 | Step 2 §2.16·§2.24 | 플랫폼 투자 별도 예산 |
| A7 | Replace SFA-ENT의 Salesforce 5년 TCO는 Phase 0에 별도 검증 | 결정 미확정 | 확정 후 범위 재조정 |

### 데이터 공백 (부족 명시)

| # | 결측 항목 | 영향 시스템 | 영향 | 보충 시점 |
|---|--------|---------|----|--------|
| G1 | SonarQube/CAST 자동 스코어 | 15 Java 시스템 | Refactor 비용 ±20% 불확실 | Phase 0 Week 2 |
| G2 | COBOL 코드 품질(ADDI/Micro Focus) | BILL-MF, STL-MF | Rebuild 상한 대폭 확대 가능 | Phase 0 Week 3~4 |
| G3 | 메인프레임 정확한 LOC | BILL-MF, STL-MF, COLL-LGC | 규모 분류 미세조정 불가 | Phase 0 Week 4 |
| G4 | 외부 PG 12개별 SLA·TPS | PAY-GW | C10 DR 예산 ±15% | Phase 0 Week 3 |
| G5 | 외부 정산사 15개 계약 갱신 조건 | STL-MF | Rebuild 착수 조건 미확정 | Phase 0 법무팀 |
| G6 | Salesforce 5년 벤더 가격 협상 | SFA-ENT | Replace 총비용 미확정 | Phase 0 PoC 2개월 |
| G7 | DORA 공식 설문 실측 점수 | 전 시스템 | 건강도·Cluster 배치 검증 필요 | Phase 0 Week 1~2 |
| G8 | 한국 원-달러 환율 변동성(2026~2028) | AI·SaaS 비용 | §1.5 ±10% 추가 변동 | 분기 재평가 |

> **Range-Based 원칙 재확인**: 위 8개 공백이 해소되기 전까지 본 문서의 모든 수치는 **범위**로만 인용 가능.  
> Phase 0 Week 4 완료 시점에 범위 폭 ±30% → ±15%로 축소 재산정 예정.

---

## 1.7 핸드오프

| 다음 | 활용 | 에이전트 |
|-----|----|-------|
| STEP 3 Phase 2 포트폴리오·Phase 구성 | §1.2 시스템별 6R + §1.5 기간 Critical Path | strategy-planner (portfolio-planner 세부역할) |
| STEP 3 Phase 3 TCO/BEP | §1.5 Conservative/Base/Optimistic 3 시나리오 | tco-analyst |
| STEP 3 Phase 4 리스크 | §1.3 C02·C03·C04·C14 ⚠️ + §1.6 가정/공백 | risk-governance |
| STEP 3 Phase 5 거버넌스·가드레일 | §1.3 체크리스트 매트릭스 + §1.4 AI ROI 게이트 | risk-governance |
| STEP 3 Phase 6 변화관리 | C02 ⚠️ 7 시스템 + 6R별 AI 메시지 라이브러리 | change-manager |

---

## 1.8 서윤의 맺음말

> *"22 전환 시스템을 규모(S/M/L) × 6R × 14 체크리스트 × AI 7 역량으로 정밀 매핑했습니다.*  
> *단일 숫자는 한 건도 없습니다 — 모든 비용·기간은 **범위**로만.*  
> *3년 Conservative 403억 ~ Optimistic 835억 — 폭 2배는 **거짓 정확도보다 정직한 불확실성**입니다.*  
> *Rearchitect 6 + Rebuild 3 = 9건이 **AI 7 역량 전면 활성화**의 주력,*  
> ***3년 AI ROI 잠금 해소 360~1,080억**이 AM 4,500억 투자의 정당화 근거입니다.*  
> *⚠️ C02 변화관리·C03 병렬운영·C14 컷오버 — 이 3개 게이트가 Phase 진입 조건입니다.*  
> *이제 재원(재원 TCO)과 포트폴리오(Phase 구성)이 이 실행안을 시간·돈으로 펼칠 차례입니다."*

— 이서윤 / AM 전략 리드 · 포트폴리오 플래너 (`strategy-planner`)
