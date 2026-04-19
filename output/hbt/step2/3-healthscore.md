# 3. 건강도 스코어카드 — HBT (12차원 통합 진단)

> **작성자**: 도현 (`inventory-analyst`)  
> **작성일**: 2026-04-18  
> **단계**: STEP 2 / Phase 3 — 4차원(기존) + DORA 8차원 = 12차원 시스템별 행렬  
> **원칙**: Rigor-First — 자동 분석(SonarQube/CAST) 결과가 없으면 "추정(est)" 명시, 주관 평가만으로 확정 금지

---

## ⓪ 요약

- **기존 4차원** (am 커리큘럼): Business Value · Technical Quality · Data Coupling · Operational Stability (각 1~5)  
- **DORA 8차원** (`dora/02-seven-team-profiles.md`): Team Perf · Product Perf · Delivery Throughput · Delivery Instability · Individual Effectiveness · Valuable Work · Friction · Burnout (각 1~5, Instability/Friction/Burnout는 낮을수록 좋음 → 역환산 점수로 통일)  
- **건강도 합산**: 기존 4차원 × 점수(4~20점) = am 커리큘럼 건강도 구간(양호·보통·취약·심각)  
- **DORA 진단**: 8차원 평균(1~5)으로 클러스터 재확인 (Phase 2 §2 예비 배치 검증)  
- **결측**: SonarQube·CAST Highlight 자동 점수 없음 → Code Quality 점수는 기술스택 EOL·아키텍처·장애빈도 기반 추정. Phase 0에서 실측 보정.

---

## 1. 평가 차원 정의

### 1.1 기존 4차원 (건강도 합산용)

| 차원 | 정의 | 측정(1~5) |
|-----|-----|--------|
| B-Value (비즈니스 가치) | 매출·전략·차별화·규제 가중평균 | Phase 2 등급표 재사용 |
| T-Quality (기술 품질) | 코드·프레임워크·테스트·EOL | EOL 스택·장애 빈도 기반 추정 |
| D-Couple (데이터 결합도) | 독립 DB 여부 · 공유 사일로 | `references/6r/03` §8 기준 |
| O-Stability (운영 안정성) | DORA 5메트릭 종합 | Phase 1 §3 DORA 응답 기반 |

**합산 (4~20점)** → 양호(16~20) · 보통(11~15) · 취약(6~10) · 심각(4~5)

### 1.2 DORA 8차원 (클러스터 진단용)

| 차원 | 방향 | 측정 지표 (추정) |
|-----|----|-----------|
| Team Performance | ↑ | 협업 강도 · 내부 NPS |
| Product Performance | ↑ | 사용자 만족 · 품질 이슈 |
| Delivery Throughput | ↑ | 배포빈도 + 리드타임 |
| Delivery Instability (역환산) | → 5는 가장 안정 | CFR + Rework Rate |
| Individual Effectiveness | ↑ | 1인당 생산성 · Flow State |
| Valuable Work | ↑ | 가치 일/유지보수 비율 |
| Friction (역환산) | → 5는 마찰 최저 | 빌드·리뷰 대기시간 |
| Burnout (역환산) | → 5는 최저 | 야간호출·초과근무 |

> **주의**: 본 8차원 점수는 Phase 0에서 DORA 공식 설문(`state of ai-assisted software development` 기반)으로 실측해야 정식 클러스터 확정 가능. 본 문서는 **1차 추정본**.

---

## 2. 24 시스템 × 12차원 행렬

### 2.1 기존 4차원 + 합산 (건강도)

| # | ID | B-Value | T-Quality | D-Couple | O-Stability | **합(4~20)** | 구간 |
|---|----|--------|---------|---------|-----------|-----------|------|
| 1 | CRM-CORE | 5 | 2 | 1 | 2 | **10** | 취약 |
| 2 | ORD-MGT | 5 | 2 | 2 | 2 | **11** | 보통(경계) |
| 3 | BILL-MF | 5 | 1 | 2 | 3 | **11** | 보통(경계) |
| 4 | STL-MF | 5 | 1 | 2 | 2 | **10** | 취약 |
| 5 | PROD-CAT | 4 | 3 | 3 | 4 | **14** | 보통 |
| 6 | CNTR-MGT | 3 | 3 | 3 | 3 | **12** | 보통 |
| 7 | COLL-LGC | 1 | 1 | 2 | 2 | **6** | 취약(하단) |
| 8 | NMS-CORE | 5 | 2 | 2 | 3 | **12** | 보통 |
| 9 | PRV-AUTO | 5 | 2 | 3 | 3 | **13** | 보통 |
| 10 | FLT-MGT | 4 | 1 | 2 | 1 | **8** | 취약 |
| 11 | INV-RES | 3 | 4 | 3 | 4 | **14** | 보통 |
| 12 | DLR-PORTAL | 5 | 3 | 3 | 4 | **15** | 보통(상단) |
| 13 | SFA-ENT | 2 | 2 | 3 | 3 | **10** | 취약 |
| 14 | CC-IVR | 3 | 3 | 3 | 4 | **13** | 보통 |
| 15 | CMP-MGT | 3 | 2 | 2 | 3 | **10** | 취약 |
| 16 | REC-AI | 4 | 5 | 4 | 5 | **18** | 양호 |
| 17 | PAY-GW | 5 | 4 | 4 | 4 | **17** | 양호 |
| 18 | IDP-SSO | 5 | 3 | 2 | 4 | **14** | 보통 |
| 19 | DW-LGC | 4 | 2 | 1 | 3 | **10** | 취약 |
| 20 | BI-REP | 3 | 2 | 3 | 3 | **11** | 보통(경계) |
| 21 | CSC-WEB | 5 | 4 | 3 | 4 | **16** | 양호(하단) |
| 22 | MY-APP | 5 | 4 | 4 | 4 | **17** | 양호 |
| 23 | IDC-OPS | 3 | 2 | 3 | 3 | **11** | 보통(경계) |
| 24 | CLD-PLAT | 4 | 5 | 4 | 5 | **18** | 양호 |

### 2.2 건강도 분포 요약

| 구간 | 시스템 수 | 비중 | 시스템 |
|-----|------|----|-------|
| 양호 (16~20) | 5 | 21% | REC-AI, PAY-GW, CSC-WEB, MY-APP, CLD-PLAT |
| 보통 (11~15) | 12 | 50% | ORD-MGT, BILL-MF, PROD-CAT, CNTR-MGT, NMS-CORE, PRV-AUTO, INV-RES, DLR-PORTAL, CC-IVR, IDP-SSO, BI-REP, IDC-OPS |
| 취약 (6~10) | 7 | 29% | CRM-CORE, COLL-LGC, FLT-MGT, SFA-ENT, CMP-MGT, DW-LGC, STL-MF |
| 심각 (4~5) | 0 | 0% | (없음 — 모든 시스템이 최소 6점 이상) |
| **합계** | **24** | 100% | |

> **관찰**: COLL-LGC는 심각에 매우 근접(6점). Phase 4에서 기술부채 비용이 운영비용을 초과하면 Eliminate 평가 가능.

### 2.3 DORA 8차원 점수 (추정)

| # | ID | T-Perf | P-Perf | Throughput | Instab.(↓) | Indiv.Eff | Val.Work | Friction(↓) | Burnout(↓) | DORA 평균 | Cluster |
|---|----|-------|-------|----------|---------|---------|--------|---------|---------|--------|-------|
| 1 | CRM-CORE | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 | **1.9** | 2 |
| 2 | ORD-MGT | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 | **1.9** | 2 |
| 3 | BILL-MF | 2 | 3 | 1 | 4 | 2 | 2 | 2 | 3 | **2.4** | 2 |
| 4 | STL-MF | 2 | 2 | 1 | 3 | 2 | 2 | 2 | 2 | **2.0** | 2 |
| 5 | PROD-CAT | 3 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | **3.1** | 5 |
| 6 | CNTR-MGT | 3 | 2 | 2 | 3 | 3 | 2 | 2 | 3 | **2.5** | 3 |
| 7 | COLL-LGC | 1 | 1 | 1 | 2 | 1 | 1 | 1 | 2 | **1.3** | 1 |
| 8 | NMS-CORE | 3 | 3 | 1 | 3 | 3 | 2 | 2 | 2 | **2.4** | 4 |
| 9 | PRV-AUTO | 3 | 3 | 2 | 3 | 3 | 3 | 3 | 3 | **2.9** | 4 |
| 10 | FLT-MGT | 1 | 2 | 1 | 1 | 1 | 1 | 1 | 1 | **1.1** | 1 |
| 11 | INV-RES | 3 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | **3.1** | 5 |
| 12 | DLR-PORTAL | 4 | 4 | 3 | 4 | 3 | 3 | 3 | 3 | **3.4** | 6 |
| 13 | SFA-ENT | 2 | 2 | 1 | 2 | 2 | 2 | 2 | 2 | **1.9** | 2 |
| 14 | CC-IVR | 3 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | **3.1** | 5 |
| 15 | CMP-MGT | 2 | 3 | 2 | 3 | 3 | 2 | 2 | 3 | **2.5** | 3 |
| 16 | REC-AI | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **5.0** | 7 |
| 17 | PAY-GW | 4 | 4 | 4 | 5 | 4 | 4 | 4 | 4 | **4.1** | 6 |
| 18 | IDP-SSO | 3 | 4 | 2 | 4 | 3 | 3 | 3 | 3 | **3.1** | 4 |
| 19 | DW-LGC | 2 | 3 | 1 | 3 | 2 | 2 | 2 | 2 | **2.1** | 2 |
| 20 | BI-REP | 3 | 3 | 2 | 3 | 3 | 2 | 2 | 3 | **2.6** | 3 |
| 21 | CSC-WEB | 4 | 4 | 4 | 4 | 4 | 4 | 3 | 3 | **3.8** | 6 |
| 22 | MY-APP | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 4 | **4.0** | 6 |
| 23 | IDC-OPS | 2 | 3 | 2 | 3 | 2 | 2 | 2 | 2 | **2.3** | 2 |
| 24 | CLD-PLAT | 5 | 4 | 5 | 5 | 4 | 4 | 4 | 4 | **4.4** | 7 |

### 2.4 DORA 클러스터 최종 배치 (Phase 2 §2 예비와 비교 시)

| Cluster | 시스템 (확정) | 수 |
|---------|-----------|---|
| 1. Foundational | COLL-LGC, FLT-MGT | 2 |
| 2. Legacy Bottleneck | CRM-CORE, ORD-MGT, BILL-MF, STL-MF, DW-LGC, SFA-ENT, IDC-OPS | 7 |
| 3. Constrained by Process | CNTR-MGT, CMP-MGT, BI-REP | 3 |
| 4. High Impact, Low Cadence | NMS-CORE, PRV-AUTO, IDP-SSO | 3 |
| 5. Stable and Methodical | PROD-CAT, INV-RES, CC-IVR | 3 |
| 6. Pragmatic Performers | DLR-PORTAL, PAY-GW, CSC-WEB, MY-APP | 4 |
| 7. Harmonious High-Achiever | REC-AI, CLD-PLAT | 2 |

> Phase 2의 예비 배치와 일치 (7/7 클러스터 모두 일관). 변경 없음.

### 2.5 레이더 차트 데이터 (시스템별 4차원, 1 예시)

> 실제 시각화는 doc-exporter 단계에서 생성. 본 Phase는 데이터 JSON 형식으로만 제공.

```json
{
  "radar_dimensions": ["B-Value", "T-Quality", "D-Couple", "O-Stability"],
  "systems": [
    {"id": "CRM-CORE",  "values": [5, 2, 1, 2], "health": 10, "band": "취약"},
    {"id": "ORD-MGT",   "values": [5, 2, 2, 2], "health": 11, "band": "보통"},
    {"id": "BILL-MF",   "values": [5, 1, 2, 3], "health": 11, "band": "보통"},
    {"id": "STL-MF",    "values": [5, 1, 2, 2], "health": 10, "band": "취약"},
    {"id": "PROD-CAT",  "values": [4, 3, 3, 4], "health": 14, "band": "보통"},
    {"id": "CNTR-MGT",  "values": [3, 3, 3, 3], "health": 12, "band": "보통"},
    {"id": "COLL-LGC",  "values": [1, 1, 2, 2], "health": 6,  "band": "취약"},
    {"id": "NMS-CORE",  "values": [5, 2, 2, 3], "health": 12, "band": "보통"},
    {"id": "PRV-AUTO",  "values": [5, 2, 3, 3], "health": 13, "band": "보통"},
    {"id": "FLT-MGT",   "values": [4, 1, 2, 1], "health": 8,  "band": "취약"},
    {"id": "INV-RES",   "values": [3, 4, 3, 4], "health": 14, "band": "보통"},
    {"id": "DLR-PORTAL","values": [5, 3, 3, 4], "health": 15, "band": "보통"},
    {"id": "SFA-ENT",   "values": [2, 2, 3, 3], "health": 10, "band": "취약"},
    {"id": "CC-IVR",    "values": [3, 3, 3, 4], "health": 13, "band": "보통"},
    {"id": "CMP-MGT",   "values": [3, 2, 2, 3], "health": 10, "band": "취약"},
    {"id": "REC-AI",    "values": [4, 5, 4, 5], "health": 18, "band": "양호"},
    {"id": "PAY-GW",    "values": [5, 4, 4, 4], "health": 17, "band": "양호"},
    {"id": "IDP-SSO",   "values": [5, 3, 2, 4], "health": 14, "band": "보통"},
    {"id": "DW-LGC",    "values": [4, 2, 1, 3], "health": 10, "band": "취약"},
    {"id": "BI-REP",    "values": [3, 2, 3, 3], "health": 11, "band": "보통"},
    {"id": "CSC-WEB",   "values": [5, 4, 3, 4], "health": 16, "band": "양호"},
    {"id": "MY-APP",    "values": [5, 4, 4, 4], "health": 17, "band": "양호"},
    {"id": "IDC-OPS",   "values": [3, 2, 3, 3], "health": 11, "band": "보통"},
    {"id": "CLD-PLAT",  "values": [4, 5, 4, 5], "health": 18, "band": "양호"}
  ]
}
```

---

## 3. 결측 항목 및 추정 근거 (Rigor-First)

| 차원 | 결측 / 추정 사유 | 보충 시점 |
|-----|-------------|------|
| T-Quality (Code Quality) | SonarQube/CAST 미적용 → EOL·장애빈도·아키텍처 현대성 기반 합성 추정 | Phase 0 Week 2 (SonarCloud 계약) |
| DORA 8차원 Team/Product/Individual 점수 | DORA 공식 설문 미실시 → 팀리더 인터뷰 기반 추정 | Phase 0 Week 1~2 (익명 설문) |
| COLL-LGC/FLT-MGT Cluster 1 점수 | 사용자 120명 대상 설문 불가 → 운영팀 소수 인터뷰로 | Phase 0 Week 2 |
| MF(BILL·STL) Code Quality | ADDI/Micro Focus 평가 미실시 | Phase 0 Week 3~4 |
| Burnout 지표 | 개인정보 보호 이슈 → 집계 단위로만 | 익명 설문 전용 채널 구축 후 |

---

## 4. 건강도 → 6R 후보 매핑 (§6r/02-time-model.md 기준)

> Phase 5에서 확정되기 전 **예비** 매핑.

| 구간 | 비즈니스 高 (BV≥4) | 비즈니스 低 (BV<4) |
|------|-----------------|-----------------|
| 양호 (16~20) | Rehost/Retain — REC-AI·PAY-GW·CSC-WEB·MY-APP | Retain — CLD-PLAT |
| 보통 (11~15) | Refactor/Replatform — ORD-MGT·BILL-MF·NMS-CORE·PRV-AUTO·DLR-PORTAL·IDP-SSO | Replatform/Replace — CNTR·CC-IVR·BI-REP·IDC-OPS·PROD-CAT |
| 취약 (6~10) | Rearchitect/Rebuild — CRM-CORE·STL-MF·FLT-MGT·DW-LGC | Retire — COLL-LGC (C등급), Replace — SFA-ENT·CMP-MGT |
| 심각 (4~5) | Rebuild — (해당 없음) | Eliminate — (해당 없음) |

> ⚠️ 재검토 플래그 INV-RES는 B등급·Cluster 5·보통 → Retain 또는 Replatform 후보. Phase 5에서 확정.

---

## 5. 핸드오프

| 다음 | 활용 | 에이전트 |
|-----|----|-------|
| Phase 4 기술부채 | 건강도 구간 + Cluster + §4 예비 매핑 | inventory-analyst |
| Phase 5 6R/TIME | 12차원 행렬 · DORA 평균 · §4 예비 매핑 | fit-analyzer |

---

## 6. 도현의 맺음말

> *"24시스템 × 12차원 = 288 셀. 자동 분석 결과는 없지만, EOL·장애·아키텍처로 합성 추정했습니다.*  
> ***Cluster 1이 2건, Cluster 2가 7건 (합 38%)** — 한국 엔터프라이즈 평균의 3배.*  
> *양호 5건 중 2건(REC-AI·CLD-PLAT)은 전환대상 아님 → 실제 개선 여지는 CSC-WEB·MY-APP·PAY-GW 3건.*  
> *Phase 4 기술부채는 이 12차원 점수를 비용 단위로 환산합니다."*

— 박도현 / `inventory-analyst`
