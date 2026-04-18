# DORA 2025 — 7개 팀 프로필 (Team Archetypes)

> DORA는 단순 메트릭만으로는 "왜"를 설명할 수 없다는 한계를 인정하고,
> 8개 차원(Team performance, Product performance, Software delivery throughput,
> Software delivery instability, Individual effectiveness, Valuable work, Friction, Burnout)
> 을 결합한 클러스터 분석으로 **7개 팀 아키타입**을 도출.
>
> AM 전환의 **STEP 2 (현황 분석)** 단계에서 시스템·팀 진단 도구로 활용.

---

## 8개 평가 차원

| 차원 | 설명 | 방향 |
|------|------|------|
| Team performance | 팀의 효과성과 협업 강도 | ↑ (높을수록 좋음) |
| Product performance | 제품/서비스의 성공·품질 | ↑ |
| Software delivery throughput | SW 배포 속도·효율성 | ↑ |
| Software delivery instability | SW 배포 품질·신뢰성 (불안정) | ↓ (낮을수록 좋음) |
| Individual effectiveness | 개인의 효과성·성취감 | ↑ |
| Valuable work | 가치 있는 일에 쓰는 시간 | ↑ |
| Friction | 업무를 방해하는 마찰 | ↓ |
| Burnout | 소진감·냉소 | ↓ |

---

## 7개 아키타입

### Cluster 1 — Foundational Challenges (10%)

**상태**: "생존 모드 (survival mode)"

| 차원 | 평가 |
|------|------|
| 성과 지표 | ↓ 낮음 (팀·제품·가치 창출 모두) |
| 팀 웰빙 | ↓ 높은 번아웃·마찰 |
| 시스템 안정성 | ↓ 운영 환경·SW 안정성 모두 약함 |

> **AM 시사점**: "기초 역량 부족 (process·environment·outcomes 모두 결손)"
> → AM 이전에 **Phase 0 (분석·기초 다지기)** 가 필수. 곧바로 Refactor 시도하면 실패 확률 높음.

---

### Cluster 2 — The Legacy Bottleneck (11%) ⚠️ AM의 1차 타깃

**상태**: "불안정한 시스템이 일을 지배 (constant state of reaction)"

| 차원 | 평가 |
|------|------|
| 성과 지표 | ↓ 제품 품질 낮음, 정기 업데이트는 있지만 품질 이슈로 가치 희석 |
| 팀 웰빙 | ↓ 번아웃·마찰 모두 높음 |
| 시스템 안정성 | ↓ **심각하게 낮음** — 비계획·반응형 작업 폭주 |

> **AM 시사점**: 본 플러그인의 **핵심 타깃 페르소나**.
> 응답자의 11%가 이 상태에 있음 → 한국 엔터프라이즈는 더 높은 비중일 가능성.
> **6R 매핑**: Replatform·Refactor·Rebuild 후보. **TIME 모델**: Migrate.

---

### Cluster 3 — Constrained by Process (17%) ⚠️ 두 번째 타깃

**상태**: "안정된 시스템 위에서도 비효율 프로세스 때문에 트레드밀처럼 달리기"

| 차원 | 평가 |
|------|------|
| 성과 지표 | ↓ 효과성·고객 가치 모두 낮음 |
| 팀 웰빙 | ↓ 번아웃·마찰 높음 |
| 시스템 안정성 | ✓ 기술 인프라는 안정 |

> **AM 시사점**: 시스템보다 **거버넌스·프로세스**가 병목.
> AM 6R로 답이 안 나옴 → **변화관리 + 거버넌스 재설계** 필요.
> `change-manager` 에이전트가 가장 큰 역할 수행.

---

### Cluster 4 — High Impact, Low Cadence (7%)

**상태**: 고임팩트 제품을 만들지만 저속·고불안정 모델

| 차원 | 평가 |
|------|------|
| 성과 지표 | ↑ 개인 효과성·제품 성과 강함 |
| 팀 웰빙 | ↓ 마찰·번아웃 상승 (불균형 환경) |
| 시스템 안정성 | ↓ "속도 없는 안정성" — 위험·지속불가능 |

> **AM 시사점**: "속도 없이 안정성만으로는 위험". AM에서 Refactor·Replatform 으로
> 처리량을 개선하지 않으면 결국 Cluster 1·2로 떨어질 가능성.

---

### Cluster 5 — Stable and Methodical (15%)

**상태**: "꾸준한 장인" — 신중한 페이스로 고품질 가치 전달

| 차원 | 평가 |
|------|------|
| 성과 지표 | ✓ 제품 품질·가치 창출 일관되게 양호 |
| 팀 웰빙 | ✓ 마찰 낮음 (효율적·협업적 프로세스) |
| 시스템 안정성 | ✓ 안정·신뢰할 수 있는 환경 |

> **AM 시사점**: AM 적용 신중. Tolerate(현행 유지) 또는 Invest(소폭 개선) 후보.
> Throughput만 개선 가능하다면 Cluster 7로 진화 가능.

---

### Cluster 6 — Pragmatic Performers (20%)

**상태**: 인상적인 속도와 안정성을 일관되게 전달, 단 강한 몰입 환경은 미달

| 차원 | 평가 |
|------|------|
| 성과 지표 | ✓ 처리량 우수, 불안정성 낮음 |
| 팀 웰빙 | △ 평균 수준 (기능적이지만 강한 동기부여 부재) |
| 시스템 안정성 | ✓ 안정·신뢰 |

> **AM 시사점**: "기능형 우수 조직" — AM 효과는 제한적, 변화관리가 더 중요.

---

### Cluster 7 — Harmonious High-achiever (20%) 🎯 AM의 비전 상태

**상태**: 탁월함의 정의 — 안정·저마찰 환경에서 지속가능한 고품질 전달

| 차원 | 평가 |
|------|------|
| 성과 지표 | ✓✓ 모든 영역에서 양호 |
| 팀 웰빙 | ✓ 번아웃·마찰 모두 낮음 |
| 시스템 안정성 | ✓ 안정·신뢰성 높음 |

> **AM 시사점**: AM 전환의 **최종 도달 목표 (To-Be 비전)**.
> 응답자의 20%만이 이 상태에 도달 → 야망적이지만 실증된 가능성.
> Cluster 6+7 합산 ~40% — "고성과는 이론이 아니라 관찰 가능한 현실"

---

## AM 진단 매트릭스 (시스템 등급 → 클러스터 매칭)

| 시스템 등급 (A/B/C) | 가장 빈번한 매칭 클러스터 | 권장 6R 전략 | 권장 TIME |
|------------------|------------------------|------------|----------|
| **A** (전략적·고가치) | Cluster 5/6/7 | Refactor + 지속 투자 | Invest |
| **B** (가치 있음, 개선 필요) | Cluster 2/3/4 | Replatform 또는 Rebuild | Migrate |
| **C** (저가치·고비용) | Cluster 1/2 | Retire / Repurchase | Eliminate |

> 본 매트릭스는 STEP 2-2 (A/B/C 분류)와 STEP 2-5 (6R 매핑)에서
> `inventory-analyst`와 `fit-analyzer` 에이전트가 활용.

---

## STEP 2-7 (변화관리 조기 착수) 적용 가이드

> **"각 클러스터마다 다른 개입(intervention)이 필요하다."**
> AM 전환의 변화관리 메시지는 클러스터별로 차별화해야 한다.

| 타깃 클러스터 | 핵심 통증 (Pain Point) | 변화관리 메시지 |
|--------------|-----------------------|-----------------|
| Cluster 1 | "생존 모드" — 자원 부족 | "AM은 더 일하라는 게 아니라, **현재의 고통을 끝내는 길**입니다" |
| Cluster 2 | 불안정한 시스템에 끌려다님 | "AM 후 **반응형 작업 X% 감소** → 가치 창출에 시간 투자" |
| Cluster 3 | 비효율 프로세스에 갇힘 | "AM은 도구가 아니라 **프로세스·거버넌스 재설계** 기회" |
| Cluster 5 | 안정에 안주 → 속도 부족 | "Throughput만 개선하면 **Cluster 7 (최상위)로 진화 가능**" |

---

## 핵심 메시지 — "속도 vs. 안정성은 미신이다"

> **"The 'speed vs. stability' trade-off is a myth.
> The best performers (clusters 6 and 7) excel at both dimensions simultaneously."**
> — DORA 2025 Report

이 메시지는 AM 전환의 **WHY 정의**에서 경영진을 설득할 때 가장 강력한 카드.
"안정성을 위해 속도를 포기해야 한다"는 통념을 데이터로 반박.

---

[Top](#dora-2025--7개-팀-프로필-team-archetypes)
