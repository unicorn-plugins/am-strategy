# 6R / TIME 매칭 룰북

> AM 전환 시스템별 변환 전략(6R)과 포트폴리오 분류(TIME)를 결정하는 표준 룰북.
> `6r-matcher` 세부역할이 일관된 추천을 내릴 수 있도록 정의·기준·규칙·비용·DORA 통합을 정리.
>
> **6R**: Rehost · Replatform · Refactor · Rearchitect · Rebuild · Replace
> ([`references/am/01-am-overview.md`](../am/01-am-overview.md) 정합)
> **Beyond 6R**: Retain · Retire · Eliminate (6R 외 결정 카테고리)

---

## 핵심 메시지

> **"6R는 종착점이 아니라 진화 경로다."**
>
> 본 룰북은 다음 3가지 원칙을 따른다:
> 1. **일관성** — 동일 입력에는 동일 추천
> 2. **추적 가능성** — 모든 추천에 규칙 트레이스 첨부
> 3. **DORA 정렬** — 6R 결정에 AI ROI 측면 반영

---

## 파일 목록

| 파일 | 용도 | 활용 에이전트 |
|------|------|--------------|
| [`01-6r-definitions.md`](01-6r-definitions.md) | 6R 전략 정의·실행 방식·적합/부적합 시스템 + Beyond 6R | `6r-matcher`, `strategy-planner` |
| [`02-time-model.md`](02-time-model.md) | TIME 2x2 매트릭스 + am 커리큘럼 건강도 매핑 + DORA Cluster 매핑 | `fit-analyzer`, `6r-matcher` |
| [`03-decision-criteria.md`](03-decision-criteria.md) | 14개 시스템 입력 속성 정의·점수화 기준 | `inventory-analyst`, `6r-matcher` |
| [`04-matching-rules.md`](04-matching-rules.md) | 8단계 결정 알고리즘·STEP별 규칙·YAML 출력 양식 | `6r-matcher` (핵심) |
| [`05-cost-effort-risk-profile.md`](05-cost-effort-risk-profile.md) | 6R별 기간·비용 범위·인력·리스크·예비비 (am 커리큘럼 베이스라인) | `budget-calculator`, `cost-modeler` |
| [`06-dora-integration.md`](06-dora-integration.md) | 6R × DORA 2025 통합·AI ROI·플랫폼·VSM·변화관리 메시지 | 전 에이전트 |

---

## 빠른 참조 — 결정 의사결정 트리

```
┌─────────────────────────────────────────┐
│ STEP 1. Hard Constraint Check          │
│  • Business Value=1 + Lifecycle≤1년     │ → Retire
│  • 가치↓ + 건강도 심각(4~5)             │ → Eliminate
│  • SaaS 대안 + 비용 우위 + 규제 OK      │ → Replace
│  • 의존성 대기                          │ → Retain
│  • 도메인 지식 부재 + 인력 부족         │ → Replace 검토
└─────────────────────────────────────────┘
                  ↓ (해당 없음)
┌─────────────────────────────────────────┐
│ STEP 2~4. TIME 분면 결정                │
│  Business Value × Technical Fit         │
└─────────────────────────────────────────┘
                  ↓
        ┌─────────┴─────────┐
        │                   │
   ┌────────────┐    ┌─────────────┐
   │  INVEST    │    │  TOLERATE   │
   │ Refactor / │    │ → Retain    │
   │ Replatform │    │             │
   └────────────┘    └─────────────┘
   ┌────────────┐    ┌─────────────┐
   │  MIGRATE   │    │  ELIMINATE  │
   │ Rearchitect│    │ → Retire    │
   │ / Rebuild  │    │ or Replace  │
   └────────────┘    └─────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ STEP 6~7. 제약 조건 + DORA Cluster 검증 │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ STEP 8. 신뢰도 평가 + 출력              │
└─────────────────────────────────────────┘
```

---

## 6R 빠른 비교

### Quick Win 군 (구조 변경 없음)

| 6R | 한 줄 요약 | AI ROI | 비용 | 기간 | 리스크 |
|----|----------|-------|------|------|------|
| **Rehost** | Lift & Shift | 거의 없음 | 낮음 | 수주 | 낮음 |
| **Replatform** | OS/DB/WAS 일부 최적화 | 중 | 낮~중 | 1~3개월 | 낮~중 |
| **Refactor** | 모놀리스 유지 + 클라우드 서비스 연동 | 중~높음 | 중 | 2~4개월 | 중 |

### AM 군 (구조적 변화 수반)

| 6R | 한 줄 요약 | AI ROI | 비용 | 기간 | 리스크 |
|----|----------|-------|------|------|------|
| **Rearchitect** | 모놀리스 → MSA | 높음 | 높음 | 6~12개월 | 높음 |
| **Rebuild** | 클라우드 네이티브 완전 재개발 | 매우 높음 | 매우 높음 | 12~24개월 | 매우 높음 |
| **Replace** | SaaS 또는 상용 솔루션 대체 | SaaS 의존 | 중 + 라이선스 | 2~4개월 | 중~높음 |

### Beyond 6R

| 카테고리 | 한 줄 요약 | 비용 | 기간 |
|---------|----------|------|------|
| **Retain** | 현행 유지 (재평가 등록) | 거의 없음 | 즉시 |
| **Retire** | 폐기 | 낮음 | 1~6개월 |
| **Eliminate** | 즉시 폐기 (Retire의 강한 형태) | 낮음 | 1~3개월 |

---

## TIME → 6R 빠른 매핑

| TIME | 1순위 6R | 2순위 6R | 비권장 |
|------|--------|--------|------|
| INVEST | Refactor / Replatform | Rearchitect (점진적) | Retire |
| TOLERATE | Retain | Replatform (라이선스 절감 시) | Rearchitect, Rebuild |
| MIGRATE | Rearchitect | Rebuild (재구축 불가피 시) | Rehost |
| ELIMINATE | Retire | Replace (SaaS 가능 시) | Rearchitect, Rebuild |

---

## am 커리큘럼: 건강도 → 6R 매핑

[`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md) 와 정합:

| 건강도 점수 | 비즈니스 高 | 비즈니스 低 |
|-----------|-----------|-----------|
| **양호 (16~20)** | Rehost 또는 전환 보류 | **Retain** |
| **보통 (11~15)** | Refactor / Replatform | **Replace** |
| **취약 (6~10)** | Rearchitect / Rebuild | **Retire** |
| **심각 (4~5)** | Rebuild | **Eliminate** |

---

## DORA 2025 통합 핵심 발견

| DORA 발견 | 6R 함의 |
|---------|--------|
| AI 채택 90% — 보편화 | 모든 6R 결정에 AI ROI 측면 평가 필수 |
| 플랫폼 90% 채택 — 표준 | Refactor/Rearchitect/Rebuild 시 IDP 투자 병행 |
| 7개 AI Capabilities 모델 | Rearchitect/Rebuild가 7개 모두 활성화 — Rehost는 0개 |
| 7개 팀 클러스터 (상위 40%) | Cluster 1·2 → MIGRATE/ELIMINATE 우선 |
| VSM 이 AI ROI 증폭 | 6R 결정 전 VSM 매핑 필수 |
| User-centric focus 부재 시 AI는 성과 저해 | 모든 To-Be 설계에 사용자 KPI 포함 |

---

## 사용 워크플로우

### `6r-matcher` 가 추천을 내리는 표준 절차

```
1. 시스템 ID 입력 + 14개 속성 데이터 + 건강도 점수 수신
2. 03-decision-criteria.md 기준으로 입력 검증
3. 04-matching-rules.md STEP 1~8 실행
4. 06-dora-integration.md 검증 체크리스트 적용
5. 출력: YAML 양식 (04-matching-rules.md "출력 양식" 섹션)
6. 신뢰도 Low 시 Manual Review Required 플래그
```

### `budget-calculator` 가 비용을 산정하는 절차

```
1. 6r-matcher 의 추천 결과 수신
2. 05-cost-effort-risk-profile.md 의 시스템 규모별 범위 적용
   (am 커리큘럼 베이스라인: Rehost 3천만~5천만, Rearchitect 3억~8억 등)
3. 누락 항목 체크리스트 점검 (14개 항목)
4. 6R별 분포 비율로 Phase 예산 합산
5. 시나리오 3종 (Conservative/Realistic/Optimistic) 출력
```

---

## 추천 결과의 일관성 보장

`6r-matcher` 가 동일 입력에 다른 결과를 내지 않도록:

- 04-matching-rules.md 의 STEP 순서 엄격 준수
- 경계선 케이스(점수 ± 0.3)는 자동 결정 X — Manual Review
- 모든 추천에 `rule_trace` 필수 출력
- 추천 후 `reviewer` 에이전트의 검증 통과 (06-dora-integration.md 체크리스트)

---

## 룰북 정합성 확인

본 룰북은 다음 3개 외부 자료와 정합성이 검증됨:

| 외부 자료 | 정합 확인 항목 |
|---------|------------|
| [`references/am/01-am-overview.md`](../am/01-am-overview.md) | 6R 명칭 (Rehost/Replatform/Refactor/Rearchitect/Rebuild/Replace) |
| [`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md) | 건강도 → 6R 매핑, 비용·기간 베이스라인, TIME 모델 |
| [`references/dora/`](../dora/) | DORA 2025 인사이트 (AI Capabilities·Cluster·VSM·플랫폼) |

---

## 룰북 업데이트 정책

- 본 룰북은 **AM 도메인 표준** 으로 안정화된 상태
- 신규 6R 또는 신규 결정 신호 추가 시 사용자 승인 후 업데이트
- DORA 차기 보고서 발간 시 06-dora-integration.md 부분 갱신
- am 커리큘럼 변경 시 01-6r-definitions.md, 02-time-model.md, 04-matching-rules.md 동시 갱신

---

[Top](#6r--time-매칭-룰북)
