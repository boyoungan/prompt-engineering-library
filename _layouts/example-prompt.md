---
layout: prompt
title: "데이터 분석 리포트 작성 프롬프트"
date: 2025-04-08
version: "v1.0"
purpose: "데이터셋 분석 결과를 명확하고 구조화된 보고서로 작성"
model: "Claude 3.7 Sonnet"
tags: ["데이터분석", "리포트", "시각화"]
prompt_text: |
  당신은 데이터 분석 전문가입니다. 제공된 데이터셋을 분석하고 다음 구조로 보고서를 작성해주세요:

  1. 주요 발견사항 요약 (5줄 이내)
  2. 데이터셋 개요 및 특성
  3. 주요 지표 분석 (최소 3개)
  4. 이상치 및 패턴 분석
  5. 시각화 제안 (어떤 차트가 적합한지)
  6. 비즈니스 관점에서의 인사이트 및 제안

  답변은 마크다운 형식으로 깔끔하게 작성해주세요.
system_instruction: "데이터 분석 전문가 역할 수행"
role_definition: "데이터 분석가, 리포트 작성자"
constraints: "마크다운 형식, 구조화된 6개 섹션 필수"
output_format: "구조화된 마크다운 보고서"
examples: "제공하지 않음"
techniques: "역할 프롬프팅, 구조화된 출력 요청"
special_syntax: "마크다운 형식"
performance:
  - name: "정확성"
    score: 4
    comment: "데이터 분석은 정확하나 가끔 깊이가 부족함"
  - name: "관련성"
    score: 5
    comment: "비즈니스 맥락에 맞는 인사이트 제공"
  - name: "창의성"
    score: 3
    comment: "기본적인 분석에 충실함"
  - name: "일관성"
    score: 5
    comment: "항상 동일한 구조로 결과 제공"
  - name: "완성도"
    score: 4
    comment: "대체로 완성도 높음"
history:
  - date: "2023-09-15"
    version: "v1.0"
    changes: "최초 작성"
    reason: "데이터 분석 리포트 자동화 필요"
  - date: "2023-10-05"
    version: "v1.1"
    changes: "시각화 제안 섹션 추가"
    reason: "시각적 요소 강화 필요성 인식"
use_cases:
  - date: "2023-09-20"
    situation: "월간 판매 데이터 분석"
    result: "경영진이 이해하기 쉬운 보고서 생성"
    improvements: "지역별 분석 강화 필요"
  - date: "2023-10-10"
    situation: "고객 만족도 조사 분석"
    result: "주요 개선점 명확히 도출"
    improvements: "시계열 데이터 분석 추가 필요"
related_prompts:
  - id: "data-visualization-prompt"
    name: "데이터 시각화 프롬프트"
    type: "보완"
    description: "분석 결과를 시각화하는 데 활용 가능"
  - id: "executive-summary-prompt"
    name: "경영진 요약 프롬프트"
    type: "후속"
    description: "이 분석 결과를 경영진용으로 간략화"
references:
  - name: "효과적인 데이터 시각화 가이드"
    url: "https://example.com/data-viz-guide"
  - name: "비즈니스 리포트 작성법"
    url: "https://example.com/business-report-guide"
notes: |
  이 프롬프트는 데이터 유형에 따라 약간의 조정이 필요할 수 있음.
  특히 시계열 데이터와 범주형 데이터에 대해 다른 접근법 필요.
---