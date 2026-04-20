# DMAP Office 문서 생성 패턴 정합화 계획서

> **목적**: `am-strategy` 플러그인의 PPT·Word 생성 파이프라인을  
> DMAP 표준(`{DMAP_PLUGIN_DIR}/resources/guides/office/*`) **2단계(PPT) / 1단계(DOCX) 패턴**에 맞춰 전환함.  
> **현재**: `anthropic-skills:docx/pptx`에 위임하는 구조(doc-exporter 1 에이전트).  
> **목표**: spec-writer 에이전트 + 오케스트레이터 직접 빌드(pptxgenjs / python-docx) 구조.

---

## 1. 배경 · 차이 요약

| 구분 | 현행 (am-strategy) | DMAP 표준 | 갭 |
|------|-------------------|-----------|----|
| PPT 생성 | `delegate_pptx` → `anthropic-skills:pptx` 위임 | `pptx-spec-writer`(명세 md) + Builder Skill(`pptxgenjs` `build.js` 직접 실행) | 에이전트 분리·외부 스킬 제거 필요 |
| DOCX 생성 | `delegate_docx` → `anthropic-skills:docx` 위임 | **spec 없음** · Builder Skill이 본문 md → `python-docx` `build.py` 직접 실행 | 위임 제거·본문 직결 구조로 전환 |
| 디자인 가이드 | `agents/doc-exporter/references/ppt-guide.md` (342줄, 경영진 보고 특화) | `{DMAP_PLUGIN_DIR}/resources/guides/office/pptx-build-guide.md` (패턴 A~F + 6절 검증 11항) | 가이드 경로·내용 정책 결정 필요 |
| 런타임 의존성 | `custom_tools`(Python 2종)만 등록 | `runtime_dependencies`(node+pptxgenjs, python+python-docx) | install.yaml 섹션 신설 필요 |
| 검증 루프 | anthropic-skills 미설치 graceful failure | 빌드 종료코드 + 파일 크기 + 자가 체크리스트(PPT 11항 · DOCX 12항) + 최대 3회 재시도 | 검증 프로토콜 강화 필요 |

---

## 2. 아키텍처 전환 Before → After

```
[Before]
strategy-report.md
   ↓
skills/report  →  agents/doc-exporter  →  anthropic-skills:docx / pptx (외부)
                   (delegate_docx·delegate_pptx)
                   ↓
               .docx / .pptx

[After]
strategy-report.md
   ↓
skills/report
 ├─ Phase 1: reviewer (유지)
 ├─ Phase 2: 사용자 옵션 (유지)
 ├─ Phase 3a: agents/pptx-spec-writer → spec.md                        (신규 2단계)
 ├─ Phase 3b: 오케스트레이터 직접 → build.js(pptxgenjs) → .pptx        (Node 직접 실행)
 ├─ Phase 4a: 오케스트레이터 직접 → build.py(python-docx) 요약본 → .docx (1단계)
 ├─ Phase 4b: 오케스트레이터 직접 → build.py(python-docx) 상세본 → .docx (1단계)
 └─ Phase 5: 인포그래픽 (generate_image · 유지)
```

---

## 3. 결정 필요 사항 (플랜 착수 전 사용자 확정)

### D1. ppt-guide.md 처리 방침
- **옵션 A (권장)**: 기존 `agents/doc-exporter/references/ppt-guide.md`를 **폐기**하고  
  `{DMAP_PLUGIN_DIR}/resources/guides/office/pptx-build-guide.md`를 **유일 기준**으로 사용.  
  장점: DMAP 표준 정합성 최대·중복 제거·6절 검증 11항 자동 상속.  
  단점: 기존 "경영진 소통 순서(왜→얼마→언제→어떻게→위험)" 등 전략보고 특화 규칙 유실.
- **옵션 B**: DMAP 가이드를 베이스로 두고, 전략보고 특화 추가 규칙만  
  `agents/pptx-spec-writer/references/am-ppt-addendum.md`로 분리하여 유지.
- **옵션 C**: 기존 `ppt-guide.md`로 **오버라이드**. DMAP 표준 참조 없이 로컬 가이드만 사용.  
  (가장 보수적이나 DMAP 정합성 낮음)
- **디폴트 제안**: **B** — DMAP 준수 + 경영진 표현 관례 유지.

### D2. DOCX 요약본·상세본 분리 방식
- **옵션 1 (권장)**: `skills/report`의 Phase 4에서 동일 `build.py`를 **두 번 호출**(입력 본문 다름). spec 없음.
- **옵션 2**: 단일 `build.py`가 `--mode executive|full` 인자로 분기.

### D3. 기존 agent 디렉토리 처리
- **옵션 α (권장)**: `agents/doc-exporter` → `agents/pptx-spec-writer`로 **개명**(역할 축소).  
  `delegate_docx` 툴 제거·DOCX 책임 skills/report로 이관.
- **옵션 β**: `doc-exporter` 폐기 + `pptx-spec-writer` 신규 생성(히스토리 단절).

---

## 4. 변경 작업 목록

### 4.1 신규 · 개명 · 삭제

| # | 경로 | 작업 | 근거 |
|---|------|------|------|
| T1 | `agents/pptx-spec-writer/AGENT.md` | **신규** (DMAP 템플릿 `pptx-spec-writer-AGENT.md` 복사 후 AM 도메인 섹션 보강) | DMAP 2단계 패턴 Phase 2 |
| T2 | `agents/pptx-spec-writer/agentcard.yaml` | **신규** (tier: MEDIUM — 패턴 매핑 판단 필요) | 명세 작성 품질을 위해 LOW 상향 |
| T3 | `agents/pptx-spec-writer/tools.yaml` | **신규** (`file_read`, `file_write`만 — 실행 도구 없음) | DMAP 원칙: 에이전트는 명세만 산출 |
| T4 | `agents/pptx-spec-writer/references/am-ppt-addendum.md` | **신규** (D1·B 선택 시 — 경영진 소통 순서, 6R 포트폴리오 매트릭스, TCO 곡선 슬라이드 특화 규칙) | 기존 ppt-guide.md에서 도메인 규칙만 추출 |
| T5 | `agents/doc-exporter/*` | **삭제 또는 개명**(D3) | 역할 소멸 |
| T6 | `agents/doc-exporter/references/ppt-guide.md` | D1 확정에 따라 처리 | — |

### 4.2 skills/report 재설계

| # | 변경점 | 상세 |
|---|-------|------|
| S1 | MUST/MUST NOT 업데이트 | `anthropic-skills:docx/pptx 위임` 금지로 반전. 빌더 스킬 직접 실행 명시. |
| S2 | Phase 3 분할 (`ulw`) | 3a(Spec 작성): Task → `am-strategy:pptx-spec-writer:pptx-spec-writer`, 프롬프트는 5항목(TASK/EXPECTED/MUST/MUST NOT/CONTEXT). 산출: `output/{project}/final/ppt-spec.md` |
| S3 | Phase 3b 신설 | `{DMAP_PLUGIN_DIR}/resources/guides/office/pptx-build-guide.md` **전체 필독**(특히 6절 11항). `output/{project}/final/build-pptx.js` Write → `node build-pptx.js` 실행 → `strategy-executive.pptx` 생성 → 검증 11항 실패 시 최대 3회 재빌드. |
| S4 | Phase 4 분할 (DOCX) | 4a: 요약본 본문 조립(WHY 2~3장 + 현황 5~7장 + 전략 10~15장 + 리스크 3~5장 + 결론 2~3장) → `build-docx-exec.py` Write → `python build-docx-exec.py` → `strategy-executive.docx` (≤30장). 4b: 상세본 본문 그대로 → `build-docx-full.py` → `strategy-report.docx` (≥100장). `docx-build-guide.md` 4절 12항 필독. |
| S5 | Phase 5 유지 | generate_image로 인포그래픽 생성(6R·Phase 로드맵·리스크 히트맵·TCO 곡선 등). 경로 `output/{project}/final/images/*.png`. |
| S6 | 검증 프로토콜 강화 | 빌드 종료코드==0 AND 파일 `>0바이트` AND 요약 장수≤30 AND 상세 장수≥100 AND PPT 11항 AND DOCX 12항. 실패 시 `claudeMd`의 "정직한 보고 규칙" 준수(완료 오보고 금지). |
| S7 | tier_mapping 참조 변경 | reviewer는 HIGH 유지. pptx-spec-writer는 MEDIUM. 오케스트레이터는 Claude Code 본체가 build 코드 작성하므로 별도 agent 위임 없음. |

### 4.3 gateway/install.yaml

```yaml
# 신규 섹션 추가
runtime_dependencies:
  - name: pptxgenjs
    description: "PPT 빌드용 Node.js 라이브러리"
    runtime: node                           # 사전 요구: node ≥ 18
    install: "npm install pptxgenjs"
    check: "node -e \"require('pptxgenjs')\""
    required: true

  - name: python-docx
    description: "DOCX 빌드용 Python 라이브러리"
    runtime: python                         # 사전 요구: python ≥ 3.9
    install: "pip install python-docx"
    check: "python -c \"import docx\""
    required: true
```

`custom_tools`(generate_image, convert_to_markdown)는 유지.

### 4.4 gateway/runtime-mapping.yaml

- `doc-exporter` 키 → `pptx-spec-writer`로 개명.  
- tier: **LOW → MEDIUM** (명세 작성의 판단 품질 확보).  
- tool_mapping은 변경 없음(신규 빌더는 builtin Bash/Write만 사용).

### 4.5 skills/setup/SKILL.md

| Step | 변경 |
|------|------|
| Step 3 | Python 의존성 + **Node 의존성(pptxgenjs)** 추가 안내. `npm --version` 체크, 미설치 시 안내. |
| Step 3 추가 | `install.yaml`의 `runtime_dependencies` 섹션을 **새 파서 로직**으로 처리(각 entry의 `check` 실행 → 실패 시 `install` 명령 제안). |
| Step 6 | **삭제** — `anthropic-skills` 설치 확인 불필요(의존 제거됨). |
| Step 7 | 라우팅 텍스트 유지(사용자 노출 변화 없음). |

---

## 5. 작업 순서 (권장 시퀀스)

```
[D1 · D2 · D3 사용자 확정]
      ↓
1. gateway/install.yaml  · runtime-mapping.yaml  업데이트     (검증: /setup 재실행)
      ↓
2. agents/pptx-spec-writer 신규 생성 (AGENT.md/agentcard.yaml/tools.yaml/addendum)
      ↓
3. skills/report  재설계 (Phase 3~5 분할)
      ↓
4. skills/setup   Step 3 확장 · Step 6 삭제
      ↓
5. agents/doc-exporter  제거 (D3 확정 후)
      ↓
6. 통합 시뮬레이션: 샘플 strategy-report.md → build.js · build.py 실행  (E2E)
      ↓
7. (선택) 문서 업데이트 — README.md, CLAUDE.md의 @report 설명
```

---

## 6. 검증 기준 (완료 판정)

- [ ] `gateway/install.yaml`의 `runtime_dependencies` 섹션 추가 확인
- [ ] `agents/pptx-spec-writer/` 3 파일(AGENT.md/agentcard.yaml/tools.yaml) 존재
- [ ] `skills/report/SKILL.md` Phase 3a/3b/4a/4b 4 분할 반영, anthropic-skills 언급 0건 (`grep -c anthropic-skills ≡ 0`)
- [ ] 샘플 `strategy-report.md` 입력 시: `.pptx`/`.docx` 3종 생성 + 각 파일 `> 0 바이트`
- [ ] PPT 6절 검증 11항 · DOCX 4절 12항 빌드 스크립트 내 구현(helper 함수 존재)
- [ ] reviewer Phase 1 독립 컨텍스트 실행 보존
- [ ] `gateway/runtime-mapping.yaml`에서 `doc-exporter` 키 부재, `pptx-spec-writer` 키 존재

---

## 7. 리스크 · 완화

| 리스크 | 영향 | 완화 |
|-------|-----|-----|
| pptxgenjs 빌드 스크립트 작성 시 6절 11항 미준수 | 슬라이드 깨짐 · 폰트 오류 | 빌더 스킬 Phase 3b에서 가이드 전체 로드 필수화 + 자가 검증 체크리스트 로그 출력 |
| 상세본 100장 이상 생성 시 build.py 메모리 | 빌드 실패 | 섹션별 분할 삽입 · 페이지 나눔 활용 (docx-build-guide 4-6) |
| 경영진 보고 고유 표현 규칙 유실 | 이해도 저하 | D1·B 선택 — addendum으로 보존 |
| node/python 미설치 환경 | setup 실패 | `check` 실행 후 명확한 설치 안내 + required: true 게이트 |
| 기존 산출물 `final/strategy-*.docx|pptx` 경로 하위 소비자(README, CLAUDE.md) | 문서 불일치 | 경로 **불변 유지**(Phase 3~4의 파일명 고정) |

---

## 8. 후속 오픈 이슈

- PPT에 **차트**(TCO 누적 곡선, 레이더, 히트맵)를 pptxgenjs `addChart`로 직접 생성할지,  
  `generate_image` 인포그래픽으로 대체할지 — Phase 3b 세부 설계에서 재결정.
- `strategy-executive.pptx`의 경영진 소통 순서(왜→얼마→언제→어떻게→위험)가  
  DMAP 템플릿 워크플로우(STEP 2)의 "표지→도입→본론→정리" 흐름과 **슬라이드 번호 레벨에서 어떻게 매핑되는가** — addendum에 표로 고정.
