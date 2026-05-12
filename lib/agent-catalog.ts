import type { Locale } from "@/lib/course";

type Localized = Record<Locale, string>;

export type AgentCatalogEntry = {
  slug: string;
  name: string;
  type: Localized;
  summary: Localized;
  bestFor: Localized;
  install: Localized;
  interface: Localized;
  difficulty: Localized;
  safety: Localized;
  officialUrl: string;
  sourceStatus: "official" | "needs-verification";
};

export const agentCatalog: AgentCatalogEntry[] = [
  {
    slug: "opencode",
    name: "OpenCode",
    type: { en: "Terminal coding agent", ar: "وكيل برمجة في التيرمنال" },
    summary: {
      en: "The workshop's hands-on agent. It can inspect projects, plan changes, edit files, and run commands from a terminal-first workflow.",
      ar: "الـ agent العملي في الورشة. بقدر يقرأ المشروع، يخطط، يعدل ملفات، ويشغل أوامر من التيرمنال.",
    },
    bestFor: {
      en: "Learning the real agent loop: ask, plan, review, run, verify.",
      ar: "تعلم لوب الـ agent الحقيقي: اسأل، خطط، راجع، شغل، اتأكد.",
    },
    install: {
      en: "Official docs list install script, npm, package-manager, Windows, and binary paths. Check current docs before installing.",
      ar: "الوثائق الرسمية فيها install script و npm وخيارات ويندوز و binaries. راجع الوثائق الحالية قبل التثبيت.",
    },
    interface: { en: "Terminal, desktop app, IDE extension", ar: "Terminal، desktop app، IDE extension" },
    difficulty: { en: "Beginner with guidance", ar: "مناسب للمبتدئ مع إرشاد" },
    safety: {
      en: "Good for teaching command review because actions are visible in the terminal.",
      ar: "مفيد لتعلم مراجعة الأوامر لأن الأفعال ظاهرة في التيرمنال.",
    },
    officialUrl: "https://opencode.ai/docs",
    sourceStatus: "official",
  },
  {
    slug: "codex",
    name: "OpenAI Codex",
    type: { en: "AI coding agent", ar: "وكيل برمجة بالذكاء الاصطناعي" },
    summary: {
      en: "OpenAI's coding-agent family for delegating software tasks. Exact packaging and access can change, so use official docs.",
      ar: "عائلة وكلاء البرمجة من OpenAI لتفويض مهام برمجية. طريقة الوصول والتغليف ممكن تتغير، فاعتمد على الوثائق الرسمية.",
    },
    bestFor: {
      en: "Comparing OpenAI's agent workflow with terminal-first tools.",
      ar: "مقارنة تجربة OpenAI agent مع أدوات التيرمنال.",
    },
    install: { en: "Check current official OpenAI docs.", ar: "راجع وثائق OpenAI الحالية." },
    interface: { en: "Varies by product surface", ar: "بتختلف حسب المنتج" },
    difficulty: { en: "Beginner to intermediate", ar: "مبتدئ إلى متوسط" },
    safety: {
      en: "Treat generated code as a proposal. Review diffs and avoid sharing secrets.",
      ar: "اعتبر الكود المقترح مسودة. راجع الـ diffs وما تشارك أسرار.",
    },
    officialUrl: "https://openai.com/codex/",
    sourceStatus: "official",
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    type: { en: "Agentic coding tool", ar: "أداة برمجة agentic" },
    summary: {
      en: "Anthropic's coding agent for working with projects from the command line and related developer workflows.",
      ar: "وكيل البرمجة من Anthropic للشغل على المشاريع من سطر الأوامر وتجارب المطورين المرتبطة.",
    },
    bestFor: {
      en: "Careful refactors, code explanation, and longer project edits.",
      ar: "Refactors حذرة، شرح الكود، وتعديلات أطول على المشاريع.",
    },
    install: { en: "Check Anthropic's current setup docs.", ar: "راجع وثائق Anthropic الحالية للتثبيت." },
    interface: { en: "Command line", ar: "سطر أوامر" },
    difficulty: { en: "Intermediate after basics", ar: "متوسط بعد الأساسيات" },
    safety: {
      en: "Still needs command review, repo hygiene, and secret discipline.",
      ar: "برضو محتاج مراجعة أوامر، تنظيم repo، وحذر مع الأسرار.",
    },
    officialUrl: "https://docs.anthropic.com/en/docs/claude-code",
    sourceStatus: "official",
  },
  {
    slug: "cursor",
    name: "Cursor",
    type: { en: "AI-native code editor", ar: "محرر كود مبني حول AI" },
    summary: {
      en: "A code editor with chat, autocomplete, and agent workflows built into the editing environment.",
      ar: "محرر كود فيه chat و autocomplete و agent workflows داخل بيئة التحرير.",
    },
    bestFor: { en: "Students who prefer editor-first guidance.", ar: "الطلاب البفضلوا الشغل من داخل المحرر." },
    install: { en: "Download from official Cursor site.", ar: "حمله من موقع Cursor الرسمي." },
    interface: { en: "Desktop editor", ar: "Desktop editor" },
    difficulty: { en: "Beginner-friendly", ar: "مناسب للمبتدئين" },
    safety: {
      en: "Watch which files the editor context includes before asking private questions.",
      ar: "انتبه للملفات الداخلة في context قبل ما تسأل أسئلة خاصة.",
    },
    officialUrl: "https://docs.cursor.com/",
    sourceStatus: "official",
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    type: { en: "AI code editor", ar: "محرر كود مع AI" },
    summary: {
      en: "An AI-assisted editor focused on coding workflows and project context.",
      ar: "محرر بمساعدة AI بيركز على شغل البرمجة و project context.",
    },
    bestFor: { en: "Trying editor-native AI workflows.", ar: "تجربة AI workflows داخل المحرر." },
    install: { en: "Download from official Windsurf site.", ar: "حمله من موقع Windsurf الرسمي." },
    interface: { en: "Desktop editor", ar: "Desktop editor" },
    difficulty: { en: "Beginner-friendly", ar: "مناسب للمبتدئين" },
    safety: {
      en: "Review generated changes and avoid adding secrets to editor context.",
      ar: "راجع التغييرات وما تضيف أسرار للـ editor context.",
    },
    officialUrl: "https://docs.windsurf.com/",
    sourceStatus: "official",
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    type: { en: "Editor assistant", ar: "مساعد داخل المحرر" },
    summary: {
      en: "GitHub's AI coding assistant for completions, chat, and editor-integrated help.",
      ar: "مساعد GitHub للبرمجة: completions و chat ومساعدة داخل المحرر.",
    },
    bestFor: { en: "Inline suggestions while learning editor habits.", ar: "اقتراحات مباشرة أثناء تعلم عادات المحرر." },
    install: { en: "Use official GitHub Copilot docs for editor setup.", ar: "استخدم وثائق GitHub Copilot لإعداد المحرر." },
    interface: { en: "IDE/editor extension", ar: "IDE/editor extension" },
    difficulty: { en: "Beginner-friendly", ar: "مناسب للمبتدئين" },
    safety: {
      en: "Autocomplete can be wrong. Read code before accepting it.",
      ar: "الاقتراحات ممكن تكون غلط. اقرأ الكود قبل ما تقبله.",
    },
    officialUrl: "https://docs.github.com/en/copilot",
    sourceStatus: "official",
  },
  {
    slug: "continue",
    name: "Continue",
    type: { en: "Open-source AI code assistant", ar: "مساعد كود AI مفتوح المصدر" },
    summary: {
      en: "An open-source assistant that can connect editors with different model providers.",
      ar: "مساعد مفتوح المصدر بيربط المحررات بمزودين models مختلفين.",
    },
    bestFor: { en: "Experimenting with provider flexibility.", ar: "تجربة المرونة في اختيار مزود AI." },
    install: { en: "Follow official Continue docs.", ar: "اتبع وثائق Continue الرسمية." },
    interface: { en: "Editor extension", ar: "Editor extension" },
    difficulty: { en: "Intermediate", ar: "متوسط" },
    safety: { en: "Provider configuration may involve keys. Store them safely.", ar: "إعداد المزود ممكن يحتاج مفاتيح. خزّنها بأمان." },
    officialUrl: "https://docs.continue.dev/",
    sourceStatus: "official",
  },
  {
    slug: "aider",
    name: "Aider",
    type: { en: "Terminal pair-programming agent", ar: "Agent pair-programming في التيرمنال" },
    summary: {
      en: "A terminal tool for pair programming with LLMs while editing files in a Git repository.",
      ar: "أداة تيرمنال للـ pair programming مع LLMs وتعديل الملفات داخل Git repository.",
    },
    bestFor: { en: "Git-aware coding sessions.", ar: "جلسات كود واعية بـ Git." },
    install: { en: "Follow official Aider docs.", ar: "اتبع وثائق Aider الرسمية." },
    interface: { en: "Terminal", ar: "Terminal" },
    difficulty: { en: "Intermediate", ar: "متوسط" },
    safety: { en: "Commit often and review diffs carefully.", ar: "اعمل commits كتير وراجع diffs بحذر." },
    officialUrl: "https://aider.chat/docs/",
    sourceStatus: "official",
  },
  {
    slug: "openhands",
    name: "OpenHands",
    type: { en: "Autonomous software agent", ar: "وكيل برمجي مستقل" },
    summary: {
      en: "An open-source platform for autonomous software-development agents.",
      ar: "منصة مفتوحة المصدر لوكلاء تطوير برمجيات مستقلين.",
    },
    bestFor: { en: "Exploring higher-autonomy workflows after the basics.", ar: "استكشاف workflows أكثر استقلالية بعد الأساسيات." },
    install: { en: "Follow official OpenHands docs.", ar: "اتبع وثائق OpenHands الرسمية." },
    interface: { en: "Web/local development environment", ar: "Web/local development environment" },
    difficulty: { en: "Advanced beginner to intermediate", ar: "مبتدئ متقدم إلى متوسط" },
    safety: { en: "Higher autonomy needs stronger boundaries and review.", ar: "الاستقلالية الأعلى محتاجة حدود ومراجعة أقوى." },
    officialUrl: "https://docs.all-hands.dev/",
    sourceStatus: "official",
  },
  {
    slug: "pi",
    name: "Pi",
    type: { en: "Minimal coding agent", ar: "وكيل برمجة بسيط" },
    summary: {
      en: "A minimal coding-agent option included for comparison using the provided official docs.",
      ar: "خيار agent بسيط للمقارنة باستخدام الوثائق الرسمية المقدمة.",
    },
    bestFor: { en: "Comparing lightweight agent workflows.", ar: "مقارنة workflows خفيفة للـ agents." },
    install: { en: "Follow Pi docs.", ar: "اتبع وثائق Pi." },
    interface: { en: "Check current docs", ar: "راجع الوثائق الحالية" },
    difficulty: { en: "To verify", ar: "تحتاج تحقق" },
    safety: { en: "Verify current capabilities before recommending live setup.", ar: "تحقق من القدرات الحالية قبل ترشيحه في السيشن." },
    officialUrl: "https://pi.dev/docs/latest",
    sourceStatus: "official",
  },
  {
    slug: "openclaw",
    name: "OpenClaw",
    type: { en: "Advanced local-first agent", ar: "Agent متقدم local-first" },
    summary: {
      en: "Planned advanced section for local agent workflows and Telegram linking after official docs are verified.",
      ar: "قسم متقدم مخطط لـ local agent workflows وربط Telegram بعد التحقق من الوثائق الرسمية.",
    },
    bestFor: { en: "Advanced automation after students understand secrets.", ar: "Automation متقدم بعد فهم الأسرار والأمان." },
    install: { en: "Needs verification before publishing exact commands.", ar: "محتاج تحقق قبل نشر أوامر دقيقة." },
    interface: { en: "To verify", ar: "تحتاج تحقق" },
    difficulty: { en: "Advanced", ar: "متقدم" },
    safety: { en: "Telegram tokens and connected services require extra care.", ar: "Telegram tokens والخدمات المتصلة محتاجة حذر زيادة." },
    officialUrl: "#",
    sourceStatus: "needs-verification",
  },
  {
    slug: "hermes",
    name: "Hermes",
    type: { en: "Advanced agent reference", ar: "مرجع agent متقدم" },
    summary: {
      en: "Planned advanced reference entry. Exact behavior and setup should be verified before teaching.",
      ar: "مدخل مرجعي متقدم مخطط. السلوك وطريقة الإعداد محتاجين تحقق قبل التدريس.",
    },
    bestFor: { en: "Post-workshop exploration once official docs are confirmed.", ar: "استكشاف بعد الورشة بعد تأكيد الوثائق الرسمية." },
    install: { en: "Needs verification before publishing exact commands.", ar: "محتاج تحقق قبل نشر أوامر دقيقة." },
    interface: { en: "To verify", ar: "تحتاج تحقق" },
    difficulty: { en: "Advanced", ar: "متقدم" },
    safety: { en: "Do not ask students to set it up until boundaries are documented.", ar: "ما نطلب من الطلاب يثبتوه قبل توثيق الحدود والمخاطر." },
    officialUrl: "#",
    sourceStatus: "needs-verification",
  },
];

export const catalogCriteria: { label: Localized; key: keyof AgentCatalogEntry }[] = [
  { key: "install", label: { en: "Install path", ar: "طريقة التثبيت" } },
  { key: "interface", label: { en: "Interface", ar: "الواجهة" } },
  { key: "difficulty", label: { en: "Beginner difficulty", ar: "الصعوبة للمبتدئ" } },
  { key: "safety", label: { en: "Safety note", ar: "ملاحظة أمان" } },
];
