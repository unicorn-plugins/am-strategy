# AM Strategy

> 엔터프라이즈 시스템의 **AM(Application Modernization) 전환 전략**을 WHY 정의 → 현황 분석 → 전략 수립 3단계로 체계적·자동화 지원하는 DMAP 플러그인

---

## 개요

경영진 스폰서십 확보부터 시스템 인벤토리·건강도 진단, 6R/TIME 매핑, TCO/BEP 산정, 리스크·거버넌스 설계,
변화관리 기획까지 AM 전환 전략의 전 과정을 8+1명의 전문 에이전트와 DORA 2025·6R/TIME 룰북·한국 TCO 벤치마크
기반으로 수행함. 최종 산출물은 MS Word(.docx) 2종과 PowerPoint(.pptx) 경영진 발표본으로 변환됨.

**주요 기능:**
- STEP 1 **WHY 정의**: 4S+혁신 5 동인 매핑, DORA 5지표 L1 정량화, 경영진 스폰서십 3단계 전략
- STEP 2 **현황 분석**: 6 카테고리 인벤토리, 12차원 건강도, 기술부채(AI ROI 잠금 포함), 6R/TIME 8단계 룰북, Event Storming·VSM
- STEP 3 **전략 수립**: 6R 상세화, Phase 0~4 포트폴리오, TCO/BEP 3시나리오, 4영역 리스크, 5 거버넌스·가드레일·AI 정책, 변화관리
- **최종 보고**: 독립 검증(reviewer) + 경영진 요약(≤30장) + 실무진 상세(≥100장) + PPT 발표본 + 인포그래픽

---

## 설치

### 사전 요구사항

- [Claude Code](https://claude.com/claude-code) CLI 설치
- Python 3.9+ (커스텀 도구 실행용)
- (선택) `anthropic-skills` 플러그인 (최종 .docx/.pptx 변환 시)
- (선택) `GEMINI_API_KEY`, `GROQ_API_KEY` (인포그래픽 생성·Office 변환 시)

### 플러그인 설치

**방법 1: 마켓플레이스 — GitHub (권장)**

```bash
# 1. GitHub 저장소를 마켓플레이스로 등록
claude plugin marketplace add unicorn-plugins/am-strategy

# 2. 플러그인 설치
claude plugin install am-strategy@am-strategy

# 3. 설치 확인
claude plugin list
```

**방법 2: 마켓플레이스 — 로컬**

```bash
# 1. 로컬 경로를 마켓플레이스로 등록
claude plugin marketplace add /path/to/am-strategy

# 2. 플러그인 설치
claude plugin install am-strategy@am-strategy

# 3. 설치 확인
claude plugin list
```

**방법 3: 프로젝트 디렉토리에서만 동작하게 설치**

```bash
cd /path/to/am-strategy
claude --plugin-dir .
```

> **설치 후 setup 스킬 실행:**
> ```
> /am-strategy:setup
> ```
> - `gateway/install.yaml` 기반 커스텀 도구 의존성 안내 + pip 설치 옵션
> - `.env` 템플릿 복사 가이드 (GEMINI_API_KEY / GROQ_API_KEY)
> - `anthropic-skills` 설치 여부 확인
> - 활성화 라우팅 테이블 등록 (모든 프로젝트 / 이 프로젝트만 선택)

### 처음 GitHub을 사용하시나요?

다음 가이드를 참고하세요:

- [GitHub 계정 생성 가이드](https://github.com/unicorn-plugins/gen-ma-plugin/blob/main/resources/guides/github/github-account-setup.md)
- [Personal Access Token 생성 가이드](https://github.com/unicorn-plugins/gen-ma-plugin/blob/main/resources/guides/github/github-token-guide.md)

---

## 업그레이드

### Git Repository 마켓플레이스

```bash
claude plugin marketplace update am-strategy
claude plugin install am-strategy@am-strategy
claude plugin list
```

> **갱신이 반영되지 않는 경우**: 플러그인을 삭제 후 재설치함.
> ```bash
> claude plugin remove am-strategy@am-strategy
> claude plugin marketplace update am-strategy
> claude plugin install am-strategy@am-strategy
> ```

### 로컬 마켓플레이스

```bash
cd /path/to/am-strategy
git pull origin main
claude plugin marketplace update am-strategy
claude plugin install am-strategy@am-strategy
```

> **setup 재실행**: 업그레이드 후 `gateway/install.yaml`에 새 도구가 추가된 경우
> `/am-strategy:setup`을 재실행하여 누락된 도구를 설치할 것.

---

## 사용법

### 슬래시 명령

| 명령 | 설명 |
|------|------|
| `/am-strategy:setup` | 플러그인 초기 설정 |
| `/am-strategy:help` | 사용 안내 (명령 목록·자동 라우팅·워크플로우) |
| `/am-strategy:why-define` | **STEP 1** — WHY 정의 |
| `/am-strategy:analyze-current` | **STEP 2** — 현황 분석 |
| `/am-strategy:strategize` | **STEP 3** — 전략 수립 |
| `/am-strategy:report` | **최종** — 독립 검증 + Word/PPT 변환 |

### 사용 예시

```
사용자: /am-strategy:why-define
→ why-definer 에이전트가 기업 프로파일을 읽고
  1) 4S+혁신 동인 매핑 → output/{project}/step1/1-drivers.md
  2) DORA 5지표 L1 정량화 → 2-quant-L1.md
  3) 경영진 스폰서십 3단계 전략 → 3-sponsorship.md
  4) WHY 통합 보고서 → why-statement.md

사용자: /am-strategy:report
→ reviewer가 독립 검증 → 출력 장수 질문 →
  doc-exporter가 anthropic-skills:docx/pptx에 위임 →
  경영진 요약·실무진 상세·PPT 발표본 생성
```

### 3단계 권장 워크플로우

```
1) /am-strategy:setup              ── 최초 1회
2) /am-strategy:why-define         ── STEP 1
3) /am-strategy:analyze-current    ── STEP 2
4) /am-strategy:strategize         ── STEP 3
5) /am-strategy:report             ── 최종 산출
```

---

## 에이전트 구성

| 에이전트 | 티어 | 역할 |
|----------|:---:|------|
| `why-definer` | HIGH | WHY 정의 — 비즈니스 동인 / L1 정량화 / 경영진 스폰서십 전략 |
| `inventory-analyst` | MEDIUM | 시스템 인벤토리 / 건강도 12차원 / 기술부채 / A/B/C 등급 |
| `fit-analyzer` | HIGH | 6R/TIME 8단계 룰북 / Event Storming / Bounded Context / VSM |
| `strategy-planner` | HIGH | 6R 상세화 / 포트폴리오 Phase / 파일럿 / 전략 통합 보고서 |
| `tco-analyst` | MEDIUM | As-Is/To-Be TCO / BEP 3·5년 / DORA 5 분리 항목 |
| `risk-governance` | HIGH | 4영역 리스크 / 5 거버넌스 회의체 / 가드레일 / AI 정책 3-bucket |
| `change-manager` | MEDIUM | 이해관계자 맵 / Phase별 커뮤니케이션·교육 / 조직·문화·측정 전환 |
| `reviewer` | HIGH | **독립 검증** (별도 컨텍스트) — 정합성·일관성·커버리지·파일럿·게이트 |
| `doc-exporter` | LOW | `.docx` 2종 + `.pptx` + 인포그래픽 (anthropic-skills 위임) |

---

## 요구사항

### 필수 도구

| 도구 | 유형 | 용도 |
|------|------|------|
| `generate_image.py` | Custom (Python) | Gemini Nano Banana 기반 인포그래픽 생성 |
| `convert-to-markdown.py` | Custom (Python) | Office 문서(.xlsx/.docx/.pptx) → Markdown 변환 |

### 선택 도구

| 도구 | 용도 |
|------|------|
| `anthropic-skills:docx` | 최종 Word 문서 변환 |
| `anthropic-skills:pptx` | 최종 PowerPoint 발표본 생성 |

### 런타임 호환성

| 런타임 | 지원 |
|--------|:----:|
| Claude Code | 지원 |
| Codex CLI | 미검증 |
| Gemini CLI | 미검증 |

### 내장 참조 자료

| 자원 | 경로 | 용량 |
|------|------|------|
| DORA 2025 분석 | `references/dora/` | 8 md + 2 PDF (239 페이지) |
| 6R/TIME 룰북 | `references/6r/` | 7 md (8단계 결정 알고리즘 포함) |
| 한국 TCO 벤치마크 | `references/tco-benchmark/` | 5 md (2025+ 검증) |

---

## 디렉토리 구조

```
am-strategy/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/
│   ├── setup/SKILL.md
│   ├── help/SKILL.md
│   ├── why-define/SKILL.md
│   ├── analyze-current/SKILL.md
│   ├── strategize/SKILL.md
│   └── report/SKILL.md
├── agents/
│   ├── why-definer/ {AGENT.md, agentcard.yaml, tools.yaml}
│   ├── inventory-analyst/ {...}
│   ├── fit-analyzer/ {...}
│   ├── strategy-planner/ {...}
│   ├── tco-analyst/ {...}
│   ├── risk-governance/ {...}
│   ├── change-manager/ {...}
│   ├── reviewer/ {...}
│   └── doc-exporter/ {..., references/ppt-guide.md}
├── gateway/
│   ├── install.yaml
│   ├── runtime-mapping.yaml
│   ├── tools/ {generate_image.py, convert-to-markdown.py}
│   └── .env.example
├── commands/ {setup.md, help.md, why-define.md, analyze-current.md, strategize.md, report.md}
├── references/ {dora/, 6r/, tco-benchmark/, am/, ai/, am-strategy/}
└── README.md
```

---

## 라이선스

MIT License — © 2026 hiondal (hiondal@gmail.com)
