---
name: risk-governance
description: 리스크·거버넌스·가드레일 전문가 — 4영역 리스크 매트릭스, 5 거버넌스 회의체, Phase별 품질/보안 가드레일, AI 정책 3-bucket
---

# Risk Governance

## 목표

AM 전환 프로그램의 **운영 안전장치**를 설계함.
4영역(기술·조직·비즈니스·일정) × 발생확률·영향도 매트릭스를 작성하고,
5개 거버넌스 회의체와 Phase별 가드레일(SAST·SCA·Contract·DAST·Chaos) + AI 정책 3-bucket 프레임워크를 설계함.

## 참조

- 첨부된 `agentcard.yaml`의 역할·세부역할·제약·핸드오프 준수
- 첨부된 `tools.yaml`의 추상 도구만 사용
- 참조 자료:
  - `references/dora/01-software-delivery-performance.md` (DORA 5 메트릭)
  - `references/dora/06-am-transformation-implications.md` (DORA 2025 신규 리스크)
  - `references/dora/07-ai-capabilities-implementation.md` (7 AI 역량 안티패턴)

## 워크플로우

### risk-matrix-tool
#### STEP 1. 리스크 식별 (4영역)
- 기술: 레거시 의존성, 벤더락인, 데이터 마이그레이션 실패, 성능 저하
- 조직: 인재 이탈, 역량 부족, 저항, 역할 혼선
- 비즈니스: 사용자 경험 저하, 규제 위반, 경영진 이탈, 예산 초과
- 일정: Phase 지연, 파일럿 실패, 병렬운영 장기화

**DORA 2025 신규 리스크** 추가:
- AI 시스템 미진화 리스크
- AM 부분 적용 시 AI ROI 잠금 실패
- 사용자 중심 포커스 부재 리스크

#### STEP 2. 발생확률 × 영향도 매트릭스
각 리스크를 (H/M/L × H/M/L) 9셀 매트릭스에 배치.

#### STEP 3. 상위 5 리스크 완화 전략
Top 5 × (완화 전략 / 책임자 / 트리거 지표 / 대응 시나리오) 표.

#### STEP 4. 히트맵 데이터
시각화용 매트릭스 데이터(report 스킬의 인포그래픽/PPT 빌드 단계에서 렌더링).

#### STEP 5. 산출물
`output/{project}/step3/4-risk.md`로 저장.

### guardrail-designer
#### STEP 1. 5 거버넌스 회의체 설계
- 스티어링위원회 (월 1회, 경영진)
- 워킹그룹 (주 1회, 실무)
- ARB (아키텍처 리뷰 보드, 격주)
- 리스크 위원회 (월 1회)
- 비용 위원회 (월 1회)

각각 (참석자 / 주기 / 의사결정 범위 / 상정 자료) 정의.

#### STEP 2. Phase별 품질/보안 가드레일
- SAST (정적 보안) — Phase 1부터
- SCA (SW Composition) — Phase 1부터
- 회귀 테스트 — Phase 1부터
- Contract 테스트 — Phase 2부터 (MSA 전환 시)
- DAST (동적 보안) — Phase 2부터
- Chaos Engineering — Phase 3부터

각 가드레일 × Phase별 (도구·실패 시 액션·담당자) 표.

#### STEP 3. Phase 전환 게이트 조건
DORA 5 메트릭 정량 조건 + 가드레일 통과율.

#### STEP 4. AI 정책 3-bucket 프레임워크
DORA 07의 "역량 1" 기반:
- 🟢 허용 (생산성 즉시 활용)
- 🟡 승인 후 (컨텍스트 가드 적용)
- 🔴 금지 (민감 데이터·규제)

#### STEP 5. 산출물
`output/{project}/step3/5-governance-guardrail.md`로 저장.

## 출력 형식

### 4-risk.md
- 4영역 × N 리스크 목록 표
- 9셀 매트릭스 (H/M/L × H/M/L)
- Top 5 × 완화 전략 표
- 히트맵 데이터

### 5-governance-guardrail.md
- 5 회의체 (참석·주기·범위·자료) 표
- 가드레일 × Phase 매트릭스
- Phase 전환 게이트 조건 (DORA 5 메트릭 + 가드레일 통과율)
- AI 정책 3-bucket 분류 표 (유스케이스·근거·책임자)

## 검증

- 4영역 + DORA 2025 신규 3 리스크 모두 포함 확인
- Top 5 리스크 각각 완화 전략·책임자·트리거 지표 완비 확인
- 5 회의체 중 누락 없음 확인
- 6 가드레일(SAST/SCA/회귀/Contract/DAST/Chaos) 각 Phase 배치 확인
- AI 정책 3-bucket에 유스케이스·근거 명시 확인
- Phase 전환 게이트에 DORA 5 메트릭 정량 조건 포함 확인
