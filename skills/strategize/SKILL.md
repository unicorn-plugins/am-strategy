---
name: strategize
description: AM 전략 수립 오케스트레이션 — 6R 상세, 포트폴리오 Phase, TCO/BEP, 리스크, 거버넌스·가드레일·AI 정책, 변화관리 기획, 전략 통합 보고서
type: orchestrator
user-invocable: true
---

# Strategize

[STRATEGIZE 활성화]

## 목표

AM **전략 수립** STEP 3 워크플로우를 오케스트레이션함.
6R 상세화(예산·기간·리스크) → 포트폴리오 Phase → TCO/BEP → 4영역 리스크 →
5 거버넌스 회의체 + 가드레일 + AI 정책 3-bucket → 변화관리 기획 → 전략 통합 보고서를
순차/병렬 수행하여 `output/{project}/step3/` 산출물 7종을 생성함.

## 활성화 조건

사용자가 `/am-strategy:strategize` 호출 시 또는 "6R 전략", "포트폴리오", "Phase", "TCO", "거버넌스" 키워드 감지 시.

## 에이전트 호출 규칙

### 에이전트 FQN

| 에이전트 | FQN | 주 담당 |
|----------|-----|---------|
| strategy-planner | `am-strategy:strategy-planner:strategy-planner` | Phase 1~2, 7 |
| tco-analyst | `am-strategy:tco-analyst:tco-analyst` | Phase 3 |
| risk-governance | `am-strategy:risk-governance:risk-governance` | Phase 4~5 |
| change-manager | `am-strategy:change-manager:change-manager` | Phase 6 |

### 프롬프트 조립
- 각 에이전트의 `AGENT.md` + `agentcard.yaml` + `tools.yaml` 3파일 합쳐 프롬프트 조립
- `gateway/runtime-mapping.yaml`의 `tier_mapping` 참조:
  - strategy-planner / risk-governance: HIGH → `claude-opus-4-7`
  - tco-analyst / change-manager: MEDIUM → `claude-sonnet-4-5`
- `Agent(subagent_type=FQN, model=매핑된 모델, prompt=조립된 프롬프트)` 호출

### 서브 에이전트 호출
워크플로우 단계에 `Agent: {agent-name}`이 명시된 경우,
메인 에이전트는 해당 단계를 직접 수행하지 않고,
반드시 위 프롬프트 조립 규칙에 따라 해당 에이전트를 호출하여 결과를 받아야 함.

서브에이전트 호출 없이 메인 에이전트가 해당 산출물을 직접 작성하면
스킬 미준수로 간주함.

## 워크플로우

### Phase 1: 6R 상세화 → Agent: strategy-planner (`/oh-my-claudecode:ralplan` 활용)

- **TASK**: 시스템별 규모 분류(S/M/L) × 6R × 표준 프로파일 + 14 체크리스트 + AM+AI 시너지 분석
- **EXPECTED OUTCOME**: `output/{project}/step3/1-6r-detail.md`
- **MUST DO**: budget-calculator 세부역할 워크플로우 준수, 예비비 15~20%, 14 체크리스트 적용 결과 기록
- **MUST NOT DO**: 예산·기간 단일 숫자 금지 — 모두 **범위**
- **CONTEXT**: Step 2 산출물 7종, `references/6r/05-cost-effort-risk-profile.md`, `references/dora/06`

### Phase 2: 포트폴리오 Phase 구성 → Agent: strategy-planner (`/oh-my-claudecode:ralplan` 활용)

- **TASK**: Phase 0~4 로드맵 + 파일럿 선정(5기준 + DORA 3보강) + GO/NO-GO 게이트
- **EXPECTED OUTCOME**: `output/{project}/step3/2-portfolio-phase.md` — Mermaid 간트 + 파일럿 근거 + 게이트 조건
- **MUST DO**: phase-sequencer 세부역할 워크플로우, DORA 5 메트릭 게이트 조건 포함
- **MUST NOT DO**: 의존성 위반 순서 배치 금지
- **CONTEXT**: Phase 1 결과, Step 2 산출물, `references/dora/06, 07`

### Phase 3: TCO/BEP (병렬) → Agent: tco-analyst (`ulw` 활용)

- **TASK**: As-Is TCO(기술부채 포함) + To-Be TCO(DORA 5 분리 항목 포함) + BEP 3·5년 × 3 시나리오
- **EXPECTED OUTCOME**: `output/{project}/step3/3-tco-bep.md`
- **MUST DO**: Conservative/Base/Optimistic 3 시나리오 + 누적 곡선 데이터 + 한국 공공 벤치마크 비교
- **MUST NOT DO**: 업종 데이터 공백 은폐 금지 — 명시 + 보충 옵션 제시
- **CONTEXT**: Step 2 `4-techdebt-cost.md`, `references/tco-benchmark/`, `references/dora/04, 06`

### Phase 4: 리스크 매트릭스 (병렬) → Agent: risk-governance (`ulw` 활용)

- **TASK**: 4영역 + DORA 2025 3 신규 리스크 × 발생확률·영향도 9셀 매트릭스 + Top 5 완화 전략
- **EXPECTED OUTCOME**: `output/{project}/step3/4-risk.md`
- **MUST DO**: risk-matrix-tool 세부역할 워크플로우, Top 5 각각 (완화전략·책임자·트리거 지표·대응 시나리오)
- **MUST NOT DO**: 단순 "하향·상향" 레벨만 기록 금지
- **CONTEXT**: Step 2 산출물, `references/dora/06`

### Phase 5: 거버넌스·가드레일·AI 정책 → Agent: risk-governance (`ulw` 활용)

- **TASK**: 5 회의체(스티어링·워킹·ARB·리스크·비용) + Phase별 6 가드레일(SAST/SCA/회귀/Contract/DAST/Chaos) + AI 정책 3-bucket
- **EXPECTED OUTCOME**: `output/{project}/step3/5-governance-guardrail.md`
- **MUST DO**: guardrail-designer 세부역할 워크플로우, Phase 전환 게이트에 DORA 5 메트릭 정량 조건
- **MUST NOT DO**: AI 정책 3-bucket 중 하나라도 유스케이스·근거 누락 금지
- **CONTEXT**: Phase 2, 4 결과, `references/dora/01, 07`

### Phase 6: 변화관리 기획 → Agent: change-manager (`ulw` 활용)

- **TASK**: Phase × (커뮤/교육/조직/업무/문화/측정) 6축 매트릭스 + CoP + 지속 개선 3원칙 + AI mirror 메시지
- **EXPECTED OUTCOME**: `output/{project}/step3/6-change-mgmt.md`
- **MUST DO**: Celebrate Progress / Embrace Failure / Communities of Practice 모두 반영
- **MUST NOT DO**: 사용자 중심 포커스 지표 누락 금지
- **CONTEXT**: Step 2 `7-change-kickoff.md`, `references/dora/05, 06, 07`, `references/6r/06`

### Phase 7: 전략 통합 → Agent: strategy-planner (`/oh-my-claudecode:ralph` 활용)

- **TASK**: Step 1~3 모든 산출물을 경영진 5단 구조(왜→얼마→언제→어떻게→위험)로 통합
- **EXPECTED OUTCOME**: `output/{project}/step3/strategy-report.md` — 경영진 요약 + 상세 본문 + 부록
- **MUST DO**: DORA 인용 모음 (경영진용 핵심 메시지 5장 + 직접 인용 권장 문구) 포함
- **MUST NOT DO**: Step 1~3의 정합성 파괴 금지 — 원본과 수치 일관성 유지
- **CONTEXT**: `output/{project}/step1/`, `step2/`, `step3/` 전체

### Phase 8: 완료 보고 (`ulw` 활용)

7종 산출물 존재 확인 후 `/am-strategy:report` 안내.

## 완료 조건

- [ ] `1-6r-detail.md` ~ `strategy-report.md` 7개 파일 모두 존재
- [ ] 모든 예산·기간·성과 지표가 범위로 제시
- [ ] AI 정책 3-bucket에 유스케이스·근거 완비
- [ ] Phase 전환 게이트에 DORA 5 메트릭 정량 조건 포함
- [ ] 통합 보고서에 5단 구조 유지

## 검증 프로토콜

- 완료 선언 전 {tool:file_read}로 7 산출물 각각 읽고 필수 항목 존재 확인
- Phase 3과 Phase 1의 예산 합계 일관성 확인 (TCO ↔ 6R 상세)
- 단일 숫자·출처 누락 발견 시 REJECTED

## 상태 정리

완료 시 별도 상태 파일 없음.

## 취소

사용자 "cancelomc" 또는 "stopomc" 요청 시 즉시 중단.

## 재개

마지막 완료된 Phase부터 재개 가능.
