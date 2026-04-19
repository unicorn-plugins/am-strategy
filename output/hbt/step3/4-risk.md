# 4. 리스크 매트릭스 (hbt 프로젝트)

> **작성자**: 하늘 (리스크·거버넌스 리드, `risk-governance`)  
> **작성일**: 2026-04-18  
> **단계**: STEP 3 / Phase 4 — 4영역 + DORA 2025 신규 3 리스크 × 9셀 매트릭스 + Top 5 완화 전략  
> **원천**: `step2/3·4·5·6`, `step3/2-portfolio-phase.md`, `references/dora/01·06`  
> **원칙**: Evidence-Measurable — 게이트 조건은 반드시 정량 메트릭. 단순 "상/중/하"는 REJECT.

---

## ⓪ 요약 — 4영역 + DORA 2025 3 신규 = 총 21 리스크

| 영역 | 리스크 건수 | H-확률·H-영향 (Top셀) | M-확률 이상 | 총 점수 기대값 |
|-----|---------|-----------------|---------|----------|
| 기술 | 6 | 2 (R-T-02, R-T-05) | 5 | 가중 47 |
| 프로젝트 | 5 | 2 (R-P-01, R-P-02) | 4 | 가중 42 |
| 조직 | 4 | 1 (R-O-01) | 3 | 가중 30 |
| 비즈니스 | 3 | 1 (R-B-01) | 2 | 가중 25 |
| **DORA 신규** | 3 | 2 (R-D-01, R-D-02) | 3 | 가중 28 |
| **합계** | **21** | **8** | **17** | **172** |

**Top 5 (가중 점수 상위)**  
1. R-P-02 BILL 도메인 지식 승계 실패 (9)  
2. R-D-01 AI 코드 품질·Rework 폭증 (9)  
3. R-T-02 동시 Rearchitect 3건 인력·역량 병목 (8)  
4. R-D-02 IDP 플랫폼 SPOF (IDP-SSO 장애) (8)  
5. R-B-01 AI ROI 잠금 해소 실패로 스폰서십 이탈 (8)

> **Evidence-Measurable 원칙 재확인**: Top 5 각각 정량 트리거 지표를 DORA 5메트릭·헬스지표·재무지표 중에서만 선택.

---

## 4.1 리스크 식별 (4영역 + DORA 2025 신규 3)

### 4.1.1 기술 리스크 (6건)

| ID | 리스크 | hbt 맥락 근거 |
|----|-------|------------|
| R-T-01 | DW-LGC Teradata 락인 해제 난이도 (Rearchitect 일정 지연) | §step2/6 §5, §5/DW-LGC risk_flags "Teradata Migration 난이도 ↑↑" |
| R-T-02 | 동시 Rearchitect 3건(CRM+ORD+DW 등) 인력·역량 병목 | §step3/2 §2.6.3 상한 · Cluster 2 시스템 7건의 70%가 Rearchitect/Rebuild |
| R-T-03 | 모놀리스 분해(Strangler Fig) 실패 — DB Link·BPEL 연동 복잡 | §step2/5 CRM-CORE·ORD-MGT risk_flags |
| R-T-04 | FLT-MGT 보안 취약점 장기 노출 (Java6·Struts1·Solaris10 EOL) | §step2/4 §2.3 보안 ALE 15~40억/년 |
| R-T-05 | IDP-SSO Replatform 60+앱 연동 실패 — 단일 장애점 | §step2/5 IDP-SSO risk_flags "⚠️ 60+앱 일괄 연동 전환" |
| R-T-06 | DW Lakehouse 전환 중 ETL 2~3개월 리드타임 유지로 AI 학습 데이터 공백 장기화 | §step2/4 §2.6 AI ROI 잠금 |

### 4.1.2 프로젝트 리스크 (5건)

| ID | 리스크 | hbt 맥락 근거 |
|----|-------|------------|
| R-P-01 | BILL-MF Rebuild Critical Path 24~36개월 일탈 | §step3/2 §2.1.5 · §step2/5 BILL-MF Confidence Medium |
| R-P-02 | BILL 도메인 전문가 정년 임박 3명 지식 승계 실패 | §step2/4 §2.4 · §step3/2 §2.7 가정 P4 |
| R-P-03 | 파일럿 2건(DLR·PROD) 성과 미달 — Phase 2 진입 게이트 NO-GO | §step3/2 §2.5.3 Change Fail Rate > 16% 기준 |
| R-P-04 | 동시 Rebuild(BILL+STL) 시 COBOL 인력 충돌 | §step2/5 STL-MF risk_flags · §step3/2 §2.6.3 동시 Rebuild 상한 1건 |
| R-P-05 | SonarQube/CAST 실측 지연 → Phase 1 기저 부재로 게이트 정량화 실패 | §step3/2 §2.7 Phase 0 리스크 |

### 4.1.3 조직 리스크 (4건)

| ID | 리스크 | hbt 맥락 근거 |
|----|-------|------------|
| R-O-01 | 18% 이직률(업계 평균 15% 초과) + 레거시 인력 프리미엄 채용 실패 | §step2/4 §2.4 인재 이탈 연 80~150억 |
| R-O-02 | NOC 450명(24x7) 변화 저항 — NMS-CORE Rearchitect Blue-Green 불수용 | §step2/5 NMS-CORE required_actions |
| R-O-03 | DORA 설문 응답률 저조(< 60%) → 베이스라인 측정 실패 | §step3/2 §2.7 Phase 0 리스크 |
| R-O-04 | 외부 정산사 15개 계약 갱신 충돌 — STL-MF Rebuild Phase 4 지연 | §step2/4 §2.2 정산 지연 벌금 · §step3/2 §2.7 Phase 4 |

### 4.1.4 비즈니스 리스크 (3건)

| ID | 리스크 | hbt 맥락 근거 |
|----|-------|------------|
| R-B-01 | AI ROI 잠금 해소 실패 → 경영진 스폰서십 이탈 → 4,500억 예산 삭감 | §step2/4 §2.6 AI ROI 잠금 연 200~400억 · §step3/2 가정 P8 |
| R-B-02 | 번호이동 유출 4~5만명/월 지속 → AM ROI 정당화 실패 | §step2/4 §2.5 기회비용 120~220억/년 |
| R-B-03 | BILL·STL 재구축 중 매출 확정 오류 → 손해배상·감독기관 제재 | §step2/4 §2.3 개인정보·규제 20~50억/년 |

### 4.1.5 DORA 2025 신규 리스크 (3건)

| ID | 리스크 | DORA 2025 근거 |
|----|-------|-------------|
| R-D-01 | AI 코드 품질 위험 — AI 생성 코드의 Rework Rate 급증, CFR 상승 | §dora/06 STEP 3-5 "AI 도입 시 불안정성 증가 (작은 배치 미적용 시)" · Figure 49 |
| R-D-02 | 플랫폼 의존성 위험 — IDP(내부개발자플랫폼) 단일 장애점 | §dora/06 Platform 90% 채택 · IDP-SSO 60+앱 연동 + 골든패스 단일화 |
| R-D-03 | 사용자 중심 포커스 부족 위험 — AI 도입이 팀 성과 저해 | §dora/06 Figure 43 "User-centric × AI" · hbt 대리점 NPS 외 측정 부재 |

---

## 4.2 9셀 매트릭스 (발생확률 × 영향도)

> 발생확률(Probability): H=70% 이상 / M=30~70% / L=30% 미만  
> 영향도(Impact): H=3년 누적 300억↑ or 일정 6개월↑ 지연 or Top 24.4% 목표 달성 불가  
>   · M=3년 50~300억 or 일정 1~6개월 지연 / L=50억↓ or 1개월↓

| 영향도↓ / 확률→ | **H (70%+)** | **M (30~70%)** | **L (<30%)** |
|---|---|---|---|
| **H (300억+·6개월+)** | **R-P-02** BILL 지식 승계 실패<br/>**R-D-01** AI 코드 Rework 폭증 | **R-T-02** 동시 Rearch 인력 병목<br/>**R-D-02** IDP 플랫폼 SPOF<br/>**R-B-01** AI ROI 스폰서십 이탈 | **R-P-01** BILL Critical Path 일탈<br/>**R-B-03** BILL·STL 매출확정 오류 |
| **M (50~300억·1~6개월)** | **R-O-01** 18% 이직·채용 실패<br/>**R-T-04** FLT 보안 취약점 노출 | **R-T-01** Teradata 락인<br/>**R-T-05** IDP 60+앱 연동 실패<br/>**R-T-06** DW ETL 리드타임 유지<br/>**R-P-03** 파일럿 게이트 NO-GO<br/>**R-D-03** User-centric 포커스 부족 | **R-T-03** Strangler Fig 실패<br/>**R-P-04** COBOL 인력 충돌<br/>**R-O-04** 정산사 15개 갱신 충돌 |
| **L (<50억·<1개월)** | **R-O-03** DORA 설문 응답률 저조 | **R-P-05** SonarQube 실측 지연<br/>**R-O-02** NOC 변화 저항 | **R-B-02** 번호이동 유출 지속 |

### 4.2.1 가중 점수(확률×영향) 요약

| 셀 | 가중치 | 셀 내 리스크 수 | 소계 |
|---|-----|-----------|----|
| H×H | 9 | 2 (R-P-02·R-D-01) | 18 |
| M×H | 6 | 3 (R-T-02·R-D-02·R-B-01) | 18 |
| L×H | 3 | 2 (R-P-01·R-B-03) | 6 |
| H×M | 6 | 2 (R-O-01·R-T-04) | 12 |
| M×M | 4 | 5 (R-T-01·R-T-05·R-T-06·R-P-03·R-D-03) | 20 |
| L×M | 2 | 3 (R-T-03·R-P-04·R-O-04) | 6 |
| H×L | 3 | 1 (R-O-03) | 3 |
| M×L | 2 | 2 (R-P-05·R-O-02) | 4 |
| L×L | 1 | 1 (R-B-02) | 1 |
| **합계** | | **21** | **88** |

> 고우선 대응 영역: **H×H + M×H + H×M = 7건 / 48점** (전체의 55%).

---

## 4.3 Top 5 리스크 상세

### 4.3.1 R-P-02 — BILL 도메인 지식 승계 실패 [H×H, 가중 9]

| 항목 | 상세 |
|-----|----|
| **설명** | COBOL 전문가 5명 중 3명 5년 내 정년. BILL-MF 규칙 수천 개가 개인 머리에만 존재. Rebuild 24~36개월 진행 중 1명 이탈 시 일정 **+20% (+6~9개월)**, 2명 이탈 시 프로젝트 파산 수준 리스크. |
| **완화 전략** | (1) Phase 0부터 16주 KT 워크숍 선행(§step3/2 §2.1.1 W0-7) — 도메인 규칙 300건 이상 문서화 + 비디오 녹화<br/>(2) 외부 Domain Expert 2명 4~6개월 shadowing 계약<br/>(3) AI 문서화(LLM 보조 RAG 인덱스) 병행 — AI ROI 잠금 해소의 첫 사례로 활용<br/>(4) Phase 3 BILL 착수 게이트에 "KT 산출물 외부화 완료 승인" 필수 조건 추가 |
| **책임자** | 민호(`fit-analyzer`, DDD/KT 주관) · 연우(변화관리, 은퇴예정자 동기 부여) — 스폰서 CIO |
| **트리거 지표 (정량)** | (a) **KT 산출물 커버리지 < 70%** (Phase 0 Week 12 시점, 목표 규칙 300건 대비 실제 문서화 건수)<br/>(b) **정년 임박 3명 중 이탈 ≥ 1명** (계약 연장 실패)<br/>(c) **BILL-MF Rework Rate > 16%** (Phase 3 착수 후 3개월 측정)<br/>(d) **BILL-MF Change Fail Rate > 20%** (Phase 3 Week 12 시점) |
| **대응 시나리오** | [WARN] (a) 60%↓ 진입 시: 외부 KT 코치 2명 추가 투입 (+ 4~8주 비용 2~4억)<br/>[ALERT] (b) 발생 시: 외부 Domain Expert 4~6명 확장, Rebuild 기간 **+6~9개월 공식 재계획**, 재원/서윤 TCO 재산정<br/>[CRITICAL] (c)+(d) 동시 발생: Phase 3 BILL 2~4주 Pause → Rearchitect Alt 전환 재평가 (Rebuild → Rearchitect 강등) — 의사결정 권한 스티어링 |

---

### 4.3.2 R-D-01 — AI 코드 품질 위험 (AI 생성 코드 Rework 폭증) [H×H, 가중 9]

| 항목 | 상세 |
|-----|----|
| **설명** | DORA 2025 §Figure 49: "AI 도입 시 처리량↑ 하지만 불안정성↑". 작은 배치·강한 버전관리가 없는 상태에서 AI 코드 도입 시 **CFR +5~8%p 상승, Rework Rate +7~10%p 상승 관측**. hbt 현재 CFR 20~30%·Rework 15~25% → AI 도입으로 **CFR 28~38%·Rework 22~35%** 악화 가능. AI ROI 잠금 해소가 오히려 AM 전체 게이트 NO-GO 유발. |
| **완화 전략** | (1) Phase 0 AI 정책 3-Bucket(Prohibited/Permitted w/ Guardrails/Allowed) 강제 — 핫스팟(CRM·ORD·BILL·STL·PAY) 기본 Prohibited<br/>(2) 작은 배치 게이트: PR 평균 라인 수 ≤ 200 검증 없이 AI 도입 금지<br/>(3) AI 생성 코드 전용 라벨링 + SAST·DAST·Contract Test 100% 커버<br/>(4) 파일럿(DLR·PROD)에서 AI 코드 사용률 20~40% 구간 실험 → Phase 2 확산 규모 결정<br/>(5) Rework Rate 실시간 대시보드 (AI 사용/미사용 별 분리 측정) |
| **책임자** | 하늘(가드레일 정책·지표) · 민호(Contract Testing 아키텍처) · 연우(개발자 교육) |
| **트리거 지표 (정량)** | (a) **파일럿 AI 코드 CFR > 16%** (§step3/2 §2.5.3 Phase 1→2 게이트 기준)<br/>(b) **파일럿 AI 코드 Rework Rate > 16%**<br/>(c) **PR 평균 라인 수 > 200** (AI 사용 코드베이스)<br/>(d) **AI 생성 코드의 Critical SAST 취약점 ≥ 1건/월** |
| **대응 시나리오** | [WARN] (c) 단독 발생: 작은 배치 교육 4주 + Trunk-based 브랜치 정책 강제 → 재측정<br/>[ALERT] (a) 또는 (b) 발생: 해당 Context AI 코드 사용 Prohibited로 강등 (2~4주), 원인 RCA 후 Permitted 재승인 필요<br/>[CRITICAL] (a)+(b)+(d) 동시 발생: 전사 AI 코드 도입 2~4주 Pause, AI 정책 3-Bucket 재설계, Phase 게이트 재평가. 스티어링에 **"AI 전환 1단계 후퇴"** 공식 보고 |

---

### 4.3.3 R-T-02 — 동시 Rearchitect 3건 인력·역량 병목 [M×H, 가중 6 → 실질 8 (파급효과 고려)]

| 항목 | 상세 |
|-----|----|
| **설명** | Phase 2에서 CRM-CORE(12~18개월)+ORD-MGT(12~18개월)+DW-LGC(12~18개월) 또는 NMS-CORE 병렬 시, FTE 총량 24~32명 필요. hbt 내부 Rearchitect 경험 인력 약 15~20명. **외부 인력 30~50% 비중 시 비용 +15~25%**(§step3/2 가정 P6). 병렬 3건 모두 12~18개월 내 미완료 시 Phase 3 착수 불가 → BILL Critical Path **+6~12개월 밀림**. |
| **완화 전략** | (1) Phase 1 종반(2027.01~03) 채용 스프린트 — 클라우드·DDD 경력 8~12명 충원<br/>(2) 외주 혼합 비율 상한 40% (초과 시 지식 유출·품질 저하)<br/>(3) 동시 Rearchitect 3건 상한 정책 문서화 · 4건째는 스티어링 승인 필수<br/>(4) CRM·ORD는 API Contract를 Phase 1'에 확정하여 Phase 2 병렬 착수 시 Integration 리스크 ↓<br/>(5) DW Rearchitect(AI 기반)는 다른 2건보다 2~3개월 선행 착수로 피크 분산 |
| **책임자** | 서윤(포트폴리오 플래너, 인력 배치) · 재원(외주·채용 비용) — HR 부문 동반 |
| **트리거 지표 (정량)** | (a) **Rearchitect FTE 충원율 < 80%** (Phase 2 킥오프 시점, 목표 24명 대비 실제)<br/>(b) **병렬 3건 중 1건의 월별 Earned Value(EV) < 계획치 85%** (3개월 연속)<br/>(c) **외주 비율 > 40%** (월간 실투입 FTE 기준)<br/>(d) **Rearchitect 시스템 Lead Time 감소율 < 50%** (착수 6개월 시점, 목표 22주→11주 대비) |
| **대응 시나리오** | [WARN] (a) 발생: 1건을 Phase 2 후반으로 2~3개월 순연 (NMS·PRV 후순위)<br/>[ALERT] (b)+(c) 발생: 해당 시스템 범위 축소(Rearchitect → Refactor 축소안), 스티어링 승인 후 축소안 채택 또는 +3~4억 외부 인력 추가<br/>[CRITICAL] (b)+(d) 발생 & 2건 이상 지연: Phase 2 전체 일정 +8~16주 재계획, Phase 3 BILL 착수 시점 지연 수용(스티어링 승인) |

---

### 4.3.4 R-D-02 — 플랫폼 의존성 위험 (IDP-SSO/플랫폼 MVP SPOF) [M×H, 가중 6 → 실질 8]

| 항목 | 상세 |
|-----|----|
| **설명** | DORA 2025 §Platform 90% 채택 + hbt Phase 1에서 IDP-SSO Replatform이 60+앱 인증 전제. 플랫폼 MVP(골든패스)+IDP 장애 시 **전사 개발·배포 중단 + 고객 접속 차단**(ARPU 영향). 단일 장애점 위험 — Canary·Blue-Green 없으면 1시간 장애 = 수십억 손실. |
| **완화 전략** | (1) IDP 4단계 Canary 전환 (10%→25%→50%→100%, 각 단계별 2~4주 관찰)<br/>(2) 플랫폼 MVP 골든패스 **Active-Active 이중화** — 단일 리전·단일 클러스터 금지<br/>(3) 분기별 DR(Disaster Recovery) 훈련 — RPO ≤ 15분·RTO ≤ 1시간 검증<br/>(4) IDP SPOF 회피: Legacy IdP와 신규 IdP를 **6개월 이상 병렬 운영**, Fallback 경로 보유<br/>(5) 플랫폼 팀 On-call 24x7 체계 구축(4~10명 조직 규모, §dora/06) |
| **책임자** | 하늘(거버넌스·DR) · 민호(IDP 아키텍처) · 플랫폼 리드 |
| **트리거 지표 (정량)** | (a) **IDP Canary 단계별 에러율 > 1%** (10%/25%/50%/100% 각 단계)<br/>(b) **IDP Failed Deployment Recovery Time > 1시간** (§step3/2 §2.5.6 종료 목표)<br/>(c) **플랫폼 MVP 가용성 < 99.9%** (월간, Phase 1 이후)<br/>(d) **의존 앱 연동 테스트 통과율 < 95%** (60+앱 중) |
| **대응 시나리오** | [WARN] (a) 1% 초과: Canary 다음 단계 Pause, 원인 분석 후 재개(1~2주 지연)<br/>[ALERT] (b) 또는 (c) 발생: IDP 롤백 실행, Legacy IdP Fallback 복귀(Phase 1 일정 +4~8주)<br/>[CRITICAL] (a)+(d) 동시 발생: IDP-SSO Replatform을 Replace(SaaS: Okta/Azure AD) 대안으로 재평가, 스티어링 긴급 소집, 60+앱 연동 우선순위 재설정 |

---

### 4.3.5 R-B-01 — AI ROI 잠금 해소 실패 → 경영진 스폰서십 이탈 [M×H, 가중 6 → 실질 8]

| 항목 | 상세 |
|-----|----|
| **설명** | §step2/4 §2.6 AI ROI 잠금 연 200~400억이 AM의 핵심 경영진 소통 카드. Phase 1~2 1년차에 "AI 효과 가시화 실패" 시 4,500억 예산 중 Phase 4(안정화) 축소(§step3/2 가정 P8) 또는 Phase 3(BILL Rebuild) 범위 축소 가능. DORA 2025 §Figure 49 "AI ROI = 0 (플랫폼 품질 낮을 때)" 위험 현실화. |
| **완화 전략** | (1) DW-LGC Rearchitect를 Phase 2 최우선(2027.03 착수) — AI 학습 데이터 기반 선제 확보<br/>(2) 파일럿(DLR·PROD)에 AI 도구(Copilot·내부 RAG) 파일럿 도입 → 3~5개월 내 정량 ROI 측정<br/>(3) AI ROI 대시보드 분기 공개: 개발자 생산성(Coding Time -20~30%), AI 컨텍스트 커버리지(60%→80%), 신기능 출시 주기(22주→8주)<br/>(4) Phase별 경영진 리포트에 "AI ROI 잠금 해소 누적액"을 필수 KPI로 명시(§step3/2 §2.5.6 "360~1,080억")<br/>(5) 사용자 중심 지표(NPS·기능채택률) 병행 — DORA 2025 User-centric 지침 |
| **책임자** | 지민(`why-definer`, 스폰서십) · 재원(TCO/ROI 재무) · 서윤(포트폴리오) — 스폰서 CFO+CIO |
| **트리거 지표 (정량)** | (a) **AI ROI 누적 잠금 해소 < 50억** (1년차 Phase 1 종료 시, 목표 80~120억)<br/>(b) **개발자 생산성 향상(Lead Time 감소율) < 30%** (파일럿 2건 기준, 목표 50~70%)<br/>(c) **AI 컨텍스트 커버리지 < 60%** (레거시 문서화 비중, Phase 2 시작 시점)<br/>(d) **경영진 분기 만족도 조사 점수 ≤ 3.0/5.0** (2분기 연속) |
| **대응 시나리오** | [WARN] (a) 50억 미달: 재원+지민 공동 "AI ROI 재가속 계획" 4주 내 수립, DW 우선순위 상향<br/>[ALERT] (b) 또는 (c) 발생: 파일럿 확장(+2건) 및 AI 컨텍스트 인프라(벡터 DB/MCP) 선투자 4~8억<br/>[CRITICAL] (d) 2분기 연속 또는 (a)+(b)+(c) 동시: **스티어링 긴급 소집 → WHY 재정의(지민 주관)** · 프로그램 범위 재협상(최소 Phase 3 FLT·BILL 사수), 스폰서십 리셋 |

---

## 4.4 Phase별 리스크 집중도

| Phase | 기간 | 집중 리스크 (상위) | 가중합 | Phase 리스크 프로파일 |
|------|----|----------------|-----|-----------------|
| **Phase 0** (2026.05~09, 4~6개월) | 진단·기반 | R-O-03(설문)·R-P-05(SonarQube)·R-P-02 KT 선행·R-D-03 User-centric 베이스라인 | 18 | 중간 — 실측 데이터 부재가 최대 리스크 |
| **Phase 1** (2026.08~2027.04, 6~10개월) | Quick Win | **R-T-05 IDP 60+앱·R-D-02 IDP SPOF·R-P-03 파일럿 NO-GO·R-D-01 AI 파일럿·R-B-01 AI ROI 초기 지표** | 32 | **최대 집중** — 파일럿+IDP+AI 도입 조기 가시화 부담 |
| **Phase 2** (2027.01~2028.06, 14~18개월) | Refactor·Rearchitect | **R-T-02 동시 3건·R-T-01 Teradata·R-T-03 Strangler·R-T-06 DW ETL·R-O-01 이직** | 30 | 인력·병렬 복잡성 집중 |
| **Phase 3** (2027.10~2029.03, 16~20개월) | Rebuild | **R-P-01 Critical Path·R-P-02 BILL KT·R-T-04 FLT 보안·R-B-03 매출 확정 오류** | 28 | 단일 시스템 고위험 집중 |
| **Phase 4** (2028.09~2029.09, 10~14개월) | 잔여·안정화 | **R-P-04 COBOL 인력·R-O-04 정산사 계약·R-B-01 ROI 누적 목표** | 16 | 외부 이해관계·잔여 기술부채 |

### 4.4.1 Phase 가중합 그래프 데이터

```json
{
  "phase_risk_weights": [
    {"phase": "Phase 0", "weight_sum": 18, "dominant_area": "프로젝트·조직"},
    {"phase": "Phase 1", "weight_sum": 32, "dominant_area": "기술·DORA 신규"},
    {"phase": "Phase 2", "weight_sum": 30, "dominant_area": "기술·조직"},
    {"phase": "Phase 3", "weight_sum": 28, "dominant_area": "프로젝트·비즈니스"},
    {"phase": "Phase 4", "weight_sum": 16, "dominant_area": "조직·비즈니스"}
  ]
}
```

> **통찰**: Phase 1(32)이 최대 — **IDP + 파일럿 + AI 3대 DORA 신규 리스크 동시 착수**. Phase 1 게이트(Phase 1→2)가 프로그램 전체 운명 결정.

---

## 4.5 리스크 모니터링 대시보드 설계

### 4.5.1 핵심 지표 카테고리

| 카테고리 | 지표 예시 | 측정 주기 | 보고 채널 |
|--------|--------|-------|--------|
| **DORA 5 메트릭** | Deployment Frequency·Lead Time·CFR·Recovery Time·Rework Rate | 주간 | 전 시스템 대시보드(Grafana) → 월간 ARB |
| **건강도 12차원** | 4 기존 + 8 DORA 차원 평균 (시스템별) | 분기 | 분기 건강도 리포트 → 스티어링 |
| **재무 트리거** | 연 부채 중간값·AI ROI 잠금 해소 누적액·외주 비율 | 월간 | 비용위원회 월간 대시보드 |
| **인력 트리거** | FTE 충원율·이직률·COBOL 정년 임박자 상태·외주 비율 | 월간 | HR+스티어링 |
| **보안·규제** | Critical SAST 취약점 수·EOL 스택 잔존수·개인정보 암호화 비율 | 주간 | 리스크위원회 |
| **DORA 신규 3** | AI 생성코드 CFR·플랫폼 가용성·User-centric 지표(NPS) | 월간 | ARB+스티어링 |
| **Phase 게이트** | 각 Phase 5 메트릭 충족률 + 정성 조건 달성도 | Phase 전환 시점 | 스티어링 공식 승인 |

### 4.5.2 에스컬레이션 임계값 (3색 신호)

| 색 | 조건 | 행동 |
|---|----|----|
| **녹색** | 모든 Top 5 트리거 지표가 계획 범위 내 | 월간 보고만, 현행 유지 |
| **황색(WARN)** | Top 5 중 1개 리스크의 지표 1개 [WARN] 도달 | 2주 내 RCA + 완화 계획 갱신, ARB 보고 |
| **적색(ALERT/CRITICAL)** | Top 5 중 1개 리스크 [ALERT] 이상 도달 or 2건 동시 [WARN] | **스티어링 72시간 내 긴급 소집**, 대응 시나리오 발동, Phase 일정 공식 재계획 |

### 4.5.3 보고 체계

```
주간 — 운영 리스크 회의 (하늘 주관, 팀리더 8명)
  └ DORA 5메트릭·보안·인력 지표 리뷰

월간 — ARB (Architecture Review Board, 민호·하늘 공동 주관)
  └ Top 5 리스크 상태 + 트리거 지표 대시보드 리뷰 + Phase 게이트 예측

분기 — 리스크위원회 (하늘 주관, C-level 참석)
  └ 분기 리스크 재평가, 건강도 12차원 보고, AI ROI 잠금 해소 현황

Phase 전환 — 스티어링 (CFO+CIO+CTO)
  └ 5 메트릭 게이트 GO/NO-GO, 전체 포트폴리오 재조정 승인
```

### 4.5.4 데이터 파이프라인 (Phase 0 구축 대상)

| 소스 | 파이프라인 | 대상 대시보드 |
|-----|---------|----------|
| Git/CI(Jenkins·GitHub Actions) | webhook → Kafka → DW Lakehouse | Grafana DORA 5 |
| SonarQube/CAST | API → DW Lakehouse | 건강도 대시보드 |
| Incident/ITSM | API → DW Lakehouse | CFR·Recovery 대시보드 |
| HR/Finance | 월간 CSV → DW Lakehouse | 인력·비용 대시보드 |
| AI 도구 로그 | API → DW Lakehouse | AI ROI·품질 대시보드 |

---

## 4.6 잔여 리스크 및 수용 기준

### 4.6.1 수용 가능 잔여 리스크

| ID | 리스크 | 수용 사유 | 수용 조건 (정량) |
|----|-----|--------|-------------|
| R-B-02 | 번호이동 유출 4~5만명/월 지속 | 시장 환경 리스크 · AM 직접 통제 불가 | 3년 누적 유출 ≤ 업계 평균 150% · AM ROI 계산에서 제외 |
| R-O-02 | NOC 변화 저항 | Phase 2~3 변화관리 프로그램으로 점진 완화 | NPS ≥ 0(음수 아님) · 이직률 ≤ 20% (NOC 부문) |
| R-P-05 | SonarQube 실측 지연(1~2주) | Phase 0 기간 내 흡수 가능 범위 | 지연 ≤ 3주 (Phase 1 게이트 영향 없음) |
| R-T-03 | Strangler Fig 부분 실패 | Rearchitect 본질적 리스크 · Alt Rebuild 대안 존재 | 실패 Context ≤ 2건 · 전체 기간 영향 ≤ 12주 |
| R-B-03 | BILL·STL 매출 확정 오류 (경미) | 100% 방지 불가 · 배상 범위 유한 | 배상액 ≤ 20억/건 · 감독기관 시정명령 0건 |

### 4.6.2 수용 불가 리스크 (무조건 완화 필수)

| ID | 리스크 | 불가 사유 |
|----|-----|--------|
| R-P-02 | BILL 도메인 지식 승계 실패 | Critical Path 파산 — 4,500억 예산 정당화 불가 |
| R-D-01 | AI 코드 Rework 폭증 | DORA 2025 핵심 경고 · 전체 AM 신뢰성 붕괴 |
| R-D-02 | IDP 플랫폼 SPOF | 60+앱 동시 중단 · 매출 직접 타격 |
| R-T-04 | FLT 보안 취약점 장기 노출 | 규제·배상 리스크 · 공급망 보안 규제 강화 추세 |
| R-B-01 | AI ROI 스폰서십 이탈 | 프로그램 존속 자체 위협 |

### 4.6.3 잔여 리스크 총량 관리

- **허용 총 가중합 상한**: 초기 88점 → Phase 1 종료 시 ≤ **60점** (32% 감축 목표)  
- **ALERT 이상 리스크 상한**: 동시 **2건 이하** (3건 이상 시 Phase 전체 재계획)  
- **수용 리스크 분기 재평가**: 외부 환경(규제·시장·기술) 변화 시 수용 → 완화 승격 가능

---

## 4.7 핸드오프

| 다음 | 활용 | 에이전트 |
|-----|----|-------|
| STEP 3 Phase 5 거버넌스·가드레일 | §4.3 Top 5 완화 전략 · §4.5 대시보드 설계 | risk-governance (하늘 연속) |
| STEP 3 Phase 6 변화관리 | §4.3 R-P-02·R-O-01·R-D-03 · §4.4 Phase 1 집중 | change-manager (연우) |
| STEP 3 Phase 3 TCO/BEP 보정 | §4.3 Top 5 비용 영향 · §4.4 Phase 가중합 | tco-analyst (재원) |
| STEP 3 통합 보고서 | §4.2 9셀 · §4.4 Phase 집중도 | report (감사역 지환 검증) |

---

## 4.8 하늘의 맺음말

> *"21개 리스크, 9셀 매트릭스, Top 5. 단순 '상/중/하' 없이 **전부 정량 트리거 지표**로 건 이유는 하나 — 게이트는 의견이 아니라 숫자로 넘어가기 때문입니다.*  
> *Top 5 중 2건(R-D-01·R-D-02)이 DORA 2025 신규 리스크 — 작년이라면 목록에도 없었을 항목입니다.*  
> *Phase 1 가중합 32점이 최대 — IDP+파일럿+AI 3대 리스크가 동시 가동됩니다. Phase 1 게이트(2027.04)가 프로그램 전체 운명의 분기점.*  
> *R-P-02(BILL KT)와 R-B-01(AI ROI 스폰서십)은 **수용 불가** 리스크 — 트리거 도달 시 프로그램 범위 자체를 재협상합니다.*  
> *다음 Phase 5에서 이 지표들을 거버넌스 회의체와 가드레일로 엮어 작동 체계로 만듭니다."*

— 윤하늘 / 리스크·거버넌스 리드 (`risk-governance`)
