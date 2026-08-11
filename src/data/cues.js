/**
 * The cue stack.
 *
 * This is direction-specific: it maps the canon record in members.js onto
 * the cyclorama's lighting states. A member's Society number is already
 * their cue number — the register runs like a lighting plot on its own,
 * so only the stage timings and state names are added here, and those are
 * the conceit's own material rather than claims about the source.
 *
 * Akivili's cue is called and never lit. They are dead; the horizon does
 * not rise for cue 36.
 */

import { register } from './members.js';

const STATE = {
  akivili: { state: 'Held', time: '05:44:00', held: true },
  screwllum: { state: 'First Light', time: '06:02:00' },
  ruanmei: { state: 'Rose Gather', time: '06:18:00' },
  herta: { state: 'Dawn Wash', time: '06:31:00' },
};

const brief = (m) => (m ? { no: m.no, name: m.name } : null);

export const cues = register.map((m, i, all) => ({
  ...m,
  ...STATE[m.id],
  prev: brief(all[i - 1]),
  next: brief(all[i + 1]),
  /** Others recognised on the same Path. Derived, never asserted. */
  peers: all.filter((o) => o.id !== m.id && o.path === m.path).map(brief),
}));

export const cueByNo = (no) => cues.find((c) => String(c.no) === String(no));
