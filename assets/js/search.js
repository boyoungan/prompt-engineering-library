// 검색 기능 구현
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const resultsContainer = document.getElementById('results-container');
  const tagFilters = document.querySelectorAll('#tag-filters input');
  const modelFilters = document.querySelectorAll('#model-filters input');
  
  let allPrompts = [];
  
  // 프롬프트 데이터 가져오기
  fetch('/assets/js/prompt-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다: ' + response.statusText);
      }
      return response.json();
    })
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
    })
    .catch(error => {
      console.error('Error loading prompt data:', error);
      resultsContainer.innerHTML = '<p>데이터를 불러오는데 문제가 발생했습니다.</p>';
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