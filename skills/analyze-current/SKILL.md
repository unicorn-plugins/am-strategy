---
name: analyze-current
description: AM 현황 분석 오케스트레이션 — 6 카테고리 인벤토리, 4+8차원 건강도, 기술부채 비용, A/B/C 등급, 6R/TIME 매칭, Bounded Context, 변화관리 조기 착수
type: orchestrator
user-invocable: true
---

# Analyze Current

[ANALYZE-CURRENT 활성화]

## 목표

AM 전환의 **현황 진단**을 수행하는 STEP 2 워크플로우를 오케스트레이션함.
시스템 인벤토리 수집 → 건강도 스코어카드 → 기술부채 비용 → A/B/C 등급 →
6R/TIME 매칭(8단계 룰북) → Bounded Context → 변화관리 조기 착수를 순차 수행하여
`output/{project}/step2/` 산출물 7종을 생성함.

## 활성화 조건

사용자가 `/am-strategy:analyze-current` 호출 시 또는 "인벤토리", "건강도", "6R", "TIME", "Event Storming" 키워드 감지 시.

## 에이전트 호출 규칙

### 에이전트 FQN

| 에이전트 | FQN | 주 담당 |
|----------|-----|---------|
| inventory-analyst | `am-strategy:inventory-analyst:inventory-analyst` | Phase 1~4 (인벤토리·건강도·부채·ABC) |
| fit-analyzer | `am-strategy:fit-analyzer:fit-analyzer` | Phase 5~6 (6R/TIME·Bounded Context) |
| change-manager | `am-strategy:change-manager:change-manager` | Phase 7 (변화관리 조기 착수) |

### 프롬프트 조립
- 각 에이전트의 `AGENT.md` + `agentcard.yaml` + `tools.yaml` 3파일을 합쳐 프롬프트 조립
- `gateway/runtime-mapping.yaml`의 `tier_mapping` 참조:
  - inventory-analyst: MEDIUM → `claude-sonnet-4-5` (sub_role: code-scan-reader는 `claude-haiku-4-5`)
  - fit-analyzer: HIGH → `claude-opus-4-7`
  - change-manager: MEDIUM → `claude-sonnet-4-5`
- `Agent(subagent_type=FQN, model=매핑된 모델, prompt=조립된 프롬프트)` 호출

## 워크플로우

### Phase 1: 인벤토리 수집 (병렬) → Agent: inventory-analyst (`/oh-my-claudecode:ralph` 활용)

- **TASK**: 6 카테고리 인벤토리 + DORA 8 질문 + 팀별 인터뷰 질문지 + 의존성 그래프를 병렬 수집
- **EXPECTED OUTCOME**: `output/{project}/step2/1-inventory.md` — 시스템별 6 카테고리 + DORA 8 응답 + 의존성 Mermaid
- **MUST DO**: 3개 세부역할(interview-template / code-scan-reader / dependency-mapper) 모두 활용, 결측은 명시
- **MUST NOT DO**: 결측값 임의 추정 금지
- **CONTEXT**: `references/am-strategy/system-inventory.md`, `references/dora/06`

### Phase 2: A/B/C 등급 → Agent: inventory-analyst (`ulw` 활용)

- **TASK**: 비즈니스 가치·사용자 수·매출 기여도 3축 + DORA 7 클러스터 교차 분류
- **EXPECTED OUTCOME**: `output/{project}/step2/2-abc.md`
- **MUST DO**: 각 등급의 판정 근거(가중치·점수) 제시
- **MUST NOT DO**: 근거 없이 등급 부여 금지
- **CONTEXT**: Phase 1 산출물, `references/dora/02`

### Phase 3: 건강도 스코어카드 → Agent: inventory-analyst (`ulw` 활용)

- **TASK**: 4차원(비즈니스 가치·기술 품질·데이터 결합도·운영 안정성) + DORA 8차원 = 12 차원 점수
- **EXPECTED OUTCOME**: `output/{project}/step2/3-healthscore.md` — 시스템별 12 차원 행렬
- **MUST DO**: 자동 분석 결과(SonarQube/CAST) 있으면 반드시 반영
- **MUST NOT DO**: 주관적 평가만으로 스코어 결정 금지
- **CONTEXT**: Phase 1 산출물, `references/dora/02`

### Phase 4: 기술부채 비용 → Agent: inventory-analyst (`ulw` 활용)

- **TASK**: 6 항목(유지·장애·보안·인재·기회·**AI ROI 잠금**) 비용 **범위** 산정
- **EXPECTED OUTCOME**: `output/{project}/step2/4-techdebt-cost.md`
- **MUST DO**: AI ROI 잠금 비용 반드시 포함, DORA 2025 인용
- **MUST NOT DO**: 단일 숫자 제시 금지
- **CONTEXT**: Phase 1~3 산출물, `references/dora/06`

### Phase 5: 6R/TIME 매칭 → Agent: fit-analyzer (`/oh-my-claudecode:ralplan` 활용)

- **TASK**: 14 속성 입력 → 8단계 결정 알고리즘 → Primary/Alternative 6R + TIME + 신뢰도 + rule_trace
- **EXPECTED OUTCOME**: `output/{project}/step2/5-fit-6r-time.md` — 시스템별 YAML 출력 양식
- **MUST DO**: `references/6r/04-matching-rules.md` 8 STEP 규칙을 순차 적용, rule_trace 기록
- **MUST NOT DO**: 8 STEP 중 하나라도 건너뛰기 금지
- **CONTEXT**: Phase 1~4 산출물, `references/6r/` 전체 (7 파일)

### Phase 6: 서비스 경계 → Agent: fit-analyzer (`/oh-my-claudecode:plan` 활용)

- **TASK**: Rearchitect/Rebuild 대상에 Event Storming + Context Map + 유비쿼터스 언어 + VSM 매핑
- **EXPECTED OUTCOME**: `output/{project}/step2/6-bounded-context.md`
- **MUST DO**: 도메인 이벤트 목록 + Context Map(Mermaid) + Context 간 관계 + VSM As-Is/To-Be
- **MUST NOT DO**: Retain/Rehost/Replatform 대상에 불필요한 재설계 제안 금지
- **CONTEXT**: Phase 5 결과, `references/dora/05`

### Phase 7: 변화관리 조기 착수 → Agent: change-manager (`ulw` 활용)

- **TASK**: 이해관계자 맵(2×2) + 초기 커뮤니케이션 메시지 + 참여형 워크숍 어젠다
- **EXPECTED OUTCOME**: `output/{project}/step2/7-change-kickoff.md`
- **MUST DO**: DORA 7 클러스터 중 최소 3개 이상 맞춤 메시지
- **MUST NOT DO**: Phase 3-6(상세 변화관리)의 전체 기획을 여기서 선취 금지
- **CONTEXT**: Phase 1~6 산출물, `references/dora/02`, `references/6r/06`

### Phase 8: 완료 보고 (`ulw` 활용)

7종 산출물 존재 확인 후 사용자에게 경로와 다음 액션(`/am-strategy:strategize`) 안내.

## 완료 조건

- [ ] `1-inventory.md` ~ `7-change-kickoff.md` 7개 파일 모두 존재
- [ ] 모든 시스템에 Primary + Alternative 6R 판정 + rule_trace 기록
- [ ] 기술부채 6 항목 (AI ROI 잠금 포함) 산정
- [ ] 이해관계자 맵 작성

## 검증 프로토콜

- 완료 선언 전 {tool:file_read}로 7 산출물 각각 읽고 필수 항목 존재 확인
- rule_trace 누락 시스템이 있으면 REJECTED — Phase 5 재실행
- AI ROI 잠금 비용 누락 시 REJECTED — Phase 4 재실행

## 상태 정리

완료 시 별도 상태 파일 없음.

## 취소

사용자 "cancelomc" 또는 "stopomc" 요청 시 즉시 중단.

## 재개

마지막 완료된 Phase부터 재개 가능 (산출물 파일 존재 여부로 판단).
