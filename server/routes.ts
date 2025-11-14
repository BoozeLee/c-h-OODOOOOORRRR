import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTemplateSchema } from "@shared/schema";
import { z } from "zod";
import Stripe from "stripe";
import crypto from "crypto";
import optimizationRoutes from "./routes/optimization";

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable.');
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-10-29.clover",
    });
  }
  return stripe;
}

const BUNDLE_PRICING = {
  single: { amount: 499, name: "Single Template", count: 1 },
  starter: { amount: 1299, name: "Starter Pack", count: 3 },
  creator: { amount: 1999, name: "Creator Bundle", count: 5 },
  complete: { amount: 3499, name: "Complete Collection", count: 10 },
};

interface PerplexityMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

async function callPerplexityAPI(messages: PerplexityMessage[]): Promise<string> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error("PERPLEXITY_API_KEY is not configured");
  }

  const response = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${PERPLEXITY_API_KEY}`
    },
    body: JSON.stringify({
      model: "sonar",
      messages,
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Perplexity API error response:", errorBody);
    throw new Error(`Perplexity API error: ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.get("/api/templates", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const templates = category 
        ? await storage.getTemplatesByCategory(category)
        : await storage.getAllTemplates();
      res.json(templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
      res.status(500).json({ error: "Failed to fetch templates" });
    }
  });

  app.get("/api/templates/:id", async (req, res) => {
    try {
      const template = await storage.getTemplate(req.params.id);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error fetching template:", error);
      res.status(500).json({ error: "Failed to fetch template" });
    }
  });

  app.post("/api/templates/generate", async (req, res) => {
    try {
      const { topic, category } = z.object({
        topic: z.string().min(3),
        category: z.string().optional()
      }).parse(req.body);

      const researchPrompt = `Research the current cultural context, trends, and narratives around: ${topic}. 
Focus on: recent news, social media discourse, emerging themes, and cultural significance. 
Be concise and focus on what's happening NOW in 2025.`;

      const researchMessages: PerplexityMessage[] = [
        {
          role: "system",
          content: "You are a cultural researcher analyzing real-time trends and narratives for artistic expression."
        },
        {
          role: "user",
          content: researchPrompt
        }
      ];

      const culturalContext = await callPerplexityAPI(researchMessages);

      const generationMessages: PerplexityMessage[] = [
        {
          role: "system",
          content: `You are an expert at creating psychedelic art prompts in the style of underground comix (R. Crumb, S. Clay Wilson). 
Your prompts combine:
- Bold black linework and hand-drawn aesthetic
- Neon colors (electric pink, acid green, cyber blue, toxic orange)
- Ben-Day dots pattern and halftone effects
- Truth-revealing, satirical, rebellious themes
- Surreal metaphors and cultural commentary`
        },
        {
          role: "user",
          content: `Based on this cultural research about "${topic}":

${culturalContext}

Create a psychedelic art prompt that:
1. Captures the essence of the topic with a surreal visual metaphor
2. Uses underground comix aesthetic
3. Reveals truth through satire
4. Is 2-3 sentences maximum

Also suggest:
- A catchy title (3-5 words)
- A narrative tag (one sentence describing the metaphor)

Format your response as:
TITLE: [title]
NARRATIVE: [narrative]
PROMPT: [prompt]`
        }
      ];

      const aiResponse = await callPerplexityAPI(generationMessages);

      const titleMatch = aiResponse.match(/TITLE:\s*(.+?)(?=\n|$)/i);
      const narrativeMatch = aiResponse.match(/NARRATIVE:\s*(.+?)(?=\n|$)/i);
      const promptMatch = aiResponse.match(/PROMPT:\s*([\s\S]+?)(?=\n\n|$)/i);

      const title = titleMatch ? titleMatch[1].trim() : `${topic} Vision`;
      const narrative = narrativeMatch ? narrativeMatch[1].trim() : "A psychedelic exploration";
      const promptContent = promptMatch ? promptMatch[1].trim() : aiResponse;

      const trendIntensity = Math.floor(Math.random() * 40) + 60;
      const energyScore = Math.floor(Math.random() * 30) + 70;

      const template = await storage.createTemplate({
        title,
        category: category || "General",
        narrative,
        promptContent,
        trendIntensity,
        energyScore,
        remixCount: 0
      });

      res.json(template);
    } catch (error: any) {
      console.error("Error generating template:", error);
      res.status(500).json({ 
        error: "Failed to generate template",
        details: error.message 
      });
    }
  });

  app.post("/api/templates", async (req, res) => {
    try {
      const validatedData = insertTemplateSchema.parse(req.body);
      const template = await storage.createTemplate(validatedData);
      res.status(201).json(template);
    } catch (error) {
      console.error("Error creating template:", error);
      res.status(400).json({ error: "Invalid template data" });
    }
  });

  app.patch("/api/templates/:id", async (req, res) => {
    try {
      const updates = req.body;
      const template = await storage.updateTemplate(req.params.id, updates);
      if (!template) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.json(template);
    } catch (error) {
      console.error("Error updating template:", error);
      res.status(500).json({ error: "Failed to update template" });
    }
  });

  app.delete("/api/templates/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteTemplate(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Template not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting template:", error);
      res.status(500).json({ error: "Failed to delete template" });
    }
  });

  app.post("/api/trends/research", async (req, res) => {
    try {
      const { query } = z.object({
        query: z.string().min(1)
      }).parse(req.body);

      const messages: PerplexityMessage[] = [
        {
          role: "system",
          content: "You are a trend researcher analyzing current cultural movements, news, and social discourse."
        },
        {
          role: "user",
          content: `What are the most significant trending topics and narratives right now (2025) related to: ${query}? 
Focus on: breaking news, viral content, emerging movements, cultural shifts. List 3-5 specific trends with brief context.`
        }
      ];

      const trends = await callPerplexityAPI(messages);
      res.json({ trends });
    } catch (error: any) {
      console.error("Error researching trends:", error);
      res.status(500).json({ 
        error: "Failed to research trends",
        details: error.message 
      });
    }
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(503).json({ 
          error: "Payment system not configured",
          message: "Stripe payments are not available. Please contact the site administrator."
        });
      }

      const { bundleType, email } = z.object({
        bundleType: z.enum(["single", "starter", "creator", "complete"]),
        email: z.string().email().optional()
      }).parse(req.body);

      const bundle = BUNDLE_PRICING[bundleType];
      const downloadToken = crypto.randomBytes(32).toString("hex");

      const session = await getStripe().checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { 
              name: `Amphetamemes ${bundle.name}`,
              description: `${bundle.count} psychedelic art templates with energetic metadata`
            },
            unit_amount: bundle.amount
          },
          quantity: 1
        }],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.protocol}://${req.get("host")}/store`,
        customer_email: email,
        metadata: {
          bundleType,
          downloadToken
        }
      });

      await storage.createPurchase({
        stripeSessionId: session.id,
        bundleType,
        amount: bundle.amount,
        customerEmail: email || "unknown",
        downloadToken,
        status: "pending"
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ 
        error: "Failed to create checkout session",
        details: error.message 
      });
    }
  });

  app.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      return res.status(400).send('Webhook signature missing');
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('STRIPE_SECRET_KEY not configured - webhooks disabled');
      return res.status(503).send('Payment system not configured');
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.warn('STRIPE_WEBHOOK_SECRET not configured - webhook verification disabled');
      return res.status(500).send('Webhook secret not configured');
    }

    try {
      const rawBody = req.rawBody as Buffer;
      if (!rawBody) {
        return res.status(400).send('Request body missing');
      }

      const event = getStripe().webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const purchase = await storage.getPurchaseBySessionId(session.id);

        if (purchase) {
          const templates = await storage.getAllTemplates();
          const bundle = BUNDLE_PRICING[purchase.bundleType as keyof typeof BUNDLE_PRICING];
          const selectedTemplates = templates.slice(0, bundle.count).map(t => t.id);

          await storage.updatePurchaseStatus(
            purchase.id,
            "completed",
            selectedTemplates
          );
          console.log(`Purchase completed: ${session.id}, Templates: ${selectedTemplates.length}`);
        }
      }

      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error("Webhook error:", error);
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/session/:sessionId", async (req, res) => {
    try {
      const purchase = await storage.getPurchaseBySessionId(req.params.sessionId);
      
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      if (purchase.status !== "completed") {
        return res.status(403).json({ error: "Purchase not completed yet" });
      }

      res.json({
        bundleType: purchase.bundleType,
        amount: purchase.amount,
        downloadToken: purchase.downloadToken,
        status: purchase.status,
        createdAt: purchase.createdAt
      });
    } catch (error: any) {
      console.error("Error fetching session:", error);
      res.status(500).json({ error: "Failed to fetch session" });
    }
  });

  app.get("/api/download/:token", async (req, res) => {
    try {
      const purchase = await storage.getPurchaseByDownloadToken(req.params.token);
      
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }

      if (purchase.status !== "completed") {
        return res.status(403).json({ error: "Purchase not completed" });
      }

      if (!purchase.templateIds || purchase.templateIds.length === 0) {
        return res.status(404).json({ error: "No templates assigned to purchase" });
      }

      const templates = await Promise.all(
        purchase.templateIds.map(id => storage.getTemplate(id))
      );

      const validTemplates = templates.filter(t => t !== undefined);

      res.json({
        bundleType: purchase.bundleType,
        purchaseDate: purchase.createdAt,
        templates: validTemplates
      });
    } catch (error: any) {
      console.error("Error fetching download:", error);
      res.status(500).json({ error: "Failed to fetch download" });
    }
  });

  app.use("/api/optimization", optimizationRoutes);

  const httpServer = createServer(app);

  return httpServer;
}
