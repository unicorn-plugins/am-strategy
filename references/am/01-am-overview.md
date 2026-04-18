# 01. AM 개요

> **커리큘럼 목표**  
> AM(Application Modernization)의 정의·필요성·전략을 WHY-HOW-WHAT 프레임으로 이해함.  
> B2B 컨설팅 및 IT 개발자 양측이 공통 언어로 AM을 논의할 수 있는 기반 지식 확보.

---

## 1.1 AM 정의와 WHY-HOW-WHAT

### 정의
기존 레거시 애플리케이션을 현대적 기술과 아키텍처로 전환하는 **전략적 활동**.

### WHY — 왜 모던화하는가 (4S)
- **Speedy**: 시장 변화에 빠른 대처  
- **Service Always**: 항상 안정적 서비스 제공  
- **Save Cost**: 비용 최적화  
- **Security**: 보안 보장

> 핵심 원칙: **WHY부터 시작** — 기술(WHAT)이 아닌 비즈니스 가치(WHY)가 AM의 출발점.

### HOW — 어떻게 전환하는가
1. **6R 전략**  
   - Quick Win: Rehost, Replatform, Refactor (모놀리스 구조 유지)  
   - AM(구조 변화): Rearchitect, Rebuild, Replace
2. **점진적 전환**: Strangler Fig 패턴 적용
3. **조직 역량 강화**: 일하는 방식 변화 + 현대화 기술 역량 강화

### WHAT — 무엇을 바꾸는가
- **일하는 방식 혁신**: 조직 구조·의사결정·업무 방식·조직 문화
- **마이크로서비스**: 마이크로화, 독립적 빌드/배포/스케일링, 반복적 발전
- **데브옵스**: 조직 구조 변화 + CI/CD 자동화
- **AI**: 더 혁신, 더 자동화, 더 고객만족의 핵심 도구
- **클라우드**: In & Out과 Up & Down이 유연한 혁신 플랫폼

---

## 1.2 AM의 필연성 (PUSH + PULL)

### PUSH — 레거시의 한계
| 한계 영역 | 구체적 문제 |
|----------|------------|
| 기술 부채 누적 | 구버전 프레임워크 유지보수 비용 증가, 보안 패치 미지원 |
| 민첩성 저하 | 신규 기능 개발에 수개월 소요, 모놀리식 구조로 독립 배포 불가 |
| 비용 상승 | 전체 스케일링에 따른 리소스 낭비, 장애 시 전체 서비스 중단 |
| 혁신 제약 | AI/ML·클라우드 등 신기술 통합 불가, 인재 확보 난이도 상승 |

### PULL — 5대 모던화 동인
1. **비즈니스 환경 변화**: DX/AX 가속, 고객 요구 다양화
2. **기술 환경 변화**: 클라우드 네이티브, AI/ML 발전, 컨테이너 기술 성숙
3. **규제/보안 강화**: 데이터 보호법(개인정보 보호), 제로트러스트 보안
4. **비용 최적화 압박**: 클라우드 이전 시 TCO 절감 기대
5. **인재 확보 경쟁**: 최신 기술 스택이 인재 유입에 유리

> **결론**: PUSH(레거시 한계) + PULL(외부 동인) → AM은 선택이 아닌 **생존 전략**.

---

## 1.3 HOW ① — 6R 전략

### 6R 개요 (왼쪽 → 오른쪽: 복잡도↑, 장기 비즈니스 가치↑)

| 전략 | 접근 방식 | 목적 | 비용 | 리스크 | 소요 기간 | 클라우드 활용도 |
|------|----------|------|-----|--------|----------|----------------|
| **Rehost** | 코드 변경 없이 이전 (Lift & Shift) | 단기 비용 절감 | ★☆☆☆☆ | 낮음 | 수주 | 낮음(IaaS) |
| **Replatform** | OS/DB/WAS 등 일부 최적화 후 이전 | 관리형 서비스 활용 | ★★☆☆☆ | 낮음~중 | 수주~수개월 | 중간(PaaS 일부) |
| **Refactor** | 모놀리식 유지, 코드 수정하여 클라우드 서비스 연동 | 탄력성/확장성 확보 | ★★★☆☆ | 중간 | 수개월 | 높음(PaaS/서버리스) |
| **Rearchitect** | 모놀리식 → 마이크로서비스 전환 | 독립 배포/스케일링 | ★★★★☆ | 높음 | 수개월~1년 | 매우 높음 |
| **Rebuild** | 클라우드 네이티브로 완전 재개발 | 기술 부채 완전 청산 | ★★★★★ | 매우 높음 | 6개월~2년+ | 매우 높음 |
| **Replace** | SaaS 또는 상용 솔루션 대체 | 비핵심 영역 빠른 전환 | ★★★☆☆ | 중간 | 수주~수개월 | 높음(SaaS) |

> **Quick Win vs AM**  
> - Quick Win 전략: **Rehost, Replatform, Refactor** (모놀리스 구조 유지)  
> - AM 전략: **Rearchitect, Rebuild, Replace** (구조적 변화 또는 외부 대체)

> **암기법**: 하(H)늘로 풍(P)선을 플(F)라이, 아(A)에 버(B)리고 플(P)레이

---

## 1.4 HOW ② — 점진적 전환 (Strangler Fig)

### 왜 점진적 전환인가
**Big Bang의 리스크**: 전체 전환 실패 시 비즈니스 중단, 롤백 불가.

### Strangler Fig 핵심 원칙
1. **비핵심 기능부터 이전**하여 학습 (Fast Fail, Learn and Pivot)
2. **Facade 계층**으로 레거시/신규 공존, 사용자 영향 최소화
3. **Iterative**: 기능 단위 전환 → 검증 → 다음 기능 이전

### 적용 기준
- **적용 대상**: 핵심 시스템, 의존성 복잡, 무중단 필수 서비스
- **비대상**: 위 조건이 아니면 Big Bang이 오히려 효율적

> Strangler Fig = 교살자 무화과나무처럼 새 시스템이 레거시를 점진적으로 감싸고 대체하는 패턴.  
> **창시자**: Martin Fowler, 2004년 "StranglerFigApplication" 에세이에서 명명 — martinfowler.com/bliki/StranglerFigApplication.html

### 전환 우선순위 매트릭스

| 순위 | 대상 | 기준 | 사례 |
|------|------|------|------|
| 1순위 | Quick Win 서비스 | Rehost/Replatform/Refactor 대상 | 예산·동력 확보용 초기 성공 사례 |
| 2순위 | 데이터 의존도 낮은 서비스 | Stateless, 독립 도메인 | 고객 알림(SMS/이메일/푸시), 프론트엔드 |
| 3순위 | 부하 변동 큰 서비스 | CQRS 적용·오토스케일링 효과 | 월마트 블랙프라이데이 대응 |
| 4순위 | 핵심 차별화 서비스 | 데이터 결합 복잡, Saga 패턴 | 쿠팡 주문/결제 |

### 전환 순서 사례
- **쿠팡 Vitamin Project**: 메시징 인프라(Vitamin MQ) → 관리 플랫폼(CMDB) → API Gateway → 서비스 분리  
  배포 주기 3일 → 매일 수시, 100~200개 서비스 일일 배포.  
  **핵심**: 인프라 먼저 구축 후 서비스 분리(서비스 먼저 분리 아님).
- **Samsung SmartThings**: Oracle → Aurora PostgreSQL 단계적 마이그레이션  
  Database-per-Service 모델로 서비스 간 독립성 확보.  
  계정 서비스(초당 80K 요청)부터 전환 → 순차 확장.  
  **핵심**: 대규모 데이터도 단계적 분리 가능(일괄 불가).

---

## 1.5 HOW ③ — 조직 역량 강화

### 일하는 방식 혁신 (M 사상)

AM 성공 = **일하는 방식 혁신(WHY) + 기술 전환(WHAT)**. 기술만 바꾸면 반쪽 전환.

| M 사상 | 의미 | 핵심 마인드셋 |
|-------|------|--------------|
| **Value-Oriented** | 말과 행동의 기준을 지향 가치에 둠 | WHY First — 왜 해야 하는가를 먼저 고민, 가치 없는 것은 버림 |
| **Interactive** | 지속적 양방향 소통과 협업 | Yes, And — 동료를 믿고 의견을 존중·발전, 심리적 안전감 → 집단 지성 |
| **Iterative** | 끊임없는 실험과 학습의 반복 | Fast Fail, Learn, and Pivoting — 실패로부터 학습, 상황 변화에 유연한 피보팅 |

### 조직 구조 4대 변화

| 영역 | As-Is | To-Be |
|------|-------|-------|
| 조직 구조 | 대규모 기능별 조직(Silo) | 소규모 다기능 조직, 서비스별 Squad |
| 의사결정 | 리더 | 팀원 자율적·능동적 |
| 업무 방식 | 순차적(Waterfall), 계획 중요·고수 | 순환적(Iterative), 실험/학습·피보팅 |
| 조직 문화 | 수직적/폐쇄적, 실패 부정적 | 수평적/개방적, 실패 긍정적 |

---

### 현대화 기술 역량 — 마이크로서비스(MSA)

**WHY (4S)**: Speedy, Service Always, Save Cost, Security

**HOW**: Micro화 + 독립적 Build/Deploy/Scale + Iterative한 발전

**WHAT**:
- **MSA**: 마이크로서비스 개발·배포·운영 아키텍처
- **DDD**: 각 마이크로서비스 내부 아키텍처 설계 기법
- **MSA Features & 12 Factors**: 마이크로서비스가 갖춰야 할 특성
- **마이크로서비스 패턴**: Micro화로 발생하는 CCOP 이슈 해결 방안  
  (CCOP: Complex, Consistency, Operational overhead, Performance)

---

### 현대화 기술 역량 — 데브옵스(DevOps)

**WHY**: 비즈니스-개발-운영 조직 간 소통과 협업 문제를 근원적으로 해결.  
고객과 업무를 가장 잘 이해하는 비즈니스의 아이디어가 실제 제품/서비스로 적시 구현·발전되는 문화 구축.

**HOW**: 조직 구조 변화 + 서비스 빌드/배포 자동화  
*콘웨이의 법칙*: "모든 시스템은 그 조직의 의사소통 구조와 동일하게 만들어진다." — Melvin Conway, 1967 논문 "How Do Committees Invent?"

**WHAT**:
- **Squad 기반 DevOps 조직**: PO·기획자·개발자·운영자·UX디자이너가 한 Squad 구성
- **CI/CD Pipeline & Toolchains**
  - CI(Continuous Integration): 실행파일·컨테이너 이미지 빌드 단계
  - CD(Continuous Deployment): 개발계·검증계·운영계 배포 단계
  - Toolchains 예: Git, Jenkins, Maven/Gradle, Docker, SonarQube, Nexus, Harbor, kubectl

---

### 현대화 기술 역량 — AI

**WHY**: 더 혁신(경쟁력↑, 新수익원 창출) / 더 자동화(비용 절감, 전략 업무 집중) / 더 고객만족(초개인화).

**HOW**:
- 업무 프로세스 혁신: AI Agent 기반 워크플로우로 속도와 정확도 극대화
- 분야별 전문가 협업: 도메인별 전문 에이전트가 역할 분담
- 전문 컨설팅: LLM 기반 분석·검토·제안
- 관찰/통제: 에이전트 작업 상태 실시간 추적, 품질 기준 기반 개입·조정

**WHAT** — AI앱 구성요소 "We Love Real Time Harmony":
- **W**: Agentic Workflow — AI Agent 간 업무 조율
- **L**: LLM Interface — 프롬프팅과 응답 처리
- **R**: RAG — 내부/외부 문서 검색으로 최신성·정확도 향상
- **T**: Tool — 외부 시스템 인터페이스
- **H**: Harness — 관찰과 통제로 비용·성능·보안 최적화

---

### 현대화 기술 역량 — 클라우드

**클라우드란**: 필요한 인프라(H/W, 가상화, OS), 개발/운영 플랫폼, 소프트웨어를 "임대"하여 사용하는 서비스.

> 비용 절감 목적이 아닌 **Speedy한 혁신 플랫폼**이 진정한 목적.  
> 유연한 In & Out과 Up & Down.

### 클라우드 분류

| 축 | 구분 |
|----|------|
| 서비스 성격 | Private(내부) / Public(외부) / Hybrid |
| 자원 범위 | IaaS(H/W·가상화·OS) / PaaS(개발·운영 플랫폼) / SaaS(완성 S/W) |

### 컨테이너와 쿠버네티스

- **컨테이너**: "작은 서버" — 애플리케이션 구동에 필요한 모든 것(OS, WAS, 라이브러리, 소스)이 통합된 작은 서버. 격리성으로 컨테이너 간 상호 영향 최소화.
  - Runtime 제품: Docker, containerd, CRI-O
- **쿠버네티스(k8s)** 핵심 구성 요소:
  - **Pod**: Container 용기(그릇)
  - **Service**: Pod 연결 L/B
  - **Ingress**: Service 연결 L/B
  - **Workload Controller**: Deployment(Stateless), StatefulSet(Stateful/DB), DaemonSet(노드당 1개), Job/CronJob
  - **ConfigMap / Secret**: 환경변수 관리
  - **PV / PVC**: 영구 스토리지 정의서와 요청서

---

## 요약

AM은 **생존 전략**이며, WHY(4S) → HOW(6R·점진 전환·조직 역량) → WHAT(MSA·DevOps·AI·클라우드)의 순서로 접근.  
기술 전환만으로는 반쪽 전환이며, 일하는 방식·마인드셋 혁신이 동반되어야 성공.
