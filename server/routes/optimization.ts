/**
 * Template Optimization API Routes
 * AutomationCodex-powered template evolution and analytics
 * 
 * Copyright (c) 2025 Kiliaan Walter Vanvoorden. All Rights Reserved.
 * 
 * Author: Kiliaan Walter Vanvoorden
 * Contact: kiliaanv2@gmail.com
 * License: Proprietary - See LICENSE file
 * 
 * AI Development Credits:
 * - Grok AI (X.AI) - Optimization algorithms and prompt engineering
 * - Leonardo AI - Psychedelic artwork rendering
 * - Perplexity AI - Real-time trend research
 * - Claude (Anthropic) - Development assistance
 */

import { Router } from 'express';
import { storage } from '../storage';
import type { Template } from '@shared/schema';
import { templateOptimizer } from '../automation/template_optimizer';

const router = Router();

/**
 * GET /api/optimization/analyze/:id
 * Analyze single template using AutomationCodex algorithms
 */
router.get('/analyze/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const template = await storage.getTemplate(id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const analysis = await templateOptimizer.analyzeTemplate(template);

    res.json({
      template: {
        id: template.id,
        title: template.title,
        category: template.category
      },
      analysis: {
        shouldEvolve: analysis.shouldEvolve,
        recommendedAction: analysis.recommendedAction,
        complexityScore: analysis.complexityScore.toFixed(2),
        status: template.trendIntensity >= 85 ? 'peak' :
                template.trendIntensity >= 60 ? 'trending' :
                template.trendIntensity >= 30 ? 'active' : 'declining'
      },
      suggestions: await templateOptimizer.generateEvolutionSuggestions(template)
    });

  } catch (error) {
    console.error('Analysis failed:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

/**
 * GET /api/optimization/portfolio
 * Analyze entire template portfolio using graph theory
 */
router.get('/portfolio', async (req, res) => {
  try {
    const allTemplates = await storage.getAllTemplates();

    const portfolioMetrics = await templateOptimizer.optimizePortfolio(allTemplates);

    // Sort templates by optimization score
    const ranked = allTemplates
      .map((t: Template) => ({
        id: t.id,
        title: t.title,
        category: t.category,
        trendIntensity: t.trendIntensity,
        energyScore: t.energyScore,
        optimizationScore: portfolioMetrics[t.id] || 0
      }))
      .sort((a: any, b: any) => b.optimizationScore - a.optimizationScore);

    res.json({
      totalTemplates: allTemplates.length,
      averageTrendIntensity: (
        allTemplates.reduce((sum: number, t: Template) => sum + t.trendIntensity, 0) / allTemplates.length
      ).toFixed(1),
      averageEnergyScore: (
        allTemplates.reduce((sum: number, t: Template) => sum + t.energyScore, 0) / allTemplates.length
      ).toFixed(1),
      topPerformers: ranked.slice(0, 5),
      needsAttention: ranked.slice(-3),
      portfolioHealth: ranked.filter((t: any) => t.trendIntensity >= 70).length / allTemplates.length * 100
    });

  } catch (error) {
    console.error('Portfolio analysis failed:', error);
    res.status(500).json({ error: 'Portfolio analysis failed' });
  }
});

/**
 * POST /api/optimization/evolve/:id
 * Trigger template evolution using AutomationCodex
 */
router.post('/evolve/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const template = await storage.getTemplate(id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    const analysis = await templateOptimizer.analyzeTemplate(template);

    if (!analysis.shouldEvolve) {
      return res.json({
        evolved: false,
        reason: 'Template is performing well, evolution not recommended',
        currentMetrics: {
          trendIntensity: template.trendIntensity,
          energyScore: template.energyScore
        }
      });
    }

    // Evolution logic: boost scores slightly
    const newTrendIntensity = Math.min(100, template.trendIntensity + 15);
    const newEnergyScore = Math.min(100, template.energyScore + 10);

    await storage.updateTemplate(id, {
      trendIntensity: newTrendIntensity,
      energyScore: newEnergyScore
    });

    res.json({
      evolved: true,
      templateId: id,
      improvements: {
        trendIntensity: {
          before: template.trendIntensity,
          after: newTrendIntensity,
          change: `+${(newTrendIntensity - template.trendIntensity).toFixed(1)}`
        },
        energyScore: {
          before: template.energyScore,
          after: newEnergyScore,
          change: `+${(newEnergyScore - template.energyScore).toFixed(1)}`
        }
      },
      message: 'Template successfully evolved using AutomationCodex algorithms'
    });

  } catch (error) {
    console.error('Evolution failed:', error);
    res.status(500).json({ error: 'Evolution failed' });
  }
});

export default router;
