# 팀 기획서

## 기본 정보
- 플러그인명: am-strategy
- 목표: 엔터프라이즈 시스템을 AM(Application Modernization)으로 전환하기 위한 전략 수립을
  **WHY 정의 → 현황분석 → 전략수립** 3단계로 체계적·자동화 지원
- 대상 도메인: 엔터프라이즈 IT · Application Modernization · 레거시 현대화
- 대상 사용자: CIO/CTO 보좌 조직, 디지털혁신실, EA팀, PMO, 인프라·운영팀 리더

---

## 핵심기능
- **WHY 정의**: 비즈니스 동인(Speedy/Service Always/Save Cost/Security/혁신) 정리,
  기대 성과 3단계 정량화(L1 벤치마크 → L2 자동 측정 → L3 파일럿), 경영진 스폰서십 전략 설계
- **현황 분석**: 시스템 인벤토리 구축(6개 카테고리), 4차원 건강도 스코어카드, 기술 부채 비용 산정,
  A/B/C 등급 분류, 전환 적합도 판정(6R 매핑·TIME 모델), 서비스 경계 식별(Event Storming·Context Map),
  변화관리 조기 착수(이해관계자 맵)
- **전략 수립**: 6R 전략 상세화(시스템별 예산/기간/리스크), 전체 포트폴리오 Phase 구성,
  파일럿 대상 선정, TCO(As-Is/To-Be)·BEP 산정, 4영역 리스크 평가, 거버넌스 회의체 및 Phase별
  품질/보안 가드레일, 변화관리 기획(커뮤니케이션·교육·조직·문화)
- **최종 보고서**: 경영진 발표용 전략 보고서를 MS Word/PowerPoint로 산출

---

## 사용자 플로우

### STEP 1. WHY 정의
참고정보: `references\am-strategy\company-profile.md`  
- Step 1-1. 비즈니스 동인 정의 (4S + 혁신)  
  - 5개 동인별로 현재 이슈·목표·지표 매핑 → `output/{project}/step1/1-drivers.md`
- Step 1-2. 기대 성과 정량화 (L1 단계)  
  - DORA Metrics(배포 빈도·리드타임·MTTR·변경 실패율) 업계 벤치마크 대비 목표 범위 제시  
  - 산출물: `output/{project}/step1/2-quant-L1.md`
- Step 1-3. 경영진 스폰서십 확보 전략  
  - L1(방향성) → L2(비용 근거) → L3(실증) 3단계 시나리오, KPI 합의안, 경영진 보고 템플릿  
  - 산출물: `output/{project}/step1/3-sponsorship.md`
- Step 1-4. WHY 통합본 작성  
  - 동인·정량화·스폰서십을 하나의 경영진 보고서로 통합 → `output/{project}/step1/why-statement.md`

### STEP 2. 현황 분석
- Step 2-1. 시스템 인벤토리 구축 
  - Input:  `references\am-strategy\system-inventory.md`
  - 6개 카테고리(기본정보·기술스택·아키텍처·운영현황·비용·의존성) 수집 템플릿 생성  
  - 인터뷰 질문지(비즈니스팀·개발팀·운영팀·재무팀)  
  - 산출물: `output/{project}/step2/1-inventory.md`
- Step 2-2. A/B/C 등급 분류  
  - 비즈니스 가치·사용자 수·매출 기여도 기준으로 A/B/C 분류 → `output/{project}/step2/2-abc.md`
- Step 2-3. 건강도 4차원 스코어카드  
  - 비즈니스 가치·기술 품질·데이터 결합도·운영 안정성 1~5점 평가  
  - 자동 분석 도구(SonarQube/CAST Highlight) 결과 파싱 + 수동 평가 통합  
  - 산출물: `output/{project}/step2/3-healthscore.md`
- Step 2-4. 기술 부채 비용 산정  
  - 유지보수 추가 공수·장애 대응·보안 리스크·인재 이탈·기회 비용 정량화  
  - 산출물: `output/{project}/step2/4-techdebt-cost.md`
- Step 2-5. 전환 적합도 판정  
  - 건강도 → 6R 매핑, TIME 모델(Tolerate/Invest/Migrate/Eliminate) 2×2 매트릭스  
  - 산출물: `output/{project}/step2/5-fit-6r-time.md`
- Step 2-6. 서비스 경계 식별 (Rearchitect/Rebuild 대상)  
  - Event Storming 워크숍 가이드, Context Map, 유비쿼터스 언어 사전  
  - 산출물: `output/{project}/step2/6-bounded-context.md`
- Step 2-7. 변화관리 조기 착수  
  - 이해관계자 맵, 참여형 워크숍 어젠다, 초기 커뮤니케이션 메시지  
  - 산출물: `output/{project}/step2/7-change-kickoff.md`

### STEP 3. 전략 수립
- Step 3-1. 6R 전략 상세화  
  - 시스템별 실행 내용·기간·예산(범위)·리스크·예비비(15~20%) 산정  
  - 산출물: `output/{project}/step3/1-6r-detail.md`
- Step 3-2. 포트폴리오 Phase 구성  
  - Phase 0(분석) → Phase 1(Quick Win) + Phase 1'(파일럿) → Phase 2~4, GO/NO-GO 게이트  
  - 파일럿 대상 선정(B등급·롤백 용이·독립 DB·팀 의지·성과 가시성)  
  - 산출물: `output/{project}/step3/2-portfolio-phase.md`
- Step 3-3. TCO 분석  
  - As-Is TCO(기술 부채 비용 포함), To-Be TCO(클라우드·전환 투자·학습·병렬운영), BEP 산정(3·5년)  
  - 산출물: `output/{project}/step3/3-tco-bep.md`
- Step 3-4. 리스크 평가  
  - 4영역(기술·조직·비즈니스·일정) × 발생확률·영향도 매트릭스, 상위 5개 리스크 완화 전략·책임자  
  - 산출물: `output/{project}/step3/4-risk.md`
- Step 3-5. 거버넌스 + 품질/보안 가드레일  
  - 5개 회의체(스티어링·워킹그룹·ARB·리스크·비용) 설계  
  - Phase별 가드레일(SAST·SCA·회귀·Contract·DAST·Chaos), Phase 전환 게이트 조건  
  - 산출물: `output/{project}/step3/5-governance-guardrail.md`
- Step 3-6. 변화관리 기획  
  - Phase별 커뮤니케이션·교육 로드맵, 조직 구조·업무방식·문화·성과 측정 전환 계획  
  - 산출물: `output/{project}/step3/6-change-mgmt.md`
- Step 3-7. 전략 통합 보고서 작성  
  - Step 1~3을 경영진·실무진용으로 통합 → `output/{project}/step3/strategy-report.md`

### 최종 산출
- 최종 Review: WHY-현황-전략 정합성, 수치 일관성, 리스크 커버리지, Phase 게이트 조건 검증
- MS Word·PowerPoint 변환: 필요 시 인포그래픽 이미지 생성  
  `output/{project}/final/strategy-report.docx` / `output/{project}/final/strategy-executive.pptx`

---

## 에이전트 구성

- **why-definer** (HIGH): WHY 정의 전문가 — 비즈니스 동인 도출, 기대 성과 L1 벤치마크 정량화,
  경영진 스폰서십 3단계 전략 수립 및 보고서 작성 담당
  - **industry-benchmark**: 업종·규모별 DORA Metrics·TCO 벤치마크 데이터 제공
  - **driver-mapper**: 기업이 제시한 비즈니스 이슈를 3S+보안+혁신 5개 동인으로 매핑

- **inventory-analyst** (MEDIUM): 시스템 인벤토리 및 건강도 평가 전문가 — 6개 카테고리 인벤토리 수집,
  4차원 스코어카드 평가, 기술 부채 비용 산정, A/B/C 등급 분류 담당
  - **interview-template**: 비즈니스·개발·운영·재무팀별 인터뷰 질문지 생성
  - **code-scan-reader**: SonarQube/CAST Highlight 분석 결과 파싱 및 점수 변환
  - **dependency-mapper**: 시스템 간 연동·공유 DB·API 의존성을 그래프로 시각화

- **fit-analyzer** (HIGH): 전환 적합도·서비스 경계 식별 전문가 — 건강도→6R 매핑, TIME 모델 분류,
  Event Storming 워크숍 설계 및 Bounded Context·Context Map 도출 담당
  - **event-storming-guide**: 도메인 이벤트 수집·분류·클러스터링 가이드 및 템플릿 제공
  - **6r-matcher**: 시스템 속성과 건강도 기반 6R 매칭 규칙 적용

- **strategy-planner** (HIGH): 6R 전략·포트폴리오 수립 전문가 — 시스템별 실행안·예산 범위·기간 산정,
  전체 포트폴리오 Phase(0~4) 구성, 파일럿 대상 선정, GO/NO-GO 게이트 조건 설계 담당
  - **budget-calculator**: 6R 전략별 투입 인력·기간·예비비 기반 예산 범위 계산
  - **phase-sequencer**: Phase 간 병렬·의존 관계 분석 및 일정 최적화

- **tco-analyst** (MEDIUM): TCO·BEP 분석 전문가 — As-Is TCO(기술 부채 비용 포함)·To-Be TCO 산정,
  BEP 3년/5년 계산, ROI 시각화 담당
  - **cost-modeler**: 인프라·라이선스·인건비·장애·기회비용·병렬운영 비용 모델링

- **risk-governance** (HIGH): 리스크·거버넌스·가드레일 전문가 — 4영역 리스크 평가,
  발생확률×영향도 매트릭스, 5개 거버넌스 회의체 및 Phase별 품질/보안 가드레일(SAST·SCA·DAST·
  Contract·Chaos) 설계 담당
  - **risk-matrix-tool**: 리스크 리스트 입력 시 매트릭스·히트맵 자동 생성
  - **guardrail-designer**: Phase별 CI/CD 파이프라인 단계·도구·실패 시 액션 설계

- **change-manager** (MEDIUM): 변화관리 전문가 — 이해관계자 맵, Phase별 커뮤니케이션 계획,
  교육·역량 로드맵, 조직 구조·업무방식·문화·성과 측정 전환 설계 담당
  - **stakeholder-mapper**: 영향도·지지도 2×2 매트릭스 기반 이해관계자 분류

- **reviewer** (HIGH): 전략 검증 전문가 — WHY-현황-전략 3단계 정합성, 수치 일관성(TCO↔예산↔
  Phase 예산), 리스크 커버리지, 파일럿 선정 타당성, Phase 게이트 조건 충분성 검토 담당
  - 별도 컨텍스트로 분리 실행하여 자체 산출물에 대한 독립적 검증 수행

- **doc-exporter** (LOW): 문서 변환 전문가 (도메인 특화) — 최종 마크다운 전략 보고서를
  MS Word(.docx)·PowerPoint(.pptx)로 변환 출력 담당. 경영진용 요약본(30장 이내)과 실무진용
  상세본(100장 이상) 2종 출력. (중요) 작성 전 사용자에게 출력 장수 질문 필수.    

---

## 비기능 요구사항

- **이식성**: DMAP 기반으로 Claude Code·Cursor·Cowork 어디서나 동작 (`gateway/runtime-mapping.yaml`)
- **보안/컴플라이언스**: 고객 데이터·개인정보를 플러그인 외부로 전송하지 않음.
  외부 벤치마크 데이터만 참조. 인벤토리 수집 시 민감 속성은 마스킹 권장 안내
- **증거 기반**: 모든 정량 지표는 출처(벤치마크 리포트·내부 측정값·파일럿 실측)를 명시
- **경영진 소통**: 최종 보고서는 경영진이 이해할 수 있는 용어로 작성 —
  "왜(WHY) → 얼마(TCO/BEP) → 언제(Phase) → 어떻게(6R) → 위험(Risk/완화)" 순서 고정

---

## 성공 기준

| 구분 | 성공 기준 |
|------|---------|
| 완결성 | WHY·현황·전략 3단계 모든 산출물이 체크리스트 100% 충족 |
| 정량화 | 기대 성과·TCO·BEP가 **범위**로 제시(단일 숫자 금지), 근거 출처 명시 |
| 실행 가능성 | Phase 1·1' 파일럿 대상·일정·예산이 4주 내 착수 가능한 수준으로 구체화 |
| 거버넌스 | 5개 회의체·3개 Gate·Phase별 가드레일이 조직 현실 기반으로 제안 |
| 변화관리 | Phase별 커뮤니케이션·교육·조직 전환 로드맵 포함, 실패 1위 원인(조직) 대응 명시 |
| 산출 형식 | 마크다운 + MS Word + PowerPoint 3종 일관성 유지 |
