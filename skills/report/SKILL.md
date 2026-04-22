---
name: report
description: 최종 Review + DMAP 표준 Office 빌드(PPT 2단계·DOCX 1단계) 오케스트레이션 — reviewer 독립 검증 후 경영진 요약·실무진 상세·PPT 발표본 생성
type: orchestrator
user-invocable: true
---

# Report

[REPORT 활성화]

## 목표

최종 단계 워크플로우를 오케스트레이션함.
- **Phase 1**: `reviewer` 에이전트가 독립 컨텍스트에서 산출물 검증
- **Phase 2**: 사용자 옵션 수집 (요약본 장수·상세본 장수·인포그래픽 목록)
- **Phase 3**: PPT — `pptx-spec-writer` 에이전트가 명세 작성 → 오케스트레이터가 `pptxgenjs`로 `build.js` 직접 작성·실행
- **Phase 4**: DOCX — 오케스트레이터가 `python-docx`로 `build.py` 직접 작성·실행 (요약본·상세본 2회)
- **Phase 5**: (선택) `generate_image`로 인포그래픽 PNG 생성
- **Phase 6**: 완료 보고

**DMAP 표준 Office 빌드 패턴 준수** (가이드는 플러그인 내 로컬 복사본 사용):
- PPT: 2단계(Spec Agent + Orchestrator Builder) — `{PLUGIN_DIR}/skills/report/references/pptx-build-guide.md`
- DOCX: 1단계(Orchestrator Builder 단독 — 본문이 곧 명세) — `{PLUGIN_DIR}/skills/report/references/docx-build-guide.md`
- 외부 변환 스킬(`anthropic-skills:docx/pptx` 등) **의존 제거**

## 활성화 조건

사용자가 `/am-strategy:report` 호출 시 또는 "최종 보고서", ".docx", ".pptx", "경영진 발표" 키워드 감지 시.

## 에이전트 호출 규칙

### 에이전트 FQN

| 에이전트 | FQN | 주 담당 |
|----------|-----|---------|
| reviewer | `am-strategy:reviewer:reviewer` | Phase 1 (독립 검증) |
| pptx-spec-writer | `am-strategy:pptx-spec-writer:pptx-spec-writer` | Phase 3a (PPT 명세 작성) |

### 프롬프트 조립
- 각 에이전트의 `AGENT.md` + `agentcard.yaml` + `tools.yaml` 3파일 합쳐 프롬프트 조립
- `gateway/runtime-mapping.yaml`의 `tier_mapping` 참조:
  - reviewer: HIGH → `claude-opus-4-7`
  - pptx-spec-writer: MEDIUM → `claude-sonnet-4-6`
- `Agent(subagent_type=FQN, model=매핑된 모델, prompt=조립된 프롬프트)` 호출

### reviewer 독립 실행 주의사항

- reviewer는 **별도 컨텍스트로 분리 실행** — 다른 에이전트의 작업 맥락을 공유하지 않음
- 원저자 에이전트(why-definer 등)가 reviewer와 동일 세션에서 실행된 경우에도,
  reviewer 호출 시 새로운 subagent 컨텍스트로 스폰하여 독립성 확보

### DOCX 빌드는 위임 없이 오케스트레이터가 직접 수행

- DMAP 1단계 패턴: 본문 md가 곧 명세 → `python-docx` `build.py`를 Claude Code 직접 작성·실행
- 별도 spec-writer 에이전트 없음 (위 테이블에 docx-spec-writer 없음이 의도적임)

### 서브 에이전트 호출
워크플로우 단계에 `Agent: {agent-name}`이 명시된 경우,
메인 에이전트는 해당 단계를 직접 수행하지 않고,
반드시 위 프롬프트 조립 규칙에 따라 해당 에이전트를 호출하여 결과를 받아야 함.

서브에이전트 호출 없이 메인 에이전트가 해당 산출물을 직접 작성하면
스킬 미준수로 간주함.

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
- 인포그래픽 이미지 생성 여부 + 목록 (am-ppt-addendum §6 파일명 규칙 참조)
- PPT 목표 슬라이드 수 (기본 20~35장)

REJECTED인 경우 보완 권고를 사용자에게 제시하고 해당 스킬(`/why-define`, `/analyze-current`, `/strategize`) 재실행 안내 후 종료.

### Phase 3a: PPT 명세 작성 → Agent: pptx-spec-writer (`ulw` 활용)

- **TASK**: `strategy-report.md` + step1~2 산출물을 분석하여 경영진 PPT 시각 명세 작성
- **EXPECTED OUTCOME**: `output/{project}/final/ppt-spec.md` (패턴 A~F 매핑, 5 스테이지 골격, 이미지 참조 포함)
- **MUST DO**:
  - `{PLUGIN_DIR}/agents/pptx-spec-writer/references/pptx-build-guide.md` 1~5절 필독
  - `{PLUGIN_DIR}/agents/pptx-spec-writer/references/am-ppt-addendum.md` 필독 (5 스테이지·3 시나리오·룰 트레이스·이미지 파일명)
  - 슬라이드당 본문 ≤7줄, 이미지는 `![설명](images/파일명.png)` 형식
  - Executive Summary 1장을 표지 직후 배치
- **MUST NOT DO**: 실제 PPT 파일 생성 금지, 컬러·폰트 직접 지정 금지(가이드 표준 사용), 단일 숫자 수치 표기 금지
- **CONTEXT**: `output/{project}/step3/strategy-report.md`, step1~2 하위, DMAP 가이드 경로, addendum 경로, Phase 2 응답

### Phase 3b: PPT 파일 빌드 (오케스트레이터 직접 수행 — `ulw` 활용)

**외부 스킬 위임 없이 오케스트레이터가 직접 수행**:

1. **가이드 로드**: `{PLUGIN_DIR}/skills/report/references/pptx-build-guide.md` 전체 읽기
   (특히 6절 "코드 생성 시 필수 검증 규칙" 11항 모두 준수)
2. **Spec 분석**: Phase 3a의 `ppt-spec.md` 읽고 슬라이드별 패턴(A~F) 매핑
3. **빌드 코드 작성**: Write 도구로 `output/{project}/final/build-pptx.js` 생성
   - pptxgenjs 사용
   - **반드시 가이드 6절 전체 규칙 준수**:
     - `pptx.shapes.RECTANGLE`/`ROUNDED_RECTANGLE` 사용 (`ShapeType` 금지)
     - `defineLayout({name:"CUSTOM", width:16, height:9})`
     - `async function createSlideXX(pptx)` 패턴
     - `slide.addTable()` 사용 (수동 셀 그리기 금지)
     - `fs12()` 헬퍼로 12pt 미만 폰트 차단
     - 이미지 임베딩 전 경로·크기 검증
     - Pretendard 폰트 통일
     - `main().catch(e => { console.error(...); process.exit(1); })` 진입점
4. **빌드 실행**: Bash로 `cd output/{project}/final && node build-pptx.js` 실행
   → `output/{project}/final/strategy-executive.pptx` 생성
   - 전제: `pptxgenjs`가 **플러그인 루트**(`am-strategy/node_modules/`)에 설치됨
     (Node 해석 경로: `final → {project} → output → am-strategy/node_modules` ✓)
   - `Cannot find module 'pptxgenjs'` 발생 시 `/am-strategy:setup` 재실행하여 플러그인 루트에 설치
5. **검증 A — 빌드 확인**:
   - 빌드 종료 코드 0 확인
   - `.pptx` 파일 존재 및 0바이트 초과 확인
   - 자가 검증 체크리스트 11항 통과
   - 실패 시 에러 분석 → 코드 수정 → 재실행 (최대 3회)
6. **검증 B — PowerShell COM 시각적 검토**:
   - 아래 PS1 템플릿으로 `.temp/export-pptx.ps1`을 생성 후 슬라이드별 PNG 추출
   ```powershell
   $pptxPath = '<절대경로\strategy-executive.pptx>'
   $outDir   = '<절대경로\preview>'
   if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
   Add-Type -AssemblyName Microsoft.Office.Interop.PowerPoint
   $ppt  = New-Object -ComObject PowerPoint.Application
   $pres = $ppt.Presentations.Open($pptxPath, 0, 0, 0)
   foreach ($i in 1..$pres.Slides.Count) {
       $pres.Slides.Item($i).Export("$outDir\slide-$i.png", 'PNG', 1600, 900)
   }
   $pres.Close(); $ppt.Quit()
   ```
   - PowerShell 실행 전 `Get-Process POWERPNT -ErrorAction SilentlyContinue | Stop-Process -Force`로 파일 잠금 해제
   - 추출된 PNG를 Read 도구로 열어 레이아웃·이미지 비율·텍스트 잘림 시각 확인
   - 이상 발견 시 `build-pptx.js` 수정 → 재빌드 → 재검토 (최대 2회)
   - **기존 이미지 파일(`images/` 폴더)은 절대 삭제하지 말 것 — 레이아웃·크기만 조정**
   - 시각 검토 완료 후 임시 파일 정리: `Remove-Item '<preview경로>\*.png' -Force; Remove-Item '.temp\export-pptx.ps1' -Force`

### Phase 4a: 경영진 요약본 DOCX (오케스트레이터 직접 수행 — `ulw` 활용)

DMAP 1단계 패턴 — spec 단계 없이 본문이 곧 명세.

1. **가이드 로드**: `{PLUGIN_DIR}/skills/report/references/docx-build-guide.md` 전체 읽기
   (특히 4절 "코드 생성 시 필수 검증 규칙" 12항)
2. **요약 본문 조립**: `strategy-report.md`에서 다음 구조로 압축 발췌
   - WHY 2~3 섹션 + 현황 핵심 5~7 섹션 + 전략 핵심 10~15 섹션 + 리스크·거버넌스 3~5 섹션 + 결론 2~3 섹션
   - 경영진 소통 순서(왜→얼마→언제→어떻게→위험) 유지
   - 차트·표는 원본 그대로 유지
3. **빌드 코드 작성**: Write 도구로 `output/{project}/final/build-docx-executive.py` 생성
   - python-docx 사용
   - **반드시 가이드 4절 전체 규칙 준수**:
     - 헤딩은 `add_heading(text, level)` (목차 추출 가능)
     - 표는 `add_table(rows, cols)`, 헤더 행 별도 스타일
     - 이미지 경로 검증 후 `add_picture(path, width=Inches(6))`
     - 한글 폰트(`set_korean_font` · `<w:rFonts w:eastAsia="맑은 고딕"/>`) 명시
     - 셀 배경색 `apply_cell_shading()` 헬퍼
     - 페이지 나눔(`WD_BREAK.PAGE`) 명시
     - `if __name__ == "__main__":` + 예외 처리 + `sys.exit()`
4. **빌드 실행**: `cd output/{project}/final && python build-docx-executive.py`
   → `output/{project}/final/strategy-executive.docx` 생성 (≤30장)
5. **검증**: 빌드 종료 코드 0 + 파일 `>0바이트` + 가이드 12항 체크 + 장수 조건 (최대 3회 재빌드)

### Phase 4b: 실무진 상세본 DOCX (오케스트레이터 직접 수행 — `ulw` 활용)

Phase 4a와 동일 패턴, **본문만 다름**:

1. 가이드는 Phase 4a에서 이미 로드 — 재로드 불필요
2. **상세 본문**: `strategy-report.md` + step1~3 산출물 **전부 포함**
   - 근거 출처 전체 인용
   - 부록: 14개 누락 체크리스트·14개 속성 정의·8단계 알고리즘 rule_trace·AI 정책 3-bucket 상세
3. **빌드 코드 작성**: Write 도구로 `output/{project}/final/build-docx-full.py` 생성 (구조 동일, 본문 dict만 다름)
4. **빌드 실행**: `cd output/{project}/final && python build-docx-full.py`
   → `output/{project}/final/strategy-report.docx` 생성 (≥100장)
5. **검증**: 동일 기준 (12항 + 장수 조건)

### Phase 5: 인포그래픽 생성 (선택) → generate_image 커스텀 도구

Phase 2에서 요청된 경우만 수행:

- **TASK**: am-ppt-addendum §6 파일명 규칙에 따라 인포그래픽 N종 생성
- **EXPECTED OUTCOME**: `output/{project}/final/images/*.png`
- **MUST DO**: generate_image 도구의 프롬프트를 `pptx-build-guide` 팔레트(Pretendard·`#2C2926`·`#059669` 등)에 맞게 설계
- **MUST NOT DO**: API 키(`GEMINI_API_KEY`) 미설정 시 실패를 은폐하지 말고 명확히 보고
- **순서**: Phase 3a 이전에 수행하면 pptx-spec-writer가 실제 이미지 경로를 인식할 수 있음. Phase 3b 이전에만 완료되면 됨.

### Phase 6: 완료 보고 (`ulw` 활용)

생성된 파일 목록·크기·검증 통과 여부·빌드 스크립트 경로를 표로 요약:

| 산출물 | 경로 | 크기 | 페이지/슬라이드 | 빌드 스크립트 | 검증 |
|--------|------|------|-----------------|---------------|------|
| 경영진 발표본 | `output/{project}/final/strategy-executive.pptx` | ... | ... | `build-pptx.js` | PPT 11항 ✅ |
| 경영진 요약본 | `output/{project}/final/strategy-executive.docx` | ... | ≤30장 | `build-docx-executive.py` | DOCX 12항 ✅ |
| 실무진 상세본 | `output/{project}/final/strategy-report.docx` | ... | ≥100장 | `build-docx-full.py` | DOCX 12항 ✅ |
| 인포그래픽 | `output/{project}/final/images/*.png` | ... | N종 | generate_image | 파일 존재 ✅ |

## 완료 조건

- [ ] reviewer 검증 보고서 생성 및 판정 완료
- [ ] `ppt-spec.md` 생성 (pptx-spec-writer 산출)
- [ ] `build-pptx.js` 생성 및 `strategy-executive.pptx` 빌드 성공 (11항 통과)
- [ ] `build-docx-executive.py` 생성 및 `strategy-executive.docx` 빌드 성공 (12항 + ≤30장)
- [ ] `build-docx-full.py` 생성 및 `strategy-report.docx` 빌드 성공 (12항 + ≥100장)
- [ ] (선택) 인포그래픽 N종 생성 및 경로 검증
- [ ] 모든 산출물이 `output/{project}/final/` 하위에 위치

## 검증 프로토콜

- Phase 3b/4a/4b 완료 후 Bash `wc -c` 또는 Read로 산출 파일 크기 > 0 확인
- 빌드 종료 코드 0 확인 (`$?`)
- Phase 5 완료 후 이미지 파일 존재 확인
- 빌드 스크립트(build-pptx.js / build-docx-*.py)도 산출물로 보존 → 재빌드·디버깅 가능
- 실패 시 에러 원문 그대로 사용자 보고 (정직한 보고 규칙)
- pptxgenjs·python-docx 미설치 시: `/am-strategy:setup`의 runtime_dependencies 설치 단계 재실행 안내

## MUST / MUST NOT

**MUST**
- Phase 순차 수행 및 완료 시마다 사용자 보고
- Phase 1은 반드시 reviewer 에이전트 **독립 컨텍스트**로 실행
- Phase 3a는 pptx-spec-writer 에이전트 위임 (5항목 프롬프트)
- Phase 3b·4a·4b는 오케스트레이터가 **직접** 빌드 코드 작성·실행
- Phase 3b 시작 시 `pptx-build-guide.md` 전체(특히 6절 11항) 읽기
- Phase 4a 시작 시 `docx-build-guide.md` 전체(특히 4절 12항) 읽기
- 빌드 스크립트(`build-*.js/.py`)를 산출물로 보존
- 실제 `.pptx`/`.docx` 파일 생성 및 0바이트 초과 검증

**MUST NOT**
- `anthropic-skills:docx/pptx` 등 외부 변환 스킬 호출
- spec-writer 에이전트 우회 (오케스트레이터가 PPT 명세 직접 작성 금지)
- DOCX용 별도 spec-writer 에이전트 생성 (1단계 패턴)
- Phase 순서 건너뛰기
- 가이드 미독상태로 빌드 코드 작성
- 검증 없이 "생성 완료" 보고 (정직한 보고 규칙)
- 시각적 검토 후 수정 시 `images/` 폴더의 기존 이미지 파일 삭제 (레이아웃·크기 조정만 허용)

## 상태 정리

완료 시 별도 상태 파일 없음. 빌드 스크립트 3종은 산출물과 함께 보존.

## 취소

사용자 "cancelomc" 또는 "stopomc" 요청 시 즉시 중단.

## 재개

Phase 단위로 재개 가능:
- Phase 3a·3b: 독립적 (spec.md가 존재하면 3b만 재실행 가능)
- Phase 4a·4b: 독립적 (요약·상세 각각 재빌드 가능)
- Phase 5: 독립적 (인포그래픽만 재생성 가능)
