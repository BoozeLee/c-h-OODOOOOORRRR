"""
Mathematical Models Core Module
Advanced mathematical foundations for scraper orchestration and optimization

This module implements state-of-the-art mathematical models including:
- Graph Theory for network analysis and traversal optimization
- Automata Theory for state-based scraper behavior
- Information Theory for entropy-based content classification
- Markov Decision Processes for self-healing pipelines
"""

import numpy as np
import networkx as nx
from typing import Dict, List, Tuple, Any, Optional, Set
from dataclasses import dataclass
from enum import Enum
import logging
from abc import ABC, abstractmethod
import json
import pickle
from collections import defaultdict, deque
import random
import math

logger = logging.getLogger(__name__)

class ScraperState(Enum):
    """Automata states for scraper behavior"""
    IDLE = "idle"
    CONNECTING = "connecting" 
    AUTHENTICATED = "authenticated"
    SCRAPING = "scraping"
    PROCESSING = "processing"
    ERROR = "error"
    RECOVERY = "recovery"
    COMPLETED = "completed"

@dataclass
class GraphNode:
    """Represents a node in the scraping dependency graph"""
    id: str
    url: str
    content_type: str
    priority: float
    dependencies: Set[str]
    metadata: Dict[str, Any]
    
class ScrapingGraph:
    """Graph theory implementation for scraping optimization"""
    
    def __init__(self):
        self.graph = nx.DiGraph()
        self.nodes: Dict[str, GraphNode] = {}
        self.traversal_strategies = {
            'dfs': self._dfs_traversal,
            'bfs': self._bfs_traversal, 
            'priority': self._priority_traversal,
            'dependency': self._dependency_traversal
        }
    
    def add_node(self, node: GraphNode) -> None:
        """Add node to scraping graph"""
        self.nodes[node.id] = node
        self.graph.add_node(node.id, **node.metadata)
        logger.debug(f"Added node {node.id} to scraping graph")
    
    def add_dependency(self, source_id: str, target_id: str, weight: float = 1.0) -> None:
        """Add dependency edge between nodes"""
        self.graph.add_edge(source_id, target_id, weight=weight)
        if source_id in self.nodes:
            self.nodes[source_id].dependencies.add(target_id)
    
    def optimize_traversal_order(self, strategy: str = 'dependency') -> List[str]:
        """Optimize node traversal order using graph algorithms"""
        if strategy not in self.traversal_strategies:
            raise ValueError(f"Unknown strategy: {strategy}")
        
        return self.traversal_strategies[strategy]()
    
    def _dependency_traversal(self) -> List[str]:
        """Topological sort for dependency-aware traversal"""
        try:
            return list(nx.topological_sort(self.graph))
        except nx.NetworkXError:
            logger.warning("Circular dependencies detected, falling back to DFS")
            return self._dfs_traversal()
    
    def _priority_traversal(self) -> List[str]:
        """Priority-based traversal using node priorities"""
        return sorted(self.nodes.keys(), 
                     key=lambda x: self.nodes[x].priority, 
                     reverse=True)
    
    def _dfs_traversal(self) -> List[str]:
        """Depth-first search traversal"""
        if not self.graph.nodes():
            return []
        start_node = next(iter(self.graph.nodes()))
        return list(nx.dfs_preorder_nodes(self.graph, start_node))
    
    def _bfs_traversal(self) -> List[str]:
        """Breadth-first search traversal"""
        if not self.graph.nodes():
            return []
        start_node = next(iter(self.graph.nodes()))
        return list(nx.bfs_tree(self.graph, start_node))
    
    def detect_bottlenecks(self) -> List[str]:
        """Identify bottleneck nodes using centrality measures"""
        betweenness = nx.betweenness_centrality(self.graph)
        threshold = np.percentile(list(betweenness.values()), 80)
        return [node for node, centrality in betweenness.items() 
                if centrality > threshold]
    
    def export_visualization(self, filepath: str) -> None:
        """Export graph visualization data"""
        graph_data = {
            'nodes': [{'id': node_id, **self.nodes[node_id].__dict__} 
                     for node_id in self.graph.nodes()],
            'edges': [{'source': u, 'target': v, **data} 
                     for u, v, data in self.graph.edges(data=True)]
        }
        with open(filepath, 'w') as f:
            json.dump(graph_data, f, indent=2, default=str)

class ScraperAutomaton:
    """Finite state automaton for scraper behavior modeling"""
    
    def __init__(self):
        self.current_state = ScraperState.IDLE
        self.state_transitions = self._build_transition_table()
        self.state_history: List[ScraperState] = [ScraperState.IDLE]
        self.transition_counts = defaultdict(int)
    
    def _build_transition_table(self) -> Dict[ScraperState, Set[ScraperState]]:
        """Build valid state transition table"""
        return {
            ScraperState.IDLE: {ScraperState.CONNECTING},
            ScraperState.CONNECTING: {ScraperState.AUTHENTICATED, ScraperState.ERROR},
            ScraperState.AUTHENTICATED: {ScraperState.SCRAPING, ScraperState.ERROR},
            ScraperState.SCRAPING: {ScraperState.PROCESSING, ScraperState.ERROR, ScraperState.COMPLETED},
            ScraperState.PROCESSING: {ScraperState.SCRAPING, ScraperState.COMPLETED, ScraperState.ERROR},
            ScraperState.ERROR: {ScraperState.RECOVERY, ScraperState.IDLE},
            ScraperState.RECOVERY: {ScraperState.CONNECTING, ScraperState.IDLE},
            ScraperState.COMPLETED: {ScraperState.IDLE}
        }
    
    def transition_to(self, new_state: ScraperState) -> bool:
        """Attempt state transition with validation"""
        if new_state not in self.state_transitions[self.current_state]:
            logger.error(f"Invalid transition from {self.current_state} to {new_state}")
            return False
        
        old_state = self.current_state
        self.current_state = new_state
        self.state_history.append(new_state)
        self.transition_counts[(old_state, new_state)] += 1
        
        logger.debug(f"State transition: {old_state} -> {new_state}")
        return True
    
    def get_valid_transitions(self) -> Set[ScraperState]:
        """Get all valid transitions from current state"""
        return self.state_transitions[self.current_state]
    
    def analyze_transition_patterns(self) -> Dict[str, Any]:
        """Analyze state transition patterns for optimization"""
        total_transitions = sum(self.transition_counts.values())
        if total_transitions == 0:
            return {}
        
        patterns = {}
        for (from_state, to_state), count in self.transition_counts.items():
            probability = count / total_transitions
            patterns[f"{from_state.value}->{to_state.value}"] = {
                'count': count,
                'probability': probability
            }
        
        # Identify problematic patterns
        error_rate = sum(count for (_, to_state), count in self.transition_counts.items() 
                        if to_state == ScraperState.ERROR) / total_transitions
        
        patterns['analysis'] = {
            'total_transitions': total_transitions,
            'error_rate': error_rate,
            'most_common_path': max(patterns.keys(), key=lambda x: patterns[x]['count']) if patterns else None
        }
        
        return patterns

class InformationTheoryAnalyzer:
    """Information theory tools for content classification and entropy analysis"""
    
    @staticmethod
    def calculate_entropy(content: str) -> float:
        """Calculate Shannon entropy of content"""
        if not content:
            return 0.0
        
        # Character frequency analysis
        char_counts = defaultdict(int)
        for char in content:
            char_counts[char] += 1
        
        total_chars = len(content)
        entropy = 0.0
        
        for count in char_counts.values():
            probability = count / total_chars
            entropy -= probability * math.log2(probability)
        
        return entropy
    
    @staticmethod
    def mutual_information(content1: str, content2: str) -> float:
        """Calculate mutual information between two content pieces"""
        # Simplified implementation using character bigrams
        def get_bigram_distribution(text):
            bigrams = defaultdict(int)
            for i in range(len(text) - 1):
                bigrams[text[i:i+2]] += 1
            total = sum(bigrams.values())
            return {k: v/total for k, v in bigrams.items()} if total > 0 else {}
        
        dist1 = get_bigram_distribution(content1)
        dist2 = get_bigram_distribution(content2)
        
        if not dist1 or not dist2:
            return 0.0
        
        # Calculate mutual information
        mi = 0.0
        all_bigrams = set(dist1.keys()) | set(dist2.keys())
        
        for bigram in all_bigrams:
            p1 = dist1.get(bigram, 0)
            p2 = dist2.get(bigram, 0)
            joint_prob = (p1 + p2) / 2  # Simplified joint probability
            
            if joint_prob > 0 and p1 > 0 and p2 > 0:
                mi += joint_prob * math.log2(joint_prob / (p1 * p2))
        
        return max(0, mi)
    
    @staticmethod
    def content_complexity_score(content: str) -> Dict[str, float]:
        """Calculate comprehensive content complexity metrics"""
        if not content:
            return {'entropy': 0, 'compression_ratio': 0, 'lexical_diversity': 0}
        
        # Shannon entropy
        entropy = InformationTheoryAnalyzer.calculate_entropy(content)
        
        # Compression ratio (using simple run-length encoding approximation)
        compressed_length = len(''.join(set(content)))
        compression_ratio = compressed_length / len(content)
        
        # Lexical diversity (unique words / total words)
        words = content.lower().split()
        lexical_diversity = len(set(words)) / len(words) if words else 0
        
        return {
            'entropy': entropy,
            'compression_ratio': compression_ratio,
            'lexical_diversity': lexical_diversity,
            'complexity_score': entropy * lexical_diversity / compression_ratio if compression_ratio > 0 else 0
        }

class MarkovDecisionProcess:
    """MDP for self-healing scraping pipeline decisions"""
    
    def __init__(self, states: List[str], actions: List[str]):
        self.states = states
        self.actions = actions
        self.q_table = np.zeros((len(states), len(actions)))
        self.transition_probs = np.ones((len(states), len(actions), len(states))) / len(states)
        self.rewards = np.zeros((len(states), len(actions)))
        self.state_to_index = {state: i for i, state in enumerate(states)}
        self.action_to_index = {action: i for i, action in enumerate(actions)}
        self.learning_rate = 0.1
        self.discount_factor = 0.9
        self.epsilon = 0.1
    
    def get_state_index(self, state: str) -> int:
        """Get index for state"""
        return self.state_to_index.get(state, 0)
    
    def get_action_index(self, action: str) -> int:
        """Get index for action"""
        return self.action_to_index.get(action, 0)
    
    def update_q_value(self, state: str, action: str, reward: float, next_state: str) -> None:
        """Update Q-value using Q-learning"""
        s_idx = self.get_state_index(state)
        a_idx = self.get_action_index(action)
        ns_idx = self.get_state_index(next_state)
        
        # Q-learning update rule
        current_q = self.q_table[s_idx, a_idx]
        max_next_q = np.max(self.q_table[ns_idx, :])
        new_q = current_q + self.learning_rate * (reward + self.discount_factor * max_next_q - current_q)
        
        self.q_table[s_idx, a_idx] = new_q
    
    def select_action(self, state: str) -> str:
        """Select action using epsilon-greedy policy"""
        s_idx = self.get_state_index(state)
        
        if random.random() < self.epsilon:
            # Exploration: random action
            return random.choice(self.actions)
        else:
            # Exploitation: best known action
            best_action_idx = np.argmax(self.q_table[s_idx, :])
            return self.actions[best_action_idx]
    
    def get_policy(self) -> Dict[str, str]:
        """Get current optimal policy"""
        policy = {}
        for state in self.states:
            s_idx = self.get_state_index(state)
            best_action_idx = np.argmax(self.q_table[s_idx, :])
            policy[state] = self.actions[best_action_idx]
        return policy
    
    def save_model(self, filepath: str) -> None:
        """Save MDP model to file"""
        model_data = {
            'states': self.states,
            'actions': self.actions,
            'q_table': self.q_table.tolist(),
            'transition_probs': self.transition_probs.tolist(),
            'rewards': self.rewards.tolist(),
            'hyperparameters': {
                'learning_rate': self.learning_rate,
                'discount_factor': self.discount_factor,
                'epsilon': self.epsilon
            }
        }
        with open(filepath, 'w') as f:
            json.dump(model_data, f, indent=2)

class MathematicalModelsOrchestrator:
    """Main orchestrator for all mathematical models"""
    
    def __init__(self):
        self.graph = ScrapingGraph()
        self.automaton = ScraperAutomaton()
        self.info_analyzer = InformationTheoryAnalyzer()
        self.mdp = None  # Initialize when states/actions are defined
        self.models_registry = {}
    
    def register_model(self, name: str, model: Any) -> None:
        """Register a mathematical model"""
        self.models_registry[name] = model
        logger.info(f"Registered mathematical model: {name}")
    
    def analyze_scraping_scenario(self, scenario_data: Dict[str, Any]) -> Dict[str, Any]:
        """Comprehensive analysis using all mathematical models"""
        results = {
            'graph_analysis': {},
            'automaton_analysis': {},
            'information_analysis': {},
            'mdp_analysis': {},
            'recommendations': []
        }
        
        # Graph theory analysis
        if 'urls' in scenario_data:
            for url_data in scenario_data['urls']:
                node = GraphNode(
                    id=url_data['id'],
                    url=url_data['url'],
                    content_type=url_data.get('type', 'unknown'),
                    priority=url_data.get('priority', 1.0),
                    dependencies=set(url_data.get('dependencies', [])),
                    metadata=url_data.get('metadata', {})
                )
                self.graph.add_node(node)
            
            results['graph_analysis'] = {
                'optimal_order': self.graph.optimize_traversal_order(),
                'bottlenecks': self.graph.detect_bottlenecks()
            }
        
        # Information theory analysis
        if 'content_samples' in scenario_data:
            content_metrics = []
            for content in scenario_data['content_samples']:
                metrics = self.info_analyzer.content_complexity_score(content)
                content_metrics.append(metrics)
            
            results['information_analysis'] = {
                'avg_entropy': np.mean([m['entropy'] for m in content_metrics]),
                'avg_complexity': np.mean([m['complexity_score'] for m in content_metrics]),
                'content_metrics': content_metrics
            }
        
        # Generate recommendations
        results['recommendations'] = self._generate_recommendations(results)
        
        return results
    
    def _generate_recommendations(self, analysis_results: Dict[str, Any]) -> List[str]:
        """Generate actionable recommendations based on analysis"""
        recommendations = []
        
        # Graph-based recommendations
        if analysis_results['graph_analysis'].get('bottlenecks'):
            recommendations.append("Implement parallel processing for bottleneck nodes")
        
        # Information theory recommendations
        info_analysis = analysis_results.get('information_analysis', {})
        if info_analysis.get('avg_entropy', 0) > 7.0:
            recommendations.append("High content entropy detected - implement content filtering")
        
        if info_analysis.get('avg_complexity', 0) > 0.8:
            recommendations.append("Complex content structure - use advanced parsing strategies")
        
        return recommendations
    
    def export_models(self, export_dir: str) -> Dict[str, str]:
        """Export all mathematical models"""
        export_paths = {}
        
        # Export graph
        graph_path = f"{export_dir}/scraping_graph.json"
        self.graph.export_visualization(graph_path)
        export_paths['graph'] = graph_path
        
        # Export automaton state analysis
        automaton_path = f"{export_dir}/automaton_analysis.json"
        with open(automaton_path, 'w') as f:
            json.dump(self.automaton.analyze_transition_patterns(), f, indent=2)
        export_paths['automaton'] = automaton_path
        
        # Export MDP if available
        if self.mdp:
            mdp_path = f"{export_dir}/mdp_model.json"
            self.mdp.save_model(mdp_path)
            export_paths['mdp'] = mdp_path
        
        return export_paths

# Factory function for quick model creation
def create_mathematical_models_suite() -> MathematicalModelsOrchestrator:
    """Create a complete mathematical models suite"""
    orchestrator = MathematicalModelsOrchestrator()
    
    # Initialize MDP with common scraping states and actions
    states = ['idle', 'connecting', 'scraping', 'error', 'success']
    actions = ['continue', 'retry', 'skip', 'escalate', 'terminate']
    orchestrator.mdp = MarkovDecisionProcess(states, actions)
    
    logger.info("Mathematical models suite created successfully")
    return orchestrator

if __name__ == "__main__":
    # Example usage
    models = create_mathematical_models_suite()
    
    # Example scenario
    scenario = {
        'urls': [
            {'id': 'page1', 'url': 'https://example.com/1', 'priority': 1.0},
            {'id': 'page2', 'url': 'https://example.com/2', 'priority': 0.8, 'dependencies': ['page1']}
        ],
        'content_samples': [
            "Lorem ipsum dolor sit amet consectetur adipiscing elit",
            "Complex technical documentation with specialized terminology"
        ]
    }
    
    results = models.analyze_scraping_scenario(scenario)
    print("Analysis complete:", results)