# 의사결정 입력 기준 (System Attributes)

> `6r-matcher` 가 추천을 내릴 때 평가해야 하는 **시스템 속성 14가지**.
> 각 속성의 정의·측정 방법·점수화 기준·가중치를 명시.
>
> STEP 2-1 (인벤토리), STEP 2-3 (건강도 스코어카드) 의 산출물에서 본 입력값이 추출된다.

---

## 입력 속성 14가지

| # | 속성 | 카테고리 | 활용 주된 6R |
|---|------|---------|-----------|
| 1 | Business Value Score | 가치 | 전체 분류의 출발점 |
| 2 | User Base / Usage Frequency | 가치 | Retire/Replace 판단 |
| 3 | Revenue / Cost Contribution | 가치 | INVEST 우선순위 |
| 4 | Strategic Alignment | 가치 | INVEST vs TOLERATE |
| 5 | Code Quality Score | 기술 | Refactor·Rearchitect 가능성 |
| 6 | Architecture Modernity | 기술 | Replatform vs Refactor vs Rearchitect |
| 7 | Operational Stability (DORA) | 기술 | 시급성 판단 |
| 8 | Data Coupling | 기술 | Rearchitect 분해 가능성 |
| 9 | Tech Stack Currency | 기술 | Rehost vs Rebuild 결정 |
| 10 | Team Capability / Knowledge | 조직 | Rearchitect/Rebuild 리스크 |
| 11 | Vendor Lock-in / License Cost | 조직 | Replace 검토 |
| 12 | Regulatory / Compliance Constraint | 조직 | SaaS(Replace) 가능 여부 |
| 13 | Lifecycle Remaining (Years) | 시간 | Retain vs 투자 강도 |
| 14 | Change Frequency (Recent 12mo) | 시간 | INVEST 강도 |

---

## 1. Business Value Score (1~5)

### 정의
시스템이 회사 비즈니스에 기여하는 정도의 종합 점수.

### 측정 방법
[`02-time-model.md`](02-time-model.md) 의 비즈니스 가치 5개 항목 가중평균.

### 점수 기준
| 점수 | 의미 | 예시 |
|-----|------|------|
| 5 | 핵심 전략 자산 | 회사 핵심 매출 발생 시스템 (예: 커머스 플랫폼) |
| 4 | 중요 자산 | 매출 직접 기여 또는 핵심 운영 시스템 |
| 3 | 일반 운영 자산 | 백오피스 일반 (HR, 회계 등) |
| 2 | 보조 자산 | 부분 사용, 대체 가능 |
| 1 | 잔존 자산 | 거의 안 씀, 대체 가능 |

---

## 2. User Base / Usage Frequency

### 측정 방법
- DAU/MAU/연 활성 사용자
- 영향받는 부서·외부 파트너 수
- 일일 트랜잭션·API 호출 수

### 점수 기준
| 점수 | 의미 |
|-----|------|
| 5 | DAU 10,000+ 또는 외부 파트너 다수 |
| 4 | DAU 1,000~10,000 |
| 3 | DAU 100~1,000 |
| 2 | DAU 10~100 |
| 1 | DAU 10 미만 또는 비정기 사용 |

> **Retire 트리거**: 점수 1 + Business Value 1~2 = Retire 1순위 후보
> **Eliminate 트리거**: 위 + 건강도 심각(4~5) = 즉시 폐기 검토

---

## 3. Revenue / Cost Contribution

### 측정 방법
- 직접 매출 기여액 (연간)
- 시스템 다운 시 손실 (시간당)
- 운영 비용 (연간 인프라 + 라이선스 + 인건비)

### 점수 기준
| 점수 | 매출 기여 또는 다운 손실 |
|-----|---------------------|
| 5 | 연 100억+ 또는 다운 시 시간당 1억+ |
| 4 | 연 10~100억 또는 다운 시 시간당 1천만~1억 |
| 3 | 연 1~10억 |
| 2 | 연 1억 미만 |
| 1 | 매출 기여 없음 (내부 도구) |

---

## 4. Strategic Alignment

### 측정 방법
- 회사 비전·연도 KPI와의 정렬도
- C-Level 관심도
- 차년도 로드맵 포함 여부

### 점수 기준
| 점수 | 의미 |
|-----|------|
| 5 | C-Level 직접 후원 + 차년도 핵심 이니셔티브 |
| 4 | 부문장 직접 후원 + 1~2년 내 주요 변화 예정 |
| 3 | 일반 운영 시스템, 큰 변화 없음 |
| 2 | 우선순위 낮음, 점진적 축소 검토 |
| 1 | 사양 영역, 폐기 검토 |

---

## 5. Code Quality Score

### 측정 방법
- SonarQube: Maintainability Rating (A~E), Technical Debt Ratio (%)
- CAST Highlight: Software Health Score
- 단위 테스트 커버리지 (%)
- 코드 리뷰 통과율

### 점수 기준
| 점수 | SonarQube 등급 | Tech Debt Ratio | Test Coverage |
|-----|---------------|----------------|--------------|
| 5 | A | < 5% | > 80% |
| 4 | A or B | 5~10% | 60~80% |
| 3 | B or C | 10~20% | 40~60% |
| 2 | C or D | 20~40% | 20~40% |
| 1 | D or E | > 40% | < 20% |

---

## 6. Architecture Modernity

### 측정 방법
- 모놀리스 vs 마이크로서비스 정도
- 클라우드 네이티브 12 Factor 충족도
- API-first 설계 정도
- 컨테이너화·자동 확장 가능성

### 점수 기준
| 점수 | 의미 | 매칭 6R |
|-----|------|--------|
| 5 | 마이크로서비스 + 컨테이너 + API-first + 자동 확장 | (변환 불요 또는 Rehost) |
| 4 | 모듈화된 모놀리스 + 컨테이너 + 부분 자동화 | Replatform / Refactor |
| 3 | 모놀리스 + VM + 기본 자동화 | Refactor / Rearchitect |
| 2 | 모놀리스 + 베어메탈 + 수동 운영 | Rearchitect / Rebuild |
| 1 | 메인프레임 또는 매우 노후화된 아키텍처 | Rebuild / Replace |

---

## 7. Operational Stability (DORA 5메트릭)

### 측정 방법
[`references/dora/01-software-delivery-performance.md`](../dora/01-software-delivery-performance.md) 참조.

### 점수 기준 (DORA Top % 기반)

| 점수 | 의미 | DORA 매핑 |
|-----|------|---------|
| 5 | 일 1회 이상 배포, 1일 이내 리드타임, 1시간 이내 복구, CFR 8% 이하 | Top 25% |
| 4 | 주 1회 이상 배포, 1주 이내 리드타임, 1일 이내 복구, CFR 16% 이하 | Top 50% |
| 3 | 월 1회 이상 배포, 1개월 이내 리드타임, 1주 이내 복구, CFR 32% 이하 | Top 75% |
| 2 | 분기 1회 배포, 6개월 이내 리드타임, 1개월 이내 복구 | Top 95% |
| 1 | 연 1~2회 배포, 6개월+ 리드타임, 6개월+ 복구 | 하위 5% |

> 점수 1~2 + Business Value 4~5 = MIGRATE / Rearchitect 시급 후보

---

## 8. Data Coupling

### 측정 방법
- 다른 시스템과 공유하는 DB 수
- 데이터 사일로 정도
- 단일 진실의 원천(Single Source of Truth) 확보 여부

### 점수 기준
| 점수 | 의미 |
|-----|------|
| 5 | 독립 DB, 명확한 API 경계, 사일로 없음 |
| 4 | 주로 독립 DB, 일부 공유 인터페이스 |
| 3 | 일부 공유 DB, 일부 사일로 |
| 2 | 다수 공유 DB, 사일로 다수 |
| 1 | 모놀리식 DB 공유, 분리 거의 불가능 |

> 점수 1~2 = Rearchitect 리스크 ↑↑ (DB 분리가 가장 큰 난관). Rebuild 또는 Replace 검토

---

## 9. Tech Stack Currency

### 측정 방법
- 사용 중인 언어·프레임워크의 LTS/EOL 상태
- 보안 패치 가용성
- 시장에서의 인력 풀

### 점수 기준
| 점수 | 의미 |
|-----|------|
| 5 | 최신 LTS, 활발한 커뮤니티, 인력 풀 풍부 |
| 4 | LTS 지원 중, 인력 가용 |
| 3 | LTS 만료 예정 (1~2년 내), 인력 가용 |
| 2 | LTS 만료, 보안 패치 비공식, 인력 부족 |
| 1 | EOL, 보안 패치 없음, 인력 거의 없음 (예: VB6, COBOL 일부) |

> 점수 1 = Replatform 가능성 ↓, Rebuild 또는 Replace 우선

---

## 10. Team Capability / Knowledge

### 측정 방법
- 시스템 도메인 전문가 수
- 핵심 인력의 잔류 가능성
- 팀의 클라우드·DevOps 역량 수준
- DORA AI Capabilities 자가평가 점수

### 점수 기준
| 점수 | 의미 |
|-----|------|
| 5 | 도메인 전문가 다수, 클라우드·DevOps 숙련, 외부 영입 가능 |
| 4 | 핵심 도메인 전문가 보유, 클라우드 학습 중 |
| 3 | 일부 도메인 전문가, 기본 클라우드 가능 |
| 2 | 도메인 전문가 1~2명, 클라우드 경험 거의 없음 |
| 1 | 도메인 전문가 거의 없음 (퇴사·은퇴), 외주 의존 |

> 점수 1~2 + Rearchitect/Rebuild 권장 = **리스크 ↑↑** (재평가 필요)

---

## 11. Vendor Lock-in / License Cost

### 측정 방법
- 상용 SW 라이선스 비용 (연간)
- 벤더 독점 기능 의존도
- 마이그레이션 시 데이터 추출 가능성

### 점수 기준 (1=Lock-in 심함, 5=독립적)
| 점수 | 의미 |
|-----|------|
| 5 | 오픈소스 기반, 벤더 독립적 |
| 4 | 일부 상용, 표준 인터페이스 사용 |
| 3 | 상용 SW 사용, 마이그레이션 가능 |
| 2 | 강한 벤더 종속, 데이터 추출 어려움 |
| 1 | 완전 종속 (예: 메인프레임), 라이선스 비용 폭증 |

> 라이선스 비용이 매우 큰 경우 → Replace (SaaS) 또는 Replatform (오픈소스 대체) 우선

---

## 12. Regulatory / Compliance Constraint

### 측정 방법
- 데이터 주권 요건 (예: 개인정보, 금융)
- 외부 SaaS 사용 가능 여부
- 감사·인증 요건

### 점수 기준 (1=제약 심함, 5=제약 없음)
| 점수 | 의미 |
|-----|------|
| 5 | 제약 없음, 어떤 클라우드/SaaS도 가능 |
| 4 | 가벼운 제약 (계약·SLA만 충족) |
| 3 | 일부 데이터는 국내 클라우드 또는 자체 운영 필요 |
| 2 | 강한 제약 (망분리, 특정 인증 필수) |
| 1 | 외부 SaaS·클라우드 불가, 자체 데이터센터 필수 |

> 점수 1~2 = Replace (외부 SaaS) 비권장, Refactor 또는 Rearchitect 우선

---

## 13. Lifecycle Remaining (Years)

### 측정 방법
- 비즈니스 측에서 명시한 운영 예정 기간
- 사양 산업·기술 트렌드 반영

### 점수 기준
| 점수 | 잔여 라이프사이클 |
|-----|----------------|
| 5 | 10년 이상 (전략 자산) |
| 4 | 5~10년 |
| 3 | 3~5년 |
| 2 | 1~3년 (단기 운영 후 폐기 예정) |
| 1 | 1년 미만 (즉시 Retire) |

> Refactor는 점수 4~5인 경우만 ROI 정당화 가능

---

## 14. Change Frequency (Recent 12mo)

### 측정 방법
- 최근 12개월 내 배포 횟수
- 기능 추가·변경 요청 수
- 향후 12개월 변경 계획

### 점수 기준
| 점수 | 변경 빈도 |
|-----|---------|
| 5 | 일/주 단위 변경 — 매우 활발 |
| 4 | 월 단위 변경 |
| 3 | 분기 단위 변경 |
| 2 | 반기/연 1~2회 변경 |
| 1 | 12개월간 변경 없음 |

> 점수 1~2 + Business Value ↓ = Retain/Retire 후보
> 점수 4~5 + Operational Stability ↓ = MIGRATE/Refactor 시급

---

## 입력 속성 → 6R 강한 신호 (Strong Signal) 매트릭스

특정 속성 조합이 특정 6R를 **강하게** 지시하는 경우:

| 속성 조합 | 강한 신호 |
|---------|---------|
| Business Value 1~2 + Lifecycle ≤ 1년 | **Retire** |
| Business Value 1~2 + 동일 기능 SaaS 존재 | **Replace** |
| Business Value 1~2 + 건강도 심각(4~5) | **Eliminate** (즉시 폐기) |
| Business Value 4~5 + Operational Stability 1~2 + 건강도 취약(6~10) + Lifecycle ≥ 5년 | **Rearchitect** (시급) |
| Business Value 4~5 + 건강도 심각(4~5) + 도메인 재정의 가능 | **Rebuild** (재구축 불가피) |
| Business Value 4~5 + Code Quality 3~4 + 도메인 분리 미실현 | **Refactor** (모놀리스 유지 + 클라우드 서비스 연동) |
| Business Value 4~5 + Code Quality 4~5 + Operational Stability 4~5 | **Retain** 또는 Rehost (구조 변경 불요) |
| License Cost 매우 높음 + 동일 오픈소스 대안 존재 | **Replatform** 1순위 |
| Regulatory Constraint 1~2 + 외부 SaaS 검토 | **Replace 비권장** |
| Tech Stack Currency 1 + Team Capability 1~2 | **Replace** 우선 검토 |
| 모든 점수 평균 1~2 | **Retire 또는 Replace** |
| 모든 점수 평균 4~5 | **INVEST + Retain/Refactor** (TIME 정밀 평가) |

> 본 매트릭스는 [`04-matching-rules.md`](04-matching-rules.md) 의 결정 규칙으로 정형화됨.

---

## 입력 데이터 수집 체크리스트

`6r-matcher` 가 추천 전에 다음 데이터가 갖춰졌는지 확인:

- [ ] 14개 속성 모두 1~5 점수화됨 (또는 N/A 명시)
- [ ] 가중치 적용 종합 점수 (Business Value, Technical Fit) 계산됨
- [ ] DORA Cluster 1~7 매핑됨
- [ ] A/B/C 등급 부여됨 (STEP 2-2 산출물)
- [ ] 의존성 시스템 목록 확보됨
- [ ] 도메인 전문가 인터뷰 1회 이상 완료
- [ ] 보안·컴플라이언스 검토 완료

---

[Top](#의사결정-입력-기준-system-attributes)
