# DORA AI Capabilities Model — 실행 가이드

> 본 문서는 별도 발간된 **97페이지 DORA AI Capabilities Model 가이드** (2025.12)
> ([`2025_dora_ai_capabilities_model.pdf`](2025_dora_ai_capabilities_model.pdf))
> 의 7개 역량별 **구체적 실행 방법·측정·안티패턴**을 정리한 실무 참조 자료.
>
> [`03-ai-capabilities-model.md`](03-ai-capabilities-model.md) 가 "무엇을·왜"를 다룬다면,
> 본 문서는 **"어떻게"** 를 다룬다.
>
> AM 전환의 **STEP 3-1 (6R 전략 상세화)** 에서 To-Be 아키텍처/프로세스 설계 시
> `strategy-planner`, `risk-governance`, `change-manager` 에이전트가 직접 활용.

---

## 사용법 권고

| 시나리오 | 활용 방법 |
|---------|---------|
| AM 전환 베이스라인 측정 | 각 역량의 **DORA 설문 질문**을 사내 설문으로 활용 |
| 6R 전략 상세화 | 각 역량의 **"How to improve"** 섹션을 To-Be 설계에 반영 |
| Phase별 가드레일 | 각 역량의 **"Common obstacles"** 를 가드레일 점검 항목으로 |
| 변화관리 메시지 | 각 역량의 **"Why this matters"** 를 임원 보고에 인용 |
| 측정 체계 구축 | 각 역량의 **"How to measure"** 섹션을 KPI 설계에 사용 |

---

## 역량 1: Clear and Communicated AI Stance

### 효과
- 개인 효과성 ↑ (Large increase)
- 조직 성과 ↑
- 처리량 ↑
- 마찰 ↓

### "성공적 정책"의 2가지 속성

| 속성 | 의미 |
|------|------|
| **Comprehensible** | 잘 정의되고 이해하기 쉬우며 실용적인 가드레일 제공 |
| **Communicated** | 개발팀 전반에 널리 알려지고 접근 가능 |

### 4가지 명확성 영역

1. **Expectation of use**: AI 사용이 기대되는가?
2. **Support**: AI 실험을 지원하는가?
3. **Permission**: 어떤 AI 도구가 허용되는지 명확한가?
4. **Applicability**: AI 정책이 본인 역할에 직접 적용되는가?

### "3-Bucket" 정책 프레임워크 (DORA 권장)

| Bucket | 정의 | 예시 |
|--------|------|------|
| **Prohibited** | 고위험·수용 불가 | 고객 PII·영업비밀을 공개 AI 모델에 입력 |
| **Permitted with Guardrails** | 특정 통제 하에 허용 | 사내 AI 도구로만 독점 소스 코드 사용; 모든 AI 생성 코드는 human-in-the-loop |
| **Allowed** | 저위험·고가치 (적극 권장) | 보일러플레이트 생성, 비독점 데이터로 브레인스토밍 |

### 안티패턴

| 안티패턴 | 결과 |
|---------|------|
| **Treating policy as static** | 변화하는 AI 환경에 부적합 |
| **Changing too frequently** | 팀이 흡수할 시간 부족 — 차라리 정책 없는 게 나을 수도 |
| **Myopic view** | 한 그룹(법무·보안)만 만든 정책은 현실에서 작동 X |

### 측정

**핵심 설문 질문**:
- 직장에서 AI 사용이 얼마나 의무적으로 느껴지는가?
- 조직이 AI 실험을 얼마나 지원하는가?
- 어떤 AI 도구를 사용 가능한지가 얼마나 명확한가?
- AI 정책이 본인 업무에 얼마나 직접 적용되는가?

**보조 측정**:
- AI 정책 페이지 조회수
- 공개 채널에서 AI 정책 관련 질문 수

### AM 적용 — STEP 3-5 (거버넌스) 통합

- **Phase 0**: 임원 후원 + cross-functional 워킹그룹 (엔지니어링·법무·보안·IT·제품)
- **Phase 1**: 3-bucket 정책 초안 + 내부 포털에 living document 게재
- **Phase 2~**: 분기별 검토 사이클, 피드백 루프 운영

---

## 역량 2: Healthy Data Ecosystems

### 효과
- 조직 성과 ↑

### 정의 — 3가지 측면

1. 내부 데이터가 **견고하고 신뢰할 만함** (AI 컨텍스트로 적합)
2. 데이터가 **모든 필요한 팀·시스템에 접근 가능**
3. 데이터가 **사일로화되지 않음** — 통일된 뷰

### "How to Improve" 5단계

| 단계 | 활동 |
|------|------|
| 1 | **임원 후원 확보** — 권한·예산·가시적 지원 |
| 2 | **데이터 거버넌스 투자** — Critical 데이터 도메인별 owner/steward 지정 |
| 3 | **단일 진실의 원천(Single Source of Truth)** 우선 식별 |
| 4 | **데이터 품질 프레임워크** — 자동 정확성·완전성·시의성 검증 |
| 5 | **데이터 접근 민주화** — 보안 통제와 함께 발견·접근 도구 |

### 팀 차원 시작점
- 핵심 데이터셋을 README.md의 "data" 섹션에 문서화
- 메타데이터를 코드 아티팩트로 다룸 (versioned, alongside data)

### 안티패턴

| 안티패턴 | 설명 |
|---------|------|
| **Data as a by-product** | 트랜잭션의 부산물로만 보고, 제품으로 다루지 않음 |
| **The tool is the silo** | 특정 도구의 의견(opinionated approach)에 갇혀 사일로 생성 |

### 측정

**DORA 설문 질문**:
- 필요한 내부 데이터 소스를 얼마나 쉽게 접근·분석 가능?
- 데이터 사일로 때문에 중요한 내부 데이터를 사용하지 못하는 빈도?
- 일반적으로 의존하는 데이터의 품질을 어떻게 평가?
- 특정 데이터를 1시간 내 명확히 답을 얻을 가능성은?

**보조 측정**:
| 영역 | 측정 |
|------|------|
| 데이터 사고 | 데이터 품질로 인한 버그·운영 사고·고객 보고 결함 수 |
| 데이터 품질 | 자동 검증 통과율 (정확성·완전성·시의성) |
| 데이터 신선도 | 메타데이터 (last updated 타임스탬프) |

### AM 적용 — STEP 3-1 (6R) 통합

- 데이터베이스·메시징 등 **데이터 계층 모더나이즈**를 6R에서 우선순위 ↑
- "데이터 통합" 별도 워크스트림으로 Phase 1' (파일럿) 후보

---

## 역량 3: AI-accessible Internal Data

### 효과
- 개인 효과성 ↑ (Large increase)
- 코드 품질 ↑ (Large increase)

### 핵심 개념: Prompt Engineering → Context Engineering

> "프롬프트 엔지니어링은 AI에게 단일 명령을 주는 것.
> 컨텍스트 엔지니어링은 일을 시작하기 전에 **완전한 브리핑 패킷**을 주는 것."

브리핑 패킷에 포함되어야 할 것:
- **Company data**: "여기 우리 코드베이스와 코딩 스타일 가이드"
- **Latest information**: "여기 사용하는 라이브러리의 최신 API 문서"
- **Tools and rules**: "따라야 할 정책과 사용 가능한 도구"

### "How to Improve" — 4단계 진화

#### Phase 1: Foundational and Manual
- 프롬프트 엔지니어링 → 수동 컨텍스트 엔지니어링
- 공유·버전 관리되는 **컨텍스트 템플릿 라이브러리** 구축
- 가장 중요한 내부 문서 우선 정비

#### Phase 2: Tool-assisted (RAG, MCP)
- Retrieval-Augmented Generation (RAG) 도입
- Model Context Protocol (MCP) 서버로 도구 통합
- 인덱싱 + 시맨틱 검색 인프라

#### Phase 3: Continuous AI
- 지속적으로 컨텍스트 업데이트
- 자동화된 워크플로우에 AI 에이전트 통합

#### Phase 4: Specialized Expert Systems
- 도메인별 fine-tuned 모델
- 자동 critique-and-refine 루프

### AM 적용

- AM 후 To-Be에 **RAG·MCP·벡터 DB·내부 검색** 인프라 포함
- 단순 Lift & Shift는 효과 제한 → Replatform/Refactor 권장
- "AI 가능한 컨텍스트 인프라" 를 별도 TCO 항목으로 분리

---

## 역량 4: Strong Version Control Practices

### 효과
- 개인 효과성 ↑ (commit 빈도 효과)
- 팀 성과 ↑ (rollback 활용 효과)

### 핵심 발견

> AI는 코드 생성 속도를 가속하지만, **큰 단위 변경의 리뷰가 어려워 불안정성 증가**.
> Rollback은 "심리적 안전망(psychological safety net)" 으로 빠른 실험·복구를 가능케 함.

### AM 적용 — Phase별 가드레일

| Phase | 버전관리 가드레일 |
|-------|----------------|
| Phase 0 | 현 버전관리 성숙도 평가 (commit 빈도, brrach 전략, rollback 빈도) |
| Phase 1 | Trunk-based development 전환, Feature toggle 도입 |
| Phase 2 | GitOps 기반 자동 롤백 (5분 이내 복구 가능 검증) |
| Phase 3 | 모든 PR에 자동 회귀 테스트 + AI 리뷰 |
| Phase 4 | 카나리·블루-그린 배포 표준화 |

---

## 역량 5: Working in Small Batches

### 효과
- 제품 성과 ↑
- 마찰 ↓
- (트레이드오프) 개인 효과성 약간 ↓

### 측정 3지표

1. 최근 변경의 코드 라인 수
2. 단일 릴리스에 결합된 변경 수
3. 단일 작업 완료 시간

### AM 적용 — KPI

| KPI | 목표 |
|-----|------|
| PR 평균 라인 수 | < 300 lines (이상적: < 100) |
| 단일 배포에 포함된 PR 수 | < 10개 |
| 작업 항목 평균 완료 시간 | < 2일 |

> Phase 1 Quick Win에서 "월 1회 빅뱅 릴리스 → 주 1회 작은 릴리스" 전환 사례 다수.

---

## 역량 6: User-centric Focus ⚠️ 가장 중요

### 효과
- 팀 성과 ↑↑ (가장 강한 양의 효과)
- **부재 시 음의 효과** — AI가 팀 성과를 저해

### 측정 3지표 (7-point Likert)

1. 사용자 가치 창출이 핵심 포커스
2. 사용자 경험이 최우선 순위
3. 사용자 포커스가 비즈니스 성공의 열쇠

### 핵심 원칙

> "AI는 빠르게 잘못된 방향으로도 갈 수 있게 한다.
> 사용자가 North Star가 아니면, 도입할수록 손실."

### AM 적용 — STEP 1 (WHY 정의)

- AM 전환의 WHY 에 **반드시 "사용자 가치 향상"** 포함 (단순 비용 절감만으로는 부족)
- KPI 에 사용자 NPS·CSAT·완료율·만족도 필수 포함
- Phase별 게이트에 **"사용자 피드백 루프 활성화 검증"** 추가

---

## 역량 7: Quality Internal Platforms

### 효과
- 조직 성과 ↑↑
- (트레이드오프) 마찰 약간 ↑

### "How to Improve" — 4단계

#### 1. Adopt a Product Management Mindset
- 플랫폼은 내부 제품, 개발자는 고객
- DevEx 전담 PM 배정
- 핵심 사용자 여정 매핑 (예: "신규 서비스 스핀업", "프로덕션 디버깅")

#### 2. Proactively "Shift Down" Cognitive Load
- 인지 부하를 플랫폼으로 "shift down"
- 개발자가 K8s·클라우드 네트워킹·보안 정책 전문가가 안 되어도 OK
- 셀프서비스 워크플로우 + 골든 패스

#### 3. Start with a "Minimum Viable Platform"
- 한 번에 모든 걸 만들지 말고 한 가지 고가치 문제부터
- 가장 흔한 워크플로우의 골든 패스만 일단 구현
- 빠른 가치 제공 → 피드백 → 모멘텀

#### 4. Design for Extensibility and Contribution
- 중앙 팀이 모든 걸 만들 수 없음
- 명확한 API, 좋은 문서화, contribution 모델
- "오픈" 접근으로 도메인 전문성 활용

### 안티패턴 — 6가지

| 안티패턴 | 설명 | 회피 방법 |
|---------|------|---------|
| **Build it and they will come** | 사용자 리서치 없이 "만들면 올 것" 가정 | 개발자 공감·발견 (empathy & discovery) 으로 시작 |
| **Ivory tower platform** | 중앙 팀이 일방적 표준 강요 | 협업·피드백 루프, 골든 패스는 "필수 X" |
| **Ticket-ops trap** | 인프라 자판기처럼 운영 | 셀프서비스 로드맵으로 티켓 큐 제거 |
| **Big bang approach** | 모든 걸 한번에 출시 | 점진적·반복적 배포 |
| **One-size-fits-all** | 단일 골든 케이지 | 다양한 팀 니즈 수용, 유연성 제공 |
| **Failing executive sponsorship** | 가시적 임원 지원 부재 | 명확한·장기적 임원 후원 확보 |

### 측정 — 12개 플랫폼 특성 + H.E.A.R.T.

**12개 DORA 플랫폼 특성**:
1. 예상대로 동작
2. 인프라 복잡성 효과적 추상화
3. 작업 결과에 명확한 피드백 ⭐ 가장 중요
4. 신뢰할 수 있는 애플리케이션 구축 지원
5. 보안 애플리케이션 구축 지원
6. 필수 프로세스 준수 지원
7. 사용 용이성
8. 독립 작업에 필요한 도구·정보 제공
9. 플랫폼 팀이 피드백에 반응
10. UI 청결성 (상관 약함)
11. 자동화된 작업 수행
12. 전담 플랫폼 팀 보유

**H.E.A.R.T. 보조 프레임워크**:
| 요소 | 측정 대상 |
|------|---------|
| Happiness | 개발자 감성·만족도 |
| Engagement | 플랫폼 기능 사용 빈도·깊이 |
| Adoption | 신규 팀·서비스 온보딩 비율 |
| Retention | 팀의 지속 사용 비율 |
| Task success | 핵심 워크플로우 완료 효율성 |

**DORA 5메트릭의 이중 활용**:
1. **플랫폼 팀용**: 플랫폼 자체 변경의 속도·안정성 측정
2. **앱 팀용**: 모든 서비스에 자동 instrumented → 개발자에게 상위 인사이트

### AM 적용 — Phase별 플랫폼 활동

| Phase | 활동 |
|-------|------|
| Phase 0 | 12개 특성 자가평가 + 안티패턴 진단 |
| Phase 1 | MVP — 1개 골든 패스 구축 (CI/CD + 기본 모니터링) |
| Phase 1' | 1~2개 시스템에 적용, 사용자 피드백 수집 |
| Phase 2 | PM 정식 임명, 다중 플랫폼 거버넌스 설계 |
| Phase 3 | AI 도구 통합 (코드 어시스턴트, 자동 리뷰) |
| Phase 4 | 페더레이션, 측정 기반 지속 개선 |

---

## VSM 매핑 → AI 역량 우선순위 매트릭스

DORA 가이드는 **VSM 발견사항을 7개 AI 역량에 매핑**하는 매트릭스를 제공:

| VSM 발견사항 | 우선 투자 역량 |
|-------------|--------------|
| 일관성 없는 코드 리뷰 | **AI-accessible internal data** (컨텍스트 인식 리뷰 에이전트) + **Strong version control** |
| 개발자가 정보 검색·코드 이해에 시간 과다 소비 | **AI-accessible internal data** (즉각 컨텍스트 인식 답변) |
| 후반에 발견되는 높은 재작업·버그율 | **포괄적 테스트 자동화** (AI가 테스트 생성·실행·큐레이션) |
| 코드 리뷰 병목 (PR 적체) | **AI를 리뷰 프로세스 자체 개선에** (더 많은 코드 생성 X) |

> **핵심 원칙**: "코드 리뷰가 병목이면 AI로 더 많은 코드를 생성하지 마라.
> AI를 **리뷰 프로세스 자체** 개선에 사용하라."

---

## 90분 팀 우선순위 워크숍 (DORA 가이드)

### 사전 준비물

- **퍼실리테이터** (가능하면 외부 또는 결과에 직접 투자 안 한 사람)
- **전체 팀** (PM, QA, 임원 후원자, 아키텍트, DevOps)
- **완성된 VSM 맵** (병목 1~2개 식별 완료)
- **워크숍 도구** (화이트보드 또는 Miro, 스티키 노트, Impact/Effort 매트릭스 템플릿)
- (선택) 식별된 **팀 프로필** (7개 클러스터 중 하나)

### 임원 후원자의 역할

- **킥오프 (10분)**: 왜 우선순위인지 설명 + 후원 명시
- **퇴장 (이후 65분)**: 심리적 안전성 확보를 위해 자리 비움
- **마무리 (15분)**: 팀이 발표할 때 복귀 → 헌신 재확인 + 장애물 제거 약속

### 4단계 워크숍 진행

#### Step 1: Context Setting (10분)
- 팀 프로필 검토 (5분, 선택)
- VSM 맵 핵심 마찰 지점 검토 (5분)

#### Step 2: Brainstorming (20-40분)
- 병목별 5분 아이디어 생성 (스티키 노트, 양 > 질)
- 10-15분 그룹화

#### Step 3: Ruthless Prioritization — Impact/Effort 매트릭스 (30분)
- 4분면 (High Impact / Low Effort 우선)
- "Quick wins" 가 너무 많으면 그 영역 안에서 다시 매트릭스 그리기

#### Step 4: Owning Your "First Step" (10분)
- 1~2개 이니셔티브만 선택 (과잉 약속 방지)
- 각 아이디어에 owner 지정 (실행 책임 X, 관철 책임 ○)
- 명확한 owner + 완료 목표 + 성공 기준

### AM 적용 — STEP 3-2 (Phase 1 파일럿 선정) 직접 활용

> 이 90분 워크숍을 **각 파일럿 후보 시스템에 적용**하여 AM 우선순위 결정 가능.
> `change-manager` 에이전트가 워크숍 가이드 운영 담당.

---

## 지속적 개선 문화 (Continuous Improvement Culture)

### 3대 원칙 (DORA 권고)

1. **Celebrate Progress, Not Attainment**
   - 단일 기준("모든 배치 < 100 lines") 보다 방향성("작은 배치 선호")
   - 팀의 출발점이 다르므로 진전(progress) 자체를 축하
   - 거대한 배치를 절반으로 줄인 팀도 칭찬 받을 자격 있음

2. **Embrace Failure**
   - AI 시대에는 호기심·적응·학습이 더 중요
   - 안전하게 실패할 수 있는 환경 (해커톤, 샌드박스, 새 도구 접근권)
   - 실패에서 배우는 것을 보상·인센티브화

3. **Use Communities of Practice**
   - 사내 그룹 + DORA 글로벌 커뮤니티
   - 성공·실패·공통 과제 공유

### AM 적용 — STEP 3-6 (변화관리)

- **Phase별 회고**에 위 3대 원칙 명시적 통합
- AM 전환 KPI에 "팀 학습·실험" 지표 포함 (예: 분기당 실험 수, 실패 공유 수)

---

## DORA Core Model + AI Capabilities Model 통합 적용

> "AI Capabilities Model은 **Core Model을 대체하지 않고 보완**한다."

| 모델 | 다루는 영역 |
|------|----------|
| **DORA Core Model** | SW 배포·조직 성과의 기초 동인 (전 시대 공통) |
| **DORA AI Capabilities Model** | AI 도입 효과를 증폭하는 7개 역량 |

**AM 전환 권장 순서**:
1. Core Model 의 기초 역량 점검 (CI/CD, 자동화 테스트, Trunk-based 등)
2. 그 위에 7개 AI 역량 단계적 도입
3. 측정·실험·학습 사이클 운영

---

## 인용 권장 문구

```
"To realize the potential of AI, remember that its primary role is that of an amplifier,
magnifying both strengths and dysfunctions within your organization. Therefore, focus on
investing in the foundational technical and cultural environment and cultivating key
capabilities like those in DORA's AI Capabilities Model."
— DORA AI Capabilities Model (2025), Conclusion
```

```
"Get better at getting better."
— DORA 핵심 슬로건
```

---

[Top](#dora-ai-capabilities-model--실행-가이드)
