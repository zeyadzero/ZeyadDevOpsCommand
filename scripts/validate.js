#!/usr/bin/env node
/* Validates every command definition:
 *  - parses the DSL
 *  - builds each command with defaults and with ALL options enabled
 *  - runs `bash -n` on the result to catch quoting / syntax mistakes
 * Usage: npm run validate
 */
const fs = require('fs'), vm = require('vm'), cp = require('child_process'), path = require('path');
global.window = global;
const dir = path.join(__dirname, '..', 'src');
for (const f of ['cmds-a', 'cmds-b', 'cmds-c', 'cmds-d', 'cmds-e', 'engine', 'gen', 'gen2'])
  vm.runInThisContext(fs.readFileSync(path.join(dir, f + '.js'), 'utf8'), { filename: f });

const tools = RAW.map(([m, t]) => ENG.parseTool(m, t));
let total = 0, withFlags = 0, params = 0; const bad = [];
for (const t of tools) for (const c of t.cmds) {
  total++; if (c.flags.length) withFlags++; params += Object.keys(c.params).length;
  for (const mode of ['defaults', 'all-options']) {
    const st = { vals: {}, fl: new Set() };
    if (mode === 'all-options') c.flags.forEach((_, i) => st.fl.add(i));
    const cmd = ENG.build(c, st).plain.replace(/<\w+>/g, 'X');
    const r = cp.spawnSync('bash', ['-n', '-c', cmd], { encoding: 'utf8' });
    if (r.status !== 0) bad.push(`${c.id} [${mode}] ${(r.stderr || '').trim().split('\n')[0]}\n    ${cmd.slice(0, 140)}`);
  }
}
const v = { name: 'x' }; Object.keys(TPLF).forEach(k => v[k] = TPLF[k][1]);
let tplBad = 0; TPL.forEach(t => { try { if (t.g(v).length < 10) throw 0; } catch (e) { tplBad++; console.error('Template failed:', t.n); } });

console.log(`tools: ${tools.length} | commands: ${total} | with options: ${withFlags} | parameters: ${params} | templates: ${TPL.length}`);
if (bad.length) { console.error(`\n${bad.length} syntax problem(s):`); bad.forEach(b => console.error(' -', b)); }
if (bad.length || tplBad) process.exit(1);
console.log('OK — all commands and templates are valid.');
