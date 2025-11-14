"""
GitHub Repository Analyzer and Monetization Engine
AutomationCodex GitHub Integration for Profile and Organization Analysis

This module provides:
- GitHub CLI integration for repository analysis
- Local file system analysis
- Repository monetization assessment
- Portfolio optimization recommendations
- Automated documentation generation
- Market value analysis
"""

import asyncio
import json
import subprocess
import os
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, field
import logging
from datetime import datetime, timedelta
import aiohttp
import pandas as pd
import numpy as np
from collections import defaultdict, Counter
import re
import hashlib

# AutomationCodex imports
import sys
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from scrapers.pipelines import create_adaptive_pipeline
from templates.inference import create_template_inference_engine
from analytics.validation import create_quality_controller

logger = logging.getLogger(__name__)

@dataclass
class RepositoryAnalysis:
    """Analysis results for a single repository"""
    name: str
    full_name: str
    description: str
    language: str
    stars: int
    forks: int
    size: int
    last_updated: str
    topics: List[str]
    license: Optional[str]
    readme_score: float
    documentation_score: float
    code_quality_score: float
    monetization_potential: float
    market_value_estimate: float
    improvement_recommendations: List[str]
    local_path: Optional[str] = None
    
@dataclass
class GitHubProfile:
    """Complete GitHub profile analysis"""
    username: str
    name: str
    bio: str
    company: str
    location: str
    email: str
    blog: str
    followers: int
    following: int
    public_repos: int
    total_stars: int
    total_forks: int
    repositories: List[RepositoryAnalysis]
    organizations: List[str]
    profile_value_score: float
    monetization_opportunities: List[Dict[str, Any]]

class GitHubCLIManager:
    """Manager for GitHub CLI operations"""
    
    def __init__(self):
        self.authenticated = False
        self.current_user = None
        self._check_authentication()
    
    def _check_authentication(self) -> bool:
        """Check if GitHub CLI is authenticated"""
        try:
            result = subprocess.run(['gh', 'auth', 'status'], 
                                  capture_output=True, text=True, check=False)
            self.authenticated = result.returncode == 0
            if self.authenticated:
                # Get current user
                user_result = subprocess.run(['gh', 'api', 'user'], 
                                           capture_output=True, text=True, check=True)
                self.current_user = json.loads(user_result.stdout)
                logger.info(f"GitHub CLI authenticated as: {self.current_user.get('login')}")
            return self.authenticated
        except Exception as e:
            logger.error(f"Failed to check GitHub authentication: {e}")
            return False
    
    def authenticate_if_needed(self) -> bool:
        """Authenticate with GitHub if not already authenticated"""
        if self.authenticated:
            return True
        
        print("?? GitHub CLI authentication required...")
        print("Please run: gh auth login")
        print("Choose 'GitHub.com' and follow the authentication flow.")
        
        # Wait for user to authenticate
        input("Press Enter after you've completed authentication...")
        
        return self._check_authentication()
    
    def get_user_repositories(self, username: Optional[str] = None, 
                             include_private: bool = False) -> List[Dict[str, Any]]:
        """Get all repositories for a user"""
        if not self.authenticated:
            raise Exception("GitHub CLI not authenticated")
        
        username = username or self.current_user['login']
        
        try:
            cmd = ['gh', 'repo', 'list', username, '--json', 
                   'name,nameWithOwner,description,primaryLanguage,stargazerCount,'
                   'forkCount,diskUsage,updatedAt,repositoryTopics,licenseInfo,'
                   'isPrivate,url,defaultBranchRef']
            
            if include_private:
                cmd.append('--include-private')
            
            cmd.extend(['--limit', '1000'])  # Get up to 1000 repos
            
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            repos = json.loads(result.stdout)
            
            logger.info(f"Retrieved {len(repos)} repositories for {username}")
            return repos
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to get repositories: {e}")
            return []
    
    def get_organization_repositories(self, org_name: str) -> List[Dict[str, Any]]:
        """Get all repositories for an organization"""
        if not self.authenticated:
            raise Exception("GitHub CLI not authenticated")
        
        try:
            cmd = ['gh', 'repo', 'list', org_name, '--json',
                   'name,nameWithOwner,description,primaryLanguage,stargazerCount,'
                   'forkCount,diskUsage,updatedAt,repositoryTopics,licenseInfo,'
                   'isPrivate,url,defaultBranchRef', '--limit', '1000']
            
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            repos = json.loads(result.stdout)
            
            logger.info(f"Retrieved {len(repos)} repositories for organization {org_name}")
            return repos
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to get organization repositories: {e}")
            return []
    
    def get_user_organizations(self, username: Optional[str] = None) -> List[str]:
        """Get organizations for a user"""
        if not self.authenticated:
            raise Exception("GitHub CLI not authenticated")
        
        username = username or self.current_user['login']
        
        try:
            cmd = ['gh', 'api', f'users/{username}/orgs']
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            orgs = json.loads(result.stdout)
            
            org_names = [org['login'] for org in orgs]
            logger.info(f"Found {len(org_names)} organizations for {username}: {org_names}")
            return org_names
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to get organizations: {e}")
            return []
    
    def get_repository_details(self, repo_full_name: str) -> Dict[str, Any]:
        """Get detailed information for a specific repository"""
        try:
            cmd = ['gh', 'repo', 'view', repo_full_name, '--json',
                   'name,nameWithOwner,description,primaryLanguage,stargazerCount,'
                   'forkCount,diskUsage,updatedAt,repositoryTopics,licenseInfo,'
                   'isPrivate,url,defaultBranchRef,readme,releases,issues,pullRequests']
            
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            return json.loads(result.stdout)
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to get repository details for {repo_full_name}: {e}")
            return {}
    
    def clone_repository(self, repo_full_name: str, local_path: str) -> bool:
        """Clone a repository to local path"""
        try:
            cmd = ['gh', 'repo', 'clone', repo_full_name, local_path]
            result = subprocess.run(cmd, capture_output=True, text=True, check=True)
            logger.info(f"Successfully cloned {repo_full_name} to {local_path}")
            return True
            
        except subprocess.CalledProcessError as e:
            logger.error(f"Failed to clone {repo_full_name}: {e}")
            return False

class LocalFileSystemAnalyzer:
    """Analyzer for local file systems and repositories"""
    
    def __init__(self):
        self.supported_languages = {
            '.py': 'Python',
            '.js': 'JavaScript',
            '.ts': 'TypeScript',
            '.jsx': 'React',
            '.tsx': 'React TypeScript',
            '.java': 'Java',
            '.c': 'C',
            '.cpp': 'C++',
            '.cs': 'C#',
            '.php': 'PHP',
            '.rb': 'Ruby',
            '.go': 'Go',
            '.rs': 'Rust',
            '.swift': 'Swift',
            '.kt': 'Kotlin',
            '.scala': 'Scala',
            '.r': 'R',
            '.m': 'Objective-C',
            '.sh': 'Shell',
            '.sql': 'SQL',
            '.html': 'HTML',
            '.css': 'CSS',
            '.scss': 'SCSS',
            '.less': 'Less',
            '.vue': 'Vue',
            '.md': 'Markdown',
            '.yaml': 'YAML',
            '.yml': 'YAML',
            '.json': 'JSON',
            '.xml': 'XML',
            '.dockerfile': 'Docker',
            '.tf': 'Terraform'
        }
    
    def analyze_directory(self, directory_path: str) -> Dict[str, Any]:
        """Analyze a local directory for code quality and structure"""
        path = Path(directory_path)
        
        if not path.exists():
            raise ValueError(f"Directory does not exist: {directory_path}")
        
        analysis = {
            'path': str(path.absolute()),
            'name': path.name,
            'total_files': 0,
            'total_lines': 0,
            'languages': {},
            'file_types': {},
            'structure_score': 0.0,
            'documentation_score': 0.0,
            'code_quality_indicators': {},
            'potential_issues': [],
            'monetization_assets': []
        }
        
        # Analyze all files
        for file_path in path.rglob('*'):
            if file_path.is_file() and not self._should_ignore_file(file_path):
                analysis['total_files'] += 1
                
                # Count lines
                try:
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = len(f.readlines())
                        analysis['total_lines'] += lines
                except:
                    continue
                
                # Language detection
                ext = file_path.suffix.lower()
                if ext in self.supported_languages:
                    lang = self.supported_languages[ext]
                    analysis['languages'][lang] = analysis['languages'].get(lang, 0) + lines
                
                # File type counting
                analysis['file_types'][ext] = analysis['file_types'].get(ext, 0) + 1
        
        # Calculate scores
        analysis['structure_score'] = self._calculate_structure_score(path)
        analysis['documentation_score'] = self._calculate_documentation_score(path)
        analysis['code_quality_indicators'] = self._analyze_code_quality(path)
        analysis['monetization_assets'] = self._identify_monetization_assets(path)
        
        return analysis
    
    def _should_ignore_file(self, file_path: Path) -> bool:
        """Check if file should be ignored in analysis"""
        ignore_patterns = [
            '.git', '__pycache__', 'node_modules', '.venv', 'venv',
            '.env', '.DS_Store', 'Thumbs.db', '*.pyc', '*.pyo',
            '*.so', '*.dll', '*.exe', '*.zip', '*.tar.gz', '*.rar',
            'build', 'dist', 'target', 'bin', 'obj'
        ]
        
        path_str = str(file_path)
        return any(pattern in path_str for pattern in ignore_patterns)
    
    def _calculate_structure_score(self, path: Path) -> float:
        """Calculate project structure quality score"""
        score = 0.0
        indicators = 0
        
        # Check for important files
        important_files = [
            'README.md', 'readme.md', 'README.rst',
            'LICENSE', 'license.txt', 'LICENSE.md',
            'setup.py', 'pyproject.toml', 'package.json',
            'Cargo.toml', 'pom.xml', 'build.gradle',
            'Dockerfile', 'docker-compose.yml',
            '.gitignore', 'requirements.txt'
        ]
        
        for file_name in important_files:
            if (path / file_name).exists():
                score += 1
                indicators += 1
        
        # Check for organized directory structure
        common_dirs = [
            'src', 'lib', 'tests', 'test', 'docs', 'examples',
            'scripts', 'bin', 'assets', 'static', 'public'
        ]
        
        for dir_name in common_dirs:
            if (path / dir_name).is_dir():
                score += 0.5
                indicators += 1
        
        return min(1.0, score / max(1, indicators)) if indicators > 0 else 0.0
    
    def _calculate_documentation_score(self, path: Path) -> float:
        """Calculate documentation quality score"""
        score = 0.0
        
        # Check for README
        readme_files = list(path.glob('README*')) + list(path.glob('readme*'))
        if readme_files:
            readme_path = readme_files[0]
            try:
                with open(readme_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    # Score based on length and content
                    if len(content) > 500:
                        score += 0.3
                    if 'installation' in content.lower():
                        score += 0.1
                    if 'usage' in content.lower() or 'example' in content.lower():
                        score += 0.1
                    if 'api' in content.lower() or 'documentation' in content.lower():
                        score += 0.1
            except:
                score += 0.1  # At least it exists
        
        # Check for documentation directory
        docs_dirs = ['docs', 'documentation', 'doc']
        for docs_dir in docs_dirs:
            if (path / docs_dir).is_dir():
                score += 0.2
                break
        
        # Check for inline documentation
        python_files = list(path.rglob('*.py'))
        if python_files:
            documented_files = 0
            for py_file in python_files[:20]:  # Sample first 20 files
                try:
                    with open(py_file, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        if '"""' in content or "'''" in content or 'docstring' in content:
                            documented_files += 1
                except:
                    continue
            
            if python_files:
                score += 0.2 * (documented_files / min(20, len(python_files)))
        
        return min(1.0, score)
    
    def _analyze_code_quality(self, path: Path) -> Dict[str, Any]:
        """Analyze code quality indicators"""
        indicators = {
            'has_tests': False,
            'has_ci_config': False,
            'has_linting_config': False,
            'has_type_hints': False,
            'estimated_complexity': 'medium'
        }
        
        # Check for tests
        test_patterns = ['test_*.py', '*_test.py', 'tests/', 'test/', 'spec/']
        for pattern in test_patterns:
            if list(path.glob(pattern)) or list(path.rglob(pattern)):
                indicators['has_tests'] = True
                break
        
        # Check for CI configuration
        ci_files = [
            '.github/workflows/', '.gitlab-ci.yml', '.travis.yml',
            'azure-pipelines.yml', 'jenkinsfile', 'circle.yml'
        ]
        for ci_file in ci_files:
            if (path / ci_file).exists():
                indicators['has_ci_config'] = True
                break
        
        # Check for linting configuration
        lint_files = [
            '.pylintrc', '.flake8', 'pyproject.toml', 'setup.cfg',
            '.eslintrc', '.eslintrc.json', 'tslint.json'
        ]
        for lint_file in lint_files:
            if (path / lint_file).exists():
                indicators['has_linting_config'] = True
                break
        
        # Check for type hints (Python)
        python_files = list(path.rglob('*.py'))
        if python_files:
            type_hinted_files = 0
            for py_file in python_files[:10]:  # Sample first 10 files
                try:
                    with open(py_file, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        if ': ' in content and '->' in content:  # Simple type hint detection
                            type_hinted_files += 1
                except:
                    continue
            
            if type_hinted_files > len(python_files) * 0.3:
                indicators['has_type_hints'] = True
        
        return indicators
    
    def _identify_monetization_assets(self, path: Path) -> List[Dict[str, Any]]:
        """Identify potential monetization assets in the repository"""
        assets = []
        
        # Check for API implementations
        api_patterns = ['api/', 'rest/', 'graphql/', 'endpoints/']
        for pattern in api_patterns:
            if (path / pattern).exists():
                assets.append({
                    'type': 'API',
                    'description': 'REST/GraphQL API implementation',
                    'monetization_potential': 'high',
                    'strategies': ['API licensing', 'SaaS offering', 'Usage-based pricing']
                })
                break
        
        # Check for machine learning models
        ml_indicators = ['model.pkl', 'model.h5', '*.joblib', 'models/', 'ml/', 'ai/']
        for indicator in ml_indicators:
            if list(path.glob(indicator)) or list(path.rglob(indicator)):
                assets.append({
                    'type': 'ML_MODEL',
                    'description': 'Machine Learning models or AI components',
                    'monetization_potential': 'very_high',
                    'strategies': ['Model licensing', 'AI-as-a-Service', 'Consulting services']
                })
                break
        
        # Check for web applications
        web_indicators = ['index.html', 'app.js', 'main.js', 'src/components/']
        for indicator in web_indicators:
            if list(path.glob(indicator)) or list(path.rglob(indicator)):
                assets.append({
                    'type': 'WEB_APP',
                    'description': 'Web application or frontend',
                    'monetization_potential': 'medium',
                    'strategies': ['Freemium model', 'Subscription', 'Premium features']
                })
                break
        
        # Check for libraries/frameworks
        lib_indicators = ['setup.py', 'pyproject.toml', 'package.json', 'Cargo.toml']
        for indicator in lib_indicators:
            if (path / indicator).exists():
                assets.append({
                    'type': 'LIBRARY',
                    'description': 'Software library or framework',
                    'monetization_potential': 'medium',
                    'strategies': ['Commercial licensing', 'Support services', 'Training courses']
                })
                break
        
        # Check for documentation/tutorials
        if (path / 'docs').exists() or len(list(path.glob('*.md'))) > 3:
            assets.append({
                'type': 'DOCUMENTATION',
                'description': 'Comprehensive documentation or tutorials',
                'monetization_potential': 'low',
                'strategies': ['Technical writing services', 'Training materials', 'Book publishing']
            })
        
        return assets

class RepositoryMonetizationAnalyzer:
    """Analyzer for repository monetization potential"""
    
    def __init__(self):
        self.language_market_value = {
            'Python': 0.9,
            'JavaScript': 0.85,
            'TypeScript': 0.9,
            'Java': 0.8,
            'Go': 0.85,
            'Rust': 0.9,
            'C++': 0.75,
            'C#': 0.8,
            'Swift': 0.8,
            'Kotlin': 0.75,
            'PHP': 0.6,
            'Ruby': 0.7,
            'Scala': 0.8,
            'R': 0.8,
            'MATLAB': 0.7
        }
        
        self.topic_market_multipliers = {
            'machine-learning': 2.0,
            'artificial-intelligence': 2.5,
            'blockchain': 1.8,
            'cryptocurrency': 1.7,
            'api': 1.5,
            'framework': 1.4,
            'library': 1.3,
            'automation': 1.6,
            'data-science': 1.8,
            'web-framework': 1.4,
            'mobile': 1.3,
            'cloud': 1.5,
            'devops': 1.4,
            'security': 1.6,
            'fintech': 1.9
        }
    
    def analyze_repository_value(self, repo_data: Dict[str, Any], 
                                local_analysis: Optional[Dict[str, Any]] = None) -> RepositoryAnalysis:
        """Analyze the monetization potential of a repository"""
        
        # Extract basic data
        name = repo_data.get('name', '')
        full_name = repo_data.get('nameWithOwner', '')
        description = repo_data.get('description', '')
        language = repo_data.get('primaryLanguage', {}).get('name', '') if repo_data.get('primaryLanguage') else ''
        stars = repo_data.get('stargazerCount', 0)
        forks = repo_data.get('forkCount', 0)
        size = repo_data.get('diskUsage', 0)
        last_updated = repo_data.get('updatedAt', '')
        topics = [topic.get('topic', {}).get('name', '') for topic in repo_data.get('repositoryTopics', [])]
        license_info = repo_data.get('licenseInfo', {})
        license_name = license_info.get('name') if license_info else None
        
        # Calculate scores
        readme_score = self._calculate_readme_score(repo_data)
        documentation_score = local_analysis.get('documentation_score', 0.0) if local_analysis else 0.0
        code_quality_score = self._calculate_code_quality_score(repo_data, local_analysis)
        
        # Calculate monetization potential
        monetization_potential = self._calculate_monetization_potential(
            stars, forks, language, topics, license_name, local_analysis
        )
        
        # Estimate market value
        market_value = self._estimate_market_value(
            stars, forks, language, topics, size, monetization_potential
        )
        
        # Generate improvement recommendations
        recommendations = self._generate_recommendations(
            repo_data, local_analysis, monetization_potential
        )
        
        return RepositoryAnalysis(
            name=name,
            full_name=full_name,
            description=description,
            language=language,
            stars=stars,
            forks=forks,
            size=size,
            last_updated=last_updated,
            topics=topics,
            license=license_name,
            readme_score=readme_score,
            documentation_score=documentation_score,
            code_quality_score=code_quality_score,
            monetization_potential=monetization_potential,
            market_value_estimate=market_value,
            improvement_recommendations=recommendations,
            local_path=local_analysis.get('path') if local_analysis else None
        )
    
    def _calculate_readme_score(self, repo_data: Dict[str, Any]) -> float:
        """Calculate README quality score"""
        # This would require additional API calls to get README content
        # For now, return a default score
        return 0.5
    
    def _calculate_code_quality_score(self, repo_data: Dict[str, Any], 
                                    local_analysis: Optional[Dict[str, Any]]) -> float:
        """Calculate overall code quality score"""
        if not local_analysis:
            return 0.5  # Default score
        
        quality_indicators = local_analysis.get('code_quality_indicators', {})
        score = 0.0
        
        # Weight different quality factors
        if quality_indicators.get('has_tests'):
            score += 0.3
        if quality_indicators.get('has_ci_config'):
            score += 0.2
        if quality_indicators.get('has_linting_config'):
            score += 0.1
        if quality_indicators.get('has_type_hints'):
            score += 0.2
        
        # Add structure and documentation scores
        score += local_analysis.get('structure_score', 0.0) * 0.1
        score += local_analysis.get('documentation_score', 0.0) * 0.1
        
        return min(1.0, score)
    
    def _calculate_monetization_potential(self, stars: int, forks: int, language: str,
                                        topics: List[str], license_name: Optional[str],
                                        local_analysis: Optional[Dict[str, Any]]) -> float:
        """Calculate monetization potential score"""
        score = 0.0
        
        # Base score from community engagement
        if stars > 1000:
            score += 0.4
        elif stars > 100:
            score += 0.3
        elif stars > 10:
            score += 0.2
        elif stars > 0:
            score += 0.1
        
        if forks > 100:
            score += 0.2
        elif forks > 10:
            score += 0.15
        elif forks > 0:
            score += 0.1
        
        # Language market value
        lang_multiplier = self.language_market_value.get(language, 0.5)
        score *= lang_multiplier
        
        # Topic multipliers
        max_topic_multiplier = 1.0
        for topic in topics:
            multiplier = self.topic_market_multipliers.get(topic, 1.0)
            max_topic_multiplier = max(max_topic_multiplier, multiplier)
        
        score *= max_topic_multiplier
        
        # License considerations
        if license_name:
            if license_name in ['MIT License', 'Apache License 2.0', 'BSD 3-Clause "New" or "Revised" License']:
                score *= 1.1  # Business-friendly licenses
            elif 'GPL' in license_name:
                score *= 0.8  # Copyleft licenses may limit commercial use
        
        # Local analysis bonus
        if local_analysis:
            monetization_assets = local_analysis.get('monetization_assets', [])
            if monetization_assets:
                high_value_assets = [asset for asset in monetization_assets 
                                   if asset.get('monetization_potential') in ['high', 'very_high']]
                score += len(high_value_assets) * 0.1
        
        return min(1.0, score)
    
    def _estimate_market_value(self, stars: int, forks: int, language: str,
                             topics: List[str], size: int, monetization_potential: float) -> float:
        """Estimate potential market value in USD"""
        
        # Base value calculation
        base_value = 0
        
        # Star-based value (diminishing returns)
        if stars > 0:
            base_value += min(10000, stars * 10)  # $10 per star, capped at $10k
        
        # Fork-based value
        base_value += forks * 5  # $5 per fork
        
        # Size-based value (assume $1 per KB of quality code)
        base_value += size * 0.1
        
        # Language multiplier
        lang_multiplier = self.language_market_value.get(language, 0.5)
        base_value *= lang_multiplier
        
        # Topic multipliers
        max_topic_multiplier = 1.0
        for topic in topics:
            multiplier = self.topic_market_multipliers.get(topic, 1.0)
            max_topic_multiplier = max(max_topic_multiplier, multiplier)
        
        base_value *= max_topic_multiplier
        
        # Monetization potential multiplier
        base_value *= (0.5 + monetization_potential)
        
        return base_value
    
    def _generate_recommendations(self, repo_data: Dict[str, Any],
                                local_analysis: Optional[Dict[str, Any]],
                                monetization_potential: float) -> List[str]:
        """Generate improvement recommendations"""
        recommendations = []
        
        stars = repo_data.get('stargazerCount', 0)
        topics = [topic.get('topic', {}).get('name', '') for topic in repo_data.get('repositoryTopics', [])]
        
        # Documentation recommendations
        if not local_analysis or local_analysis.get('documentation_score', 0) < 0.7:
            recommendations.append("Improve documentation - add comprehensive README, API docs, and examples")
        
        # Testing recommendations
        if local_analysis and not local_analysis.get('code_quality_indicators', {}).get('has_tests'):
            recommendations.append("Add unit tests to improve code quality and reliability")
        
        # CI/CD recommendations
        if local_analysis and not local_analysis.get('code_quality_indicators', {}).get('has_ci_config'):
            recommendations.append("Set up continuous integration (GitHub Actions, Travis CI, etc.)")
        
        # Licensing recommendations
        if not repo_data.get('licenseInfo'):
            recommendations.append("Add an open-source license to clarify usage terms")
        
        # Marketing recommendations
        if stars < 50:
            recommendations.append("Improve visibility through better tagging, social media, and community engagement")
        
        # Monetization recommendations
        if monetization_potential > 0.7:
            recommendations.append("Consider creating a commercial version or offering professional support")
            recommendations.append("Explore API-as-a-Service or SaaS opportunities")
        elif monetization_potential > 0.5:
            recommendations.append("Consider offering consulting services or training based on this project")
            recommendations.append("Look into creating premium documentation or tutorials")
        
        # Topic-based recommendations
        high_value_topics = ['machine-learning', 'artificial-intelligence', 'blockchain', 'api']
        if not any(topic in high_value_topics for topic in topics):
            recommendations.append("Consider adding trending technology tags if applicable (AI, ML, API, etc.)")
        
        return recommendations

class GitHubMonetizationEngine:
    """Main engine for GitHub profile and organization monetization analysis"""
    
    def __init__(self):
        self.github_cli = GitHubCLIManager()
        self.local_analyzer = LocalFileSystemAnalyzer()
        self.monetization_analyzer = RepositoryMonetizationAnalyzer()
        self.analysis_cache: Dict[str, Any] = {}
    
    async def analyze_complete_profile(self, include_organizations: bool = True,
                                     analyze_local_files: bool = True,
                                     local_repos_path: str = None) -> GitHubProfile:
        """Analyze complete GitHub profile including organizations"""
        
        if not self.github_cli.authenticate_if_needed():
            raise Exception("GitHub authentication required")
        
        print("?? Starting comprehensive GitHub analysis...")
        
        # Get user info
        user_data = self.github_cli.current_user
        username = user_data['login']
        
        print(f"?? Analyzing profile: {username}")
        
        # Get user repositories
        print("?? Fetching user repositories...")
        user_repos = self.github_cli.get_user_repositories(include_private=True)
        
        all_repos = user_repos.copy()
        organizations = []
        
        # Get organization repositories
        if include_organizations:
            print("?? Fetching organization repositories...")
            organizations = self.github_cli.get_user_organizations()
            
            for org in organizations:
                print(f"  ?? Analyzing organization: {org}")
                org_repos = self.github_cli.get_organization_repositories(org)
                all_repos.extend(org_repos)
        
        print(f"?? Total repositories found: {len(all_repos)}")
        
        # Analyze each repository
        analyzed_repos = []
        total_stars = 0
        total_forks = 0
        
        for i, repo in enumerate(all_repos):
            print(f"?? Analyzing repository {i+1}/{len(all_repos)}: {repo['nameWithOwner']}")
            
            # Local analysis if requested
            local_analysis = None
            if analyze_local_files and local_repos_path:
                local_repo_path = Path(local_repos_path) / repo['name']
                if local_repo_path.exists():
                    try:
                        local_analysis = self.local_analyzer.analyze_directory(str(local_repo_path))
                    except Exception as e:
                        logger.warning(f"Failed to analyze local repository {repo['name']}: {e}")
            
            # Analyze repository
            repo_analysis = self.monetization_analyzer.analyze_repository_value(repo, local_analysis)
            analyzed_repos.append(repo_analysis)
            
            total_stars += repo_analysis.stars
            total_forks += repo_analysis.forks
        
        # Calculate profile value score
        profile_value_score = self._calculate_profile_value_score(analyzed_repos, user_data)
        
        # Generate monetization opportunities
        monetization_opportunities = self._generate_monetization_opportunities(analyzed_repos)
        
        return GitHubProfile(
            username=username,
            name=user_data.get('name', ''),
            bio=user_data.get('bio', ''),
            company=user_data.get('company', ''),
            location=user_data.get('location', ''),
            email=user_data.get('email', ''),
            blog=user_data.get('blog', ''),
            followers=user_data.get('followers', 0),
            following=user_data.get('following', 0),
            public_repos=user_data.get('public_repos', 0),
            total_stars=total_stars,
            total_forks=total_forks,
            repositories=analyzed_repos,
            organizations=organizations,
            profile_value_score=profile_value_score,
            monetization_opportunities=monetization_opportunities
        )
    
    def _calculate_profile_value_score(self, repositories: List[RepositoryAnalysis], 
                                     user_data: Dict[str, Any]) -> float:
        """Calculate overall profile value score"""
        if not repositories:
            return 0.0
        
        # Repository quality scores
        avg_monetization = np.mean([repo.monetization_potential for repo in repositories])
        avg_quality = np.mean([repo.code_quality_score for repo in repositories])
        
        # Portfolio diversity
        languages = set(repo.language for repo in repositories if repo.language)
        diversity_score = min(1.0, len(languages) / 5)  # Normalize to 5 languages
        
        # Community engagement
        total_stars = sum(repo.stars for repo in repositories)
        engagement_score = min(1.0, total_stars / 1000)  # Normalize to 1000 stars
        
        # Profile completeness
        profile_fields = ['name', 'bio', 'company', 'location', 'email', 'blog']
        completed_fields = sum(1 for field in profile_fields if user_data.get(field))
        completeness_score = completed_fields / len(profile_fields)
        
        # Weighted combination
        value_score = (
            avg_monetization * 0.3 +
            avg_quality * 0.25 +
            diversity_score * 0.15 +
            engagement_score * 0.2 +
            completeness_score * 0.1
        )
        
        return value_score
    
    def _generate_monetization_opportunities(self, repositories: List[RepositoryAnalysis]) -> List[Dict[str, Any]]:
        """Generate monetization opportunities based on repository analysis"""
        opportunities = []
        
        # High-value repositories
        high_value_repos = [repo for repo in repositories if repo.monetization_potential > 0.7]
        if high_value_repos:
            opportunities.append({
                'type': 'Premium Support Services',
                'description': f'Offer commercial support for {len(high_value_repos)} high-value repositories',
                'potential_revenue': 'High',
                'repositories': [repo.full_name for repo in high_value_repos],
                'implementation': [
                    'Create enterprise support packages',
                    'Offer SLA-backed maintenance contracts',
                    'Provide priority bug fixes and feature requests'
                ]
            })
        
        # API repositories
        api_repos = [repo for repo in repositories if 'api' in ' '.join(repo.topics).lower()]
        if api_repos:
            opportunities.append({
                'type': 'API-as-a-Service',
                'description': f'Convert {len(api_repos)} API projects into managed services',
                'potential_revenue': 'Very High',
                'repositories': [repo.full_name for repo in api_repos],
                'implementation': [
                    'Deploy APIs with rate limiting and authentication',
                    'Create tiered pricing based on usage',
                    'Provide dashboard and analytics'
                ]
            })
        
        # Machine Learning repositories
        ml_repos = [repo for repo in repositories 
                   if any(topic in ['machine-learning', 'artificial-intelligence', 'deep-learning'] 
                         for topic in repo.topics)]
        if ml_repos:
            opportunities.append({
                'type': 'AI/ML Consulting',
                'description': f'Leverage {len(ml_repos)} ML projects for consulting services',
                'potential_revenue': 'Very High',
                'repositories': [repo.full_name for repo in ml_repos],
                'implementation': [
                    'Offer custom model development',
                    'Provide ML strategy consulting',
                    'Create training workshops and courses'
                ]
            })
        
        # Popular repositories
        popular_repos = [repo for repo in repositories if repo.stars > 100]
        if popular_repos:
            opportunities.append({
                'type': 'Educational Content',
                'description': f'Create courses and tutorials based on {len(popular_repos)} popular projects',
                'potential_revenue': 'Medium',
                'repositories': [repo.full_name for repo in popular_repos],
                'implementation': [
                    'Develop video course series',
                    'Write technical books or eBooks',
                    'Offer live coding workshops'
                ]
            })
        
        # Framework/Library repositories
        lib_repos = [repo for repo in repositories 
                    if any(topic in ['library', 'framework', 'tool'] for topic in repo.topics)]
        if lib_repos:
            opportunities.append({
                'type': 'Commercial Licensing',
                'description': f'Offer commercial licenses for {len(lib_repos)} libraries/frameworks',
                'potential_revenue': 'Medium',
                'repositories': [repo.full_name for repo in lib_repos],
                'implementation': [
                    'Create dual licensing model (open source + commercial)',
                    'Offer OEM licensing for enterprise integration',
                    'Provide white-label solutions'
                ]
            })
        
        # Overall portfolio
        total_value = sum(repo.market_value_estimate for repo in repositories)
        if total_value > 50000:
            opportunities.append({
                'type': 'Portfolio Acquisition',
                'description': f'Entire portfolio has estimated value of ${total_value:,.0f}',
                'potential_revenue': 'Very High',
                'repositories': 'All repositories',
                'implementation': [
                    'Package repositories for enterprise acquisition',
                    'Negotiate licensing deals with large companies',
                    'Consider IPO or acquisition opportunities'
                ]
            })
        
        return opportunities
    
    def generate_monetization_report(self, profile: GitHubProfile) -> str:
        """Generate comprehensive monetization report"""
        
        report = f"""
# ?? GitHub Monetization Analysis Report
## Profile: {profile.username}

### ?? Executive Summary
- **Total Repositories**: {len(profile.repositories)}
- **Total Stars**: {profile.total_stars:,}
- **Total Forks**: {profile.total_forks:,}
- **Profile Value Score**: {profile.profile_value_score:.2%}
- **Estimated Portfolio Value**: ${sum(repo.market_value_estimate for repo in profile.repositories):,.0f}

### ?? Top Performing Repositories
"""
        
        # Sort repositories by market value
        top_repos = sorted(profile.repositories, 
                          key=lambda r: r.market_value_estimate, reverse=True)[:10]
        
        for i, repo in enumerate(top_repos, 1):
            report += f"""
**{i}. {repo.full_name}**
- Stars: {repo.stars:,} | Forks: {repo.forks:,}
- Language: {repo.language}
- Monetization Potential: {repo.monetization_potential:.1%}
- Estimated Value: ${repo.market_value_estimate:,.0f}
- Key Recommendations: {', '.join(repo.improvement_recommendations[:3])}
"""
        
        report += f"""
### ?? Monetization Opportunities

"""
        
        for opportunity in profile.monetization_opportunities:
            report += f"""
**{opportunity['type']}**
- Description: {opportunity['description']}
- Revenue Potential: {opportunity['potential_revenue']}
- Implementation Steps:
"""
            for step in opportunity['implementation'][:3]:
                report += f"  - {step}\n"
            report += "\n"
        
        # Language distribution
        language_stats = Counter(repo.language for repo in profile.repositories if repo.language)
        
        report += f"""
### ?? Portfolio Analysis

**Language Distribution:**
"""
        for lang, count in language_stats.most_common(10):
            percentage = count / len(profile.repositories) * 100
            report += f"- {lang}: {count} repositories ({percentage:.1f}%)\n"
        
        # Quality metrics
        avg_quality = np.mean([repo.code_quality_score for repo in profile.repositories])
        avg_docs = np.mean([repo.documentation_score for repo in profile.repositories])
        
        report += f"""
**Quality Metrics:**
- Average Code Quality: {avg_quality:.1%}
- Average Documentation: {avg_docs:.1%}
- High-Value Repositories: {len([r for r in profile.repositories if r.monetization_potential > 0.7])}

### ?? Next Steps
1. Focus on the top 10 repositories for immediate monetization
2. Improve documentation across all repositories
3. Implement the highest-potential monetization strategies
4. Consider creating a business entity for professional services
5. Build a personal brand around your technical expertise

---
*Report generated by AutomationCodex GitHub Monetization Engine*
"""
        
        return report
    
    async def clone_and_analyze_all_repos(self, profile: GitHubProfile, 
                                        base_directory: str) -> GitHubProfile:
        """Clone all repositories and perform local analysis"""
        
        base_path = Path(base_directory)
        base_path.mkdir(exist_ok=True)
        
        print(f"?? Cloning {len(profile.repositories)} repositories to {base_directory}")
        
        updated_repos = []
        
        for i, repo in enumerate(profile.repositories):
            print(f"?? Cloning {i+1}/{len(profile.repositories)}: {repo.full_name}")
            
            local_path = base_path / repo.name
            
            # Clone if not exists
            if not local_path.exists():
                success = self.github_cli.clone_repository(repo.full_name, str(local_path))
                if not success:
                    updated_repos.append(repo)
                    continue
            
            # Perform local analysis
            try:
                local_analysis = self.local_analyzer.analyze_directory(str(local_path))
                
                # Recreate repository analysis with local data
                repo_data = {
                    'name': repo.name,
                    'nameWithOwner': repo.full_name,
                    'description': repo.description,
                    'primaryLanguage': {'name': repo.language} if repo.language else None,
                    'stargazerCount': repo.stars,
                    'forkCount': repo.forks,
                    'diskUsage': repo.size,
                    'updatedAt': repo.last_updated,
                    'repositoryTopics': [{'topic': {'name': topic}} for topic in repo.topics],
                    'licenseInfo': {'name': repo.license} if repo.license else None
                }
                
                updated_repo = self.monetization_analyzer.analyze_repository_value(
                    repo_data, local_analysis
                )
                updated_repo.local_path = str(local_path)
                
                updated_repos.append(updated_repo)
                
            except Exception as e:
                logger.error(f"Failed to analyze local repository {repo.name}: {e}")
                updated_repos.append(repo)
        
        # Update profile with new repository data
        profile.repositories = updated_repos
        
        # Recalculate profile metrics
        profile.profile_value_score = self._calculate_profile_value_score(
            updated_repos, {'name': profile.name, 'bio': profile.bio}
        )
        profile.monetization_opportunities = self._generate_monetization_opportunities(updated_repos)
        
        return profile

# Factory function
def create_github_monetization_engine() -> GitHubMonetizationEngine:
    """Create GitHub monetization engine"""
    return GitHubMonetizationEngine()

if __name__ == "__main__":
    async def main():
        engine = create_github_monetization_engine()
        
        try:
            # Analyze complete profile
            profile = await engine.analyze_complete_profile(
                include_organizations=True,
                analyze_local_files=False  # Set to True if you have local repos
            )
            
            # Generate report
            report = engine.generate_monetization_report(profile)
            
            # Save report
            report_path = Path("github_monetization_report.md")
            with open(report_path, 'w', encoding='utf-8') as f:
                f.write(report)
            
            print(f"?? Analysis complete! Report saved to: {report_path}")
            print(f"?? Estimated portfolio value: ${sum(repo.market_value_estimate for repo in profile.repositories):,.0f}")
            
        except Exception as e:
            print(f"? Analysis failed: {e}")
    
    asyncio.run(main())