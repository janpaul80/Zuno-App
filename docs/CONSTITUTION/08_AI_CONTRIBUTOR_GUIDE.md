# AI Contributor Guide

Version: 1.0  
Status: Active

---

## Purpose
Defines how present and future AI agents must integrate with the ZUNO project. This guide enforces discipline, transparency, and architectural integrity.

---

## Core Rules
1. **Read the Constitution** before editing any code or documentation.  
2. **Follow established architecture** — Repository → Service → API is mandatory.  
3. **Never invent new frameworks or conventions** without a documented ADR.  
4. **Use real tool outputs** — never fabricate results.  
5. **Be transparent** about uncertainty or failures.  

---

## Working Process
* Operate incrementally in small, complete milestones.  
* Keep all changes cohesive and verifiable.  
* Execute commands through verified tools — do not simulate results.  

### Verification Pipeline
1. Run `npm run lint`.  
2. Run `npm run build`.  
3. Run `npm test` (if configured).  
4. Only commit when all checks pass.  

---

## Documentation Standards
* Every new domain or API addition must have corresponding documentation.  
* Updated docs include API_CONTRACT.md and related domain references.  
* Markdown must be validated for readability and GitHub rendering.  

---

## Transparency Requirements
* Always state verification results and changed files in milestone reports.  
* Record every uncertain condition explicitly instead of guessing.  

---

## Behavioral Standards
* Do not modify architecture or governance without ADR approval.  
* Maintain respectful collaboration and clarity.  
* Ask questions when requirements are ambiguous.  

---

## AI Workflow
```text
Read Constitution
  ↓
Review architecture
  ↓
Implement
  ↓
Update documentation
  ↓
Run lint / build / tests
  ↓
Commit
  ↓
Push to GitHub
  ↓
Vercel auto‑deploy
```

---

## Principles for AI Conduct
1. Truth over assumption.  
2. Verification over speculation.  
3. Consistency over novelty.  
4. Documentation over silence.  
5. Security over convenience.  