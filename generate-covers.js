#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import axios from 'axios';

// 配置
const ENDPOINT_URL = 'https://ark.cn-beijing.volces.com/api/v3';
const MODEL_NAME = 'ep-20260423153937-g9tdj'; // 接入点名称，也可以用 "doubao-seedream-4.5"
const BASE_URL = `${ENDPOINT_URL}/images/generations`;
const API_KEY = process.env.VOLCENGINE_API_KEY; // 必须从环境变量读取，不在代码中硬编码
const COVERS_DIR = path.join(process.cwd(), 'public', 'covers');

// 文章信息
const articles = [
  {
    title: '从 Turbo C 到 AI IDE：我亲历的编程工具发展轨迹与时代焦虑',
    category: '工程思考',
    description: '讲述作者从 Turbo C 到 AI IDE 的编程工具发展历程，以及对编程教育的思考',
    filename: 'turbo-c-to-ai-ide.jpg'
  },
  {
    title: '工程思考｜Vibe Coding：不是AI写代码，是你在指挥一个工程系统',
    category: '工程思考',
    description: '探讨 Vibe Coding 如何通过 AI 构建工程系统，提升开发效率',
    filename: 'vibe-coding-engineering-system.jpg'
  },
  {
    title: 'Vibe Coding 六周全纪录：一个人，一支AI开发队伍',
    category: '共读笔记',
    description: '记录作者使用 Vibe Coding 进行六周全栈开发的过程和心得',
    filename: 'vibe-coding-6weeks.jpg'
  }
];

// 生成提示词
function generatePrompt(article) {
  const styleMap = {
    'turbo-c-to-ai-ide': '复古与未来结合的风格，左侧是精确还原的Turbo C 2.0蓝色DOS窗口，带有黄色文字和经典C语言代码片段，右侧是VS Code风格的现代AI IDE界面，带有打开的AI聊天面板展示代码建议。添加发光渐变时间线连接两个时代，深色宇宙蓝背景，强烈科技感，包含代码编辑器、AI助手机器人图标、年份标记时间轴元素',
    'vibe-coding-engineering-system': '工程系统协作风格，中心是人类开发者形象，周围环绕多个AI代理图标（分别代表编码、调试、部署、测试角色），通过流动线条连接到中央代码库和部署流水线。使用深邃蓝色和森林绿色调，专业工程感，包含实时协作光标、任务看板元素',
    'vibe-coding-6weeks': '温暖叙事时间线风格，展示六周开发历程的水平时间轴，每个周数标记带有独特里程碑图标（线框设计、后端编码、前端集成、自动化测试、云部署、项目启动）。暖橙与紫色渐变背景，带有柔和发光效果，包含代码片段、AI机器人头像、进度百分比标记，故事感强烈'
  };
  
  const baseName = article.filename.replace('.jpg', '');
  const style = styleMap[baseName] || '简约现代风格，深色背景，科技感十足';
  
  return `CRITICAL: 这是高度定制化请求，绝对禁止生成任何通用科技图库图片，所有视觉元素必须100%匹配文章核心主题，不得有任何无关内容。
THIS IS NOT A CREATIVE FREEDOM REQUEST - YOU MUST FOLLOW EVERY SINGLE SPECIFICATION EXACTLY.
生成一张高度定制化的博客文章封面配图，严格匹配文章主题：${article.title}。
核心内容：${article.description}。
指定风格：${style}。
图片参数：1600x900像素，纯SVG矢量格式，无任何光栅元素，线条清晰锐利，适合网页高清显示。

强制要求：
1. 100%还原风格描述中的所有关键细节元素，不得简化或省略任何指定内容，包括每个图标、颜色、布局和文本内容
2. 图像必须直接呼应文章核心观点，Turbo C到AI IDE的演变必须清晰展示新旧界面的精确像素级对比
3. 色彩严格遵循指定色调，背景风格统一为深色科技风（除非风格描述另有说明），不得随意更改配色方案
4. 最终输出仅返回可直接访问的SVG图片URL，不包含任何多余文字、解释或markdown格式
5. 确保SVG代码结构规范，可直接嵌入网页使用，无外部资源依赖，所有字体转换为矢量路径
6. 禁止生成与文章主题无关的通用科技配图，所有视觉元素必须紧密服务于当前文章内容，不得使用任何通用模板
7. 所有文本元素必须转换为矢量路径，避免使用实时文本节点以确保跨浏览器渲染一致性
8. 不得添加任何水印、品牌logo或无关装饰元素
9. 建立清晰的视觉层级，核心主题需在1秒内即可识别，主次关系明确
10. 所有视觉隐喻必须直接映射文章核心论点，禁止使用抽象或无关意象`;
}

// 调用 Seedream API
async function generateCover(article) {
  try {
    const prompt = generatePrompt(article);
    
    // 构建请求体
    const payload = {
      model: MODEL_NAME,
      prompt: prompt,
      response_format: "url",
      size: "2848x1600", // 16:9 宽高比，约455万像素，满足最小368万像素要求
      watermark: false, // 去掉水印，更干净
      stream: false
    };
    
    // 调试：打印完整的请求URL和payload
    console.log("\n=== 调试信息 ===");
    console.log(`请求URL: ${BASE_URL}`);
    console.log(`请求体: ${JSON.stringify(payload, null, 2)}`);
    console.log(`===============`);
    
    console.log(`正在调用 API 生成图片，提示词：${prompt.substring(0, 100)}...`);
    
    const headers = {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    };
    
    const response = await axios.post(
      BASE_URL,
      payload,
      {
        headers: headers,
        timeout: 60000 // 60秒超时
      }
    );

    console.log('API 响应:', JSON.stringify(response.data, null, 2));
    
    if (response.data && response.data.data && response.data.data.length > 0) {
      const imageUrl = response.data.data[0].url;
      console.log(`生成成功！图片 URL: ${imageUrl}`);
      return imageUrl;
    }
  } catch (error) {
    console.error(`生成失败：${error.message}`);
    if (error.response) {
      console.error('错误状态:', error.response.status);
      console.error('错误详情:', JSON.stringify(error.response.data, null, 2));
    }
  }
  return null;
}

// 保存图片
async function saveImage(url, filename) {
  try {
    const response = await axios.get(url, { responseType: 'stream' });
    const outputPath = path.join(COVERS_DIR, filename);
    
    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`保存图片失败：${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  // 检查 API key
  if (!API_KEY) {
    console.error('错误：未设置 VOLCENGINE_API_KEY 环境变量');
    console.error('请使用以下命令设置：');
    console.error('  Windows PowerShell: $env:VOLCENGINE_API_KEY="your-api-key"');
    console.error('  Linux/Mac: export VOLCENGINE_API_KEY="your-api-key"');
    process.exit(1);
  }
  
  // 确保目录存在
  if (!fs.existsSync(COVERS_DIR)) {
    fs.mkdirSync(COVERS_DIR, { recursive: true });
  }

  console.log('开始生成文章配图...');
  
  for (const article of articles) {
    console.log(`\n正在生成：${article.title}`);
    const imageUrl = await generateCover(article);
    
    if (imageUrl) {
      console.log(`正在保存：${article.filename}`);
      const success = await saveImage(imageUrl, article.filename);
      if (success) {
        console.log(`保存成功！`);
      }
    }
  }

  console.log('\n所有图片生成完成！');
}

// 执行
main();