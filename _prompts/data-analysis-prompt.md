---
layout: prompt
title: "데이터 분석 프롬프트"
date: 2023-04-15
version: "v1.0"
purpose: "데이터셋 분석 및 인사이트 도출"
model: "Claude 3.5 Sonnet"
tags: ["데이터분석", "시각화", "리포트"]
prompt_text: |
  당신은 숙련된 데이터 분석가입니다. 제공된 데이터셋을 분석하고 다음 구조로 결과를 제공해주세요:
  
  1. 데이터셋 개요 및 구조
  2. 주요 통계 지표
  3. 데이터 시각화 제안
  4. 인사이트 및 결론
system_instruction: "데이터 분석가 역할 수행"
role_definition: "데이터 분석가"
constraints: "마크다운 형식, 4개 섹션 구조"
output_format: "구조화된 마크다운 문서"
examples: "없음"
techniques: "역할 프롬프팅, 단계별 지시"
special_syntax: "마크다운 형식"
performance:
  - name: "정확성"
    score: 4
    comment: "데이터 분석이 정확하나 가끔 깊이가 부족함"
history:
  - date: "2023-04-15"
    version: "v1.0"
    changes: "최초 작성"
    reason: "데이터 분석 작업 자동화 필요"
use_cases:
  - date: "2023-04-20"
    situation: "월간 매출 보고서 작성"
    result: "유용한 인사이트 도출"
    improvements: "시계열 분석 강화 필요"
related_prompts:
  - id: "visualization-prompt"
    name: "데이터 시각화 프롬프트"
    type: "보완"
    description: "분석 결과 시각화에 활용"
references:
  - name: "효과적인 데이터 분석 가이드"
    url: "https://example.com/data-analysis-guide"
notes: |
  이 프롬프트는 정형 데이터에 적합합니다. 
  비정형 데이터의 경우 수정이 필요합니다.
---