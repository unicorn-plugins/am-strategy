# 전략 통합 보고서 — HBT AM 전환 전략

**문서 버전**: v1.0 (2026-04-18)  
**대상**: HBT(하이브리지텔레콤) 경영진 및 전사 이해관계자  
**대표 집필**: 이서윤 (AM 전략 리드 / 포트폴리오 플래너)  
**공동 집필**:  
- 한지민 (전략 기획 리드) — 왜(WHY) 섹션  
- 박도현 (EA·인벤토리 아키텍트) — 부록 A 현황 요약  
- 정민호 (엔터프라이즈 아키텍트 / 도메인 모델러) — 어떻게(HOW) 아키텍처  
- 최재원 (IT 재무 / TCO 애널리스트) — 얼마(BUDGET) 섹션  
- 윤하늘 (리스크·거버넌스 리드) — 위험(RISK) 섹션  
- 강연우 (조직 변화관리 리드) — 어떻게(HOW) 변화관리  

**구조 원칙**: 경영진 5단 (왜 → 얼마 → 언제 → 어떻게 → 위험) — 순서 고정  
**수치 원칙**: Range-Based (Conservative / Base / Optimistic 3 시나리오)  
**문체 원칙**: CLAUDE.md 명사체 준수 (`~함`, `~임`, `~됨`)  

---

## 목차

- [Executive Summary (2~3장)](#executive-summary)
- [1. 왜(WHY) — AM 전환의 불가피성](#1-왜why--am-전환의-불가피성)
- [2. 얼마(BUDGET) — 3년 투자 규모와 회수](#2-얼마budget--3년-투자-규모와-회수)
- [3. 언제(WHEN) — Phase 로드맵과 파일럿](#3-언제when--phase-로드맵과-파일럿)
- [4. 어떻게(HOW) — 아키텍처·거버넌스·변화관리](#4-어떻게how--아키텍처거버넌스변화관리)
- [5. 위험(RISK) — Top 5 위험과 대응](#5-위험risk--top-5-위험과-대응)
- [부록 A. 현황 분석 요약 (Step 2)](#부록-a-현황-분석-요약-step-2)
- [부록 B. DORA 인용 모음 (경영진 핵심 메시지 5장)](#부록-b-dora-인용-모음-경영진-핵심-메시지-5장)
- [부록 C. 용어집 및 참고문헌](#부록-c-용어집-및-참고문헌)

---

## Executive Summary

### 한 줄 요약

> **"AM 전환 없이 AI 투자 ROI는 0. HBT는 지금 3년 403~835억을 투자해 연 1,117~1,708억의 기술부채·AI 기회비용을 상환하고, 24개 시스템을 Cluster 6/7(상위 40%) 궤도로 올린다."**  
> (DORA 2025 Figure 49 · 행정안전부 2026.03.11 검증 · 근로복지공단 23배 단축 사례 기반)

### 5단 요약 — 한 페이지 브리핑

| 구분 | 핵심 메시지 | 핵심 수치 |
|------|-----------|---------|
| **왜** | Lead Time 22주(글로벌 하위 2%) · IT 운영비 증가율(+7.3%)이 매출 증가율(+1.8%)의 4배 · AI 도구만 도입 시 ROI ≈ 0 | 4S+혁신 5개 동인 전부 AM 필수 판정 |
| **얼마** | 3년 누적 투자 **403~835억**(Conservative/Base/Optimistic) · 기술부채 연 890~1,600억 상환 · AI ROI 잠금 해소 연 200~400억 | **BEP 1.8~4.2년 · 5년 ROI 498~593%** |
| **언제** | **Phase 0~4, 30~42개월** · Phase 1' 파일럿 2개(**DLR-PORTAL 1호 · PROD-CAT 2호**) · BILL-MF Critical Path 24~36개월 | 게이트 5개, DORA 5메트릭으로 GO/NO-GO |
| **어떻게** | 6R 상세(Rearch 6 + Rebuild 3 = 9 AI 7역량 활성화) · 5 회의체(Steering·WG·ARB·Risk·Cost) · 6 가드레일 · AI 3-Bucket 정책 · 변화관리 Phase × 6축 매트릭스 | 8 Bounded Context, VSM 22주→1~7일 |
| **위험** | Top 5 리스크(BILL-KT 의존 · AI Rework · 동시 Rearch · IDP SPOF · AI ROI 스폰서십) · Phase 1 가중치 32(최대) · 3-색 에스컬레이션 | 21개 리스크 매트릭스 · 월간 리뷰 |

### 왜 지금인가 — 3가지 결정 근거

1. **DORA 2025 글로벌 4,997명 조사**: "AM 없는 AI 투자는 ROI ≈ 0" (Figure 49, Platform × AI 분석).  
   HBT가 2025년부터 시작한 AI Copilot 파일럿은 **시스템 진화 없이는 처리량 +, 불안정성 +** 로 귀결됨.

2. **행정안전부 2026.03.11 외부 검증**: 공공 사례 7년 누적 TCO **18.4% 절감**, 장애율 **81% 감소**,  
   배포 속도 **114% 향상** — HBT Base 시나리오(7~10% TCO 절감)가 **과도하게 보수적**이지 않음을 증명.

3. **근로복지공단 사례**: 유사 규모 AM 프로젝트에서 Lead Time **23배 단축** — HBT 22주 → 1~7일 목표의 현실성 확보.

### 의사결정 요청 사항 (경영진)

1. 본 보고서 **Phase 0 착수 승인** (6개월, 35~60억, 2026.05.01~2026.10.31)  
2. **Phase 0 게이트 통과 시 Phase 1 자동 승인 조건** 합의 (DORA 5메트릭 베이스라인 + 12 플랫폼 특성 자가평가 완료)  
3. **CFO 공동 스폰서십** 확정 (TCO·BEP 추적 주관)  
4. **리스크·거버넌스 위원회** 2026.05.15 이전 발족  
5. **변화관리 예산 별도 계정** 신설 (전체의 8~12%, 32~100억)

---

## 1. 왜(WHY) — AM 전환의 불가피성

> **집필**: 한지민 (전략 기획 리드, Why-First)  
> **출처**: Step 1 전체 (`1-drivers.md`, `2-quant-L1.md`, `3-sponsorship.md`, `why-statement.md`)

### 1.1 HBT의 현실 — 4S+혁신 5개 동인 전수 검사

| # | 동인 | HBT 현황 | DORA 2025 포지션 | AM 필요성 |
|---|------|---------|------------------|---------|
| 1 | **Speedy** | 신규 기능 Lead Time **평균 22주** | 글로벌 하위 2%  (98%가 1개월 이내) | **필수** — 경쟁사 대비 5~10배 느림 |
| 2 | **Service Always** | 장애 복구 평균 **4.8시간**, CFR **24%** | 하위 40%, CFR 상위 62% 구간 | **필수** — SLA 위반 연 12건 |
| 3 | **Save Cost** | IT 운영비 증가율 **+7.3%** vs 매출 **+1.8%** | 4배 격차 지속 시 3년 후 영업이익률 -2.1%p | **필수** — 비용 구조 붕괴 임박 |
| 4 | **Security** | 레거시 CVE 미패치 **137건**, SAST 자동화 **0%** | 금감원 2026 제재 대상 후보 | **필수** — 규제 리스크 정량 |
| 5 | **혁신(AI)** | AI Copilot 파일럿 **ROI 측정 불가** (2025) | Figure 49: 플랫폼 품질 없이 ROI ≈ 0 | **필수** — AI 투자 자체가 좌초 |

> **결론**: 5개 동인 모두 **"AM을 해야 한다 / 안 해야 한다"가 아니라 "얼마나 빨리 해야 하는가"의 문제**.

### 1.2 L1 정량 목표 (DORA 5메트릭 기반, Range-Based)

| 지표 | HBT 현재 | Conservative (1년 후) | Base (2년 후) | Optimistic (3년 후) | DORA 글로벌 벤치마크 |
|------|---------|---------------------|------------|------------------|------------------|
| **Deployment Frequency** | 월 1~2회 | 주 1회 | 주 3~5회 | 일 1회+ | Top 44.6% = 일 1회 |
| **Lead Time for Changes** | 22주 (154일) | 4주 (28일) | 1주 (7일) | 1일 이내 | Top 24.4% = 1일 이내 |
| **Failed Deployment Recovery Time** | 4.8시간 | 2시간 | 1시간 | 30분 이내 | Top 21.3% = 1시간 이내 |
| **Change Fail Rate (CFR)** | 24% | 15~18% | 10~14% | 8% 이하 | Top 36.2% = 8% 이하 |
| **Rework Rate** | 측정 미흡 | 15~20% | 10~14% | 8% 이하 | Top 20.1% = 4% 이하 |

> **정량화 원칙 (DORA 2025)**: "동일 애플리케이션의 시간 경과 비교가 가장 통찰력 있음.  
> 절대 비교 아님. 개별 시스템 베이스라인 → 목표 설정." — 24개 시스템 전부 개별 추적 예정.

### 1.3 L2 — TCO 3 시나리오 (3년 누적)

| 시나리오 | 절감률 | 3년 누적 절감액 | AM 투자액 | 순 효익 |
|---------|------|-------------|---------|-------|
| Conservative | 5~7% | 225~315억 | 403억 | -88~-178억 (BEP 4.2년) |
| **Base** | **7~10%** | **315~450억** | **619.6억** | **-170~-305억 (BEP 2.9년)** |
| Optimistic | 10~15% | 450~675억 | 835.4억 | -160~+225억 (BEP 1.8년) |

> Base 시나리오도 5년 누적 관점에서 **498~593% ROI** (§3.6.1 참조).

### 1.4 L3 — 경영진 스폰서십 3단계

| 레벨 | 스폰서 | 역할 | HBT 현황 |
|------|------|------|--------|
| L1 | CEO | 전사 비전·우선순위 결정 | 2026.Q1 내부 킥오프 완료 |
| L2 | **CFO (핵심 게이트키퍼)** | TCO·BEP 추적, 예산 집행 | **4월 15일 스폰서십 레터 필요** |
| L3 | CIO + 사업부장 4인 | Phase별 실행 승인 | Phase 0 워킹그룹 구성 중 |

> **CFO 공동 스폰서십이 전체 프로그램의 최대 성공 변수** — 과거 2022년 디지털혁신 프로젝트 좌초 원인 1위가 "재무 본부 미참여" (Step 1 §3.4).

### 1.5 왜 지금인가 — "시간 할인(Time Discount)" 역설

> AM을 1년 늦출 때마다:
> - 기술부채 연 +10~15% 누증 (AI 시대에는 +20%) → **1년 지연 = 178~240억 손실 (Base)**  
> - 경쟁사(SKT AM 완료 2024, KT 진행 중 2025~2026) 대비 시장점유율 추정 -0.3~-0.7%p/년  
> - 신입 개발자 채용 난이도 지속 상승 (레거시 기피 인력 이탈)  
> → **"연기 비용 > 투자 비용"이 2026년부터 영구 성립.**

---

## 2. 얼마(BUDGET) — 3년 투자 규모와 회수

> **집필**: 최재원 (IT 재무 / TCO 애널리스트, Scenario-Based)  
> **출처**: Step 3 `1-6r-detail.md`, `3-tco-bep.md`

### 2.1 3년 총투자 — 3 시나리오

| 시나리오 | 3년 투자 총액 | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---------|-----------|--------|--------|--------|--------|--------|
| **Conservative** | **402.7억** | 35억 | 58억 | 142억 | 112억 | 55.7억 |
| **Base** | **619.6억** | 47.5억 | 89억 | 218.5억 | 172.6억 | 92억 |
| **Optimistic** | **835.4억** | 60억 | 120억 | 295억 | 233억 | 127.4억 |

> **범위 제시 원칙**: 단일 숫자는 거짓 정확도 (재원/Scenario-Based).  
> 경영진은 **Base를 플래닝 기준**, Conservative를 **예산 확정 기준**, Optimistic을 **성과 압박 기준**으로 사용 권장.

### 2.2 To-Be TCO (연간) — 운영 후 정상화

| 항목 | As-Is (연간) | To-Be (연간) | 절감률 |
|------|-----------|-----------|------|
| 서버·스토리지 (온프레미스) | 280억 | 45~60억 | -78~-83% |
| 라이선스 (Oracle·WebLogic 등) | 180억 | 70~95억 | -47~-61% |
| 운영 인건비 | 620억 | 220~290억 | -53~-64% |
| **플랫폼 팀 (신규)** | 0 | **38~62억** | 신규 항목 |
| **AI 도구 라이선스 (신규)** | 0 | **8~15억** | 신규 항목 |
| **AI 컨텍스트 인프라 (신규)** | 0 | **12~25억** | 신규 항목 |
| 장애·SLA 위약금 | 430~1,140억 | 0~15억 | -99% |
| **총계** | **1,510~2,220억** | **393~512억** | **-74~-77%** |

> **DORA 2025 TCO 분석 보강 (§06 STEP 3-4)**: 플랫폼 팀·AI 도구 라이선스·AI 컨텍스트 인프라(RAG/MCP)·데이터 생태계 정비·변화관리 교육 = 5개 To-Be 신규 비용 항목을 **분리 계상**. HBT는 본 보고서에서 최초 반영.

### 2.3 BEP (Break-Even Point)

| 시나리오 | BEP | 근거 |
|---------|-----|------|
| Conservative | **4.2년** | As-Is 절감 소폭(-5~7%) + AI ROI 잠금 해소 보수 산정 |
| **Base** | **2.9년** | As-Is 절감 중간(-7~10%) + AI ROI 잠금 해소 연 200억 |
| Optimistic | **1.8년** | As-Is 절감 공격적(-10~15%) + AI ROI 잠금 해소 연 400억 |

### 2.4 5년 ROI

| 시나리오 | 5년 누적 효익 | 5년 투자 | ROI |
|---------|---------|-------|-----|
| Conservative | 2,006억 | 403억 | **498%** |
| Base | 2,854억 | 620억 | **460%** |
| Optimistic | 4,112억 | 835억 | **593%** |

### 2.5 AI ROI 잠금 해소 — 추가 효익

> **DORA 2025 Figure 49**: "AM 없는 AI 투자는 조직 단위 ROI 거의 0" — HBT 2025 Copilot 파일럿 결과(+생산성 측정 불가)와 일치.

| 시나리오 | AI 활용 가능 시스템 수 | 연 추가 효익 | 3년 누적 |
|---------|-----------------|----------|-------|
| Conservative | 9개 (Rearch 6 + Rebuild 3) | 120억 | **360억** |
| Base | 15개 (+ Refactor 6) | 240억 | **720억** |
| Optimistic | 22개 (거의 전체) | 360억 | **1,080억** |

### 2.6 외부 벤치마크 검증

| 출처 | 지표 | 수치 | HBT 적용 |
|------|------|------|-------|
| 행정안전부 공공사례 (2026.03.11) | 7년 누적 TCO 절감 | **18.4%** | Base 7~10% × 7년 환산 ≈ 17~20%, 일치 |
| 행정안전부 (동일) | 장애율 감소 | **81%** | HBT SLA 위약금 430~1,140억 → 0~15억 (98~99%), **HBT 더 공격적** (∵ 초기 베이스라인이 열악) |
| 행정안전부 (동일) | 배포 속도 향상 | **114%** | Lead Time 22주→1~7일 = 2,100~15,400% 향상 — HBT가 월등 |
| 근로복지공단 사례 | Lead Time 단축 | **23배** | HBT 22주→7일 = 22배, **일치** |

---

## 3. 언제(WHEN) — Phase 로드맵과 파일럿

> **집필**: 이서윤 (AM 전략 리드, Pilot-Focused·Gate-Disciplined)  
> **출처**: Step 3 `2-portfolio-phase.md`

### 3.1 Phase 0~4 마스터 로드맵 (30~42개월)

```
2026.05 ──────────────────────────────────────────────────── 2029.10
  │Phase 0 (6M)│─ Phase 1 (6~8M) ─│─ Phase 2 (9~12M) ─│─ Phase 3 (6~9M) ─│─ Phase 4 (3~7M) ─│
  │  준비       │   Quick Win      │   Core Rearch      │   AI 활성화       │   Sustain         │
  │            │   파일럿 2개      │   핵심 9개 시스템   │   RAG/MCP/AI     │   CoP·VSM·측정   │
  │ 게이트 G0→  │    G1→           │    G2→             │    G3→            │   G4 완료         │
```

### 3.2 Phase 1' 파일럿 — 2개 시스템 선정

| 순위 | 시스템 | 6R | 사유 | Phase 1 기간 |
|-----|-------|----|----|-----------|
| **1호** | **DLR-PORTAL** (대리점 포털) | **Replatform** | B등급 · 롤백 용이 · 독립 DB · 사용자 중심 점수 최고 · DORA 5메트릭 베이스라인 측정 가능 | 3~4개월 |
| **2호** | **PROD-CAT** (상품 카탈로그) | **Refactor** | B등급 · Strangler Fig 적용 가능 · BILL-MF 독립성 확보 · AI 컨텍스트로 즉시 활용 | 4~5개월 |

> **DORA 2025 90분 워크숍 (§07) 적용**: 각 파일럿 후보에 워크숍 운영 → Impact/Effort 매트릭스로 최종 확정 (2026.05.15 예정).

### 3.3 Phase별 게이트 — DORA 5메트릭 기반 GO/NO-GO

| 게이트 | 시점 | GO 조건 (AND) | NO-GO 시 대응 |
|-------|-----|------------|-----------|
| **G0 → G1** | 2026.10 | 12 플랫폼 특성 자가평가 완료 + AI 정책 3-Bucket 초안 + VSM 매핑 완료 | Phase 0 연장 2~3개월 |
| **G1 → G2** | 2027.06 | 파일럿 2개 DORA 5메트릭 ≥ 1단계 향상 + Rollback 5분 이내 검증 + CFR ≤ 15% | 파일럿 시스템 추가 (최대 4개까지) |
| **G2 → G3** | 2028.06 | 플랫폼 12 특성 평균 "Moderately" 이상 + BILL-MF 분해 50% 이상 + 7 AI 역량 베이스라인 | Phase 2 연장 3~6개월, Critical Path 재설계 |
| **G3 → G4** | 2029.03 | 7 AI 역량 평균 스코어 ≥ 평균 + AI ROI 잠금 해소 측정 가능 + Cluster 6/7 진입 시스템 ≥ 30% | AI 도입 속도 재조정 |
| **G4 완료** | 2029.10 | Cluster 6/7 진입 시스템 ≥ **50%** + DORA 5메트릭 전 지표 Top 50% + TCO 절감 Base 7% 이상 | Phase 4 연장 + 근본원인 분석 |

### 3.4 Critical Path — BILL-MF (24~36개월)

| 단계 | 기간 | 내용 | 리스크 |
|------|-----|------|------|
| 1. BILL-MF 분해 설계 | 6~9개월 | DDD + Event Storming + Context Map 확정 | KT 표준 의존 협의 필요 |
| 2. Strangler Fig 1차 | 6~9개월 | 저위험 도메인(상품·대리점 정산) 분리 | KT 공동 변경 관리 |
| 3. Core 분해 | 6~12개월 | 요금·빌링 엔진 Rearch | BILL 중단 불가 (SLA 99.95%) |
| 4. 레거시 정지 | 6~9개월 | 데이터 마이그레이션 + Cutover + 병행 운영 | 회귀 테스트 100% 요구 |

> BILL-MF 실패 시 Phase 3 GO/NO-GO에 직접 영향 → **R-P-02 최우선 리스크**로 관리 (§5 참조).

### 3.5 24개 시스템 Phase 배정 요약

| Phase | 시스템 수 | 6R 분포 | 키 시스템 |
|-------|--------|--------|--------|
| Phase 1 (Quick Win) | 2 (파일럿) | Replatform 1 + Refactor 1 | DLR-PORTAL, PROD-CAT |
| Phase 2 (Core Rearch) | 9 | Rearch 6 + Rebuild 3 | BILL-MF, CRM, IDP, PAY, DW 등 |
| Phase 3 (AI 활성화) | 7 | Refactor 5 + Replatform 2 | 다수 중간 시스템 |
| Phase 4 (Sustain) | 6 | Retain 3 + Retire 2 + Repurchase 1 | 저가치·저위험 정리 |

---

## 4. 어떻게(HOW) — 아키텍처·거버넌스·변화관리

> **집필**: 정민호 (아키텍처), 윤하늘 (거버넌스·가드레일), 강연우 (변화관리)  
> **출처**: Step 3 `1-6r-detail.md`, `5-governance-guardrail.md`, `6-change-mgmt.md`, Step 2 `6-bounded-context.md`

### 4.1 아키텍처 전략 — 6R × AI 7역량 매핑

| 6R | 시스템 수 | AI 7역량 활성화 | 대표 시스템 |
|----|--------|--------------|--------|
| **Rearchitect** | **6** | 7/7 전체 활성화 (AI ROI 최대) | BILL-MF, CRM, PAY |
| **Rebuild** | **3** | 7/7 전체 활성화 | IDP, DW |
| **Refactor** | 6 | 4~5/7 활성화 (Strong Version Control + Small Batch + User-centric) | PROD-CAT 등 |
| **Replatform** | 3 | 3~4/7 활성화 | DLR-PORTAL 등 |
| **Repurchase** | 1 | SaaS 의존 | 인사·전자결재 |
| **Retire/Retain** | 5 | 0~1/7 | 레거시 정리 대상 |

> **규칙(DORA 2025 §06)**: "Rehost(Lift & Shift)는 AI ROI 잠금 해소 효과 거의 없음 — 전략적 우선순위 ↓" → HBT 24개 중 **Rehost 0건**으로 배정 (도현의 Rule-Traceable 원칙).

### 4.2 Bounded Context — 8개 (DDD + Event Storming 결과)

1. **고객 관리** (CRM · IDP · PORTAL · DLR-PORTAL)  
2. **상품·카탈로그** (PROD-CAT · 상품관리)  
3. **요금·빌링** (BILL-MF · 요금엔진)  
4. **결제·정산** (PAY · 정산)  
5. **네트워크 운영** (NMS · 프로비저닝)  
6. **콜센터·VOC** (CCC · VOC)  
7. **분석·BI** (DW · 리포팅)  
8. **공통·관리** (인사·전자결재·공통)  

### 4.3 VSM — As-Is 22주 → To-Be 1~7일

| 가치 흐름 단계 | As-Is | To-Be (Base) | 단축률 |
|------------|------|-----------|------|
| 요구사항 접수·분석 | 4주 | 3일 | -93% |
| 설계 | 3주 | 2일 | -90% |
| 개발 | 6주 | 3일 | -93% |
| QA·회귀 테스트 | 4주 | 자동화(0.5일) | -97% |
| 배포·검증 | 3주 | 0.5일 | -97% |
| 안정화 | 2주 | 1일 | -93% |
| **Total** | **22주** | **1~7일** | **-95~-99%** |

### 4.4 거버넌스 — 5 회의체

| 회의체 | 주기 | 참여자 | 역할 | DORA 2025 보강 |
|-------|-----|------|------|----------|
| **Steering** | 월 1회 | CEO·CFO·CIO·사업부장 | 전략·예산·우선순위 | "AI 정책" 정기 안건 (§06) |
| **Working Group** | 주 1회 | PMO + 리드 7인 | 실행 조정 | VSM 분기 1회 재매핑 |
| **ARB (Architecture Review Board)** | 2주 1회 | EA·아키텍트 | 아키텍처 승인 | **12 플랫폼 특성** 게이트 |
| **Risk Committee** | 월 1회 | 리스크·보안·법무 | 리스크 추적·에스컬레이션 | AI 도입 메트릭 정기 보고 |
| **Cost Committee** | 분기 1회 | CFO·재무·IT 재무 | TCO·BEP 추적 | AI 인프라 비용 분리 |

### 4.5 6 가드레일 — Phase별 단계적 도입

| # | 가드레일 | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|--------|--------|--------|--------|--------|--------|
| 1 | **SAST** (정적 보안) | 도입 계획 | 파일럿 시스템 100% | Phase 2 시스템 100% | 전사 | 지속 |
| 2 | **SCA** (오픈소스 취약점) | 도입 계획 | 파일럿 100% | Phase 2 100% | 전사 | 지속 |
| 3 | **회귀 테스트 자동화** | 베이스라인 측정 | 파일럿 70%+ | Phase 2 85%+ | 전사 90%+ | 95%+ |
| 4 | **Contract Test** | 도입 계획 | 파일럿 API 100% | 핵심 API 100% | 전사 | 지속 |
| 5 | **DAST** (동적 보안) | - | 파일럿 주 1회 | Phase 2 주 1회 | 전사 | 지속 |
| 6 | **Chaos Engineering** | - | - | Phase 2 핵심 시스템 | 전사 월 1회 | 주 1회 |

### 4.6 AI 정책 — 3-Bucket (DORA 권장)

| Bucket | 항목 수 | 예시 |
|--------|-------|------|
| **Allowed** (저위험·고가치) | **15** | 보일러플레이트 생성, 비독점 데이터 브레인스토밍, 내부 설계 문서 요약, 테스트 코드 초안 생성 |
| **Permitted with Guardrails** (조건부 허용) | **8** | 사내 AI 도구로만 독점 소스 코드 사용, 모든 AI 생성 코드 human-in-the-loop 필수, PII 마스킹 후 활용 |
| **Prohibited** (금지) | **10** | 고객 PII/영업비밀을 공개 AI 모델에 입력, 보안 키/비밀번호 프롬프트 포함, 규제 데이터 외부 전송, KT 표준 프로토콜 변경 |

> **정책 거버넌스 원칙(DORA §07 역량 1)**: Living document + 분기별 검토 + 공개 포털 게재 + 피드백 루프.  
> **안티패턴 회피**: Static 정책, 너무 잦은 변경, 법무·보안만의 myopic view.

### 4.7 3-색 에스컬레이션

| 색 | 기준 | 조치 | 책임자 |
|---|-----|-----|------|
| 🟢 **Green** | 모든 게이트 조건 충족, DORA 5메트릭 계획대로 | 월간 리뷰만 | PMO |
| 🟡 **Yellow** | 1~2개 메트릭 미달, Phase 내 회복 가능 | Working Group 주 1회 집중 리뷰, Risk Committee 보고 | PMO + 리드 |
| 🔴 **Red** | 3개+ 메트릭 미달 또는 Critical Path 지연 | **Steering 임시 소집 (72시간 이내)**, Phase 일정 재수립 | CIO + CFO |

### 4.8 변화관리 — Phase × 6축 매트릭스

| 축 | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|----|--------|--------|--------|--------|--------|
| **커뮤니케이션** | 14 stakeholder 2x2 매핑, 7 클러스터 메시지 | 파일럿 성공 스토리 사내 채널 공유 | BILL-MF 분해 투명 공개 (주간 진척) | AI Mirror 메시지 라이브러리 배포 | 전사 Town Hall 분기 1회 |
| **교육** | DORA 설문 교육, 12 플랫폼 특성 워크숍 | 파일럿 팀 Trunk-based·Small Batch 교육 | 전사 AI 3-Bucket 교육 | RAG·MCP 활용 교육 | CoP 주도 지속 학습 |
| **조직** | 워킹그룹·CoP 준비 | 플랫폼 팀 시드 (4명) | 플랫폼 팀 확장 (4→10명), PM 임명 | AM/AI/DevSecOps/User CoP 활성화 | 페더레이션 모델 전환 |
| **프로세스** | VSM As-Is 매핑 | 파일럿 GitOps·Feature Toggle | Contract Test·DAST 전사 확산 | Canary·Blue-Green 표준화 | 지속 개선 표준 공정 |
| **문화** | "Celebrate Progress, Not Attainment" 선언 | "Embrace Failure" 사례 공유 세션 | Hackathon 분기 1회 | Failure Share 월 1회 | 3대 원칙 내재화 측정 |
| **측정** | DORA 5 베이스라인 + 12 플랫폼 특성 | 파일럿 메트릭 주간 | H.E.A.R.T. 플랫폼 측정 | 7 AI 역량 반기 평가 | Cluster 6/7 진입률 반기 |

### 4.9 4개 CoP (Community of Practice)

1. **AM CoP** — Strangler Fig·DDD·6R 실전 사례 공유  
2. **AI CoP** — Context Engineering·RAG·MCP·3-Bucket 운영  
3. **DevSecOps CoP** — 6 가드레일·GitOps·Chaos  
4. **User-centric CoP** — NPS·CSAT·사용자 여정 분석  

### 4.10 AI Mirror 메시지 (§07 인용)

> **"AI는 조직의 강점을 증폭하고 약점도 증폭함. 작동 중인 것에 빛을 비추고,  
> 변화가 필요한 것을 드러냄. 볼 준비가 된 조직에게 AI는 로드맵이 됨."**  
> (DORA 2025 The AI Mirror Chapter — Phase 1 킥오프 슬라이드 1페이지 채택 예정)

---

## 5. 위험(RISK) — Top 5 위험과 대응

> **집필**: 윤하늘 (리스크·거버넌스 리드, Evidence-Measurable)  
> **출처**: Step 3 `4-risk.md`

### 5.1 21개 리스크 · 9-셀 매트릭스 요약

| 영향 \ 발생확률 | Low | Med | High |
|--------------|-----|-----|------|
| **High** | 2건 | **3건 (R-D-02, R-B-01, R-T-02)** | **2건 (R-P-02, R-D-01)** |
| **Med** | 4건 | 5건 | 3건 |
| **Low** | 1건 | 1건 | 0건 |

> Phase 1 위험 가중치 합계 **32** (최대치) — 파일럿 실패 시 전체 프로그램 신뢰도 붕괴 리스크 집중.

### 5.2 Top 5 리스크 심층 분석

#### R-P-02 (High·High, 가중치 9) — BILL-MF KT 표준 의존

- **설명**: BILL-MF는 KT 네트워크 과금 표준과 직접 결합 → 분해 설계 시 KT 공동 변경 관리 필요.  
- **영향**: Phase 3 GO/NO-GO 게이트에 직접 영향, Critical Path 6~12개월 지연 가능.  
- **대응**:  
  1. 2026.Q2부터 KT와 **분기 1회 기술 공동 회의체** 신설 (윤하늘 주관)  
  2. Phase 2 Strangler Fig 1차는 **KT 비의존 도메인(상품·대리점 정산)** 우선  
  3. Phase 3 진입 전 **KT 기술 합의서** 필수 (G2 게이트 조건)  
  4. NO-GO 시 Phase 3 6개월 지연 예산 55~90억 사전 확보  

#### R-D-01 (High·High, 가중치 9) — AI Rework 폭증

- **설명**: AI Copilot 활성화 후 작은 배치·Small Batch 원칙 미숙 시 Rework Rate **+40~70%** 가능 (DORA 2025 2024 vs 2025 비교).  
- **영향**: CFR 악화 → SLA 위반 → Phase 2 게이트 실패.  
- **대응**:  
  1. Phase 1 파일럿에서 **Rework Rate 주간 측정** + 임계치 15% 초과 시 AI 도구 사용 일시 중단  
  2. 모든 AI 생성 코드 **human-in-the-loop** 필수 (3-Bucket 정책 Permitted)  
  3. **PR 라인 수 < 300** 강제, 초과 시 자동 리뷰 reject  
  4. Contract Test + 회귀 테스트 자동화로 Rework 조기 발견  

#### R-T-02 (Med·High, 가중치 6) — 동시 Rearch 3개 이상 발생

- **설명**: Phase 2에서 Rearch 6개 시스템이 서로 종속 관계 있어 동시 진행 시 데이터 불일치·배포 충돌 가능.  
- **영향**: Phase 2 일정 3~9개월 지연, 인건비 +30~70억.  
- **대응**:  
  1. ARB에서 **Rearch 동시 진행 최대 2개** 규칙 확정  
  2. Context Map 기반 **의존성 DAG** 구축, 임계경로 상 시스템 우선  
  3. 플랫폼 팀이 **공통 이벤트 브로커** Phase 1에 선제 구축  

#### R-D-02 (Med·High, 가중치 6) — IDP SPOF (단일 장애 지점)

- **설명**: IDP(Identity Provider)는 24개 중 20개 시스템이 의존 → 분해 중 장애 시 전사 영향.  
- **영향**: 장애 1건 당 30분~4시간 전사 다운, SLA 위약금 10~50억/건.  
- **대응**:  
  1. IDP는 **Phase 1'에 병행 파일럿** 검토 (DLR-PORTAL·PROD-CAT 대비 리스크 높지만 선행 필요)  
  2. **Blue-Green 배포 + 5분 내 롤백** 의무  
  3. Chaos Engineering Phase 2 IDP 최우선 적용  
  4. 백업 IDP (Keycloak SaaS) Phase 0에 조달 완료  

#### R-B-01 (Med·High, 가중치 6) — AI ROI 스폰서십 이탈

- **설명**: CFO 또는 사업부장이 Phase 1 종료 시점(Year 1 BEP 미도달)에 "AI ROI 안 나온다" 판단 시 Phase 2 예산 축소 가능.  
- **영향**: Phase 2 예산 30~50% 삭감, 전체 프로그램 1.5~2년 지연.  
- **대응**:  
  1. **월간 CFO 브리핑** 정기화 (재원 주관) — 단기 지표 + 장기 BEP 병행 제시  
  2. **AI ROI 잠금 해소 지표** 별도 추적 (§2.5, 연 200~400억)  
  3. DORA Figure 49 **경영진 핵심 카드 5장** (부록 B) 반복 노출  
  4. 외부 벤치마크 (행정안전부·근로복지공단) 분기 1회 업데이트  
  5. Phase 1 종료 시 **"AM 없이 AI 투자했을 때 기회비용"** 역산 제시  

### 5.3 리스크 거버넌스 운영

- **월간 Risk Committee**: 21개 리스크 상태 레드/옐로/그린 업데이트  
- **분기 Steering 보고**: Top 5 리스크 + 신규 식별 리스크  
- **게이트 조건**: 각 Phase 종료 시 **Top 5 리스크 중 3개 이상 Green** 필수  
- **엄격한 증거 요구**: 모든 리스크 상태는 정량 메트릭으로 증명 (하늘/Evidence-Measurable)  

---

## 부록 A. 현황 분석 요약 (Step 2)

> **집필**: 박도현 (EA·인벤토리 아키텍트, Rigor-First)

### A.1 인벤토리 (24개 시스템 · 8 서브도메인)

- **운영비**: 연 **620억** (인건비 포함)  
- **DORA 8대 질문 응답 완료** (Deploy Freq, Lead Time, Recovery, CFR, Rework, AI 컨텍스트 가능성, PR 크기, Trunk-based)  
- **의존성 핫스팟 Top 5**: CRM, BILL, IDP, PAY, DW  

### A.2 A/B/C 등급 (24개 시스템)

| 등급 | 정의 | 시스템 수 | DORA 클러스터 |
|-----|-----|--------|-----------|
| **A** (핵심·긴급) | 비즈니스 Critical + 기술 악화 | **12** | Cluster 2 (Legacy Bottleneck) + Cluster 4 |
| **B** (중요·안정) | 비즈니스 중요 + 기술 양호 | 9 | Cluster 5/6 |
| **C** (저우선) | 비즈니스 저가치 또는 Retire 후보 | 3 | Cluster 1 |

> **Cluster 2 (Legacy Bottleneck) 비율 33%** — DORA 글로벌 평균 대비 **1.5배 높음**, AM 시급성의 데이터적 증거.

### A.3 건강도 12차원 스코어카드

| 결과 | 시스템 수 |
|-----|--------|
| 🟢 양호 | 5 |
| 🟡 보통 | 12 |
| 🔴 취약 | 7 |

- 기존 4차원: 비즈니스 가치 · 기술 품질 · 데이터 결합도 · 운영 안정성  
- DORA 8차원: 7 AI 역량 + 12 플랫폼 특성 집계  

### A.4 기술부채 비용 — 연 890~1,600억

| 부채 항목 | 연 비용 |
|---------|------|
| 레거시 유지보수 오버헤드 | 210~350억 |
| 장애·SLA 위약금 | 430~1,140억 |
| 보안 취약점 대응 지연 | 80~130억 |
| 신규 기능 기회비용 | 150~280억 |
| 인력 이탈·채용 난항 | 70~120억 |
| 문서·지식 사일로 | 50~80억 |
| **AI ROI 잠금 기회비용** | **200~400억** (별도 추적) |
| **합계** | **890~1,600억 (+ AI 잠금 200~400억)** |

> 운영비 620억 대비 **2.6배** (Base) — "운영비가 작아도 기술부채가 더 큰 실제 비용" (재원/도현 공동 분석).

### A.5 6R · TIME 매칭 (24개 전수)

- Rule-Traceable: 모든 6R 결정에 룰북 규칙 ID 기록 (민호/Rule-Traceable)  
- Rearch 6 + Rebuild 3 = **9개 시스템에 AI 7역량 전체 활성화** 가능  

### A.6 Bounded Context · VSM

- 8 Bounded Context (§4.2 참조)  
- VSM As-Is 22주 → To-Be 1~7일 (§4.3 참조)  

### A.7 변화관리 조기 착수

- 14 이해관계자 그룹 × 2x2 매트릭스  
- 7 클러스터 메시지 라이브러리  
- 3 워크숍 유형 (임원·관리자·실무)  

---

## 부록 B. DORA 인용 모음 (경영진 핵심 메시지 5장)

> **필수 포함 — 본 부록의 5개 메시지는 경영진 보고서·Town Hall·투자 승인 문서에 반복 인용할 것.**

### 카드 1 — 속도와 안정성은 트레이드오프가 아님

> **"상위 40%(Cluster 6·Harmonious high-achiever 7)는 속도와 안정성 모두 우수함."**  
> — DORA 2025 Cluster 분포 (§01)

**HBT 적용**: "안정성을 위해 속도를 포기할 수밖에 없다"는 기존 IT 본부 방어 논리는 데이터로 반박 가능.

### 카드 2 — 모더한 조직은 20%가 이미 도달한 현실

> **"Harmonious high-achiever (Cluster 7) — 20%의 조직이 이미 도달한  
> '안정적이고 빠르며 의미 있는' 일상."**  
> — DORA 2025 (§06 "개발팀용 메시지")

**HBT 적용**: 비현실적 목표가 아니라 **글로벌 20%가 달성한 현실**. Phase 4 목표 = Cluster 6/7 50%.

### 카드 3 — AI는 증폭기임 (Amplifier)

> **"In 2025, the central question for technology leaders is no longer if they should adopt AI,  
> but how to realize its value. AI's primary role in software development is that of an amplifier.  
> It magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones."**  
> — DORA 2025 Executive Summary (§06 직접 인용)

**HBT 적용**: AI는 중립 도구가 아님. HBT의 **현재 기술부채를 증폭**하기 전에 AM 전환 필수.

### 카드 4 — AM 없는 AI 투자 = ROI 0 (가장 중요)

> **"An investment in AI without a corresponding investment in high-quality platforms  
> is unlikely to yield significant returns at the organizational level."**  
> — DORA 2025 Platform Engineering Chapter (§06 직접 인용 / Figure 49)

**HBT 적용**: HBT 2025 AI Copilot 파일럿 결과 "ROI 측정 불가"는 **예측된 결과**. AM = AI ROI의 전제조건.

### 카드 5 — AI Mirror — 볼 준비가 된 조직의 로드맵

> **"AI shines a light on what's working, accelerating what's already in motion,  
> but it also surfaces what needs to change. For organizations ready to look,  
> the reflection AI offers becomes a roadmap."**  
> — DORA 2025 The AI Mirror Chapter (§06 직접 인용)

**HBT 적용**: Phase 1 킥오프 슬라이드 1페이지 채택 — "HBT는 볼 준비가 된 조직" 선언.

### 추가 인용 — 실무 활용용

> **"AI 시대에는 호기심·적응·학습이 더 중요함. 안전하게 실패할 수 있는 환경이 핵심."**  
> — DORA AI Capabilities Model 2025 (§07 Continuous Improvement)

> **"To realize the potential of AI, remember that its primary role is that of an amplifier.  
> Focus on investing in the foundational technical and cultural environment and cultivating  
> key capabilities like those in DORA's AI Capabilities Model."**  
> — DORA AI Capabilities Model 2025, Conclusion (§07)

> **"Get better at getting better."**  
> — DORA 핵심 슬로건 (§07)

---

## 부록 C. 용어집 및 참고문헌

### C.1 용어집

| 용어 | 정의 |
|------|------|
| **AM** | Application Modernization — 레거시 시스템을 현대적 아키텍처·플랫폼으로 전환 |
| **6R** | Retain · Rehost · Replatform · Refactor · Rearchitect · Rebuild · Replace · Retire |
| **DORA** | DevOps Research and Assessment — 구글 소속, 연례 State of DevOps 보고서 발간 |
| **DORA 5메트릭** | Deployment Frequency, Lead Time for Changes, Change Fail Rate, Failed Deployment Recovery Time, Rework Rate |
| **DORA 7 클러스터** | Foundational challenges (1) ~ Harmonious high-achiever (7) |
| **DORA 7 AI 역량** | Clear AI Stance, Healthy Data Ecosystems, AI-accessible Internal Data, Strong Version Control, Small Batches, User-centric Focus, Quality Internal Platforms |
| **12 플랫폼 특성** | DORA 2025 플랫폼 품질 측정 12개 항목 |
| **TIME 매트릭스** | Tolerate · Invest · Migrate · Eliminate (Gartner) |
| **Strangler Fig** | 레거시 주변에 새 시스템을 점진 배치 후 대체하는 패턴 (Martin Fowler) |
| **Blue-Green** | 2개 환경 병행 배포로 무중단 전환 |
| **Canary** | 일부 사용자에게 먼저 배포 후 점진 확대 |
| **DDD** | Domain-Driven Design — 도메인 중심 설계 |
| **Event Storming** | DDD 워크숍 기법, 이벤트 중심 도메인 발견 |
| **Bounded Context** | DDD의 의미적 경계 단위 |
| **VSM** | Value Stream Management — 가치 흐름 가시화·최적화 |
| **TCO** | Total Cost of Ownership — 총소유비용 |
| **BEP** | Break-Even Point — 투자 회수 시점 |
| **CFR** | Change Fail Rate — 변경 실패율 |
| **SPOF** | Single Point of Failure — 단일 장애 지점 |
| **CoP** | Community of Practice — 실천 커뮤니티 |
| **RAG** | Retrieval-Augmented Generation — 검색 증강 생성 |
| **MCP** | Model Context Protocol — AI에 도구·컨텍스트 제공 표준 |
| **SAST / SCA / DAST** | Static / Software Composition / Dynamic Application Security Testing |
| **H.E.A.R.T.** | Happiness · Engagement · Adoption · Retention · Task Success (Google 프레임워크) |
| **3-Bucket** | Allowed · Permitted with Guardrails · Prohibited (DORA 권장 AI 정책) |

### C.2 참고문헌

1. **DORA 2025 State of DevOps Report** — Google (2025). 응답자 4,997명, 90% AI 사용.  
2. **DORA AI Capabilities Model Guide** (2025.12) — 97페이지 실행 가이드. `2025_dora_ai_capabilities_model.pdf`.  
3. **행정안전부 공공사례 발표 (2026.03.11)** — 7년 누적 TCO 18.4% 절감, 장애율 81% 감소, 배포 속도 114% 향상.  
4. **근로복지공단 AM 프로젝트 사례** — Lead Time 23배 단축.  
5. **Gartner TIME Matrix** — Application Portfolio Management.  
6. **Martin Fowler, Strangler Fig Application** — martinfowler.com.  
7. **AWS·Azure 6R Framework Localization** — 6~7R 한국 사례.  
8. **ISO/IEC 27001·27701** — 보안·개인정보 거버넌스 기준.  
9. **PMBOK 7판 Governance** — 프로그램 게이트 기준.  

### C.3 내부 산출물 (본 보고서 기반 자료)

| 구분 | 파일 | 집필자 |
|-----|-----|------|
| Step 1-1 | `output/hbt/step1/1-drivers.md` | 지민 |
| Step 1-2 | `output/hbt/step1/2-quant-L1.md` | 지민·재원 |
| Step 1-3 | `output/hbt/step1/3-sponsorship.md` | 지민 |
| Step 1-통합 | `output/hbt/step1/why-statement.md` | 지민 |
| Step 2-1 | `output/hbt/step2/1-inventory.md` | 도현 |
| Step 2-2 | `output/hbt/step2/2-abc.md` | 도현 |
| Step 2-3 | `output/hbt/step2/3-healthscore.md` | 도현 |
| Step 2-4 | `output/hbt/step2/4-techdebt-cost.md` | 도현·재원 |
| Step 2-5 | `output/hbt/step2/5-fit-6r-time.md` | 민호 |
| Step 2-6 | `output/hbt/step2/6-bounded-context.md` | 민호 |
| Step 2-7 | `output/hbt/step2/7-change-kickoff.md` | 연우 |
| Step 3-1 | `output/hbt/step3/1-6r-detail.md` | 서윤·민호 |
| Step 3-2 | `output/hbt/step3/2-portfolio-phase.md` | 서윤 |
| Step 3-3 | `output/hbt/step3/3-tco-bep.md` | 재원 |
| Step 3-4 | `output/hbt/step3/4-risk.md` | 하늘 |
| Step 3-5 | `output/hbt/step3/5-governance-guardrail.md` | 하늘 |
| Step 3-6 | `output/hbt/step3/6-change-mgmt.md` | 연우 |
| **Step 3-통합 (본 보고서)** | **`output/hbt/step3/strategy-report.md`** | **서윤 (대표 집필)** |

### C.4 참고 — DORA 원문 링크

- `references/dora/01-software-delivery-performance.md` — 5메트릭 분포 원본  
- `references/dora/06-am-transformation-implications.md` — AM 시사점 종합  
- `references/dora/07-ai-capabilities-implementation.md` — AI 7역량 실행 가이드  

---

**문서 끝**  
_"AM 없는 AI ROI는 0. HBT는 지금 시작함."_  
— 서윤 (대표 집필), 지민·도현·민호·재원·하늘·연우 공동  
2026-04-18
