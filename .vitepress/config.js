import { defineConfig } from "vitepress";

export default defineConfig({
  title: "我的学习博客",
  base: "/",
  siteUrl: "https://cancanlala.gitee.io",
  outDir: "../dist",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "共读笔记", link: "/reading/" },
      { text: "工程思考", link: "/thinking/" }
    ],
    sidebar: {
      "/reading/": [
        {
          text: "共读笔记",
          items: [
            {
              text: "Vibe Coding 六周全纪录：一个人，一支AI开发队伍",
              link: "/reading/vibe-coding-6weeks"
            }
          ]
        }
      ],
      "/thinking/": [
        {
          text: "工程思考",
          items: [
            { text: "工程思考", link: "/thinking/" },
            {
              text: "工程思考｜Vibe Coding：不是AI写代码，是你在指挥一个工程系统",
              link: "/thinking/vibe-coding-engineering-system"
            },
            {
              text: "从 Turbo C 到 AI IDE：我亲历的编程工具发展轨迹与时代焦虑",
              link: "/thinking/turbo-c-to-ai-ide"
            }
          ]
        }
      ]
    }
  }
});
