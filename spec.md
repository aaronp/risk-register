# Register format

A register is one markdown file. It holds **risks** (what could go wrong) and
**opportunities** (what could go right), one `##` section each.

The format is deliberately forgiving: the only things an entry *must* have are
a title and its two scores. Everything else is optional, and anything the
viewer doesn't recognise is ignored rather than rejected.

## The minimum

```markdown
## Supplier fails
- impact: 4
- likelihood: 2

## Second carrier discount
- value: 4
- effort: 2
```

That is a complete register: one risk and one opportunity.

## Front matter (optional)

```markdown
---
register: Acme risk register
as_at: 2026-10-20
---
```

| Key | Meaning | Default |
|---|---|---|
| `register` | Name shown for the file | `Register` |
| `as_at` | Date the register describes, `YYYY-MM-DD` | today |
| `scale` | Scoring scale; only `5x5` is supported | `5x5` |

Other keys are ignored.

Text between the front matter and the first `##` (a title, notes, a scoring
guide) is ignored by the viewer.

## Entries

Each entry starts with a `##` heading:

```markdown
## Supplier fails
## R01 · Supplier fails
```

An optional id before ` · ` is letters followed by two or more digits (`R01`,
`RISK-104`, `O07`). The id used to match entries is, in order: the heading id,
else the first slug, else a number in file order (`R01`, `R02`… for risks,
`O01`… for opportunities). If two entries end up with the same id, the later
one gets `-2`, `-3`….

### Fields

Field lines come straight after the heading (blank lines between are fine):

```markdown
- key: value
```

Keys are matched in any case, and spaces or dashes in a key read as `_`
(`- Target Value: 12` is `target_value`). A field with no value is ignored, an
unknown key is ignored, and if a key repeats the first one wins. The fields end
at the first line that isn't `- key: value`.

**Scores (required).** A risk needs `impact` and `likelihood`; an opportunity
needs `value` and `effort`. Each is a whole number 1–5.

| Score | Risk | Opportunity |
|---|---|---|
| Rating | impact × likelihood (25 = worst) | value × (6 − effort) (25 = most value for least effort) |

**Kind.** `kind: risk` or `kind: opportunity` (any case; `opp` works). Without
it, an entry with `value` or `effort` is an opportunity and anything else is a
risk. Fields that belong to the other kind are ignored.

**Optional fields, both kinds**

| Field | Meaning |
|---|---|
| `status` | `closed` closes the entry; any other value (or none) means open |
| `closed` | Date it closed, `YYYY-MM-DD` |
| `category` | Free text, used for grouping and filters |
| `slugs` | Stable tags that identify the same entry across registers |
| `related` | Ids of other entries in the register it bears on, risks or opportunities, separated by `;` or `,` (`R03; O02`). A link shows on both entries; an id that matches nothing is ignored |
| `stars` | 0–3, to pick out entries (`★★` works too); the register filters by it. Anything else reads as none |
| `target` | Target scores, `4x2` (`4 x 2` and `4×2` work too) |
| `driver`, `approver`, `contributors`, `informed` | People (DACI). The RACI keys `responsible`, `accountable` and `consulted` are read as `driver`, `approver` and `contributors`. The first approver is shown as the entry's owner |

**Risk only**

| Field | Meaning |
|---|---|
| `inherent` | Score before controls, `impact x likelihood` |
| `appetite` | Highest acceptable score, 1–25 |

**Opportunity only**

| Field | Meaning |
|---|---|
| `target_value` | Lowest acceptable score, 1–25 |
| `cost` | Free text |
| `realisation` | Date the value should land, `YYYY-MM-DD` |

**People** are written `Name (Role)` or just a name; separate several with `;`.
A placeholder name (`Unassigned`, `TBD`, `TBC`, `TBA`, `None`, `N/A`, `-`, `?`)
counts as nobody: a DACI role with only placeholders is hidden, and so is the
whole DACI section if every role is.

**Slugs** are separated by `;` or `,`. Each is turned into lower-case
kebab-case (`Carrier Insolvency` → `carrier-insolvency`) and duplicates are
dropped. `[]` means none.

Optional values that don't make sense are ignored, not rejected: a non-date
`closed` or `realisation`, or an `appetite` outside 1–25, reads as blank.

### Text

Any prose in the entry, anywhere in it and under any other heading, is its
description. Put causes and consequences there in your own words; `**bold**`
markers show as plain text, so an older `**Cause:** …` line reads as `Cause: …`.

### Tables

Two optional tables, each under a `###` heading (any case):

```markdown
### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Dual sourcing | Preventive | Partial |

### Evidence
| Title | Description | Resources |
|---|---|---|
| Supplier credit check | Rated B-; two late filings this year | https://example.com/credit.pdf |
```

Opportunities use `### Enablers` with `| Enabler | Type | Status |` in place of
Controls.

- Columns are found by header name, in any order; a missing column reads as
  blank. The `|---|` separator row is optional.
- Evidence `Resources` are optional http(s) URLs, separated by spaces, `;` or
  `,`; each opens in a new tab. Older tables with a link in the title
  (`[OECD report](https://…)`) still read: the link becomes a resource. Other
  columns (`Ref`, `Kind`, `Date`, `Valid days`) are ignored.
- Every cell is free text. These words get a colour; anything else shows
  neutral:
  - Effectiveness: `Effective`, `Partial`, `Ineffective`
  - Enabler status: `Ready`, `In progress`, `Blocked`
- An `### Actions` table, from older files, is skipped.

## Errors

The file is rejected only when it can't be drawn:

- an entry is missing one of its two scores;
- a score isn't a whole number 1–5;
- `target` or `inherent` isn't two such numbers;
- `as_at` is present but isn't a `YYYY-MM-DD` date;
- `scale` is something other than `5x5`.

Errors name the file and line, e.g. `risks.md:12: "Supplier fails" needs "- likelihood: 1–5"`.

## Comparing two registers

The viewer compares two files (A and B) by entry id. That's why stable ids or
slugs matter: give entries a heading id or a slug if their order or wording may
change. An entry closed in both files is left out of the views.

## Editing in the viewer

Data → Form edits one entry at a time and rewrites only that entry's lines. It
writes fields in the canonical lower-case form (`- impact: 3`), so a loosely
written key such as `- Impact:` is tidied when you change that field. Its
Controls (or Enablers) and Evidence tabs rewrite the whole table, with
the standard columns in the standard order; any other column is dropped.
