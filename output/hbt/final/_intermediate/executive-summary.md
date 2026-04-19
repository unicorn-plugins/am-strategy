# HBT AM 전환 전략 — 경영진 요약 보고서

**문서 버전**: v1.0 (2026-04-18)  
**대상**: HBT(하이브리지텔레콤) 경영진 (CEO·CFO·CIO·사업부장)  
**분량**: ≤20장 (경영진 압축본)  
**검토 상태**: APPROVED WITH CONDITIONS (지환 / 전략 감사역, 2026-04-18)  
**구조 원칙**: 왜(WHY) → 얼마(TCO/BEP) → 언제(Phase) → 어떻게(6R/파일럿) → 위험(리스크·가드레일)

---

## 표지 요약 — 한 줄 메시지

> **"AM 전환 없이 AI 투자 ROI는 0.  
> HBT는 지금 3년 403~835억을 투자해  
> 연 1,117~1,600억의 기술부채·AI 기회비용을 상환하고,  
> 24개 시스템을 Cluster 6/7(상위 40%) 궤도로 올린다."**

(DORA 2025 Figure 49 · 행정안전부 2026.03.11 · 근로복지공단 23배 단축 사례 기반)

---

## 1장. Executive Summary — 5단 브리핑

| 구분 | 핵심 메시지 | 핵심 수치 |
|------|-----------|---------|
| **왜** | Lead Time 22주(글로벌 하위 2%) · IT 운영비 증가율(+7.3%)이 매출 증가율(+1.8%)의 4배 · AI 도구만 도입 시 ROI ≈ 0 | 4S+혁신 5개 동인 전부 AM 필수 판정 |
| **얼마** | 3년 누적 투자 **403~835억**(Conservative/Base/Optimistic) · 기술부채 연 890~1,600억 상환 · AI ROI 잠금 해소 연 200~400억 | **BEP 1.8~4.2년 · 5년 ROI 498~593%** |
| **언제** | **Phase 0~4, 30~42개월** · Phase 1' 파일럿 2개(DLR-PORTAL 1호 · PROD-CAT 2호) · BILL-MF Critical Path 24~36개월 | 게이트 5개, DORA 5메트릭으로 GO/NO-GO |
| **어떻게** | 6R 상세(Rearch 6 + Rebuild 3 = 9개 AI 7역량 전체 활성화) · 5 회의체 · 6 가드레일 · AI 3-Bucket 정책 · 변화관리 Phase × 6축 | 8 Bounded Context, VSM 22주→1~7일 |
| **위험** | Top 5 리스크(BILL-KT 의존 · AI Rework · 동시 Rearch · IDP SPOF · AI ROI 스폰서십) · Phase 1 가중치 32(최대) · 3-색 에스컬레이션 | 21개 리스크 매트릭스 · 월간 리뷰 |

### 의사결정 요청 사항 (5건)

1. 본 보고서 **Phase 0 착수 승인** (6개월, 35~60억, 2026.05.01~2026.10.31)
2. **Phase 0 게이트 통과 시 Phase 1 자동 승인 조건** 합의 (DORA 5메트릭 베이스라인 + 12 플랫폼 특성 자가평가 완료)
3. **CFO 공동 스폰서십** 확정 (TCO·BEP 추적 주관)
4. **리스크·거버넌스 위원회** 2026.05.15 이전 발족
5. **변화관리 예산 별도 계정** 신설 (전체의 8~12%, 32~100억)

---

## 2~3장. 왜(WHY) — AM 전환의 불가피성

### 2장. 5개 동인 — 구조적 위기 진단

| # | 동인 | HBT 현황 | DORA 2025 포지션 | AM 필요성 |
|---|------|---------|------------------|---------|
| 1 | **Speedy** | 신규 기능 Lead Time **평균 22주** | 글로벌 하위 2% (98%가 1개월 이내) | **필수** — 경쟁사 대비 5~10배 느림 |
| 2 | **Service Always** | 장애 복구 평균 **4.8시간**, CFR **24%** | 하위 40%, CFR 상위 62% 구간 | **필수** — SLA 위반 연 12건 |
| 3 | **Save Cost** | IT 운영비 증가율 **+7.3%** vs 매출 **+1.8%** | 4배 격차 지속 시 3년 후 영업이익률 -2.1%p | **필수** — 비용 구조 붕괴 임박 |
| 4 | **Security** | 레거시 CVE 미패치 **137건**, SAST 자동화 **0%** | 금감원 2026 제재 대상 후보 | **필수** — 규제 리스크 정량화 |
| 5 | **혁신(AI)** | AI Copilot 파일럿 **ROI 측정 불가** (2025) | Figure 49: 플랫폼 품질 없이 ROI ≈ 0 | **필수** — AI 투자 자체가 좌초 |

> **결론**: 5개 동인 모두 "AM을 해야 한다 / 안 해야 한다"가 아니라 **"얼마나 빨리 해야 하는가"의 문제**.

### 3장. 3가지 결정 근거 + DORA 핵심 인용

**① DORA 2025 Figure 49 (4,997명 조사)**

> **"An investment in AI without a corresponding investment in high-quality platforms  
> is unlikely to yield significant returns at the organizational level."**  
> — DORA 2025 Platform Engineering Chapter

HBT 2025 AI Copilot 파일럿 결과(ROI 측정 불가)는 **예측된 결과**임. AM = AI ROI의 전제조건.

**② 행정안전부 2026.03.11 외부 검증**

- 7년 누적 TCO **18.4% 절감** (HBT Base 7~10% × 7년 환산 ≈ 17~20%, 일치)
- 장애율 **81% 감소** — HBT SLA 위약금 430~1,140억 → 0~15억 (98~99%)
- 배포 속도 **114% 향상** — HBT Lead Time 22주→1~7일 = 2,100~15,400% 향상

**③ 근로복지공단 사례**

- Lead Time **23배 단축** (응답시간 4.44초 → 0.19초)
- HBT 22주 → 7일 = 22배 단축 목표와 **일치**

> **연기 비용 역설**: AM을 1년 늦출 때마다 기술부채 연 +10~15% 누증 → **1년 지연 = 178~240억 손실(Base)**  
> "연기 비용 > 투자 비용"이 **2026년부터 영구 성립**.

---

## 4~6장. 얼마(TCO/BEP) — 3년 투자 규모와 회수

### 4장. 3년 총투자 — 3 시나리오

| 시나리오 | 3년 투자 총액 | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---------|-----------|--------|--------|--------|--------|--------|
| **Conservative** | **402.7억** | 35억 | 58억 | 142억 | 112억 | 55.7억 |
| **Base** | **619.6억** | 47.5억 | 89억 | 218.5억 | 172.6억 | 92억 |
| **Optimistic** | **835.4억** | 60억 | 120억 | 295억 | 233억 | 127.4억 |

> **경영진 활용 원칙**: **Base를 플래닝 기준**, Conservative를 **예산 확정 기준**, Optimistic을 **성과 압박 기준**으로 사용 권장.

### 5장. BEP · 5년 ROI

| 시나리오 | BEP | 5년 누적 효익 | 5년 투자 | ROI |
|---------|-----|---------|-------|-----|
| Conservative | **4.2년** | 2,006억 | 403억 | **498%** |
| **Base** | **2.9년** | 2,854억 | 620억 | **460%** |
| Optimistic | **1.8년** | 4,112억 | 835억 | **593%** |

### 6장. To-Be TCO 절감 효과

| 항목 | As-Is (연간) | To-Be (연간) | 절감률 |
|------|-----------|-----------|------|
| 서버·스토리지 (온프레미스) | 280억 | 45~60억 | -78~-83% |
| 라이선스 (Oracle·WebLogic 등) | 180억 | 70~95억 | -47~-61% |
| 운영 인건비 | 620억 | 220~290억 | -53~-64% |
| 장애·SLA 위약금 | 430~1,140억 | 0~15억 | -99% |
| **총계** | **1,510~2,220억** | **393~512억** | **-74~-77%** |

**AI ROI 잠금 해소 추가 효익**

| 시나리오 | AI 활용 가능 시스템 수 | 연 추가 효익 | 3년 누적 |
|---------|-----------------|----------|-------|
| Conservative | 9개 (Rearch 6 + Rebuild 3) | 120억 | **360억** |
| Base | 15개 (+ Refactor 6) | 240억 | **720억** |
| Optimistic | 22개 (거의 전체) | 360억 | **1,080억** |

---

## 7~8장. 언제(Phase) — 로드맵 개요

### 7장. Phase 0~4 마스터 로드맵 (30~42개월)

```
2026.05 ────────────────────────────────────── 2029.10
  │Phase 0 (4~6M)│  Phase 1 (6~10M)  │  Phase 2 (14~18M)  │  Phase 3 (16~20M)  │  Phase 4 (10~14M)  │
  │  준비·기반    │   Quick Win       │   Core Rearch      │   Rebuild 주력     │   Sustain·안정화   │
  │              │   파일럿 병렬(1')  │   핵심 9개 시스템   │   BILL Critical    │   CoP·VSM·AI 완성  │
  │  게이트 G0→   │   G1→             │   G2→              │   G3→              │   G4 완료          │
```

**Phase별 시스템 배정 요약**

| Phase | 시스템 수 | 6R 분포 | 키 시스템 |
|-------|--------|--------|--------|
| Phase 1 (파일럿, Phase 1') | 2 | Refactor 1 + Replatform 1 | DLR-PORTAL, PROD-CAT |
| Phase 1 (Quick Win) | 8 | Replatform 4 + Rearch 1 + Refactor 1 + Rehost 1 + Retire 1 | IDP-SSO, PAY-GW 등 |
| Phase 2 (Core Rearch) | **10** | Refactor 4 + Rearchitect 5 + Replace 1 | BILL-MF 선행설계, CRM, ORD, NMS 등 |
| Phase 3 (Rebuild 주력) | 2 | Rebuild 2 | FLT-MGT, BILL-MF 본격 |
| Phase 4 (Sustain) | 2 | Rebuild 1 + Replatform 재평가 1 | STL-MF, IDC-OPS |

> **Phase 2 시스템 수**: 총 10개 (CNTR·CMP·BI·CSC·SFA·CRM·ORD·NMS·PRV·DW) — reviewer 보완 반영.  
> strategy-report §3.5의 24개 총합 유지 (Phase 1' 2개 + Phase 1 8개 + Phase 2 10개 + Phase 3 2개 + Phase 4 2개 = 24개).

### 8장. 파일럿 2개 + BILL-MF Critical Path

**파일럿 선정 (2개)**

| 순위 | 시스템 | 6R | 선정 사유 | 기간 |
|-----|-------|----|----|------|
| **1호** | **DLR-PORTAL** | **Refactor** | **비즈니스 가치 A / 파일럿 리스크 B (이중 축)** · 롤백 용이 · 독립 DB · 대리점 9,500명 성과 즉시 가시화 · DORA 5메트릭 베이스라인 측정 가능 | 3~5개월 |
| **2호** | **PROD-CAT** | **Replatform** | B등급(Cluster 5) · 독립 DB · Strangler Fig 적용 가능 · 신상품 출시 리드 2개월→2주 | 2~4개월 |

> **DLR-PORTAL 등급 이중 표기 주의**: `step2/2-abc.md` 기준 **비즈니스 가치 A (BV 5.00)**,  
> 파일럿 리스크 프로파일 기준 **B (핫스팟 아님, 매출 중단 리스크 낮음, 롤백 용이)**. 두 기준 병기.  
> (reviewer 지환 권고 반영 — review-report.md §권고2)

**BILL-MF Critical Path (24~36개월)**

| 단계 | 기간 | 주요 내용 | 리스크 |
|------|-----|------|------|
| 1. 분해 설계 | 6~9개월 | DDD + Event Storming + KT 기술 합의 | KT 표준 의존 |
| 2. Strangler Fig 1차 | 6~9개월 | 비의존 도메인(상품·대리점 정산) 선행 | KT 공동 변경 관리 |
| 3. Core 분해 | 6~12개월 | 요금·빌링 엔진 Rearch | 24x7 무중단 SLA 99.95% |
| 4. Cutover | 6~9개월 | 데이터 마이그레이션 + 병행 운영 | 회귀 테스트 100% 요구 |

---

## 9~12장. 어떻게(6R·파일럿) — 아키텍처·거버넌스·변화관리

### 9장. 6R × AI 7역량 매핑

| 6R | 시스템 수 | AI 7역량 활성화 | 대표 시스템 |
|----|--------|--------------|--------|
| **Rearchitect** | **6** | 7/7 전체 활성화 (AI ROI 최대) | BILL-MF, CRM, PAY, ORD, NMS, DW |
| **Rebuild** | **3** | 7/7 전체 활성화 | IDP-SSO, FLT-MGT, STL-MF |
| **Refactor** | 6 | 4~5/7 활성화 | PROD-CAT, CNTR, CMP, BI, CSC, MY-APP |
| **Replatform** | 3 | 3~4/7 활성화 | DLR-PORTAL, INV-RES, CC-IVR |
| **Repurchase** | 1 | SaaS 의존 | SFA-ENT (Salesforce) |
| **Retire/Rehost** | 5 | 0~1/7 | COLL-LGC 등 |

> **규칙 (DORA 2025 §06)**: "Rehost(Lift & Shift)는 AI ROI 잠금 해소 효과 거의 없음" → HBT 24개 중 **Rehost 전략적 최소화** 원칙.

**Bounded Context 8개 (DDD + Event Storming)**

1. 고객 관리 (CRM · IDP · PORTAL · DLR-PORTAL)
2. 상품·카탈로그 (PROD-CAT · 상품관리)
3. 요금·빌링 (BILL-MF · 요금엔진)
4. 결제·정산 (PAY · 정산)
5. 네트워크 운영 (NMS · 프로비저닝)
6. 콜센터·VOC (CCC · VOC)
7. 분석·BI (DW · 리포팅)
8. 공통·관리 (인사·전자결재·공통)

### 10장. VSM 단축 효과 + 거버넌스 5 회의체

**VSM — As-Is 22주 → To-Be 1~7일**

| 가치 흐름 단계 | As-Is | To-Be (Base) | 단축률 |
|------------|------|-----------|------|
| 요구사항 접수·분석 | 4주 | 3일 | -93% |
| 설계 | 3주 | 2일 | -90% |
| 개발 | 6주 | 3일 | -93% |
| QA·회귀 테스트 | 4주 | 자동화(0.5일) | -97% |
| 배포·검증 | 3주 | 0.5일 | -97% |
| 안정화 | 2주 | 1일 | -93% |
| **Total** | **22주** | **1~7일** | **-95~-99%** |

**5 회의체 거버넌스**

| 회의체 | 주기 | 참여자 | 주요 역할 |
|-------|-----|------|---------|
| **Steering** | 월 1회 | CEO·CFO·CIO·사업부장 | 전략·예산·우선순위 · AI 정책 정기 안건 |
| **Working Group** | 주 1회 | PMO + 리드 7인 | 실행 조정 · VSM 분기 재매핑 |
| **ARB** | 2주 1회 | EA·아키텍트 | 아키텍처 승인 · 12 플랫폼 특성 게이트 |
| **Risk Committee** | 월 1회 | 리스크·보안·법무 | 21개 리스크 추적 · 에스컬레이션 |
| **Cost Committee** | 분기 1회 | CFO·재무·IT 재무 | TCO·BEP 추적 · AI 인프라 비용 분리 |

### 11장. 6 가드레일 + AI 3-Bucket 정책

**6 가드레일 — Phase별 단계적 도입**

| # | 가드레일 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---|--------|--------|--------|--------|--------|
| 1 | SAST (정적 보안) | 파일럿 100% | Phase 2 100% | 전사 | 지속 |
| 2 | SCA (오픈소스 취약점) | 파일럿 100% | Phase 2 100% | 전사 | 지속 |
| 3 | 회귀 테스트 자동화 | 파일럿 70%+ | Phase 2 85%+ | 전사 90%+ | 95%+ |
| 4 | Contract Test | 파일럿 API 100% | 핵심 API 100% | 전사 | 지속 |
| 5 | DAST (동적 보안) | 파일럿 주 1회 | Phase 2 주 1회 | 전사 | 지속 |
| 6 | Chaos Engineering | — | Phase 2 핵심 시스템 | 전사 월 1회 | 주 1회 |

**AI 3-Bucket 정책 (DORA 권장)**

| Bucket | 항목 수 | 예시 |
|--------|-------|------|
| **Allowed** (저위험·고가치) | **15** | 보일러플레이트 생성, 비독점 데이터 브레인스토밍, 테스트 코드 초안 생성 |
| **Permitted with Guardrails** (조건부) | **8** | 사내 AI 도구로만 독점 소스 코드 사용, AI 생성 코드 human-in-the-loop 필수, PII 마스킹 후 활용 |
| **Prohibited** (금지) | **10** | 고객 PII/영업비밀을 공개 AI 모델 입력, 보안 키/비밀번호 프롬프트 포함, KT 표준 프로토콜 변경 |

### 12장. 변화관리 — Phase × 6축 핵심

| 축 | Phase 0 | Phase 1 (파일럿) | Phase 2 | Phase 4 |
|----|--------|----------------|--------|--------|
| **커뮤니케이션** | 14 stakeholder 2x2 매핑 | 파일럿 성공 스토리 공유 | BILL-MF 분해 주간 투명 공개 | 전사 Town Hall 분기 1회 |
| **교육** | DORA 설문·12 플랫폼 특성 워크숍 | 파일럿 팀 Trunk-based 교육 | 전사 AI 3-Bucket 교육 | CoP 주도 지속 학습 |
| **조직** | 워킹그룹·CoP 준비 | 플랫폼 팀 시드 (4명) | 플랫폼 팀 확장 (4→10명) | 페더레이션 모델 전환 |
| **측정** | DORA 5 베이스라인 + 12 플랫폼 특성 | 파일럿 메트릭 주간 | H.E.A.R.T. 플랫폼 측정 | Cluster 6/7 진입률 반기 |

> **AI Mirror (DORA 2025)**:  
> *"AI shines a light on what's working, but it also surfaces what needs to change.  
> For organizations ready to look, the reflection AI offers becomes a roadmap."*  
> — Phase 1 킥오프 슬라이드 1페이지 채택 예정.

---

## 13~15장. 위험(리스크·가드레일) — Top 5 + 거버넌스

### 13장. 21개 리스크 매트릭스 요약

| 영향 \ 발생확률 | Low | Med | High |
|--------------|-----|-----|------|
| **High** | 2건 | **3건 (R-D-02, R-B-01, R-T-02)** | **2건 (R-P-02, R-D-01)** |
| **Med** | 4건 | 5건 | 3건 |
| **Low** | 1건 | 1건 | 0건 |

> Phase 1 위험 가중치 합계 **32** (최대치) — 파일럿 실패 시 전체 프로그램 신뢰도 붕괴 리스크 집중.

### 14장. Top 5 리스크 심층 — 대응 전략

**R-P-02 (High·High, 가중치 9) — BILL-MF KT 표준 의존**

- **영향**: Phase 3 GO/NO-GO에 직접 영향, Critical Path 6~12개월 지연 가능, 예산 55~90억 추가
- **대응**: 2026.Q2부터 KT와 분기 1회 기술 공동 회의체 신설 · KT 비의존 도메인 우선 · G2 게이트 조건에 KT 기술 합의서 필수

**R-D-01 (High·High, 가중치 9) — AI Rework 폭증**

- **영향**: AI Copilot 활성화 후 Rework Rate +40~70% 가능 (DORA 2025 2024 vs 2025 비교) → CFR 악화 → SLA 위반
- **대응**: Rework Rate 주간 측정 + 임계치 15% 초과 시 AI 도구 사용 일시 중단 · PR 라인 수 < 300 강제

**R-T-02 (Med·High, 가중치 6) — 동시 Rearch 3개 이상**

- **영향**: Phase 2 일정 3~9개월 지연, 인건비 +30~70억
- **대응**: ARB에서 Rearch 동시 진행 최대 2개 규칙 확정 · Context Map 기반 의존성 DAG 구축

**R-D-02 (Med·High, 가중치 6) — IDP SPOF**

- **영향**: 장애 1건당 30분~4시간 전사 다운, SLA 위약금 10~50억/건
- **대응**: Blue-Green 배포 + 5분 내 롤백 의무 · Chaos Engineering IDP 최우선 적용 · 백업 IDP(Keycloak SaaS) Phase 0 조달

**R-B-01 (Med·High, 가중치 6) — AI ROI 스폰서십 이탈**

- **영향**: Phase 2 예산 30~50% 삭감, 전체 프로그램 1.5~2년 지연
- **대응**: 월간 CFO 브리핑 정기화 · AI ROI 잠금 해소 지표(연 200~400억) 별도 추적 · DORA Figure 49 경영진 핵심 카드 반복 노출

### 15장. 3-색 에스컬레이션 + Phase 게이트 조건

**3-색 에스컬레이션**

| 색 | 기준 | 조치 | 책임자 |
|---|-----|-----|------|
| Green | 모든 게이트 조건 충족, DORA 5메트릭 계획대로 | 월간 리뷰만 | PMO |
| Yellow | 1~2개 메트릭 미달, Phase 내 회복 가능 | Working Group 주 1회 집중 리뷰 | PMO + 리드 |
| **Red** | **3개+ 메트릭 미달 또는 Critical Path 지연** | **Steering 임시 소집 (72시간 이내)** | **CIO + CFO** |

**Phase 게이트 요약 — DORA 5메트릭 GO 조건**

| 게이트 | 시점 | 핵심 GO 조건 |
|-------|-----|-----------|
| **G0 → G1** | 2026.10 | 12 플랫폼 특성 자가평가 완료 + AI 3-Bucket 초안 승인 + VSM 매핑 완료 |
| **G1 → G2** | 2027.06 | 파일럿 2개 DORA 5메트릭 ≥ 1단계 향상 + Rollback 5분 이내 + CFR ≤ 15% |
| **G2 → G3** | 2028.06 | 12 플랫폼 특성 평균 "Moderately" 이상 + BILL-MF 분해 50%+ + AI 7역량 베이스라인 |
| **G3 → G4** | 2029.03 | AI 역량 평균 ≥ "평균" + AI ROI 측정 가능 + Cluster 6/7 ≥ 30% |
| **G4 완료** | 2029.10 | Cluster 6/7 ≥ **50%** + DORA 5메트릭 전 지표 Top 50% + TCO 절감 Base 7% 이상 |

---

## 16~17장. 결론 — 의사결정 요청

### 16장. 스폰서십 3단계 + 지금 결정해야 하는 이유

**경영진 스폰서십 구조**

| 레벨 | 스폰서 | 역할 | HBT 현황 |
|------|------|------|--------|
| L1 | CEO | 전사 비전·우선순위 결정 | 2026.Q1 내부 킥오프 완료 |
| L2 | **CFO (핵심 게이트키퍼)** | TCO·BEP 추적, 예산 집행 | **공동 스폰서십 레터 필요** |
| L3 | CIO + 사업부장 4인 | Phase별 실행 승인 | Phase 0 워킹그룹 구성 중 |

> **CFO 공동 스폰서십이 전체 프로그램의 최대 성공 변수** — 2022년 디지털혁신 프로젝트 좌초 원인 1위가 "재무 본부 미참여".

**지금 시작해야 하는 이유 — DORA 핵심 메시지**

> **"상위 40%(Cluster 6·7)는 속도와 안정성 모두 우수함."**  
> — DORA 2025 Cluster 분포 (§01)

> **"Harmonious high-achiever (Cluster 7) — 20%의 조직이 이미 도달한 '안정적이고 빠르며 의미 있는' 일상."**  
> — DORA 2025 (§06)

Phase 4 목표 = Cluster 6/7 50% 진입 — **비현실적 목표가 아니라 글로벌 20%가 달성한 현실**.

### 17장. 최종 의사결정 요청 — 5개 항목

| # | 의사결정 항목 | 기한 | 담당 |
|---|------------|------|------|
| 1 | **Phase 0 착수 승인** (35~60억, 2026.05.01~2026.10.31) | 2026.05.01 | CEO·CFO·CIO |
| 2 | **Phase 0 게이트 통과 시 Phase 1 자동 승인 조건 합의** | 2026.05.15 | CEO·CFO |
| 3 | **CFO 공동 스폰서십 확정** (TCO·BEP 추적 주관) | 2026.04.30 | CEO → CFO |
| 4 | **리스크·거버넌스 위원회 발족** | 2026.05.15 | CIO |
| 5 | **변화관리 예산 별도 계정 신설** (전체의 8~12%, 32~100억) | 2026.05.01 | CFO |

---

## 18~20장. DORA 핵심 인용 5장 + 참고문헌

### 18~19장. 경영진 반복 인용용 DORA 카드 5장

**카드 1 — 속도와 안정성은 트레이드오프가 아님**

> **"상위 40%(Cluster 6·Harmonious high-achiever 7)는 속도와 안정성 모두 우수함."**  
> — DORA 2025 Cluster 분포 (§01)

HBT 적용: "안정성을 위해 속도를 포기할 수밖에 없다"는 기존 IT 본부 방어 논리 데이터로 반박 가능.

**카드 2 — 20%가 이미 도달한 현실**

> **"Harmonious high-achiever (Cluster 7) — 20%의 조직이 이미 도달한  
> '안정적이고 빠르며 의미 있는' 일상."**  
> — DORA 2025 (§06)

HBT 적용: 비현실적 목표가 아니라 **글로벌 20%가 달성한 현실**. Phase 4 목표 = Cluster 6/7 50%.

**카드 3 — AI는 증폭기임**

> **"In 2025, the central question for technology leaders is no longer if they should adopt AI,  
> but how to realize its value. AI's primary role in software development is that of an amplifier.  
> It magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones."**  
> — DORA 2025 Executive Summary (§06)

HBT 적용: AI는 중립 도구가 아님. **HBT의 현재 기술부채를 증폭**하기 전에 AM 전환 필수.

**카드 4 — AM 없는 AI 투자 = ROI 0 (가장 중요)**

> **"An investment in AI without a corresponding investment in high-quality platforms  
> is unlikely to yield significant returns at the organizational level."**  
> — DORA 2025 Platform Engineering Chapter (Figure 49)

HBT 적용: HBT 2025 AI Copilot 파일럿 결과 "ROI 측정 불가"는 **예측된 결과**. AM = AI ROI의 전제조건.

**카드 5 — AI Mirror**

> **"AI shines a light on what's working, accelerating what's already in motion,  
> but it also surfaces what needs to change. For organizations ready to look,  
> the reflection AI offers becomes a roadmap."**  
> — DORA 2025 The AI Mirror Chapter (§06)

HBT 적용: Phase 1 킥오프 슬라이드 1페이지 채택 — **"HBT는 볼 준비가 된 조직"** 선언.

### 20장. 참고문헌 및 내부 근거 자료

**외부 참고문헌**

| # | 출처 | 주요 인용 수치 |
|---|------|------------|
| 1 | **DORA 2025 State of DevOps Report** (Google, 응답자 4,997명, 90% AI 사용) | Lead Time 분포, Figure 49, Cluster 7개 |
| 2 | **DORA AI Capabilities Model Guide** (2025.12, 97페이지) | AI 7역량, 12 플랫폼 특성 |
| 3 | **행정안전부 2026.03.11** (제5회 과학기술관계장관회의) | TCO 18.4% 절감, 장애 81% 감소, 배포 114% 향상 |
| 4 | **근로복지공단 사례** (행안부 2025.12.23 성과보고회) | Lead Time 23배 단축 |
| 5 | Gartner TIME Matrix / Martin Fowler Strangler Fig / AWS·Azure 6R Framework | 방법론 근거 |

**내부 근거 산출물**

| 구분 | 파일 경로 |
|-----|---------|
| Step 1 통합 (WHY) | `output/hbt/step1/why-statement.md` |
| Step 2 현황 분석 7건 | `output/hbt/step2/1-inventory.md` ~ `7-change-kickoff.md` |
| Step 3 전략 6건 | `output/hbt/step3/1-6r-detail.md` ~ `6-change-mgmt.md` |
| Step 3 통합 보고서 | `output/hbt/step3/strategy-report.md` |
| 검토 보고서 | `output/hbt/final/review-report.md` (APPROVED WITH CONDITIONS) |

---

**문서 끝**  
_"AM 없는 AI ROI는 0. HBT는 지금 시작함."_  
— 서윤 (AM 전략 리드), 지민·도현·민호·재원·하늘·연우 공동 · 2026-04-18
