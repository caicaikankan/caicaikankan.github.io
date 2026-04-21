# Gitee Pages 部署脚本
# 使用方法: 在 PowerShell 中运行此脚本

# 配置参数
$giteeUsername = "cancanlala"
$giteeRepo = "cancanlala"
$branch = "main"
$directory = "dist"

Write-Host "开始部署到 Gitee Pages..." -ForegroundColor Green

# 检查 dist 目录是否存在
if (-not (Test-Path $directory)) {
    Write-Host "错误: $directory 目录不存在!" -ForegroundColor Red
    Write-Host "请先运行 'npm run docs:build' 构建项目" -ForegroundColor Yellow
    exit 1
}

# 检查 git 是否安装
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "错误: Git 未安装!" -ForegroundColor Red
    exit 1
}

# 检查是否在 git 仓库中
if (-not (Test-Path .git)) {
    Write-Host "错误: 当前目录不是 git 仓库!" -ForegroundColor Red
    exit 1
}

# 添加所有更改
Write-Host "添加更改到 git..." -ForegroundColor Cyan
git add .

# 提交更改
Write-Host "提交更改..." -ForegroundColor Cyan
git commit -m "deploy: update Gitee Pages content"

# 推送到 Gitee
Write-Host "推送到 Gitee..." -ForegroundColor Cyan
git push gitee $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ 部署成功!" -ForegroundColor Green
    Write-Host "请在 Gitee 仓库中手动启用 Pages 服务" -ForegroundColor Yellow
    Write-Host "访问地址: https://$giteeUsername.gitee.io/$giteeRepo" -ForegroundColor Cyan
} else {
    Write-Host "❌ 部署失败!" -ForegroundColor Red
    exit 1
}
