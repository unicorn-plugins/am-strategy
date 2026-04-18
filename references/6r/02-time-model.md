# TIME 모델

> Gartner의 애플리케이션 포트폴리오 합리화(Application Portfolio Rationalization, APR) 프레임워크.
> **비즈니스 가치(Business Value)** × **기술 적합성(Technical Fit)** 의 2x2 매트릭스로
> 애플리케이션을 4개 그룹으로 분류한다.
>
> 6R가 "어떻게 전환할 것인가" 의 실행 전략이라면, TIME은 "기본 의사결정 방향"을 제공.
> 6R 결정과 TIME 분류는 서로 교차 검증되어야 한다.
>
> 본 정의는 [`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md) 의
> TIME 모델 정의와 정합.

---

## TIME 4분면

```
                기술 적합성 (Technical Fit) ↑

                  높음                낮음
              ┌──────────────┬──────────────┐
        높음   │              │              │
              │   INVEST     │   MIGRATE    │
              │              │              │
   비즈니스   ├──────────────┼──────────────┤
    가치      │              │              │
              │  TOLERATE    │  ELIMINATE   │
        낮음  │              │              │
              └──────────────┴──────────────┘
```

| 4분면 | 비즈니스 가치 | 기술 적합성 | 의미 | am 커리큘럼 비중 (예시) |
|-------|------------|----------|------|----------------------|
| **TOLERATE** | 낮음 | 높음 | 큰 가치는 없지만 기술적으로는 안정 — 당장은 유지, 중기 전환 계획 | 30% |
| **INVEST** | 높음 | 높음 | 핵심 자산 — Refactor/Replatform으로 클라우드 최적화 | 24% |
| **MIGRATE** | 높음 | 낮음 | 가치는 큰데 기술이 약함 — Rearchitect/Rebuild 필요 | 30% |
| **ELIMINATE** | 낮음 | 낮음 | 가치도 적고 기술도 약함 — 폐기 또는 SaaS 교체 | 16% |

> 비중 예시는 [`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md)
> 50개 시스템 기준. 한국 엔터프라이즈는 MIGRATE 비중이 더 높을 가능성.

---

## 축의 정의

### 비즈니스 가치 (Business Value) — Y축

| 평가 항목 | 측정 방법 | 가중치 |
|---------|----------|--------|
| 매출 기여도 | 직접 매출 / 간접 매출 영향 | 30% |
| 사용자 수·영향 범위 | 일/월/연 활성 사용자, 영향받는 부서 수 | 20% |
| 전략적 중요도 | 회사 비전·KPI와의 정렬 정도 | 25% |
| 차별화 가치 | 경쟁사 대비 차별화 기여도 | 15% |
| 규제·컴플라이언스 필수성 | 법적·계약상 필수 여부 | 10% |

**점수화**: 1(매우 낮음) ~ 5(매우 높음). 가중 평균으로 종합 점수 산출.

| 종합 점수 | 분류 |
|---------|------|
| 4.0 ~ 5.0 | 높음 (High Value) |
| 2.5 ~ 3.9 | 중간 (Medium Value) |
| 1.0 ~ 2.4 | 낮음 (Low Value) |

> 본 룰북에서는 2x2 매트릭스 적용을 위해 **3.0을 임계값**으로 사용.
> (3.0 이상 = 높음, 3.0 미만 = 낮음)

### 기술 적합성 (Technical Fit) — X축

am 커리큘럼의 4차원 건강도 스코어카드와 정합:

| 평가 항목 | 측정 방법 | 가중치 |
|---------|----------|--------|
| 코드 품질 | SonarQube/CAST Highlight 점수, 코드 부채 비율 | 25% |
| 아키텍처 적합성 | 클라우드 네이티브 적합도, 결합도 | 25% |
| 운영 안정성 | DORA 5메트릭 (배포·리드타임·복구·CFR·재작업) | 20% |
| 데이터 결합도 | 다른 시스템과의 DB 공유, 데이터 사일로 | 10% |
| 기술 스택 현행성 | 사용 중인 언어·프레임워크의 지원 상태 | 10% |
| 인력 가용성 | 해당 기술 보유 인력 풀 | 10% |

**점수화**: 1(매우 낮음) ~ 5(매우 높음).

| 종합 점수 | 분류 |
|---------|------|
| 4.0 ~ 5.0 | 높음 (High Fit) |
| 2.5 ~ 3.9 | 중간 (Medium Fit) |
| 1.0 ~ 2.4 | 낮음 (Low Fit) |

> 임계값: **3.0** (3.0 이상 = 높음, 3.0 미만 = 낮음)

---

## TIME → 6R 권장 매핑

| TIME 분류 | 권장 6R (1순위) | 권장 6R (2순위) | 비권장 6R |
|----------|--------------|--------------|----------|
| **INVEST** | Refactor 또는 Replatform | Rearchitect (점진적) | Retire, Replace |
| **TOLERATE** | Retain | Replatform (라이선스 절감 시) | Rearchitect, Rebuild (과투자) |
| **MIGRATE** | Rearchitect | Rebuild (재구축 불가피 시) | Rehost (장기 효과 X) |
| **ELIMINATE** | Retire | Replace (SaaS 교체 가능 시) | Rearchitect, Rebuild |

### 상세 매핑 근거

#### INVEST (가치↑·기술↑)
- 이미 잘 작동하는 핵심 자산 → 추가 투자로 경쟁력 강화
- **Refactor / Replatform** 1순위 — 큰 변경 없이 클라우드 네이티브 이점 흡수
- Rearchitect 가능 (점진적 진화)

#### TOLERATE (가치↓·기술↑)
- 안정적이지만 큰 투자 가치는 없음 → 현행 유지가 합리
- 운영비 추가 절감 가능하면 Replatform
- 향후 가치가 떨어지면 Retire 검토

#### MIGRATE (가치↑·기술↓)
- 비즈니스에 중요하지만 기술이 약점 → 가장 시급한 현대화 대상
- **Rearchitect** 가 1순위 (am 커리큘럼) — DDD 기반 MSA 분해
- 기술 부채가 너무 심해 점진적 개선 불가능 시 **Rebuild**

#### ELIMINATE (가치↓·기술↓)
- 가치도 작고 기술도 약함 → 유지 비용 낭비
- **Retire** 가 1순위
- 동일 기능을 SaaS로 대체 가능하면 **Replace**

---

## am 커리큘럼: 건강도 → 6R 매핑

[`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md) 의 "건강도 → 6R 매핑 가이드"
와 정합:

| 건강도 점수 | 비즈니스 高 | 비즈니스 低 |
|-----------|-----------|-----------|
| **양호 (16~20점)** | Rehost 또는 전환 보류 | **Retain** (현행 유지) |
| **보통 (11~15점)** | Refactor / Replatform | **Replace** (SaaS 교체) |
| **취약 (6~10점)** | Rearchitect / Rebuild | **Retire** (폐기) |
| **심각 (4~5점)** | Rebuild (재구축 불가피) | **Eliminate** (즉시 폐기) |

### 본 매트릭스의 활용

이 매트릭스는 **TIME 분면 결정 후의 정밀 보정**에 사용:
- TIME = INVEST + 건강도 양호 → Rehost (구조 변경 불필요)
- TIME = INVEST + 건강도 보통 → Refactor / Replatform
- TIME = MIGRATE + 건강도 취약 → Rearchitect / Rebuild
- TIME = MIGRATE + 건강도 심각 → Rebuild
- TIME = TOLERATE + 건강도 양호 → Retain
- TIME = ELIMINATE + 건강도 취약~심각 → Retire / Eliminate

---

## TIME → DORA 7-Cluster 매핑

DORA 2025 보고서의 7개 팀 클러스터를 TIME 분면에 배치.

| DORA Cluster | TIME 1순위 | TIME 2순위 | 근거 |
|-------------|---------|---------|------|
| Cluster 1 (Foundational challenges) | ELIMINATE | MIGRATE | 4영역 모두 ↓ — 폐기/대체 우선, 핵심이면 MIGRATE |
| Cluster 2 (Legacy bottleneck) | MIGRATE | INVEST | 운영 안정성 ↓↓ — 현대화 시급 |
| Cluster 3 (Constrained by process) | TOLERATE | INVEST | 기술 OK, 가치 약함 — 거버넌스/프로세스 개선 우선 |
| Cluster 4 (High impact, low cadence) | INVEST | MIGRATE | 가치 ↑ but 안정성 ↓ — 속도 회복 투자 |
| Cluster 5 (Stable and methodical) | TOLERATE | INVEST | 안정 + 평균 가치 — 점진적 개선 |
| Cluster 6 (Pragmatic performers) | INVEST | TOLERATE | 4영역 모두 ↑ — 핵심 자산 |
| Cluster 7 (Harmonious high-achievers) | INVEST | (벤치마크) | 최상위 — 패턴 학습 대상 |

---

## TIME 분류 시 주의사항

### 1. "기술 적합성"은 정적 평가가 아니다

기술 적합성은 **현재 상태 + 개선 가능성**을 함께 본다.
- "코드 품질 낮지만 도메인 분리 가능" → MIGRATE 후보 (Rearchitect 가능)
- "코드 품질 높지만 도메인 분리 불가" → TOLERATE 또는 부분적 ELIMINATE

### 2. 비즈니스 가치는 "현재 + 미래"

- 현재 사용량은 적지만 신규 시장 진입의 핵심이 될 시스템 → INVEST
- 현재 사용량은 많지만 사양 산업 영역 → TOLERATE 또는 ELIMINATE

### 3. 시간 차원 — "When"

TIME 분류는 **"Now"** 기준. 단, Phase별 재평가 필수:
- Phase 0 → 초기 분류
- Phase 2 (게이트) → 재평가 (시장·기술·조직 변화 반영)
- Phase 4 (완료) → 차기 라운드 입력값으로 활용

### 4. "임계값 근처" 시스템의 처리

3.0 임계값 ± 0.3 (즉, 2.7 ~ 3.3) 시스템은 **경계 사례(Borderline)**:
- 자동 분류하지 말고 **수동 검토** 표시
- DORA Cluster, 의존성, 팀 의지 등 추가 신호 반영
- 우선순위는 다른 명확한 시스템에 양보, 다음 Phase에서 재평가

### 5. TIME vs 6R의 관계

> [`references/am/02-analysis-and-strategy.md`](../am/02-analysis-and-strategy.md) 인용:
> "TIME은 **언제** 전환할 것인가, 6R은 **어떻게** 전환할 것인가 결정.
> 경영진 소통에 효과적."

- TIME = 시간·우선순위 의사결정 (포트폴리오 차원)
- 6R = 실행 방법 의사결정 (시스템 차원)
- 둘은 보완적이며 모순되지 않아야 함

---

## TIME 분류 워크시트 (산출 양식)

```yaml
system_name: "{시스템명}"
time_classification:
  business_value:
    score: 4.2  # 1.0 ~ 5.0
    category: "High"  # High / Medium / Low
    breakdown:
      revenue_contribution: 5
      user_impact: 4
      strategic_alignment: 5
      differentiation: 3
      compliance_necessity: 3
  technical_fit:
    score: 2.3
    category: "Low"
    breakdown:
      code_quality: 2
      architecture_fit: 2
      operational_stability: 3
      data_coupling: 2
      tech_stack_currency: 3
      talent_availability: 2
  health_score: 8  # am 커리큘럼 점수 (4~20)
  health_category: "취약"  # 양호/보통/취약/심각
  classification: "MIGRATE"  # INVEST / TOLERATE / MIGRATE / ELIMINATE
  confidence: "High"  # High / Medium / Low (border case)
  recommended_6r:
    primary: "Rearchitect"
    alternative: "Rebuild"
  rationale: |
    - 비즈니스 가치 4.2 (High) — 핵심 매출 기여 + 전략 정렬도 높음
    - 기술 적합성 2.3 (Low), 건강도 8 (취약) — 현대화 시급
    - DORA Cluster 2 (Legacy bottleneck) 매칭
    - Rearchitect 권장: 5년 이상 운영 예정, 도메인 경계 식별 가능
    - Rebuild 대안: 도메인 재정의가 필요한 경우 검토
```

---

[Top](#time-모델)
