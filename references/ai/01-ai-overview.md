# 01 AI 개요

## 1. AI 핵심 이해 (WHY/HOW/WHAT)

### 1.1 WHY — AI가 필요한 이유
AI 어플리케이션이 비즈니스에 가져다주는 핵심 가치는 크게 세 가지로 요약됨.

- **더 혁신**: 데이터 기반의 빠른 의사결정과 혁신적 솔루션을 만들어 시장 경쟁력을 높이고 새로운 수익원 창출  
- **더 자동화**: 시간 소모적 업무를 자동화하여 비용을 절감하고 구성원이 더 창의적·전략적 업무에 집중  
- **더 고객만족**: 개별 고객의 선호와 행동패턴에 맞는 초개인화로 고객 만족도와 충성도 향상  

### 1.2 HOW — AI 가치 실현 방법
- **업무 프로세스 혁신**: AI Agent 기반 워크플로우로 재설계하여 속도와 정확도를 극대화  
- **분야별 전문가 협업**: 도메인별 전문 에이전트가 역할을 분담하고 내·외부 정보와 외부 시스템을 이용하여 업무 수행  
- **전문 컨설팅**: LLM 기반 분석/검토/제안으로 업무 산출물의 품질과 완성도 향상  
- **관찰/통제**: 에이전트의 작업 상태를 실시간 추적하고 품질 기준에 따라 개입 및 조정  

### 1.3 WHAT — AI 앱 구성요소 (We Love Real Time Harmony)
| 약어 | 구성요소 | 역할 |
|------|----------|------|
| W | Agentic **W**orkflow | AI Agent 간 업무 조율 |
| L | **L**LM Interface | 프롬프팅과 응답 처리 |
| R | **R**AG | 내·외부 문서 검색으로 정보의 최신성과 정확도 향상 |
| T | **T**ool | 외부 시스템과의 인터페이스 |
| H | **H**arness | 관찰과 통제를 통해 비용/성능/보안 최적화 운영 |

## 2. AI 어플리케이션의 필요성

AI 어플리케이션이 비즈니스에 가져다주는 핵심 가치는 다음 세 가지임.

1. **더 혁신 — 시장 경쟁력 강화 및 혁신 가속화**  
   AI는 더 빠르고 깊게 데이터를 분석·이해하여 데이터 기반의 빠른 의사결정과 혁신적 솔루션을 제공.  
   기업은 AI를 활용한 혁신적인 서비스·제품을 통해 새로운 수익원 확보 또는 시장 경쟁력 강화 가능.
2. **더 자동화 — 운영 효율성 향상**  
   문서 작성, 데이터 입력, 고객 응대 등 시간 소모적 업무를 AI가 대신 처리함으로써 비용 절감.  
   직원들은 더 창의적·전략적 업무에 집중 가능.
3. **더 고객만족 — 고객 경험 개선**  
   각 고객의 선호와 행동 패턴을 학습하여 맞춤형 서비스를 제공함으로써 고객 만족도와 충성도 향상.

## 3. SAS(Scheduler-Agent-Supervisor) 패턴

클라우드 아키텍처 패턴인 SAS 패턴과 동일한 구조로, 애자일 협업 사이클을 형성함.

| 역할 | 비유 | 책임 |
|------|------|------|
| Scheduler | 부서장 | 계획 수립 |
| Agent | 부서원 | 실행 |
| Supervisor | 부문장 | 감독·검증 |

Scheduler가 계획을 수립 → Agent가 실행 → Supervisor가 검증 → 다음 반복으로 이어지는 구조.

## 4. AI 어플리케이션 핵심 구성 요소

AI 어플리케이션 개발의 핵심 구성요소는 Workflow 관리, LLM 인터페이스, RAG, Tools 연동, Harness임.  
암기 Tip: **W**e **L**ove **R**eal **T**ime **H**armony.

1. **Workflow 관리**: 복잡한 에이전트 흐름 제어 (Scheduler / Agent / Supervisor 구조)  
2. **LLM 인터페이스**: 프롬프트 구성부터 응답 파싱까지 연결  
3. **RAG (Retrieval-Augmented Generation)**: 내·외부 문서 검색으로 LLM 지식 보강  
4. **Tools 연동**: LLM이 외부 API/함수를 자율적으로 호출  
5. **Harness**: 관찰/통제하여 비용/성능/보안 최적화  

## 5. Agent Flow 패턴

### 5.1 패턴 A — Chain (선형 파이프라인)

```
Input(질문/요청)
  ▼
1. RAG: 내·외부 문서 검색
  ▼
2. Prompt 구성 (질문 + RAG 결과)
  ▼
3. LLM 호출 → 응답 생성
  ▼
4. Output Parser: 응답 구조화
  ▼
Output(답변 리턴)
```

LCEL 체인 구성 예시:

```python
# RAG 체인 파이프라인
rag_chain = (
    {"context": retriever, "question": passthrough}
    | prompt_template
    | llm
    | output_parser
)
# 실행
answer = rag_chain.invoke("질문")
```

- **핵심**: 개발자가 파이프라인을 설계, 선형 흐름(1회 실행)  
- **적합**: 문서 Q&A, 요약, 번역 등 정형화된 작업  
- RAG로 내·외부 문서 검색 결과를 프롬프트에 추가하는 건 질문/요청에 따라 수행 여부 결정 필요  

### 5.2 패턴 B — ReAct Agent (루프)

```
Input(질문/요청)
  ▼
1. Prompt 구성: 질문 + Tools 정의 + (RAG)
  ▼
2. LLM 호출
  ▼
3. 모델 판단 (Reasoning)
   ✓ 답변 가능 → 응답 생성 → Step 4
   ✓ 도구 필요 → Step 4 Tool 실행
  ▼
4. Tool 실행 (Action) → 결과 수신 (Observation)
  ▼
5. 결과 반환 (Text, JSON)
  ▼
Output(답변 리턴)
```

- **ReAct Loop**: Reasoning → Action → Observation 반복  
- **핵심**: LLM이 흐름을 주도, 도구 선택/실행 반복 (LLM이 스스로 판단·행동하는 자율적 루프)  
- Observation은 결과를 컨텍스트에 추가, 답변 가능 시 ReAct Loop 종료  
- **적합**: 복잡한 작업, 멀티스텝 추론  

> LLM은 응답 생성 시 트랜스포머 모델 사용.

## 6. 트랜스포머 전체 흐름

트랜스포머 모델은 사람이 상대방의 말을 이해하고 한 단어씩 최적의 답변을 하는 것과 동일한 방식으로 동작.  
예시 문장: "철수가 영희에게 눈을 뿌렸어?"

| 단계 | 처리 방식 | 예시 |
|------|-----------|------|
| Embedding + Positional Encoding | 단어로 쪼개고 순서 기억 | 철수가(1), 영희에게(2), 눈을(3), 뿌렸어(4) |
| Self-Attention | 단어들 사이 관계 파악 | "뿌렸어"의 주어 → "철수가", 누구에게 → "영희에게" |
| Feed Forward Network | 문맥에 맞게 의미 확정 | "눈" + "뿌리다" → 눈(Snow)으로 확정 |
| Masked Self Attention | 지금까지 뭐라고 말했는지 확인 | "응"까지 말함 → 긍정 후 구체적 정보 필요 |
| Cross-Attention | 상대 말 다시 참고 | "뿌렸어"라고 물었으니 → 왜 그랬는지 답변 |
| Feed Forward Network | 다음 단어 결정·출력 | "눈싸움하다"가 적절 → 출력 |

핵심: 전체 문장을 한 번에 의미와 관계로 파악.

## 7. Python 기초 참조

### 7.1 Python 소개
- 1991년 귀도 반 로섬 개발, 고급 언어  
- 풍부한 AI/ML 라이브러리 (TensorFlow, PyTorch, LangChain)  
- LLM 연계 위한 공식 Python SDK 지원 (OpenAI, Anthropic, Google)  
- 쉬운 문법, 빠른 프로토타이핑, 활발한 커뮤니티  

### 7.2 기본 문법
- 변수/자료형: `str`, `int`, `float`, `bool`  
- 리스트(배열), 딕셔너리(키-값 쌍)  
- 조건문(`if/elif/else`), 반복문(`for/while`)  
- 함수(`def`), 클래스(`class`)  

### 7.3 가상환경 & 패키지 관리
- `venv`: 프로젝트별 독립 Python 환경 생성  
- `python -m venv venv` → `source venv/bin/activate`  
- `pip install {패키지}`  
- `pip install -r requirements.txt`로 일괄 설치  

### 7.4 AI 개발 핵심 문법
- `import` / `from … import`, alias(`as`) 활용  
- `.env` + dotenv: API 키 등 민감 정보 분리 관리  
- `try/except/finally`: API 호출 예외 처리 필수  
- Pydantic `BaseModel`: LLM 응답 구조화 파싱  

```python
# tenacity = 패키지, retry = 함수(데코레이터)
from tenacity import retry

# langchain_tavily = 패키지, TavilySearch = 클래스
from langchain_tavily import TavilySearch

# TavilySearch 클래스로 인스턴스 생성
search = TavilySearch(max_results=5)

# 인스턴스의 메서드(함수) 호출
result = search.invoke("검색어")
```

## 8. 주요 LLM 제공사 개요

| 제공사 | 특징 | Use Case |
|--------|------|----------|
| **OpenAI (GPT)** | 대중적: 가장 넓은 생태계와 풍부한 문서화, 안정적 성능 | 범용 챗봇, 멀티모달 작업, API 연동이 많은 서비스 |
| **Anthropic (Claude)** | 자기검열·인문적·코딩 강점. 200K 토큰 긴 컨텍스트 윈도우. Constitutional AI(AI가 스스로 응답을 검토/수정하여 유해 콘텐츠를 줄이는 자기 개선 방식) 기반 안전성, 우수한 코드 생성 능력 | 코드 생성/리뷰, 긴 문서 분석, 안전성이 중요한 서비스 |
| **Google (Gemini)** | 멀티모달: 네이티브 멀티모달 처리, 100만 토큰 초대형 컨텍스트 윈도우 | 대용량 문서 처리, 이미지+텍스트 통합 분석 |

### 8.1 Groq API
- Groq는 자체 개발한 **LPU(Language Processing Unit)** 칩 기반의 초고속 추론 엔진 제공  
- 오픈소스 LLM(Llama, Qwen, Mistral 등)을 호스팅하며, 무료 플랜으로도 API 사용 가능  
- OpenAI 호환 API 형식을 지원하여 기존 코드의 최소 수정으로 전환 가능  
- 오픈소스 모델 호스팅 방식으로 상용 모델 대비 비용이 크게 저렴  
  - 예: GPT-4o 대비 Llama 3.3 70B는 입력 약 76%, 출력 약 92% 저렴  

## 9. 멀티턴 대화

### 9.1 핵심 개념
```
Turn 1 사용자: 도쿄 여행 계획 세워줘
Turn 2 AI: 며칠 여행하시나요?
Turn 3 사용자: 3박 4일이요
Turn 4 AI: 맞춤 일정 제안!
```

Context(맥락)가 모든 턴에 걸쳐 유지됨.  
LLM API는 Stateless(자체 데이터 X) → 히스토리 관리 필요.

### 9.2 싱글턴 vs 멀티턴

| 구분 | 특징 |
|------|------|
| **Single-turn** | 한 번의 질문-응답으로 종료. 맥락 유지 없음. 한 번에 모든 정보 요청 |
| **Multi-turn** | 여러 번의 대화가 이어짐. 이전 대화 내용 기억. 점진적으로 정보 수집 |

### 9.3 컨텍스트 관리 아키텍처

| 방식 | 구현 | 지원 LLM | 복잡도 | 권장 턴 수 |
|------|------|----------|--------|------------|
| ① 전체 히스토리 전송 (클라이언트) | `messages[]` → +user → 전체 전송 → API → +assistant → 반복 | 모든 LLM | 쉬움 | ≤ 10턴 |
| ② 슬라이딩 윈도우 + 요약 (클라이언트) | 요약본 + 최근 N개 메시지 결합 → API (N턴 초과 시 요약 시작) | 모든 LLM | 복잡 | 10–50턴 |
| ③ OpenAI Responses API (서버) | `previous_response_id`로 체이닝 | OpenAI | — | — |
| ④ Gemini Chat Session (서버) | 세션 객체가 히스토리 자동 관리 | Gemini | — | — |

> Claude API는 서버측 미지원 → 클라이언트 방식(①②)만 사용.
