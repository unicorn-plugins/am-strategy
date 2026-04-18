# DORA 2025 — Platform Engineering 인사이트

> **2025년 핵심 발견**: 플랫폼 엔지니어링 채택률 **90% 보편화**.
> 의제는 "플랫폼이 필요한가"에서 **"플랫폼을 어떻게 운영할 것인가"** 로 이동.
> 본 챕터는 AM 전환 **STEP 3-1 (6R 전략 상세화)** 와 **STEP 3-2 (포트폴리오 Phase)** 의
> 플랫폼 투자 우선순위 결정에 직접 사용.

---

## 핵심 통계 (2025)

| 항목 | 비율 |
|------|------|
| 내부 플랫폼 채택 조직 | **90%** |
| 다중 플랫폼 (multi-platform) 환경 | 29% |
| 전담 플랫폼 팀 운영 조직 | 76% |
| 다중 플랫폼 팀 운영 조직 | 29% |

> 도전 과제는 "플랫폼 보유"에서 **"플랫폼들의 플랫폼 거버넌스"** 로 이동.
> Loosely coupled teams 역량이 더 중요해짐.

---

## 5개 핵심 발견

| # | 발견 | AM 전략 시사점 |
|---|------|---------------|
| 1 | 플랫폼 채택률 90% — 거의 보편화 | AM Phase 0~1에 IDP(Internal Developer Platform) 투자가 표준 |
| 2 | 고품질 플랫폼은 조직 성과·생산성·웰빙의 **승수효과** (force multiplier) | 시스템별 AM 비용 외에 **공통 플랫폼 비용**을 별도 분리 |
| 3 | 플랫폼은 **위험 관리 엔진** — 약간의 불안정성 증가는 속도·실험 가능성의 트레이드오프 | "안정성 100%" 목표 X — 빠른 복구가 가능한 환경 구축 |
| 4 | 전담 플랫폼 팀이 76% — 거버넌스 모델이 핵심 | AM 거버넌스 5개 회의체에 **플랫폼 ARB** 추가 권장 |
| 5 | 고품질 플랫폼이 **AI ROI를 증폭** — 플랫폼 품질 낮을 때 AI 효과 거의 없음 | AM + AI 동시 투자 시 **플랫폼이 공통 기반** |

---

## 12개 플랫폼 특성 (품질 평가 항목)

조사에서 응답자가 자신의 플랫폼을 평가한 항목:

1. Helps me follow required processes — 필수 프로세스 준수 지원
2. Works as expected — 예상대로 동작
3. Helps me build and run **secure** applications
4. Helps me build and run **reliable** applications
5. Provides the tools and info I need to work **independently**
6. UI is **clean and straightforward**
7. **Hides underlying infrastructure complexity** (인프라 복잡성 추상화)
8. Team is **responsive to feedback**
9. Is **easy to use**
10. Provides **clear feedback on my tasks** ⭐ 가장 중요 (사용자 경험과 가장 강한 상관)
11. **Automates the tasks I perform**
12. (스킨/UI 영역) — UI 청결도는 상대적으로 약한 상관

> **AM 전략 시사점**: To-Be 플랫폼 설계 시 위 12개 항목을 평가 체크리스트로 활용.
> 특히 **"명확한 피드백"** 과 **"자동화"** 가 사용자 경험을 결정.

---

## 플랫폼 = 단일 전체 (Holistic Entity)

> **"개발자는 플랫폼을 체크리스트 부분의 합이 아니라 단일 entity로 인지한다."**
>
> — DORA 2025

- 한 가지 기능만 개선해서는 플랫폼 평가가 좋아지지 않음
- 전체 개발자 여정(developer journey)을 제품으로 다뤄야 함
- "플랫폼 = 내부 제품, 개발자 = 고객" 관점이 핵심

### 플랫폼 운영 안티패턴 (피해야 할 3가지)

| 안티패턴 | 설명 | 결과 |
|---------|------|------|
| **Build it and they will come** | 사용자 리서치 없이 만들어 놓고 사용자 알아서 오라 | 유령 도시 (ghost town) — 안 씀 |
| **Ticket-ops trap** | 인프라 자판기처럼 운영, 매일 티켓만 처리 | 병목 + 토일 (toil), 셀프서비스 못 만듦 |
| **Ivory tower platform** | 중앙 팀이 일방적으로 표준 강요 | 그림자 IT, 비공식 우회, 플랫폼 무력화 |

### 안티패턴 회피 — Product Manager 적용

- 개발자 공감과 발견 (empathy & discovery) 으로 시작
- 자가서비스(self-service) 로드맵으로 티켓 큐 제거
- 강제하지 말고 "포장된 길(paved roads)"을 만들어 자연스럽게 따라오게 함

---

## 플랫폼 + AI 시너지 (결정적 발견)

> **"AI adoption has a negligible effect on organizational performance when platform quality is low,
> but when platform quality is high, the effect is strong and positive."**

| 플랫폼 품질 | AI가 조직 성과에 미치는 효과 |
|-----------|---------------------------|
| 낮음 | 거의 무시할 수 있음 (negligible) |
| 평균 | 작은 양의 효과 |
| 높음 | **강한 양의 효과 (Large increase)** |

> **AM 전략의 결정적 함의**:
> "AM 비용 정당화"를 단순 레거시 부채 해소로만 설명하지 말고,
> **"AI 투자 ROI를 잠금 해제하는 전제 인프라"** 로 포지셔닝하라.

---

## 플랫폼이 AM에서 가지는 3가지 역할 (DORA 권고)

### 1. Embrace the Holistic Experience
한 기능만 개선해서는 플랫폼이 안 좋아짐. 전체 개발자 여정을 제품으로 다뤄라.

### 2. Make Your Platform the Foundation for AI
플랫폼은 AI 가치를 잠금 해제하는 전략적 전제조건. AI 투자를 진정한 경쟁우위로 변환하는 엔진.

### 3. Use Your Platform to Calibrate Your Risk Appetite
플랫폼은 실패 비용을 낮추고 복구를 쉽게 만들어 조직의 위험 감수성을 재조정.
빠른 속도로 인한 약간의 불안정성은 관리 가능한 트레이드오프.

---

## STEP 3-2 (포트폴리오 Phase) 적용 가이드

| Phase | 플랫폼 투자 활동 |
|-------|----------------|
| **Phase 0** (분석) | 현 IDP 자가평가 (12개 특성 점수), 안티패턴 진단 |
| **Phase 1** (Quick Win) | "포장된 길" 1개 구축 (예: GitHub Actions + ArgoCD + 표준 모니터링) |
| **Phase 1'** (파일럿) | 1~2개 시스템에 플랫폼 적용, 사용자 피드백 수집 |
| **Phase 2** | 플랫폼 팀 정식 출범 (PM 역할 포함), 다중 플랫폼 거버넌스 설계 |
| **Phase 3** | AI 도구를 플랫폼 위에 통합 (코드 어시스턴트, 자동 리뷰) |
| **Phase 4** | 다중 플랫폼 페더레이션, 측정 기반 지속 개선 |

---

## STEP 3-3 (TCO 분석) 적용 가이드

> 플랫폼 투자를 TCO에서 분리 항목으로 명시:

| TCO 항목 | 산정 가이드 |
|---------|-----------|
| 플랫폼 팀 인건비 | 4~10명 (조직 규모별), 전담 PM 1명 포함 |
| IDP 도구 라이선스 | 평균 개발자당 월 $50~150 (Backstage·Port·Cortex 등) |
| AI 도구 라이선스 | 개발자당 월 $20~50 (Copilot, Cursor 등) — 플랫폼 없으면 효과 ↓ |
| 클라우드 인프라 | 별도 항목 |
| 기존 시스템 페이드아웃 | (As-Is 비용 절감) |

---

[Top](#dora-2025--platform-engineering-인사이트)
