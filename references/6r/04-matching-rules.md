# 6R 매칭 규칙 (Decision Rulebook)

> `6r-matcher` 세부역할이 시스템 속성을 입력받아 **일관된 추천**을 내리는 결정 규칙.
> 우선순위가 높은 규칙부터 평가하여, 첫 번째로 매칭되는 규칙의 결정을 채택한다.
>
> **6R**: Rehost · Replatform · Refactor · Rearchitect · Rebuild · Replace
> **Beyond 6R**: Retain · Retire · Eliminate
>
> 모든 규칙은 **결정(Primary 6R) + 대안(Alternative 6R) + 신뢰도(High/Medium/Low) + 추천 근거**
> 4가지 출력값을 반환한다.

---

## 알고리즘 요약

```
INPUT: 14개 시스템 속성 + 건강도 점수(4~20) + DORA Cluster + A/B/C 등급
─────────────────────────────────────────────────────
STEP 1. Hard Constraint Check  → 절대 조건 (Retire/Replace 트리거 등)
STEP 2. Business Value 평가     → BV ≥ 3.0 / BV < 3.0 분기
STEP 3. Technical Fit 평가      → TF ≥ 3.0 / TF < 3.0 분기
STEP 4. TIME 분면 결정          → INVEST / TOLERATE / MIGRATE / ELIMINATE
STEP 5. 강한 신호 매트릭스 적용 → 1순위 6R 결정 (am 커리큘럼 건강도 매핑 정합)
STEP 6. 제약 조건 점검          → 인력·규제·라이선스로 조정
STEP 7. DORA Cluster 보강       → 추천 근거 강화
STEP 8. 신뢰도 평가             → High/Medium/Low + 재검토 플래그
─────────────────────────────────────────────────────
OUTPUT: 추천 결과 (Primary 6R, Alternative 6R, TIME, Confidence, Rationale)
```

---

## STEP 1. Hard Constraint Rules (절대 조건)

특정 조건을 만족하면 다른 평가 없이 즉시 결정.

### Rule H1 — 즉시 Retire

```
IF (Business Value Score = 1) AND (User Base ≤ 10 명/일)
   AND (Lifecycle Remaining ≤ 1년)
THEN
  Primary: Retire
  Alternative: (없음)
  Confidence: High
  Rationale: "비즈니스 가치 최저 + 사용자 거의 없음 + 라이프사이클 1년 미만 → 즉시 폐기"
```

### Rule H1' — 즉시 Eliminate

```
IF (Business Value Score 1~2) AND (건강도 심각: 4~5)
THEN
  Primary: Eliminate
  Alternative: Retire
  Confidence: High
  Rationale: "비즈니스 가치 최저 + 건강도 심각 → 즉시 폐기 (am 커리큘럼 매트릭스)"
```

### Rule H2 — 즉시 Replace

```
IF (Business Value 1~3) AND (동일 기능 SaaS 존재)
   AND (자체 운영 비용 > SaaS 구독료 × 1.5)
   AND (Regulatory Constraint ≥ 3)
THEN
  Primary: Replace
  Alternative: Retire
  Confidence: High
  Rationale: "차별화 가치 낮음 + SaaS 대안 존재 + 비용 우위 + 규제 허용 → SaaS 전환"
```

### Rule H3 — 즉시 Retain (의존성 대기)

```
IF (다른 시스템의 변경을 기다려야 함) OR (현재 Phase에서 평가 불가)
THEN
  Primary: Retain
  Alternative: (다음 Phase 재평가)
  Confidence: High
  Rationale: "의존성으로 인해 다음 Phase 재평가 — {대기 사유}"
  Re-evaluation Trigger: "{시점/조건} 후 재평가"
```

### Rule H4 — Rearchitect/Rebuild 사실상 불가

```
IF (Team Capability ≤ 2) AND (Domain Expert 0~1명) AND (외주 의존)
   AND (Tech Stack Currency = 1)
THEN
  Primary: Replace
  Alternative: Replatform
  Confidence: Medium
  Rationale: "내부 역량 부족 + 도메인 지식 사실상 부재 → Rearchitect/Rebuild 시 실패 위험 ↑↑.
              SaaS 대체 불가 시 Replatform 으로 단계적 접근"
  Risk Flag: "도메인 지식 외부화·문서화 선행 필요"
```

> H1~H4가 매칭되지 않으면 STEP 2로 진행.

---

## STEP 2. Business Value 평가

가중평균 점수가 3.0 이상이면 "High Value", 미만이면 "Low Value"로 분기.
경계선(2.7 ~ 3.3)은 Medium 표시 후 추가 신호로 재판단.

---

## STEP 3. Technical Fit 평가

마찬가지로 3.0 임계값 적용. 경계선은 Medium 표시.
**건강도 점수 (4~20)** 도 함께 산출:
- 양호: 16~20
- 보통: 11~15
- 취약: 6~10
- 심각: 4~5

---

## STEP 4. TIME 분면 결정

| 비즈니스 가치 | 기술 적합성 | TIME |
|------------|----------|------|
| High (≥ 3.0) | High (≥ 3.0) | INVEST |
| Low (< 3.0) | High (≥ 3.0) | TOLERATE |
| High (≥ 3.0) | Low (< 3.0) | MIGRATE |
| Low (< 3.0) | Low (< 3.0) | ELIMINATE |

---

## STEP 5. 강한 신호 매트릭스 적용 (1순위 6R 결정)

> am 커리큘럼의 "건강도 → 6R 매핑" 매트릭스
> ([`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md))
> 와 정합하도록 분기.

### TIME = INVEST (가치↑·기술↑)

```
IF (건강도 양호: 16~20) AND (Architecture Modernity ≥ 4)
THEN
  Primary: Rehost
  Alternative: Retain
  Rationale: "고가치·고적합 + 이미 현대적 아키텍처 → 단순 클라우드 이전 또는 현행 유지"

ELIF (건강도 보통: 11~15) AND (Lifecycle Remaining ≥ 3년)
THEN
  Primary: Refactor
  Alternative: Replatform
  Rationale: "고가치 + 보통 건강도 → 모놀리스 유지하며 클라우드 서비스 연동 (Refactor)
              또는 OS/DB/WAS만 교체 (Replatform)"

ELIF (건강도 취약: 6~10) AND (Lifecycle Remaining ≥ 5년) AND (Team Capability ≥ 3)
   AND (Data Coupling ≥ 3)
THEN
  Primary: Rearchitect
  Alternative: Refactor
  Rationale: "고가치 + 약한 건강도 + 도메인 분해 가능 + 인력 충분 → MSA 전환으로 진화"

ELSE
  Primary: Refactor
  Alternative: Replatform
  Confidence: Medium
  Rationale: "INVEST 분면이지만 Rearchitect 조건 불충분 → 단계적 접근"
```

### TIME = TOLERATE (가치↓·기술↑)

```
IF (License Cost 매우 높음) AND (오픈소스 대안 존재)
THEN
  Primary: Replatform
  Alternative: Retain
  Rationale: "안정적이지만 라이선스 비용 큼 → 오픈소스 대체로 비용 절감"

ELSE
  Primary: Retain
  Alternative: (다음 Phase 재평가)
  Rationale: "기술적으로 안정 + 가치 보통 → 현행 유지, 가치 변화 시 재평가"
```

### TIME = MIGRATE (가치↑·기술↓)

```
IF (건강도 심각: 4~5) AND (도메인 재정의 가능) AND (Lifecycle Remaining ≥ 5년)
THEN
  Primary: Rebuild
  Alternative: Rearchitect
  Rationale: "고가치 + 건강도 심각 → 점진적 개선 불가, 완전 재구축 (am 커리큘럼: 재구축 불가피)"

ELIF (건강도 취약: 6~10) AND (Lifecycle Remaining ≥ 5년) AND (Team Capability ≥ 3)
   AND (Data Coupling ≥ 3) AND (Change Frequency ≥ 3)
THEN
  Primary: Rearchitect
  Alternative: Rebuild
  Rationale: "고가치 + 약한 건강도 + 도메인 분리 가능 + 활발한 변경 → MSA 전환 1순위"

ELIF (건강도 취약~보통: 6~15) AND (Lifecycle Remaining 3~5년)
THEN
  Primary: Replatform
  Alternative: Refactor
  Rationale: "단기 안정성 회복 시급 → Replatform 또는 Refactor 우선,
              중장기에 Rearchitect 재검토"

ELIF (Lifecycle Remaining ≤ 3년)
THEN
  Primary: Replatform
  Alternative: Rehost
  Rationale: "잔여 라이프사이클 짧음 → 큰 투자보다 운영 부담 경감 우선"

ELSE
  Primary: Rearchitect
  Alternative: Replatform
  Confidence: Medium
  Rationale: "표준 MIGRATE 케이스 — am 커리큘럼 권장 Rearchitect, 인력 부족 시 Replatform"
  Re-evaluation Trigger: "Replatform 완료 후 6개월 시점"
```

### TIME = ELIMINATE (가치↓·기술↓)

```
IF (건강도 심각: 4~5)
THEN
  Primary: Eliminate
  Alternative: (영향 분석 후 즉시 폐기)
  Rationale: "건강도 심각 + 비즈니스 가치 낮음 → 즉시 폐기 (am 커리큘럼 매트릭스)"

ELIF (User Base ≤ 100) AND (동일 기능 다른 시스템 존재)
THEN
  Primary: Retire
  Alternative: (사용자 마이그레이션 가이드)
  Rationale: "사용자 적음 + 대체 시스템 존재 → 폐기 + 사용자 통합"

ELIF (동일 기능 SaaS 존재) AND (Regulatory Constraint ≥ 3)
THEN
  Primary: Replace
  Alternative: Retire
  Rationale: "기능 표준화 가능 + SaaS 대안 + 규제 허용 → SaaS 전환"

ELSE
  Primary: Retire
  Alternative: Replace
  Confidence: Medium
  Rationale: "ELIMINATE 분면이지만 즉시 폐기 검토 필요 → 영향 분석 후 결정"
  Action: "영향 분석 워크숍 필요"
```

---

## STEP 6. 제약 조건으로 인한 조정

STEP 5에서 결정된 1순위 6R가 다음 제약 조건에 걸리면 자동 조정.

### Constraint C1 — Rearchitect/Rebuild → Replatform 강등

```
IF (Primary IN {Rearchitect, Rebuild}) AND
   ( (Team Capability ≤ 2) OR (Domain Expert ≤ 1) OR (Lifecycle Remaining < 5년) )
THEN
  Primary: Replatform
  Alternative: Rearchitect (다음 Phase 후보)
  Rationale 추가: "Rearchitect/Rebuild 권장이나 {조건} 으로 인해 Replatform 으로 조정.
                  {조건 해소} 후 Rearchitect 재검토 가능"
  Risk Flag: "원래 MSA 전환 적합도 높음 — 단기 효과 제한적일 수 있음"
```

### Constraint C2 — Refactor → Replatform 강등

```
IF (Primary = Refactor) AND (Code Quality ≤ 2)
THEN
  Primary: Replatform
  Alternative: Refactor (코드 품질 개선 후)
  Rationale 추가: "Refactor 권장이나 코드 품질 너무 낮음 → 클라우드 서비스 연동 어려움.
                  Replatform 으로 인프라만 먼저 정비"
```

### Constraint C3 — Replace → Refactor/Rearchitect 강등

```
IF (Primary = Replace) AND
   ( (Regulatory Constraint ≤ 2) OR (도메인 차별화 핵심) OR (적합한 SaaS 부재) )
THEN
  Primary: Refactor 또는 Rearchitect (Lifecycle/Team Capability에 따라)
  Alternative: Replace (제약 해소 시)
  Rationale 추가: "Replace 적합하나 {제약} 으로 자체 개발 유지"
```

### Constraint C4 — Rehost 회피

```
IF (Primary = Rehost) AND (Lifecycle Remaining ≥ 5년) AND (건강도 < 양호)
THEN
  Confidence: Low
  추가 추천: "장기 운영 시스템에 Rehost는 AI ROI·기술 부채 측면에서 권장 X.
            Replatform 또는 Refactor 로 1순위 조정 권장"
  Action: "임원 검토 필요"
```

> Rehost는 STEP 5에서 INVEST + 건강도 양호 + 현대적 아키텍처에서만 1순위.
> 그 외 다음 경우만 예외:
> - DC 폐쇄 임박 + 다른 옵션 시간 부족
> - 단기(1~2년) 운영 후 Retire 예정
> - 라이선스·계약 종료 임박

---

## STEP 7. DORA Cluster 보강

STEP 5~6의 결정을 DORA 7-Cluster 매핑과 비교하여 일관성 검증.

| DORA Cluster | 기대 1순위 6R | 검증 |
|-------------|------------|------|
| 1 (Foundational) | Retire / Replace | 결정이 INVEST 분면이면 재검토 (이상치) |
| 2 (Legacy) | Replatform / Refactor / Rearchitect | 결정이 Retain이면 재검토 |
| 3 (Process) | (시스템 X, 거버넌스) | 6R 우선순위 낮음, STEP 3-5 (거버넌스) 강조 |
| 4 (High impact, low cadence) | Rearchitect | 결정이 Retain이면 재검토 |
| 5 (Stable methodical) | Retain / Replatform | 결정이 Retire/Rearchitect이면 재검토 |
| 6 (Pragmatic) | Retain / Refactor (점진적) | 결정 일관성 확인 |
| 7 (Harmonious) | (벤치마크) | 변경 안 함 |

> 매핑이 어긋나면 **재검토 플래그** 부여. 자동 변경 X.

---

## STEP 8. 신뢰도(Confidence) 평가 + 출력

### 신뢰도 결정 기준

| 신뢰도 | 조건 |
|-------|------|
| **High** | 모든 입력 점수 명확 (경계선 없음) + STEP 6 조정 없음 + DORA Cluster 일치 |
| **Medium** | 1~2개 경계선 점수 또는 STEP 6 조정 발생 또는 DORA Cluster 1단계 어긋남 |
| **Low** | 다수 경계선 점수 또는 STEP 6 다중 조정 또는 DORA Cluster 2단계 이상 어긋남 |

### Low 신뢰도 시 추가 액션

- **Manual Review Required** 플래그
- 도메인 전문가 인터뷰 추가 권장
- 다음 Phase에서 재평가
- 결정 보류 가능 (Retain 임시 부여)

---

## 출력 양식 (YAML)

```yaml
system_id: "{시스템ID}"
system_name: "{시스템명}"
recommendation:
  primary_6r: "Rearchitect"
  alternative_6r: "Rebuild"
  time_classification: "MIGRATE"
  health_score: 8
  health_category: "취약"
  confidence: "High"
  rationale: |
    1. Business Value 4.2 (High) — 매출 직접 기여 + 전략 정렬
    2. Technical Fit 2.3 (Low), 건강도 8 (취약)
    3. TIME = MIGRATE 분면
    4. STEP 5 매칭: Lifecycle 7년 + Team Capability 4 + Data Coupling 3 + Change Frequency 4
       → Rearchitect 1순위 (am 커리큘럼: 취약 + 비즈니스 高 → Rearchitect/Rebuild)
    5. DORA Cluster 2 (Legacy bottleneck) 일치 — 검증 OK
    6. STEP 6 제약 조건 없음
  rule_trace:
    - "STEP 1 Hard Constraint: 미적용"
    - "STEP 4 TIME = MIGRATE"
    - "STEP 5 MIGRATE Rule 2 매칭 (건강도 취약 + Lifecycle ≥ 5년 + 인력 충분)"
    - "STEP 7 DORA Cluster 2 검증 일치"
  risk_flags: []
  re_evaluation_trigger: null
  estimated_effort:
    duration_months: "6 ~ 12"
    cost_range_krw: "3억 ~ 8억"
    contingency_pct: 25
    team_size_fte: "5 ~ 10"
  required_actions:
    - "DDD 기반 Bounded Context 식별 워크숍 (3주)"
    - "Phase 0에 12개 플랫폼 특성 자가평가 포함"
    - "Phase 1' (파일럿)에 최우선 후보로 검토"
```

### Low 신뢰도 출력 예시

```yaml
system_id: "EX-002"
recommendation:
  primary_6r: "Replatform"
  alternative_6r: "Rearchitect"
  time_classification: "MIGRATE"
  health_score: 9
  health_category: "취약"
  confidence: "Low"
  rationale: |
    1. Business Value 3.1 (경계선 — High로 분류)
    2. Technical Fit 2.9 (경계선 — Low로 분류)
    3. STEP 6 Constraint C1 적용: Team Capability 2 → Rearchitect를 Replatform으로 강등
    4. DORA Cluster 4 (High impact) — Rearchitect 기대값과 1단계 차이
  rule_trace:
    - "STEP 4 TIME = MIGRATE (경계선)"
    - "STEP 5 MIGRATE Rule 2 → Rearchitect"
    - "STEP 6 Constraint C1 적용 → Replatform"
    - "STEP 7 DORA Cluster 어긋남 (Rearchitect 기대 vs Replatform 결정)"
  risk_flags:
    - "Manual Review Required"
    - "Team Capability 부족 — 외부 영입·교육 선행 검토"
  re_evaluation_trigger: "Phase 1 종료 시점 (6개월 후)"
  required_actions:
    - "도메인 전문가 추가 인터뷰"
    - "팀 역량 강화 계획 수립 후 재평가"
```

---

## 매칭 규칙 적용 우선순위 요약

```
1. Hard Constraint (STEP 1) — 즉시 결정
2. TIME 분면 (STEP 2~4) — 큰 방향 결정
3. 건강도 × 비즈니스 매트릭스 (STEP 5) — am 커리큘럼 정합 1순위 6R 도출
4. 제약 조건 조정 (STEP 6) — 현실 반영
5. DORA Cluster 검증 (STEP 7) — 일관성 점검
6. 신뢰도 평가 (STEP 8) — 출력 + 후속 액션
```

---

## 자주 발생하는 케이스 — Quick Decision Table

| 시나리오 | 권장 6R | 신뢰도 |
|---------|--------|-------|
| 모놀리스 + 건강도 취약 + Lifecycle 7년 + 인력 충분 | **Rearchitect** | High |
| 모놀리스 + 건강도 보통 + Lifecycle 5년 + 인력 보통 | **Refactor** | High |
| 모놀리스 + 건강도 취약 + Lifecycle 3년 + 인력 부족 | **Replatform** | High |
| 모놀리스 + 건강도 심각 + 비즈니스 가치 ↑ + 도메인 재정의 가능 | **Rebuild** | High |
| 백오피스 + Business Value 2 + SaaS 대안 다수 | **Replace** | High |
| 메인프레임 + EOL 임박 + 도메인 지식 외부화 가능 | **Replace** 또는 **Rebuild** | Medium |
| 안정 시스템 + Cluster 5 + 변경 거의 없음 | **Retain** | High |
| 안정 시스템 + Cluster 5 + 라이선스 비용 큼 | **Replatform** | High |
| 사용자 < 10 + Lifecycle ≤ 1년 | **Retire** | High |
| 비즈니스 가치 ↓ + 건강도 심각(4~5) | **Eliminate** | High |
| 모든 점수 평균 4~5 + Cluster 6/7 | **Retain** 또는 점진적 **Refactor** | High |
| DC 폐쇄 임박 + Lifecycle 1~2년 후 Retire | **Rehost** | High |
| 도메인 전문가 0명 + 운영 안정성 1 + 가치 ↑ | **Replace** 1순위 검토 | Medium |
| INVEST + 건강도 양호 + 이미 MSA 아키텍처 | **Rehost** 또는 **Retain** | High |

---

## am 커리큘럼 건강도 → 6R 매핑 빠른 참조

[`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md) 의 매트릭스를
본 룰북의 STEP 5 분기로 정합화:

| 건강도 점수 | 비즈니스 高 (TIME = INVEST/MIGRATE) | 비즈니스 低 (TIME = TOLERATE/ELIMINATE) |
|-----------|----------------------------------|-------------------------------------|
| 양호 (16~20) | Rehost 또는 Retain | **Retain** |
| 보통 (11~15) | Refactor / Replatform | **Replace** |
| 취약 (6~10) | Rearchitect / Rebuild | **Retire** |
| 심각 (4~5) | Rebuild | **Eliminate** |

---

[Top](#6r-매칭-규칙-decision-rulebook)
