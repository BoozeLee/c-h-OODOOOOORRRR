# Contributing to Amphetamemes

**Thank you for your interest in contributing!** 🙏

Amphetamemes is built on the philosophy of **freedom, not greed** - helping creators and humanity, not accumulating wealth.

---

## 🌈 **Philosophy**

Before contributing, understand the core values:

- **Freedom Over Wealth**: This project enables financial freedom, not billionaire status
- **Creation Over Destruction**: Better things than bombs - art, healing, evolution
- **Community Over Control**: Open collaboration with clear IP boundaries
- **Impact Over Ego**: We're here to help people, not build empires

**If these values resonate, you're in the right place!**

---

## 🤝 **How to Contribute**

### **Ways to Help**

1. **Report Bugs**: Found something broken? Open an issue!
2. **Suggest Features**: Have ideas? We'd love to hear them
3. **Improve Docs**: Documentation is always welcome
4. **Write Code**: Fix bugs or implement features (see guidelines below)
5. **Share Knowledge**: Help others in discussions
6. **Spread the Word**: Tell other creators about this project

---

## 🔧 **Development Setup**

### **Prerequisites**
- Node.js 18+
- PostgreSQL database
- Python 3.9+ (for AutomationCodex)
- Git

### **Setup Steps**

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/amphetamemes.git
cd amphetamemes

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### **Project Structure**

```
amphetamemes/
├── client/src/          # React frontend
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   └── lib/             # Utilities and helpers
├── server/              # Express backend
│   ├── routes/          # API endpoints
│   ├── automation/      # AutomationCodex bridge
│   └── storage.ts       # Database interface
├── shared/              # Shared types and schemas
├── automation_codex/    # Python optimization framework
└── attached_assets/     # Images and static assets
```

---

## 📝 **Coding Guidelines**

### **Style**
- Use TypeScript for type safety
- Follow existing code conventions
- Use Prettier for formatting (automatic)
- Add JSDoc comments for complex functions

### **Testing**
- Test your changes locally
- Ensure no TypeScript errors
- Verify database migrations work
- Check both frontend and backend

### **Commits**
- Write clear commit messages
- Use conventional commits format:
  ```
  feat: Add template evolution scheduler
  fix: Resolve Stripe webhook signature issue
  docs: Update API documentation
  ```

---

## 🚀 **Pull Request Process**

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code
   - Test thoroughly
   - Update documentation if needed

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: Description of your changes"
   ```

4. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Describe what you changed and why
   - Reference any related issues

6. **Review Process**
   - Maintainers will review your PR
   - Address any feedback
   - Once approved, it will be merged!

---

## 🎯 **What We're Looking For**

### **High Priority**
- 🐛 Bug fixes (especially critical ones)
- 📚 Documentation improvements
- ♿ Accessibility enhancements
- 🎨 UI/UX improvements
- 🔒 Security fixes

### **Medium Priority**
- ✨ New features (discuss first in issues)
- 🚀 Performance optimizations
- 🧪 Test coverage improvements
- 🌐 Internationalization (i18n)

### **Community Ideas**
- Template gallery contributions
- AI prompt engineering improvements
- Mathematical model enhancements
- Integration with other tools

---

## 🚫 **What Won't Be Accepted**

- Breaking changes without discussion
- Code that violates our philosophy
- Unnecessary dependencies
- Features that compromise user privacy
- Anything that helps surveillance/control

**We're building tools for freedom, not oppression.**

---

## 📜 **Legal**

### **Copyright**
- All contributions become part of the project
- Copyright remains with Kiliaan Walter Vanvoorden
- Contributors are credited in CONTRIBUTORS.md

### **License**
- Currently proprietary (see LICENSE)
- Planning dual license: MIT core + proprietary premium
- By contributing, you agree to these terms

### **Patent**
- Patent pending on AutomationCodex framework
- Contributions don't grant patent rights
- Open source core will have patent protection

### **Contributor Agreement**
By submitting a pull request, you agree that:
1. Your contribution is your original work
2. You grant perpetual license to use your contribution
3. You understand the project's licensing structure

---

## 🌟 **Recognition**

### **How We Credit Contributors**

1. **Code Contributors**: Listed in CONTRIBUTORS.md
2. **Major Features**: Mentioned in release notes
3. **Bug Reporters**: Thanked in issue resolutions
4. **Documentation**: Credited in relevant docs

**Everyone who helps gets recognized!**

---

## 💬 **Communication**

### **Where to Discuss**

- **Issues**: Bug reports and feature requests
- **Pull Requests**: Code review discussions
- **Discussions**: General questions and ideas

### **Response Time**

- Issues: Within 48 hours
- Pull Requests: Within 1 week
- Security: Within 24 hours

**Please be patient - this is a passion project!**

---

## 🎓 **Learning Resources**

### **Technologies Used**
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)

### **AI Tools**
- [Perplexity AI](https://perplexity.ai)
- [Claude Documentation](https://docs.anthropic.com)
- [OpenAI API](https://platform.openai.com)

---

## ❓ **Questions?**

**Contact Kiliaan:**
- 📧 kiliaanv2@gmail.com
- 📧 iamthatiamresearch@gmail.com

**Or open a Discussion on GitHub!**

---

## 🙏 **Thank You**

**Every contribution, no matter how small, makes a difference.**

You're not just writing code - you're helping create:
- Tools that liberate creators
- Systems that reveal truth
- Technology that serves humanity

**Together, we're building better things than bombs.** 💫

---

*"Freedom over wealth. Creation over destruction. Impact over ego."*

**Welcome to the revolution.** 🚀
