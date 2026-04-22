---
name: why-define
description: AM 전환 WHY 정의 오케스트레이션 — 비즈니스 동인 매핑, DORA 기반 L1 정량화, 경영진 스폰서십 3단계 전략, WHY 통합 보고서 생성
type: orchestrator
user-invocable: true
---

# Why Define

[WHY-DEFINE 활성화]

## 목표

AM 전환의 **WHY(왜)**를 정의하는 STEP 1 워크플로우를 오케스트레이션함.
비즈니스 동인(4S+혁신) 매핑 → DORA 2025 기반 L1 기대 성과 정량화 →
경영진 스폰서십 3단계 전략 → WHY 통합 보고서 작성을 순차 수행하여
`output/{project}/step1/` 산출물 4종을 생성함.

## 활성화 조건

사용자가 `/am-strategy:why-define` 호출 시 또는 "WHY 정의", "비즈니스 동인", "경영진 스폰서십" 키워드 감지 시.

## 에이전트 호출 규칙

### 에이전트 FQN

| 에이전트 | FQN |
|----------|-----|
| why-definer | `am-strategy:why-definer:why-definer` |

### 프롬프트 조립
- `AGENT.md` + `agentcard.yaml` + `tools.yaml` 3파일을 합쳐 단일 프롬프트로 조립
- `gateway/runtime-mapping.yaml`의 `tier_mapping`을 참조하여 `tier: HIGH` → `claude-opus-4-7`로 구체화
- `Agent(subagent_type="am-strategy:why-definer:why-definer", model="opus", prompt=조립된 프롬프트)` 호출

### 서브 에이전트 호출
워크플로우 단계에 `Agent: {agent-name}`이 명시된 경우,
메인 에이전트는 해당 단계를 직접 수행하지 않고,
반드시 위 프롬프트 조립 규칙에 따라 해당 에이전트를 호출하여 결과를 받아야 함.

서브에이전트 호출 없이 메인 에이전트가 해당 산출물을 직접 작성하면
스킬 미준수로 간주함.

## 워크플로우

### Phase 1: 입력 확인 (`ulw` 활용)

{tool:file_read}로 `references/am-strategy/company-profile.md` 존재 확인.
프로젝트 디렉토리명을 `{project}` 변수로 설정 (미지정 시 사용자에게 확인).
출력 디렉토리 `output/{project}/step1/` 생성.

### Phase 2: 비즈니스 동인 매핑 → Agent: why-definer (`/oh-my-claudecode:ralph` 활용)

- **TASK**: 4S+혁신 5개 동인에 기업 이슈·목표·지표·DORA 근거를 매핑
- **EXPECTED OUTCOME**: `output/{project}/step1/1-drivers.md` — 5 동인 × (이슈/목표/지표/근거/출처) 표
- **MUST DO**: driver-mapper 세부역할 워크플로우 준수, DORA 2025 06 근거 인용
- **MUST NOT DO**: 단일 숫자 목표 사용 금지, 출처 누락 금지
- **CONTEXT**: `references/am-strategy/company-profile.md`, `references/dora/06-am-transformation-implications.md`

### Phase 3: L1 기대 성과 정량화 → Agent: why-definer (`/oh-my-claudecode:ralph` 활용)

- **TASK**: DORA 5지표 분포와 한국 공공 벤치마크로 1년차·3년차 목표 **범위** 산정
- **EXPECTED OUTCOME**: `output/{project}/step1/2-quant-L1.md` — 5 지표별 Top % 범위 + 근거 출처
- **MUST DO**: industry-benchmark 세부역할 워크플로우 준수, 모든 수치에 출처 명기
- **MUST NOT DO**: 한국 업종 데이터 공백을 은폐하지 말고 명시
- **CONTEXT**: `references/dora/01-software-delivery-performance.md`, `references/tco-benchmark/01-public-sector.md`, `04-data-gap-and-supplement.md`

### Phase 4: 스폰서십 전략 → Agent: why-definer (`ulw` 활용)

- **TASK**: L1(방향성)→L2(비용 근거)→L3(파일럿 실증) 3단계 시나리오 설계 + "AM 없이 AI ROI 0" 카드
- **EXPECTED OUTCOME**: `output/{project}/step1/3-sponsorship.md` — 3 시나리오 × (메시지/설득 논리/KPI)
- **MUST DO**: CFO·COO·CEO 각각 겨냥한 설득 포인트 명시
- **MUST NOT DO**: 감정적 수사 사용 금지 — 데이터 근거 기반

### Phase 5: WHY 통합 보고서 → Agent: why-definer (`ulw` 활용)

- **TASK**: Phase 2~4 산출물을 경영진 발표용 2~3장 요약 + 부록 형태로 통합
- **EXPECTED OUTCOME**: `output/{project}/step1/why-statement.md`
- **MUST DO**: 경영진 소통 순서(왜→얼마→언제→어떻게→위험) 고정
- **MUST NOT DO**: 후속 단계(STEP 2, 3)의 결과를 선취 서술 금지

### Phase 6: 완료 보고 (`ulw` 활용)

4종 산출물 존재 확인 후 사용자에게 파일 경로와 다음 액션(`/am-strategy:analyze-current`) 안내.

## 완료 조건

- [ ] `1-drivers.md` 존재 및 5 동인 완비
- [ ] `2-quant-L1.md` 존재 및 5 지표 범위 + 출처 완비
- [ ] `3-sponsorship.md` 존재 및 3 시나리오 완비
- [ ] `why-statement.md` 존재 및 경영진 소통 5단 구조 준수

## 검증 프로토콜

- 완료 선언 전 {tool:file_read}로 4 산출물 각각 읽고 필수 섹션 존재 확인
- 단일 숫자 목표 존재 시 REJECTED — 재작성 요청
- 출처 누락 인용이 있으면 REJECTED

## 상태 정리

완료 시 별도 상태 파일 없음.

## 취소

사용자 "cancelomc" 또는 "stopomc" 요청 시 즉시 중단.

## 재개

마지막 완료된 Phase부터 재개 가능 (산출물 파일 존재 여부로 판단).
