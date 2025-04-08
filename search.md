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