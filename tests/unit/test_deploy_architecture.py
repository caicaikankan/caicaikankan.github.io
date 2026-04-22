from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]


def read_repo_file(relative_path: str) -> str:
    return (REPO_ROOT / relative_path).read_text(encoding="utf-8")


def test_vitepress_uses_default_output_directory() -> None:
    config = read_repo_file(".vitepress/config.js")

    assert 'outDir: "../dist"' not in config


def test_github_and_gitee_deploy_use_vitepress_dist() -> None:
    workflow = read_repo_file(".github/workflows/deploy.yml")

    assert "path: .vitepress/dist" in workflow
    assert "directory: .vitepress/dist" in workflow
    assert "Move dist to root" not in workflow


def test_build_output_directories_are_gitignored() -> None:
    gitignore = read_repo_file(".gitignore")

    assert ".vitepress/dist/" in gitignore
    assert "dist/" in gitignore
