# 03. Rearchitect/Rebuild 서비스 기획 및 설계

> **커리큘럼 목표**  
> Rearchitect/Rebuild 대상으로 판정된 서비스의 **상위수준 기획 → 기획 구체화 → 아키텍처 설계** 3단계 방법론 학습.  
> 애자일 기반 DEFINE-BUILD-MEASURE 라이프 사이클 전체를 Lean Startup·DT·DDD·Scrum/Kanban으로 커버.

---

## 3.0 애자일 제품/서비스 개발 라이프 사이클

| 단계 | 활동 | 프레임워크 |
|------|------|----------|
| DEFINE — 대상 고객 & 문제 정의 | 관찰/체험/인터뷰, 유저 저니맵, 5 WHY, 공감맵, 문제 가설·검증 | Lean Startup & Design Thinking |
| DEFINE — 비즈니스 도메인 정의 | 도메인 분해 → 도메인 분해도 → 식별된 문제 도메인 | Lean Startup & DDD(전략) |
| DEFINE — 비즈니스 모델 기획 | 아이디에이션, 디자인 씽킹, 린 캔버스, 스토리보드, 낮은 수준 MVP, 솔루션 검증, 피보팅 | Lean Startup |
| DEFINE — 기획 구체화 | 이벤트 스토밍, 바운디드 컨텍스트, 유저 스토리, 프로덕트 백로그, 프로토타입, 화면 설계 | DDD(전술) & 스크럼/칸반 |
| BUILD — 아키텍처링 | 외부/내부 아키텍처, 화면/콘텐츠 설계, TDD, QA, CI/CD 파이프라인 | — |
| MEASURE — 제품 검증 & 피보팅 | 핵심 지표 분석, A/B 테스팅, 피보팅 토의 | Lean Startup |

---

# Part A. 상위수준 기획

## A.1 상위수준 기획 프레임워크 — GREAT 2 WHY

```
[Problem Area]                    [Solution Area]
WHY1: 문제의 근본 원인            WHY2: 서비스 목적
문제 정의 ────────────── 방향성 정의 ────────────── 솔루션 정의
                                  고유가치(75%) / 핵심 솔루션(25%)
```

---

## A.2 문제 정의 및 검증

### 1) 고객유형 정의 (MECE)

고객이 제품/서비스로 완수하려는 **과업(JTBD: Jobs To Be Done)** 별로 고객 유형 정의.

**예시 — 전자상거래 고객 유형**

| 유형 | 설명 | 서비스 전략 |
|------|------|-----------|
| Intent-Based Customer (구체적 목적 있음) | 어떤 상품을 살지 명확히 인지 | 자주/최근 구매 상품 노출, 빠른 가격 제시 → 장바구니·바로 구매 유도 |
| Intent-Discovery Customer (목적 있지만 발견 필요) | 상품군은 알지만 특정 상품 미정 | 고객 정보·유사 패턴 고려한 추천, 가격 노출, 상품평·관련 정보 제공 |
| Pure-Discovery Customer (발견을 원함) | 구체적 목적 없이 둘러봄 | 신제품/트렌드 상품 노출, 추천 |

> 단순 성별·나이·직업으로 분류하면 JTBD가 달라 맞춤 서비스 불가.  
> **밀크쉐이크 스토리** 참고: https://happycloud-lee.tistory.com/263

### 2) 정보 수집 — 고객 경험 인터뷰

| 구분 | 목적 | 내용 |
|------|------|------|
| 기본 정보 | 인터뷰 기본 정보 작성 | 일시·장소·이름·성별·연령·연락처 |
| 인사말 | 감사 인사, 도메인·대상·목적 설명 | — |
| 인구통계학적 정보 | 통계 작성 기본 질문 | 경력, 기존 서비스 사용 경험, 빈도 |
| 고객 경험 | 여정 단계별 행동과 생각/느낌 | Step별 행동·접촉 대상·긍정/부정 느낌 질문 |
| 마무리 | 감사 인사, 다음 인터뷰 요청, 대상자 소개 요청 | — |

### 3) 고객 경험 여정 이해 — User Journey Map

1. 페르소나와 목표 정의
2. 고객 여정 단계 정의(사전·사용·사후)
3. 고객 행동과 터치포인트 식별
4. 행복감 점수 평가(5점 만점)
5. 생각·느낌·고충 표현(감정적 단어)
6. 기회 영역 식별 및 비즈니스 중요도 평가(5점 만점)

### 4) 문제 가설 수립 — 5 WHY

표면 문제에 대해 5번 "왜?"를 반복하여 근본 원인(킹핀) 도출.

**예시 — 제퍼슨 기념관 기둥 부식**
- W1: 왜 기둥이 부식? → 비눗물로 자주 닦아서
- W2: 왜 자주 닦나? → 비둘기 똥이 떨어져서
- W3: 왜 비둘기가 많나? → 기념관에 거미가 많아서
- W4: 왜 거미가 많나? → 해지기 전 전등을 켜서 나방이 모여서
- W5: 왜 전등을 일찍 켜나? → 직원들이 해지기 전 퇴근해서

### 5) 문제 검증 인터뷰 및 피보팅

- 인터뷰 대상자 섭외 → 인터뷰지 작성 → 1:1 인터뷰 → 결과 통합
- **피보팅 판단**: 중요도·불편도 낮은 가설 제외, 고객 제시 신규 문제 추가 여부 결정, 추가 인터뷰 수행 여부 결정

---

## A.3 방향성 정의 — Needs Statement

```
<사용자>는 <목적>을 위하여 <원하는 것>이 필요하다.
```

**예시**:  
"트렌드에 맞춰가고 싶지만 바빠 뒤쳐져 불안한 박지희는, 자신에게 적합하고 필요한 제품이 무엇인지 알기 위해, 똑똑한데 친구 같은, 진정성 있는 조언을 해줄 수 있는 서비스가 필요하다."

---

## A.4 솔루션 정의

### 아이디어 도출 — Crazy 8 변형
- Big Idea 3개: 기술/툴이 아닌 **경험·느낌** 중심의 근본 해결 아이디어
- Little Win 2개: 실행 가능성 높은 작은 아이디어
- Crazy Idea 1개: 미친 아이디어

### 우선순위 평가 — 2×2 매트릭스

| 구분 | 비즈니스 가치 低 | 비즈니스 가치 高 |
|------|---------------|---------------|
| 실현 가능성 高 | Utilities (선택적 채택) | **No Brainers (무조건 선정)** |
| 실현 가능성 低 | Unwise (버림) | Big Bets (선택적 채택) |

---

## A.5 비즈니스 모델 정의 — Lean Canvas

Lean Canvas 9영역:

| ② 문제 | ④ 솔루션 | ③ 고유 가치 제안 | ⑨ 경쟁 우위 | ① 고객군 |
|-------|---------|----------------|-----------|---------|
| 가장 중요한 2~4개 문제. 기존 대안 식별. | 가장 중요한 핵심 해결책. | 차별화된 고유 가치 + High-level Concept(슬로건). | 조직/사람/제품이 갖는 경쟁 우위. | JTBD별 고객유형. Early Adopter는 범위 줄여 작성. |
| **⑧ 핵심 지표** | | | **⑤ 채널** | |
| 서비스 시작 후 측정 지표. 해적지표(AARRR) 이용. | | | 고객의 접근 채널. | |
| **⑦ 비용 구조** | | | **⑥ 수익 구조** | |
| 고정비(임대료·인건비·호스팅) + 변동비(고객 획득·유통). | | | 수익 모델(수수료·판매·광고), LTV, 매출, 영업이익. | |

**Build → Measure → Learn 순환**:
- 문제/해결책 적합성 → 해결책/시장 적합성 → Scale Up

> 린 캔버스는 1회성이 아니며 추가/피보팅 시마다 업그레이드. 좌측 상단에 버전·작성일 필수 표시.

---

# Part B. 기획 구체화

## B.1 DDD 개요

**DDD(Domain Driven Design)**: 비즈니스 도메인을 깊이 이해하여 소프트웨어 설계에 반영하는 설계 방식.  
**창시자**: Eric Evans, 2003년 저서 *Domain-Driven Design: Tackling Complexity in the Heart of Software*.

**목표**: Loosely Coupling, High Cohesion.

### WHY-HOW-WHAT

| 측면 | 내용 |
|------|------|
| WHY | 업무 이해 바탕의 설계, Loosely Coupling·High Cohesion |
| HOW | 핵심 업무 집중 → 도메인 분해 / Biz와 IT가 함께 설계 → 이벤트 스토밍 / 유비쿼터스 Language 사용 |
| WHAT | 도메인 분해도, 바운디드 컨텍스트, 도메인 모델, 컨텍스트 맵, 애그리게이트 |

---

## B.2 전략 설계

### 1) 도메인 분해 — "선택과 집중"

| 구분 | 설명 | 전략 |
|------|------|------|
| **Core Sub-Domain** | 비즈니스 차별성 제공 | 집중 투자, 전략 설계 대상 |
| **Supporting Sub-Domain** | 핵심 도메인 지원, 차별화 요소 없음 | 외부 솔루션/프레임워크 사용 가능 |
| **Generic Sub-Domain** | 공통 업무, 비즈니스 차별성 무관 | 외부 솔루션/서비스 이용 권장 |

### 2) 이벤트 스토밍 (Event Storming)

Bounded Context를 식별하는 방법론.

| Step | 활동 |
|------|------|
| 1. Domain Events Discovery | 도메인 내 발생 이벤트를 **과거형**으로 기술 |
| 2. Tell the Story | 이벤트로 업무 흐름 이해·토론·보완 |
| 3. Find the Boundaries | 이벤트를 프로세스로 그룹핑, 핵심 프로세스 식별, 누락 이벤트 추가 |
| 4. Locate the Commands | Event를 발생시키는 명령을 **현재형**으로 기술 |
| 5. Identify Triggers | Command를 일으키는 Actor, Event를 일으키는 External System·Policy/Rule 정의 |
| 6. Identify Aggregates | Command·Event 처리를 위해 CRUD하는 데이터 객체 정의 |
| 7. Define Bounded Context | Step 3 경계와 Step 6 Aggregate 기준으로 Bounded Context 정의 |
| 8. Draw Context Map | Bounded Context 간 관계 도식화 |

### 3) 유비쿼터스 언어

도메인 내 동일 의미로 이해되는 공통 언어. 코드까지 반영됨.

**예시 — 은행 도메인**  
계좌(Account), 입금(Deposit), 출금(Withdrawal), 이체(Transfer), 잔액(Balance).

### 4) 마이크로서비스 분할

```
Bounded Context → (비즈니스 중요도 + 부하 변화도 고려) → 마이크로서비스 N개
```

**분할 기준**:
- **비즈니스 중요도**: 차별화 필요·자주 배포 → 독립 빌드/배포 위해 별도 서비스
- **부하 변화도**: 부하 변동 큼·스케일링 필요 → 서비스 분리

**분할 단계**:
1. Bounded Context를 기능 그룹으로 그룹핑
2. 비즈니스 중요도·부하 변화도 고려하여 후보 정의
3. 후보 크기 너무 작으면 합침(Supporting은 통합 가능)
4. 최종 검토 및 확정

> 최소 비용으로 운영 가능한 마이크로서비스 개수를 찾는 것이 목표.

---

## B.3 요구사항 작성 — 유저 스토리

**WHY**: 개발할 사용자 요구사항 정의, 구성원 간 공통 이해·공감.

**HOW**:
- 고객 중심·사용자 언어로 작성
- 각 스토리는 독립적·고유 목표 보유
- **에픽(Epic)** 으로 분류하여 작성
- 제목 부여로 커뮤니케이션 용이
- **수용 기준(Acceptance Criteria)** 반드시 포함
- 개발팀과 지속적 정제

**활용**:
- 제품 백로그(Product Backlog) 기본 단위(유저 스토리 : 백로그 = 1:N)
- 스프린트 계획 회의에서 구현 스토리 선정
- 스토리 포인트 산정으로 팀 속도 예측

**포맷**:
```
<스토리 제목>: <유저 유형>으로서 | 나는 <비즈니스 목적>을 위해 | <작업/기능>을 원합니다.
```

**예시 — 암호 유효성 검사**
| 항목 | 값 |
|------|-----|
| ID | FRQ-USR-040 |
| Epic | 회원가입 |
| 유저 스토리 | 방문자로서 나는, 내 정보 보안을 위해, 보안 수준이 높은 암호를 사용하기 원함 |
| Biz 중요도 | M (MoSCoW 분류법: Must / Should / Could / Won't — Dai Clegg, 1994 제안) |
| 수용 기준 | 영어/숫자/특수문자 1자 이상, 8자 이상, 암호·암호확인 일치 |
| 스코어 | 13 |

---

## B.4 프로토타입 제작 — 낮은 수준 MVP

- 피그마 또는 HTML로 프로토타이핑 개발
- 솔루션 검증 인터뷰로 피드백 수렴 → 피보팅

**솔루션 검증 인터뷰 항목**:
1. **주요 화면 피드백** (랜딩 페이지 필수)
   - 어떤 일을 하는 서비스라고 느끼는가?
   - 시선이 가는 곳 순서?
   - 핵심 정보 전달 여부
2. **전체적 평가** (5점 척도)
   - 용어 명확성/친근함, 사용 의향, 추천 의향, 마음에 드는 기능, 유료 사용 의향(Y/N)
3. **추가/보완 사항** (3점 척도)
   - 계획된 추가 기능의 필요도

---

# Part C. 아키텍처 설계

## C.1 아키텍처 설계 개요

### WHY
- **4S**: Speedy, Service Always, Save Cost, Security
- 유지보수와 테스트가 쉬운 소프트웨어 설계

### HOW
1. **Outer Architecture 설계**: MSA 개발·빌드·배포·운영 환경 + 서비스 상호작용
2. **Inner Architecture 설계**: 내부 시퀀스, Layered/Hexagonal/Clean 아키텍처, API 설계
3. **클라우드 디자인 패턴**: 내/외부 아키텍처 전반의 베스트 프랙티스

### WHAT — 산출물
- 논리 아키텍처, 시퀀스 다이어그램, API 설계서, 메시지/이벤트 설계서
- 클래스 설계서, DB 설계서(ERD), 프론트엔드 설계서(스토리보드·IA)
- 물리 아키텍처(클라우드 인프라·네트워크 보안, CI/CD 파이프라인)

---

## C.2 Outer Architecture — 목표

> 암기법: **"Smart Red Fox Prefer Shiny Objects"** (똑똑한 빨간 여우는 빛나는 물체를 좋아한다)

| 목표 | 가이드라인 | 실현 방법 | 주요 제품 |
|------|----------|---------|---------|
| **S**calability (확장성) | 개별 서비스 독립 스케일, 외부 아키텍처 요소도 확장 | 컨테이너 오케스트레이션 + 서비스 메시로 트래픽 최적화 | Kubernetes, Istio |
| **R**esilience (탄력성) | 장애 전파 방지, 이벤트 주도 아키텍처로 결합도 감소 | 서킷 브레이커, Timeout/Retry/Fallback, Chaos Eng. | Resilience4j, Istio / Kafka, RabbitMQ / Chaos Monkey |
| **F**lexibility (유연성) | 서비스 추가/변경 용이 | API G/W 프로토콜 변환·버전 관리, 설정 외부화, 서비스 디스커버리 | Kong, SCG / Spring Cloud Config / Eureka |
| **P**erformance (성능) | 통신 지연 최소화, 높은 처리량 | 캐싱, CDN, 비동기 통신, 배치 처리, 성능 테스트 자동화 | Redis, Memcached / CloudFront / Kafka / JMeter |
| **S**ecurity (보안) | API 인증·인가·암호화 일관 적용 | OAuth/JWT, TLS, 취약점 스캔, 보안 감사 | Keycloak, Okta / Istio / SonarQube |
| **O**peration (운영) | 실시간 모니터링, 운영 자동화 | 통합 로깅·모니터링, 분산 추적, CI/CD, IaC | EFK / Prometheus·Grafana / Jaeger·Zipkin / Jenkins·ArgoCD / Terraform |

---

## C.3 Outer Architecture — MSA 플랫폼 7대 구성 요소

> 기억 TIP: **"맛있는(M) 아침(A) 식사(S)는 바나나(B), 토스트(T), 커피(C)와 쿠키(C)다"**

1. **① API Gateway** — 라우팅/로드밸런싱, 인증/인가, 유량 제어, 로깅
2. **② CI/CD** — SCM(Git), CI(Jenkins), CD(ArgoCD), 협업(Jira, Slack)
3. **③ 원격 모니터링(Telemetry)** — 통합 로깅, 메트릭 모니터링, 트랜잭션 추적
4. **④ 메시지 브로커** — Kafka, RabbitMQ (Backing Services에 포함)
5. **⑤ Service Mesh** — 트래픽 관리, 정책 제어, 로깅/메트릭/추적, 탄력성·보안
6. **⑥ 컨테이너 관리 플랫폼** — k8s, EKS, AKS, GKE, OCP
7. **⑦ Backing Services** — DB, 메시지 브로커, 캐시, 서비스 디스커버리, 서비스 설정 관리 (Circuit Breaker 포함)

---

## C.4 MSA Features & 12 Factors

### MSA Features (마틴 파울러)
- **Loosely Coupling**: 각 서비스 자체 Biz 로직·DB 보유, 라이브러리 Embed, API 통신
- **Build/Deploy**: 실패 대비 설계(Circuit Breaker), CI/CD 자동화, Build/Release/Run 분리
- **Scaling**: 여러 인스턴스 동시 실행, Stateless
- **Iterative**: 점진적 지속 개선, Not Project → On-going Product

### 12 Factors (Adam Wiggins, Heroku — 초판 2011, 12factor.net)
| 항목 | 설명 |
|------|------|
| Codebase | OSMU(One Source Multi Use) 가능한 Git |
| Dependencies | 의존관계 명시화 |
| Config | 환경 설정 분리 및 실행 시 동적 주입 |
| Backing Services | DB·MQ·캐시 탈착 가능 |
| Build/Release/Run | 단계 분리로 안전성·일관성 |
| Processes | Stateless |
| Port Binding | 서비스 외부·내부 포트 바인딩 |
| Concurrency | 여러 인스턴스 동시 실행 |
| Disposability | 부담 없는 폐기 가능 (cattle not pets) |
| Dev/Prod Parity | 유사 환경 유지 |
| Logs | 외부 수집·저장·가시화 (EFK) |
| Admin Processes | 일회성 관리 작업 분리 |

---

## C.5 MSA 7대 요소 상세

### ① 마이크로서비스 vs 컨테이너

- 마이크로서비스 = 아키텍처 패턴, 컨테이너 = 프로세스 격리 기술
- 마이크로서비스는 컨테이너화가 효과 극대화이나 VM/베어메탈 설치형도 가능
- **컨테이너화 어려운 경우**: 조직 준비도 부족, 성능 최적화 필수(대용량 처리), 기술 제약(Unix 전용 라이브러리)

### ② API Gateway

Client와 마이크로서비스 간 중계자. 기능:
- **트래픽 관리**: 라우팅/로드밸런싱
- **로깅**: 유통 트래픽 기록
- **보안 강화**: 인증/인가
- **탄력성**: Circuit Breaker, 재시도, 타임아웃
- **정책 제어**: 트래픽/유량 제어 (예: 대기 번호 발급)

**유스케이스**:
- Strangler Fig 지원(레거시/신규 분기)
- Canary 배포
- 프로토콜 변환(HTTP·gRPC·GraphQL)

### ③ Service Mesh

서비스 간 통신을 **인프라 계층**에서 관리. 사이드카 패턴으로 프락시 배치.

| 구분 | API Gateway | Service Mesh |
|------|-----------|-------------|
| 담당 | 클라이언트 접점 | 서비스 간 통신 |

> 소규모·단순 통신은 API G/W가 서비스 메시 역할 가능.

### ④ Backing Services

#### 데이터베이스

| 구분 | 주요 제품 |
|------|---------|
| 관계형 DB | MySQL(Oracle/MariaDB), PostgreSQL, Oracle DB, IBM DB2, MS SQL Server |
| NoSQL DB | MongoDB, Couchbase, Cassandra, DynamoDB, Redis |

#### 메시지 브로커

Kafka(대규모 실시간), RabbitMQ(오픈소스 대표), ActiveMQ, Amazon SQS, Azure Service Bus.

#### 캐시

> MSA에서는 공유 캐시가 아닌 **서비스별 독립 캐시** 필수.

Redis(인메모리 DB 대표), Memcached, Hazelcast, Couchbase, ElastiCache, Cloud Memorystore.

#### 서비스 디스커버리

- **역할**: 서비스 레지스트리(주소 등록) + 디스커버리(주소 조회)
- **제품**: Spring Cloud Eureka, Consul, Etcd, Apache Zookeeper

#### 서비스 설정 관리

- **역할**: 설정 외부화, 실행 시 주입, 동적 반영, 환경별(개발/스테이징/운영) 적용
- **제품**: Spring Cloud Config, Consul, Etcd, Zookeeper

#### CAP 이론

분산 시스템은 Consistency·Availability·Partition Tolerance 중 **최대 2개만 보장 가능**.  
**창시자**: Eric Brewer, 2000년 PODC 기조연설에서 제시. 2002년 Seth Gilbert·Nancy Lynch가 공식 증명.

| 조합 | 특성 | 사용 예 | 추천 DB |
|------|------|--------|--------|
| **CA** | 가용성 + 일관성 중요, 통신 장애 시 일시적 장애 서비스 포기 | 실시간 결제, 온라인 예약 | MySQL, PostgreSQL, Oracle, Redis, Memcached |
| **AP** | 네트워크 단절에도 가용성 중요, 데이터 정합성 일시 포기 | SNS 피드, 실시간 분석 | NoSQL 전반 |
| **CP** | 네트워크 단절에도 일관성 중요, 가용성 일시 포기 | 선거관리, 의료정보, 재고관리, 금융거래 | MongoDB, HBase, Redis, ZooKeeper, Google Spanner, CockroachDB |

**ORM 사용 권장**: JPA(MyBatis, Hibernate, EclipseLink, OpenJPA), Node.js(Sequelize, Mongoose, TypeORM), Python(Django ORM, SQLAlchemy).

### ⑤ CI/CD

**CI/CD = 빌드·테스트·배포 자동화 방법론**

| 단계 | 설명 |
|------|------|
| Build (CI) | 실행파일 생성, 테스트, 컨테이너 이미지 생성 |
| Release (Continuous **Delivery**) | 배포 이미지 저장소 등록, 배포 준비 |
| Run (Continuous **Deployment**) | 대상 환경에 실제 배포 |

**Spring Boot 파이프라인 예시**:

| 단계 | 도구 |
|------|------|
| Git 소스 변경 → 파이프라인 자동 시작 | GitHub/GitLab/Bitbucket, Jenkins |
| 실행파일(Jar) 생성 | Gradle/Maven |
| 테스트 코드 수행 + 코드 커버리지 | Gradle/Maven, Jacoco |
| 소스 품질 점검 | SonarQube |
| 소스 보안 취약성 | Sparrow |
| 품질 기준 만족 검사 | SonarQube |
| 컨테이너 이미지 생성 | Docker/Podman |
| 이미지 보안 취약성(OS·Runtime) | Trivy |
| 컨테이너 이미지 저장소 푸시 | Docker/Podman → Harbor, DockerHub, ECR/ACR/Artifact Registry |
| 배포 매니페스트 생성 | Kustomize, Helm |
| 대상 환경 배포 | Kubectl, Helm |
| 배포 완료 통보 | Slack, Teams |

**ArgoCD로 CI와 CD 분리 — GitOps**

| 구분 | Push Deployment | Pull Deployment(ArgoCD) |
|------|---------------|----------------------|
| 결합도 | CI·CD 강결합 | CI·CD Loosely Coupling |
| 책임 | 개발팀이 배포 책임 | 개발팀·배포팀 책임 명확 분리 |
| 신뢰 공급원 | 배포 manifest 개발팀 관리 | Git = Single Source of Truth |
| 롤백 | 개발팀 책임 | Git revert로 손쉬운 롤백 |

### ⑥ 원격 모니터링 (Telemetry)

| 영역 | 정의 | 대상 | 수행 방법 |
|------|------|------|---------|
| **Logging** | 문제 진단·사용자 행동 분석·법적 요구사항 준수용 기록 | 앱·시스템·액세스·에러 로그 | 콘솔 스트리밍(Log4J), EFK 스택(Fluent-ElasticSearch-Kibana), 로그 회전 |
| **Monitoring** | 사전 감지·리소스 최적화용 성능·가용성 측정 | 서버·인프라 메트릭, 앱 메트릭, 비즈니스 메트릭 | 에이전트 설치, Prometheus·Grafana, 경고 규칙 |
| **Tracking** | 문제 발생 시 근본 원인 파악 | 서비스 간 호출 흐름, 요청 처리 경로, 외부 서비스 호출 | 추적 라이브러리, Jaeger·Zipkin |

### ⑦ 컨테이너 관리 플랫폼

**역할**:
- 컨테이너 생애주기 관리(스케줄링·자원 할당·자가 치유)
- 서비스 디스커버리·로드 밸런싱
- 설정·시크릿 관리, 스토리지 관리
- 확장성·자원 관리(오토 스케일링)
- 모니터링·로깅, 인증/인가(쿠버네티스 오브젝트)

**주요 제품 비교**:

| 구분 | 공급자 | 라이선스 | 온프레 설치 | 장점 | 단점 |
|------|-------|--------|---------|------|------|
| Vanilla Kubernetes | CNCF | 오픈소스 | 지원 | 클라우드 중립 | 버전·관리 직접 |
| OCP(OpenShift) | RedHat | 상용 | 지원 | UI 사용 쉬움 | 라이선스 비용 |
| EKS | AWS | 상용 | 미지원 | AWS 네이티브 연계 | Vendor Lock-in |
| AKS | Azure | 상용 | 미지원 | Azure 네이티브 연계 | Vendor Lock-in |
| GKE | Google | 상용 | 미지원 | GCP 네이티브 연계 | Vendor Lock-in |

---

## C.6 서비스 상호작용 설계

### 1) 논리 아키텍처

마이크로서비스 중심으로 프론트엔드, API G/W, 외부 서비스, AI 서비스, MQ, DB, 레거시 간 논리적 관계 설계.

**예시 구성요소**:
- 클라이언트(Web·Mobile) → API Gateway(인증·인가·라우팅·Rate Limit)
- 마이크로서비스 레이어(요청접수·설비할당·작업배정·장비연동·준공처리·모니터링 등)
- AI 서비스(Python/FastAPI) — SLA 예측·보완추천·검증
- 이벤트 버스(Kafka / Azure Event Hubs) — Pub/Sub, DLQ, 파티션 순서 보장
- 데이터 레이어(Redis Cache, Event Store PostgreSQL)
- 레거시 연동(Strangler Fig + ACL: Anti-Corruption Layer)

### 2) 외부 시퀀스 설계

비즈니스 유즈케이스별로 서비스·프론트엔드·API G/W·외부 서비스·MQ·DB·레거시 흐름 설계.

### 3) 동기/비동기 통신 설계

| 축 | 구분 | 대표 표현 |
|----|------|---------|
| Blocking | 요청자가 결과 올 때까지 대기 | — |
| Synchronous | 요청자가 결과 완료를 직접 신경씀 | — |

**4가지 조합**:

| 조합 | 예시 | 패턴 |
|------|------|------|
| Blocking + Sync | "잠깐만 거기 계세요!" 채용 완료까지 붙잡혀서(Blocked) 과정 지켜봄(Sync) | 전통적 I/O (read 호출 후 데이터 대기) |
| Blocking + Async | 붙잡혀서 결과는 안 궁금함 | 안티패턴 — 실무에서 드묾 |
| Non-blocking + Sync | 돌아가서 일함, "채용하셨나요?" 계속 물어봄 | Polling 패턴 |
| Non-blocking + Async | 돌아가서 열일, 완료 시 대표님이 알려줌 | Callback/Event — Node.js, AIO |

**비동기 통신 방식**:
- 직접 통신 시 Callback
- MQ 통신 시 Event

### 4) Event-Driven Architecture (EDA)

#### 핵심 개념

**트랜잭션 vs 분산 트랜잭션**
- 트랜잭션: 한 목적의 작업 모음(예: 피자 주문·결제·주문완료)
- 분산 트랜잭션: 데이터 일관성 보장을 위한 2PC 사용 → 참여 서비스 모두 가용해야 하므로 mSVC 부적합

**ACID vs BASE**

| 특성 | ACID (RDB) | BASE (mSVC) |
|------|-----------|------------|
| Atomic(원자성) | "All or Nothing", 2PC | — |
| Consistency(무결성) | 유효 데이터만 저장 | **Eventually Consistency** (결과적 일관성) |
| Isolation(격리성) | RU/RC/RR/Serialize | — |
| Durability(영속성) | 영구 보관 | — |
| Basically Available | — | 가용성 First = Service Always |
| Soft-state | — | 일시적 데이터 불일치 허용 |

> Service Always 보장 위해 **MQ 통한 비동기 통신** 필수 → EDA 도입.

**Pub-Sub 패턴**: 발행자와 구독자가 MQ 통해 비동기 통신.

**Saga 패턴**: 여러 서비스 간 분산 트랜잭션 데이터 일관성 보장. 실패 시 보상(Compensation) 처리.  
**원논문**: Hector Garcia-Molina & Kenneth Salem, "Sagas", ACM SIGMOD 1987 (Princeton University).

#### Event 메시지 구조

```json
{
  "messageId": "1234555555",
  "type": "OrderCreated",
  "timestamp": "2023-06-15T10:30:00Z",
  "payload": {
    "orderId": "ORDER-12345",
    "customerId": "CUST-67890",
    "orderItems": [ ... ]
  }
}
```
- Header: messageId, type, timestamp
- Payload: 이벤트 본문

#### RabbitMQ vs Kafka

| 항목 | RabbitMQ | Kafka |
|------|---------|-------|
| 목적 | 안정적 메시지 전달 | 대량 메시지 분산 처리 |
| Consumer 수신 확인 | O | X |
| 라우팅 | Exchange와 Queue 바인딩 기반, Direct/Fanout/Topic/Header Exchange | Topic과 파티션 기반, 메시지 Key로 파티션 할당 |
| 메시지 저장소 | 메모리 | 디스크 |
| 메시지 보관 | Consumer 수신 즉시 삭제 | 상시 보관 |
| 처리량/확장성 | 낮음, 클러스터링으로 가능 | 4배↑ 처리량, 파티션 수평 확장 |
| Use case | 작업 큐, 마이크로서비스 통신, 실시간 메시징 | 대규모 분산 메시징, 로그 집계, 이벤트 소싱 |

#### EDA 설계 3대 고려사항

**① 이벤트 순서 보장**

| MQ | 방법 |
|----|------|
| RabbitMQ | 컨슈머 당 전용 큐 1개 할당 / Consistent Hash Exchange 플러그인으로 Routing Key 해싱 |
| Kafka | Topic을 서비스명으로, 파티션 복수 구성, 메시지 Key를 주문ID 같은 고유 ID로 → 동일 ID는 항상 같은 파티션 |

**② 중복 처리 방지**

| MQ | 방법 |
|----|------|
| RabbitMQ | DLQ(Dead Letter Queue) / Consumer 프로그램적 해결(메시지ID 별도 테이블 관리) / Event Sourcing 패턴(멱등성) |
| Kafka | Offset 기반 중복 처리 방지 (Kafka 자체 지원) |

**③ 보상(Compensation) 처리**

- 트랜잭션 참여 서비스 중 하나라도 실패 시 이전 서비스 처리 모두 취소
- 실패 서비스는 실패 이벤트 발행 → 관련 이전 서비스들이 보상 처리
- 패턴: **Saga**

---

## C.7 Inner Architecture — 내부 시퀀스 & 설계 원칙

### SOLID 원칙

| 원칙 | 설명 |
|------|------|
| **S**RP (단일 책임) | 하나의 클래스는 동일 목적의 속성·메소드로만 구성. Loosely Coupling·High Cohesion. |
| **O**CP (개방-폐쇄) | 확장에 열려 있고, 다른 클래스 변경 영향에는 닫혀 있음. |
| **L**SP (리스코프 치환) | 하위 클래스가 부모 클래스를 대체 가능. |
| **I**SP (인터페이스 분리) | 인터페이스에 필요한 메소드만 정의. 인터페이스의 SRP. |
| **D**IP (의존성 역전) | 변동성 큰 클래스는 인터페이스 통해 의존. Factory 클래스 고려. |

> 예: '카메라' 클래스는 변동성 큰 '이미지 처리' 클래스를 직접 참조 대신 '이미지 처리' **인터페이스**를 참조.

### OCP 실현과 DIP 적용

외부 장치(웹·DB·MQ)와 인터랙션하는 저수준 클래스와 비즈니스 로직 고수준 클래스 간 참조를 **인터페이스로 역전**.

- 기능 이름만 정의한 **인터페이스**로 OCP 실현
- 인터페이스에 정의한 기능을 실제 구현
- 참조 방향 바뀜(DIP 적용) → 외부 변화에 영향 받지 않음

---

## C.8 Layered / Hexagonal / Clean 아키텍처

### Layered 아키텍처

**구조**: Presentation → Business Logic → Data Access (상위 → 하위만 참조)

**문제점**:
- 계층 간 의존성 큼 → 하위 변경 시 상위 수정 필요
- 외부 툴/기술 변화에 유연하지 못함 → 비즈니스 로직이 외부와 직접 인터페이스

**개선**:
- 각 계층은 **Interface 통해서만** 통신
- 변동성 많은 Presentation·Data Access를 애플리케이션 범위에서 분리

### Hexagonal vs Clean

**공통점**: 비즈니스 로직과 인프라 로직 분리, 의존성 제거로 유지보수성·테스트 용이성 향상.

**차이점**:
- **Hexagonal**: 외부 요소와의 상호 작용 **추상화** 강조. 계층 대신 **경계(Boundary: inside/outside)** 개념. 창시자: Alister Cockburn.
- **Clean**: 계층(Layer) 간 **의존성 관리** 강조. 창시자: Robert C. Martin(Uncle Bob).

### Hexagonal 구조

```
웹/MQ/외부 툴 → Adapter(Driving) → Port(Driving) → Application(Biz Logic) → Port(Driven) → Adapter(Driven) → DB/외부 툴
```

### Clean 구조

```
웹/MQ → Controller → Use case(입력) → Service → Entity(Biz Logic) → Use case(출력) → Presenter → Gateway → DB
```

### 구현 예시 — Hexagonal (한 프로젝트)

```
src/main/java/com/example/foodorder/
├── OrderApplication.java
├── adapter/
│   ├── in.web/ (OrderController, OrderDto)
│   └── out.persistence/ (OrderJpaRepository)
├── config/ (WebConfig)
├── port/
│   ├── in/ (OrderUseCase)
│   └── out/ (OrderRepository)
├── domain/ (MenuItem, Order)
└── service/ (OrderService)
```

**비즈니스·인프라 프로젝트 분리 시**: 비즈니스 프로젝트는 port + domain + service, 인프라 프로젝트는 adapter + config.

---

## C.9 API 설계

### URI 설계 원칙

- **/Collection/Document** 구조
  - Collection: 리소스 전체, 복수형 명사 (예: `/users`, `/orders`)
  - Document: 특정 리소스 Key (예: `/users/{userId}`)
- URI는 **명사 사용**, 동사 지양 (필요 시 하이픈·언더바로 구분)
  - 예: `/users/search` → `/users/user-search`
  - 예: `/users/get-user` → `/users/{userId}`
  - 예: `/users/get-products/{productid}` → `/users/user-products?productid={productid}`
- 데이터와 무관하면 동사 허용: `/auth/login`
- `/api/v1/users`처럼 **버전 앞에 prefix** (메이저 버전만)
- 경로 중복 금지 — 단, HTTP Method 다르면 허용
  - 중복 시 의미 명사 부가: `/orders/members?userId={userId}`, `/orders/products?productid={productid}`

### HTTP Method
- GET / POST / PUT / DELETE

### Request 객체

| 항목 | 옵션 |
|------|------|
| 구조 유형 | JSON, XML, Form Data, Query |
| 데이터 유형 | DTO > Wrapper Class(String, Integer) > Primitive |
| 전달 방법 | Path(`/users/{userId}`), Query(`/users?level={}`), Request Body |

### Response 객체

| 항목 | 옵션 |
|------|------|
| 구조 유형 | JSON, XML, CSV, YAML |
| 데이터 유형 | DTO > Wrapper Class > Primitive |
| 전달 방법 | Response Body, HTTP Header(상태 코드 200/404/403/500, Content-Type, 쿠키) |

### DTO 관리

- 목적별 패키지 분리
- 네이밍: `{Entity}{기능}DTO` (예: `UserCreateDTO`). Pascal/Camel Case 사용, 끝에 `DTO`
- Lombok 사용(Getter/Setter·생성자 자동 생성)
- 공통 속성은 상위 클래스로 추상화하고 상속

---

## C.10 클라우드 디자인 패턴

외부/내부 아키텍처 전반의 베스트 프랙티스(별첨 참조).

| 카테고리 | 패턴 |
|---------|------|
| DB 성능 개선 (1) | Sharding |
| 읽기 최적화 (4) | Index Table, Cache-Aside, Materialized View, CQRS |
| 핵심 업무 집중 (6) | Gateway Offloading, Gateway Routing, Gateway Aggregation, BFF, Sidecar, Ambassador |
| 안정적 현대화 (2) | Strangler Fig, Anti-Corruption Layer |
| 효율적 분산 처리 (13) | Pipes and Filters, Scheduler Agent Supervisor, Leader Election, **Saga**, Compensating Transaction, Priority Queue, Queue-Based Load Leveling, Sequential Convoy, Claim Check, Publisher-Subscriber, Asynchronous Request-Reply, Competing Consumers, Choreography |
| 안정성 (6) | Rate Limiting, Throttling, Bulkhead, Circuit Breaker, Retry, **Event Sourcing** |
| 보안 (3) | Federated Identity, Gatekeeper, Valet Key |
| 운영 (7) | Geodes, Deployment Stamps, Health Endpoint Monitoring, Compute Resource Consolidation, Static Content Hosting, External Configuration Store, Edge Workload Configuration |

---

## 요약

Rearchitect/Rebuild 서비스 설계는 **상위수준 기획(DT·Lean Startup) → 기획 구체화(DDD 전략·유저 스토리) → 아키텍처 설계(Outer·Inner·디자인 패턴)** 3단계로 진행.  
핵심 도구: GREAT 2 WHY(문제 정의), 린 캔버스(BM), 이벤트 스토밍(BC 도출), MSA 7대 구성 요소, SOLID·Hexagonal/Clean 아키텍처, CAP/BASE/Saga(데이터 일관성).
