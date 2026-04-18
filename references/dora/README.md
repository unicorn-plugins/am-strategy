# DORA 2025 — AM 전략 수립용 참조 자료

**원본 (2종)**:
1. [`2025_state_of_ai_assisted_software_development.pdf`](2025_state_of_ai_assisted_software_development.pdf)
   — State of AI-assisted Software Development (Google DORA, 2025-10, 142p, 4,997명 응답)
2. [`2025_dora_ai_capabilities_model.pdf`](2025_dora_ai_capabilities_model.pdf)
   — DORA AI Capabilities Model 별도 발간본 (Google DORA, 2025-12, 97p, 실행 가이드)

**조사 기간**: 2025년 6월 13일 ~ 7월 21일

---

## 핵심 메시지 (AM 전략 관점)

> **"AI는 증폭기다(AI is an amplifier)."**
> 고성과 조직의 강점을 증폭하고, 어려움을 겪는 조직의 역기능도 증폭한다.
> AI 투자의 가장 큰 수익은 도구 자체가 아니라, **내부 플랫폼·데이터 생태계·핵심 엔지니어링 역량**
> 에 대한 전략적 투자에서 나온다.

이 메시지는 AM 전환의 **WHY 정의** (왜 지금 모더나이즈 해야 하는가)와
**전략 수립** (어떤 시스템 역량을 우선 투자할 것인가)에 직접 적용된다.

---

## 파일 목록

| 파일 | 용도 | 활용 에이전트 |
|------|------|--------------|
| [`01-software-delivery-performance.md`](01-software-delivery-performance.md) | 5개 핵심 지표 분포·구간(Top % 누적) | `industry-benchmark`, `why-definer` |
| [`02-seven-team-profiles.md`](02-seven-team-profiles.md) | 7개 팀 아키타입 (특히 "Legacy bottleneck") | `inventory-analyst`, `fit-analyzer`, `change-manager` |
| [`03-ai-capabilities-model.md`](03-ai-capabilities-model.md) | AI 효과를 증폭하는 7개 역량 (개념·증거) | `why-definer`, `strategy-planner`, `risk-governance` |
| [`04-platform-engineering.md`](04-platform-engineering.md) | 내부 플랫폼이 AM·AI ROI에 미치는 영향 | `strategy-planner`, `tco-analyst` |
| [`05-value-stream-management.md`](05-value-stream-management.md) | VSM 원칙 — AI·AM 투자의 ROI 증폭 메커니즘 | `fit-analyzer`, `strategy-planner` |
| [`06-am-transformation-implications.md`](06-am-transformation-implications.md) | "AI mirror" 관점에서 본 AM 전환 전략 시사점 | `why-definer`, `strategy-planner`, `change-manager` |
| [`07-ai-capabilities-implementation.md`](07-ai-capabilities-implementation.md) | 7개 역량의 **실행 가이드** (How-to·측정·안티패턴·90분 워크숍) | `strategy-planner`, `risk-governance`, `change-manager` |

---

## DORA 2025의 7대 메인 인사이트

1. **AI 채택은 거의 보편화** — 응답자 90%가 업무에 AI 사용 (2024 대비 +14.1%p)
2. **7개 팀 프로필** — 단순 지표를 넘어 팀별 맞춤 개선 경로 제시
3. **VSM이 AI 투자의 ROI 증폭기** — 매핑 없이는 로컬 효율이 다운스트림 혼돈으로 흡수
4. **DORA AI Capabilities Model 신설** — 7개 역량이 AI 효과를 검증된 방식으로 증폭
5. **AI는 처리량(Throughput)을 개선했지만 안정성(Stability)은 여전히 악화** — 시스템 미진화의 신호
6. **플랫폼 엔지니어링 90% 보편화** — 고품질 플랫폼이 AI ROI의 전제조건
7. **사용자 중심 포커스** — 부재 시 AI 도입이 팀 성과를 **저해**

---

## AM 전환 의사결정 매트릭스 (DORA 2025 기반)

| WHY 동인 | DORA 2025 근거 | AM 전략 시사점 |
|----------|---------------|---------------|
| **Speedy** (속도) | Throughput Top 22.7%: 일 1회 이상 배포, Lead time Top 24.4%: 1일 이내 | 6R 전략 중 Replatform/Refactor 우선 — 모놀리스의 일 1회 배포 달성 가능성 검증 |
| **Service Always** (안정성) | Recovery Top 56.5%: 1일 이내 복구, CFR Top 36.2%: 8% 이하 | Rebuild 후보는 복구 시간 1일 → 1시간으로 개선 가능 시스템 우선 |
| **Save Cost** (비용) | "AI 투자 없이 고품질 플랫폼 미보유 시 ROI 거의 없음" | 플랫폼 엔지니어링이 AM TCO에서 분리 불가 — Phase 0~1에 플랫폼 투자 필수 |
| **Security** (보안) | "AI는 보안 안정성도 증폭 — 약한 시스템에서는 위험 증가" | Rehost로 끝내면 보안·컴플라이언스 부채는 그대로, Replatform 이상 권장 |
| **혁신** (Innovation) | "User-centric focus 부재 시 AI는 팀 성과를 **저해**" | AM 전환 KPI에 "사용자 가치 기반 측정"을 반드시 포함 |

---

## 인용 시 권장 표기

```
출처: Google DORA. (2025). State of AI-assisted Software Development.
https://dora.dev/research/2025/dora-report/
```

[Top](#dora-2025--am-전략-수립용-참조-자료)
