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
- 모델 최신화 적용 여부: `최신 버전으로 업데이트` / `현재 설정 유지`
- `.env` 파일 생성 및 API Key 입력: `지금 입력 (대화형)` / `빈 템플릿 생성` / `나중에 수동 생성`
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

### Step 4: runtime-mapping.yaml 모델 최신화

`gateway/runtime-mapping.yaml`의 `tier_mapping` 모델을 검사하여 시스템 최신 모델 alias와 비교함.

기준 (시스템 환경 안내 기반 최신):
- HEAVY/HIGH → `claude-opus-4-7`
- MEDIUM → `claude-sonnet-4-6`
- LOW → `claude-haiku-4-5`

업데이트 절차:
1. 현재 `tier_mapping` 모델 ID를 추출하여 표로 출력 (default + 에이전트별 예외 포함)
2. 시스템 최신 alias와 차이를 비교 → 변경 후보 목록 생성
3. AskUserQuestion으로 다음을 확인:
   - "최신 모델로 업데이트하시겠습니까?" → `예 (전체 적용)` / `아니오 (현재 유지)` / `직접 선택`
4. 사용자가 동의 시 {tool:file_edit}로 `runtime-mapping.yaml`을 갱신
5. 변경 전후 diff를 표 형태로 보고

이 단계는 `ulw` 매직 키워드를 활용하여 수행.

### Step 5: `.env` 파일 생성 및 API Key 설정

커스텀 도구가 사용하는 환경변수:
- `GEMINI_API_KEY` (`generate_image.py`) — Google Gemini Nano Banana 이미지 생성
- `GROQ_API_KEY` (`convert-to-markdown.py`) — Groq VLM 이미지 설명

처리 절차:
1. `gateway/.env.example` 존재 여부 확인. 없으면 다음 내용으로 자동 생성:
   ```
   # am-strategy 커스텀 도구 환경변수 템플릿
   # 사용 시 .env로 복사 후 실제 키 입력
   GEMINI_API_KEY=
   GROQ_API_KEY=
   ```
2. `gateway/.env` 존재 여부 확인. 없으면 `.env.example`을 복사
3. AskUserQuestion으로 API Key 입력 방식을 수집:
   - `지금 입력 (대화형)` / `빈 템플릿만 생성 (나중에 수동 입력)` / `건너뛰기`
4. `지금 입력` 선택 시 AskUserQuestion으로 각 키를 개별 수집:
   - "GEMINI_API_KEY를 입력하세요 (없으면 빈 값으로 두기)"
   - "GROQ_API_KEY를 입력하세요 (없으면 빈 값으로 두기)"
   - 사용자가 입력한 값으로 `gateway/.env` 파일을 갱신 (빈 값은 그대로 유지)
5. 보안 주의 안내:
   - `.env`는 절대 git에 커밋 금지
   - `.gitignore`에 `gateway/.env` 등록 권장 (미등록 시 자동 추가)
6. 입력 결과 요약 (마스킹 처리 — 예: `GEMINI_API_KEY=AIza****...`)

### Step 6: anthropic-skills 설치 확인

doc-exporter 에이전트가 사용하는 `anthropic-skills:docx/pptx` 설치 여부 확인.
미설치 시 설치 안내 (선택 — required: false).

### Step 7: 활성화 라우팅 등록

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

### Step 8: 설치 결과 보고

설치된 항목·건너뛴 항목·추가 필요 조치를 표로 요약 출력.
모델 최신화 결과(변경 전/후)와 `.env` 키 설정 상태(마스킹)를 함께 표기.
`/am-strategy:help` 명령으로 사용법 확인을 안내.

## 스킬 위임

| 대상 | 목적 | 트리거 |
|------|------|--------|
| `/am-strategy:help` | 설치 후 사용법 안내 | Step 8 종료 시 |

## 상태 관리

설치 과정에서 중간 상태는 보존하지 않음 (일회성 실행).
재실행 시 이미 설치된 항목은 건너뛰고 누락된 항목만 설치.

## 문제 해결

| 증상 | 원인 | 해결 |
|------|------|------|
| `pip install` 실패 | Python 환경 미설정 | Python 3.9+ 설치 후 재시도 |
| API 키 미설정 경고 | `.env` 미작성 | `gateway/.env`에 GEMINI_API_KEY / GROQ_API_KEY 입력 |
| 모델 ID 인식 실패 | 최신 alias 미반영 | Step 4 재실행 또는 `runtime-mapping.yaml` 직접 수정 |
| `.env` git 노출 위험 | `.gitignore` 미등록 | `.gitignore`에 `gateway/.env` 추가 후 `git rm --cached gateway/.env` |
| `anthropic-skills` 미설치 | 외부 플러그인 미설치 | `/report` 스킬 사용 전 별도 설치 필요 |
