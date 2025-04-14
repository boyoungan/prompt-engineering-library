// assets/js/admin.js

// 기본 DOM 요소 생성
document.addEventListener('DOMContentLoaded', function() {
  const editorContainer = document.getElementById('markdown-editor');
  
  // 에디터 UI 생성
  editorContainer.innerHTML = `
    <div class="editor-container">
      <h1>마크다운 포스트 에디터</h1>
      
      <div class="form-group">
        <label for="post-title">제목</label>
        <input type="text" id="post-title" placeholder="포스트 제목">
      </div>
      
      <div class="form-group">
        <label for="post-author">작성자</label>
        <input type="text" id="post-author" placeholder="작성자 이름">
      </div>
      
      <div class="form-group">
        <label for="post-categories">카테고리</label>
        <input type="text" id="post-categories" placeholder="카테고리 (쉼표로 구분)">
      </div>
      
      <div class="form-group">
        <label for="post-tags">태그</label>
        <input type="text" id="post-tags" placeholder="태그 (쉼표로 구분)">
      </div>
      
      <div class="editor-area">
        <div class="tabs">
          <button id="tab-write" class="active">작성</button>
          <button id="tab-preview">미리보기</button>
        </div>
        
        <div id="write-panel">
          <textarea id="markdown-content" placeholder="마크다운으로 내용을 작성하세요..."></textarea>
        </div>
        
        <div id="preview-panel" style="display: none;">
          <div id="preview-content"></div>
        </div>
      </div>
      
      <div class="file-upload">
        <label for="file-upload">파일 첨부</label>
        <input type="file" id="file-upload" multiple>
        <div id="file-list"></div>
      </div>
      
      <div class="actions">
        <button id="load-sample">예시 데이터 불러오기</button>
        <button id="save-draft">임시저장</button>
        <button id="publish-post">발행하기</button>
      </div>
    </div>
  `;
  
  // 예시 데이터 로드 버튼 이벤트
  const loadSampleBtn = document.getElementById('load-sample');
  loadSampleBtn.addEventListener('click', function() {
    loadSampleData();
  });
  
  // 예시 데이터 로드 함수
  function loadSampleData() {
    // 예시 데이터
    const sampleData = {
      title: "GPT-4를 활용한 코드 리뷰 프롬프트",
      author: "김개발",
      categories: "AI, 개발, 코드리뷰",
      tags: "GPT-4, 코드리뷰, 프로그래밍, 개발도구",
      content: `# GPT-4를 활용한 코드 리뷰 프롬프트

## 목적
이 프롬프트는 GPT-4를 활용하여 효과적인 코드 리뷰를 수행하기 위한 템플릿입니다. 코드의 문제점을 찾고, 개선 방안을 제시하며, 코딩 표준 준수 여부를 확인할 수 있습니다.

## 사용 방법
1. 아래 프롬프트 템플릿에 코드를 삽입합니다.
2. 필요에 따라 프로그래밍 언어와 코딩 표준을 지정합니다.
3. GPT-4에게 전송하여 코드 리뷰를 받습니다.

## 프롬프트 템플릿

\`\`\`
당신은 숙련된 시니어 개발자입니다. 다음 코드를 검토하고 상세한 코드 리뷰를 제공해주세요:

[코드 삽입 위치]

다음 항목을 포함하여 리뷰해주세요:
1. 코드 품질 및 가독성
2. 잠재적인 버그 또는 에러
3. 성능 최적화 가능성
4. 보안 취약점
5. 코딩 표준 준수 여부
6. 개선 제안

프로그래밍 언어: [언어명]
적용할 코딩 표준: [표준명, 예: PEP 8, Google Java Style 등]
\`\`\`

## 예시 결과
- 들여쓰기와 네이밍 컨벤션 개선 제안
- 메모리 누수 가능성 지적
- 예외 처리 미흡 부분 식별
- 알고리즘 최적화 방안 제시
- 보안 취약점 경고 및 해결책 제공

## 주의사항
- 너무 큰 코드 파일은 토큰 제한으로 인해 완전한 리뷰가 어려울 수 있습니다.
- 맥락 정보가 부족할 경우, GPT-4는 추측에 기반한 리뷰를 할 수 있습니다.
- 특정 도메인 지식이 필요한 경우 추가 정보를 제공하는 것이 좋습니다.`
    };
    
    // 폼에 예시 데이터 채우기
    document.getElementById('post-title').value = sampleData.title;
    document.getElementById('post-author').value = sampleData.author;
    document.getElementById('post-categories').value = sampleData.categories;
    document.getElementById('post-tags').value = sampleData.tags;
    document.getElementById('markdown-content').value = sampleData.content;
    
    // 미리보기 업데이트
    if (document.getElementById('tab-preview').classList.contains('active')) {
      renderMarkdown();
    }
    
    alert('예시 데이터가 로드되었습니다.');
  }
  
  // 파일 업로드 이벤트 처리
  const fileUpload = document.getElementById('file-upload');
  const fileList = document.getElementById('file-list');
  const uploadedFiles = [];
  
  fileUpload.addEventListener('change', function(event) {
    const files = event.target.files;
    
    if (files.length > 0) {
      // 파일 목록에 표시
      let html = '<ul class="uploaded-files">';
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        html += `
          <li>
            <span>${file.name}</span>
            <span class="file-size">(${formatFileSize(file.size)})</span>
          </li>
        `;
        
        // 파일 정보 저장
        uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type
        });
      }
      
      html += '</ul>';
      fileList.innerHTML = html;
    }
  });
  
  // 파일 크기 포맷 함수
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }
  
  // 탭 전환 기능
  const tabWrite = document.getElementById('tab-write');
  const tabPreview = document.getElementById('tab-preview');
  const writePanel = document.getElementById('write-panel');
  const previewPanel = document.getElementById('preview-panel');
  const markdownContent = document.getElementById('markdown-content');
  const previewContent = document.getElementById('preview-content');
  
  tabWrite.addEventListener('click', function() {
    tabWrite.classList.add('active');
    tabPreview.classList.remove('active');
    writePanel.style.display = 'block';
    previewPanel.style.display = 'none';
  });
  
  tabPreview.addEventListener('click', function() {
    tabWrite.classList.remove('active');
    tabPreview.classList.add('active');
    writePanel.style.display = 'none';
    previewPanel.style.display = 'block';
    
    // 마크다운 미리보기 렌더링
    renderMarkdown();
  });
  
  function renderMarkdown() {
    // 실제 구현은 GitHub API나 외부 라이브러리 활용
    const markdown = markdownContent.value;
    // 간단한 마크다운 변환 (실제로는 더 정교한 파서 사용)
    let html = markdown
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/\n/g, '<br>');
    
    previewContent.innerHTML = html;
  }
  
  // 저장 기능
  const publishBtn = document.getElementById('publish-post');
  publishBtn.addEventListener('click', function() {
    savePost(false);
  });
  
  const draftBtn = document.getElementById('save-draft');
  draftBtn.addEventListener('click', function() {
    savePost(true);
  });
  
  async function savePost(isDraft) {
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const categories = document.getElementById('post-categories').value;
    const tags = document.getElementById('post-tags').value;
    const content = markdownContent.value;
    
    if (!title || !content) {
      alert('제목과 내용은 필수입니다.');
      return;
    }
    
    // 파일명 생성
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    
    // 시간대 오프셋 (예: +0900)
    const timezoneOffset = date.getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
    const timezoneSign = timezoneOffset <= 0 ? '+' : '-';
    const formattedTimezone = `${timezoneSign}${String(timezoneOffsetHours).padStart(2, '0')}${String(timezoneOffsetMinutes).padStart(2, '0')}`;
    
    const slug = title.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-');
    const filename = `${formattedDate}-${slug}.md`;
    
    // Front Matter 생성
    const frontMatter = `---
layout: post
title: "${title}"
author: "${author}"
date: ${formattedDate}
categories: ${categories}
tags: ${tags}
published: ${!isDraft}
---

${content}`;
    
    // 여기서 실제 저장 로직 구현
    // GitHub API를 사용하거나 서버 API로 전송
    
    // 예시: 로컬에서 테스트할 때 콘솔에 출력
    console.log('파일 저장:', filename);
    console.log(frontMatter);

    try {
      // 서버에 포스트 저장 요청
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filename: filename,
          content: frontMatter,
          isDraft: isDraft
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert(data.message);
        
        // prompt-data.json 업데이트 요청
        try {
          const promptDataResponse = await fetch('http://localhost:3000/api/update-prompt-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          const promptDataResult = await promptDataResponse.json();
          
          if (promptDataResult.success) {
            console.log('prompt-data.json 파일이 업데이트되었습니다.');
            
            // 성공 후 폼 초기화
            document.getElementById('post-title').value = '';
            document.getElementById('post-author').value = '';
            document.getElementById('post-categories').value = '';
            document.getElementById('post-tags').value = '';
            markdownContent.value = '';
            
            // 업로드된 파일 목록 초기화
            uploadedFiles.length = 0;
            fileList.innerHTML = '';
          } else {
            console.error('prompt-data.json 업데이트 실패:', promptDataResult.error);
          }
        } catch (promptDataError) {
          console.error('prompt-data.json 업데이트 중 오류 발생:', promptDataError);
        }
        
      } else {
        alert('오류: ' + (data.error || '알 수 없는 오류'));
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  }
});