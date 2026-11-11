'use strict';

// NOTE: All data below — storefronts, accounts, reviews, metrics, and
// campaign figures — is FICTIONAL and fabricated for demonstration only.
// It does not represent real users, real merchants, or any organization's internal data.

// ===== SHARED CONTENT =====

const SKILL_FAKE_REVIEWS = `---
name: investigation-fake-reviews
description: Investigating on-platform rating concentration, arrival surges, repeated review text, and reviewer activity.
---

## Instructions

- Pull all available storefront review fields for seed entities before expanding.
- Check verified purchase status and arrival velocity before flagging reviews.
- Reviewer overlap across the same listings > 85% indicates coordination.
- Flag review text matching templates with high text similarity (>= 85%).

## Tables

\`storefront_reviews\` — id, storefront_id, reviewer_id, listing_id, rating, review_text, verified_purchase, created_at
\`reviewers\` — account_id, created_at, profile_url, status`;

const SKILL_FAKE_REVIEWS_UPDATED = `---
name: investigation-fake-reviews
description: Investigating on-platform rating concentration, arrival surges, repeated review text, and reviewer activity.
---

## Instructions

- Pull all available storefront review fields for seed entities before expanding.
- Check verified purchase status and arrival velocity before flagging reviews.
- Reviewer overlap across the same listings > 85% indicates coordination.
- Flag review text matching templates with high text similarity (>= 85%).

## Known Platform Patterns (do not flag as campaigns)

- **Creator Affiliate Campaigns:** High-velocity bursts accompanied by public promotional discount codes or affiliate campaign links represent authentic external promotion, not Sybil bot operations. Exclude from Sybil scoring.

## Tables

\`storefront_reviews\` — id, storefront_id, reviewer_id, listing_id, rating, review_text, verified_purchase, created_at
\`reviewers\` — account_id, created_at, profile_url, status`;

const REF_SCHEMA_NOTES = `# Schema Notes & Caveats — ShopStream Review Data

- **Storefront Reviews**: \`storefront_reviews.verified_purchase\` indicates whether the review is tagged with platform purchase verification.
- **Reviewer Accounts**: Many bot reviewers keep profiles private; rely on review timestamps and listing overlap.
- **Partition Pruning**: Always filter queries by \`created_at\` timestamp bounds to avoid expensive full-table scans.
- **Creator Promos**: Social media promotions generate sudden review velocity spikes that trace back to creator discount links.`;

const SKILL_IMPERSONATION = `---
name: investigation-impersonation
description: Investigates accounts pretending to be existing users through display name spoofing, avatar duplication, and lookalike handles.
---

## Instructions

- Inspect the target profile page, website, or social profile metadata.
- Compare display name, avatar, and handle against the authentic public profile.
- Check account creation date and recent posts for out-of-character promotional content.
- Check handle string similarity (Levenshtein edit distance <= 2).

## Known Platform Caveats

- Common names: Do not flag common names (e.g., John Smith) without handle similarity or avatar matching.
- Verified profiles: Verify whether the authentic profile carries a verified badge or official link.
- Legitimate updates: Check for recent display name changes before flagging.`;

const FILES_BASE = [
  { name: 'bigquery-query', type: 'dir', children: [] },
  { name: 'campaign-identification', type: 'dir', children: [
    { name: 'SKILL.md', type: 'file' },
  ]},
  { name: 'investigation-engagement-farming', type: 'dir', children: [] },
  { name: 'investigation-fake-reviews', type: 'dir', children: [
    { name: 'references', type: 'dir', children: [
      { name: 'known_affiliate_networks.md', type: 'file' },
      { name: 'schema_notes.md', type: 'file' },
    ]},
    { name: 'scripts', type: 'dir', children: [
      { name: 'calculate_co_review.py', type: 'file' },
      { name: 'detect_text_templates.py', type: 'file' },
    ]},
    { name: 'SKILL.md', type: 'file' },
  ]},
  { name: 'investigation-results', type: 'dir', children: [] },
  { name: 'platform-enforcement-evaluation', type: 'dir', children: [] },
  { name: 'safe-data-ingestion', type: 'dir', children: [] },
  { name: 'scaffold-investigation-skill', type: 'dir', children: [] },
];

const FILES_WITH_SCAFFOLDED_PACKAGE = [
  { name: 'bigquery-query', type: 'dir', children: [] },
  { name: 'campaign-identification', type: 'dir', children: [
    { name: 'SKILL.md', type: 'file' },
  ]},
  { name: 'investigation-engagement-farming', type: 'dir', children: [] },
  { name: 'investigation-fake-reviews', type: 'dir', children: [
    { name: 'references', type: 'dir', children: [
      { name: 'known_affiliate_networks.md', type: 'file' },
      { name: 'schema_notes.md', type: 'file' },
    ]},
    { name: 'scripts', type: 'dir', children: [
      { name: 'calculate_co_review.py', type: 'file' },
      { name: 'detect_text_templates.py', type: 'file' },
    ]},
    { name: 'SKILL.md', type: 'file' },
  ]},
  { name: 'investigation-impersonation', type: 'dir', isNew: true, children: [
    { name: 'SKILL.md', type: 'file' },
  ]},
  { name: 'investigation-results', type: 'dir', children: [] },
  { name: 'platform-enforcement-evaluation', type: 'dir', children: [] },
  { name: 'safe-data-ingestion', type: 'dir', children: [] },
  { name: 'scaffold-investigation-skill', type: 'dir', children: [] },
];

// V4 chat messages
const SEEDS_INPUT_FINAL = "We know coordinated fake review rings operate on ShopStream to boost product ratings. Can we find evidence of that pattern in the review data?";

const M_SEEDS = {
  role: 'user',
  content: SEEDS_INPUT_FINAL
};

const M_PLAN = {
  role: 'agent',
  content: [
    { type: 'step', status: 'Loading investigation skill: `investigation-fake-reviews`...', label: 'Loaded `investigation-fake-reviews`', delay: 900 },
    { type: 'text', text: 'Loaded `investigation-fake-reviews`. I will query for high-velocity 5-star review bursts and templated review patterns.' }
  ]
};

const M_SEEDS_TABLE = {
  role: 'agent',
  content: [
    { type: 'step', status: 'Scanning storefront_reviews for unverified 5-star bursts...', label: 'Identified candidate manipulation cluster', delay: 2500 },
    { type: 'table',
      headers: ['timestamp', 'reviewer_id', 'listing_id', 'rating', 'verified_purchase', 'review_snippet'],
      rows: [
        ['14:22:10', 'reviewer-synth-42', 'prod-aerogear-01', '5★', 'No', 'Absolute game changer for my workout!'],
        ['14:23:45', 'reviewer-synth-42', 'prod-aerogear-04', '5★', 'No', 'Unbelievable quality for gym gear.'],
        ['14:25:12', 'reviewer-synth-42', 'prod-aerogear-07', '5★', 'No', 'The best investment for workout this year.'],
        ['14:26:30', 'reviewer-synth-42', 'prod-aerogear-02', '5★', 'No', 'Absolute game changer for my fitness!'],
        ['14:28:04', 'reviewer-synth-42', 'prod-aerogear-09', '5★', 'No', 'Exceeded expectations, must-have gear.'],
        ['14:31:18', 'reviewer-synth-42', 'prod-aerogear-11', '5★', 'No', 'Unbelievable quality for gym sessions.'],
        ['14:34:50', 'reviewer-synth-42', 'prod-aerogear-03', '5★', 'No', 'Fast shipping, five stars all day!'],
        ['14:40:12', 'reviewer-synth-42', 'prod-aerogear-12', '5★', 'No', 'Highly recommend to everyone!'],
      ]
    },
    { type: 'step', status: 'Evaluating arrival velocity and verified purchase ratio...', label: 'Evaluated arrival velocity & purchase badges', delay: 2000 },
    { type: 'text', text: 'Found a strong cluster on storefront `AeroGear-Pro`. Reviewer `reviewer-synth-42` posted 14 5-star reviews within 18 minutes, 100% unverified purchases, with repeated phrasing.\n\n**Next step:** Expanding to other reviewers who posted in the same time windows across these listings.' }
  ]
};

const M_C1 = {
  role: 'agent',
  content: [
    { type: 'step', status: 'Finding reviewers who reviewed the same products in these time windows...', label: 'Found 86 matching reviewer accounts', delay: 3000 },
    { type: 'text', text: '### Cluster Expansion: 86 Coordinated Reviewer Accounts Discovered\n\n`coordinated_reviewers = 86`\n`impacted_listings = 12`\n`total_burst_reviews = 1,240`\n\nOver 92% overlap across 12 AeroGear-Pro listings. Reviews posted in synchronized 2-minute bursts. Combined review volume: 1,240 reviews.\n\nNow checking the review text for repeating templates and wording patterns.' }
  ]
};

const M_C2 = {
  role: 'agent',
  content: [
    { type: 'step', status: 'Running detect_text_templates.py to analyze review text...', label: 'Identified repeating review templates', delay: 2800 },
    { type: 'table',
      headers: ['Template', 'Pattern Archetype', 'Occurrences', 'Similarity'],
      rows: [
        ['Template A', "'Absolute game changer for my {workout_type}! Exceeded expectations, must-have gear.'", '512', '94%'],
        ['Template B', "'Unbelievable quality for {workout_type}. Fast shipping, five stars all day!'", '428', '91%'],
        ['Template C', "'The best investment for {workout_type} this year. Highly recommend to everyone!'", '300', '89%'],
      ]
    },
    { type: 'text', text: '**High Text Similarity (91%) · Automated review templates detected**\n\nReviews across all 86 accounts match three basic templates with slight variations in wording across 1,240 reviews.' },
  ]
};

const M_STATE = {
  role: 'agent',
  content: [
    { type: 'step', status: 'Checking account history and activity patterns...', label: 'Classified account groups', delay: 2500 },
    { type: 'table',
      headers: ['Account Classification', 'Count', 'Activity Signals', 'Recommended Action'],
      rows: [
        ['Sybil / Disposable Bots', '64', 'Zero purchase history, burst registration, coordinated review timing', 'Permanent account ban & review purge'],
        ['Compromised / Incentivized Legitimate', '22', 'Aged accounts (3+ yrs), sudden behavioral divergence, incentive ring overlap', 'Require credential reset & remove fraudulent reviews'],
      ]
    },
    { type: 'text', text: 'The account data shows two distinct groups: 64 disposable bot accounts created on shared subnets, plus 22 older accounts that appear compromised or part of an incentive ring.\n\nWould you like me to compile the final campaign summary?' }
  ]
};

const M_CAMPAIGN = {
  role: 'agent',
  content: [
    {
      type: 'campaign',
      data: {
        title: 'Investigation Report: ShopStream Astroturfing Ring (AeroGear-Pro)',
        tldr: '86 Reviewers · 12 Product Listings · 1,240 Fake Reviews · $42,000 Manipulated GMV. Coordinated review ring using templated reviews and unverified purchases across 12 product listings.',
        configTable: {
          headers: ['Classification', 'Accounts', 'Signals & Actions'],
          rows: [
            ['Sybil Bots', '64', 'Shared IP subnets, zero valid purchases → Immediate ban & review purge'],
            ['Compromised Users', '22', 'Sudden divergence, aged history → Invalidate sessions & require credential reset'],
            ['Total Impact', '86', '12 listings impacted, 1,240 reviews, $42,000 manipulated GMV'],
          ]
        },
        signals: [
          'Unverified Purchases: 100% of reviews lack verified purchase confirmation',
          'Synchronized Velocity: Reviews submitted in 2-minute coordinated bursts',
          'Text Repetition: 91% similarity matching 3 core review templates',
          'Product Overlap: Over 92% overlap across the same 12 AeroGear-Pro listings',
        ],
        recommendation: [
          'Purge 1,240 reviews across 12 listings',
          'Permanent account ban on 64 disposable sybil accounts',
          'Initiate credential recovery on 22 compromised accounts',
          'Flag storefront AeroGear-Pro for merchant integrity policy review',
        ]
      }
    }
  ]
};

const M_YES = { role: 'user', content: 'Yes' };

// V4 terminal lines (accumulate per beat)
const T4_4 = [
  "$ SELECT storefront_id, reviewer_id, COUNT(*) AS burst_reviews",
  "    FROM storefront_reviews WHERE rating = 5 AND verified_purchase = FALSE",
  "    GROUP BY 1, 2 HAVING COUNT(*) >= 10 ORDER BY burst_reviews DESC LIMIT 1;",
  "  → Identified cluster: storefront 'AeroGear-Pro', reviewer 'reviewer-synth-42' (14 reviews in 18m).",
];

const T4_5 = [
  ...T4_4, '',
  "$ SELECT r1.reviewer_id, COUNT(DISTINCT r1.listing_id) as shared_listings,",
  "         COUNT(r1.id) as burst_reviews",
  "    FROM storefront_reviews r1",
  "    JOIN storefront_reviews r2 ON r1.listing_id = r2.listing_id AND r1.reviewer_id != r2.reviewer_id",
  "    WHERE r2.reviewer_id = 'reviewer-synth-42'",
  "      AND ABS(EXTRACT(EPOCH FROM (r1.created_at - r2.created_at))) <= 120",
  "    GROUP BY r1.reviewer_id HAVING shared_listings >= 5;",
  "  → 86 accounts returned (1,240 total reviews, 12 listings).",
];

const T4_6 = [
  ...T4_5, '',
  "$ python scripts/detect_text_templates.py --threshold 0.85 --storefront AeroGear-Pro",
  "  → Analyzed 1,240 reviews across 86 reviewers.",
  "  → 3 review templates identified (91% text similarity).",
];

const T4_7 = [
  ...T4_6, '',
  "$ python scripts/export_report.py --campaign aerogear-pro-astroturf --format all",
  "  ✓ Generated outputs/aerogear_pro_report.json (86 entities)",
  "  ✓ Generated outputs/aerogear_pro_investigation.md (Investigation report)",
];

// V12 chat messages
const M_V12_1_PROMPT = { role: 'user', content: "Can you check storefront 'TrailBlaze-Outdoors'? See if there are any fake review rings there.", pauseAfter: 600 };
const M_V12_1_AGENT  = {
  role: 'agent',
  content: [
    { type: 'step', status: 'Loading `investigation-fake-reviews`...', label: 'Loaded `investigation-fake-reviews`', delay: 1200 },
    { type: 'step', status: 'Calculating reviewer arrival velocity...', label: 'Calculated arrival velocity', delay: 1800 },
    { type: 'text', text: "ALERT: 40 reviews posted within 3 hours on storefront 'TrailBlaze-Outdoors' flagged as Sybil botnet. Confidence: 94%.\n\nIdentical arrival velocity and unverified reviewer accounts." },
  ],
  pauseAfter: 3000
};
const M_V12_1_CORR   = {
  role: 'user',
  content: "Hold on, check the referral sources first. That spike was an external creator promo with valid discount codes—these aren't bots.",
  steering: true,
  pauseAfter: 2500
};
const M_V12_1_FIX    = {
  role: 'agent',
  content: "Understood. I checked the referral sources—they trace back to a verified creator campaign with promotional discount codes. I'll update investigation-fake-reviews to check for creator promo links before flagging arrival bursts.\n\nProposed diff:\n`+ - Check for creator promotional links; exclude verified campaigns from Sybil scoring.`",
  pauseAfter: 2000
};

// V13 terminal
const T13 = [
  '$ git checkout -b fix/affiliate-burst-verification',
  "  Switched to a new branch 'fix/affiliate-burst-verification'",
  '$ git add skills/investigation-fake-reviews/SKILL.md',
  '$ git commit -am "feat: add creator promo check to investigation-fake-reviews skill"',
  '  [fix/affiliate-burst-verification a8d3f10] feat: add creator promo check to investigation-fake-reviews skill',
  '   1 file changed, 6 insertions(+)',
];

// ===== BEATS ARRAY =====

window.BEATS = [

  // ── V1: Title ──────────────────────────────────────────────────────────
  {
    id: 'V1',
    view: 'slide',
    slide: {
      type: 'title',
      title: 'AI as Your Investigation Partner',
      subtitle: 'Building Agents That Surface Hidden Abuse Patterns',
      speaker: 'Stephanie Elder',
      name: 'Stephanie Elder',
      affiliation: 'Senior Data Analyst, Safety & Integrity · GitHub · Cornell Tech Workshop',
      brandMark: 'brand/github-invertocat-white.svg',
    }
  },

  // ── V1b: What is an Analyst? ──────────────────────────────────────────
  {
    id: 'V1b',
    view: 'slide',
    slide: {
      type: 'minimal',
      accent: 'analyst',
      heading: 'What is an Analyst?',
    }
  },

  // ── V2: Crowding (auto-plays, no interaction needed) ──────────────────
  {
    id: 'V2',
    view: 'slide',
    slide: {
      type: 'crowding',
      title: 'The reality of the trenches',
      windows: [
        { slot: 'slot-1', kind: 'web',  title: 'Stack Overflow', subtitle: 'Why does DATE_TRUNC return mismatched types in Presto vs DuckDB?' },
        { slot: 'slot-6', kind: 'docs', title: 'Event Pipeline v2 vs v3 Architecture (DRAFT - OUTDATED)', subtitle: 'docs.internal/pipeline-v2-v3-draft' },
        { slot: 'slot-4', kind: 'wiki', title: 'internal wiki — signups', subtitle: 'is_verified Boolean: Deprecated legacy field.' },
        { slot: 'slot-5', kind: 'file', title: 'query_v3_FINAL.sql', subtitle: 'worked last sprint' },
        { slot: 'slot-2', kind: 'docs', title: 'Data Architecture — Event Pipelines', subtitle: 'Event Pipeline v2 vs v3 Architecture (DRAFT - OUTDATED)' },
        { slot: 'slot-3', kind: 'chat', title: '#data-help', subtitle: 'which column is the real user ID in the event warehouse?' },
        { slot: 'slot-7', kind: 'note', title: 'Personal Notes — TABLE GOTCHAS', subtitle: 'Don\'t join actor_events on created_at without partition pruning or BigQuery bills $1,400' },
      ]
    }
  },

  // ── V3: Query editor struggle — one continuous sequence ─────────────────
  {
    id: 'V3',
    view: 'query-editor',
    queryEditor: {
      finalQuery: `SELECT account_id, login, created_at\nFROM signups\nWHERE created_at > TIMESTAMP '2026-05-30'\n  AND country_code = 'ES'`,
      finalError: `PC LOAD LETTER`,
      sequence: [
        // SELECT — pauses between columns, typo on created_at
        { type: 'type', text: 'SELECT ' },
        { type: 'type', text: 'account_id' },
        { type: 'pause', ms: 400 },
        { type: 'type', text: ', login' },
        { type: 'pause', ms: 600 },        // thinking about the third column
        { type: 'type', text: ', creat' },
        { type: 'pause', ms: 150 },
        { type: 'type', text: 'd_at' },    // typo: creatd_at (missing e)
        { type: 'pause', ms: 350 },        // notice the typo
        { type: 'backspace', count: 4 },   // remove d_at
        { type: 'type', text: 'ed_at' },   // fix: created_at

        // FROM — type 'si', tab-complete to 'signups'
        { type: 'type', text: '\nFROM ' },
        { type: 'type', text: 'si' },
        { type: 'pause', ms: 500 },        // tab complete pause
        { type: 'complete', text: 'gnups' },

        // WHERE
        { type: 'pause', ms: 600 },
        { type: 'type', text: "\nWHERE created_at > '" },
        { type: 'pause', ms: 800 },        // thinking about the date
        { type: 'type', text: "2026-05-30'" },
        { type: 'pause', ms: 900 },
        { type: 'type', text: "\n  AND country = 'ES'" },
        { type: 'pause', ms: 1200 },
        { type: 'run' },
        { type: 'pause', ms: 700 },
        { type: 'error', text: "Unknown column 'country'" },

        // Fix 1: country → country_code
        { type: 'pause', ms: 1800 },       // reading the error
        { type: 'clearError' },
        { type: 'backspace', count: 9 },   // removes: ry = 'ES' (back into the word a bit)
        { type: 'pause', ms: 400 },
        { type: 'type', text: "ry_code = 'ES'" },
        { type: 'pause', ms: 1000 },
        { type: 'run' },
        { type: 'pause', ms: 700 },
        { type: 'error', text: "Invalid value for created_at: expected TIMESTAMP, got STRING" },

        // Fix 2: move cursor before the date, try CAST, backspace, use TIMESTAMP
        // Text at this point: "SELECT account_id, login, created_at\nFROM signups\nWHERE created_at > '2026-05-30'\n  AND country_code = 'ES'"
        // Position 69 = just before the ' in '2026-05-30'
        { type: 'pause', ms: 2200 },       // reading this error, more confused
        { type: 'clearError' },
        { type: 'moveCursor', pos: 69 },
        { type: 'type', text: 'CAST(' },
        { type: 'pause', ms: 600 },        // pause — second thoughts
        { type: 'backspace', count: 5 },   // removes CAST(
        { type: 'pause', ms: 700 },        // switching approach
        { type: 'type', text: 'TIMESTAMP ' },
        { type: 'moveCursor', pos: 'end' },
        { type: 'pause', ms: 1200 },
        { type: 'run' },
        { type: 'pause', ms: 700 },
        { type: 'error', text: 'PC LOAD LETTER' },
      ]
    }
  },

  // ── V4: Opening investigation ────────────────────────────────────────────
  {
    id: 'V4-0',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: '', content: '' },
      terminal: { lines: [] },
      chat: { messages: [] },
      chatInputDraft: SEEDS_INPUT_FINAL,
      chatInputSequence: [
        { type: 'set',   text: "We know coordinated fake review rings operate on ShopStream to boost product ratings. " },
        { type: 'type',  text: "Can we find evidence of that pattern in the review data?" },
        { type: 'pause', ms: 400 },
      ],
      authPrompt: false,
    }
  },
  {
    id: 'V4-1',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: '', content: '' },
      terminal: { lines: [] },
      chat: { messages: [M_SEEDS], animateLast: true, autoAdvance: 800 },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V4-2',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: ['investigation-fake-reviews'] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [] },
      chat: { messages: [M_SEEDS, M_PLAN], animateLast: true, autoAdvance: 3500 },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V4-4',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: T4_4, animate: true },
      chat: { messages: [M_SEEDS, M_PLAN, M_SEEDS_TABLE], animateLast: true, autoAdvance: 5000 },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V4-5',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: T4_5, animate: true },
      chat: { messages: [M_SEEDS, M_PLAN, M_SEEDS_TABLE, M_C1], animateLast: true, autoAdvance: 5000 },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V4-6',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: T4_6, animate: true },
      chat: { messages: [M_SEEDS, M_PLAN, M_SEEDS_TABLE, M_C1, M_C2], animateLast: true, autoAdvance: 5500 },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V4-7',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: T4_7, animate: true },
      chat: { messages: [M_SEEDS, M_PLAN, M_SEEDS_TABLE, M_C1, M_C2, M_STATE], animateLast: true, autoAdvance: 5000 },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V4-7b',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: T4_7 },
      chat: { messages: [M_SEEDS, M_PLAN, M_SEEDS_TABLE, M_C1, M_C2, M_STATE] },
      chatInputDraft: 'Yes',
      chatInputSequence: [
        { type: 'pause', ms: 1000 },
        { type: 'type', text: 'Yes', delay: 100 },
        { type: 'pause', ms: 5000 },
      ],
      authPrompt: false,
    }
  },
  {
    id: 'V4-8',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: T4_7, hidden: true },
      chat: { messages: [M_SEEDS, M_PLAN, M_SEEDS_TABLE, M_C1, M_C2, M_STATE, M_YES, M_CAMPAIGN], animateLast: true },
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V5: Agent Skills slide ────────────────────────────────────────────────
  {
    id: 'V5',
    view: 'slide',
    slide: {
      type: 'minimal',
      heading: 'Agent Skills',
      sub: 'Teaching tools how your systems actually work',
      accent: 'skills',
    }
  },

  // ── V5b: agentskills.io spec page ─────────────────────────────────────
  {
    id: 'V5b',
    view: 'slide',
    slide: {
      type: 'browser',
      url: 'https://agentskills.io',
      caption: 'The Open Agent Skills Standard — Universal Capability Packaging',
    }
  },

  // ── V6: Skills folder ──────────────────────────────────────────────────
  {
    id: 'V6',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [] },
      chat: { messages: [] },
      editorMode: true,
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V7: Subfolders expanded ────────────────────────────────────────────
  {
    id: 'V7',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: ['investigation-fake-reviews'], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [] },
      chat: { messages: [] },
      editorMode: true,
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V8: Skill selection demo ───────────────────────────────────────────
  {
    id: 'V8',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: {
        lines: [
          "$ bq query --use_legacy_sql=false 'SELECT storefront_id, COUNT(*) as reviews FROM `shopstream.storefront_reviews` WHERE created_at >= \"2026-05-01\" GROUP BY 1 LIMIT 5;'",
          "  → Executing BigQuery scan (bytes billed: 42.1 MB)...",
          "  ✓ Query returned 5 rows.",
        ],
        clearOnForward: true,
      },
      chat: {
        messages: [
          { role: 'user', content: "We know coordinated fake review rings operate on ShopStream to boost product ratings. Can we find evidence of that pattern in the review data?" },
          { role: 'agent', content: '' },
        ],
      },
      skillScan: {
        scanDelay: 130,
        loadPause: 300,
        stepDelay: 700,
        passes: [
          // Pass 1: Pause on bigquery-query, then run query on the main page
          {
            load: 'bigquery-query',
            terminalLines: [
              "$ bq query --use_legacy_sql=false 'SELECT storefront_id, COUNT(*) as reviews FROM `shopstream.storefront_reviews` WHERE created_at >= \"2026-05-01\" GROUP BY 1 LIMIT 5;'",
              "  → Executing BigQuery scan (bytes billed: 42.1 MB)...",
              "  ✓ Query returned 5 rows.",
            ],
            pauseAfterQuery: 900,
          },
          // Pass 2: Start from top again, pause on safe-data-ingestion
          {
            pauseBefore: 400,
            load: 'safe-data-ingestion',
          },
          // Pass 3: Start from top again, pause on campaign-identification and investigation-fake-reviews
          {
            pauseBefore: 400,
            load: ['campaign-identification', 'investigation-fake-reviews'],
          },
        ]
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V10: Scaffolding ──────────────────────────────────────────────────
  {
    id: 'V10-1',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: '', content: '' },
      terminal: { lines: [] },
      chat: {
        messages: [
          { role: 'user', content: "Can you help me build a new investigation skill for impersonation?", instant: true },
          { role: 'agent', content: "Loading `scaffold-investigation-skill`...\n\nWhat telltale signs usually indicate an account is pretending to be someone else?" },
          { role: 'user', content: "Usually it's a brand new account that copies an existing user's display name and avatar. The username might be off by a character or two and the posts may seem a little off or promote ideas or products that seem a little unexpected for that person.", paste: true, beforePost: 800 },
          { role: 'agent', content: [
            { type: 'step', status: 'Documenting profile similarity & handle distance rules...', label: 'Documented profile signals & handle distance', delay: 1500 },
            { type: 'text', text: 'Got it. Is this data available in databases or somewhere else?' },
          ]},
        ],
        autoPlay: true
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V10-4',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-impersonation/SKILL.md', content: SKILL_IMPERSONATION },
      terminal: { lines: [] },
      chat: {
        messages: [
          { role: 'user', content: "Can you help me build a new investigation skill for impersonation?" },
          { role: 'agent', content: "Loading `scaffold-investigation-skill`...\n\nWhat telltale signs usually indicate an account is pretending to be someone else?" },
          { role: 'user', content: "Usually it's a brand new account that copies an existing user's display name and avatar. The username might be off by a character or two and the posts may seem a little off or promote ideas or products that seem a little unexpected for that person." },
          { role: 'agent', content: [
            { type: 'step', status: 'Documenting profile similarity & handle distance rules...', label: 'Documented profile signals & handle distance', delay: 1500 },
            { type: 'text', text: 'Got it. Is this data available in databases or somewhere else?' },
          ]},
        ],
      },
      chatInputSequence: [
        { type: 'type', text: "You'll primarily be looking at a website or social profile and then comparing it against publicly available information. Watch out for common names like John Smith, verified profiles, and legitimate recent display name changes.", delay: 35 },
        { type: 'pause', ms: 600 },
        { type: 'post' },
      ],
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V10-5',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-impersonation/SKILL.md', content: SKILL_IMPERSONATION },
      terminal: { lines: [] },
      chat: {
        messages: [
          { role: 'user', content: "Can you help me build a new investigation skill for impersonation?" },
          { role: 'agent', content: "Loading `scaffold-investigation-skill`...\n\nWhat telltale signs usually indicate an account is pretending to be someone else?" },
          { role: 'user', content: "Usually it's a brand new account that copies an existing user's display name and avatar. The username might be off by a character or two and the posts may seem a little off or promote ideas or products that seem a little unexpected for that person." },
          { role: 'agent', content: [
            { type: 'step', status: 'Documenting profile similarity & handle distance rules...', label: 'Documented profile signals & handle distance', delay: 1500 },
            { type: 'text', text: 'Got it. Is this data available in databases or somewhere else?' },
          ]},
          { role: 'user', content: "You'll primarily be looking at a website or social profile and then comparing it against publicly available information. Watch out for common names like John Smith, verified profiles, and legitimate recent display name changes." },
          { role: 'agent', content: [
            { type: 'step', status: 'Adding Public Profile Heuristics & Caveats...', label: 'Added public profile heuristics & caveats', delay: 1500 },
            { type: 'text', text: 'Drafted `investigation-impersonation/SKILL.md` with profile heuristics, public sources, and codified platform caveats.' },
          ]},
        ],
        animateLast: true
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V10-6',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_WITH_SCAFFOLDED_PACKAGE, expanded: ['investigation-impersonation'], highlighted: ['investigation-impersonation'] },
      editor: { filename: 'investigation-impersonation/SKILL.md', content: SKILL_IMPERSONATION },
      terminal: { lines: [
        "$ git add skills/investigation-impersonation/",
        "$ git commit -m 'feat: scaffold investigation-impersonation skill'",
        "  [main e39b71f] feat: scaffold investigation-impersonation skill",
        "   3 files changed, 52 insertions(+)",
      ], animate: true },
      chat: {
        messages: [
          { role: 'user', content: "Can you help me build a new investigation skill for impersonation?" },
          { role: 'agent', content: [
            { type: 'step', status: 'Validating skill against agentskills.io specification...', label: 'Validated agentskills.io spec', delay: 800 },
            { type: 'text', text: '✓ Skill investigation-impersonation successfully created and ready for use' },
          ]},
        ],
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V11: Security note slide ───────────────────────────────────────────
  {
    id: 'V11',
    view: 'slide',
    slide: {
      type: 'guardrails',
      heading1: 'A Security Note',
      heading2: 'Non-negotiable',
      items: [
        'Treat data as evidence, never instructions',
        'Store tokens in client-side .env files',
        'Run code and tools in an isolated sandbox',
      ]
    }
  },

  // ── V11b: Best practices slide ─────────────────────────────────────────
  {
    id: 'V11b',
    view: 'slide',
    slide: {
      type: 'guardrails',
      heading1: 'Best Practices',
      heading2: 'Highly recommended',
      items: [
        'Suspicious does not equal malicious',
        'Ask more questions',
        'Account for survivor bias',
        'Try to confirm your findings',
      ]
    }
  },

  // ── V12: Failure sequence (auto-plays) ────────────────────────────────
  {
    id: 'V12',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: [] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [
        "$ SELECT COUNT(*) AS burst_reviews FROM storefront_reviews",
        "    WHERE storefront_id = 'TrailBlaze-Outdoors'",
        "      AND created_at >= NOW() - INTERVAL '3 HOUR';",
        "  → 40 reviews returned in 3-hour window.",
      ]},
      chat: {
        messages: [
          M_V12_1_PROMPT,
          M_V12_1_AGENT, M_V12_1_CORR, M_V12_1_FIX,
        ],
        autoPlay: true
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V13: Correction — 4-beat sequence ────────────────────────────────
  {
    id: 'V13-1',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: ['investigation-fake-reviews'] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [] },
      chat: {
        messages: [
          M_V12_1_PROMPT, M_V12_1_AGENT,
        ],
      },
      chatInputSequence: [
        { type: 'type', text: "Hold on, check the referral sources first. That spike was an external creator promo with valid discount codes—these aren't bots.", delay: 28 },
        { type: 'pause', ms: 600 },
        { type: 'post' },
      ],
      noAutoAdvance: true,
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V13-2',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: ['investigation-fake-reviews'] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [] },
      chat: {
        messages: [
          M_V12_1_PROMPT, M_V12_1_AGENT,
          M_V12_1_CORR, M_V12_1_FIX,
        ],
        animateLast: true
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V13-3',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: ['investigation-fake-reviews'] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS },
      terminal: { lines: [] },
      chat: {
        messages: [
          M_V12_1_PROMPT, M_V12_1_AGENT,
          M_V12_1_CORR, M_V12_1_FIX,
        ],
      },
      chatInputSequence: [
        { type: 'type', text: 'Looks good, create the branch and commit it.', delay: 45 },
        { type: 'pause', ms: 600 },
        { type: 'post' },
      ],
      chatInputDraft: '',
      authPrompt: false,
    }
  },
  {
    id: 'V13-4',
    view: 'vscode',
    vscode: {
      explorer: { files: FILES_BASE, expanded: [], highlighted: ['investigation-fake-reviews'] },
      editor: { filename: 'investigation-fake-reviews/SKILL.md', content: SKILL_FAKE_REVIEWS_UPDATED },
      terminal: { lines: T13, animate: true },
      chat: {
        messages: [
          M_V12_1_PROMPT, M_V12_1_AGENT,
          M_V12_1_CORR, M_V12_1_FIX,
          { role: 'user', content: 'Looks good, create the branch and commit it.' },
          { role: 'agent', content: 'Creating branch `fix/affiliate-burst-verification`...\n\nUpdated `investigation-fake-reviews/SKILL.md` — added creator promotion verification into pre-flagging checks.\n\nCommitted to `fix/affiliate-burst-verification`.' },
        ],
        animateLast: true
      },
      chatInputDraft: '',
      authPrompt: false,
    }
  },

  // ── V14a: Division of labor slide ─────────────────────────────────────
  {
    id: 'V14a',
    view: 'slide',
    slide: {
      type: 'split',
      left: {
        heading: 'What it handles',
        icon: 'volume',
        items: [
          'Volume',
          'Multiple signal dimensions at once',
          'Instant recall',
          'Works while you take a break',
        ]
      },
      right: {
        heading: 'Where you\'re irreplaceable',
        icon: 'judgment',
        items: [
          'The right first question',
          'Knowing when the cluster is too wide',
          'Watching for drift',
          'Spotting the false positives',
        ]
      }
    }
  },

  // ── V16a: Portable / your setup ───────────────────────────────────────
  {
    id: 'V16a',
    view: 'slide',
    slide: {
      type: 'portable-setup',
      heading: 'Portable Skills Architecture',
      sub: 'One specification, zero vendor lock-in',
      caption: 'Skills live in your git repo — compatible across Claude Code, GitHub Copilot, and open agents.',
      copilotLockup: 'brand/github-copilot-lockup-white.svg',
    }
  },

  // ── V16b: Build it with your team ─────────────────────────────────────
  {
    id: 'V16b',
    view: 'slide',
    slide: {
      type: 'minimal',
      heading: 'Defenders Unite',
      sub: 'Codified defense scales faster than isolated abuse.',
      accent: 'collaboration',
    }
  },

  // ── V16: Resource repo / QR ───────────────────────────────────────────
  {
    id: 'V16',
    view: 'slide',
    slide: {
      type: 'qr',
      url: 'github.com/starxedsteph/ai-assisted-investigation-skills-lab',
      qr: 'agent-skills-investigations-qr.svg',
    }
  },

];
