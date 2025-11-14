# 🤖 Automation Setup Guide

**Free/Low-Cost Tools to Run Amphetamemes on Autopilot**

---

## ⚡ **Quick Win: Buffer (FREE)**

**What it does:** Schedule 30 days of social media posts in 1 hour

### **Setup (10 minutes):**

1. **Sign up:** buffer.com/pricing → Click "Free Plan"
   - 3 social accounts
   - 10 scheduled posts per account
   - Perfect for launch week

2. **Connect accounts:**
   - Twitter/X
   - Instagram
   - TikTok (or LinkedIn)

3. **Load content:**
   - Open `SOCIAL_MEDIA_CONTENT.md`
   - Copy Week 1 posts (7 days)
   - Paste into Buffer queue
   - Set posting times (7 AM, 2 PM, 7 PM)

4. **Repeat weekly:**
   - Every Sunday, queue next 7 days
   - Total time: 15 minutes/week

**Cost:** FREE  
**Time Saved:** 2-3 hours/week  
**Worth It:** 💯 YES

---

## 🔗 **Option 1: Zapier (FREE Tier)**

**What it does:** Auto-post Gumroad sales to Twitter

### **Setup (15 minutes):**

1. **Sign up:** zapier.com → Free Plan (100 tasks/month)

2. **Create Zap:**
   ```
   Trigger: Gumroad → New Sale
   Action: Twitter → Post Tweet
   ```

3. **Tweet Template:**
   ```
   🎉 New quantum template sold!

   Someone just joined the lattice with [Product Name]

   Energy: spreading 🌌

   Get yours: [Gumroad Link]
   ```

4. **Test it:**
   - Make a test purchase (Gumroad test mode)
   - Verify tweet posts automatically

**Cost:** FREE (100 tasks/month = ~100 sales announcements)  
**Time Saved:** Manual posting eliminated  
**Worth It:** ✅ YES for social proof

---

## 🎨 **Option 2: Make.com (FREE Tier)**

**What it does:** Cross-post from Instagram to Twitter automatically

### **Setup (20 minutes):**

1. **Sign up:** make.com → Free Plan (1,000 operations/month)

2. **Create Scenario:**
   ```
   Trigger: Instagram → New Post
   Action 1: Download image
   Action 2: Twitter → Post with image + caption
   ```

3. **Caption Template:**
   ```
   New on Instagram! 

   [Original Caption]

   #QuantumMemes #PsychedelicArt
   ```

**Cost:** FREE (1,000 ops = ~30 cross-posts/day)  
**Time Saved:** No more double-posting  
**Worth It:** ✅ YES for consistency

---

## 🐙 **Option 3: n8n (FREE, Self-Hosted on Replit)**

**What it does:** Full automation suite (advanced)

### **Why n8n:**
- Open source
- Self-host on Replit (free!)
- Unlimited automations
- More powerful than Zapier

### **Setup (30-45 minutes):**

1. **Create new Replit:**
   - Template: Node.js
   - Name: "amphetamemes-automation"

2. **Install n8n:**
   ```bash
   npm install n8n
   npx n8n
   ```

3. **Access UI:**
   - Click Replit URL
   - n8n editor opens

4. **Build Workflows:**

   **Workflow 1: Gumroad → Email → Twitter**
   ```
   [Gumroad Webhook] → [Format Data] → [Send Email] → [Post to Twitter]
   ```

   **Workflow 2: RSS Feed → Buffer**
   ```
   [RSS Trigger] → [Filter New Items] → [Post to Buffer]
   ```

   **Workflow 3: Stripe → Database**
   ```
   [Stripe Webhook] → [Transform Data] → [PostgreSQL Insert]
   ```

5. **Set Webhooks:**
   - Gumroad: Settings → Webhooks → Add Replit URL
   - Stripe: Already configured!

**Cost:** FREE (self-hosted)  
**Time Saved:** 5-10 hours/week  
**Learning Curve:** Medium  
**Worth It:** ✅ YES if you like automation

---

## 📅 **Option 4: Later or Planoly (FREE Tier)**

**What it does:** Instagram-specific scheduling with visual calendar

### **Setup (10 minutes):**

1. **Sign up:** later.com or planoly.com

2. **Upload Week 1 Content:**
   - Drag mandala images
   - Add captions from `SOCIAL_MEDIA_CONTENT.md`
   - Schedule at optimal times

3. **Visual Calendar:**
   - See your entire week/month
   - Drag-and-drop to reschedule
   - Preview grid layout

**Cost:** FREE (30 posts/month)  
**Time Saved:** 2-3 hours/week  
**Worth It:** ✅ YES for Instagram focus

---

## 🎯 **RECOMMENDED STACK (60 min setup, runs forever):**

```
1. Buffer (FREE) → Schedule Twitter/Instagram posts
2. Zapier (FREE) → Auto-post Gumroad sales to Twitter
3. Gumroad → Your product listings

= Full automation for $0/month
```

### **Advanced Stack (+30 min, more power):**

```
1. Buffer → Social scheduling
2. Make.com → Cross-posting Instagram ↔ Twitter
3. n8n (self-hosted) → Advanced workflows
4. Discord webhook → Community notifications

= Professional automation for $0/month
```

---

## 🔥 **60-Minute Setup Sprint:**

**Minute 0-10: Buffer**
- Sign up
- Connect Twitter, Instagram
- Queue Week 1 posts

**Minute 10-20: Gumroad**
- Create account
- Upload products (use `GUMROAD_LISTINGS.md`)
- Set prices

**Minute 20-30: Zapier**
- Sign up
- Create "Gumroad Sale → Twitter" Zap
- Test with dummy sale

**Minute 30-45: Social Profiles**
- Create Twitter @amphetamemes (if available)
- Create Instagram @amphetamemes
- Add bios + links

**Minute 45-60: Content Prep**
- Download mandala as profile pic
- Create 3 cover images for Gumroad
- Write email signature with links

**DONE!** You now have:
- ✅ 7 days of scheduled content
- ✅ Auto-posting sales announcements
- ✅ Products live on Gumroad
- ✅ Social profiles ready

**Time to first potential sale:** Minutes after Gumroad goes live!

---

## 📊 **Automation ROI:**

**Without Automation:**
- 2-3 hours/day on social media
- Manual cross-posting
- Remembering to announce sales
= Burnout in 2 weeks

**With Automation:**
- 15 min/week to queue content
- Auto cross-posting
- Sales announcements handled
= Sustainable forever

**Setup Time:** 60 minutes  
**Time Saved:** 10-15 hours/week  
**ROI:** 1,000% (15 hours saved for 1 hour invested)

---

## 🚨 **What NOT to Automate:**

❌ **Engagement/Replies** - Be human here  
❌ **DMs** - Personal touch matters  
❌ **Community Building** - Automation kills vibe  
❌ **Custom Commissions** - High-value, needs attention

✅ **What TO Automate:**

✅ Posting content  
✅ Cross-posting  
✅ Sales announcements  
✅ Email notifications  
✅ Data logging

---

## 🎁 **Bonus: GitHub Actions (FREE)**

**Auto-update README with latest sales count:**

```yaml
# .github/workflows/update-stats.yml
name: Update Sales Stats
on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Fetch Gumroad Stats
        run: |
          # API call to get sales count
          # Update README.md badge
      - name: Commit changes
        run: |
          git config --global user.name 'GitHub Action'
          git commit -am "Update sales stats"
          git push
```

**Shows:** "🔥 127 templates sold" badge on GitHub README

**Cost:** FREE  
**Coolness:** 💯

---

## ⚡ **Quick Reference:**

| Tool | Cost | Setup Time | Best For |
|------|------|------------|----------|
| **Buffer** | FREE | 10 min | Social scheduling |
| **Zapier** | FREE | 15 min | Simple automations |
| **Make.com** | FREE | 20 min | Cross-posting |
| **n8n** | FREE | 45 min | Power users |
| **Later** | FREE | 10 min | Instagram visual |
| **GitHub Actions** | FREE | 30 min | Stats/badges |

---

## 🎯 **Your First Week:**

**Monday:** Set up Buffer + Gumroad (30 min)  
**Tuesday:** Create Zapier Zap (15 min)  
**Wednesday:** Queue Week 2 content (15 min)  
**Thursday:** Test automations (20 min)  
**Friday:** Launch! 🚀  
**Weekend:** Engage with comments, close first sales

**Total Setup:** ~2 hours  
**Weekly Maintenance:** 30 minutes  
**Freedom:** Priceless

---

## 💡 **Pro Tips:**

1. **Start Simple:** Buffer + Zapier only
2. **Add Gradually:** One new tool per week
3. **Test Everything:** Use test modes before going live
4. **Monitor First Week:** Check daily, then weekly
5. **Adjust Timing:** See when posts perform best, reschedule

**The goal:** Spend 80% time creating, 20% managing

**With automation:** Possible! 🎉

---

## 🤖 **AI Agents for Account Creation (Experimental):**

**Warning:** Most platforms ban automated signups. Do these manually.

**What AI CAN help with:**
- ✅ Writing bios (use Claude/ChatGPT)
- ✅ Generating content (already done!)
- ✅ Image editing (use DALL-E for variations)
- ✅ Email responses (templates + automation)

**What AI CANNOT do:**
- ❌ Create accounts (against ToS)
- ❌ Verify email/phone (requires human)
- ❌ Pass CAPTCHAs (by design)

**Best Approach:**
- Manual signup (30 min once)
- Automation for everything after (saves 100+ hours)

---

**Ready to automate?** Pick one tool and start today!

**Questions?** Check tool docs or ask in their Discord communities.

🚀 Built for creators who went all in. Let automation handle the grunt work while you create quantum magic.
