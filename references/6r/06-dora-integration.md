# 6R × DORA 2025 통합 가이드

> 6R 결정에 DORA 2025 보고서의 핵심 발견을 결합하여 추천 정확도와 ROI 정당화 강화.
> 본 문서는 [`references/dora/`](../dora/) 디렉토리와의 **명시적 다리(bridge)** 역할.
>
> `6r-matcher` + `fit-analyzer` + `strategy-planner` + `tco-analyst` 가 공통 참조.

---

## 핵심 통합 원칙

> **"6R 결정은 단순 시스템 변환이 아니라, AI ROI를 잠금 해제하는 투자다."**
>
> DORA 2025: AM 전략 수립 시 6R 자체보다 **각 6R가 7개 AI Capabilities 를 어떻게
> 갖추게 하는가**가 더 중요한 결정 변수.

---

## 6R × 7개 AI Capabilities 매트릭스

각 6R 전략이 7개 AI Capability 활성화에 미치는 영향. ✅ = 직접 활성화, △ = 간접/부분, ❌ = 영향 없음.

| AI Capability | Rehost | Replatform | Refactor | Rearchitect | Rebuild | Replace | Retain | Retire |
|--------------|:------:|:---------:|:-------:|:----------:|:-------:|:------:|:----:|:----:|
| 1. Clear AI Stance (정책) | ❌ | △ | △ | ✅ | ✅ | △ | ❌ | ❌ |
| 2. Healthy Data Ecosystems | ❌ | △ | △ | ✅ | ✅ | △ | ❌ | ❌ |
| 3. AI-accessible Internal Data | ❌ | △ | △ | ✅ | ✅ | ❌ (SaaS 제약) | ❌ | ❌ |
| 4. Strong Version Control | ❌ | △ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| 5. Working in Small Batches | ❌ | △ | △ | ✅ | ✅ | △ (SaaS 한계) | ❌ | ❌ |
| 6. User-centric Focus | ❌ | △ | △ | ✅ | ✅ | △ | ❌ | ❌ |
| 7. Quality Internal Platforms | ❌ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |

### 시사점

- **Rehost** 는 7개 AI 역량 중 **0개**를 활성화 → AI ROI 거의 없음
- **Replatform** 은 플랫폼 역량 ✅ + 다른 5개 부분 활성화 → 중간 효과
- **Refactor** 는 플랫폼·버전관리 ✅ + 다른 5개 부분 활성화 → 중간~높음 효과 (모놀리스 한계)
- **Rearchitect** 는 7개 모두 활성화 가능 → AI ROI 매우 높음
- **Rebuild** 는 7개 모두 처음부터 반영 가능 → AI ROI 최대
- **Replace** 는 SaaS 자체 AI 역량에 의존 → 통제권 제한
- **Retain·Retire** 는 AI 측면 영향 없음 (전자는 차기 결정 보류)

> **결론**: AI ROI 잠금 해제가 WHY 의 일부라면, **Rearchitect/Rebuild 비중을 의도적으로 확보할 것**.
> 예산 제약 시 Refactor + 플랫폼 투자가 차선책.

---

## 6R × DORA 7-Cluster 매핑 (정밀)

| DORA Cluster | 시스템 통상 분포 | 1순위 6R | 2순위 6R | 비고 |
|-------------|--------------|--------|--------|------|
| 1. Foundational challenges (10%) | C 등급 다수 | Retire | Replace | 핵심이라면 Rearchitect + 변화관리 선행 |
| 2. Legacy bottleneck (11%) | A·B 등급 | **Rearchitect** | Refactor / Replatform | AM의 1차 타깃 — 응답자의 11%가 이 상태 |
| 3. Constrained by process (17%) | A·B 등급 | (시스템 X) | Retain + 거버넌스 개선 | 6R 보다 STEP 3-5 (거버넌스) 강조 |
| 4. High impact, low cadence (7%) | A 등급 | **Rearchitect** | Refactor | 속도 회복 — Cluster 7 진화 가능 |
| 5. Stable and methodical (15%) | A·B 등급 | Retain | Replatform | 안정 — 점진적 개선 |
| 6. Pragmatic performers (20%) | A 등급 | Retain | 점진적 Refactor / Rearchitect | 강점 유지 |
| 7. Harmonious high-achievers (20%) | A 등급 | (벤치마크 대상) | - | 패턴 학습 후 다른 시스템에 전파 |

### 클러스터 분포 활용 — 포트폴리오 균형

> 한국 엔터프라이즈는 글로벌 평균보다 Cluster 1·2 비중이 높을 가능성.
> 인벤토리 결과가 Cluster 1·2 가 30%+ 를 차지하면, AM Phase 1·2 예산을 적극 확보 권장.

---

## DORA 5메트릭 → 6R 우선순위 신호

[`references/dora/01-software-delivery-performance.md`](../dora/01-software-delivery-performance.md) 의 5개 지표를 6R 결정 신호로 활용.

| DORA 지표 | 현재 상태 | 6R 신호 |
|---------|--------|--------|
| Deployment Frequency = "월 1회 미만" + Business Value ↑ + 도메인 분리 가능 | Top 95% 외 | **Rearchitect 강력** (MSA 전환) |
| Deployment Frequency = "월 1회 미만" + Business Value ↑ + 도메인 분리 어려움 | Top 95% 외 | **Refactor** (모놀리스 + 클라우드 서비스) |
| Deployment Frequency = "월 1회 미만" + Business Value ↓ | Top 95% 외 | **Retire/Replace 검토** |
| Lead Time = "1개월 이상" | Top 95% 외 | **Replatform → Refactor → Rearchitect** (단계적) |
| Recovery Time = "1주 이상" | Top 95% 외 | **Replatform 시급** (운영 안정성 회복) |
| CFR > 32% | Top 95% 외 | **Rearchitect** + 강한 버전관리 도입 |
| Rework Rate > 32% | Top 95% 외 | **Rearchitect** + 작은 배치 도입 |

### 6R 후 목표 DORA 지표

| 6R | 목표 (After 6R, 12~24개월) |
|----|---------------------------|
| Rehost | 변화 거의 없음 (Rehost는 DORA 개선 효과 거의 X) |
| Replatform | Top 75% 진입 (월 1회 → 주 1회 배포, 1주 이내 리드타임) |
| Refactor | Top 50% 진입 (주 1회 → 일 1회 배포, 3일 이내 리드타임) |
| Rearchitect | Top 25% 진입 (일 1회 이상 배포, 1일 이내 리드타임, 1시간 이내 복구) |
| Rebuild | Top 10% 진입 가능 (다회/일 배포, 1시간 이내 리드타임) |
| Replace | SaaS 제공 SLA 의존 |
| Retain | (변화 없음) |
| Retire | N/A |

---

## 플랫폼 엔지니어링 통합 (DORA 2025 Platform 챕터)

[`references/dora/04-platform-engineering.md`](../dora/04-platform-engineering.md) 참조.

### 핵심 원칙

> **"AI 효과는 플랫폼 품질이 낮을 때 거의 없음, 플랫폼 품질이 높을 때 강한 양의 효과."**
> — DORA 2025

### 6R 결정 시 플랫폼 통합 필수 점검

`6r-matcher` 추천 시 다음 질문에 답해야 함:
1. 이 시스템이 **공통 플랫폼** 위에서 운영될 예정인가?
2. 플랫폼 12개 특성 중 몇 개가 충족 예상되는가?
3. 플랫폼 투자가 별도 진행 중인가? (없으면 Phase 0~1에 추가 필수)

### 6R + 플랫폼 투자 권고

| 시나리오 | 권고 |
|---------|------|
| Rearchitect/Rebuild 1순위 + 플랫폼 미존재 | **Phase 1 에 IDP MVP 구축 필수**. 플랫폼 없이 MSA 전환만 하면 AI ROI 잠금 해제 불가 |
| Refactor 1순위 + 플랫폼 미존재 | Phase 1 에 IDP 핵심 기능 (CI/CD, 관측성) 구축 필수 |
| Replatform 1순위 + 플랫폼 미존재 | Phase 0 에 12개 특성 자가평가 + Phase 1' 파일럿에 IDP 1개 골든 패스 포함 |
| Rehost 1순위 + 차기 Phase Rearchitect 예정 | Rehost와 별개로 플랫폼 투자 트랙 병행 권장 |
| Replace 1순위 | SaaS의 통합 인터페이스 표준화 — IDP 영향 없음 |

---

## VSM (Value Stream Mapping) 통합

[`references/dora/05-value-stream-management.md`](../dora/05-value-stream-management.md) 참조.

### 6R 결정 전 VSM 매핑 권장

DORA 2025: VSM 없이 결정한 6R는 **시스템의 진짜 제약을 놓칠 위험**.

`fit-analyzer` 가 STEP 2-6 (서비스 경계 식별) 에서 다음 순서로 진행:
1. As-Is VSM 매핑 (code commit → production)
2. 가장 큰 병목 식별 (코드 리뷰? 배포 승인? 테스트?)
3. 병목 유형에 따라 6R 우선순위 조정:

| 병목 유형 | 6R 신호 |
|---------|--------|
| 코드 리뷰 적체 | **Rearchitect (서비스 분리) + Strong Version Control + AI-accessible internal data** 강조 |
| 빌드/배포 시간 과다 | **Replatform** (CI/CD 자동화) 또는 **Rearchitect** (마이크로서비스로 분할) |
| 변경 승인 다단계 | (시스템 X) STEP 3-5 (거버넌스) — 변경 자문위 자동화 검토 |
| 환경 셋업 시간 | **Replatform** (IDP 골든 패스) |
| 데이터 마이그레이션 어려움 | **Rearchitect** (데이터 분리, Database-per-Service) 우선순위 ↑ |
| 모놀리스 단일 장애점 | **Rearchitect** (장애 격리) |
| 도메인 모델 노후화 | **Rebuild** (도메인 재정의) |

---

## "AI Mirror" — AM 전환 메시지 강화

[`references/dora/05-value-stream-management.md`](../dora/05-value-stream-management.md) 의 AI Mirror 섹션 활용.

### `6r-matcher` 추천 시 함께 제공할 변화관리 메시지

각 6R 결정에 대해 다음 메시지를 자동 첨부:

#### Rebuild 결정 시
```
"본 시스템은 점진적 개선이 불가능한 수준 (건강도 심각)입니다.
완전 재구축으로 DORA Cluster 6/7 (상위 40%) 으로 직접 도약 가능합니다.
AI 도구를 처음부터 7개 Capabilities 모두 반영하여 설계하는 단 한 번의 기회입니다."
```

#### Rearchitect 결정 시
```
"본 시스템은 DORA 2025 Cluster {N} 에 해당하며, Rearchitect 후
Cluster 6/7 (상위 40%) 진입 가능성이 있습니다.
MSA 전환은 7개 AI Capabilities 모두를 활성화할 수 있는 핵심 변환입니다.
'AI는 시스템의 거울' — Rearchitect는 진짜 변화를 가져오는 강력한 길입니다."
```

#### Refactor 결정 시
```
"본 시스템은 모놀리스 구조를 유지하면서 클라우드 서비스를 적극 활용하여
운영 효율과 부분적 AI ROI 를 확보하는 균형점입니다.
배포 주기·독립 확장 한계는 차기 Phase의 Rearchitect 후보로 등록합니다."
```

#### Replatform 결정 시
```
"본 시스템은 운영 부담 경감과 AI ROI 일부 활성화의 균형점입니다.
DORA 7개 AI Capabilities 중 플랫폼·표준화 측면을 우선 확보하며,
차기 Phase에서 Refactor 또는 Rearchitect 진화 가능성을 열어둡니다."
```

#### Rehost 결정 시
```
"본 시스템은 단기 클라우드 이전이 시급하나, Rehost는 DORA 5개 메트릭
및 AI ROI 측면에서 효과가 거의 없습니다. 차기 Phase에서 반드시
Replatform/Refactor/Rearchitect 재평가 필요합니다."
```

#### Replace 결정 시
```
"SaaS 전환 후 자체 AI 통제권은 제한되지만, 운영 부담 외주화로
다른 핵심 시스템에 인력을 집중할 수 있습니다.
SaaS 자체의 AI 로드맵을 분기별로 점검하는 거버넌스 트랙을 권고합니다."
```

#### Retire 결정 시
```
"본 시스템 폐기는 운영비 절감 + 보안 부채 해소 + 인력 재배치 가능.
DORA 권고: '시스템을 줄이는 것이 곧 시스템 진화의 일부' 입니다."
```

#### Eliminate 결정 시
```
"본 시스템은 건강도 심각 + 비즈니스 가치 낮음 → 즉시 폐기 결정.
영향 분석 후 1개월 이내 사용자 통보 + 데이터 아카이빙 완료를 목표합니다."
```

#### Retain 결정 시
```
"현 시점 변경 없이 유지하나, DORA 데이터에 따르면 시간 경과는
기술 부채를 자동으로 누적시킵니다. {재평가 시점} 까지 명확한
차기 결정 트리거를 등록합니다."
```

---

## TCO 산정 시 DORA 2025 추가 항목

[`references/dora/06-am-transformation-implications.md`](../dora/06-am-transformation-implications.md) 의
"To-Be TCO 보강" 섹션 참조.

### Refactor·Rearchitect·Rebuild TCO 에 분리 항목으로 추가

| 항목 | 산정 가이드 |
|------|-----------|
| **AI 도구 라이선스** | 개발자당 월 $20~50 (Copilot, Cursor 등) — Rearchitect/Rebuild 시 필수 |
| **AI 컨텍스트 인프라** | RAG·벡터 DB·MCP 서버 운영비 (월 100~500만원) — Rearchitect/Rebuild 시 필수 |
| **데이터 생태계 정비** | 데이터 품질·통합·접근성 향상 (시스템당 1~5억) |
| **플랫폼 팀 인건비** | IDP 운영팀 4~10명 — 전체 Phase에 걸쳐 |
| **AI 정책·교육** | 분기당 5,000만~1억 (전사 교육·워크숍) |

### TCO 시나리오 보고

DORA 권고에 따라 단일 숫자 X — 다음 3개 시나리오 모두 제시:
- **Conservative**: AI 도구 효과 없다고 가정
- **Realistic**: DORA 2025 평균 효과 가정 (생산성 +15~25%)
- **Optimistic**: DORA AI Capabilities 7개 모두 활성화 가정 (생산성 +30~50%)

---

## 6R 결정 검증 체크리스트 (DORA 2025 관점)

`6r-matcher` 가 추천 후 `reviewer` 에이전트가 검증할 항목:

- [ ] AI ROI 측면이 6R 추천에 반영되었는가?
- [ ] 7개 AI Capabilities 활성화 가능 여부가 평가되었는가?
- [ ] DORA Cluster 매핑이 일관되는가?
- [ ] DORA 5메트릭 후 목표 (After 6R) 가 설정되었는가?
- [ ] 플랫폼 투자가 6R와 함께 계획되었는가?
- [ ] VSM 매핑 결과가 6R 우선순위에 반영되었는가?
- [ ] 변화관리 메시지가 6R별로 차별화되었는가?
- [ ] TCO에 AI 도구·인프라 비용이 분리 항목으로 포함되었는가?
- [ ] User-centric focus 가 To-Be 설계에 반영되었는가?
- [ ] 작은 배치 (Working in Small Batches) 가 KPI 에 포함되었는가?

---

## 빠른 참조: 6R 결정 시 함께 봐야 할 DORA 파일

| 6R 결정 단계 | 참조할 DORA 파일 |
|------------|----------------|
| Business Value 평가 | [`06-am-transformation-implications.md`](../dora/06-am-transformation-implications.md) (5S+혁신 동인 매핑) |
| Technical Fit 평가 | [`01-software-delivery-performance.md`](../dora/01-software-delivery-performance.md) (5메트릭) |
| 시스템 클러스터링 | [`02-seven-team-profiles.md`](../dora/02-seven-team-profiles.md) (7개 클러스터) |
| Rearchitect/Rebuild 비용 정당화 | [`03-ai-capabilities-model.md`](../dora/03-ai-capabilities-model.md) (7개 AI 역량) |
| 플랫폼 투자 결정 | [`04-platform-engineering.md`](../dora/04-platform-engineering.md) |
| VSM 매핑 + 병목 식별 | [`05-value-stream-management.md`](../dora/05-value-stream-management.md) |
| TCO 보강 항목 | [`06-am-transformation-implications.md`](../dora/06-am-transformation-implications.md) |
| 실행 가이드 (역량별 How-to) | [`07-ai-capabilities-implementation.md`](../dora/07-ai-capabilities-implementation.md) |

---

[Top](#6r--dora-2025-통합-가이드)
