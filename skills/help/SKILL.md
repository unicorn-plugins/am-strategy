---
name: help
description: am-strategy 플러그인 사용 안내 — 명령 목록, 자동 라우팅, 3단계 워크플로우 사용 예시
type: utility
user-invocable: true
---

# Help

[HELP 활성화]

## 목표

am-strategy 플러그인의 사용 가능한 명령·자동 라우팅·3단계 워크플로우를 즉시 안내함.
토큰 절약을 위해 런타임 상주 파일 대신 이 스킬 호출 시에만 정보를 출력함.

## 활성화 조건

사용자가 `/am-strategy:help` 호출 시 또는 "am-strategy 도움말", "am 전략 사용법", "뭘 할 수 있어" 키워드 감지 시.

## 사용 안내

**중요: 추가적인 파일 탐색이나 에이전트 위임 없이, 아래 내용을 즉시 사용자에게 출력하세요.**

### 명령어

| 명령 | 설명 |
|------|------|
| `/am-strategy:setup` | 플러그인 초기 설정 (Python/Node 의존성·.env·라우팅) |
| `/am-strategy:help` | 사용 안내 (이 문서) |
| `/am-strategy:why-define` | **STEP 1** — WHY 정의 (비즈니스 동인 · L1 정량화 · 스폰서십 전략) |
| `/am-strategy:analyze-current` | **STEP 2** — 현황 분석 (인벤토리 · 건강도 · 6R/TIME · 서비스 경계) |
| `/am-strategy:strategize` | **STEP 3** — 전략 수립 (6R 상세 · 포트폴리오 · TCO/BEP · 리스크 · 거버넌스 · 변화관리) |
| `/am-strategy:report` | **최종** — 독립 검증 + `.docx` 2종 + `.pptx` 경영진 발표본 |

`@{skill-name}`으로 Skill 직접 호출 가능 (예: `@setup`, `@why-define`, `@report`).

### 자동 라우팅 (키워드 감지)

| 키워드 | 라우팅 스킬 |
|-------|-----------|
| "WHY", "동인", "스폰서십", "경영진" | `/am-strategy:why-define` |
| "인벤토리", "건강도", "6R", "TIME", "Event Storming" | `/am-strategy:analyze-current` |
| "6R 전략", "포트폴리오", "Phase", "TCO", "리스크", "거버넌스" | `/am-strategy:strategize` |
| "최종 보고서", ".docx", ".pptx", "경영진 발표" | `/am-strategy:report` |

### Quick Guide

```
1) /am-strategy:setup          ── 최초 1회
2) /am-strategy:why-define     ── STEP 1 (output/{project}/step1/*.md)
3) /am-strategy:analyze-current── STEP 2 (output/{project}/step2/*.md)
4) /am-strategy:strategize     ── STEP 3 (output/{project}/step3/*.md)
5) /am-strategy:report         ── 최종 (output/{project}/final/*.docx/.pptx)
```

### 에이전트 역할 요약

| 에이전트 | 티어 | 역할 |
|---------|:---:|------|
| why-definer | HIGH | WHY 정의 (동인·정량화·스폰서십) |
| inventory-analyst | MEDIUM | 인벤토리·건강도·기술부채·A/B/C |
| fit-analyzer | HIGH | 6R/TIME 매칭·Bounded Context |
| strategy-planner | HIGH | 6R 상세·Phase 구성·파일럿 |
| tco-analyst | MEDIUM | As-Is/To-Be TCO·BEP |
| risk-governance | HIGH | 리스크·회의체·가드레일·AI 정책 |
| change-manager | MEDIUM | 이해관계자·커뮤니케이션·교육·문화 |
| reviewer | HIGH | **독립 검증** (별도 컨텍스트) |
| pptx-spec-writer | MEDIUM | 경영진 PPT 시각 명세(.md) 작성 (DMAP 2단계 빌드 패턴 — 실 빌드는 report 스킬이 pptxgenjs 직접 실행) |

### 참조 자료 (플러그인 내장)

- `references/dora/` — DORA 2025 (8 md + 2 PDF)
- `references/6r/` — 6R/TIME 매칭 룰북 (7 md)
- `references/tco-benchmark/` — 한국 TCO 벤치마크 (5 md, 2025+ 검증)
- `skills/report/references/pptx-build-guide.md`, `docx-build-guide.md` — DMAP Office 빌드 가이드 로컬 복사본

### 사용 예시

```
사용자: /am-strategy:why-define
→ why-definer 에이전트가 기업 프로파일을 읽고 4S+혁신 동인 매핑 → L1 정량화 → 스폰서십 전략 → WHY 통합본을 output/{project}/step1/에 생성

사용자: /am-strategy:report
→ reviewer 독립 검증 → 장수·인포그래픽 옵션 질문 → pptx-spec-writer가 PPT 명세(ppt-spec.md) 작성 → report 스킬이 pptxgenjs build.js 직접 실행(.pptx) → python-docx build.py 직접 실행(요약본·상세본 .docx)
```

### 산출물 디렉토리 구조

```
output/{project}/
├── step1/                          # STEP 1 — WHY 정의
│   ├── 1-drivers.md
│   ├── 2-quant-L1.md
│   ├── 3-sponsorship.md
│   └── why-statement.md
├── step2/                          # STEP 2 — 현황 분석
│   ├── 1-inventory.md
│   ├── 2-abc.md
│   ├── 3-healthscore.md
│   ├── 4-techdebt-cost.md
│   ├── 5-fit-6r-time.md
│   ├── 6-bounded-context.md
│   └── 7-change-kickoff.md
├── step3/                          # STEP 3 — 전략 수립
│   ├── 1-6r-detail.md
│   ├── 2-portfolio-phase.md
│   ├── 3-tco-bep.md
│   ├── 4-risk.md
│   ├── 5-governance-guardrail.md
│   ├── 6-change-mgmt.md
│   └── strategy-report.md
└── final/                          # 최종 Office 산출물
    ├── ppt-spec.md                 # pptx-spec-writer 산출 (PPT 시각 명세)
    ├── build-pptx.js               # pptxgenjs 빌드 스크립트 (보존)
    ├── build-docx-executive.py     # 요약본 빌드 스크립트 (보존)
    ├── build-docx-full.py          # 상세본 빌드 스크립트 (보존)
    ├── strategy-executive.pptx     # 경영진 발표본 (≤35장)
    ├── strategy-executive.docx     # 경영진 요약본 (≤30장)
    ├── strategy-report.docx        # 실무진 상세본 (≥100장)
    └── images/*.png                # (선택) 인포그래픽
```

### 문제 해결

- 설치/설정 문제 → `/am-strategy:setup` 재실행
- `/report` 빌드 실패 → `/am-strategy:setup` 재실행하여 pptxgenjs·python-docx 설치 확인
