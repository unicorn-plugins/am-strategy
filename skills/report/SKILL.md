---
name: report
description: 최종 Review + MS Word/PowerPoint 변환 오케스트레이션 — reviewer 독립 검증 후 경영진 요약·실무진 상세·PPT 발표본 생성
type: orchestrator
user-invocable: true
---

# Report

[REPORT 활성화]

## 목표

최종 단계 워크플로우를 오케스트레이션함.
reviewer 에이전트로 **독립 컨텍스트에서 검증**을 수행하고,
doc-exporter 에이전트가 `anthropic-skills:docx/pptx`에 위임하여
경영진 요약본(.docx, ≤30장) + 실무진 상세본(.docx, ≥100장) + 경영진 발표본(.pptx)을 생성함.
필요 시 generate_image로 인포그래픽 이미지도 생성함.

## 활성화 조건

사용자가 `/am-strategy:report` 호출 시 또는 "최종 보고서", ".docx", ".pptx", "경영진 발표" 키워드 감지 시.

## 에이전트 호출 규칙

### 에이전트 FQN

| 에이전트 | FQN | 주 담당 |
|----------|-----|---------|
| reviewer | `am-strategy:reviewer:reviewer` | Phase 1 (독립 검증) |
| doc-exporter | `am-strategy:doc-exporter:doc-exporter` | Phase 3~4 (변환) |

### 프롬프트 조립
- 각 에이전트의 `AGENT.md` + `agentcard.yaml` + `tools.yaml` 3파일 합쳐 프롬프트 조립
- `gateway/runtime-mapping.yaml`의 `tier_mapping` 참조:
  - reviewer: HIGH → `claude-opus-4-7`
  - doc-exporter: LOW → `claude-haiku-4-5`
- `Agent(subagent_type=FQN, model=매핑된 모델, prompt=조립된 프롬프트)` 호출

### reviewer 독립 실행 주의사항

- reviewer는 **별도 컨텍스트로 분리 실행** — 다른 에이전트의 작업 맥락을 공유하지 않음
- 원저자 에이전트(why-definer 등)가 reviewer와 동일 세션에서 실행된 경우에도,
  reviewer 호출 시 새로운 subagent 컨텍스트로 스폰하여 독립성 확보

## 워크플로우

### Phase 1: 독립 검증 → Agent: reviewer (`/oh-my-claudecode:verify` 활용)

- **TASK**: WHY-현황-전략 7 검증 항목을 독립 컨텍스트에서 검증
- **EXPECTED OUTCOME**: 검증 보고서 (APPROVED / APPROVED WITH CONDITIONS / REJECTED + 근거)
- **MUST DO**: 7 항목(정합성·수치 일관성·커버리지·파일럿 타당성·게이트 충분성·범위 준수·출처 준수) 모두 기록, 보완 권고는 파일·섹션 단위 지목
- **MUST NOT DO**: 원저자와 협의 없이 산출물 직접 수정 금지, 기준 완화 금지
- **CONTEXT**: `output/{project}/step1/`, `step2/`, `step3/` 전체

### Phase 2: 사용자 옵션 확인

검증 결과가 APPROVED 또는 APPROVED WITH CONDITIONS인 경우, AskUserQuestion으로:
- 경영진 요약본 장수 (기본 30장 이하)
- 실무진 상세본 장수 (기본 100장 이상)
- 인포그래픽 이미지 생성 여부 + 목록

REJECTED인 경우 보완 권고를 사용자에게 제시하고 해당 스킬(`/why-define`, `/analyze-current`, `/strategize`) 재실행 안내 후 종료.

### Phase 3: 문서 변환 → Agent: doc-exporter (`ulw` 활용)

- **TASK**: `strategy-report.md`를 경영진 요약(.docx) + 실무진 상세(.docx) + 경영진 발표(.pptx)로 변환
- **EXPECTED OUTCOME**:
  - `output/{project}/final/strategy-executive.docx` (요약, Phase 2 선택 시)
  - `output/{project}/final/strategy-report.docx` (상세)
  - `output/{project}/final/strategy-executive.pptx` (발표)
- **MUST DO**: ppt-guide 표준(컬러·타이포·레이아웃) 엄격 준수, 경영진 소통 순서(왜→얼마→언제→어떻게→위험) 유지, anthropic-skills:docx/pptx 위임
- **MUST NOT DO**: 원본 수치·출처 누락 금지, 장수 조건 위반 금지
- **CONTEXT**: `output/{project}/step3/strategy-report.md`, `agents/doc-exporter/references/ppt-guide.md`

### Phase 4: 인포그래픽 생성 (선택) → Agent: doc-exporter (`ulw` 활용)

- **TASK**: Phase 2에서 요청된 인포그래픽 N종 생성
- **EXPECTED OUTCOME**: `output/{project}/final/images/*.png`
- **MUST DO**: generate_image 도구의 프롬프트를 ppt-guide 팔레트에 맞게 설계
- **MUST NOT DO**: API 키 미설정 시 실패를 은폐하지 말고 명확히 보고
- **CONTEXT**: strategy-report.md의 주요 다이어그램 섹션

### Phase 5: 완료 보고 (`ulw` 활용)

생성된 파일 목록·크기·변환 시간 요약 보고. anthropic-skills 미설치로 실패 시 설치 안내.

## 완료 조건

- [ ] reviewer 검증 보고서 생성 및 판정 완료
- [ ] `.docx` 1~2종 생성 (장수 조건 충족)
- [ ] `.pptx` 1종 생성 (ppt-guide 준수)
- [ ] (선택) 인포그래픽 N종 생성

## 검증 프로토콜

- Phase 3 완료 후 {tool:file_read}로 .docx/.pptx 파일 크기 > 0 확인
- Phase 4 완료 후 이미지 파일 존재 확인
- anthropic-skills 미설치 시 graceful failure + 사용자 안내

## 상태 정리

완료 시 별도 상태 파일 없음.

## 취소

사용자 "cancelomc" 또는 "stopomc" 요청 시 즉시 중단.

## 재개

Phase 단위로 재개 가능 (Phase 3/4는 독립적이므로 개별 재실행 가능).
