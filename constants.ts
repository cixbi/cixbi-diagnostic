import { Question, ProfileContent, ProfileType } from './types';

// Replace this with your deployed Google Apps Script Web App URL
// Follow the instructions to deploy the script: Extensions > Apps Script > Deploy > Web App > Who has access: Anyone
export const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyLM7lLUtM55qaRqwjP0nBOaY-ghkDI20ulDbR7QxJZ-xhyHTZtab1rosD4B_saDoxh/exec";

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "A prospective client asks for your pricing. You haven't spoken in depth yet. You:",
    options: [
      { text: "Quote your standard rate immediately — you know what you're worth", ci: 3, bi: 0 },
      { text: "Send a pricing range and ask when they'd like to discuss scope", ci: 2, bi: 3 },
      { text: "Reply that you need more information before you can quote accurately", ci: 0, bi: 2 },
      { text: "Feel uncertain and either overestimate or underquote depending on your mood", ci: 0, bi: 0 }
    ]
  },
  {
    id: 2,
    text: "You've just finished a project. Before moving on, you:",
    options: [
      { text: "Archive the files and invoice immediately — momentum matters", ci: 2, bi: 1 },
      { text: "Review what worked, update your process docs, check profitability", ci: 2, bi: 3 },
      { text: "Reflect on what you learned creatively, but don't track time or margin", ci: 3, bi: 0 },
      { text: "Move straight into the next thing without pausing", ci: 0, bi: 0 }
    ]
  },
  {
    id: 3,
    text: "A regular client asks you to lower your rates \"just this once.\" You:",
    options: [
      { text: "Agree because you value the relationship and trust it will balance out", ci: 2, bi: 0 },
      { text: "Decline firmly but offer an alternative scope that fits their budget", ci: 3, bi: 3 },
      { text: "Agree reluctantly because you're unsure how else to respond", ci: 0, bi: 0 },
      { text: "Counter with data: your capacity costs, market rates, and scope trade-offs", ci: 0, bi: 3 }
    ]
  },
  {
    id: 4,
    text: "You're choosing between two potential projects. One excites you creatively but pays less. The other is straightforward but lucrative. You:",
    options: [
      { text: "Take the exciting one — the right work always leads somewhere", ci: 3, bi: 0 },
      { text: "Run the numbers: which one creates the most strategic value right now?", ci: 1, bi: 3 },
      { text: "Take whichever one came in first to avoid the decision", ci: 0, bi: 0 },
      { text: "Weigh creative growth potential against current financial needs, then decide", ci: 3, bi: 3 }
    ]
  },
  {
    id: 5,
    text: "Midway through a project, you realize the scope has quietly expanded. You:",
    options: [
      { text: "Absorb it — you didn't catch it early enough and it feels too late now", ci: 0, bi: 0 },
      { text: "Flag it immediately with a revised scope document and cost estimate", ci: 1, bi: 3 },
      { text: "Keep going but feel resentful, knowing you're working for free", ci: 2, bi: 0 },
      { text: "Address it directly, referencing the original brief and proposing a path forward", ci: 3, bi: 3 }
    ]
  },
  {
    id: 6,
    text: "When you review your business finances, you:",
    options: [
      { text: "Feel overwhelmed and avoid looking too closely", ci: 0, bi: 0 },
      { text: "Check your bank balance and base decisions on what you see", ci: 2, bi: 1 },
      { text: "Track revenue, expenses, and profit margin monthly with a simple system", ci: 1, bi: 3 },
      { text: "Know your numbers clearly and use them to inform strategic decisions", ci: 2, bi: 3 }
    ]
  },
  {
    id: 7,
    text: "A project isn't going well. The client seems happy, but something feels off to you. You:",
    options: [
      { text: "Trust the feeling and ask clarifying questions, even if it's uncomfortable", ci: 3, bi: 1 },
      { text: "Ignore it — if they're not complaining, it's probably fine", ci: 0, bi: 0 },
      { text: "Reference your project milestones and success criteria to assess objectively", ci: 0, bi: 3 },
      { text: "Cross-reference your intuition with measurable indicators, then act", ci: 3, bi: 3 }
    ]
  },
  {
    id: 8,
    text: "You're deciding whether to raise your rates. You:",
    options: [
      { text: "Raise them when it feels right — usually when you're frustrated with what you earn", ci: 3, bi: 0 },
      { text: "Calculate your effective hourly rate, cost of living, and market positioning first", ci: 0, bi: 3 },
      { text: "Keep them the same because you're unsure what's fair or defensible", ci: 0, bi: 0 },
      { text: "Consider both market data and the value you're creating, then adjust strategically", ci: 3, bi: 3 }
    ]
  },
  {
    id: 9,
    text: "You're planning your business for the next six months. You:",
    options: [
      { text: "Don't plan much — you respond to what comes in", ci: 1, bi: 0 },
      { text: "Set financial targets and reverse-engineer what you need to deliver", ci: 0, bi: 3 },
      { text: "Clarify the kind of work you want to do, then shape opportunities around that", ci: 3, bi: 1 },
      { text: "Define both creative direction and financial goals, then align your strategy", ci: 3, bi: 3 }
    ]
  },
  {
    id: 10,
    text: "A client gives vague feedback: \"It's not quite right.\" You:",
    options: [
      { text: "Feel stuck and ask them to be more specific", ci: 0, bi: 1 },
      { text: "Intuitively understand what they mean and iterate without needing more direction", ci: 3, bi: 0 },
      { text: "Reference the creative brief to identify where misalignment occurred", ci: 0, bi: 3 },
      { text: "Read between the lines and cross-check against agreed objectives", ci: 3, bi: 3 }
    ]
  },
  {
    id: 11,
    text: "You're considering saying no to a project. The main reason would be:",
    options: [
      { text: "It doesn't feel like the right fit, even if you can't articulate why", ci: 3, bi: 0 },
      { text: "The numbers don't work — timeline, budget, or resource availability", ci: 0, bi: 3 },
      { text: "You're not sure, so you're likely to say yes by default", ci: 0, bi: 0 },
      { text: "Both gut sense and practical assessment tell you it's not aligned", ci: 3, bi: 3 }
    ]
  },
  {
    id: 12,
    text: "When you think about your business growth, you focus on:",
    options: [
      { text: "Doing work you're proud of — quality compounds over time", ci: 3, bi: 1 },
      { text: "Increasing revenue, improving margins, and building sustainable systems", ci: 0, bi: 3 },
      { text: "Honestly, you're just trying to keep up", ci: 0, bi: 0 },
      { text: "Building creative authority and financial sustainability in parallel", ci: 3, bi: 3 }
    ]
  }
];

export const PROFILES: Record<ProfileType, ProfileContent> = {
  'intuition-led': {
    title: "Intuition-forward. Intelligence-light.",
    headline: "You rely on instinct — and it’s carrying more than it should.",
    working: "You make creative decisions quickly and confidently. You read people and situations well. Your taste is strong, and you’re willing to follow it even when it’s unconventional. The work itself is rarely the problem.",
    imbalance: "You often don’t know whether work is profitable until it’s over. Pricing feels fluid rather than anchored. Boundaries blur, and scope creep becomes normal. Client decisions are driven by rapport rather than strategic fit. Financial data feels disconnected from the creative work, so it’s easy to avoid.",
    cost: "Over-delivery becomes the norm. Income stays inconsistent. The business depends entirely on your judgement in real time. Clients value you, but you’re likely undercharging and carrying too much. Things run smoothly — until you’re too tired to keep them running.",
    help: "Introduce light structure that protects your intuition instead of replacing it.\n\nSimple financial tracking. Pricing anchored in value, not mood. Boundaries built into process, not personality. Systems that support your judgement so it doesn’t have to work so hard."
  },
  'intelligence-led': {
    title: "Intelligence-forward. Intuition-muted.",
    headline: "Your systems are strong — but you’ve stopped trusting what you know beyond the data.",
    working: "You understand your numbers. You plan, forecast, and price with confidence. Your processes are consistent and scalable. Clients experience professionalism and reliability. Financially, things are likely stable or improving.",
    imbalance: "Creative instincts get second-guessed unless they can be justified on a spreadsheet. You say yes to work that makes sense financially but feels misaligned. Client relationships can feel transactional. The business runs efficiently, but the work may no longer feel meaningful.",
    cost: "You build a business that works on paper but feels hollow. Creative sharpness dulls over time. The best opportunities — those requiring intuitive leaps — are missed. You risk becoming operationally excellent while losing what once differentiated you.",
    help: "Reintroduce intuition as a legitimate input, not a liability.\n\nCreate space for strategic instinct alongside data. Trust pattern recognition that isn’t easily measurable. Integrate qualitative judgement back into how decisions are made."
  },
  'underdeveloped': {
    title: "Unanchored on both axes.",
    headline: "You’re reacting — not yet operating from clarity.",
    working: "You’re showing up. You’re trying to make sense of things. That matters more than it feels like right now.",
    imbalance: "Decision-making feels noisy and inconsistent. Pricing is uncertain. Saying no feels risky. It’s hard to evaluate whether a project went well. You avoid both finances and instincts because neither feels reliable yet. Client feedback destabilizes you because there’s no internal reference point.",
    cost: "High effort produces little cumulative progress. Underpricing becomes chronic. The business runs on momentum you can’t sustain. You stay reactive, serving whoever arrives instead of building something intentional.",
    help: "Start with structure, not vision.\n\nTrack three things consistently: time, money, and energy. Build one repeatable system. Learn to notice when something feels off instead of ignoring it. You don’t need a rebrand — you need foundational clarity."
  },
  'integrated': {
    title: "Integrated: Intuition + Intelligence.",
    headline: "You use data to support instinct — and instinct to interpret data.",
    working: "You make decisions quickly but not impulsively. You know when to trust judgement and when to check the numbers. Systems enhance creative thinking rather than constrain it. Pricing is confident and defensible. You can grow without losing control. Clients experience both insight and professionalism.",
    imbalance: "Structurally, it likely doesn’t. The tension is refinement, not correction. Decisions now centre on which bets to make next — or how to delegate without diluting what makes your work distinct.",
    cost: "Under pressure, it’s easy to drift back toward structure or instinct alone. As you scale, imbalance can quietly re-emerge if integration isn’t actively maintained.",
    help: "Shift from optimisation to expansion.\n\nEngage in peer-level strategic thinking. Seek mentorship or collaboration at your level or beyond. Create space to reflect on direction, not just execution. You don’t need fixing you need room to grow."
  }
};
