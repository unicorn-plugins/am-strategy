# HBT AM 전환 전략 — 경영진 발표 슬라이드 개요
# ppt-guide.md 기준 컬러/타이포/레이아웃 준수
# 슬라이드 크기: 1152 × 648pt (16:9)
# 폰트: Pretendard (폴백: 맑은 고딕)
# 배경: #FFFFFF (White)
# 푸터: "무단전재 및 배포 금지" + 페이지 번호

---

## SLIDE 1 — 제목 슬라이드
**레이아웃**: Master 1 (배경: #00BBFF Bright Cyan)
**타이틀**: AM 전환 전략 보고서
**부제**: HBT(하이브리지텔레콤) 경영진 발표
**하단 정보**:
- 작성일: 2026년 4월 18일
- 버전: v1.0
- 스폰서: CEO · CFO · CIO 공동
- 대표 집필: AM 전략팀 (전략 기획 리드 한지민 외 6인)

**컬러 힌트**:
- 타이틀: White, Pretendard Bold 44pt
- 부제: White, Pretendard Regular 22pt
- 하단 정보: White, 14pt

---

## SLIDE 2 — Executive Summary (5단 1페이지 요약)
**레이아웃**: Master 3 (White 배경), 패턴 D (테이블 + 하단 배지)
**헤더**: Executive Summary — 한 페이지 브리핑
**헤더 색**: #2C2926, Bold, 36pt

**상단 인용 배지** (배경 #059669, White 텍스트 16pt Bold):
> "AM 전환 없이 AI 투자 ROI는 0. HBT는 지금 3년 403~835억을 투자해 연 1,117~1,708억의 기술부채·AI 기회비용을 상환한다."

**테이블** (헤더 배경 #E2EEF9, 헤더 텍스트 #2C2926 Bold 13pt, 본문 #505060 12pt):

| 구분 | 핵심 메시지 | 핵심 수치 |
|------|-----------|---------|
| 왜(WHY) | Lead Time 22주(글로벌 하위 2%) · IT 운영비 증가율이 매출 증가율의 4배 · AI 도구만 도입 시 ROI ≈ 0 | 4S+혁신 5개 동인 전부 AM 필수 판정 |
| 얼마(BUDGET) | 3년 누적 투자 403~835억 · 기술부채 연 890~1,600억 상환 | BEP 1.8~4.2년 · 5년 ROI 498~593% |
| 언제(WHEN) | Phase 0~4, 30~42개월 · 파일럿 2개(DLR-PORTAL 1호 · PROD-CAT 2호) | 게이트 5개, DORA 5메트릭 GO/NO-GO |
| 어떻게(HOW) | 6R 상세(Rearch 6 + Rebuild 3 = 9 AI 7역량 활성화) · 5 회의체 · 6 가드레일 | 8 Bounded Context, VSM 22주→1~7일 |
| 위험(RISK) | Top 5 리스크(BILL-KT의존 · AI Rework · 동시Rearch · IDP SPOF · AI ROI 스폰서십) | 21개 리스크 매트릭스 · 월간 리뷰 |

**하단 의사결정 요청 배지** (배경 #404155 Dark Slate, White 텍스트 14pt Bold):
Phase 0 착수 승인 · CFO 공동 스폰서십 확정 · 리스크·거버넌스 위원회 발족 (2026.05.15 이전)

---

## SLIDE 3 — WHY (1/3) — 5개 동인 — HBT의 구조적 위기
**레이아웃**: Master 3, 패턴 E (카드 그리드 2×3 — 5개 카드 + 결론 1개)
**헤더**: WHY — 5개 동인 전수 검사
**섹션 배지** (배경 #059669): WHY ①

**카드 5개** (배경 #F5F5F7, 테두리 #DDDDE0, RoundRect):
- 카드 헤더 바 (너비 전체 × 38pt):
  - Speedy: 배경 #3776AB (Python Blue)
  - Service Always: 배경 #1A6E36 (Dark Green)
  - Save Cost: 배경 #C0530A (Dark Orange)
  - Security: 배경 #1A5E7E (Dark Teal)
  - 혁신(AI): 배경 #8B1A1A (Dark Red)

**각 카드 내용** (텍스트 #59636E, 14pt Regular):
- **Speedy**: Lead Time 22주 (글로벌 하위 2%) → 필수 (경쟁사 대비 5~10배 느림)
- **Service Always**: 장애 복구 4.8시간, CFR 24% → 필수 (SLA 위반 연 12건)
- **Save Cost**: IT 운영비 +7.3% vs 매출 +1.8% (4배 격차) → 필수 (3년 후 영업이익률 -2.1%p)
- **Security**: 레거시 CVE 미패치 137건, SAST 자동화 0% → 필수 (금감원 2026 제재 후보)
- **혁신(AI)**: AI Copilot 파일럿 ROI 측정 불가 (2025) → 필수 (AI 투자 좌초)

**결론 하이라이트 박스** (배경 #CCFBF1, 텍스트 #2C2926, 14pt):
5개 동인 모두 "얼마나 빨리 해야 하는가"의 문제
출처: DORA 2025 Figure 49 · 행정안전부 2026.03.11

---

## SLIDE 4 — WHY (2/3) — DORA 2025 정량화 (L1 목표)
**레이아웃**: Master 3, 패턴 D (테이블 + 상세 섹션)
**헤더**: DORA 2025 — HBT L1 정량 목표 (글로벌 4,997명 기반)
**섹션 배지** (배경 #059669): WHY ②

**테이블** (헤더 배경 #E2EEF9, Bold 12pt, 본문 12pt, #505060):

| 지표 | HBT 현재 | Conservative (1년) | Base (2년) | Optimistic (3년) | DORA 글로벌 |
|------|---------|------------------|----------|----------------|-----------|
| Deployment Frequency | 월 1~2회 | 주 1회 | 주 3~5회 | 일 1회+ | Top 44.6% = 일 1회 |
| Lead Time | 22주 (하위 2%) | 4주 | 1주 | 1일 이내 | Top 24.4% = 1일 이내 |
| Recovery Time | 4.8시간 | 2시간 | 1시간 | 30분 이내 | Top 21.3% = 1시간 이내 |
| Change Fail Rate | 24% | 15~18% | 10~14% | 8% 이하 | Top 36.2% = 8% 이하 |
| Rework Rate | 측정 미흡 | 15~20% | 10~14% | 8% 이하 | Top 20.1% = 4% 이하 |

**하단 3개 하이라이트 카드** (배경 #F5F5F7, 테두리 #DDDDE0, 각 카드 동일 크기):
- DORA 2025: 4,997명 설문 · "속도와 안정성은 트레이드오프가 아님" (Cluster 6·7 상위 40%)
- HBT 현재: 글로벌 하위 2% (Lead Time 22주)
- 목표: Phase 4 완료 시 Top 24.4% 진입 (Cluster 6/7 50%)

출처 캡션 (#6B6B7B, 12pt): DORA 2025 State of DevOps Report (dora.dev) · DORA AI Capabilities Model Guide 2025.12

---

## SLIDE 5 — WHY (3/3) — 왜 지금인가 · 스폰서십 3단계
**레이아웃**: Master 3, 패턴 B (다이어그램 + 설명 2열)
**헤더**: 왜 지금인가 — "연기 비용 > 투자 비용"
**섹션 배지** (배경 #059669): WHY ③

**좌측 — 시간 할인 플로우 (컬러 스텝 바, 세로 방향)**:
- 스텝 1 (배경 #059669): AM을 1년 늦출 때마다
- 스텝 2 (배경 #0284C7): 기술부채 연 +10~20% 누증
- 스텝 3 (배경 #D97706): 1년 지연 = 178~240억 손실 (Base)
- 스텝 4 (배경 #DC2626): 경쟁사(SKT 2024완료·KT 2025진행) 대비 시장점유율 -0.3~-0.7%p/년
- 스텝 5 (배경 #7C3AED): "연기 비용 > 투자 비용" 2026년부터 영구 성립

**우측 — 스폰서십 3단계 테이블** (헤더 배경 #E2EEF9):

| 레벨 | 스폰서 | 역할 | HBT 현황 |
|------|------|------|--------|
| L1 | CEO | 전사 비전·우선순위 | 2026.Q1 킥오프 완료 |
| L2 | CFO (핵심 게이트키퍼) | TCO·BEP 추적 | 스폰서십 레터 필요 |
| L3 | CIO + 사업부장 4인 | Phase별 실행 승인 | 워킹그룹 구성 중 |

**하단 하이라이트 박스** (배경 #CCFBF1):
CFO 공동 스폰서십 = 전체 프로그램 최대 성공 변수  
(2022년 디지털혁신 좌초 원인 1위: 재무 본부 미참여)

---

## SLIDE 6 — 현황 진단 (1/3) — 인벤토리 · ABC 등급
**레이아웃**: Master 3, 패턴 E (카드 그리드 2×2)
**헤더**: 현황 진단 — 24개 시스템 인벤토리 · A/B/C 등급
**섹션 배지** (배경 #0D9488 Teal): 현황 ①

**상단 요약 수치 카드 3개** (배경 #F5F5F7, 테두리 #DDDDE0):
- 총 시스템: 24개 · 8 서브도메인
- 연 운영비: 620억 (인건비 포함)
- Cluster 2(Legacy Bottleneck): 33% — 글로벌 평균 1.5배

**ABC 등급 테이블** (헤더 배경 #E2EEF9):

| 등급 | 정의 | 시스템 수 | DORA 클러스터 |
|-----|-----|--------|-----------|
| A (핵심·긴급) | 비즈니스 Critical + 기술 악화 | 12 | Cluster 2 (Legacy Bottleneck) + Cluster 4 |
| B (중요·안정) | 비즈니스 중요 + 기술 양호 | 9 | Cluster 5/6 |
| C (저우선) | 비즈니스 저가치 또는 Retire 후보 | 3 | Cluster 1 |

**의존성 핫스팟 Top 5** (배경 #F5F5F7, 헤더 바 #C0530A):
CRM · BILL · IDP · PAY · DW — 24개 시스템 중 가장 많은 의존 연결

출처 캡션 (#6B6B7B, 12pt): 내부 2025 재무제표·IT 성과 리포트 · DORA 2025 7 클러스터 분석

---

## SLIDE 7 — 현황 진단 (2/3) — 건강도 12차원 · 기술부채
**레이아웃**: Master 3, 패턴 F (멀티 섹션 대시보드 — 좌우 2분할)
**헤더**: 건강도 스코어카드 · 기술부채 연 890~1,600억
**섹션 배지** (배경 #0D9488 Teal): 현황 ②

**좌측 — 건강도 12차원 스코어카드**:
- 카드 헤더 바 (배경 #1A5E7E Dark Teal): 건강도 12차원 결과
- 양호(Green): 5개 시스템
- 보통(Yellow): 12개 시스템
- 취약(Red): 7개 시스템
- 세부 차원: 비즈니스 가치 · 기술 품질 · 데이터 결합도 · 운영 안정성 + DORA 8차원(7 AI 역량 + 12 플랫폼 특성)

**우측 — 기술부채 비용 테이블** (헤더 배경 #E2EEF9, 12pt):

| 부채 항목 | 연 비용 |
|---------|------|
| 레거시 유지보수 오버헤드 | 210~350억 |
| 장애·SLA 위약금 | 430~1,140억 |
| 보안 취약점 대응 지연 | 80~130억 |
| 신규 기능 기회비용 | 150~280억 |
| 인력 이탈·채용 난항 | 70~120억 |
| AI ROI 잠금 기회비용 | 200~400억 (별도) |
| **합계** | **890~1,600억** |

**하단 하이라이트 박스** (배경 #CCFBF1):
운영비 620억 대비 기술부채 2.6배 — "운영비보다 기술부채가 더 큰 실제 비용"  
출처: 내부 분석 · 행정안전부 2026.03.11

---

## SLIDE 8 — 현황 진단 (3/3) — 6R/TIME 매칭 · Bounded Context
**레이아웃**: Master 3, 패턴 A (카드 그리드 3열)
**헤더**: 6R·TIME 매칭 결과 · 8 Bounded Context
**섹션 배지** (배경 #0D9488 Teal): 현황 ③

**6R 분포 카드 3열** (배경 #F5F5F7, 각 헤더 바 카테고리 컬러):
- 카드 1 헤더 바 (배경 #8B1A1A Dark Red): Rearchitect + Rebuild = 9개 (AI 7역량 전체 활성화)
- 카드 2 헤더 바 (배경 #1A6E36 Dark Green): Refactor + Replatform = 9개 (AI 4~5역량 활성화)
- 카드 3 헤더 바 (배경 #3776AB Python Blue): Repurchase + Retire + Retain = 6개 (저가치 정리)

**카드 1 내용** (14pt #59636E):
- Rearchitect 6건: BILL-MF, CRM, PAY, ORD, NMS, DW
- Rebuild 3건: IDP, FLT, STL
- AI ROI 잠금 해소 최대화

**카드 2 내용**:
- Refactor 6건: PROD-CAT, MY-APP, BI-REP, CNTR-MGT, CMP-MGT, CSC-WEB
- Replatform 3건: DLR-PORTAL, INV-RES, CC-IVR

**카드 3 내용**:
- Repurchase 1건: SFA-ENT (Salesforce)
- Retire 2건: COLL-LGC, IDC-OPS 후속
- Retain 3건: REC-AI, CLD-PLAT, IDC-OPS

**하단 8 Bounded Context 배지 행** (배지: 배경 #404155 Dark Slate, White 텍스트 14pt Bold):
고객관리 · 상품카탈로그 · 요금빌링 · 결제정산 · 네트워크운영 · 콜센터VOC · 분석BI · 공통관리

출처 캡션: 내부 DDD·Event Storming 결과 · Gartner TIME Matrix

---

## SLIDE 9 — 전략 6R (1/3) — 6R 매핑 매트릭스
**레이아웃**: Master 3, 패턴 D (테이블 + 상세)
**헤더**: 6R 전략 매핑 — 24개 시스템 전수
**섹션 배지** (배경 #4472C4 Blue Accent): 전략 ①

**메인 테이블** (헤더 배경 #E2EEF9, Bold 13pt, 본문 12pt):

| 6R | 시스템 수 | AI 7역량 활성화 | 대표 시스템 | TIME |
|----|--------|--------------|--------|-----|
| Rearchitect | 6 | 7/7 전체 (AI ROI 최대) | BILL-MF, CRM, PAY | Invest |
| Rebuild | 3 | 7/7 전체 | IDP, DW, FLT | Invest |
| Refactor | 6 | 4~5/7 | PROD-CAT, MY-APP | Invest/Migrate |
| Replatform | 3 | 3~4/7 | DLR-PORTAL, INV-RES | Migrate |
| Repurchase | 1 | SaaS 의존 | SFA-ENT (Salesforce) | Migrate |
| Retire/Retain | 5 | 0~1/7 | COLL-LGC, IDC-OPS | Eliminate/Tolerate |

**중요 원칙 하이라이트** (배경 #CCFBF1):
Rehost 0건 — "Lift & Shift는 AI ROI 잠금 해소 효과 거의 없음" (DORA 2025 §06)  
모든 6R 결정: 룰북 규칙 ID 역추적 가능 (Rule-Traceable 원칙)

**하단 VSM 개선 요약 배지 행** (배경 #059669 Green):
VSM As-Is 22주 → To-Be 1~7일 (-95~-99%) | 요구사항→설계→개발→QA→배포→안정화 전 단계 단축

---

## SLIDE 10 — 전략 6R (2/3) — 파일럿 선정 근거
**레이아웃**: Master 3, 패턴 B (2열: 좌 1호·우 2호)
**헤더**: Phase 1' 파일럿 2개 선정 — 플레이북 검증
**섹션 배지** (배경 #4472C4 Blue Accent): 전략 ②

**좌측 카드 — DLR-PORTAL (1호)** (배경 #F5F5F7, 헤더 바 배경 #059669 Green):
**헤더**: 파일럿 1호 ⭐ DLR-PORTAL (대리점 포털)
**6R**: Refactor | **기간**: 3~5개월

- 비즈니스 가치: A등급 (BV 5.00) / 파일럿 리스크 프로파일: B (이중 축 병기)
- 독립 DB · 롤백 용이 (Feature Toggle 가능)
- 대리점 9,500명 + 신규가입 70% 경로 (성과 즉시 가시화)
- Spring Boot 2.5 + Vue.js 2 · Git·GitHub Flow 운영 중
- DORA 5메트릭 베이스라인 측정 가능
- 8/8 선정 기준 전부 충족

**우측 카드 — PROD-CAT (2호)** (배경 #F5F5F7, 헤더 바 배경 #0284C7 Blue):
**헤더**: 파일럿 2호 PROD-CAT (상품 카탈로그)
**6R**: Replatform | **기간**: 2~4개월

- B등급 · Cluster 5 Stable · 독립 DB
- Oracle → PostgreSQL Blue-Green 가능
- 신상품 출시 리드 2개월 → 2주 (성과 측정 가능)
- BILL-MF 독립성 확보 (Strangler Fig 적용)
- AI 컨텍스트로 즉시 활용 가능
- 8/8 선정 기준 전부 충족

**하단 배제 근거 배지** (배경 #404155 Dark Slate, White 14pt):
핫스팟(CRM·ORD·BILL·STL·PAY·DW): 학습 손실 시 매출 중단 리스크 → Phase 2~3 본격 전환

---

## SLIDE 11 — 전략 6R (3/3) — AI 정책 3-Bucket · 거버넌스
**레이아웃**: Master 3, 패턴 A (카드 그리드 3열)
**헤더**: AI 정책 3-Bucket · 5 거버넌스 회의체
**섹션 배지** (배경 #4472C4 Blue Accent): 전략 ③

**카드 3열 — AI 3-Bucket** (각 헤더 바 카테고리 컬러):
- 카드 1 헤더 바 (배경 #1A6E36 Dark Green): Allowed (저위험·고가치) — 15항목
  - 내용: 보일러플레이트 생성 · 내부 설계 문서 요약 · 테스트 코드 초안 · 비독점 데이터 브레인스토밍
- 카드 2 헤더 바 (배경 #C0530A Dark Orange): Permitted with Guardrails (조건부) — 8항목
  - 내용: 사내 AI 도구로만 독점 소스 코드 사용 · AI 생성 코드 human-in-the-loop 필수 · PII 마스킹 후 활용
- 카드 3 헤더 바 (배경 #8B1A1A Dark Red): Prohibited (금지) — 10항목
  - 내용: 고객 PII/영업비밀 공개 AI 모델 입력 · 보안 키 프롬프트 포함 · 규제 데이터 외부 전송

**하단 5 회의체 요약 테이블** (헤더 배경 #E2EEF9, 12pt):

| 회의체 | 주기 | 주요 역할 |
|-------|-----|---------|
| Steering | 월 1회 | 전략·예산·AI 정책 |
| Working Group | 주 1회 | 실행 조정·VSM 재매핑 |
| ARB | 2주 1회 | 아키텍처 승인·12 플랫폼 특성 |
| Risk Committee | 월 1회 | 리스크 추적·에스컬레이션 |
| Cost Committee | 분기 1회 | TCO·BEP 추적 |

---

## SLIDE 12 — Phase 로드맵 (1/2) — Phase 0~4 간트 개요
**레이아웃**: Master 3, 패턴 F (멀티 섹션 — 간트 스타일)
**헤더**: Phase 0~4 마스터 로드맵 (30~42개월)
**섹션 배지** (배경 #ED7D31 Orange Accent): 로드맵 ①

**Phase 타임라인 바 (플로우 다이어그램 스타일, 가로 배열)**:

Phase 0 (배경 #059669 Green, 4~6개월):
2026.05~2026.09 | 준비·진단 | 분석 기반 확보 · DORA 실측 · AI 정책 초안

Phase 1 (배경 #0284C7 Blue, 6~10개월):
2026.08~2027.04 | Quick Win | 파일럿 2개 + IDP-SSO + 8개 Quick Win

Phase 2 (배경 #D97706 Amber, 14~18개월):
2027.01~2028.06 | Core Rearch | Refactor 3 + Rearchitect 5 + Replace 1 = 9개 시스템

Phase 3 (배경 #DC2626 Red, 16~20개월):
2027.10~2029.03 | Rebuild | FLT-MGT + BILL-MF Critical Path (24~36개월)

Phase 4 (배경 #7C3AED Purple, 10~14개월):
2028.09~2029.09 | Sustain | STL-MF Rebuild · AI 7역량 완성 · Cluster 6/7 50%

**Phase별 시스템 수 요약** (하단 배지 행, 배경 #404155):
Phase 1: 2개 파일럿 · Phase 2: 9개 · Phase 3: 3개 · Phase 4: 2개 + 안정화

**Critical Path 강조** (배경 #CCFBF1):
BILL-MF Rebuild (24~36개월) = Critical Path  
Phase 0부터 도메인 KT 16주 선행 필수

출처: step3/2-portfolio-phase.md (이서윤, AM 전략 리드)

---

## SLIDE 13 — Phase 로드맵 (2/2) — 게이트 조건
**레이아웃**: Master 3, 패턴 D (테이블)
**헤더**: Phase 게이트 5개 — DORA 5메트릭 GO/NO-GO
**섹션 배지** (배경 #ED7D31 Orange Accent): 로드맵 ②

**게이트 테이블** (헤더 배경 #E2EEF9, Bold 12pt, 본문 12pt):

| 게이트 | 시점 | GO 조건 (AND) | NO-GO 시 대응 |
|-------|-----|------------|-----------|
| G0 → G1 | 2026.10 | 12 플랫폼 특성 자가평가 완료 + AI 정책 3-Bucket 승인 + VSM 매핑 완료 | Phase 0 연장 2~3개월 |
| G1 → G2 | 2027.06 | 파일럿 2개 DORA 5메트릭 ≥ 1단계 향상 + Rollback 5분 이내 + CFR ≤ 15% | 파일럿 추가 최대 4개 |
| G2 → G3 | 2028.06 | 플랫폼 12 특성 평균 "Moderately" + BILL-MF 분해 50%+ + 7 AI 역량 베이스라인 | Phase 2 연장 3~6개월 + Critical Path 재설계 |
| G3 → G4 | 2029.03 | AI 역량 평균 ≥ "평균" + AI ROI 측정 가능 + Cluster 6/7 진입 ≥ 30% | AI 도입 속도 재조정 |
| G4 완료 | 2029.10 | Cluster 6/7 진입 ≥ 50% + DORA 5메트릭 전 Top 50% + TCO 절감 Base 7%+ | Phase 4 연장 + 근본원인 분석 |

**하단 3-색 에스컬레이션 배지 행**:
- Green 배지 (배경 #059669): 계획대로 → 월간 리뷰만
- Yellow 배지 (배경 #D97706): 1~2개 미달 → Working Group 주 1회 집중
- Red 배지 (배경 #DC2626): 3개+ 미달 → Steering 72시간 이내 소집

---

## SLIDE 14 — TCO/BEP (1/3) — 3 시나리오 투자 규모
**레이아웃**: Master 3, 패턴 D (테이블 + 상세 섹션)
**헤더**: 3년 투자 규모 — 3 시나리오 (Conservative / Base / Optimistic)
**섹션 배지** (배경 #FFC000 Gold Accent): 예산 ①

**경영진 한 줄 메시지 배지** (배경 #059669, White 14pt Bold):
3년 기술부채 누적 2,670~4,800억 vs AM 전환 투자 403~835억 — 전환 안 하는 비용이 전환 비용의 최대 5.8배

**3 시나리오 투자 테이블** (헤더 배경 #E2EEF9):

| 시나리오 | 3년 투자 총액 | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---------|-----------|--------|--------|--------|--------|--------|
| Conservative | 403억 | 35억 | 58억 | 142억 | 112억 | 55.7억 |
| Base (플래닝 기준) | 620억 | 47.5억 | 89억 | 218.5억 | 172.6억 | 92억 |
| Optimistic | 835억 | 60억 | 120억 | 295억 | 233억 | 127.4억 |

**사용 지침 카드 3개** (배경 #F5F5F7, 테두리 #DDDDE0, 헤더 바 카테고리 컬러):
- Conservative (헤더 #1A5E7E): 예산 확정 기준
- Base (헤더 #1A6E36): 플래닝 기준 (권장)
- Optimistic (헤더 #C0530A): 성과 압박 기준

출처 캡션: step3/3-tco-bep.md (최재원, IT 재무 TCO 애널리스트) · step3/1-6r-detail.md 수치 정합 검증 완료 (±0.4억 이내)

---

## SLIDE 15 — TCO/BEP (2/3) — As-Is vs To-Be TCO · BEP 시점
**레이아웃**: Master 3, 패턴 F (좌우 2분할)
**헤더**: As-Is vs To-Be TCO · BEP 시점
**섹션 배지** (배경 #FFC000 Gold Accent): 예산 ②

**좌측 — TCO 비교 테이블** (헤더 배경 #E2EEF9, 12pt):

| 항목 | As-Is (연간) | To-Be (연간) | 절감률 |
|------|-----------|-----------|------|
| 서버·스토리지 | 280억 | 45~60억 | -78~-83% |
| 라이선스 | 180억 | 70~95억 | -47~-61% |
| 운영 인건비 | 620억 | 220~290억 | -53~-64% |
| 플랫폼 팀 (신규) | 0 | 38~62억 | 신규 |
| AI 도구·인프라 (신규) | 0 | 20~40억 | 신규 |
| 장애·SLA 위약금 | 430~1,140억 | 0~15억 | -99% |
| 총계 | 1,510~2,220억 | 393~512억 | -74~-77% |

**우측 — BEP 3 시나리오 요약 카드** (배경 #F5F5F7):
- Conservative: BEP 4.2년 (5년 ROI 498%)
- Base: BEP 2.9년 (5년 ROI 514%)
- Optimistic: BEP 1.8년 (5년 ROI 593%)

BEP 곡선 데이터 (텍스트 기반 설명):
- Base: Y2 Q4(2027.12) 교차 — 누적 투자 400억 vs 누적 절감 660억
- Optimistic: Y2 Q2(2027.06) 교차

**하단 공통 결론 배지** (배경 #CCFBF1):
5년 이내 모든 시나리오 투자 원금 회수 + 순이익 2,407~5,785억  
외부 검증: 행정안전부 7년 18.4% TCO 절감 실증 (공공부문 기준)

---

## SLIDE 16 — TCO/BEP (3/3) — AI ROI 잠금 해소 · 외부 벤치마크
**레이아웃**: Master 3, 패턴 B (좌 AI ROI + 우 외부 벤치마크)
**헤더**: AI ROI 잠금 해소 — AM의 핵심 추가 효익
**섹션 배지** (배경 #FFC000 Gold Accent): 예산 ③

**좌측 — AI ROI 잠금 해소 테이블** (헤더 배경 #E2EEF9):

| 시나리오 | AI 활용 가능 시스템 수 | 연 추가 효익 | 3년 누적 |
|---------|-----------------|----------|-------|
| Conservative | 9개 (Rearch 6 + Rebuild 3) | 120억 | 360억 |
| Base | 15개 (+ Refactor 6) | 240억 | 720억 |
| Optimistic | 22개 (거의 전체) | 360억 | 1,080억 |

**DORA 핵심 인용 박스** (배경 #CCFBF1, 텍스트 #2C2926, 14pt):
"An investment in AI without a corresponding investment in high-quality platforms  
is unlikely to yield significant returns at the organizational level."  
— DORA 2025 Platform Engineering Chapter (Figure 49)

**우측 — 외부 벤치마크 3종 검증 카드**:
- 카드 1 헤더 (배경 #1A6E36): 행정안전부 2026.03.11
  - 7년 누적 TCO 18.4% 절감 · 장애율 81% 감소 · 배포 속도 114% 향상
- 카드 2 헤더 (배경 #3776AB): 근로복지공단 2025.12.23
  - Lead Time 23배 단축 (HBT 22주→7일 = 22배, 일치)
- 카드 3 헤더 (배경 #C0530A): HBT 보수 적용
  - Base 7~10% × 7년 환산 ≈ 17~20% — 행안부 실증치 이내

---

## SLIDE 17 — 리스크·거버넌스 (1/2) — Top 5 히트맵
**레이아웃**: Master 3, 패턴 D (9셀 매트릭스 + 하단 Top 5)
**헤더**: 21개 리스크 · 9셀 매트릭스 · Top 5 심층 분석
**섹션 배지** (배경 #DC2626 Red): 리스크 ①

**9셀 리스크 매트릭스** (배경 카드, 셀별 색상 차등):

| 영향도 \ 발생확률 | High (70%+) | Med (30~70%) | Low (<30%) |
|---|---|---|---|
| High (300억+·6개월+) | R-P-02 BILL 지식 승계 실패 / R-D-01 AI Rework 폭증 (배경 #DC2626 Red) | R-T-02 동시Rearch 병목 / R-D-02 IDP SPOF / R-B-01 AI ROI 스폰서십 이탈 (배경 #D97706 Amber) | R-P-01 BILL Critical Path / R-B-03 매출확정 오류 (배경 #FFC000 Gold) |
| Med (50~300억·1~6개월) | R-O-01 이직·채용 실패 / R-T-04 FLT 보안 노출 (배경 #D97706 Amber) | R-T-01 Teradata 락인 외 4건 (배경 #A5A5A5 Gray) | R-T-03 Strangler Fig 실패 외 2건 (배경 #70AD47 Green) |
| Low (<50억·<1개월) | R-O-03 DORA 설문 저조 (배경 #A5A5A5 Gray) | R-P-05 SonarQube 지연 / R-O-02 NOC 저항 (배경 #70AD47 Green) | R-B-02 번호이동 유출 (배경 #70AD47 Green) |

셀 내 텍스트 색상: Red/Amber 셀 = White, Gray/Green 셀 = #2C2926

**하단 Top 5 요약 배지 행** (배경 #404155 Dark Slate, White 12pt Bold):
R-P-02 가중 9 · R-D-01 가중 9 · R-T-02 가중 8 · R-D-02 가중 8 · R-B-01 가중 8

Phase 1 가중합: 32 (최대) — IDP·파일럿·AI 3대 리스크 동시 착수 (캡션 #6B6B7B 12pt)

---

## SLIDE 18 — 리스크·거버넌스 (2/2) — 가드레일 6종 · 에스컬레이션
**레이아웃**: Master 3, 패턴 E (카드 그리드 2×3 — 가드레일 6개)
**헤더**: 6 가드레일 · 3-색 에스컬레이션 체계
**섹션 배지** (배경 #DC2626 Red): 리스크 ②

**가드레일 6개 카드** (배경 #F5F5F7, 테두리 #DDDDE0):
- 카드 1 헤더 바 (배경 #1A6E36): SAST (정적 보안) — Phase 1부터 파일럿 100%
- 카드 2 헤더 바 (배경 #1A6E36): SCA (오픈소스 취약점) — Phase 1부터 파일럿 100%
- 카드 3 헤더 바 (배경 #3776AB): 회귀 테스트 자동화 — 70%→85%→90%→95%
- 카드 4 헤더 바 (배경 #3776AB): Contract Test — 파일럿 API 100%
- 카드 5 헤더 바 (배경 #C0530A): DAST (동적 보안) — 파일럿 주 1회
- 카드 6 헤더 바 (배경 #8B1A1A): Chaos Engineering — Phase 2 핵심 시스템부터

**하단 3-색 에스컬레이션 테이블** (헤더 배경 #E2EEF9, 12pt):

| 색 | 기준 | 조치 | 책임자 |
|---|-----|-----|------|
| Green | 모든 게이트 조건 충족 | 월간 리뷰만 | PMO |
| Yellow | 1~2개 메트릭 미달, Phase 내 회복 가능 | Working Group 주 1회 집중·Risk Committee 보고 | PMO + 리드 |
| Red | 3개+ 미달 또는 Critical Path 지연 | Steering 임시 소집 72시간 이내 | CIO + CFO |

---

## SLIDE 19 — 변화관리 — Phase × 6축 매트릭스
**레이아웃**: Master 3, 패턴 D (테이블)
**헤더**: 변화관리 — Phase × 6축 매트릭스
**섹션 배지** (배경 #5B9BD5 Light Blue Accent): 변화관리

**Phase × 6축 변화관리 매트릭스** (헤더 배경 #E2EEF9, 12pt):

| 축 | Phase 0 | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|----|--------|--------|--------|--------|--------|
| 커뮤니케이션 | 14 이해관계자 2x2 매핑 | 파일럿 성공 스토리 공유 | BILL-MF 분해 주간 공개 | AI Mirror 라이브러리 배포 | Town Hall 분기 1회 |
| 교육 | DORA 설문·12 플랫폼 워크숍 | Trunk-based·Small Batch 교육 | 전사 AI 3-Bucket 교육 | RAG·MCP 활용 교육 | CoP 주도 지속 학습 |
| 조직 | 워킹그룹·CoP 준비 | 플랫폼 팀 시드 4명 | 플랫폼 팀 4→10명 | AM·AI·DevSecOps·User CoP | 페더레이션 모델 전환 |
| 프로세스 | VSM As-Is 매핑 | 파일럿 GitOps·Feature Toggle | Contract Test·DAST 전사 | Canary·Blue-Green 표준화 | 지속 개선 표준 공정 |
| 문화 | "Celebrate Progress" 선언 | "Embrace Failure" 공유 | Hackathon 분기 1회 | Failure Share 월 1회 | 3대 원칙 내재화 측정 |
| 측정 | DORA 5 베이스라인 | 파일럿 메트릭 주간 | H.E.A.R.T. 플랫폼 측정 | 7 AI 역량 반기 평가 | Cluster 6/7 진입률 반기 |

**AI Mirror 인용 박스** (배경 #CCFBF1, 텍스트 #2C2926, 14pt):
"AI는 조직의 강점을 증폭하고 약점도 증폭함.  
볼 준비가 된 조직에게 AI는 로드맵이 됨."  
— DORA 2025 The AI Mirror Chapter

---

## SLIDE 20 — 결론 (1/2) — 의사결정 요청 5가지
**레이아웃**: Master 3, 패턴 E (카드 그리드 — 5개 결정사항)
**헤더**: 의사결정 요청 — 경영진 5가지 승인 요청
**섹션 배지** (배경 #059669 Green): 결론 ①

**결정사항 5개 카드** (배경 #F5F5F7, 테두리 #DDDDE0, 헤더 바 카테고리 컬러):

- 카드 1 헤더 (배경 #059669 Green): Phase 0 착수 승인
  - 6개월 · 35~60억 · 2026.05.01~2026.10.31
  - 12 플랫폼 특성 자가평가 + DORA 베이스라인 확보

- 카드 2 헤더 (배경 #0284C7 Blue): Phase 0 → Phase 1 자동 승인 조건 합의
  - DORA 5메트릭 베이스라인 + 12 플랫폼 특성 자가평가 완료
  - G0→G1 게이트 조건 사전 합의

- 카드 3 헤더 (배경 #D97706 Amber): CFO 공동 스폰서십 확정
  - TCO·BEP 추적 주관
  - 월간 CFO 브리핑 정기화

- 카드 4 헤더 (배경 #DC2626 Red): 리스크·거버넌스 위원회 발족
  - 2026.05.15 이전
  - 5 회의체 체계 가동

- 카드 5 헤더 (배경 #7C3AED Purple): 변화관리 예산 별도 계정 신설
  - 전체의 8~12% · 32~100억
  - 조직 변화관리 조기 착수

**하단 타임라인 배지** (배경 #404155 Dark Slate, White 14pt Bold):
2026.05.01 Phase 0 착수 → 2026.10 G0 게이트 → 2027.04 G1 게이트 → 2029.10 프로그램 완료

---

## SLIDE 21 — 결론 (2/2) — DORA 핵심 메시지 · 최종 선언
**레이아웃**: Master 3 (또는 제목 슬라이드 유사 레이아웃)
**헤더**: HBT는 볼 준비가 된 조직
**섹션 배지** (배경 #059669 Green): 결론 ②

**중앙 대형 인용 박스** (배경 #CCFBF1, 텍스트 #2C2926, 20pt Bold):
"In 2025, the central question for technology leaders is no longer if they should adopt AI,  
but how to realize its value.  
AI's primary role in software development is that of an amplifier.  
It magnifies the strengths of high-performing organizations  
and the dysfunctions of struggling ones."  
— DORA 2025 Executive Summary

**3단 핵심 수치 배지 행** (배경 #059669 Green, White Bold 18pt):
투자 403~835억 | BEP 1.8~4.2년 | 5년 ROI 498~593%

**하단 최종 선언 박스** (배경 #2C2926 Dark Brown, White 텍스트 16pt Bold):
"AM 없는 AI ROI는 0. HBT는 지금 시작함."  
— 2026.04.18 · AM 전략팀 일동

출처 캡션 (White, 12pt): DORA 2025 State of DevOps Report · 행정안전부 2026.03.11 · 근로복지공단 사례 기반

---

## SLIDE 22 — (부록) DORA 핵심 메시지 카드 5장
**레이아웃**: Master 3, 패턴 E (카드 그리드 2×3 — 5개 + 결론)
**헤더**: DORA 2025 경영진 핵심 메시지 5장
**섹션 배지** (배경 #404155 Dark Slate): 부록 A

**카드 5개** (배경 #F5F5F7, 테두리 #DDDDE0):
- 카드 1 헤더 (배경 #3776AB): 속도와 안정성은 트레이드오프가 아님
  - "상위 40%(Cluster 6·7)는 속도와 안정성 모두 우수함" — DORA 2025
- 카드 2 헤더 (배경 #1A6E36): 20%는 이미 도달한 현실
  - "Harmonious high-achiever(Cluster 7) — 글로벌 20%가 이미 달성" — DORA 2025
- 카드 3 헤더 (배경 #C0530A): AI는 증폭기 (Amplifier)
  - "AI magnifies the strengths of high-performing organizations and the dysfunctions of struggling ones" — DORA 2025
- 카드 4 헤더 (배경 #8B1A1A): AM 없는 AI 투자 = ROI 0
  - "An investment in AI without a corresponding investment in high-quality platforms..." — DORA 2025 Figure 49
- 카드 5 헤더 (배경 #1A5E7E): AI Mirror — 볼 준비가 된 조직의 로드맵
  - "For organizations ready to look, the reflection AI offers becomes a roadmap" — DORA 2025

출처 캡션: DORA 2025 State of DevOps Report (dora.dev) · DORA AI Capabilities Model Guide 2025.12

---

## SLIDE 23 — (부록) 용어집 · 참고문헌
**레이아웃**: Master 3, 패턴 D (테이블)
**헤더**: 주요 용어집 · 참고문헌
**섹션 배지** (배경 #404155 Dark Slate): 부록 B

**용어 테이블 (좌)** (헤더 배경 #E2EEF9, 12pt):

| 용어 | 정의 |
|------|------|
| AM | Application Modernization |
| 6R | Retain·Rehost·Replatform·Refactor·Rearchitect·Rebuild·Retire |
| DORA 5메트릭 | Deployment Frequency · Lead Time · CFR · Recovery Time · Rework Rate |
| Strangler Fig | 레거시 주변에 새 시스템을 점진 배치 후 대체 (Martin Fowler) |
| BEP | Break-Even Point — 투자 회수 시점 |
| TCO | Total Cost of Ownership |
| CoP | Community of Practice |
| RAG/MCP | Retrieval-Augmented Generation / Model Context Protocol |

**참고문헌 테이블 (우)** (헤더 배경 #E2EEF9, 12pt):

| # | 출처 | 발표일 |
|---|------|------|
| 1 | DORA 2025 State of DevOps Report (dora.dev) | 2025.10 |
| 2 | DORA AI Capabilities Model Guide | 2025.12 |
| 3 | 행정안전부 제5회 과학기술관계장관회의 (ddaily.co.kr) | 2026.03.11 |
| 4 | 근로복지공단 AM 사례 성과보고회 (zdnet.co.kr) | 2025.12.23 |
| 5 | 내부 2025 재무제표·IT 성과 리포트 | 내부 |

---

# PPT 생성 메타데이터
# 총 슬라이드 수: 23장
# 출력 파일: strategy-executive.pptx
# 준수 기준: ppt-guide.md 전량 적용
# - 슬라이드 크기: 1152 × 648pt (16:9)
# - 폰트: Pretendard (폴백 맑은 고딕/Arial)
# - 배경: #FFFFFF (White)
# - 컬러 팔레트: ppt-guide.md 섹션 1 전체 준수
# - 테이블 헤더: #E2EEF9 배경 + #2C2926 Bold 텍스트
# - 최소 폰트: 12pt (fs12() 함수로 강제)
# - 푸터: "무단전재 및 배포 금지" + 페이지 번호
# - reviewer 보완: Phase 2 9개 시스템 일관화 / DLR-PORTAL 이중 축 병기
