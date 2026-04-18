# DORA 2025 — AM 전환 전략 시사점 종합

> 본 문서는 DORA 2025 보고서의 핵심 발견을 **AM (Application Modernization) 전략 수립**
> 관점에서 직접 활용 가능한 형태로 종합 정리.
> `why-definer`, `strategy-planner`, `change-manager` 에이전트가 통합 활용.

---

## 핵심 인사이트 1줄 요약

> **"AM 전환은 시스템 진화 없이는 효과 없고, AI 도입은 AM 없이는 ROI 없다."**

DORA 2025의 모든 발견은 한 방향으로 수렴 — **시스템·플랫폼·문화의 함께 진화**가 필수.

---

## STEP 1 (WHY 정의) 에 직접 적용 가능한 내러티브

### 경영진 설득용 핵심 카드 5장

| # | 메시지 | 데이터 출처 |
|---|--------|-----------|
| 1 | "속도와 안정성은 트레이드오프가 아니다 — 상위 40%(Cluster 6, 7)는 둘 다 우수" | DORA 2025 Cluster 분포 |
| 2 | "현재의 모더한 모습 (Harmonious high-achiever) 은 20%가 이미 도달한 현실" | Cluster 7 정의 |
| 3 | "AI 도구만 도입하면 처리량은 +되지만 불안정성도 +. 시스템 진화가 핵심" | 2025 vs 2024 비교 |
| 4 | "AI 투자 ROI는 고품질 플랫폼 없이 거의 0 — AM은 AI ROI의 전제조건" | Figure 49 (Platform × AI) |
| 5 | "사용자 중심 포커스 부재 시 AI는 팀 성과를 **저해**" | Figure 43 (User-centric × AI) |

### 5S+혁신 동인 매핑

| 동인 | DORA 2025 근거 | 1차 KPI 후보 (range) |
|------|---------------|------------------|
| **Speedy** | Lead time Top 24.4%: 1일 이내 | Lead time 2주 → 3~7일 (3~5배 개선) |
| **Service Always** | Recovery Top 56.6%: 1일 이내, CFR Top 36.2%: 8% 이하 | Recovery 1주 → 1일, CFR 25% → 10~15% |
| **Save Cost** | "AM 없이 AI 투자는 ROI 0" | TCO ↓ 15~30% (3년 BEP) + AI ROI 잠금 해제 |
| **Security** | "AI는 보안 약점도 증폭" | SAST/SCA 자동화 100%, Critical 취약점 0건 |
| **혁신** | User-centric focus 없으면 AI 도입이 성과 저해 | 사용자 NPS, 신규 기능 출시 주기 |

---

## STEP 2 (현황 분석) 에 직접 적용 가능한 진단 도구

### 시스템 클러스터 분류 (4영역 스코어카드 보강)

기존 4차원(비즈니스 가치·기술 품질·데이터 결합도·운영 안정성) + 8차원(DORA Cluster 분석)
= **12차원 통합 진단**

| DORA Cluster | 기존 4차원 매칭 | 6R 권장 | TIME 권장 |
|-------------|---------------|--------|----------|
| Cluster 1 (Foundational challenges) | 4영역 모두 ↓ | Retire / Repurchase | Eliminate |
| Cluster 2 (Legacy bottleneck) | 운영 안정성 ↓↓ | Replatform / Rebuild | Migrate |
| Cluster 3 (Constrained by process) | 운영 안정성 OK, 비즈니스 가치 ↓ | (시스템 X, 거버넌스 ○) | Tolerate |
| Cluster 4 (High impact, low cadence) | 비즈니스 가치 ↑, 운영 안정성 ↓ | Refactor | Invest |
| Cluster 5 (Stable and methodical) | 4영역 모두 평균 이상 | Tolerate / Invest | Invest |
| Cluster 6 (Pragmatic performers) | 4영역 모두 ↑ | (현행 유지 + 부분 최적화) | Invest |
| Cluster 7 (Harmonious high-achiever) | 4영역 모두 ↑↑ | (벤치마크 대상) | Invest |

### 시스템 인터뷰 추가 질문 (DORA 2025 기반)

기존 인터뷰 질문지에 다음 8개 질문 추가:

1. 이 시스템의 배포 빈도는? (월 1회 / 주 1회 / 일 1회 / 다회/일)
2. Lead time (커밋 → 프로덕션) 평균은? (1시간 / 1일 / 1주 / 1개월 / 그 이상)
3. 배포 실패 시 평균 복구 시간은?
4. 변경 실패율(CFR) 추정치는?
5. 이 시스템은 AI 도구의 컨텍스트로 사용 가능한가? (RAG·MCP·내부 검색)
6. 작은 단위 PR (< 200 라인) 비율은?
7. Trunk-based development 또는 짧은 브랜치 전략 적용 여부?
8. 사용자 피드백을 수집·반영하는 정기 주기?

---

## STEP 3 (전략 수립) 에 직접 적용 가능한 7개 의사결정

### 1. 6R 전략에 "AM + AI 시너지" 항목 추가

| 6R | DORA 2025 추가 고려 사항 |
|----|------------------------|
| Rehost (Lift & Shift) | ⚠️ AI ROI 잠금 효과 거의 없음 — 전략적 우선순위 ↓ |
| Replatform | ✓ 플랫폼 품질 12개 특성 충족 시 AI ROI 큰 효과 |
| Refactor | ✓ 작은 배치 + 강한 버전관리 도입 → AI 효과 증폭 |
| Repurchase | ✓ SaaS 도입 시 사용자 중심 포커스 검증 필수 |
| Retire | ✓ Cluster 1 시스템은 Retire 우선 검토 |
| Retain | △ Cluster 5/6는 Retain 합리적 |

### 2. Phase 0 에 필수 포함할 항목 (DORA 권고 기반)

- 12개 플랫폼 특성 자가평가 (현재 점수)
- VSM 매핑 워크숍 (가치 흐름 As-Is)
- 7개 AI 역량 자가평가 (베이스라인)
- 7개 클러스터 자가진단 (시스템별)
- AI 정책 초안 작성

### 3. Phase 1 (Quick Win) + Phase 1' (파일럿) 선정 원칙

| 기존 원칙 | DORA 2025 보강 |
|---------|---------------|
| B등급, 롤백 용이, 독립 DB | + 강한 버전 관리 가능, 작은 배치로 분할 가능 |
| 팀 의지 | + 사용자 중심 포커스 점수 평균 이상 |
| 성과 가시성 | + DORA 5개 메트릭 베이스라인 측정 가능 |

### 4. TCO 분석 보강

To-Be TCO에 다음 항목 분리:

| 항목 | 산정 가이드 |
|------|-----------|
| 플랫폼 팀 인건비 | 4~10명 (조직 규모별) |
| AI 도구 라이선스 | 개발자당 월 $20~50 |
| AI 컨텍스트 인프라 | RAG·벡터 DB·MCP 서버 운영비 |
| 데이터 생태계 정비 | 데이터 품질·통합·접근성 향상 |
| 변화관리·교육 | 조직 전환 (실패 1위 원인 대응) |

### 5. 4영역 리스크에 "AI 시스템 미진화 리스크" 추가

| 영역 | DORA 2025 기반 신규 리스크 |
|------|------------------------|
| 기술 | "AI 도입 시 불안정성 증가 (작은 배치 미적용 시)" |
| 조직 | "사용자 중심 포커스 부재 시 AI가 성과 저해" |
| 비즈니스 | "AM 부분 적용으로 AI ROI 잠금 실패" |
| 일정 | "VSM 미적용으로 다운스트림 병목에 흡수" |

### 6. 거버넌스 5개 회의체 재검토

| 회의체 | DORA 2025 보강 사항 |
|--------|------------------|
| 스티어링 | "AI 정책" 정기 검토 안건 추가 |
| 워킹그룹 | VSM 정기 매핑 (분기 1회) |
| ARB | 12개 플랫폼 특성 게이트 |
| 리스크 | AI 도입 추적 메트릭 정기 보고 |
| 비용 | TCO에 AI 인프라 비용 분리 |

### 7. Phase별 가드레일 — DORA 5개 메트릭 추가

| Phase 게이트 | 추가 측정 |
|-----------|---------|
| Phase 1 → 2 | DORA 5메트릭 베이스라인 대비 ≥ 1단계 향상 |
| Phase 2 → 3 | 플랫폼 12개 특성 점수 평균 ≥ "Moderately" |
| Phase 3 → 4 | 7개 AI 역량 점수 평균 ≥ 평균 |
| Phase 4 완료 | Cluster 6/7 진입한 시스템 비율 ≥ 50% |

---

## STEP 3-6 (변화관리 기획) 핵심 메시지 라이브러리

### 임원·관리자용

> "DORA 2025에 따르면 AI 투자만으로는 조직 성과 개선이 거의 없습니다.
> AM 전환은 AI 투자의 ROI를 잠금 해제하는 **유일한 길**입니다."

### 개발팀용

> "AM은 단순한 인프라 이전이 아닙니다.
> Cluster 7 (Harmonious high-achiever) — 20% 팀이 이미 도달한
> '안정적이고 빠르며 의미 있는' 일상으로 가는 길입니다."

### 운영팀용

> "현재 평균 복구 시간이 며칠인 시스템도, AM 후 **1시간 이내** 복구가 가능합니다 (상위 21.3%).
> 야간 호출이 줄어드는 진짜 변화가 일어납니다."

### 비즈니스팀용

> "DORA 2025는 사용자 중심 포커스가 모든 성과 지표의 가장 강한 예측 변수임을 확인했습니다.
> AM은 사용자 가치 측정·반영 사이클을 빠르게 만드는 인프라 투자입니다."

---

## 보고서·발표 자료에 인용 가능한 통계 모음

| 통계 | 출처 | 활용 위치 |
|------|------|---------|
| 응답자 4,997명, 90% AI 사용 (전년 대비 +14.1%p) | DORA 2025 | WHY 도입부 |
| 3개의 처리량 + 2개의 불안정성 = 5개 핵심 지표 | DORA 2025 | 정량화 섹션 |
| 7개 팀 아키타입, 상위 40% (Cluster 6+7) | DORA 2025 | 비전 섹션 |
| 플랫폼 채택률 90%, 전담 팀 76% | DORA 2025 | 플랫폼 투자 정당화 |
| 7개 AI 역량 모델 (신규) | DORA 2025 | AI 전략 섹션 |
| AI 채택 시 처리량 +, 불안정성 + (시스템 미진화 시) | DORA 2025 | AM 시급성 |
| 사용자 중심 포커스 부재 → AI 도입이 팀 성과 저해 | DORA 2025 | 사용자 KPI 정당화 |
| Lead time Top 24.4% = 1일 이내 | DORA 2025 | 야망적 KPI 근거 |

---

## 직접 활용 권장 인용문

```
"In 2025, the central question for technology leaders is no longer if they should
adopt AI, but how to realize its value... AI's primary role in software development
is that of an amplifier. It magnifies the strengths of high-performing organizations
and the dysfunctions of struggling ones."
— DORA 2025 Executive Summary
```

```
"An investment in AI without a corresponding investment in high-quality platforms
is unlikely to yield significant returns at the organizational level."
— DORA 2025 Platform Engineering Chapter
```

```
"AI shines a light on what's working, accelerating what's already in motion,
but it also surfaces what needs to change. For organizations ready to look,
the reflection AI offers becomes a roadmap."
— DORA 2025 The AI Mirror Chapter
```

---

[Top](#dora-2025--am-전환-전략-시사점-종합)
