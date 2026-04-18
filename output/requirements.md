# am-strategy 요구사항 정의서

## 1. 기본 정보
- 플러그인명: `am-strategy`
- 목표: 엔터프라이즈 시스템의 AM(Application Modernization) 전환 전략 수립 자동화  
  (**WHY 정의 → 현황 분석 → 전략 수립** 3단계 체계적 지원)
- 대상 도메인: 엔터프라이즈 IT · Application Modernization · 레거시 현대화
- 대상 사용자: CIO/CTO 보좌 조직, 디지털혁신실, EA팀, PMO, 인프라·운영팀 리더
- Owner: `hiondal`
- 라이선스: MIT
- GitHub 저장소명: `am-strategy` (`https://github.com/hiondal/am-strategy`)
- 런타임: Claude Code (DMAP 표준 준수, Cowork 이식성 확보)

---

## 2. 플러그인 적합성 판단

| 기준 | 판정 | 근거 |
|------|:---:|------|
| 반복 가능성 | 적합 | 복수 기업/조직에 반복 적용 가능한 AM 전략 수립 워크플로우 |
| 역할 분리 | 적합 | WHY·현황·전략·리뷰·출력 등 8개 전문 에이전트로 역할 분리 |
| 도구 의존성 | 적합 | `generate_image`, `convert-to-markdown`, `anthropic-skills:docx/pptx` 외부 도구 연동 |
| 도메인 지식 | 적합 | DORA 2025, 6R/TIME 룰북, 한국 TCO 벤치마크 등 도메인 특화 참조 자료 |

**판정: DMAP 플러그인 구현 적합**

---

## 3. 핵심 기능

### 3.1 WHY 정의 (STEP 1)
- 비즈니스 동인(4S+혁신: Speedy/Service Always/Save Cost/Security/Innovation) 정리
- 기대 성과 L1 벤치마크 정량화(DORA 2025 5개 지표 분포 기반 Top % 목표)
- 경영진 스폰서십 3단계 전략(L1 방향성→L2 비용 근거→L3 실증) 설계
- 산출물: `output/{project}/step1/1-drivers.md`, `2-quant-L1.md`, `3-sponsorship.md`, `why-statement.md`

### 3.2 현황 분석 (STEP 2)
- 시스템 인벤토리 6개 카테고리 수집(기본·기술스택·아키텍처·운영·비용·의존성)
- 4차원 건강도 스코어카드(비즈니스 가치·기술 품질·데이터 결합도·운영 안정성) + DORA 8차원 자가진단
- 기술 부채 비용 산정 + AI ROI 잠금 비용 정량화
- A/B/C 등급 분류 + DORA 7 클러스터 매핑
- 6R/TIME 매핑(8단계 결정 알고리즘 적용, Primary/Alternative + 신뢰도 + rule_trace 출력)
- Event Storming·Context Map·VSM 기반 서비스 경계 식별(Rearchitect/Rebuild 대상)
- 변화관리 조기 착수(이해관계자 맵·참여형 워크숍 어젠다)
- 산출물: `output/{project}/step2/1-inventory.md` ~ `7-change-kickoff.md`

### 3.3 전략 수립 (STEP 3)
- 6R 전략 상세화(시스템별 실행·기간·예산 범위·리스크·예비비 15~20%)
- 포트폴리오 Phase 구성(Phase 0~4, Quick Win + 파일럿 동시 진행, GO/NO-GO 게이트)
- TCO 분석(As-Is + 기술부채, To-Be + 클라우드/전환/학습/병렬운영) + BEP 3·5년
- 리스크 평가(4영역 × 발생확률·영향도 매트릭스)
- 거버넌스(5개 회의체) + Phase별 가드레일(SAST·SCA·Contract·DAST·Chaos) + AI 정책 3-bucket
- 변화관리 기획(Phase별 커뮤니케이션·교육·조직·문화·성과 측정)
- 전략 통합 보고서 작성
- 산출물: `output/{project}/step3/1-6r-detail.md` ~ `strategy-report.md`

### 3.4 최종 보고서 출력
- 최종 Review(WHY-현황-전략 정합성, 수치 일관성, 리스크 커버리지, Phase 게이트 검증)
- MS Word(.docx) 경영진 요약본 + 실무진 상세본 2종
- MS PowerPoint(.pptx) 경영진 발표용 (ppt-guide 표준 컬러·타이포그래피·레이아웃 준수)
- 필요 시 인포그래픽 이미지 생성(`generate_image`)
- 산출물: `output/{project}/final/strategy-report.docx`, `strategy-executive.pptx`

---

## 4. 사용자 플로우 (개별 스킬 기반)

> **진입 구조 결정**: core 스킬 없이 개별 스킬만 제공(사용자 선택).  
> 각 STEP을 독립 실행 가능. 단, 선후행 의존성(STEP1→STEP2→STEP3→final)은 각 스킬 도입부에서 선행 산출물 존재 여부 체크.

| 순서 | 슬래시 명령 | 스킬명 | 역할 |
|:---:|-----------|-------|------|
| - | `/am-strategy:setup` | setup | 플러그인 초기 설정 및 도구 설치 |
| - | `/am-strategy:help` | help | 명령 목록 및 자동 라우팅 안내 |
| 1 | `/am-strategy:why-define` | why-define | STEP 1 WHY 정의 (4 sub-step) |
| 2 | `/am-strategy:analyze-current` | analyze-current | STEP 2 현황 분석 (7 sub-step) |
| 3 | `/am-strategy:strategize` | strategize | STEP 3 전략 수립 (7 sub-step) |
| 4 | `/am-strategy:report` | report | 최종 Review + Word/PPT 변환 |

---

## 5. 에이전트 구성 (8개)

| 에이전트 | 티어 | 주 담당 STEP | 세부역할(sub-roles) |
|---------|:---:|-----|--------------------|
| why-definer | HIGH | STEP 1 전체 | industry-benchmark / driver-mapper |
| inventory-analyst | MEDIUM | STEP 2-1~2-4 | interview-template / code-scan-reader / dependency-mapper |
| fit-analyzer | HIGH | STEP 2-5~2-6 | event-storming-guide / 6r-matcher |
| strategy-planner | HIGH | STEP 3-1~3-2 | budget-calculator / phase-sequencer |
| tco-analyst | MEDIUM | STEP 3-3 | cost-modeler |
| risk-governance | HIGH | STEP 3-4~3-5 | risk-matrix-tool / guardrail-designer |
| change-manager | MEDIUM | STEP 2-7 + STEP 3-6 | stakeholder-mapper |
| reviewer | HIGH | 최종 Review | — (독립 컨텍스트 검증) |
| doc-exporter | LOW | 최종 산출 | — (anthropic-skills:docx/pptx 위임) |

> **주의**: 스킬(orchestrator)이 에이전트를 호출하며, 에이전트는 다른 에이전트를 호출하지 않음(DMAP 표준 준수).  
> reviewer는 별도 컨텍스트로 분리 실행하여 독립성 확보(`omc:execution_protocols` 준수).

---

## 6. 기술 요건

### 6.1 기술 스택
- 언어: Markdown (에이전트 프롬프트·SKILL.md), YAML (agentcard/tools/gateway), Python 3.x (커스텀 도구)
- 외부 스킬 연동: `anthropic-skills:docx`, `anthropic-skills:pptx` (doc-exporter 문서 변환)
- Python 라이브러리 (공유 도구 의존):
  - `generate_image.py`: OpenAI/Anthropic API, `requests`, `Pillow` (이미지 생성/처리)
  - `convert-to-markdown.py`: `markitdown` 또는 동등 변환 라이브러리

### 6.2 환경 변수 (`.env`)
- `OPENAI_API_KEY` 또는 `ANTHROPIC_API_KEY` (generate_image 사용 시)
- 기타 generate_image.py 소스 분석 후 필요 항목 추가

### 6.3 입출력 형식
- 입력: 사용자 대화형 인터뷰, `references/am-strategy/company-profile.md`, 인벤토리 자료(추후 .xlsx/.docx 지원 가능)
- 중간 산출물: Markdown (`output/{project}/stepN/*.md`)
- 최종 산출물: Markdown + .docx + .pptx + (선택)인포그래픽 이미지

---

## 7. 공유 자원 활용 계획

### 7.1 외부 공유 자원 (DMAP 마켓플레이스 → 복사)

| 자원 유형 | 자원명 | 원본 경로 | 복사 위치 |
|----------|--------|-----------|-----------|
| 가이드 | ppt-guide | `{DMAP}/resources/guides/docs/ppt-guide.md` | `agents/doc-exporter/references/` |
| 템플릿 | README-plugin-template | `{DMAP}/resources/templates/plugin/README-plugin-template.md` | (README 작성 시 참고, 복사 불필요) |
| 샘플 | README | `{DMAP}/resources/samples/plugin/README.md` | (README 작성 시 참고, 복사 불필요) |
| 도구 | generate_image | `{DMAP}/resources/tools/customs/general/generate_image.py` | `gateway/tools/` |
| 도구 | convert-to-markdown | `{DMAP}/resources/tools/customs/general/convert-to-markdown.py` | `gateway/tools/` |

### 7.2 플러그인 내장 참조 자료 (이미 작성 완료)

| 자원명 | 경로 | 활용 에이전트 |
|-------|------|-------------|
| DORA 2025 | `references/dora/` (8 files + 2 PDF) | 전체 에이전트 |
| 6R/TIME 룰북 | `references/6r/` (7 files) | fit-analyzer, strategy-planner |
| 한국 TCO 벤치마크 | `references/tco-benchmark/` (5 files) | why-definer, tco-analyst |
| AM 기초 자료 | `references/am/`, `references/ai/`, `references/am-strategy/` | 전체 에이전트 |

### 7.3 커스텀 도구 개발 계획
- **없음**: 모든 필요 도구는 공유 자원(generate_image, convert-to-markdown) + anthropic-skills(docx/pptx)로 대응 가능.
- 선택적 추가: 없음

---

## 8. 비기능 요구사항

- **이식성**: Claude Code·Cursor·Cowork 어디서나 동작 (`gateway/runtime-mapping.yaml` 추상화)
- **보안/컴플라이언스**: 고객 데이터·개인정보 외부 전송 금지. 외부 벤치마크만 참조. 인벤토리 민감 속성 마스킹 권장 안내
- **증거 기반**: 모든 정량 지표는 출처(벤치마크·내부 측정·파일럿 실측) 명시
- **경영진 소통**: 최종 보고서는 "왜(WHY) → 얼마(TCO/BEP) → 언제(Phase) → 어떻게(6R) → 위험(Risk/완화)" 순서 고정
- **독립 검증**: reviewer는 자체 산출물 검증 시 별도 컨텍스트에서 실행

---

## 9. 성공 기준

| 구분 | 성공 기준 |
|------|---------|
| 완결성 | WHY·현황·전략 3단계 산출물 체크리스트 100% 충족 |
| 정량화 | 기대 성과·TCO·BEP를 **범위**로 제시(단일 숫자 금지), 근거 출처 명시 |
| 실행 가능성 | Phase 1·1' 파일럿 대상/일정/예산이 4주 내 착수 가능한 수준 |
| 거버넌스 | 5개 회의체·3개 Gate·Phase별 가드레일이 조직 현실 기반 제안 |
| 변화관리 | Phase별 커뮤니케이션·교육·조직 전환 로드맵 포함, 실패 1위 원인(조직) 대응 명시 |
| 산출 형식 | Markdown + MS Word + PowerPoint 3종 일관성 유지 |
| 표준 준수 | DMAP 플러그인 표준 검증 항목 100% 통과 |

---

## 10. 열린 질문 / 위험

| 영역 | 이슈 | 완화 계획 |
|------|------|-----------|
| 업종별 TCO 데이터 | 한국 금융·제조·유통 정량 TCO 2025+ 부재 | `references/tco-benchmark/04-data-gap-and-supplement.md`의 4가지 보충 옵션 중 선택 안내 |
| 도구 런타임 의존성 | `generate_image` 등 Python 도구의 API 키·라이브러리 설치 필요 | setup 스킬에서 `install.yaml` 기반 자동 설치 + `.env` 템플릿 제공 |
| anthropic-skills 가용성 | docx/pptx 스킬 설치 여부에 따라 변환 실패 가능 | doc-exporter에서 존재 체크 + fallback 메시지로 수동 변환 안내 |

---

*이 문서는 팀 기획서(`output/team-plan-am-strategy.md`)의 내용을 구현 관점에서 구체화한 결과이며, Phase 2(설계)의 입력 문서로 사용됨.*
