# DORA 2025 — Software Delivery Performance Metrics

> AM 전환의 **WHY 정의 (STEP 1)** 단계에서 기대 성과를 정량화할 때 사용하는 벤치마크.
> DORA 2025는 Elite/High/Medium/Low 티어 표기를 폐기하고, **응답 분포**와
> **Top % 누적**으로 제시한다 (티어 라벨이 매년 클러스터 분석 결과에 따라 흔들렸기 때문).

---

## 5개 핵심 지표

DORA는 처리량(Throughput) 3지표 + 불안정성(Instability) 2지표 = **총 5개**로 측정.

### Throughput (처리량)

| 지표 | 정의 |
|------|------|
| **Deployment Frequency** | 일정 기간 동안의 배포 횟수 또는 배포 간격 |
| **Lead Time for Changes** | 코드 커밋 → 프로덕션 배포까지 소요 시간 |
| **Failed Deployment Recovery Time** | 실패한 배포로부터 복구하는 데 걸리는 시간 |

### Instability (불안정성)

| 지표 | 정의 |
|------|------|
| **Change Fail Rate (CFR)** | 즉각적인 개입(롤백/핫픽스)이 필요한 배포의 비율 |
| **Rework Rate** | 사고 결과로 발생한 비계획 배포의 비율 |

---

## 2025년 응답 분포 (벤치마크)

### 1. Deployment Frequency

| 구간 | % at level | Top % (누적) |
|------|-----------|------------|
| On demand (multiple deploys per day) | 16.2% | 16.2% |
| Between once per hour and once per day | 6.5% | 22.7% |
| Between once per day and once per week | 21.9% | 44.6% |
| Between once per week and once per month | 31.5% | 76.1% |
| Between once per month and once every six months | 20.3% | 96.4% |
| Fewer than once per six months | 3.6% | 100% |

> **AM 시사점**: 레거시 시스템이 "월 1회~6개월 1회"(20.3%)에 머물 가능성이 높음.
> **현실적 1차 목표**: "주 1회"(상위 76.1%) 진입 → "일 1회"(상위 44.6%) 진입.

### 2. Lead Time for Changes

| 구간 | % at level | Top % (누적) |
|------|-----------|------------|
| Less than one hour | 9.4% | 9.4% |
| Less than one day | 15.0% | 24.4% |
| Between one day and one week | 31.9% | 56.4% |
| Between one week and one month | 28.3% | 84.7% |
| Between one month and six months | 13.2% | 98.0% |
| More than six months | 2.0% | 100% |

> **AM 시사점**: 글로벌 응답자의 **상위 24.4%만이 "코드 커밋 후 1일 이내 배포"**.
> 모놀리스 환경에서 "1일 이내 배포"는 Replatform/Refactor의 강력한 정량 근거.

### 3. Failed Deployment Recovery Time

| 구간 | % at level | Top % (누적) |
|------|-----------|------------|
| Less than one hour | 21.3% | 21.3% |
| Less than one day | 35.3% | 56.6% |
| Between one day and one week | 28.0% | 84.6% |
| Between one week and one month | 9.4% | 94.0% |
| Between one month and six months | 4.9% | 98.9% |
| More than six months | 1.0% | 100% |

> **AM 시사점**: 절반 이상(56.6%)이 1일 이내 복구. 레거시는 통상 "주 단위" 복구.
> Recovery 시간 단축은 **MTTR 감소 = 가용성 향상 = SLA 비용 감소**로 직결.

### 4. Change Fail Rate (CFR)

| 구간 | % at level | Top % (누적) |
|------|-----------|------------|
| 0% – 2% | 8.5% | 8.5% |
| 2% – 4% | 8.1% | 16.7% |
| 4% – 8% | 19.6% | 36.2% |
| 8% – 16% | 26.0% | 62.2% |
| 16% – 32% | 19.5% | 81.6% |
| 32% – 64% | 12.5% | 94.1% |
| > 64% | 5.9% | 100% |

> **AM 시사점**: CFR 8% 이하가 상위 36.2%. AM 후 목표 CFR ≤ 15% (현실적 중위권).

### 5. Rework Rate

| 구간 | % at level | Top % (누적) |
|------|-----------|------------|
| 0% – 2% | 7.3% | 7.3% |
| 2% – 4% | 12.8% | 20.1% (계산값) |
| 4% – 8% | 26.5% | — |
| 8% – 16% | 26.1% | — |
| 16% – 32% | 15.4% | — |
| 32% – 64% | 6.9% | — |
| > 64% | (소수) | 100% |

---

## DORA의 측정 원칙 (AM 전략 적용 시 주의사항)

> **"이 지표들은 동일 애플리케이션/서비스의 시간 경과에 따른 비교가 가장 통찰력 있다.
> 절대 비교가 아니라 지속적 학습과 개선이 목표다."**

1. **애플리케이션 단위 측정** — 조직 전체 평균이 아니라 **개별 애플리케이션 단위**로 측정.
   AM 전환 대상도 시스템별로 개별 베이스라인 → 목표 설정 권장.
2. **속도 vs. 안정성은 트레이드오프가 아님** — 상위 클러스터(6, 7번)는 두 차원 모두 우수.
   "안정성 위해 속도 포기" 논리는 데이터로 반박됨.
3. **2025년 새로운 발견** — AI 채택은 처리량을 개선했지만 **안정성은 여전히 악화**.
   AM에서 AI 도구만 도입하고 시스템(테스트·배포·거버넌스)을 진화시키지 않으면 동일한 함정.

---

## STEP 1-2 (기대 성과 정량화 L1) 적용 가이드

| 지표 | 레거시 일반치(추정) | AM 후 1차 목표 (Top 50% 진입) | AM 후 도전적 목표 (Top 25% 진입) |
|------|-------------------|---------------------------|------------------------------|
| Deployment Frequency | 월 1회 ~ 분기 1회 | **주 1회 이상** | **일 1회 이상** |
| Lead Time | 주 ~ 월 단위 | **1주 이내** | **1일 이내** |
| Recovery Time | 일 ~ 주 단위 | **1일 이내** | **1시간 이내** |
| CFR | 16% 이상 | **8~16%** | **8% 이하** |

> 모든 목표는 "범위(range)"로 제시하라 (성공 기준의 정량화 원칙).
> 위 분포 데이터를 출처로 명시하면 경영진 보고서에서 즉시 인용 가능.

---

[Top](#dora-2025--software-delivery-performance-metrics)
