# am-strategy 개발 계획서

## 기본 정보
- 플러그인명: `am-strategy`
- 목표: 엔터프라이즈 시스템의 AM(Application Modernization) 전환 전략을 **WHY 정의 → 현황 분석 → 전략 수립** 3단계로 체계적 수립
- 대상 도메인: 엔터프라이즈 IT · Application Modernization · 레거시 현대화
- 대상 사용자: CIO/CTO 보좌 조직, 디지털혁신실, EA팀, PMO, 인프라·운영팀 리더
- Owner: `hiondal` / License: MIT / Repo: `hiondal/am-strategy`

---

## 핵심기능
- **WHY 정의**: 비즈니스 동인(4S + 혁신) 정리, 기대 성과 L1 정량화, 경영진 스폰서십 3단계 전략, WHY 통합 보고서
- **현황 분석**: 시스템 인벤토리(6 카테고리), 4차원 건강도 스코어카드, 기술부채 비용 산정, A/B/C 등급, 6R/TIME 매칭(8단계 룰북), 서비스 경계 식별(Event Storming/VSM), 변화관리 조기 착수
- **전략 수립**: 6R 상세·포트폴리오 Phase, TCO/BEP 분석, 4영역 리스크, 5개 거버넌스 회의체 + 가드레일 + AI 정책, 변화관리 기획, 전략 통합 보고서
- **최종 보고서**: `strategy-report.md` → `.docx`(경영진 요약 + 실무진 상세 2종) + `.pptx`(경영진 발표) + 인포그래픽

---

## 업무 플로우

### WHY 정의 (`/am-strategy:why-define`)
- Step 1-1. 비즈니스 동인 정의: 4S+혁신 매핑 → `output/{project}/step1/1-drivers.md`
- Step 1-2. 기대 성과 L1 정량화: DORA 5지표 분포 Top % → `2-quant-L1.md`
- Step 1-3. 경영진 스폰서십 전략: L1→L2→L3 3단계 시나리오 → `3-sponsorship.md`
- Step 1-4. WHY 통합본 작성: 경영진 보고서 → `why-statement.md`

### 현황 분석 (`/am-strategy:analyze-current`)
- Step 2-1. 시스템 인벤토리 6카테고리 + DORA 8개 질문 → `1-inventory.md`
- Step 2-2. A/B/C 등급 × DORA 7 클러스터 매핑 → `2-abc.md`
- Step 2-3. 건강도 4차원 스코어카드 + DORA 8차원 → `3-healthscore.md`
- Step 2-4. 기술부채 비용 + AI ROI 잠금 비용 → `4-techdebt-cost.md`
- Step 2-5. 6R/TIME 매핑 (8단계 룰북 적용) → `5-fit-6r-time.md`
- Step 2-6. 서비스 경계 (Event Storming + VSM) → `6-bounded-context.md`
- Step 2-7. 변화관리 조기 착수 → `7-change-kickoff.md`

### 전략 수립 (`/am-strategy:strategize`)
- Step 3-1. 6R 상세 (비용·기간·리스크 프로파일) → `1-6r-detail.md`
- Step 3-2. 포트폴리오 Phase 0~4 + 파일럿 선정 → `2-portfolio-phase.md`
- Step 3-3. TCO As-Is/To-Be + BEP 3·5년 → `3-tco-bep.md`
- Step 3-4. 4영역 리스크 매트릭스 → `4-risk.md`
- Step 3-5. 거버넌스 + 가드레일 + AI 정책 → `5-governance-guardrail.md`
- Step 3-6. 변화관리 기획 → `6-change-mgmt.md`
- Step 3-7. 전략 통합 보고서 → `strategy-report.md`

### 최종 보고 (`/am-strategy:report`)
- Step 4-1. 최종 Review (별도 컨텍스트 reviewer)
- Step 4-2. (사용자 질문) 출력 장수(경영진 요약 ≤30장, 실무진 상세 ≥100장) 확인
- Step 4-3. `.docx` 2종 + `.pptx` 변환 (`anthropic-skills:docx/pptx` 위임)
- Step 4-4. 필요 시 인포그래픽 생성 (`generate_image`)
- 산출: `output/{project}/final/strategy-report.docx`, `strategy-executive.pptx`

---

## 기술 요구사항

### 기술 스택
- 정의: Markdown(AGENT.md, SKILL.md), YAML(agentcard/tools/gateway)
- 스크립팅: Python 3.x (공유 도구 `generate_image.py`, `convert-to-markdown.py`)
- 외부 스킬 연동: `anthropic-skills:docx`, `anthropic-skills:pptx`
- 런타임: Claude Code (Cowork 이식성 확보)

### 입출력
- 입력: 사용자 인터뷰, `references/am-strategy/company-profile.md`, 인벤토리 자료(확장 시 Office 문서 → `convert-to-markdown`)
- 중간 산출물: `output/{project}/stepN/*.md`
- 최종 산출물: `.md` + `.docx`(2종) + `.pptx` + (선택)인포그래픽

---

## 공유자원

| 자원 유형 | 자원명 | 원본 경로 | 복사 위치 |
|----------|--------|-----------|-----------|
| 가이드 | ppt-guide | `{DMAP}/resources/guides/docs/ppt-guide.md` | `agents/doc-exporter/references/` |
| 템플릿 | README-plugin-template | `{DMAP}/resources/templates/plugin/README-plugin-template.md` | (README 작성 시 참고) |
| 샘플 | README | `{DMAP}/resources/samples/plugin/README.md` | (README 작성 시 참고) |
| 도구 | generate_image | `{DMAP}/resources/tools/customs/general/generate_image.py` | `gateway/tools/` |
| 도구 | convert-to-markdown | `{DMAP}/resources/tools/customs/general/convert-to-markdown.py` | `gateway/tools/` |

### 내장 참조 자료 (이미 `references/`에 보유)
- `references/dora/` (8 md + 2 PDF) — 전 에이전트
- `references/6r/` (7 md) — fit-analyzer, strategy-planner
- `references/tco-benchmark/` (5 md) — why-definer, tco-analyst
- `references/am/`, `references/ai/`, `references/am-strategy/` — 도메인 기초 자료

### 커스텀 도구 개발 계획
**없음.** 공유 자원 + `anthropic-skills:docx/pptx`로 모든 기능 충족.

---

## 플러그인 구조 설계

### 에이전트 구성 설계

#### 에이전트 목록 및 역할 (8개)

| 에이전트 | 티어 | 역할 | 주 책임 | 세부역할(sub_roles) |
|---------|:---:|------|---------|--------------------|
| `why-definer` | HIGH | WHY 정의 전문가 | STEP 1 전체 (동인·정량화·스폰서십·통합) | industry-benchmark / driver-mapper |
| `inventory-analyst` | MEDIUM | 인벤토리·건강도 평가 | STEP 2-1~2-4 | interview-template / code-scan-reader / dependency-mapper |
| `fit-analyzer` | HIGH | 전환 적합도·서비스 경계 | STEP 2-5~2-6 (6R/TIME, Event Storming) | event-storming-guide / 6r-matcher |
| `strategy-planner` | HIGH | 6R 전략·포트폴리오 | STEP 3-1~3-2 | budget-calculator / phase-sequencer |
| `tco-analyst` | MEDIUM | TCO·BEP 분석 | STEP 3-3 | cost-modeler |
| `risk-governance` | HIGH | 리스크·거버넌스·가드레일 | STEP 3-4~3-5 | risk-matrix-tool / guardrail-designer |
| `change-manager` | MEDIUM | 변화관리 | STEP 2-7 + STEP 3-6 | stakeholder-mapper |
| `reviewer` | HIGH | 전략 검증 | 최종 Review (별도 컨텍스트) | — |
| `doc-exporter` | LOW | 문서 변환 | `.docx`/`.pptx` 변환 | — |

> **주의**: 총 9개 에이전트 (기획서 8개 + doc-exporter LOW 1개). reviewer는 독립 컨텍스트 스폰.

#### 에이전트 간 의존성
- 스킬이 에이전트를 호출하며, **에이전트 간 직접 호출 금지**(DMAP 표준).
- 의존 흐름: why-definer → inventory-analyst → fit-analyzer → strategy-planner → (tco-analyst ∥ risk-governance ∥ change-manager) → reviewer → doc-exporter
- 핸드오프: 각 에이전트의 `agentcard.yaml`에 다음 스킬 호출 힌트 기술.

---

#### 스킬 목록

| 스킬명 | 유형 | 필수 | 설명 | 진입점 |
|-------|------|:----:|------|--------|
| `setup` | Setup (직결형) | 필수 | install.yaml 기반 도구 설치 + 활성화 라우팅 | `/am-strategy:setup` |
| `help` | Utility (직결형) | 필수 | 명령 목록·자동 라우팅·사용 예시 즉시 출력 | `/am-strategy:help` |
| `why-define` | Orchestrator (위임형) | 필수 | STEP 1 WHY 정의 오케스트레이션 | `/am-strategy:why-define` |
| `analyze-current` | Orchestrator (위임형) | 필수 | STEP 2 현황 분석 오케스트레이션 | `/am-strategy:analyze-current` |
| `strategize` | Orchestrator (위임형) | 필수 | STEP 3 전략 수립 오케스트레이션 | `/am-strategy:strategize` |
| `report` | Orchestrator (위임형) | 필수 | 최종 Review + 문서 변환 오케스트레이션 | `/am-strategy:report` |

> **core 스킬 없음** (사용자 선택에 따라 개별 스킬만 제공).

---

#### 스킬 워크플로우

**`why-define` (Orchestrator)**
```
Phase 1: 입력 수집 (company-profile.md 존재 확인, 누락 시 AskUserQuestion)
Phase 2: 동인 매핑 → Agent: why-definer (sub_role: driver-mapper)
Phase 3: L1 정량화 → Agent: why-definer (sub_role: industry-benchmark)
Phase 4: 스폰서십 전략 → Agent: why-definer
Phase 5: 통합 보고서 → Agent: why-definer
Phase 6: 완료 (산출물 체크리스트)
```

**`analyze-current` (Orchestrator)**
```
Phase 1: 인벤토리 수집 (병렬) → Agent: inventory-analyst (sub_role: interview-template / code-scan-reader / dependency-mapper)
Phase 2: A/B/C 등급 → Agent: inventory-analyst
Phase 3: 건강도 스코어카드 → Agent: inventory-analyst
Phase 4: 기술부채 비용 → Agent: inventory-analyst
Phase 5: 6R/TIME 매핑 → Agent: fit-analyzer (sub_role: 6r-matcher, 룰북 8단계)
Phase 6: 서비스 경계 → Agent: fit-analyzer (sub_role: event-storming-guide)
Phase 7: 변화관리 조기 착수 → Agent: change-manager
Phase 8: 완료
```

**`strategize` (Orchestrator)**
```
Phase 1: 6R 상세 → Agent: strategy-planner (sub_role: budget-calculator)
Phase 2: Phase 구성 → Agent: strategy-planner (sub_role: phase-sequencer)
Phase 3: TCO/BEP (병렬) → Agent: tco-analyst
Phase 4: 리스크 (병렬) → Agent: risk-governance (sub_role: risk-matrix-tool)
Phase 5: 거버넌스+가드레일 → Agent: risk-governance (sub_role: guardrail-designer)
Phase 6: 변화관리 기획 → Agent: change-manager (sub_role: stakeholder-mapper)
Phase 7: 전략 통합 → Agent: strategy-planner
Phase 8: 완료
```

**`report` (Orchestrator)**
```
Phase 1: 최종 Review → Agent: reviewer (별도 컨텍스트)
Phase 2: (사용자 질문) AskUserQuestion — 경영진 요약 / 실무진 상세 장수
Phase 3: `.docx` × 2 + `.pptx` 변환 → Agent: doc-exporter (anthropic-skills 위임)
Phase 4: 인포그래픽 (선택) → Agent: doc-exporter (generate_image 도구)
Phase 5: 완료 보고
```

---

### Gateway 설정 설계

#### install.yaml
```yaml
mcp_servers: []          # 외부 MCP 서버 없음 (Claude Code 빌트인 + OMC 기본으로 충분)
lsp_servers: []          # LSP 불필요 (문서 워크플로우)
custom_tools:
  - name: generate_image
    description: "Gemini (Nano Banana) 기반 이미지 생성 — PPT 인포그래픽"
    source: tools/generate_image.py
    required: false
  - name: convert_to_markdown
    description: "Office 문서(pptx/docx/xlsx) → Markdown 변환 + VLM 이미지 설명"
    source: tools/convert-to-markdown.py
    required: false
```

#### runtime-mapping.yaml
```yaml
tier_mapping:
  default:
    HEAVY:  { model: "claude-opus-4-7" }
    HIGH:   { model: "claude-opus-4-7" }
    MEDIUM: { model: "claude-sonnet-4-5" }
    LOW:    { model: "claude-haiku-4-5" }
  # 세부역할별 예외 (비용 최적화)
  inventory-analyst:
    MEDIUM: { model: "claude-sonnet-4-5" }
    sub_roles:
      code-scan-reader:
        MEDIUM: { model: "claude-haiku-4-5" }   # 파싱 위주 — 경량
  doc-exporter:
    LOW: { model: "claude-haiku-4-5" }

tool_mapping:
  image_generate:
    - type: custom
      source: "tools/generate_image.py"
      tools: ["generate_image"]
  document_convert:
    - type: custom
      source: "tools/convert-to-markdown.py"
      tools: ["convert_to_markdown"]

action_mapping:
  file_write: ["Write", "Edit"]
  file_delete: ["Bash"]
  code_execute: ["Bash"]
  network_access: ["WebFetch", "WebSearch"]
  user_interact: ["AskUserQuestion"]
  agent_delegate: ["Task"]
```

---

### 디렉토리 구조 설계

```
am-strategy/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── .claude/
│   └── settings.local.json       # Phase 5에서 권한 설정
├── .gitignore
├── CLAUDE.md                      # Phase 4에서 생성
├── README.md                      # Phase 3 Step 8에서 생성
├── skills/
│   ├── setup/SKILL.md
│   ├── help/SKILL.md
│   ├── why-define/SKILL.md
│   ├── analyze-current/SKILL.md
│   ├── strategize/SKILL.md
│   └── report/SKILL.md
├── agents/
│   ├── why-definer/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── inventory-analyst/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── fit-analyzer/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── strategy-planner/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── tco-analyst/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── risk-governance/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── change-manager/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── reviewer/ {AGENT.md, agentcard.yaml, tools.yaml}
│   └── doc-exporter/ {AGENT.md, agentcard.yaml, tools.yaml, references/ppt-guide.md}
├── gateway/
│   ├── install.yaml
│   ├── runtime-mapping.yaml
│   ├── tools/
│   │   ├── generate_image.py
│   │   └── convert-to-markdown.py
│   └── .env.example               # API 키 템플릿
├── commands/
│   ├── setup.md
│   ├── help.md
│   ├── why-define.md
│   ├── analyze-current.md
│   ├── strategize.md
│   └── report.md
├── references/                    # 이미 존재 (사전 수집 자료)
│   ├── dora/
│   ├── 6r/
│   ├── tco-benchmark/
│   ├── am/
│   ├── ai/
│   └── am-strategy/
└── output/                        # 산출물 (Phase 1 requirements.md, team-plan 이미 존재)
```

---

## 개발 계획

### 3.1 개발 순서 (순차적)

| 순번 | 단계 | 파일/디렉토리 | 예상 시간 | 검증 방법 |
|:---:|-----|--------------|:---------:|-----------|
| 1 | 스켈레톤 생성 | `.claude-plugin/*`, `.gitignore` | 10m | plugin.json / marketplace.json 스키마 필드 확인 |
| 2 | Gateway 설정 | `gateway/install.yaml`, `runtime-mapping.yaml`, `.env.example` | 15m | YAML 파싱 + 매핑 완전성 |
| 3 | 공유자원 복사 | `gateway/tools/*.py`, `agents/doc-exporter/references/ppt-guide.md` | 5m | 파일 존재 확인 |
| 4 | 에이전트 9개 생성 | `agents/{9개}/` | 60m | AGENT.md+agentcard.yaml 쌍, sub_roles 일관성 |
| 5 | 스킬 6개 생성 | `skills/{6개}/SKILL.md` | 50m | frontmatter 타입, 섹션 구조, 위임 마커 |
| 6 | commands 진입점 6개 | `commands/{6개}.md` | 10m | frontmatter + 3단계 지시 |
| 7 | README.md | `README.md` | 15m | 필수 6섹션, 변수 치환 |
| 8 | CLAUDE.md | `CLAUDE.md` | 15m | 멤버/스킬 약어/행동원칙 포함 |
| 9 | `.claude/settings.local.json` | 권한 설정 | 5m | JSON 유효성 |
| 10 | 검증 | 전체 | 15m | 표준 체크리스트 13항목 통과 |

**총 예상**: ~3h 20m

### 3.2 병렬 가능 단계
- 단계 4(에이전트 9개)는 에이전트별 독립 병렬 가능
- 단계 5(스킬 6개) 중 setup/help(직결형)과 why-define/analyze-current/strategize/report(위임형) 병렬 가능
- 단계 6(commands 6개) 전체 병렬

### 3.3 공유 자원 활용 계획
- `ppt-guide.md` → `agents/doc-exporter/references/`로 복사 (단계 3)
- `generate_image.py`, `convert-to-markdown.py` → `gateway/tools/`로 복사 (단계 3)
- README 템플릿/샘플은 단계 7에서 원본 참조하여 치환 작성

### 3.4 기술 요구사항 확인

#### Python 라이브러리 (공유 도구 의존)
- `generate_image.py` 분석 예정 → 필요 라이브러리/API 키를 `.env.example`에 반영
- `convert-to-markdown.py` 분석 예정 → markitdown 또는 동등 라이브러리 의존

#### 환경 변수 (`gateway/.env.example`)
```
# generate_image (Gemini Nano Banana 기반)
GOOGLE_API_KEY=

# convert-to-markdown (Groq VLM 이미지 설명)
GROQ_API_KEY=
```
> 실제 키 목록은 단계 3에서 도구 소스 분석 후 확정.

---

## 검증 체크리스트 (Phase 6 사전 정의)

- [ ] `.claude-plugin/plugin.json`, `marketplace.json` 존재 + 스키마 준수
- [ ] 9개 에이전트 각각 `AGENT.md` + `agentcard.yaml` 쌍 존재
- [ ] 6개 스킬 각각 `SKILL.md` 존재 + frontmatter `type` 일치
- [ ] `setup` 스킬 존재 (직결형) + `help` 스킬 즉시 출력 방식
- [ ] `gateway/install.yaml`, `runtime-mapping.yaml` 존재
- [ ] `tools.yaml`의 추상 도구 ≡ `runtime-mapping.yaml`의 `tool_mapping`
- [ ] `agentcard.yaml`의 tier ≡ `runtime-mapping.yaml`의 `tier_mapping`
- [ ] `commands/` 6개 진입점 파일 존재
- [ ] 에이전트가 다른 에이전트를 호출하지 않음 (오케스트레이션은 스킬 전담)
- [ ] README 6 필수 섹션 (개요·설치·업그레이드·사용법·요구사항·라이선스)
- [ ] reviewer 에이전트 별도 컨텍스트 스폰 명시
- [ ] sub_roles의 name ≡ AGENT.md의 `### {name}` 서브섹션
