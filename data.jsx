/* Sample data — five tickers, plus shared records */

const TICKERS = {
  NVDA: {
    ticker: "NVDA", company: "NVIDIA Corp.",
    sector: "Information Technology",
    industry: "Semiconductors",
    subIndustry: "Accelerated Compute",
    marketCap: "$3.41T",
    price: 1142.18, dayChg: +1.87, weekChg: +4.2,
    lastUpdated: "May 5, 2026 · 4:01pm ET",
    status: { label: "Brief in progress", tone: "warn" },
    nextAction: "May 22 — Pre-earnings review",
    spark: [78,80,82,79,81,84,86,85,87,90,93,91,94,96,98,97,99,102,104,103,106,109,107,110,113,115,114,117,120,121],
    bull: [
      "Hyperscaler capex guides revised up again — 2026 build cycle still front-loaded.",
      "Blackwell Ultra ramp is gross-margin accretive vs. H200; mix shifts toward systems revenue.",
      "Sovereign AI deals (KSA, UAE, JP) add a second demand pillar beyond US clouds."
    ],
    bear: [
      "ASIC competition (TPU v6, MTIA, Maia) starting to absorb a real share of inference workloads.",
      "Customer concentration: top 4 buyers ≈ 45% of DC revenue. Any pause = visible miss.",
      "Forward P/E ~33× already prices in another two years of >40% DC growth."
    ],
    risks: [
      "China export licensing — H20 follow-on still TBD.",
      "Power & cooling bottlenecks slipping system deliveries by 1–2 quarters.",
      "Inventory commitment to TSMC CoWoS-L hard to unwind if a cloud blinks."
    ],
    changed: [
      "GS lifted DC revenue est. for FY27 by 6% post-conference.",
      "Insider Form 4: J. Huang sold 120k shares (10b5-1 plan).",
      "Cerebras filed S-1 amendment; first credible inference comp at scale."
    ]
  },
  AAPL: {
    ticker: "AAPL", company: "Apple Inc.",
    sector: "Information Technology",
    industry: "Tech Hardware, Storage & Peripherals",
    subIndustry: "Consumer Electronics",
    marketCap: "$3.02T",
    price: 198.42, dayChg: -0.42, weekChg: -1.1,
    lastUpdated: "May 5, 2026 · 4:00pm ET",
    status: { label: "Brief saved", tone: "ok" },
    nextAction: "Jul 30 — FY Q3 earnings",
    spark: [120,118,121,119,117,118,120,122,121,119,117,116,117,119,118,120,122,121,123,121,119,118,117,116,114,115,113,114,112,110],
    bull: [
      "Services run-rate $108B, gross margin 74%; mix continues to shift away from hardware cyclicality.",
      "Installed base now 2.3B active devices — durable, currency-hedged annuity.",
      "Apple Intelligence drives a tangible iPhone replacement cycle in CY26 (channel checks)."
    ],
    bear: [
      "China iPhone units down 9% YoY; Huawei Mate 70 closing the premium gap.",
      "Services scrutiny: DOJ + EU DMA + Epic remedies pressure App Store take-rate.",
      "AI narrative is reactive, not leading; no obvious moat in foundation models."
    ],
    risks: [
      "App Store take-rate compressed 2–4 pts under DMA — direct EPS headwind.",
      "China revenue concentration (~17%) + supply chain (~95% assembled in CN/IN).",
      "Vision Pro Gen 2 launch slipping past holiday window."
    ],
    changed: [
      "EU DMA compliance re-review opened — fresh fines likely.",
      "Buyback authorized $110B (largest ever).",
      "AI partnership with Anthropic broadened to enterprise pilots."
    ]
  },
  SMCI: {
    ticker: "SMCI", company: "Super Micro Computer",
    sector: "Information Technology",
    industry: "Tech Hardware, Storage & Peripherals",
    subIndustry: "AI Server Systems",
    marketCap: "$48.2B",
    price: 802.31, dayChg: +3.41, weekChg: +9.4,
    lastUpdated: "May 5, 2026 · 4:00pm ET",
    status: { label: "Hidden risks pending", tone: "warn" },
    nextAction: "May 12 — Auditor follow-up review",
    spark: [40,44,49,55,60,62,58,55,60,68,72,70,76,82,79,84,90,88,92,98,95,100,108,112,109,115,120,118,124,128],
    bull: [
      "Direct-liquid-cooled GB200 racks shipping at scale — first-mover in NVL72 systems.",
      "Backlog $5.6B, +88% YoY; Tier-2 cloud demand still un-served.",
      "Margin recovery story if component pricing stabilizes in 2H."
    ],
    bear: [
      "Gross margin 11.3% — half of HPE / Dell systems business.",
      "Working capital intensity; receivables stretching past 90 days for two large customers.",
      "Hindenburg follow-up + delayed 10-K still hangs over the multiple."
    ],
    risks: [
      "Customer concentration: one hyperscaler ≈ 23% of revenue.",
      "Auditor turnover (BDO replaced E&Y) — restatement risk not zero.",
      "Component allocation entirely dependent on NVDA prioritization."
    ],
    changed: [
      "10-K filed 2 weeks late; no material restatement.",
      "Added to Nasdaq-100 (passive flow tailwind).",
      "Citron published a long note (rare reversal)."
    ]
  },
  TSLA: {
    ticker: "TSLA", company: "Tesla, Inc.",
    sector: "Consumer Discretionary",
    industry: "Automobiles",
    subIndustry: "EV / Autonomy",
    marketCap: "$612B",
    price: 192.04, dayChg: -1.23, weekChg: -3.8,
    lastUpdated: "May 5, 2026 · 4:00pm ET",
    status: { label: "Watch only", tone: "neutral" },
    nextAction: "Jun 10 — Robotaxi event",
    spark: [200,202,198,196,195,193,190,188,191,189,187,185,184,186,188,190,192,189,187,185,184,182,180,179,181,183,182,180,178,176],
    bull: [
      "FSD v13 take-rate quietly rising (15%→22% in 2 quarters).",
      "Energy storage gross margin 30%+ and growing faster than auto.",
      "Optimus pilot deployed at 2 Texas factories — first revenue line item."
    ],
    bear: [
      "Auto gross margin (ex-credits) 13.6%, a multi-year low.",
      "BYD/Xiaomi pricing pressure now visible in Europe + ANZ.",
      "Robotaxi narrative >50% of equity value by sell-side SOTP."
    ],
    risks: [
      "Brand damage in CA / EU; reg-credit revenue rolls off.",
      "Capex doubling for Cortex / Dojo with no near-term revenue match.",
      "Litigation tied to FSD marketing claims expanding."
    ],
    changed: [
      "Robotaxi date pushed from Aug to Oct.",
      "China registrations -22% MoM.",
      "Energy backlog disclosed at 32 GWh."
    ]
  },
  MSFT: {
    ticker: "MSFT", company: "Microsoft Corp.",
    sector: "Information Technology",
    industry: "Systems Software",
    subIndustry: "Cloud + Productivity",
    marketCap: "$3.18T",
    price: 432.90, dayChg: +0.61, weekChg: +1.4,
    lastUpdated: "May 5, 2026 · 4:01pm ET",
    status: { label: "Brief saved", tone: "ok" },
    nextAction: "Jul 24 — FY Q4 earnings",
    spark: [60,62,63,65,64,66,68,70,71,72,74,73,75,77,78,80,82,81,83,85,86,87,88,90,89,91,92,93,94,96],
    bull: [
      "Azure AI revenue annualizing $13B+; Copilot attach climbing across E5 base.",
      "Capacity catching up — fewer 'we're sold out' caveats on the call.",
      "Activision integration ahead of plan; Game Pass margin step-function."
    ],
    bear: [
      "FCF growth lagging revenue as capex hits $90B+ run-rate.",
      "OpenAI relationship is both a moat AND a single point of failure.",
      "Multiple at 33× FY27 EPS — priced for flawless execution."
    ],
    risks: [
      "FTC re-opens Activision review on bundling complaints.",
      "Capex elasticity: any AI pause = the largest D&A overhang in history.",
      "OpenAI governance instability."
    ],
    changed: [
      "OpenAI restructuring finalized — MSFT economic interest clarified at 33%.",
      "Capex guide raised to $95B for FY26.",
      "Defense Cloud contract win ($1.4B over 5y)."
    ]
  }
};

const SECTORS = ["Information Technology","Consumer Discretionary","Health Care","Financials","Energy","Industrials","Communication Services"];

const COMPETITORS = {
  NVDA: {
    direct: [
      { co:"Advanced Micro Devices", tk:"AMD", mc:"$268B", rev:"+24%", marg:"49.1%", val:"38× FY26", perf:"+18% YTD", strength:"Inference price/perf on MI325X", weakness:"Software stack still trails CUDA" },
      { co:"Intel",                  tk:"INTC",mc:"$133B", rev:"+3%",  marg:"35.0%", val:"22× FY26", perf:"-8% YTD",  strength:"US fab capacity / IRA tailwind", weakness:"Gaudi roadmap slipping again" },
      { co:"Broadcom",               tk:"AVGO",mc:"$682B", rev:"+22%", marg:"63.7%", val:"31× FY26", perf:"+27% YTD", strength:"Custom ASIC TAM expanding", weakness:"Concentrated to 3 hyperscalers" },
    ],
    indirect: [
      { co:"Cerebras Systems", tk:"CBRS",mc:"$8.4B (S-1)",rev:"+140%",marg:"-",      val:"-",         perf:"-",        strength:"Wafer-scale inference economics", weakness:"Pre-revenue scale" },
      { co:"Marvell",          tk:"MRVL",mc:"$72B",       rev:"+14%", marg:"60.2%",  val:"35× FY26",  perf:"+11% YTD", strength:"Custom AI silicon for AWS",     weakness:"Telco end-market drag" },
      { co:"TSMC",             tk:"TSM", mc:"$842B",      rev:"+31%", marg:"54.1%",  val:"21× FY26",  perf:"+22% YTD", strength:"CoWoS supply gatekeeper",       weakness:"Geopolitical tail risk" },
    ],
    ranking: { leader:"NVDA", challenger:"AMD", niche:"Cerebras", vulnerable:"Intel" }
  },
  AAPL: {
    direct: [
      { co:"Samsung Electronics", tk:"005930.KS", mc:"$340B", rev:"+8%",  marg:"38%",  val:"14× FY26", perf:"+6% YTD",  strength:"Vertical: panels + memory", weakness:"Service mix far smaller" },
      { co:"Alphabet",            tk:"GOOGL",     mc:"$2.0T", rev:"+13%", marg:"55%",  val:"22× FY26", perf:"+9% YTD",  strength:"AI-native search + Pixel",  weakness:"Hardware share still <5%" },
      { co:"Xiaomi",              tk:"1810.HK",   mc:"$56B",  rev:"+22%", marg:"21%",  val:"19× FY26", perf:"+34% YTD", strength:"Premium gain in China",     weakness:"Margin still thin" },
    ],
    indirect: [
      { co:"Meta Platforms", tk:"META", mc:"$1.27T", rev:"+17%", marg:"42%", val:"24× FY26", perf:"+18% YTD", strength:"Wearables / Quest", weakness:"No first-party phone" },
      { co:"Sony",           tk:"SONY", mc:"$112B",  rev:"+5%",  marg:"12%", val:"17× FY26", perf:"+4% YTD",  strength:"Sensor / IP",       weakness:"No platform pull" },
    ],
    ranking: { leader:"AAPL", challenger:"GOOGL", niche:"Xiaomi", vulnerable:"Sony" }
  },
  SMCI: {
    direct: [
      { co:"Dell Technologies",      tk:"DELL", mc:"$108B", rev:"+23%", marg:"22.9%", val:"15× FY26", perf:"+12% YTD", strength:"Channel + financing arm",  weakness:"Slower DLC ramp" },
      { co:"Hewlett Packard Enterprise",tk:"HPE",mc:"$28B", rev:"+9%",  marg:"33.1%", val:"11× FY26", perf:"+5% YTD",  strength:"Cray HPC heritage",        weakness:"AI-system share single digits" },
      { co:"Lenovo",                  tk:"992.HK",mc:"$18B", rev:"+11%", marg:"17.4%", val:"9× FY26",  perf:"+8% YTD",  strength:"Cost / supply chain",      weakness:"Limited US Fed access" },
    ],
    indirect: [
      { co:"Foxconn", tk:"2317.TW", mc:"$84B",  rev:"+19%", marg:"6.1%",  val:"12× FY26", perf:"+24% YTD", strength:"NVL72 ODM contracts",   weakness:"Brand-less margin" },
      { co:"Quanta",  tk:"2382.TW", mc:"$110B", rev:"+33%", marg:"7.8%",  val:"21× FY26", perf:"+38% YTD", strength:"Hyperscaler ODM scale",  weakness:"Customer concentration" },
    ],
    ranking: { leader:"DELL", challenger:"SMCI", niche:"HPE", vulnerable:"Lenovo" }
  },
  TSLA: {
    direct: [
      { co:"BYD",       tk:"1211.HK", mc:"$84B",  rev:"+30%", marg:"22%", val:"17× FY26", perf:"+12% YTD", strength:"Vertical EV + battery",  weakness:"Premium brand TBD outside CN" },
      { co:"Rivian",    tk:"RIVN",   mc:"$11B",  rev:"+38%", marg:"-9%", val:"n/m",       perf:"-22% YTD", strength:"R2 product cycle",       weakness:"Cash runway" },
      { co:"Lucid",     tk:"LCID",   mc:"$5B",   rev:"+19%", marg:"-58%",val:"n/m",       perf:"-33% YTD", strength:"Powertrain efficiency",  weakness:"Scale economics" },
    ],
    indirect: [
      { co:"Waymo (Alphabet)", tk:"GOOGL", mc:"-",    rev:"-",   marg:"-", val:"-",         perf:"-",        strength:"Real robotaxi miles in 4 cities", weakness:"Hardware-light moat" },
      { co:"Xiaomi Auto",      tk:"1810.HK",mc:"$56B", rev:"+22%",marg:"-2%",val:"-",        perf:"+34% YTD", strength:"SU7 aggressive pricing",          weakness:"China-only for now" },
    ],
    ranking: { leader:"BYD", challenger:"TSLA", niche:"Rivian", vulnerable:"Lucid" }
  },
  MSFT: {
    direct: [
      { co:"Alphabet",   tk:"GOOGL", mc:"$2.0T", rev:"+13%", marg:"55%", val:"22× FY26", perf:"+9% YTD",  strength:"GCP AI margin & Gemini",   weakness:"Enterprise distribution" },
      { co:"Amazon",     tk:"AMZN",  mc:"$1.96T",rev:"+11%", marg:"49%", val:"32× FY26", perf:"+10% YTD", strength:"AWS scale & Trainium",    weakness:"AI app layer thin" },
      { co:"Oracle",     tk:"ORCL",  mc:"$385B", rev:"+8%",  marg:"43%", val:"21× FY26", perf:"+15% YTD", strength:"OCI capacity wins",        weakness:"Apps base still legacy" },
    ],
    indirect: [
      { co:"Salesforce",  tk:"CRM",  mc:"$258B", rev:"+9%",  marg:"77%", val:"24× FY26", perf:"+4% YTD",  strength:"Agentforce vertical",       weakness:"AI re-platform timing" },
      { co:"ServiceNow",  tk:"NOW",  mc:"$162B", rev:"+22%", marg:"79%", val:"45× FY26", perf:"+19% YTD", strength:"AI Workflow attach",        weakness:"Premium multiple" },
    ],
    ranking: { leader:"MSFT", challenger:"GOOGL", niche:"NOW", vulnerable:"ORCL" }
  }
};

const HEADLINES = {
  NVDA: [
    { date:"May 5", source:"Reuters",   sent:"bull", head:"NVIDIA discloses $4.2B Saudi sovereign AI commitment over 3 years", why:"Diversifies revenue away from US hyperscalers; supports the 2nd-pillar thesis.", url:"#" },
    { date:"May 4", source:"SEC 8-K",   sent:"neut", head:"Form 4: CEO sale of 120,000 shares under 10b5-1 plan", why:"Pre-scheduled — not a signal alone, but worth watching aggregate insider flow.", url:"#" },
    { date:"May 3", source:"The Information", sent:"bear", head:"Anthropic begins testing custom Trainium chips for inference workloads", why:"Partial workload migration would dent NVDA inference TAM by ~6% if scaled.", url:"#" },
    { date:"May 2", source:"FT",        sent:"bull", head:"TSMC says CoWoS-L capacity tripled vs. start of year", why:"Direct supply unlock for Blackwell Ultra ramp.", url:"#" },
    { date:"May 1", source:"Seeking Alpha", sent:"neut", head:"Buyside conference notes: cloud capex 'unchanged' into 2H", why:"Confirms steady demand but no upward revision — caps near-term beat magnitude.", url:"#" },
    { date:"Apr 30",source:"Bloomberg", sent:"bear", head:"Cerebras files updated S-1, prices roadshow for late May", why:"First scaled inference comp; could re-rate the inference narrative.", url:"#" },
  ],
  AAPL: [
    { date:"May 5", source:"WSJ",       sent:"bear", head:"EU opens fresh DMA review on App Store search-bidding", why:"Direct take-rate exposure; quantify with services revenue elasticity.", url:"#" },
    { date:"May 4", source:"Counterpoint", sent:"bear", head:"China premium phone share: Huawei 24%, Apple 19% in Q1", why:"First time Apple has not led the >$600 segment in mainland China.", url:"#" },
    { date:"May 3", source:"Bloomberg", sent:"bull", head:"Buyback raised to $110B; dividend +5%", why:"EPS support and strong capital-return signal.", url:"#" },
    { date:"May 2", source:"The Information", sent:"neut", head:"Vision Pro Gen 2 said to slip past Q4 launch window", why:"Removes a near-term catalyst, doesn't change the base business.", url:"#" },
    { date:"May 1", source:"Reuters",   sent:"bull", head:"Apple Intelligence rolls out to 12 new languages in iOS 19.4", why:"Broader installed-base addressable for the upgrade cycle thesis.", url:"#" },
  ],
  SMCI: [
    { date:"May 5", source:"SEC 10-Q",  sent:"neut", head:"10-Q filed; gross margin 11.3% (vs 13.4% YoY)", why:"Margin compression continues; track if 2H rebound remains in guide.", url:"#" },
    { date:"May 4", source:"DigiTimes", sent:"bull", head:"SMCI secures additional GB200 NVL72 allocation from NVDA", why:"Direct supply confirmation supports backlog conversion.", url:"#" },
    { date:"May 3", source:"Citron",    sent:"bull", head:"Citron publishes long note: 'fundamentals decoupled from narrative'", why:"Notable as a reversal from prior shorts; sentiment marker.", url:"#" },
    { date:"May 2", source:"Hindenburg",sent:"bear", head:"Hindenburg follow-up: questions on related-party logistics vendors", why:"Re-introduces governance overhang; watch for SEC subpoena disclosure.", url:"#" },
    { date:"May 1", source:"Reuters",   sent:"neut", head:"Auditor BDO confirms no material misstatement in FY24", why:"Reduces tail risk but does not fully close the issue.", url:"#" },
  ],
  TSLA: [
    { date:"May 5", source:"Bloomberg", sent:"bear", head:"China registrations -22% MoM in April", why:"Demand weakness in largest single market; check trade-in incentive impact.", url:"#" },
    { date:"May 4", source:"Reuters",   sent:"neut", head:"Robotaxi event moved from Aug 8 to Oct 10", why:"Slips a key narrative catalyst by 2 months.", url:"#" },
    { date:"May 3", source:"Electrek",  sent:"bull", head:"Energy backlog disclosed at 32 GWh — up from 22 GWh", why:"Supports the 'energy is the new auto' framing.", url:"#" },
    { date:"May 2", source:"FT",        sent:"bear", head:"BYD launches Seal-7 in EU at 14% under Model Y price", why:"Direct pricing pressure in Tesla's #2 region.", url:"#" },
    { date:"May 1", source:"X / Elon",  sent:"neut", head:"Optimus working in 2 TX factories doing 'real tasks'", why:"Anecdotal — not yet a revenue line.", url:"#" },
  ],
  MSFT: [
    { date:"May 5", source:"Reuters",   sent:"bull", head:"Microsoft signs $1.4B / 5y Defense Cloud expansion", why:"Anchors gov-cloud thesis; durable revenue.", url:"#" },
    { date:"May 4", source:"The Information", sent:"neut", head:"OpenAI restructure: MSFT economic interest fixed at 33%", why:"Removes a significant ambiguity; dilutive vs. prior implied stake.", url:"#" },
    { date:"May 3", source:"WSJ",       sent:"bear", head:"FY26 capex guide raised to $95B (was $80B)", why:"FCF growth gap widens; D&A overhang building.", url:"#" },
    { date:"May 2", source:"Bloomberg", sent:"bull", head:"Copilot enterprise seats hit 12M (vs 8M three months ago)", why:"Attach acceleration is the core bull driver.", url:"#" },
  ],
};

const WATCHLIST = [
  { id:"w1", tk:"NVDA", co:"NVIDIA",         cat:"Earnings watch",      bias:"Bullish",  pri:"High",   added:"Apr 12, 2026", reason:"Pre-earnings positioning",     next:"May 22, 2026", notes:"Compare DC guide vs whisper $32B." },
  { id:"w2", tk:"SMCI", co:"Super Micro",     cat:"High-risk/speculative",bias:"Neutral", pri:"Medium", added:"Mar 04, 2026", reason:"Margin recovery / governance",  next:"May 12, 2026", notes:"Auditor follow-up + 10-K read." },
  { id:"w3", tk:"AAPL", co:"Apple",           cat:"Long-term idea",       bias:"Neutral",  pri:"Low",    added:"Jan 09, 2026", reason:"Apple Intelligence cycle",      next:"Jul 30, 2026", notes:"Wait for FY Q3 print and EU outcome." },
  { id:"w4", tk:"TSLA", co:"Tesla",           cat:"Avoid list",           bias:"Bearish", pri:"Low",    added:"Feb 21, 2026", reason:"Auto margin + brand drag",      next:"Jun 10, 2026", notes:"Robotaxi event the only re-rating event." },
  { id:"w5", tk:"MSFT", co:"Microsoft",       cat:"Pullback watch",       bias:"Bullish", pri:"Medium", added:"Apr 28, 2026", reason:"Add on >5% pullback",          next:"Jul 24, 2026", notes:"Trim if capex/FCF gap widens further." },
  { id:"w6", tk:"AVGO", co:"Broadcom",        cat:"Breakout watch",       bias:"Bullish", pri:"Medium", added:"Apr 30, 2026", reason:"Custom ASIC TAM",               next:"Jun 05, 2026", notes:"Watch for new hyperscaler design win." },
  { id:"w7", tk:"AMD",  co:"Advanced Micro",  cat:"Earnings watch",       bias:"Neutral", pri:"Low",    added:"Apr 22, 2026", reason:"MI325 traction read",           next:"Aug 06, 2026", notes:"Want >$5.5B DC q for thesis to hold." },
];

const POSITIONS = [
  { id:"p1", tk:"NVDA", type:"Stock",          entry:"2024-08-12", price:"$118.40", thesis:"Long DC compute cycle; trim above 40× fwd.", risk:"China license / customer concentration", note:"Trim 10% on next +15% move; let core run.", status:"Open" },
  { id:"p2", tk:"AAPL", type:"Long-term hold", entry:"2018-03-02", price:"$ 43.10", thesis:"Services compounding + capital return.",      risk:"DMA, China share",                        note:"Hold; reinvest dividends.",                   status:"Open" },
  { id:"p3", tk:"MSFT", type:"Stock",          entry:"2023-11-30", price:"$378.10", thesis:"Azure AI + Copilot attach.",                 risk:"Capex / FCF gap",                          note:"Add 25% on -5% pullback.",                    status:"Open" },
  { id:"p4", tk:"TSLA", type:"Watch only",     entry:"—",          price:"—",       thesis:"No position; tracking robotaxi event.",       risk:"Narrative-driven volatility",              note:"Reassess after Oct 10 event.",                status:"Watch" },
  { id:"p5", tk:"SMCI", type:"Spread",         entry:"2026-04-08", price:"$650 / $850 Jul", thesis:"Range bound on auditor news.",       risk:"Tail event on restatement",                note:"Roll to Aug if Jul prints flat.",             status:"Open" },
];

const ACTIONS = [
  { id:"a1", tk:"NVDA", action:"Review before earnings",  due:"May 22, 2026", exp:"May 28, 2026", pri:"High",   status:"Pending",   notes:"DC guide whisper $32B vs cons $30.4B." },
  { id:"a2", tk:"SMCI", action:"Check after Fed event",   due:"May 12, 2026", exp:"May 19, 2026", pri:"Medium", status:"Pending",   notes:"Auditor + 10-K follow-through." },
  { id:"a3", tk:"AAPL", action:"Review thesis",           due:"Jun 02, 2026", exp:"Jul 30, 2026", pri:"Low",    status:"Scheduled", notes:"China share + DMA decision." },
  { id:"a4", tk:"MSFT", action:"Compare to sector",       due:"May 18, 2026", exp:"May 25, 2026", pri:"Medium", status:"Pending",   notes:"FCF / capex vs AMZN, GOOGL." },
  { id:"a5", tk:"TSLA", action:"Move to avoid list",      due:"May 09, 2026", exp:"—",            pri:"Low",    status:"Done",      notes:"Confirmed Apr 30." },
  { id:"a6", tk:"AVGO", action:"Revisit at support",      due:"May 14, 2026", exp:"May 30, 2026", pri:"Medium", status:"Pending",   notes:"$1,180 area." },
];

const PROMPTS = [
  { id:1, tag:"Business summary", title:"The Real Business",
    body:`Explain what this company actually does in plain English. Then explain how it makes money, who pays it, what drives revenue, what threatens revenue, and what most retail investors misunderstand about the business.` },
  { id:2, tag:"Industry map", title:"Industry Map",
    body:`Map the company's industry. Identify the major players, direct competitors, indirect competitors, suppliers, customers, and substitute products. Rank the company's position in the industry and explain whether it is a leader, challenger, niche player, or vulnerable incumbent.` },
  { id:3, tag:"Competitor ranking", title:"Competitor Ranking",
    body:`Compare this company against its top competitors using revenue growth, profitability, margins, debt, valuation, market share, stock performance, and narrative strength. Give me a ranked list and explain where this company wins and loses.` },
  { id:4, tag:"Hidden risks", title:"Hidden Risks",
    body:`Find overlooked, non-obvious, or under-discussed information about this company from credible sources. Look for lawsuits, supplier issues, customer concentration, accounting concerns, insider selling, regulatory risk, short reports, niche industry coverage, or technical blogs. Summarize what matters and why investors may be missing it.` },
  { id:5, tag:"Biggest bull", title:"Biggest Bull",
    body:`Find the strongest bullish argument for this company. Identify who is making that argument, what evidence they use, what assumptions must be true, and what would prove them wrong.` },
  { id:6, tag:"Biggest bear", title:"Biggest Bear",
    body:`Find the strongest bearish argument for this company. Identify who is making that argument, what evidence they use, what assumptions must be true, and what would prove them wrong.` },
  { id:7, tag:"Debate", title:"Debate",
    body:`Create a debate between the strongest bull and strongest bear on this ticker. Make both sides intelligent. No strawman arguments. End with the three facts that matter most.` },
  { id:8, tag:"Thesis breaker", title:"Thesis Breaker",
    body:`I am considering owning or watching this stock. Attack the thesis. Find the weakest assumptions, hidden risks, crowded beliefs, valuation problems, business risks, and possible catalysts that could break the story.` },
  { id:9, tag:"Narrative shift", title:"Narrative Shift",
    body:`Summarize how the market narrative around this company has changed over the last 3, 6, and 12 months. What used to matter? What matters now? What could matter next?` },
  { id:10, tag:"Final decision brief", title:"Final Decision Brief",
    body:`Turn this research into a clean market decision brief: what matters, what is noise, what I need to watch next, what would make me interested, and what would make me walk away.` },
];

const NAV = [
  { id:"dashboard", label:"Dashboard",            badge:null },
  { id:"research",  label:"Market Research",      badge:null },
  { id:"deepdive",  label:"Deep Dive",            badge:"PRO" },
  { id:"industry",  label:"Industry + Competitors", badge:null },
  { id:"headlines", label:"Headlines",            badge:"24" },
  { id:"watchlist", label:"Watchlist",            badge:"7" },
  { id:"positions", label:"Positions + Notes",    badge:null },
  { id:"actions",   label:"Next Actions",         badge:"6" },
  { id:"prompts",   label:"Prompt Library",       badge:null },
  { id:"settings",  label:"Settings",             badge:null },
];

Object.assign(window, {
  TICKERS, COMPETITORS, HEADLINES, WATCHLIST, POSITIONS, ACTIONS, PROMPTS, NAV, SECTORS
});
