# AI 교재 정리 변경 사항

> 본 문서는 PDF에서 추출한 raw 텍스트를 마크다운으로 정리하면서 발생한 변경 사항을 챕터별로 기록함.  
> 변경 유형: [복원] 깨진 줄바꿈/공백 복원, [구조] 마크다운 헤딩·표·리스트로 재구성,  
> [추가] 검증 가능한 사실 보강, [정리] 중복/메타페이지 제거.  
> 원칙: 원본에 없는 사실은 추가하지 않음. 추가는 공식 문서/표준 기반으로만 수행.

## 01 AI 개요
- [복원] PDF p.4–14 텍스트의 깨진 줄바꿈·공백 복원, 음절 단위 분리 텍스트를 정상 문장으로 결합.
- [구조] WHY/HOW/WHAT 5대 구성요소(We Love Real Time Harmony)를 표로 재구성.
- [구조] SAS 패턴(Scheduler-Agent-Supervisor) 역할 비교를 표로 정리.
- [구조] Agent Flow 패턴 A(Chain) / B(ReAct)를 코드블록 + 흐름도 텍스트로 분리.
- [구조] 트랜스포머 처리 단계를 표로 정리(Embedding → Self-Attention → FFN → Masked Self-Attention → Cross-Attention → FFN).
- [구조] LLM 제공사(OpenAI/Anthropic/Google/Groq) 비교를 표로 정리.
- [구조] 멀티턴 컨텍스트 관리 4가지 방식(클라이언트/서버 측)을 표로 정리.
- 변경 없음(추가/사실 보강): 원본에 충분한 정보가 있어 외부 사실 추가는 수행하지 않음.

## 02 AI 도구 랜드스케이프와 트렌드
- [복원] PDF p.15–33 음절 단위 분리 텍스트 복원. 한국어 단어 분절(예: "에이젼트"→"에이전트") 일관성 확보.
- [구조] 8가지 핵심 변화·5개 레이어 프레임워크·Big3 벤치마크·모델 선택 매트릭스를 모두 표로 재구성.
- [구조] Layer별(파운데이션/코딩/워크플로우/에이전트/클라우드)을 명확한 절(Section)로 분할.
- [구조] OWASP Agentic Top 10·법적 프레임워크(한국 AI 기본법·EU AI Act)를 표로 정리.
- [구조] 컨설턴트 3대 제안 프레임워크 + 도입 준비도 체크리스트를 절·체크박스 리스트로 재구성.
- 변경 없음(추가/사실 보강): 원본에 출처(Menlo Ventures, OWASP, Faros AI 등)가 명시되어 있어 외부 보강 불필요.

## 03 멀티모달 AI 기반 기능
- [복원] PDF p.34–41 음절 단위 분리 텍스트 복원.
- [구조] 6개 기능(문서요약/PDF/STT/TTS/VLM/Function Calling) 각각을 WHY/HOW 구조로 통일.
- [구조] 각 기능의 모델·도구 비교를 표로 정리(Cloud LLM vs 로컬, 용도별 추천 등).
- [구조] Function Calling DREAM 5단계와 벤더별 비교(OpenAI/Claude/Gemini)를 표로 정리.
- [구조] tool_choice 모드, 고급 호출 패턴(병렬/순차/스트리밍)을 표로 정리.
- 변경 없음(추가/사실 보강): 모델명·기능 설명 모두 원본 기반.

## 04 LangChain
- [복원] PDF p.42–51 음절 단위 분리 텍스트 복원.
- [구조] LangChain 5대 매핑(We Love Real Time Harmony)을 표로 재구성.
- [구조] LangGraph State 관리(Checkpointer)·LCEL 체인 합성 패턴(Sequential/Parallel/Branch/Passthrough)을 절로 분할.
- [구조] Output Parsers 클래스명 규칙·Structured Output 비교를 표·코드블록으로 정리.
- [구조] Harness 운영 리스크 3축(돌·토·폭/멈·느·할/침·유·권) 매핑을 표로 정리.
- [구조] LangChain 실습(Streaming vs Non-Streaming) 비교를 표로 정리.
- 변경 없음(추가/사실 보강): 코드 예제는 원본 그대로 유지.

## 05 RAG
- [복원] PDF p.52–68 음절 단위 분리 텍스트 복원. 가장 길고 복잡한 챕터.
- [구조] 4대 아키텍처 패턴(Self-RAG/CRAG/Adaptive/Agentic), Pre/Retrieval/Post-Retrieval 기법을 표로 재구성.
- [구조] RAGAS 평가 지표 4종을 표로 정리.
- [구조] 4개 RAG 실습(Naive/Query Transformation/Hybrid/Re-ranking) 각각 구조 통일.
- [구조] RAG 품질튜닝 8영역(청킹/임베딩/벡터스토어/쿼리/하이브리드/리랭킹/평가/하이퍼파라미터)을 절로 분할.
- [구조] 웹 검색 + YouTube 4개 실습(웹/YouTube/Multi-source/Agentic)을 절로 정리.
- [구조] Local LLM 런타임/모델 매트릭스, GraphRAG 인덱싱·검색·프레임워크 비교를 표로 정리.
- [구조] [별첨] 웹 검색 + YouTube 7개 도구(DuckDuckGo/Tavily/Serper/SerpAPI/YouTube Data API/YouTubeSearchTool/YouTubeLoader)의 파라미터·결과 구조를 모두 표로 재구성.
- 변경 없음(추가/사실 보강): 원본의 도구·파라미터 정보가 매우 상세해 외부 보강 없음.

## 06 MCP
- [복원] PDF p.69–76 음절 단위 분리 텍스트 복원.
- [구조] MCP 핵심 기능 3종(Tools/Resources/Prompts)·4단계 생명주기를 표로 재구성.
- [구조] FastMCP 코드 예제 3종(Tools/Resources/Prompts)을 정상 Python 코드블록으로 복원.
- [구조] MCP 인증/인가(OAuth Public/Credential, JWT 직접/인증서버 발급)를 표로 정리.
- [구조] 6개 실습 시나리오(개발 환경 설정/간단 구현/Sampling/Elicitation/Roots/AI 에이전트 개발 지원)를 절로 분할.
- 변경 없음(추가/사실 보강): MCP 사양 관련 사실은 원본대로 유지.

## 07 MAS (MAS 구축/운영, LangGraph)
- [복원] PDF p.77–88 음절 단위 분리 텍스트 복원.
- [구조] MAS SAS 패턴 역할표·통신 프로토콜 비교(In-Process/Function Calling/MCP/API)를 표로 재구성.
- [구조] MAS 운영 안정성(하네스 엔지니어링) 9가지 리스크(돌·토·폭/멈·느·할/침·유·권)를 비용/성능/보안 3축 표로 정리.
- [구조] LangGraph 핵심 구성요소 6종(StateGraph/Node/Edge/Conditional Edge/State/Checkpointer)을 표로 정리.
- [구조] LangGraph Edge 예제 + 조건부 라우팅을 정상 Python 코드블록으로 복원.
- [구조] MAS 실습 워크플로우(Code Path / QA Path / Supervisor)를 텍스트 다이어그램으로 정리.
- [구조] Dify 활용 5단계 개발 과정을 표로 정리.
- 변경 없음(추가/사실 보강): 원본 기준만 사용.

## 08 Claude Code 확장과 DMAP/Abra/NPD
- [복원] PDF p.89–102 음절 단위 분리 텍스트 복원.
- [구조] 4가지 확장 메커니즘(Skills/Agents/Commands/Plugin) 비교 표 재구성.
- [구조] SKILL.md 형식·플러그인 디렉토리 구조를 코드블록으로 복원.
- [구조] 플러그인 라이프사이클(MarketPlace 추가/설치/조회/삭제)을 bash 코드블록으로 정리.
- [구조] DMAP 5-Layer 아키텍처(Commands/Skills/Agents/Gateway/Runtime + Hooks)를 다이어그램·표로 정리.
- [구조] Gateway 매핑 예시(tier_mapping/tool_mapping/forbidden_mapping)를 정상 YAML 코드블록으로 복원.
- [구조] DMAP/Abra/NPD 설치·실행 명령을 bash 코드블록으로 정리.
- [구조] NPD 9개 에이전트 구성·7단계 워크플로우(prepare→setup→create→plan→design→develop→deploy→cicd)를 표로 정리.
- 변경 없음(추가/사실 보강): 플러그인 GitHub URL·명령어 모두 원본 기반. 추측·환각 방지를 위해 새로운 플러그인 정보 추가 없음.

## 종합 비고
- 모든 챕터에서 강사 소개·강의 목표·Q&A 등 메타 페이지(p.1–3, p.103)는 추출 텍스트에 포함되지 않아 별도 제외 작업 불필요.
- 페이지 번호(p.5 등) 및 "유니콘 주식회사 / Copyright / 무단전재 및 배포금지" 워터마크는 마크다운 구조에 흡수하고 본문에서 제거.
- 코드 예제는 원본 PDF의 깨진 들여쓰기/공백을 정상 Python·YAML 문법으로 복원하되, 로직과 식별자는 원본 그대로 유지.
- 한국어 표현 일관화: "에이젼트" → "에이전트"(원본 혼용), "RAG"/"MCP"/"LLM" 등 약어는 영문 그대로 유지.
- 사실 추가가 필요해 보이는 지점(예: 모델 가격 변동, 신규 벤치마크 점수)이 있어도 검증 시점이 다를 수 있어 추가하지 않음. 사용자가 향후 활용 시 공식 페이지 확인 필요.
