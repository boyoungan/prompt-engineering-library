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