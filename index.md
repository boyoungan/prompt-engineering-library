---
layout: default
title: 홈
---

<div class="home-container">
  <section class="hero">
    <div class="hero-content">
      <h1>Prompt Hub</h1>
      <p class="subtitle">AI 프롬프트를 체계적으로 관리하고 검색하는 지식 저장소</p>
      <div class="hero-buttons">
        <a href="{{ '/search/' | relative_url }}" class="btn btn-primary">프롬프트 검색</a>
        <a href="#features" class="btn btn-secondary">주요 기능 보기</a>
      </div>
    </div>
  </section>

  <section id="features" class="features">
    <h2>주요 기능</h2>
    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">📋</div>
        <h3>체계적인 분류</h3>
        <p>태그와 메타데이터를 활용한 효율적인 프롬프트 분류 시스템</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔍</div>
        <h3>강력한 검색</h3>
        <p>키워드, 태그, 모델 기반의 다양한 검색 및 필터링 기능</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔄</div>
        <h3>버전 관리</h3>
        <p>프롬프트 개선 이력 추적 및 변경 사항 관리</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔗</div>
        <h3>관계 연결</h3>
        <p>관련 프롬프트 간의 연결 구조로 지식 네트워크 구축</p>
      </div>
    </div>
  </section>

  <section class="recent-prompts">
    <h2>최근 추가된 프롬프트</h2>
    <div class="prompts-grid">
      {% assign prompts = site.prompts | sort: "date" | reverse | limit: 3 %}
      {% for prompt in prompts %}
      <div class="prompt-card">
        <h3><a href="{{ prompt.url | relative_url }}">{{ prompt.title }}</a></h3>
        <p>{{ prompt.purpose }}</p>
        <div class="prompt-meta">
          <span>모델: {{ prompt.model }}</span>
          <span>버전: {{ prompt.version }}</span>
        </div>
        <div class="prompt-tags">
          {% for tag in prompt.tags %}
            <span class="tag">#{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
    <div class="view-all">
      <a href="{{ '/search/' | relative_url }}" class="btn btn-outline">모든 프롬프트 보기</a>
    </div>
  </section>

  <section class="cta">
    <h2>프롬프트 엔지니어링의 효율성을 높이세요</h2>
    <p>체계적인 프롬프트 관리로 AI 활용 능력을 극대화하세요.</p>
    <a href="#" class="btn btn-primary">시작하기</a>
  </section>
</div>