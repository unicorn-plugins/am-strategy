# 데이터 공백 영역 및 글로벌 보충 가이드

> 본 문서는 **한국 시장 정량 데이터가 검증된 출처(2025+)로 확보되지 않은 영역**을
> 정직하게 명시하고, 그 공백을 어떻게 보충할지 가이드.
>
> 활용: `industry-benchmark` 세부역할이 보고서 작성 시 데이터 한계 명시 + 보충 출처 인용.

---

## 데이터 공백 매트릭스

| 업종 | TCO 정량 데이터 | 공식 출처 (2025+) | 본 룰북 수록 여부 |
|------|--------------|----------------|------------|
| **공공** | ✅ 18.4% TCO 절감, 81% 장애 감소, 114% 처리속도 향상 | 행정안전부 (2025.12 / 2026.03) | ✅ [`01-public-sector.md`](01-public-sector.md) |
| **금융** | ❌ 정량 TCO 미공개 | 삼정KPMG는 정성적 7대 이슈만 | △ [`03-financial-sector.md`](03-financial-sector.md) (정성적 데이터만) |
| **제조** | ❌ 정량 TCO 미공개 | (검증된 2025+ 자료 미발견) | ❌ |
| **유통** | ❌ 정량 TCO 미공개 | (검증된 2025+ 자료 미발견) | ❌ |
| **시장 전체** | △ 시장 규모·성장률만 | 한국IDC (2025.01) | ✅ [`02-market-overview.md`](02-market-overview.md) |

---

## 공백 영역 보충 — DORA 2025 글로벌 SW 배포 지표

> **권장**: 한국 업종별 TCO 데이터가 미확보된 영역(금융·제조·유통)에 대해서는
> DORA 2025 글로벌 SW 배포 지표를 보충 데이터로 활용.

### 활용 가능한 DORA 2025 자료

| 자료 | 위치 | 활용 영역 |
|------|------|---------|
| 5개 핵심 지표 분포·Top % | [`../dora/01-software-delivery-performance.md`](../dora/01-software-delivery-performance.md) | L1 정량화 (배포 빈도·리드타임·복구·CFR·재작업) |
| 7개 팀 클러스터 | [`../dora/02-seven-team-profiles.md`](../dora/02-seven-team-profiles.md) | 시스템 진단 |
| 7개 AI Capabilities | [`../dora/03-ai-capabilities-model.md`](../dora/03-ai-capabilities-model.md) | AI ROI 정당화 |
| 플랫폼 엔지니어링 | [`../dora/04-platform-engineering.md`](../dora/04-platform-engineering.md) | TCO 분리 항목 |
| 업종별 함의 | [`../dora/06-am-transformation-implications.md`](../dora/06-am-transformation-implications.md) | 5S+혁신 동인 매핑 |

### DORA 출처 정보

| 항목 | 내용 |
|------|------|
| 발행 기관 | Google DORA (DevOps Research and Assessment) |
| 발표 일자 (메인) | 2025년 10월 |
| 발표 일자 (AI Capabilities Model 별도) | 2025년 12월 |
| 응답 표본 | 4,997명 (글로벌 기술 전문가) |
| 조사 기간 | 2025년 6월 13일 ~ 7월 21일 |
| 공식 URL | https://dora.dev/research/2025/dora-report/ |

---

## 보충 데이터 활용 시나리오

### 시나리오 1: 금융권 시스템 분석

**상황**: 한국 금융권 정량 TCO 데이터 부재.

**조합 권장**:
1. **삼정KPMG 정성적 7대 이슈** (한국 금융 컨텍스트)
   → [`03-financial-sector.md`](03-financial-sector.md)
2. **DORA 2025 5메트릭 분포** (글로벌 SW 배포 표준)
   → [`../dora/01-software-delivery-performance.md`](../dora/01-software-delivery-performance.md)
3. **공공부문 18.4% TCO 절감** (보수적 적용 — 금융은 더 변동 큼)
   → [`01-public-sector.md`](01-public-sector.md)

**보고서 표기 예시**:
```
"금융권 TCO 절감 효과는 다음 두 출처를 결합하여 추정:
1) 행정안전부 공공부문 7년 누적 18.4% (2026.03.11) — 보수적 baseline
2) DORA 2025 Top 50% (월 1회→주 1회 배포 진입) 시 운영비 30~50% 절감 가설
   (Google DORA, 2025.10 발표)
→ 종합 추정 범위: 15% ~ 35% (시나리오별)"
```

---

### 시나리오 2: 제조업 시스템 분석

**상황**: 한국 제조업 정량 TCO 데이터 부재.

**조합 권장**:
1. **한국IDC 2025년 시장 전망** (제조 포함 전체 시장)
   → [`02-market-overview.md`](02-market-overview.md)
2. **DORA 2025 7개 클러스터** (제조업은 통상 Cluster 2 다수 — Legacy bottleneck)
   → [`../dora/02-seven-team-profiles.md`](../dora/02-seven-team-profiles.md)
3. **DORA Cluster 2 → 6R 권장 매핑** (Replatform/Rearchitect 우선)
   → [`../6r/04-matching-rules.md`](../6r/04-matching-rules.md)

---

### 시나리오 3: 유통/이커머스 시스템 분석

**상황**: 한국 유통 정량 TCO 데이터 부재.

**조합 권장**:
1. **한국IDC 멀티클라우드 75% 신규 앱** (유통 B2C 적합)
   → [`02-market-overview.md`](02-market-overview.md)
2. **DORA 2025 Cluster 4** (유통은 통상 High impact, low cadence — 속도 회복 동인)
   → [`../dora/02-seven-team-profiles.md`](../dora/02-seven-team-profiles.md)
3. **DORA Cluster 4 → Rearchitect 권장** + AI Capabilities 7개 정렬
   → [`../6r/06-dora-integration.md`](../6r/06-dora-integration.md)

---

## 보고서 작성 시 정직한 데이터 한계 표기 권장 문구

### 한국 업종별 TCO 정량 데이터 부재 명시

```
(주) 본 보고서의 업종별 TCO 절감률 추정치는 다음 출처를 결합하여 산출:
1) 한국 공공부문 검증 데이터 (행정안전부 2026.03.11): 7년 누적 18.4% 절감
2) DORA 2025 글로벌 SW 배포 표준 (Google DORA, 2025.10)
3) 한국IDC 시장 전망 (한국IDC, 2025.01.31)

한국 업종별 (금융·제조·유통) 정량 TCO 데이터는 2025년 이후 공개 자료가
제한적이므로, 위 3개 출처를 조합한 추정치로 제시. 실측치는 파일럿 운영
6개월 후(L3 단계)에 보정 예정.
```

---

## 향후 데이터 확보 권장 활동

| 활동 | 비용/시간 | 우선순위 |
|------|---------|--------|
| 가트너 한국 컨설팅 (업종별 TCO) | 2,000~5,000만원 / 4~6주 | 중 |
| 한국IDC 맞춤 보고서 | 1,500~3,000만원 / 4주 | 중 |
| 동종업계 3~5개사 비공식 벤치마크 | 무료 / 4~8주 | 높음 (정확성 제한) |
| Phase 1' 파일럿 실측 데이터 (L3) | 파일럿 비용 / 6개월 | 가장 높음 (가장 정확) |
| DORA 글로벌 데이터 활용 | 무료 / 즉시 | 가장 높음 (즉시 가능) |

---

[Top](#데이터-공백-영역-및-글로벌-보충-가이드)
