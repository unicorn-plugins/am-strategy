---
name: setup
description: am-strategy 플러그인 초기 설정 — install.yaml 기반 커스텀 도구 설치, .env 안내, 활성화 라우팅 등록
type: setup
user-invocable: true
---

# Setup

[SETUP 활성화]

## 목표

am-strategy 플러그인의 초기 설정을 수행함.
`gateway/install.yaml`을 읽어 커스텀 도구의 Python 의존성 설치 필요성을 안내하고,
`.env` 템플릿 복사 가이드, 활성화 라우팅 테이블 등록까지 완료하여 플러그인을 즉시 사용할 수 있는 상태로 만듦.

## 활성화 조건

사용자가 `/am-strategy:setup` 호출 시.

## 사용자 상호작용

AskUserQuestion을 사용하여 다음 분기를 수집함:
- 적용 범위: `모든 프로젝트 (~/.claude/CLAUDE.md)` / `이 프로젝트만 (./CLAUDE.md)`
- `.env` 파일 생성 여부: `지금 생성 (빈 값)` / `나중에 수동 생성`
- Python 의존성 설치 여부: `pip install 실행` / `건너뛰기`

## 워크플로우

### Step 1: 필수 파일 확인

{tool:file_read}로 다음 파일 존재 확인:
- `gateway/install.yaml`
- `gateway/runtime-mapping.yaml`
- `gateway/tools/generate_image.py`
- `gateway/tools/convert-to-markdown.py`
- `gateway/.env.example`

이 단계는 `ulw` 매직 키워드를 활용하여 수행 (완료 보장).

### Step 2: install.yaml 파싱 및 안내

`install.yaml`을 파싱하여 `custom_tools` 목록 출력.
이 플러그인은 MCP·LSP 서버 없이 커스텀 Python 도구 2종만 의존함을 안내.

### Step 3: Python 의존성 안내

커스텀 도구 2종의 Python 패키지 의존성 안내:
- `generate_image.py`: `google-genai`, `python-dotenv`, `Pillow`
- `convert-to-markdown.py`: `python-pptx`, `python-docx`, `openpyxl`, `groq`, `python-dotenv`

사용자 동의 시 {tool:bash}로 다음 명령 실행 옵션 제공:
```bash
pip install google-genai python-dotenv Pillow python-pptx python-docx openpyxl groq
```

이 단계는 `ulw` 매직 키워드를 활용하여 수행.

### Step 4: `.env` 파일 생성 안내

`gateway/.env.example`을 `gateway/.env`로 복사하도록 안내하고,
GEMINI_API_KEY / GROQ_API_KEY 입력 위치를 명시.

사용자 동의 시 빈 `.env` 파일을 생성하고 키 입력만 남겨둠.

### Step 5: anthropic-skills 설치 확인

doc-exporter 에이전트가 사용하는 `anthropic-skills:docx/pptx` 설치 여부 확인.
미설치 시 설치 안내 (선택 — required: false).

### Step 6: 활성화 라우팅 등록

AskUserQuestion으로 적용 범위 확정 후:
- `모든 프로젝트`: `~/.claude/CLAUDE.md` 하단에 `## am-strategy 플러그인` 섹션 추가
- `이 프로젝트만`: `./CLAUDE.md` 하단에 동일 섹션 추가

섹션 내용:
```
## am-strategy 플러그인
- `@setup`: 플러그인 초기 설정
- `@help`: 사용 안내
- `@why-define`: STEP 1 — WHY 정의
- `@analyze-current`: STEP 2 — 현황 분석
- `@strategize`: STEP 3 — 전략 수립
- `@report`: 최종 Review + .docx/.pptx 변환
```

이 단계는 `ulw` 매직 키워드를 활용하여 수행.

### Step 7: 설치 결과 보고

설치된 항목·건너뛴 항목·추가 필요 조치를 표로 요약 출력.
`/am-strategy:help` 명령으로 사용법 확인을 안내.

## 스킬 위임

| 대상 | 목적 | 트리거 |
|------|------|--------|
| `/am-strategy:help` | 설치 후 사용법 안내 | Step 7 종료 시 |

## 상태 관리

설치 과정에서 중간 상태는 보존하지 않음 (일회성 실행).
재실행 시 이미 설치된 항목은 건너뛰고 누락된 항목만 설치.

## 문제 해결

| 증상 | 원인 | 해결 |
|------|------|------|
| `pip install` 실패 | Python 환경 미설정 | Python 3.9+ 설치 후 재시도 |
| API 키 미설정 경고 | `.env` 미작성 | `gateway/.env`에 GEMINI_API_KEY / GROQ_API_KEY 입력 |
| `anthropic-skills` 미설치 | 외부 플러그인 미설치 | `/report` 스킬 사용 전 별도 설치 필요 |
