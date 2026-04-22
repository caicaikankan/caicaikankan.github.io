#!/bin/bash
# Gitee Pages 部署脚本 (Bash 版本)
# 使用方法: ./deploy-to-gitee.sh

set -e

# 配置参数
GITEE_USERNAME="cancanlala"
GITEE_REPO="cancanlala"
BRANCH="main"
DIRECTORY=".vitepress/dist"

echo -e "\033[32m开始部署到 Gitee Pages...\033[0m"

# 检查构建产物目录是否存在
if [ ! -d "$DIRECTORY" ]; then
    echo -e "\033[31m错误: $DIRECTORY 目录不存在!\033[0m"
    echo -e "\033[33m请先运行 'npm run docs:build' 构建项目\033[0m"
    exit 1
fi

# 检查 git 是否安装
if ! command -v git &> /dev/null; then
    echo -e "\033[31m错误: Git 未安装!\033[0m"
    exit 1
fi

# 检查是否在 git 仓库中
if [ ! -d ".git" ]; then
    echo -e "\033[31m错误: 当前目录不是 git 仓库!\033[0m"
    exit 1
fi

# 添加所有更改
echo -e "\033[36m添加更改到 git...\033[0m"
git add .

# 提交更改
echo -e "\033[36m提交更改...\033[0m"
git commit -m "deploy: update Gitee Pages content" || echo "没有更改需要提交"

# 推送到 Gitee
echo -e "\033[36m推送到 Gitee...\033[0m"
git push gitee $BRANCH

if [ $? -eq 0 ]; then
    echo -e "\033[32m✅ 部署成功!\033[0m"
    echo -e "\033[33m请在 Gitee 仓库中手动启用 Pages 服务\033[0m"
    echo -e "\033[36m访问地址: https://$GITEE_USERNAME.gitee.io/$GITEE_REPO\033[0m"
else
    echo -e "\033[31m❌ 部署失败!\033[0m"
    exit 1
fi
