#!/usr/bin/env node
/* majlis installer - multi-platform, zero dependencies.
 * Usage: pnpm dlx majlis-council --all        (recommended standard)
 *        npx majlis-council --all            (fallback)
 *        pnpm dlx majlis-council --claude     (subset)
 *        pnpm dlx majlis-council --scaffold C:\my\project
 *
 * ═══════════════ MAJLIS WRITE-SCOPE LAW ═══════════════
 * Deploys ONLY Majlis assets. Never reads/writes/deletes or
 * reconfigures the editor's settings, model/provider config,
 * or any credential store. User API keys are untouchable.
 * (Enforced by eval/run.js adoption-safety suite.)
 * ══════════════════════════════════════════════════════
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

let PKG = path.resolve(__dirname, '..');
if (!fs.existsSync(path.join(PKG, 'VERSION.txt')) && fs.existsSync(path.join(PKG, '..', 'VERSION.txt'))) {
  PKG = path.resolve(PKG, '..'); // running from inside the monorepo (npm/ subdir)
}
const HOME = os.homedir();
const VERSION = fs.readFileSync(path.join(PKG, 'VERSION.txt'), 'utf8').trim();
const STABLE_MAJLIS = path.join(HOME, '.majlis');
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const EXCLUDE = new Set(['science_skills_common']);
const UTF8 = 'utf8';

const args = process.argv.slice(2);
const flag = (f) => args.includes(f);
const scaffoldArgIdx = args.indexOf('--scaffold');

const DESC_FIX = {
  'advanced-image-slicing-skill': 'Slice large images into responsive tiles/sprites and animate pan/zoom transitions for web layouts.',
  'explode-animation-skill': 'Create product explosion/fragment animations: layered disassembly sequences, timing curves, and Remotion/CSS implementations.',
  'marketing-funnel-skill': 'Design marketing funnels and data capture flows: stages, CTAs, tracking events, and conversion analytics wiring.',
  'premium-visual-polish-skill': 'Apply premium visual polish passes: spacing rhythm, shadows, gradients, micro-interactions, magazine-grade typography.',
  'psychological-copywriting-skill': 'Write psychology-driven marketing copy using persuasion principles (scarcity, social proof, loss aversion).',
  'tech-background-skill': 'Generate animated technical backgrounds (circuits, grids, particles) as CSS canvas or video assets for hero sections.',
  'find-skills': 'Search GitHub and skill registries for existing skills/tools before building new ones; returns candidates with install steps.',
  'skill-creator': 'Create new SKILL.md skills and agent definitions following platform frontmatter conventions and validation rules.'
};

function normalizeName(raw) {
  return raw.toLowerCase().replace(/_+/g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '');
}
function mkdirp(p) { fs.mkdirSync(p, { recursive: true }); }
function wf(p, content) { mkdirp(path.dirname(p)); fs.writeFileSync(p, content, UTF8); }

function ensureStableMajlis() {
  mkdirp(STABLE_MAJLIS);
  for (const f of ['AGENTS.md', 'VERSION.txt', 'MAJLIS.GLOBAL.md']) {
    const src = path.join(PKG, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(STABLE_MAJLIS, f));
  }
  const tmplDst = path.join(STABLE_MAJLIS, 'templates');
  mkdirp(tmplDst);
  const tmplSrc = path.join(PKG, 'templates');
  if (fs.existsSync(tmplSrc)) {
    for (const f of fs.readdirSync(tmplSrc)) {
      const srcF = path.join(tmplSrc, f);
      if (fs.statSync(srcF).isFile()) fs.copyFileSync(srcF, path.join(tmplDst, f));
    }
  }
}

// ---- build normalized skill library ----
function buildLibrary() {
  const lib = {};
  const dirs = {};
  const src = path.join(PKG, 'skills');
  for (const dir of fs.readdirSync(src)) {
    if (EXCLUDE.has(dir)) continue;
    const f = path.join(src, dir, 'SKILL.md');
    if (!fs.existsSync(f)) continue;
    let text = fs.readFileSync(f, UTF8);
    const m = text.match(/^name:\s*(.+)\s*$/m);
    const fmName = m ? m[1].trim() : '';
    const target = NAME_RE.test(fmName) ? fmName : normalizeName(dir);
    if (!NAME_RE.test(target) || lib[target]) continue;
    if (DESC_FIX[target]) {
      text = text.replace(/(^description:\s*)(>-\s*\n[\s\S]*?(?=\n[a-z-]+:|\n---)|.*(?=\n[a-z-]+:|\n---))/m, `$1description: ${DESC_FIX[target]}`);
    }
    lib[target] = text;
    dirs[target] = path.join(src, dir);
  }
  global.__dirs = dirs;
  return lib;
}

const CLAUDE_TOOLS = {
  'hadi-maestro': 'Task, Bash, Read, Grep, Glob',
  'rased-explorer': 'Read, Grep, Glob',
  'sareem-security': 'Bash, Read, Grep, Glob',
  'baher-qa': 'Bash, Read, Grep, Glob',
  'nadif-clean-code': 'Read, Edit, Replace, Grep, Glob',
  'bayan-diagrams': 'Read, Edit, Replace, Write',
  'balegh-docs': 'Read, Edit, Replace, Write, Grep, Glob',
  'emad-api-shield': 'Task, Bash, Read, Edit, Replace, Write, Grep, Glob',
  'data-modeler': 'Read, Edit, Replace, Write, Grep, Glob',
  'integrative-architect': 'Task, Read, Edit, Replace, Write, Grep, Glob'
};

function readAgents() {
  const out = {};
  const dir = path.join(PKG, 'agents');
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(dir, f), UTF8);
    const body = raw.replace(/^---[\s\S]*?---\s*/, '').trim();
    const dm = raw.match(/^description:\s*(.+)$/m);
    out[f.replace(/\.md$/, '')] = { body, desc: dm ? dm[1].trim() : `Majlis Council role ${f}` };
  }
  return out;
}
function listCommands() {
  return fs.readdirSync(path.join(PKG, 'commands')).filter(f => f.startsWith('majlis-') && f.endsWith('.md'));
}
function pointerText() {
  ensureStableMajlis();
  const master = path.join(STABLE_MAJLIS, 'AGENTS.md');
  const coreDoc = path.join(STABLE_MAJLIS, 'templates', 'MAJLIS_CORE_DIRECTIVES.md');
  const corePrompt = path.join(STABLE_MAJLIS, 'templates', 'MAJLIS_CORE_SYSTEM.prompt');
  return fs.readFileSync(path.join(PKG, 'templates', 'pointer.md'), UTF8)
    .replace(/\{MASTER\}/g, master)
    .replace(/\{CORE_DIRECTIVES\}/g, coreDoc)
    .replace(/\{CORE_SYSTEM_PROMPT\}/g, corePrompt);
}

const R = [];
function ok(s) { R.push(s); }

function deploySkills(dest) { const lib = global.__lib; const dirs = global.__dirs; let n = 0; for (const k of Object.keys(lib)) { wf(path.join(dest, k, 'SKILL.md'), lib[k]); for (const sub of fs.readdirSync(dirs[k], { withFileTypes: true })) { if (!sub.isDirectory()) continue; fs.cpSync(path.join(dirs[k], sub.name), path.join(dest, k, sub.name), { recursive: true }); } n++; } return n; }
function deployAgentsClaude(dest, agents) { for (const [id, a] of Object.entries(agents)) { let fm = `---\nname: ${id}\ndescription: ${a.desc}\n`; const t = CLAUDE_TOOLS[id]; if (t) fm += `tools: ${t}\n`; wf(path.join(dest, `${id}.md`), `${fm}---\n\n${a.body}\n`); } return Object.keys(agents).length; }
function deployAgentsCodex(dest, agents) { for (const [id, a] of Object.entries(agents)) { const px = `---\ndescription: Adopt the Majlis '${id}' role for this task.\nargument-hint: TASK\n---\n\nAdopt the following agent role exactly, then execute the TASK supplied after the role definition.\n\n## Role: ${id}\n\n${a.body}\n\n## TASK\n$ARGUMENTS\n`; wf(path.join(dest, `majlis-${id}.md`), px); } return Object.keys(agents).length; }
function deployCommands(dest, wrapCodex) { for (const f of listCommands()) { let c = fs.readFileSync(path.join(PKG, 'commands', f), UTF8); if (wrapCodex && !/^---/m.test(c)) c = `---\ndescription: Majlis workflow command\nargument-hint: ARGS\n---\n\n${c}`; wf(path.join(dest, f), c); } return listCommands().length; }

// ---- main ----
console.log(`\n=== MAJLIS Council Installer v${VERSION} ===`);
ensureStableMajlis();
global.__lib = buildLibrary();
const agents = readAgents();
const targets = ['opencode', 'claude', 'codex', 'universal', 'gemini'].filter(t => flag('--' + t));
const all = flag('--all') || targets.length === 0;

if (all || targets.includes('universal')) {
  const d = path.join(HOME, '.agents', 'skills');
  ok(`universal : ${deploySkills(d)} skills -> ${d}`);
}
if (all || targets.includes('opencode')) {
  const base = path.join(HOME, '.config', 'opencode');
  ok(`opencode  : ${deploySkills(path.join(base, 'skills'))} skills`);
  for (const [id, a] of Object.entries(agents)) wf(path.join(base, 'agents', `${id}.md`), fs.readFileSync(path.join(PKG, 'agents', `${id}.md`), UTF8));
  ok(`            ${Object.keys(agents).length} subagents + ${deployCommands(path.join(base, 'command'))} commands /majlis:*`);
  wf(path.join(base, 'majlis_source.txt'), PKG);
  wf(path.join(base, '.majlis_deployed'), VERSION);
  const pluginSrc = path.join(PKG, 'plugins', 'majlis-bootstrap.js');
  if (fs.existsSync(pluginSrc)) { wf(path.join(base, 'plugins', 'majlis-bootstrap.js'), fs.readFileSync(pluginSrc, UTF8)); ok('            self-heal plugin armed'); }
}
if (all || targets.includes('claude')) {
  const base = path.join(HOME, '.claude');
  ok(`claude    : ${deploySkills(path.join(base, 'skills'))} skills`);
  ok(`            ${deployAgentsClaude(path.join(base, 'agents'), agents)} subagents + ${deployCommands(path.join(base, 'commands'))} slash commands`);
  wf(path.join(base, 'CLAUDE.md'), pointerText());
}
if (all || targets.includes('codex')) {
  const base = path.join(HOME, '.codex');
  ok(`codex     : ${deploySkills(path.join(base, 'skills'))} skills ($skill-name)`);
  ok(`            ${deployAgentsCodex(path.join(base, 'prompts'), agents)} role prompts + ${deployCommands(path.join(base, 'prompts'), true)} workflow commands (/prompts:majlis-*)`);
  wf(path.join(base, 'AGENTS.md'), pointerText());
}
if (all || targets.includes('gemini')) {
  const d = path.join(HOME, '.gemini', 'commands', 'majlis');
  ok(`gemini    : ${deployCommands(d)} commands (/majlis:*) -> ${d}`);
  const geminiConfig = path.join(HOME, '.gemini', 'config');
  if (fs.existsSync(path.join(HOME, '.gemini'))) {
    deploySkills(path.join(geminiConfig, 'skills'));
    deployCommands(path.join(geminiConfig, 'commands', 'majlis'));
    const shortRule = fs.readFileSync(path.join(PKG, 'templates', 'project-rules.md'), UTF8)
      .replace(/\{MASTER\}/g, path.join(STABLE_MAJLIS, 'AGENTS.md'))
      .replace(/\{CORE_DIRECTIVES\}/g, path.join(STABLE_MAJLIS, 'templates', 'MAJLIS_CORE_DIRECTIVES.md'));
    wf(path.join(geminiConfig, 'rules', 'majlis.md'), shortRule);
    ok(`gemini cfg: deployed skills, commands & rules -> ${geminiConfig}`);
  }
}
if (scaffoldArgIdx !== -1 && args[scaffoldArgIdx + 1]) {
  const proj = path.resolve(args[scaffoldArgIdx + 1]);
  const projMajlis = path.join(proj, '.majlis');
  mkdirp(projMajlis);
  if (fs.existsSync(path.join(PKG, 'AGENTS.md'))) {
    fs.copyFileSync(path.join(PKG, 'AGENTS.md'), path.join(projMajlis, 'AGENTS.md'));
  }
  const short = fs.readFileSync(path.join(PKG, 'templates', 'project-rules.md'), UTF8)
    .replace(/\{MASTER\}/g, path.join(projMajlis, 'AGENTS.md'))
    .replace(/\{CORE_DIRECTIVES\}/g, path.join(STABLE_MAJLIS, 'templates', 'MAJLIS_CORE_DIRECTIVES.md'));
  [['AGENTS.md', short], ['CLAUDE.md', 'See AGENTS.md - it is binding.\n\n' + short], ['GEMINI.md', 'See AGENTS.md - it is binding.\n\n' + short], ['.github/copilot-instructions.md', short], ['.cursor/rules/majlis.mdc', '---\ndescription: Majlis Council rules (always apply)\nglobs:\nalwaysApply: true\n---\n\n' + short], ['.agent/rules/majlis-core.md', short], ['.windsurf/rules/majlis.md', short]].forEach(([rel, c]) => wf(path.join(proj, rel), c));
  ok(`scaffold   : 7 rule files + self-contained .majlis/ -> ${proj}`);
}

console.log('');
R.forEach(s => console.log(' [OK] ' + s));
console.log('\nMajlis Council ready. Docs: see USAGE_EN.md in the package.');
