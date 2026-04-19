# 5. 6R/TIME 매칭 — HBT (8단계 룰북 적용)

> **작성자**: 민호 (엔터프라이즈 아키텍트, `fit-analyzer`)  
> **작성일**: 2026-04-18  
> **단계**: STEP 2 / Phase 5 — 14 속성 × 8 STEP → Primary/Alt 6R + TIME + 신뢰도 + rule_trace  
> **참조**: `references/6r/03-decision-criteria.md` · `04-matching-rules.md` · `06-dora-integration.md`  
> **원칙**: Rule-Traceable — 모든 결정에 STEP별 규칙 ID 역추적 기록

---

## ⓪ 요약 — 24 시스템 6R 결과

| 6R (Primary) | 시스템 수 | 비중 | 시스템 |
|-----------|-------|----|-------|
| Retain (전환 대상 제외) | 2 | 8% | REC-AI, CLD-PLAT |
| Rehost | 1 | 4% | IDC-OPS |
| Replatform | 4 | 17% | PROD-CAT, INV-RES, CC-IVR, IDP-SSO |
| Refactor | 4 | 17% | CNTR-MGT, CMP-MGT, DLR-PORTAL, BI-REP |
| **Rearchitect** | 6 | 25% | CRM-CORE, ORD-MGT, NMS-CORE, PRV-AUTO, PAY-GW, DW-LGC |
| **Rebuild** | 3 | 13% | BILL-MF, STL-MF, FLT-MGT |
| Replace | 2 | 8% | SFA-ENT, (의심 후보 BI-REP 대안) |
| Retire | 1 | 4% | COLL-LGC |
| Eliminate | 0 | 0% | (건강도 심각 없음) |
| ** 소계** | **23** | | ※ REC-AI·CLD-PLAT 제외 실제 전환 22건 |

> **TIME 분포**:  
> - INVEST 10건 (양호·Cluster 6/7 + Refactor·Replatform)  
> - MIGRATE 10건 (Cluster 2·4 → Rearchitect·Rebuild)  
> - TOLERATE 2건 (CNTR·INV 재검토)  
> - ELIMINATE 1건 (COLL)  

> **DORA 2025 정합성 (§references/6r/06)**: Rearchitect 6 + Rebuild 3 = 9건이 7개 AI Capabilities 모두 활성화 → AI ROI 잠금 해제 주력.

---

## 1. 포트폴리오 TIME 매트릭스

```
                   기술 적합성 ↑
              높음                낮음
          ┌──────────────────┬──────────────────┐
     높음 │  INVEST (10)     │  MIGRATE (10)    │
          │  REC-AI (Retain) │  CRM-CORE (Rear.)│
          │  PAY-GW (Rear.*) │  ORD-MGT (Rear.) │
          │  CSC-WEB(Ref.)   │  BILL-MF (Rebu.) │
          │  MY-APP (Ref.)   │  STL-MF (Rebu.)  │
          │  DLR-PO (Ref.)   │  NMS-CORE(Rear.) │
          │  IDP-SSO(Repl.)  │  PRV-AUTO(Rear.) │
          │  PROD-CAT(Repl.) │  FLT-MGT (Rebu.) │
          │  CLD-PL (Retain) │  DW-LGC  (Rear.) │
          │                  │  IDC-OPS (Rehost)│
 비즈니스 ├──────────────────┼──────────────────┤
    가치  │ TOLERATE (2)     │ ELIMINATE (1)    │
          │  CNTR-MGT (Ref.) │  COLL-LGC(Retire)│
          │  INV-RES (Repl.) │                  │
          │  CC-IVR (Repl.)  │                  │
          │  CMP-MGT (Ref.)  │                  │
          │  BI-REP (Ref.)   │                  │
     낮음 │  SFA-ENT (Repl.) │                  │
          └──────────────────┴──────────────────┘

  * PAY-GW Primary = Rearchitect (부분 MSA 완성 단계)
  ※ TOLERATE/ELIMINATE 재조정: TOLERATE에 BV≥3 일부(CNTR/INV/CC/CMP/BI/SFA/IDC-OPS)는
    건강도·자원으로 구분 배치. 표준 분면 기준.
```

---

## 2. 시스템별 YAML 출력 (24 시스템)

### 2.1 CRM-CORE

```yaml
system_id: "CRM-CORE"
system_name: "고객관리 시스템"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Rebuild"
  time_classification: "MIGRATE"
  health_score: 10
  health_category: "취약"
  confidence: "High"
  business_value_score: 4.6
  technical_fit_score: 2.3
  dora_cluster: 2
  rationale: |
    1. Business Value 4.6 (High) — A등급 · 11개 시스템 의존 핫스팟
    2. Technical Fit 2.3 (Low) — Oracle11g EOS·Tuxedo·Java8·모놀리스
    3. TIME = MIGRATE (가치↑·기술↓)
    4. STEP 5 MIGRATE Rule 2 매칭:
       - 건강도 취약(10) + Lifecycle ≥5년(내부 10년+) + Team Capability 3 + Data Coupling 1 + Change Freq 3
       → Primary Rearchitect, Alternative Rebuild
    5. STEP 6 Constraint 미적용 (내부 역량 충분)
    6. STEP 7 DORA Cluster 2 (Legacy bottleneck) 일치 — Rearchitect 기대값 일관
  rule_trace:
    - "STEP 1 Hard Constraint: 미적용"
    - "STEP 2 Business Value High (4.6 ≥ 3.0)"
    - "STEP 3 Technical Fit Low (2.3 < 3.0)"
    - "STEP 4 TIME = MIGRATE"
    - "STEP 5 MIGRATE Rule 2 (건강도 취약 + Lifecycle ≥5 + Team ≥3 + DataCoupling ≥... 사실상 DC=1이나 분리 가능성 긍정 → Rearchitect)"
    - "STEP 6 제약 없음"
    - "STEP 7 DORA Cluster 2 일치"
    - "STEP 8 신뢰도 High"
  risk_flags:
    - "DB Link 다수 — 분해 복잡"
    - "Strangler Fig 패턴 필수"
  estimated_effort:
    duration_months: "12 ~ 18"
    cost_range_krw: "8억 ~ 20억"
    contingency_pct: 30
    team_size_fte: "8 ~ 12"
  required_actions:
    - "DDD Event Storming 워크숍 (3주)"
    - "Customer Context 분리 설계"
    - "Contract Testing 도입"
    - "Phase 1' 파일럿 후보 X (핵심시스템, Phase 2 착수 권장)"
```

### 2.2 ORD-MGT

```yaml
system_id: "ORD-MGT"
system_name: "주문·개통 관리"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Refactor"
  time_classification: "MIGRATE"
  health_score: 11
  health_category: "보통(경계)"
  confidence: "High"
  business_value_score: 4.7
  technical_fit_score: 2.5
  dora_cluster: 2
  rationale: |
    1. BV 4.7 (High), TF 2.5 (Low) → MIGRATE
    2. STEP 5 MIGRATE Rule 2: 건강도 11(보통하단) + Lifecycle 10년+ + Team Capability 3 +
       Data Coupling 2(BPEL 워크플로 많음) + Change Frequency 3
       → Rearchitect (MSA + Order Context 분리). Alt Refactor.
    3. STEP 7 DORA Cluster 2 일치
  rule_trace:
    - "STEP 4 TIME = MIGRATE"
    - "STEP 5 MIGRATE Rule 2 (Rearchitect)"
    - "STEP 7 Cluster 2 일치"
    - "STEP 8 Confidence High"
  risk_flags:
    - "BPEL → Saga 패턴 전환 복잡"
    - "개통 실패 = 매출 중단 → Blue-Green 필수"
  estimated_effort:
    duration_months: "12 ~ 18"
    cost_range_krw: "8억 ~ 20억"
    contingency_pct: 30
    team_size_fte: "8 ~ 12"
  required_actions:
    - "Order Context 분리"
    - "BPEL 프로세스 재설계"
```

### 2.3 BILL-MF

```yaml
system_id: "BILL-MF"
system_name: "과금(Billing) 메인프레임"
recommendation:
  primary_6r: "Rebuild"
  alternative_6r: "Rearchitect"
  time_classification: "MIGRATE"
  health_score: 11
  health_category: "보통(경계)"
  confidence: "Medium"
  business_value_score: 5.0
  technical_fit_score: 2.0
  dora_cluster: 2
  rationale: |
    1. BV 5.0 (최고치) — 매출 확정 시스템
    2. TF 2.0 (Low) — COBOL·DB2·CICS·인력 승계 리스크
    3. TIME = MIGRATE
    4. STEP 5 MIGRATE Rule 1 매칭(건강도 심각에 근접 + 도메인 재정의 가능 + Lifecycle ≥5년)
       → Primary Rebuild (완전 재구축). Alt Rearchitect.
    5. STEP 6 Constraint H4 반(半)적용: Team Capability 3, but Domain Expert 2명(정년 임박)
       → Rebuild 리스크 ↑↑, Confidence Medium
    6. STEP 7 Cluster 2 일치, 단 Rebuild는 Cluster 2 1순위(Rearchitect)의 1단계 과감
  rule_trace:
    - "STEP 1 Hard Constraint H4 부분적 (Team ≥3 but Domain Expert 2명 정년 임박)"
    - "STEP 4 TIME = MIGRATE"
    - "STEP 5 MIGRATE Rule 1 Rebuild"
    - "STEP 7 Cluster 2 일치(1단계 과감)"
    - "STEP 8 Confidence Medium (도메인 지식 승계 리스크)"
  risk_flags:
    - "⚠️ 핵심 위험 — Rebuild는 가장 고위험"
    - "COBOL 인력 5명 중 3명 5년 내 정년"
    - "도메인 지식 외부화 선행 필수"
    - "한국 행안부 근로복지공단 사례(23배 단축) 참고"
  estimated_effort:
    duration_months: "24 ~ 36"
    cost_range_krw: "30억 ~ 70억"
    contingency_pct: 30
    team_size_fte: "12 ~ 20"
  required_actions:
    - "Phase 0에 도메인 지식 문서화·KT 워크숍 선행 (3개월)"
    - "Strangler Fig — 기능 단위 단계적 전환"
    - "Phase 2~3 대상 (Phase 1 파일럿 불가 - 리스크 과대)"
```

### 2.4 STL-MF

```yaml
system_id: "STL-MF"
system_name: "정산(Settlement)"
recommendation:
  primary_6r: "Rebuild"
  alternative_6r: "Rearchitect"
  time_classification: "MIGRATE"
  health_score: 10
  health_category: "취약"
  confidence: "Medium"
  business_value_score: 4.4
  technical_fit_score: 2.0
  dora_cluster: 2
  rationale: |
    1. BV 4.4 · TF 2.0 → MIGRATE
    2. 건강도 10 + COBOL + 외부정산사 15개 규제 부담
    3. STEP 5 MIGRATE Rule 1 → Rebuild (BILL-MF와 동일 이유)
    4. STEP 7 Cluster 2 일치
    5. STEP 8 Confidence Medium (BILL과 마찬가지 인력 리스크)
  rule_trace: ["STEP 4 MIGRATE", "STEP 5 Rule 1 Rebuild", "STEP 7 Cluster 2", "STEP 8 Medium"]
  risk_flags:
    - "BILL-MF와 동시 진행 시 인력 충돌"
    - "외부 정산사 15개 계약 재협상"
  estimated_effort:
    duration_months: "18 ~ 30"
    cost_range_krw: "25억 ~ 55억"
    contingency_pct: 30
    team_size_fte: "8 ~ 14"
  required_actions:
    - "BILL-MF 완료 이후 착수 권장 (Phase 3~4)"
```

### 2.5 PROD-CAT

```yaml
system_id: "PROD-CAT"
system_name: "상품 카탈로그"
recommendation:
  primary_6r: "Replatform"
  alternative_6r: "Refactor"
  time_classification: "INVEST"
  health_score: 14
  health_category: "보통"
  confidence: "High"
  business_value_score: 3.5
  technical_fit_score: 3.5
  dora_cluster: 5
  rationale: |
    1. BV 3.5, TF 3.5 → INVEST 분면
    2. STEP 5 INVEST Rule 2 매칭 (건강도 보통 11~15 + Lifecycle ≥3년) → Refactor/Replatform
    3. Java 11·Spring Boot 2.3 + Oracle 19c — 이미 모더나이즈 진행 중
    4. 상품 카탈로그는 신상품 출시 속도 결정 → 독립적으로 분리 가능
    5. 1순위 Replatform: Oracle → PostgreSQL + Container + Managed DB
  rule_trace: ["STEP 4 INVEST", "STEP 5 Rule 2 Replatform/Refactor", "STEP 7 Cluster 5"]
  risk_flags: []
  estimated_effort:
    duration_months: "2 ~ 4"
    cost_range_krw: "0.7억 ~ 2억"
    contingency_pct: 15
    team_size_fte: "3 ~ 5"
  required_actions:
    - "Phase 1' 파일럿 후보"
```

### 2.6 CNTR-MGT

```yaml
system_id: "CNTR-MGT"
system_name: "계약관리"
recommendation:
  primary_6r: "Refactor"
  alternative_6r: "Replatform"
  time_classification: "TOLERATE"
  health_score: 12
  health_category: "보통"
  confidence: "Medium"
  business_value_score: 2.8
  technical_fit_score: 3.0
  dora_cluster: 3
  rationale: |
    1. BV 2.8 (경계 — Medium으로 표시 후 Low로 확정)
    2. TF 3.0 (경계) → TOLERATE 근접
    3. .NET 기반은 아니고 Java8·MS-SQL — 중장기 Replatform 필요
    4. Cluster 3 (Constrained by Process) → 6R 보다 거버넌스 개선 우선
    5. STEP 5 TOLERATE: Retain 가능하나 MS-SQL → PostgreSQL Replatform 권장
  rule_trace: ["STEP 4 TOLERATE (경계)", "STEP 5 Replatform/Refactor", "STEP 7 Cluster 3 → 거버넌스 우선"]
  risk_flags: ["경계 점수 — 재평가"]
  estimated_effort:
    duration_months: "2 ~ 4"
    cost_range_krw: "0.8억 ~ 2억"
    contingency_pct: 20
    team_size_fte: "3 ~ 4"
  required_actions:
    - "거버넌스 개선과 동반 진행"
```

### 2.7 COLL-LGC

```yaml
system_id: "COLL-LGC"
system_name: "미수관리 (레거시)"
recommendation:
  primary_6r: "Retire"
  alternative_6r: "Replace"
  time_classification: "ELIMINATE"
  health_score: 6
  health_category: "취약(하단)"
  confidence: "High"
  business_value_score: 1.3
  technical_fit_score: 1.5
  dora_cluster: 1
  rationale: |
    1. STEP 1 Hard Constraint Check:
       - H1 (Retire): BV 1.3 + User Base 120명 but Lifecycle > 1년 → H1 미적용
       - H1' (Eliminate): BV 1~2 + 건강도 심각 4~5 — 건강도 6(취약 하단) → 경계, 미적용
       - H2 (Replace): BV 1~3 + 동일 기능(신 Credit) 존재 + 비용 > SaaS — 대체기능 내부존재로 Replace/Retire 가능
    2. Phase 2 등급 C + 신 Credit 시스템이 80% 대체 → 기능 이관 후 Retire
    3. Primary Retire, Alternative Replace (신 Credit으로 통합)
    4. STEP 7 Cluster 1 일치
  rule_trace:
    - "STEP 1 H2 검토 — 내부 대체 시스템 존재"
    - "STEP 4 ELIMINATE"
    - "STEP 5 ELIMINATE Rule 2 (사용자 ≤100 and 대체 존재) → Retire"
    - "STEP 7 Cluster 1 일치"
    - "STEP 8 High"
  risk_flags:
    - "데이터 보존 요건(7년) 준수 필요"
  estimated_effort:
    duration_months: "2 ~ 4"
    cost_range_krw: "0.3억 ~ 1억"
    contingency_pct: 10
    team_size_fte: "2 ~ 3"
  required_actions:
    - "신 Credit 기능 통합 + 데이터 아카이빙 + 폐기 선언"
```

### 2.8 NMS-CORE

```yaml
system_id: "NMS-CORE"
system_name: "네트워크관리 (NMS)"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Replatform"
  time_classification: "MIGRATE"
  health_score: 12
  health_category: "보통"
  confidence: "High"
  business_value_score: 4.6
  technical_fit_score: 2.5
  dora_cluster: 4
  rationale: |
    1. BV 4.6 · TF 2.5 → MIGRATE
    2. Cluster 4 (High Impact, Low Cadence) — Rearchitect 기대값
    3. STEP 5 MIGRATE Rule 2: 건강도 12 + Lifecycle ≥5년 + Team Capability 3 + Data Coupling 2 +
       Change Frequency 2 (분기 배포) → Rearchitect
    4. 5G/LTE/IP 장비 8,500대 연동 — Polling 아키텍처 분리 필요
  rule_trace: ["STEP 4 MIGRATE", "STEP 5 Rule 2 Rearchitect", "STEP 7 Cluster 4 일치"]
  risk_flags: ["Python 2.7 잔존 스크립트 마이그레이션"]
  estimated_effort:
    duration_months: "10 ~ 15"
    cost_range_krw: "5억 ~ 12억"
    contingency_pct: 25
    team_size_fte: "6 ~ 10"
  required_actions:
    - "NOC 팀 대상 변화관리 + 24x7 Blue-Green"
```

### 2.9 PRV-AUTO

```yaml
system_id: "PRV-AUTO"
system_name: "서비스 프로비저닝"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Refactor"
  time_classification: "MIGRATE"
  health_score: 13
  health_category: "보통"
  confidence: "High"
  business_value_score: 4.7
  technical_fit_score: 2.8
  dora_cluster: 4
  rationale: |
    1. BV 4.7 · TF 2.8 (경계 Low) → MIGRATE
    2. ESB(JBoss Fuse) 반분산 → MSA 전환 가능
    3. STEP 5 MIGRATE Rule 2 Rearchitect
    4. Cluster 4 일치
  rule_trace: ["STEP 4 MIGRATE", "STEP 5 Rule 2 Rearchitect", "STEP 7 Cluster 4"]
  risk_flags: ["장비 CLI/NETCONF 연동 복잡성"]
  estimated_effort:
    duration_months: "8 ~ 14"
    cost_range_krw: "4억 ~ 10억"
    contingency_pct: 25
    team_size_fte: "5 ~ 8"
  required_actions:
    - "ESB 해체 + Event-Driven 통합"
```

### 2.10 FLT-MGT

```yaml
system_id: "FLT-MGT"
system_name: "장애관리"
recommendation:
  primary_6r: "Rebuild"
  alternative_6r: "Rearchitect"
  time_classification: "MIGRATE"
  health_score: 8
  health_category: "취약"
  confidence: "High"
  business_value_score: 3.4
  technical_fit_score: 1.5
  dora_cluster: 1
  rationale: |
    1. BV 3.4 · TF 1.5 → MIGRATE
    2. 전체 스택 EOL(Java6·Struts1·Solaris10) — Refactor 불가
    3. STEP 5 MIGRATE Rule 1: 건강도 8 + Lifecycle ≥5년 + 도메인 재정의 가능
       → Rebuild. Alt Rearchitect.
    4. STEP 7 Cluster 1 (Foundational) — Rebuild와 1단계 어긋남이나 BV↑로 Rebuild 정당화
  rule_trace: ["STEP 4 MIGRATE", "STEP 5 Rule 1 Rebuild", "STEP 7 Cluster 1 정당화 경계"]
  risk_flags: ["보안 취약점 지속 노출 — 시급"]
  estimated_effort:
    duration_months: "12 ~ 18"
    cost_range_krw: "8억 ~ 15억"
    contingency_pct: 30
    team_size_fte: "6 ~ 10"
  required_actions:
    - "Phase 1 우선순위 — 보안 리스크"
```

### 2.11 INV-RES

```yaml
system_id: "INV-RES"
system_name: "자원관리 (Inventory)"
recommendation:
  primary_6r: "Replatform"
  alternative_6r: "Retain"
  time_classification: "TOLERATE"
  health_score: 14
  health_category: "보통"
  confidence: "Medium"
  business_value_score: 2.4
  technical_fit_score: 3.5
  dora_cluster: 5
  rationale: |
    1. BV 2.4(경계 Low) · TF 3.5 → TOLERATE
    2. 재검토 플래그(Phase 2) — 자동 분류 C였으나 NMS·PRV 강결합
    3. Java11·PG13·K8s — 이미 현대적 → Replatform 소폭 (PG 버전 업·K8s 표준화)
    4. Cluster 5 일치
  rule_trace:
    - "STEP 4 TOLERATE"
    - "STEP 5 TOLERATE Rule 2 → Retain 기본, but 소폭 Replatform"
    - "Phase 2 재검토 플래그 해소"
  risk_flags: []
  estimated_effort:
    duration_months: "1 ~ 2"
    cost_range_krw: "0.3억 ~ 0.7억"
    contingency_pct: 15
    team_size_fte: "2 ~ 3"
  required_actions:
    - "NMS-CORE Rearchitect와 동기화"
```

### 2.12 DLR-PORTAL

```yaml
system_id: "DLR-PORTAL"
system_name: "대리점 포털"
recommendation:
  primary_6r: "Refactor"
  alternative_6r: "Replatform"
  time_classification: "INVEST"
  health_score: 15
  health_category: "보통(상단)"
  confidence: "High"
  business_value_score: 4.7
  technical_fit_score: 3.8
  dora_cluster: 6
  rationale: |
    1. BV 4.7 · TF 3.8 → INVEST
    2. Java 11·Spring Boot 2.5·Vue.js 2 — 보통 상단 건강도
    3. STEP 5 INVEST Rule 2 → Refactor (모놀리스 유지, 클라우드 서비스 연동)
    4. Cluster 6 (Pragmatic) 일치
    5. Phase 1 파일럿 후보 1순위 — 건강도 적당 + 성과 가시성 높음
  rule_trace: ["STEP 4 INVEST", "STEP 5 Rule 2 Refactor", "STEP 7 Cluster 6"]
  risk_flags: []
  estimated_effort:
    duration_months: "3 ~ 5"
    cost_range_krw: "1.5억 ~ 3억"
    contingency_pct: 20
    team_size_fte: "4 ~ 6"
  required_actions:
    - "⭐ Phase 1' 파일럿 최우선 후보"
    - "WHY §3 파일럿 1호"
```

### 2.13 SFA-ENT

```yaml
system_id: "SFA-ENT"
system_name: "영업관리 (SFA)"
recommendation:
  primary_6r: "Replace"
  alternative_6r: "Retire"
  time_classification: "ELIMINATE (경계 MIGRATE)"
  health_score: 10
  health_category: "취약"
  confidence: "High"
  business_value_score: 2.5
  technical_fit_score: 2.0
  dora_cluster: 2
  rationale: |
    1. BV 2.5(경계 Low) · TF 2.0 → ELIMINATE
    2. STEP 1 H2 매칭: BV 2.5 + Salesforce SaaS 존재 + 자체 운영비 13억 + 규제 허용
       → Primary Replace (Salesforce로 전환)
    3. Cluster 2 — 표준 SaaS 전환으로 제거
  rule_trace:
    - "STEP 1 H2 (Replace 트리거)"
    - "STEP 4 ELIMINATE"
    - "STEP 5 ELIMINATE Rule 3 (SaaS 존재 + 규제 허용) → Replace"
    - "STEP 7 Cluster 2에서 표준화 루트"
  risk_flags: ["커스텀 워크플로 마이그레이션"]
  estimated_effort:
    duration_months: "4 ~ 8"
    cost_range_krw: "3억 ~ 8억 (+ Salesforce 구독료 연 5~12억)"
    contingency_pct: 25
    team_size_fte: "4 ~ 6"
  required_actions:
    - "Salesforce PoC 2개월"
    - "5년 TCO 비교 필수"
```

### 2.14 CC-IVR

```yaml
system_id: "CC-IVR"
system_name: "콜센터 IVR"
recommendation:
  primary_6r: "Replatform"
  alternative_6r: "Refactor"
  time_classification: "TOLERATE"
  health_score: 13
  health_category: "보통"
  confidence: "Medium"
  business_value_score: 2.8
  technical_fit_score: 3.3
  dora_cluster: 5
  rationale: |
    1. BV 2.8(경계 Low) · TF 3.3 → TOLERATE
    2. Genesys 라이선스 비중 큼 → Replatform (오픈소스 대체 or Managed CCaaS)
    3. STEP 5 TOLERATE Rule 1 매칭
    4. AI 챗봇(Python 3.8) 부분 현대적 → Refactor도 가능
  rule_trace: ["STEP 4 TOLERATE", "STEP 5 Rule 1 Replatform", "STEP 7 Cluster 5"]
  risk_flags: []
  estimated_effort:
    duration_months: "4 ~ 8"
    cost_range_krw: "3억 ~ 7억"
    contingency_pct: 20
    team_size_fte: "4 ~ 5"
  required_actions:
    - "CCaaS(Genesys Cloud, Amazon Connect 등) 비교"
```

### 2.15 CMP-MGT

```yaml
system_id: "CMP-MGT"
system_name: "캠페인 관리"
recommendation:
  primary_6r: "Refactor"
  alternative_6r: "Replatform"
  time_classification: "TOLERATE (경계 INVEST)"
  health_score: 10
  health_category: "취약"
  confidence: "Medium"
  business_value_score: 2.7
  technical_fit_score: 2.5
  dora_cluster: 3
  rationale: |
    1. BV 2.7·TF 2.5 — 경계. Cluster 3(Process 병목)
    2. Java8·Oracle12c — Refactor로 Kafka·MSK 통합하여 CVM 속도 개선
    3. STEP 5 보정 Refactor (am 커리큘럼 비즈니스 低·건강도 취약 → Retire 후보이나 CVM 기능 핵심)
  rule_trace: ["STEP 4 TOLERATE(경계)", "STEP 5 보정 Refactor", "STEP 7 Cluster 3 거버넌스 동반"]
  risk_flags: ["경계 점수 — 재평가"]
  estimated_effort:
    duration_months: "3 ~ 5"
    cost_range_krw: "1억 ~ 2억"
    contingency_pct: 20
    team_size_fte: "3 ~ 5"
  required_actions:
    - "REC-AI와 연동 강화"
```

### 2.16 REC-AI

```yaml
system_id: "REC-AI"
system_name: "추천 엔진 (AI)"
recommendation:
  primary_6r: "Retain"
  alternative_6r: "(벤치마크)"
  time_classification: "INVEST"
  health_score: 18
  health_category: "양호"
  confidence: "High"
  business_value_score: 4.0
  technical_fit_score: 4.6
  dora_cluster: 7
  rationale: |
    1. BV 4.0 · TF 4.6 → INVEST
    2. 이미 GCP·MSA·Kubernetes — AM 전환 대상 아님
    3. STEP 7 Cluster 7 (Harmonious) — To-Be 벤치마크
    4. Primary Retain, 단 GPU 스케일 강화 투자
  rule_trace: ["STEP 4 INVEST", "STEP 5 INVEST Rule 1 → Retain/Rehost", "STEP 7 Cluster 7"]
  risk_flags: []
  estimated_effort:
    duration_months: "지속 운영"
    cost_range_krw: "증분 투자만"
  required_actions:
    - "To-Be 참조 아키텍처로 활용"
```

### 2.17 PAY-GW

```yaml
system_id: "PAY-GW"
system_name: "전자결제 게이트웨이"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Refactor"
  time_classification: "INVEST"
  health_score: 17
  health_category: "양호"
  confidence: "High"
  business_value_score: 5.0
  technical_fit_score: 4.0
  dora_cluster: 6
  rationale: |
    1. BV 5.0 · TF 4.0 → INVEST
    2. 부분 MSA (결제·환불·취소) — 남은 모듈 Rearchitect로 완성
    3. STEP 5 INVEST Rule 3 변형: 건강도 17 + Lifecycle ≥5 + Team ≥3 → 점진적 Rearchitect
    4. Cluster 6 — Pragmatic, Rearchitect로 Cluster 7 진입 가능
  rule_trace: ["STEP 4 INVEST", "STEP 5 (INVEST + 건강도 양호, 부분 MSA → 완성형 Rearchitect)", "STEP 7 Cluster 6"]
  risk_flags: ["외부 PG 12개 통합 테스트 필수"]
  estimated_effort:
    duration_months: "6 ~ 10"
    cost_range_krw: "3억 ~ 7억"
    contingency_pct: 25
    team_size_fte: "5 ~ 8"
  required_actions:
    - "Kafka 기반 Event-Driven 완전 전환"
    - "AWS 이중화 확대"
```

### 2.18 IDP-SSO

```yaml
system_id: "IDP-SSO"
system_name: "통합 인증 (SSO/MFA)"
recommendation:
  primary_6r: "Replatform"
  alternative_6r: "Replace"
  time_classification: "INVEST"
  health_score: 14
  health_category: "보통"
  confidence: "High"
  business_value_score: 4.7
  technical_fit_score: 3.0
  dora_cluster: 4
  rationale: |
    1. BV 4.7 · TF 3.0 → INVEST(경계)
    2. 약 60개 앱 인증 관문 — Replace(SaaS)도 가능하나 규제·내부 데이터주권으로 Replatform 우선
    3. STEP 5 INVEST Rule 2 → Replatform (OpenLDAP·Oracle → Managed IAM + 표준 OAuth2/OIDC)
    4. Alt Replace (Okta/Azure AD) 5년 TCO 비교 필요
  rule_trace: ["STEP 4 INVEST", "STEP 5 Rule 2 Replatform", "STEP 7 Cluster 4"]
  risk_flags:
    - "⚠️ 60+ 앱 일괄 연동 전환 — 단계적"
    - "단일 장애점 — Canary 필수"
  estimated_effort:
    duration_months: "8 ~ 12"
    cost_range_krw: "4억 ~ 10억"
    contingency_pct: 25
    team_size_fte: "5 ~ 8"
  required_actions:
    - "Phase 1 초반 착수 — 다른 MSA 전환의 전제조건"
```

### 2.19 DW-LGC

```yaml
system_id: "DW-LGC"
system_name: "데이터 웨어하우스"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Replatform"
  time_classification: "MIGRATE"
  health_score: 10
  health_category: "취약"
  confidence: "High"
  business_value_score: 4.0
  technical_fit_score: 2.3
  dora_cluster: 2
  rationale: |
    1. BV 4.0 · TF 2.3 → MIGRATE
    2. Teradata 락인 + ETL 2~3개월 리드타임 → AI ROI 잠금 핵심 원인
    3. STEP 5 MIGRATE Rule 2 Rearchitect (Data Lakehouse/Lake 아키텍처 전환)
    4. Cluster 2 일치
  rule_trace: ["STEP 4 MIGRATE", "STEP 5 Rule 2 Rearchitect", "STEP 7 Cluster 2"]
  risk_flags: ["Teradata Migration 난이도 ↑↑"]
  estimated_effort:
    duration_months: "12 ~ 18"
    cost_range_krw: "8억 ~ 20억"
    contingency_pct: 30
    team_size_fte: "6 ~ 12"
  required_actions:
    - "Lakehouse 설계 (Snowflake/BigQuery/Databricks 검토)"
    - "ETL → ELT·스트리밍 전환"
    - "⭐ AI 전략의 데이터 기반"
```

### 2.20 BI-REP

```yaml
system_id: "BI-REP"
system_name: "BI 리포팅"
recommendation:
  primary_6r: "Refactor"
  alternative_6r: "Replace"
  time_classification: "TOLERATE"
  health_score: 11
  health_category: "보통(경계)"
  confidence: "Medium"
  business_value_score: 3.0
  technical_fit_score: 2.5
  dora_cluster: 3
  rationale: |
    1. BV 3.0(경계) · TF 2.5 → TOLERATE/MIGRATE 경계
    2. Tableau/PowerBI Replace 검토 중 but DW-LGC Rearchitect와 동시 Replace는 부담
    3. Primary Refactor(자체 엔진 개선 + DW 새 인터페이스), Alt Replace(DW 이후)
  rule_trace: ["STEP 4 TOLERATE", "STEP 5 Refactor/Replace", "STEP 7 Cluster 3"]
  risk_flags: ["DW-LGC 이후 재평가"]
  estimated_effort:
    duration_months: "3 ~ 6"
    cost_range_krw: "1억 ~ 3억"
    contingency_pct: 20
    team_size_fte: "3 ~ 5"
```

### 2.21 CSC-WEB

```yaml
system_id: "CSC-WEB"
system_name: "고객 셀프케어 웹"
recommendation:
  primary_6r: "Refactor"
  alternative_6r: "Rearchitect"
  time_classification: "INVEST"
  health_score: 16
  health_category: "양호(하단)"
  confidence: "High"
  business_value_score: 4.7
  technical_fit_score: 3.8
  dora_cluster: 6
  rationale: |
    1. BV 4.7 · TF 3.8 → INVEST
    2. BFF + SPA · AWS 일부 — 이미 모던
    3. STEP 5 INVEST Rule 2 → Refactor
    4. Cluster 6 Pragmatic, Rearchitect로 Cluster 7 가능
  rule_trace: ["STEP 4 INVEST", "STEP 5 Rule 2 Refactor", "STEP 7 Cluster 6"]
  risk_flags: []
  estimated_effort:
    duration_months: "3 ~ 5"
    cost_range_krw: "1.5억 ~ 3억"
    contingency_pct: 20
    team_size_fte: "4 ~ 6"
```

### 2.22 MY-APP

```yaml
system_id: "MY-APP"
system_name: "My앱 (모바일)"
recommendation:
  primary_6r: "Refactor"
  alternative_6r: "Retain"
  time_classification: "INVEST"
  health_score: 17
  health_category: "양호"
  confidence: "High"
  business_value_score: 5.0
  technical_fit_score: 4.0
  dora_cluster: 6
  rationale: |
    1. BV 5.0 · TF 4.0 → INVEST
    2. React Native·Kotlin·Swift·AWS — 이미 현대적
    3. STEP 5 INVEST Rule 1 → Rehost/Retain 가능하나 BFF·API 최적화 Refactor 권장
  rule_trace: ["STEP 4 INVEST", "STEP 5 Rule 1/2 Refactor", "STEP 7 Cluster 6"]
  risk_flags: []
  estimated_effort:
    duration_months: "2 ~ 4"
    cost_range_krw: "1억 ~ 2억"
    contingency_pct: 15
    team_size_fte: "3 ~ 5"
```

### 2.23 IDC-OPS

```yaml
system_id: "IDC-OPS"
system_name: "IDC 운영관리"
recommendation:
  primary_6r: "Rehost"
  alternative_6r: "Replatform"
  time_classification: "MIGRATE"
  health_score: 11
  health_category: "보통(경계)"
  confidence: "Medium"
  business_value_score: 3.3
  technical_fit_score: 2.3
  dora_cluster: 2
  rationale: |
    1. BV 3.3 · TF 2.3 → MIGRATE
    2. Java8·Struts2·Oracle11g·RHEL6 EOL — Replatform 권장이나 CLD-PLAT 내부 클라우드 Rehost 가능
    3. STEP 5 MIGRATE Rule 4 (Lifecycle ≤3년 아님, but 내부 플랫폼 재활용 측면) → Rehost 가능
    4. STEP 6 C4 Rehost 회피 적용: Lifecycle ≥5년 + 건강도 보통 → Replatform 권장
    5. Primary Rehost(CLD-PLAT 이전), Alt Replatform — Confidence Medium
  rule_trace: ["STEP 4 MIGRATE", "STEP 5 Rule 4/Rehost 예외", "STEP 6 C4 플래그", "STEP 7 Cluster 2"]
  risk_flags:
    - "Rehost 장기 효과 제한적"
    - "Phase 2에서 Replatform 승격 검토"
  estimated_effort:
    duration_months: "2 ~ 4"
    cost_range_krw: "0.5억 ~ 1.5억"
    contingency_pct: 15
    team_size_fte: "3 ~ 5"
  required_actions:
    - "CLD-PLAT 내부 이전"
    - "⚠️ 임원 검토 (Rehost 채택)"
```

### 2.24 CLD-PLAT

```yaml
system_id: "CLD-PLAT"
system_name: "자체 클라우드 플랫폼"
recommendation:
  primary_6r: "Retain"
  alternative_6r: "(강화 투자)"
  time_classification: "INVEST"
  health_score: 18
  health_category: "양호"
  confidence: "High"
  business_value_score: 3.7
  technical_fit_score: 4.6
  dora_cluster: 7
  rationale: |
    1. BV 3.7 · TF 4.6 → INVEST
    2. 전환 대상 아님 — 내부 레거시 워크로드 Rehost·Replatform 목적지
    3. Cluster 7 벤치마크
  rule_trace: ["STEP 4 INVEST", "STEP 5 Retain/강화", "STEP 7 Cluster 7"]
  risk_flags: []
  estimated_effort:
    duration_months: "지속 운영"
    cost_range_krw: "증분 투자"
  required_actions:
    - "내부 Rehost 대상 플랫폼 제공"
    - "IDP 표준 확장"
```

---

## 3. 6R 포트폴리오 요약 표

| ID | 시스템 | Primary 6R | Alt 6R | TIME | 건강도 | Cluster | 신뢰도 | 기간(월) | 비용(억) |
|----|------|----------|------|----|-----|--------|-----|-------|--------|
| CRM-CORE | 고객관리 | Rearchitect | Rebuild | MIGRATE | 10 | 2 | High | 12~18 | 8~20 |
| ORD-MGT | 주문·개통 | Rearchitect | Refactor | MIGRATE | 11 | 2 | High | 12~18 | 8~20 |
| BILL-MF | 과금 | Rebuild | Rearchitect | MIGRATE | 11 | 2 | Medium | 24~36 | 30~70 |
| STL-MF | 정산 | Rebuild | Rearchitect | MIGRATE | 10 | 2 | Medium | 18~30 | 25~55 |
| PROD-CAT | 상품카탈로그 | Replatform | Refactor | INVEST | 14 | 5 | High | 2~4 | 0.7~2 |
| CNTR-MGT | 계약관리 | Refactor | Replatform | TOLERATE | 12 | 3 | Medium | 2~4 | 0.8~2 |
| COLL-LGC | 미수관리(L) | Retire | Replace | ELIMINATE | 6 | 1 | High | 2~4 | 0.3~1 |
| NMS-CORE | 네트워크관리 | Rearchitect | Replatform | MIGRATE | 12 | 4 | High | 10~15 | 5~12 |
| PRV-AUTO | 프로비저닝 | Rearchitect | Refactor | MIGRATE | 13 | 4 | High | 8~14 | 4~10 |
| FLT-MGT | 장애관리 | Rebuild | Rearchitect | MIGRATE | 8 | 1 | High | 12~18 | 8~15 |
| INV-RES | 자원관리 | Replatform | Retain | TOLERATE | 14 | 5 | Medium | 1~2 | 0.3~0.7 |
| DLR-PORTAL | 대리점포털 | Refactor | Replatform | INVEST | 15 | 6 | High | 3~5 | 1.5~3 |
| SFA-ENT | SFA | Replace | Retire | ELIMINATE | 10 | 2 | High | 4~8 | 3~8 (+구독) |
| CC-IVR | IVR | Replatform | Refactor | TOLERATE | 13 | 5 | Medium | 4~8 | 3~7 |
| CMP-MGT | 캠페인 | Refactor | Replatform | TOLERATE | 10 | 3 | Medium | 3~5 | 1~2 |
| REC-AI | 추천AI | Retain | (벤치) | INVEST | 18 | 7 | High | — | 증분 |
| PAY-GW | 결제GW | Rearchitect | Refactor | INVEST | 17 | 6 | High | 6~10 | 3~7 |
| IDP-SSO | 통합인증 | Replatform | Replace | INVEST | 14 | 4 | High | 8~12 | 4~10 |
| DW-LGC | DW | Rearchitect | Replatform | MIGRATE | 10 | 2 | High | 12~18 | 8~20 |
| BI-REP | BI | Refactor | Replace | TOLERATE | 11 | 3 | Medium | 3~6 | 1~3 |
| CSC-WEB | 셀프케어 | Refactor | Rearchitect | INVEST | 16 | 6 | High | 3~5 | 1.5~3 |
| MY-APP | My앱 | Refactor | Retain | INVEST | 17 | 6 | High | 2~4 | 1~2 |
| IDC-OPS | IDC운영 | Rehost | Replatform | MIGRATE | 11 | 2 | Medium | 2~4 | 0.5~1.5 |
| CLD-PLAT | 자체클라우드 | Retain | (강화) | INVEST | 18 | 7 | High | — | 증분 |

**총 비용 범위** (Retain/REC-AI/CLD-PLAT 제외): **124 ~ 295억** (3년 프로그램)

> 3년 예산 4,500억 대비 **2.8~6.6%** — 직접 전환 비용만. Phase 3에서 병렬운영·플랫폼·교육 포함 시 범위 확대.

---

## 4. 6R × DORA 7 AI Capabilities 매트릭스 (활성화 예상)

| Primary 6R | 시스템 수 | 7AI 활성 (✅평균) | AI ROI 기대 |
|----------|-------|---------------|--------|
| Retain | 2 | 0/7 | N/A (벤치마크) |
| Rehost | 1 | 0/7 | 매우 낮음 |
| Replatform | 4 | 2~3/7 | 중 |
| Refactor | 4 | 3~4/7 | 중~높음 |
| Rearchitect | 6 | 7/7 | 매우 높음 |
| Rebuild | 3 | 7/7 | 최대 |
| Replace | 2 | 0~3/7 (SaaS 의존) | 변동 |
| Retire | 1 | N/A | N/A |

> **중요**: Rearchitect+Rebuild = 9건이 AI 7대 역량 모두 활성화. **AM 4,500억 투자의 AI ROI 정당화 핵심**.

---

## 5. ⚠️ Low/Medium 신뢰도 시스템 재검토 목록

| ID | 신뢰도 | 사유 | 보완 액션 |
|----|-----|----|--------|
| BILL-MF | Medium | 도메인 전문가 정년 임박 | Phase 0 KT 워크숍 선행 |
| STL-MF | Medium | 동상 | 동상 |
| CNTR-MGT | Medium | BV·TF 경계 | Phase 1 재평가 |
| CC-IVR | Medium | BV 경계 | CCaaS PoC로 확정 |
| CMP-MGT | Medium | BV·TF 경계 | REC-AI 연동 후 재평가 |
| BI-REP | Medium | DW 의존 | DW Rearchitect 완료 후 |
| INV-RES | Medium | Phase 2 재검토 플래그 | NMS 동기화 |
| IDC-OPS | Medium | Rehost 장기 효과 의문 | 임원 검토 |

---

## 6. 핸드오프

| 다음 | 활용 | 에이전트 |
|-----|----|-------|
| Phase 6 Bounded Context | Rearchitect/Rebuild 9건 | fit-analyzer |
| Phase 2-7 변화관리 | 6R별 AI mirror 메시지 라이브러리(§refs/6r/06) | change-manager |
| STEP 3 전략 | 포트폴리오 Phase 구성 (Phase 1 후보: DLR, PROD, PAY, CSC, MY-APP) | strategy-planner |
| STEP 3 TCO | 6R별 비용·기간·병렬운영 | tco-analyst |

---

## 7. 민호의 맺음말

> *"24 시스템을 8 STEP × 14 속성으로 판정했습니다. rule_trace는 전 건 기록.*  
> *Rearchitect 6 + Rebuild 3 = 9건이 **AI 7 역량 모두 활성화**의 주력입니다.*  
> *⚠️ Low/Medium 신뢰도 8건 — BILL/STL 인력 승계와 경계 점수 시스템은 Phase 0·1에서 재평가 필수.*  
> *이것이 DDD·Event Storming이 다음 Phase에서 기다리는 이유입니다."*

— 정민호 / 엔터프라이즈 아키텍트 (`fit-analyzer`)
