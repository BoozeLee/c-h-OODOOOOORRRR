"""
Superlative Automation & Data Scraping Research Codex
Core Framework Setup and Configuration
"""

import os
import sys
from pathlib import Path
import json
import logging
from datetime import datetime
from typing import Dict, List, Any, Optional
import numpy as np
import pandas as pd

# Add project root to Python path
PROJECT_ROOT = Path(__file__).parent
sys.path.insert(0, str(PROJECT_ROOT))

class CodexConfig:
    """Central configuration management for the research framework"""
    
    def __init__(self):
        self.project_root = PROJECT_ROOT
        self.data_dir = self.project_root / "data"
        self.logs_dir = self.project_root / "logs" 
        self.models_dir = self.project_root / "models"
        self.exports_dir = self.project_root / "exports"
        self.templates_dir = self.project_root / "templates"
        
        # Ensure directories exist
        for dir_path in [self.data_dir, self.logs_dir, self.models_dir, 
                        self.exports_dir, self.templates_dir]:
            dir_path.mkdir(exist_ok=True)
        
        # Setup logging
        self._setup_logging()
        
        # Framework configuration
        self.config = {
            "version": "1.0.0",
            "framework_name": "AutomationCodex",
            "mathematical_models": {
                "graph_theory": True,
                "automata_theory": True, 
                "information_theory": True,
                "reinforcement_learning": True,
                "game_theory": True,
                "evolutionary_algorithms": True
            },
            "scraper_engines": {
                "selenium": True,
                "requests": True,
                "scrapy": True,
                "playwright": True
            },
            "ai_capabilities": {
                "template_inference": True,
                "self_healing": True,
                "adaptive_learning": True,
                "quality_validation": True
            }
        }
    
    def _setup_logging(self):
        """Setup comprehensive logging system"""
        log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        
        # Create formatters
        formatter = logging.Formatter(log_format)
        
        # Setup file handler
        log_file = self.logs_dir / f"codex_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"
        file_handler = logging.FileHandler(log_file)
        file_handler.setFormatter(formatter)
        file_handler.setLevel(logging.DEBUG)
        
        # Setup console handler
        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setFormatter(formatter)
        console_handler.setLevel(logging.INFO)
        
        # Configure root logger
        logging.getLogger().setLevel(logging.DEBUG)
        logging.getLogger().addHandler(file_handler)
        logging.getLogger().addHandler(console_handler)
        
        self.logger = logging.getLogger(__name__)
        self.logger.info("AutomationCodex framework initialized")
    
    def save_config(self) -> str:
        """Save current configuration to file"""
        config_file = self.project_root / "config.json"
        with open(config_file, 'w') as f:
            json.dump(self.config, f, indent=2)
        return str(config_file)
    
    def load_config(self, config_path: Optional[str] = None) -> Dict:
        """Load configuration from file"""
        if config_path is None:
            config_path = self.project_root / "config.json"
        
        if Path(config_path).exists():
            with open(config_path, 'r') as f:
                self.config = json.load(f)
        return self.config
    
    def get_lab_environment(self) -> Dict[str, Any]:
        """Get complete lab environment setup"""
        return {
            "paths": {
                "root": str(self.project_root),
                "data": str(self.data_dir),
                "logs": str(self.logs_dir),
                "models": str(self.models_dir),
                "exports": str(self.exports_dir),
                "templates": str(self.templates_dir)
            },
            "config": self.config,
            "python_path": sys.path,
            "environment_vars": dict(os.environ),
            "timestamp": datetime.now().isoformat()
        }

# Global configuration instance
codex_config = CodexConfig()

def initialize_codex() -> CodexConfig:
    """Initialize the AutomationCodex framework"""
    logger = logging.getLogger(__name__)
    logger.info("?? Initializing Superlative Automation & Data Scraping Research Codex")
    
    # Save initial configuration
    config_path = codex_config.save_config()
    logger.info(f"?? Configuration saved to: {config_path}")
    
    # Create initial directory structure
    directories = [
        "core/mathematical_models",
        "core/engines", 
        "agents/orchestrators",
        "agents/coordinators",
        "scrapers/pipelines",
        "scrapers/strategies",
        "analytics/validation",
        "analytics/quality_metrics",
        "templates/generators",
        "templates/inference",
        "labs/experiments",
        "labs/notebooks",
        "codex/documentation",
        "codex/recipes",
        "validation/tests",
        "validation/benchmarks",
        "exports/production_ready"
    ]
    
    for directory in directories:
        dir_path = codex_config.project_root / directory
        dir_path.mkdir(parents=True, exist_ok=True)
        
        # Create __init__.py files for Python packages
        if not (dir_path / "__init__.py").exists():
            (dir_path / "__init__.py").write_text("# AutomationCodex module\n")
    
    logger.info("? Framework structure created successfully")
    logger.info(f"?? Project root: {codex_config.project_root}")
    
    return codex_config

if __name__ == "__main__":
    config = initialize_codex()
    print("?? AutomationCodex framework ready for research!")
    print(f"?? Working directory: {config.project_root}")