# 08 Claude Code 확장과 DMAP/Abra/NPD

## 1. 왜 확장이 필요한가?

### 1.1 WHY — 확장이 필요한 이유

| 문제 | 설명 |
|------|------|
| 반복 작업 | 동일한 지시를 매번 타이핑하는 비효율 |
| 전문성 부족 | 보안, 성능 등 도메인 특화 수행에 범용 AI의 한계 |
| 팀 표준화 | 팀원마다 다른 방식으로 AI를 사용하는 비일관성 |

> 현재의 문제점: Claude Code 기본 기능만으로는 반복 작업, 전문 분석, 팀 협업에서 한계에 부딪히게 됨.

### 1.2 HOW — 4가지 확장 메커니즘

| 메커니즘 | 설명 |
|----------|------|
| **Skills** | 재사용 가능한 작업 지침 파일 (Claude에게 주는 작업 매뉴얼) |
| **Agents** | 역할 특화 AI 서브에이전트 (전문가 AI를 별도 배치) |
| **Commands** | Skills의 이전 형태 (현재 Skills로 통합됨) |
| **Plugin** | 위 요소를 하나로 묶어 공유하는 패키지 |

### 1.3 WHAT — 기대 효과
1. **개인 생산성 향상**: 반복 작업을 자동화하여 동일한 지시를 다시 타이핑할 필요가 없음  
2. **도메인 특화 수행 품질 확보**: 역할별 AI 전문가를 배치하여 보안, 성능 등 도메인 특화 수행의 정확도를 높임  
3. **팀 협업 표준화**: 공유 가능한 패키지를 배포하여 팀 전체가 동일한 방식으로 AI를 활용  

> 확장을 통해 반복 감소, 전문성 강화, 팀 표준화를 동시에 달성.

## 2. Skills — 작업 매뉴얼

### 2.1 Skills란?
Claude가 할 수 있는 작업을 확장하는 지침 파일(`SKILL.md`). "Claude에게 주는 작업 매뉴얼".  
`/skill-name` 명령으로 직접 호출하거나 Claude가 자동 선택.

### 2.2 주요 Frontmatter 옵션

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `description` | 자동 호출 판단 기준 (구체적일수록 정확) | 필수 |
| `user-invocable` | 사용자 슬래시 명령 호출 허용 여부 | true |
| `allowed-tools` | 사용 가능한 도구 목록 | 제한 없음 |

### 2.3 저장 위치별 범위

| 위치 | 범위 |
|------|------|
| `.claude/skills/` | 프로젝트별 (팀 공유) |
| `~/.claude/skills/` | 전역 (개인용, 모든 프로젝트) |
| `플러그인/skills/` | 플러그인 내 포함 |

### 2.4 파일 구조 예시
```
.claude/skills/
├── code-review/
│   ├── SKILL.md       <- 핵심 지침 파일
│   └── checklist.md   <- 지원 파일 (선택)
└── deploy/
    └── SKILL.md
```

### 2.5 SKILL.md 기본 형식
```markdown
---
description: 이 skill이 하는 일 설명 (필수)
user-invocable: true        # 슬래시 명령 호출 허용
allowed-tools: Bash, Read   # 사용 가능 도구 제한
---

# Skill 이름

Claude에게 전달할 지침을 여기에 작성.
사용자 입력은 $ARGUMENTS 로 수신.
```

### 2.6 Commands
Commands는 Skills의 이전 형태로 현재 Skills로 완전 통합됨. 기존 `.claude/commands/` 파일은 그대로 사용 가능 (하위 호환).

## 3. Agents — 특정 분야 전문가

### 3.1 Agents란?
고유한 역할·시스템 프롬프트·도구 제한·모델을 가진 특정 분야 전문가.

| 특징 | 설명 |
|------|------|
| 컨텍스트 분리 | 에이전트는 주 대화에서 분리된 독립 컨텍스트 영역에서 수행 |
| 제약 조건 적용 | 에이전트 사용 가능 도구 제한 |
| 비용 제어 | 작업 복잡도에 따라 모델을 다르게 지정하여 품질 향상과 비용 절감 가능 |
| 구성 재사용 | 프로젝트 간 에이전트 정의 재사용 |
| Agent Teams | 여러 에이전트를 별도의 Claude Code에서 병렬 작업 가능 |

### 3.2 에이전트 정의
- **파일 위치**: `.claude/agents/{agent-name}.md`  
- **형식**: 스킬과 동일 → YAML frontmatter + Markdown 프롬프트  

| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `name` | 에이전트 고유 식별자 | 필수 |
| `description` | 자동 위임 판단 기준 | 필수 |
| `model` | sonnet / opus / haiku / inherit | inherit |
| `tools` | 허용 도구 (생략 시 전체 상속) | 전체 |

> Tip: `description`을 구체적으로 작성할수록 Claude의 자동 위임 정확도가 높아짐.

### 3.3 내장 Agents

| Agent | 모델 | 목적 | 허용 도구 |
|-------|------|------|-----------|
| Explore | Haiku (경량) | 코드베이스 검색 및 분석 (읽기 전용) | Read, Grep, Glob |
| Plan | 주 대화 상속 | 컨텍스트 수집 (읽기 전용) | Read, Grep, Glob |
| General-purpose | 주 대화 상속 | 복잡한 다단계 작업 (탐색 + 수정) | 모든 도구 |

### 3.4 호출 방법

| 방법 | 사용법 예시 | 설명 |
|------|--------------|------|
| 자동 위임 | "코드 리뷰 해줘" | description 기반 자동 선택 |
| 명시적 호출 | "security-reviewer 에이전트로 검토해줘" | 에이전트 이름 직접 명시 |
| @-mention | `@"security-reviewer (agent)"` | 강제 호출 |

> 핵심: 각 에이전트는 독립 컨텍스트 윈도우에서 실행 — 특정 도메인 전문 작업 및 격리 필요 작업에 최적.

## 4. Plugin — 복합적인 작업을 위한 종합 패키지

### 4.1 Plugin이란?
Skills · Agents · Hooks · MCP Servers를 하나의 디렉토리로 묶어 팀·커뮤니티와 공유할 수 있는 패키지.

### 4.2 플러그인 디렉토리 구조

```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/   agents/   hooks/
├── .mcp.json        ← MCP 서버 구성
├── .lsp.json        ← LSP 구성 (선택)
├── settings.json    ← 기본 설정
└── README.md
```

| 파일/디렉토리 | 필수 여부 | 설명 |
|---------------|-----------|------|
| `plugin.json` | 필수 | 플러그인 이름·버전·설명 등 기본 메타데이터 |
| `marketplace.json` | 선택 | 마켓플레이스 제출용 추가 메타데이터 |
| `skills/` | 선택 | SKILL.md 파일 디렉토리 (플러그인 루트에 위치) |
| `agents/` | 선택 | 에이전트 정의 파일 디렉토리 |
| `hooks/` | 선택 | hooks.json — 이벤트 기반 자동화 |
| `.mcp.json` | 선택 | MCP 서버 구성 파일 |
| `.lsp.json`, `settings.json` | 선택 | LSP(개발 언어 서버) 구성 / 기본 설정 |

### 4.3 플러그인 라이프사이클 관리 (현재 OS 사용자 전체 적용)

#### MarketPlace 추가
```bash
# 옵션 1) 로컬에 다운로드한 플러그인 소스 이용 (플러그인 디렉토리로 이동해서 수행)
claude plugin marketplace add ./

# 옵션 2) Git 이용
claude plugin marketplace add {Git Org}/{Git Repo}
```

#### 플러그인 설치 / 업그레이드 / 조회 / 삭제
```bash
# 설치
claude plugin install {plugin-name}@{marketplace-name}

# 버전 업그레이드
claude plugin update {plugin-name}@{marketplace-name}

# 조회
claude plugin list
claude plugin marketplace list

# 삭제
claude plugin remove {plugin-name}@{marketplace-name}
claude plugin marketplace remove {marketplace-name}
```

> 플러그인 설치 후 `/{plugin-name}:{command}`로 연결된 스킬 호출.  
> 마켓플레이스를 삭제하면 그 마켓플레이스로 설치한 플러그인도 자동 삭제됨.

## 5. 확장 메커니즘 통합 비교

### 5.1 기능 한눈에 비교

| 기능 | Skills | Agents | Plugin |
|------|--------|--------|--------|
| 주요 목적 | 작업 지침 확장 | 역할 특화 AI | 패키지/배포 단위 |
| 호출 방식 | `/skill-name` 또는 자동 | 자동 위임 또는 @mention | `/plugin:skill-name` |
| 네임스페이스 | 없음 | 없음 | `plugin-name:` 접두사 |
| 공유 방식 | 수동 복사 | 수동 복사 | 마켓플레이스 |
| 버전 관리 | 없음 | 없음 | plugin.json에 지정 |
| 포함 요소 | 지침 + 지원 파일 | 프롬프트 + 도구 | Skills + Agents + Hooks + MCP |

### 5.2 도입 단계별 권장 경로

| 단계 | 활동 |
|------|------|
| 1단계: 개인 실험 | `.claude/skills/`로 시작. 내장 skill 목록 파악 (`/batch`, `/simplify`, `/claude-api`) |
| 2단계: 팀 표준화 | 공통 Skills 정의 후 `.claude/skills/`에 등록. 전담 역할 Agents 생성 후 `.claude/agents/`에 등록 |
| 3단계: 공유/배포 | Plugin으로 묶기: Skills, Agents 등을 묶고 `.claude-plugin/plugin.json` 생성. 마켓플레이스 제출 또는 팀 내부 배포 |

## 6. DMAP (Declarative Multi-Agent Plugin) 개요

### 6.1 DMAP이란?
Markdown(프롬프트)과 YAML(설정)만으로 멀티에이전트 플러그인을 개발하는 선언형 플러그인 빌더.
- 코드 작성 없이 도메인 전문가도 멀티에이전트 플러그인 개발 가능  
- Claude Code, Cursor에서 동작 (CoWork는 일부 제약 있음)  

### 6.2 기본 Plugin vs DMAP Plugin

| 구분 | 기본 Plugin | DMAP Plugin |
|------|-------------|-------------|
| 에이전트 정의 | 단일 .md 파일 | AGENT.md + agentcard.yaml + tools.yaml (3파일 구성) |
| 도구 매핑 | 도구명 직접 기입 | 추상 도구 선언 후 Gateway에서 런타임별 매핑 |
| 모델 지정 | 모델명 하드코딩 | Tier 선언 후 Gateway에서 모델 매핑 |
| 이식성 | 특정 런타임(Claude Code, Cursor 등)에 종속 | runtime-mapping.yaml 교체만으로 타 런타임 이식 |
| 아키텍처 | 단순 파일 묶음 | Clean Architecture 기반 5-Layer 구조 |
| 에이전트 간 전환 | 없음 | escalation 조건 정의로 자동 전환 지원 |

### 6.3 DMAP으로 생성된 플러그인 표준 디렉토리 구조

```
{plugin-name}/
├── .claude-plugin/
│   ├── plugin.json       # 플러그인 메타데이터
│   └── marketplace.json  # 마켓플레이스 배포 설정
├── skills/               # 사용자 진입점 (오케스트레이터)
├── agents/               # 전문가 실행 단위 (3파일 구성)
│   └── {agent-name}/
│       ├── AGENT.md      # 에이전트 정의
│       ├── agentcard.yaml # 메타데이터 (이름·설명·모델)
│       └── tools.yaml    # 허용 도구 목록
├── commands/             # 슬래시 명령 진입점
├── gateway/
│   └── runtime-mapping.yaml # 추상 → 구체 도구/모델 매핑
├── hooks/                # 이벤트 기반 자동화
└── CLAUDE.md             # 시스템 지시 및 라우팅 규칙
```

### 6.4 핵심 차별점
- **선언형**: 도구명·모델명을 추상적으로 선언 → Gateway에서 런타임별 매핑  
- **이식성**: Claude Code → Cursor 전환 시 `runtime-mapping.yaml`만 교체  

## 7. DMAP 5-Layer 아키텍처

Clean Architecture 기반 5개 계층:

```
Commands  → 슬래시 명령 라우팅
   ↓
Skills    → 오케스트레이션 (작업 조율)
   ↓
Agents    → 전문가 자율 실행
   ↓
Gateway   → 추상 → 구체 도구/모델 매핑
   ↓
Runtime   → 매핑 해석 + 에이전트 호출

✓ Hooks   → AOP — 이벤트 가로채기, 모든 계층에 횡단 적용
```

| 계층 | 역할 | 핵심 파일 |
|------|------|-----------|
| Commands | 사용자 진입점 (슬래시 명령 시) | `commands/{name}.md` |
| Skills | 오케스트레이션 (작업 분배) | `skills/{name}/SKILL.md` |
| Agents | 전문가 자율 실행 | `AGENT.md + agentcard.yaml` |
| Gateway | 추상 → 구체 도구/모델 변환 | `gateway/runtime-mapping.yaml` |
| Hooks | 이벤트 횡단 처리 | `hooks/hooks.json` |

### 7.1 프롬프트 조립 과정 (Agent 호출 시)
1. `agents/{agent-name}/AGENT.md` 읽기 (역할 및 행동 지침)  
2. `agents/{agent-name}/agentcard.yaml` 읽기 (tier 확인)  
3. `agents/{agent-name}/tools.yaml` 읽기 (추상 도구 선언)  
4. `gateway/runtime-mapping.yaml`에서 tier→모델, 추상 도구→구체 도구 매핑  
5. 조립된 프롬프트와 매핑된 모델로 Agent 스폰 (호출)  

### 7.2 실행 경로

| 유형 | 경로 |
|------|------|
| 위임형 (복잡한 작업) | Input → Skills → Agents → Gateway → Runtime |
| 직결형 (단순 작업) | Input → Skills → Gateway → Runtime |

### 7.3 Gateway 매핑 예시

```yaml
# Tier(등급) → 모델 매핑
tier_mapping:
  HEAVY:  claude-opus-4-6      # 최고 성능
  HIGH:   claude-sonnet-4-6    # 고성능
  MEDIUM: claude-haiku-4-6     # 표준 / 경량

# 추상 도구 → 구체 도구 매핑
tool_mapping:
  file_read:   [Read, Glob]
  file_write:  [Write, Edit]
  shell_exec:  [Bash]
  web_search:  [WebSearch, WebFetch]

# 금지 액션 → 구체 도구 매핑
forbidden_mapping:
  file_delete: [Bash(rm:*)]
  file_write:  [Write, Edit]
```

> **Clean Architecture**: 어플리케이션을 비즈니스 도메인과 외부 인프라 영역으로 나누어 외부 인프라의 변화에 유연하고 비즈니스 도메인 변화는 최소화하는 아키텍처 설계 패턴.

## 8. 정리 및 DMAP 도입 가이드

### 8.1 핵심 요약

| 확장 메커니즘 | 핵심 한 줄 요약 |
|---------------|-----------------|
| Skills | Claude에게 주는 작업 매뉴얼 (SKILL.md 파일) |
| Agents | 특정 분야 전문가 AI 배치 (독립 컨텍스트 실행) |
| Plugin | 복합적인 작업을 위한 종합 패키지 |
| DMAP | 선언형 멀티에이전트 플러그인 빌더 |

### 8.2 DMAP 도입이 적합한 경우
- 여러 전문가 에이전트가 협업해야 하는 복잡한 워크플로우  
- 런타임 환경이 변경될 가능성이 있는 경우 (이식성 필요)  
- 도메인 전문가가 직접 에이전트 시스템을 설계해야 하는 경우  
- 팀/조직 단위로 표준화된 에이전트 시스템을 배포해야 하는 경우  

### 8.3 DMAP 사용하기

| 단계 | 액션 | 명령어 |
|------|------|--------|
| 1. DMAP 빌더 설치 | DMAP 소스 다운로드 | `mkdir -p {작업디렉토리} && cd {작업디렉토리}`<br>`git clone https://github.com/unicorn-plugins/dmap.git`<br>`cd dmap` |
| | DMAP 플러그인 설치 | `claude plugin marketplace add ./`<br>`claude plugin install dmap@dmap` |
| 2. 플러그인 생성 | 플러그인 디렉토리 생성 | `mkdir -p {작업디렉토리}/{플러그인 디렉토리}`<br>`cd {작업디렉토리}/{플러그인 디렉토리}` |
| | 런타임 실행 | Claude Code, Claude Cowork, Cursor 등 원하는 런타임 실행 |
| | 팀 기획서 작성 | `/dmap:team-planner` 실행 후 제공되는 팀기획서 양식에 맞춰 정보 제공 |
| | 플러그인 개발 | `/dmap:develop-plugin` 실행하여 플러그인 개발 |
| 3. 플러그인 사용 | 플러그인 설치 및 초기 셋업 | Claude Code: `claude --plugin-dir .` / Claude Cowork·Cursor: `@setup` |
| | 플러그인 스킬 호출 | Claude Code: `/{plugin-name}:{skill-name}` / Claude Cowork·Cursor: `@{skill-name}` |

## 9. Abra 플러그인: AI Agent, 기획자가 직접 만드는 시대

### 9.1 WHY — 아이디어만 있으면 AI Agent를 만들 수 있음

| 문제 | 설명 |
|------|------|
| 개발자 의존의 긴 사이클 | AI Agent 하나를 만들려면 요구사항 정리 → 설계 → 개발 → 테스트 수 주 소요. 기획 의도가 개발 과정에서 변질되거나 누락되는 일이 반복됨 |
| 높은 진입 장벽과 비용 | 워크플로우 설계, API 연동, 코드 구현을 직접 하려면 기술 지식이 필수. 아이디어 검증 전에 개발 리소스를 투입해야 하는 부담이 큼 |

### 9.2 자연어 한 줄로 시작
"고객 문의를 자동 분류하는 AI Agent 만들어줘"  
→ 시나리오 생성부터 동작하는 Agent까지 자동 완성. 수일 → 수분, 비개발자도 가능.  
5개 전문 AI가 기획자 대신 설계·구현·검증을 수행. 기획자는 방향과 아이디어만 제시.

### 9.3 핵심 가치

| 가치 | 기획자 관점 의미 |
|------|------------------|
| 선언형 자동화 | "무엇을 만들지"만 말하면 "어떻게"는 AI가 해결 |
| 멀티에이전트 협업 | 5개 전문 AI가 단계별 역할 분담, 기획자는 방향 제시만 |
| 검증 내장 루프 | 오류 발생 시 AI가 스스로 수정·재시도, 수동 디버깅 불필요 |
| 즉시 프로토타이핑 | 아이디어를 수분 내에 동작하는 워크플로우로 확인 가능 |

> Abra는 비즈니스 요구사항을 자연어로 입력하면 아이디어 구체화 → 워크플로우 설계 → 즉시 실행 → 개발 계획 → AI Agent 완성까지 전 과정을 5개 전문 AI가 자동 수행하는 Claude Code 플러그인.

## 10. Abra 플러그인: 단계별 워크플로우 및 시작하기

### 10.1 단계별 워크플로우
- STEP 1: 아이디어 입력  
- STEP 2: 워크플로우 설계  
- STEP 3: 즉시 실행해보기  
- STEP 4: 개발 계획 자동화  

> 에러 자동 수정 루프: STEP 3에서 오류 발생 시 AI가 스스로 수정 → 재검증 → 재시도를 반복하여 기획자 개입 최소화.

### 10.2 시작하기 — 빠른 실행

```bash
# 1. Abra 플러그인 설치
mkdir -p {작업디렉토리} && cd {작업디렉토리}
git clone https://github.com/unicorn-plugins/abra.git
cd abra
claude plugin marketplace add ./
claude plugin install abra@abra

# 2. 프로젝트 디렉토리 생성
cd ~/workspace
mkdir {project-name}
cd {project-name}

# 3. Claude Code/Cursor 실행
cy           # claude 명령의 alias
cursor .     # Cursor IDE

# 4. 프로젝트 초기화
/abra:setup

# 5. 단계별 실행
/abra:scenario → /abra:dsl-generate → /abra:prototype → /abra:dev-plan → /abra:develop
```

## 11. NPD 플러그인: WHY — AI 협업 개발의 필요성

MVP 주제 하나만 입력하면 기획→설계→개발→배포까지 9개 전문가 AI가 협업하여 전체 수명주기를 완성.

### 11.1 WHY 1 — 복잡한 개발 수명주기
기획부터 배포까지 각 단계 전문성 요구가 높아 팀 전체의 일관된 품질 유지가 어려움. NPD는 단계별 AI 전문가 에이전트를 자동 투입하여 품질을 표준화.

### 11.2 WHY 2 — 반복 작업의 생산성 저하
산출물 작성, 코드 보일러플레이트, CI/CD 설정 등 반복 업무가 개발 속도를 저해. NPD는 기획 산출물 6종, 설계 산출물 7종, 배포 파이프라인을 자동 생성.

### 11.3 WHY 3 — AI 도구 도입의 높은 진입 장벽
LLM 연동, 프롬프트 설계, 에이전트 오케스트레이션을 직접 구축하려면 전문 지식 필요. NPD는 검증된 9개 전문가 에이전트를 즉시 사용 가능한 플러그인으로 제공.

## 12. NPD 플러그인: 플러그인 기능 및 에이전트 구성

### 12.1 주요 기능 (7종)

| 기능 | 설명 |
|------|------|
| 도메인 전문가 자동 생성 | MVP 주제 입력 시 `domain-expert-{서비스명}` 에이전트 동적 생성 |
| 모노레포 구조 자동화 | Spring Boot 백엔드 + 모노레포 패턴 기반 프로젝트 구조 생성 (한 개 Git Repo로 복수 서비스 관리) |
| GitHub 레포 자동 연동 | `create_repo` 도구 연동으로 GitHub 레포 자동 생성 |
| 기획 산출물 6종 | 상위기획 → 도메인검토 → 기획구체화 → 기술검토 → AI 기회발굴 → 유저스토리 |
| 설계 산출물 7종 | 아키텍처 → 논리설계 → 시퀀스 → API → 클래스/데이터 → AI 연동 설계 |
| 개발 자동화 | 공통모듈 → DB → 백엔드 → 프론트 → AI 기능 → 테스트 순 구현 |
| 배포 자동화 | Docker 빌드 → 컨테이너 검증 → K8s 배포 → CI/CD 파이프라인 구성 |

### 12.2 에이전트 구성 (9개 + 1 동적 생성)

| 에이전트 | Tier | 담당 단계 | 역할 |
|----------|------|-----------|------|
| product-owner | HIGH | 기획 | 비즈니스 가치 판단, MVP 범위 정의 |
| service-planner | MEDIUM | 기획 | 사용자 경험 설계, 유저스토리 작성 |
| architect | HIGH | 기획·설계 | 아키텍처 설계, 기술 실현 가능성 검토 |
| domain-expert-{서비스명} | HIGH | 기획 | 도메인 특화 지식 기반 요구사항 도출, 시장조사, 검토 (서비스 create 시 동적 생성) |
| ai-engineer | HIGH | 기획·설계·개발 | AI/ML 기회 발굴, 설계, 구현 |
| backend-developer | MEDIUM | 개발 | Spring Boot 백엔드 개발 |
| frontend-developer | MEDIUM | 개발 | 프론트엔드 개발 |
| qa-engineer | MEDIUM | 개발 | 테스트 및 버그 리포트 |
| devops-engineer | MEDIUM | 배포 | 컨테이너 빌드, k8s 배포, CI/CD 배포 |

## 13. NPD 플러그인: 단계별 워크플로우 및 시작하기

### 13.1 권장 사용 순서 (0→7 단계)

| 단계 | 명령어 | 유형 | 설명 |
|------|--------|------|------|
| 0 | `/npd:prepare` | Setup | 로컬 개발 환경 사전준비 (기본 프로그램, Claude Code + OMC 설치 안내) |
| 1 | `/npd:setup` | Setup | 플러그인 초기 설정 (MCP 서버, 환경변수) |
| 2 | `/npd:create` | Core | 새 프로젝트 생성 (모노레포 + domain-expert 구성 + GitHub 레포) |
| 3 | `/npd:plan` | Core | 기획 단계 AI 협업 (PO·기획자·아키텍트·도메인전문가·AI엔지니어) |
| 4 | `/npd:design` | Orchestrator | 설계 단계 AI 협업 (아키텍트·AI엔지니어) |
| 5 | `/npd:develop` | Orchestrator | 개발 단계 AI 협업 (공통모듈 → DB → 백엔드 → 프론트 → AI 기능 → 테스트) |
| 6 | `/npd:deploy` | Orchestrator | 배포 단계 AI 협업 (DevOps 엔지니어) |
| 7 | `/npd:cicd` | Orchestrator | CI/CD 파이프라인 구축 (DevOps 엔지니어) |

> 0→1 순서가 중요: prepare(환경준비) → setup(플러그인설정) → create(프로젝트생성) → 단계별 실행.

### 13.2 시작하기 — 빠른 실행

```bash
# 1. NPD 플러그인 설치
mkdir -p {작업디렉토리} && cd {작업디렉토리}
git clone https://github.com/unicorn-plugins/npd.git
cd npd
claude plugin marketplace add ./
claude plugin install npd@npd

# 2. 프로젝트 디렉토리 생성
cd ~/workspace
mkdir {project-name}
cd {project-name}

# 3. Claude Code/Cursor 실행
cy           # claude 명령의 alias
cursor .     # Cursor IDE

# 4. 프로젝트 초기화
/npd:create → /npd:prepare → /npd:setup

# 5. 단계별 실행
/npd:plan → /npd:design → /npd:develop → /npd:deploy
```
