from pathlib import Path
import re


REPO_ROOT = Path(__file__).resolve().parents[2]


def read_repo_file(relative_path: str) -> str:
    return (REPO_ROOT / relative_path).read_text(encoding="utf-8")


def read_frontmatter(relative_path: str) -> str:
    content = read_repo_file(relative_path)
    match = re.match(r"---\n(.*?)\n---", content, re.DOTALL)

    assert match is not None, f"{relative_path} 缺少 frontmatter"
    return match.group(1)


def test_vitepress_uses_default_output_directory() -> None:
    config = read_repo_file(".vitepress/config.js")

    assert 'outDir: "../dist"' not in config


def test_github_pages_deploy_uses_vitepress_dist() -> None:
    workflow = read_repo_file(".github/workflows/deploy.yml")

    assert "path: .vitepress/dist" in workflow
    assert "Deploy to GitHub Pages" in workflow
    assert "Deploy to Gitee" not in workflow
    assert "Move dist to root" not in workflow


def test_build_output_directories_are_gitignored() -> None:
    gitignore = read_repo_file(".gitignore")

    assert ".vitepress/dist/" in gitignore
    assert "dist/" in gitignore


def test_article_layout_renders_cover_and_footer_meta() -> None:
    layout = read_repo_file(".vitepress/theme/MyLayout.vue")

    assert "article-hero__cover" in layout
    assert "阅读时间约" in layout
    assert "最近更新：" in layout


def test_articles_define_required_frontmatter_fields() -> None:
    article_paths = [
        "reading/vibe-coding-6weeks.md",
        "thinking/vibe-coding-engineering-system.md",
        "thinking/turbo-c-to-ai-ide.md"
    ]

    required_fields = [
        "articleTitle:",
        "author:",
        "publishDate:",
        "readingTime:",
        "lastUpdated:",
        "cover:"
    ]

    for article_path in article_paths:
        frontmatter = read_frontmatter(article_path)

        for field in required_fields:
            assert field in frontmatter, f"{article_path} 缺少字段 {field}"
