<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/13CTMUjEmkU0uHiPwUwkoNUKrTyJJ-rsq

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Referee AI
Decision Steering Agent for Complex Choices
🏁 Kiro Heroes – Week 6: The Referee
Overview
Referee AI is a decision-steering application built for the final Kiro Heroes challenge.
Instead of giving users a single answer, Referee AI compares options, explains trade-offs, and guides users toward confident decisions based on their priorities and constraints.
This app demonstrates how agents can help users choose, not just consume information.
Why Referee AI?
Most tools:
Optimize for “best answer”
Ignore context and constraints
Hide trade-offs
Referee AI:
Makes trade-offs explicit
Surfaces risks and second-order effects
Offers conditional recommendations
Encourages informed decision-making
Core Features
⚖️ Comparative Decision Engine
Compare 2–5 options side-by-side
Neutral, constraint-aware analysis
🎯 Constraint & Priority Awareness
Budget
Performance
Scalability
Compliance
Time-to-market
Team expertise
🧠 Agent Steering (The Referee)
No absolute answers
Scenario-based guidance:
“If you prioritize X → choose A”
“If Y becomes critical → avoid B”
🔍 Trade-Off Explanation
Short-term vs long-term impact
Hidden costs and risks
Reversal conditions
Example Use Cases
Cloud choice: AWS Lambda vs Cloudflare Workers
Database decision: Postgres vs DynamoDB
AI strategy: Hosted LLM API vs self-hosted models
Tech stack selection for startups or enterprises
How It Works
User defines the decision question
User lists options
User sets constraints & priorities
Referee Agent:
Evaluates each option
Explains strengths, weaknesses, and trade-offs
Agent delivers a steered verdict, not a single answer
Agent Design: “The Referee”
Role
An impartial expert that helps users navigate complex decisions.
Key Principles
Neutrality over popularity
Explanation over ranking
Guidance over prescription
Agent Guardrails
Never ignore user constraints
Never oversimplify
Always explain why
Output Structure
Decision Summary
Option Comparison
Trade-Off Analysis
Referee Verdict (conditional)
Confidence & Reversal Conditions

Built With
Kiro App Canvas
Agent-first design
Constraint-driven reasoning
Human-centric decision logic
Future Enhancements
What-if scenario explorer
Multi-stakeholder weighting
Decision history & exports
Devil’s Advocate mode
License
MIT
