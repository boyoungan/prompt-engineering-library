# GitHub + 정적 사이트 생성기로 프롬프트 엔지니어링 저장소 만들기

이 가이드는 GitHub와 정적 사이트 생성기(Jekyll)를 활용하여 프롬프트 엔지니어링 저장소를 만드는 방법을 단계별로 안내합니다.

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [준비 사항](#2-준비-사항)
3. [GitHub 저장소 설정](#3-github-저장소-설정)
4. [Jekyll 프로젝트 구조 설정](#4-jekyll-프로젝트-구조-설정)
5. [프롬프트 템플릿 및 메타데이터 설정](#5-프롬프트-템플릿-및-메타데이터-설정)
6. [검색 및 필터링 기능 구현](#6-검색-및-필터링-기능-구현)
7. [GitHub Pages로 배포하기](#7-github-pages로-배포하기)
8. [워크플로우: 프롬프트 추가 및 관리](#8-워크플로우-프롬프트-추가-및-관리)
9. [추가 기능 및 확장](#9-추가-기능-및-확장)

## 1. 시스템 개요

완성된 시스템은 다음과 같은 기능을 제공합니다:

- 마크다운 형식으로 프롬프트 저장 및 관리
- 태그, 카테고리 기반 프롬프트 분류
- 프롬프트 간 관계 설정 및 시각화
- 전체 텍스트 검색 및 필터링
- 버전 관리 및 협업 기능
- 반응형 웹 인터페이스

## 2. 준비 사항

- GitHub 계정
- Git 기본 지식
- 로컬 개발 환경 (선택 사항)
  - Ruby와 Jekyll 설치 (로컬에서 테스트하려는 경우)
  - 코드 에디터 (VSCode 추천)

## 3. GitHub 저장소 설정

1. **새 GitHub 저장소 생성**:
   - 저장소 이름: `prompt-engineering-library` (원하는 이름으로 변경 가능)
   - 설명: `프롬프트 엔지니어링 저장소 및 검색 시스템`
   - Public으로 설정 (Private도 가능하지만 GitHub Pages 사용 시 제한이 있을 수 있음)
   - README 파일 생성 체크

2. **저장소 클론 (선택 사항)**:
   ```bash
   git clone https://github.com/사용자명/prompt-engineering-library.git
   cd prompt-engineering-library
   ```

## 4. Jekyll 프로젝트 구조 설정

1. **`_config.yml` 파일 생성**:

```yaml
# 사이트 기본 설정
title: 프롬프트 엔지니어링 라이브러리
description: AI 프롬프트 엔지니어링을 위한 저장소
baseurl: "/prompt-engineering-library"
url: "https://사용자명.github.io"

# 빌드 설정
markdown: kramdown
permalink: /:categories/:title/

# 컬렉션 설정
collections:
  prompts:
    output: true
    permalink: /prompts/:name/

# 기본 프론트매터 설정
defaults:
  - scope:
      path: ""
      type: "prompts"
    values:
      layout: "prompt"

# 검색 설정
search: true

# 페이지네이션
plugins:
  - jekyll-paginate
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-gist

paginate: 10
paginate_path: "/page:num/"

# 제외 파일
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
```

2. **기본 디렉토리 구조 생성**:

```
prompt-engineering-library/
├── _prompts/            # 프롬프트 파일들
├── _layouts/            # 레이아웃 템플릿
├── _includes/           # 재사용 가능한 HTML 조각들
├── _data/               # 데이터 파일(태그, 관계 등)
├── assets/              # CSS, JS, 이미지 등
│   ├── css/
│   ├── js/
│   └── images/
├── _config.yml          # 설정 파일
├── index.md             # 홈페이지
├── search.md            # 검색 페이지
├── tags.md              # 태그 페이지
└── README.md            # 프로젝트 설명
```

3. **Gemfile 생성 (로컬 개발용)**:

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.2.0"
gem "webrick", "~> 1.7"

group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
end
```

## 5. 프롬프트 템플릿 및 메타데이터 설정

1. **프롬프트 레이아웃 생성** (`_layouts/prompt.html`):

```html
---
layout: default
---
<div class="prompt">
  <h1>{{ page.title }}</h1>
  
  <div class="prompt-metadata">
    <p><strong>작성일:</strong> {{ page.date | date: "%Y-%m-%d" }}</p>
    <p><strong>버전:</strong> {{ page.version }}</p>
    <p><strong>목적:</strong> {{ page.purpose }}</p>
    <p><strong>대상 모델:</strong> {{ page.model }}</p>
    
    <div class="tags">
      {% for tag in page.tags %}
        <a href="{{ site.baseurl }}/tags/#{{ tag | slugify }}" class="tag">#{{ tag }}</a>
      {% endfor %}
    </div>
  </div>

  <h2>프롬프트 전문</h2>
  <div class="prompt-content">
    {{ page.prompt_text | markdownify }}
  </div>

  <h2>프롬프트 구조 분석</h2>
  <h3>구성 요소</h3>
  <ul>
    <li><strong>시스템 지시사항:</strong> {{ page.system_instruction }}</li>
    <li><strong>역할 정의:</strong> {{ page.role_definition }}</li>
    <li><strong>제약 조건:</strong> {{ page.constraints }}</li>
    <li><strong>출력 형식:</strong> {{ page.output_format }}</li>
    <li><strong>예시:</strong> {{ page.examples }}</li>
  </ul>

  <h3>프롬프트 기법</h3>
  <ul>
    <li><strong>사용된 기법:</strong> {{ page.techniques }}</li>
    <li><strong>특별 구문:</strong> {{ page.special_syntax }}</li>
  </ul>

  <h2>성능 평가</h2>
  <table>
    <tr>
      <th>평가 기준</th>
      <th>점수 (1-5)</th>
      <th>코멘트</th>
    </tr>
    {% for metric in page.performance %}
    <tr>
      <td>{{ metric.name }}</td>
      <td>{{ metric.score }}</td>
      <td>{{ metric.comment }}</td>
    </tr>
    {% endfor %}
  </table>

  <h2>개선 이력</h2>
  <table>
    <tr>
      <th>날짜</th>
      <th>버전</th>
      <th>변경 사항</th>
      <th>변경 이유</th>
    </tr>
    {% for history in page.history %}
    <tr>
      <td>{{ history.date }}</td>
      <td>{{ history.version }}</td>
      <td>{{ history.changes }}</td>
      <td>{{ history.reason }}</td>
    </tr>
    {% endfor %}
  </table>

  <h2>사용 사례 및 결과</h2>
  {% for case in page.use_cases %}
  <div class="use-case">
    <h3>사용 사례 {{ forloop.index }}</h3>
    <p><strong>날짜:</strong> {{ case.date }}</p>
    <p><strong>상황:</strong> {{ case.situation }}</p>
    <p><strong>결과:</strong> {{ case.result }}</p>
    <p><strong>개선점:</strong> {{ case.improvements }}</p>
  </div>
  {% endfor %}

  <h2>관련 프롬프트</h2>
  <table>
    <tr>
      <th>관련 프롬프트</th>
      <th>관계 유형</th>
      <th>설명</th>
    </tr>
    {% for relation in page.related_prompts %}
    <tr>
      <td><a href="{{ site.baseurl }}/prompts/{{ relation.id }}">{{ relation.name }}</a></td>
      <td>{{ relation.type }}</td>
      <td>{{ relation.description }}</td>
    </tr>
    {% endfor %}
  </table>

  <h2>참고 자료</h2>
  <ul>
    {% for reference in page.references %}
    <li><a href="{{ reference.url }}" target="_blank">{{ reference.name }}</a></li>
    {% endfor %}
  </ul>

  <h2>메모 및 기타 사항</h2>
  <div class="notes">
    {{ page.notes | markdownify }}
  </div>
</div>
```

2. **프롬프트 예시 생성** (`_prompts/example-prompt.md`):

```markdown
---
layout: prompt
title: "데이터 분석 리포트 작성 프롬프트"
date: 2023-09-15
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
```

## 6. 검색 및 필터링 기능 구현

1. **검색 페이지 생성** (`search.md`):

```markdown
---
layout: page
title: 프롬프트 검색
permalink: /search/
---

<div id="search-container">
  <input type="text" id="search-input" placeholder="프롬프트 검색..." autocomplete="off">
  
  <div class="filter-section">
    <h3>태그로 필터링</h3>
    <div id="tag-filters">
      {% assign tags = site.prompts | map: "tags" | uniq | sort %}
      {% for tag in tags %}
        <label><input type="checkbox" data-tag="{{ tag }}"> {{ tag }}</label>
      {% endfor %}
    </div>
    
    <h3>모델로 필터링</h3>
    <div id="model-filters">
      {% assign models = site.prompts | map: "model" | uniq | sort %}
      {% for model in models %}
        <label><input type="checkbox" data-model="{{ model }}"> {{ model }}</label>
      {% endfor %}
    </div>
  </div>
  
  <div id="results-container"></div>
</div>

<script src="{{ site.baseurl }}/assets/js/search.js"></script>
```

2. **검색 스크립트 생성** (`assets/js/search.js`):

```javascript
// 검색 기능 구현
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  const tagFilters = document.querySelectorAll('#tag-filters input');
  const modelFilters = document.querySelectorAll('#model-filters input');
  
  let allPrompts = [];
  
  // 프롬프트 데이터 가져오기
  fetch('/prompt-engineering-library/assets/js/prompt-data.json')
    .then(response => response.json())
    .then(data => {
      allPrompts = data;
      
      // 초기 목록 표시
      displayPrompts(allPrompts);
      
      // 검색 이벤트 리스너
      searchInput.addEventListener('input', performSearch);
      
      // 필터 이벤트 리스너
      tagFilters.forEach(filter => {
        filter.addEventListener('change', performSearch);
      });
      
      modelFilters.forEach(filter => {
        filter.addEventListener('change', performSearch);
      });
    });
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // 선택된 태그 필터
    const selectedTags = Array.from(tagFilters)
      .filter(input => input.checked)
      .map(input => input.dataset.tag);
    
    // 선택된 모델 필터
    const selectedModels = Array.from(modelFilters)
      .filter(input => input.checked)
      .map(input => input.dataset.model);
    
    // 필터링 적용
    const filteredPrompts = allPrompts.filter(prompt => {
      // 검색어 필터링
      const matchesSearch = 
        prompt.title.toLowerCase().includes(searchTerm) ||
        prompt.purpose.toLowerCase().includes(searchTerm) ||
        prompt.prompt_text.toLowerCase().includes(searchTerm);
      
      // 태그 필터링
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => prompt.tags.includes(tag));
      
      // 모델 필터링
      const matchesModel = selectedModels.length === 0 || 
        selectedModels.includes(prompt.model);
      
      return matchesSearch && matchesTags && matchesModel;
    });
    
    // 결과 표시
    displayPrompts(filteredPrompts);
  }
  
  function displayPrompts(prompts) {
    if (prompts.length === 0) {
      resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
      return;
    }
    
    let html = '<div class="search-results">';
    
    prompts.forEach(prompt => {
      html += `
        <div class="prompt-card">
          <h3><a href="${prompt.url}">${prompt.title}</a></h3>
          <p>${prompt.purpose}</p>
          <div class="prompt-meta">
            <span>모델: ${prompt.model}</span>
            <span>버전: ${prompt.version}</span>
          </div>
          <div class="prompt-tags">
            ${prompt.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    resultsContainer.innerHTML = html;
  }
});
```

3. **프롬프트 데이터 JSON 생성을 위한 플러그인** (`_plugins/generate_prompt_data.rb`):

```ruby
require 'json'

module Jekyll
  class PromptDataGenerator < Jekyll::Generator
    safe true
    
    def generate(site)
      # 프롬프트 데이터 배열 생성
      prompts_data = []
      
      site.collections['prompts'].docs.each do |prompt|
        prompts_data << {
          'title' => prompt.data['title'],
          'url' => prompt.url,
          'purpose' => prompt.data['purpose'],
          'model' => prompt.data['model'],
          'version' => prompt.data['version'],
          'tags' => prompt.data['tags'],
          'prompt_text' => prompt.data['prompt_text']
        }
      end
      
      # JSON 파일 생성
      json_data = JSON.pretty_generate(prompts_data)
      data_file = File.join(site.dest, 'assets', 'js', 'prompt-data.json')
      
      # 디렉토리 생성
      FileUtils.mkdir_p(File.dirname(data_file))
      
      # 파일 작성
      File.open(data_file, 'w') do |file|
        file.write(json_data)
      end
      
      # 사이트 정적 파일에 추가
      site.static_files << Jekyll::StaticFile.new(
        site, 
        site.dest, 
        'assets/js', 
        'prompt-data.json'
      )
    end
  end
end
```

## 7. GitHub Pages로 배포하기

1. **GitHub Pages 설정**:
   - 저장소 설정(Settings)에서 GitHub Pages 섹션으로 이동
   - Source를 `main` 브랜치로 설정
   - Save 버튼 클릭

2. **GitHub Actions 워크플로우 설정** (`.github/workflows/jekyll.yml`):

```yaml
name: Build and deploy Jekyll site to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  github-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/cache@v2
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-
      
      - uses: helaili/jekyll-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          jekyll_src: '.'
```

## 8. 워크플로우: 프롬프트 추가 및 관리

1. **새 프롬프트 추가하기**:
   - `_prompts` 디렉토리에 새 마크다운 파일 생성
   - 프론트매터에 필요한 메타데이터 추가
   - 프롬프트 내용 작성
   - 커밋 및 푸시

   ```bash
   git add _prompts/new-prompt.md
   git commit -m "Add new prompt for data visualization"
   git push origin main
   ```

2. **프롬프트 업데이트하기**:
   - 기존 파일 수정
   - 버전 정보 및 개선 이력 업데이트
   - 커밋 및 푸시

## 9. 추가 기능 및 확장

1. **프롬프트 시각화**:
   - D3.js 또는 Cytoscape.js를 사용하여 프롬프트 간 관계 그래프 구현
   - `_includes/prompt-graph.html` 파일 생성

2. **성능 메트릭 대시보드**:
   - Chart.js를 사용하여 프롬프트 성능 메트릭 시각화
   - 태그별, 모델별 성능 비교

3. **프롬프트 템플릿 제너레이터**:
   - 웹 폼을 통해 새 프롬프트 생성 보조 도구
   - 마크다운 파일 자동 생성

4. **협업 기능 강화**:
   - Utterances 또는 Giscus를 사용한 프롬프트 댓글 기능
   - 기여 가이드라인 추가

5. **실험 및 A/B 테스트**:
   - 프롬프트 변형(variants) 관리 기능
   - 성능 비교 테스트 기록

6. **통합 검색 개선**:
   - Algolia 또는 Lunr.js를 사용한 고급 검색 기능
   - 자동 완성 및 추천 기능

## 마무리

이 프레임워크를 기반으로 프롬프트 엔지니어링 라이브러리를 계속 확장하고 발전시킬 수 있습니다. 코드 품질과 기능을 점진적으로 개선하면서 프롬프트 엔지니어링 커뮤니티를 위한 유용한 자원으로 성장시킬 수 있습니다.
