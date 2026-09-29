# Care-hands - Webflow HTML website template

## Overview

**Product:** Care-hands - Webflow HTML website template
**URL:** https://care-hands.webflow.io/service
**Surface type:** blog
**Audience:** General readers
**Brand character:** Content-first editorial layout with a rich, diverse color palette and single-typeface typography.

### Design Principles

- Readability above all — optimise for sustained reading, not scanning.
- Content is the interface — typography and whitespace do the heavy lifting.
- Minimal chrome — navigation and UI should fade behind the content.

## Colors

| Token | Value | Role |
|-------|-------|------|
| --accent | `#7EC9A2` | Accent |
| color-7 | `#FFF6F6` | Background |
| color-8 | `#FFFFFF` | Background |
| color-4 | `#E0D8CB` | Surface |
| color-5 | `#DADAF0` | Surface |
| color-1 | `#000000` | Text Primary |
| color-2 | `#575757` | Text Primary |
| color-6 | `#ECE7E4` | Text Light |

## Typography

**Font stack:** Inter

| Level | Size | Usage |
|-------|------|-------|
| text-xs | 12px | Captions, metadata |
| text-sm | 14px | Labels, secondary text |
| text-base | 16px | Body text (default) |
| text-lg | 20px | Subheadings, emphasis |
| text-xl | 40px | Section headings |

**Weight scale:** 500 · 600
**Line heights:** 50px · 15.6px · 17.55px · 14.95px · 28px · 23.94px · 30px

## Spacing

**Base unit:** 4px

`space-1: 4px` · `space-2: 5px` · `space-3: 10px` · `space-4: 11px` · `space-5: 13px` · `space-6: 15px` · `space-7: 17px` · `space-8: 20px` · `space-9: 22px` · `space-10: 85px` · `space-11: 119px` · `space-12: 130px` · `space-13: 393px`

## Shapes

**Border radius:** `radius-sm: 20px` · `radius-md: 25px` · `radius-full: 50%` · `radius-xl: 50px` · `radius-full: 100px` · `radius-6: 999px`

## Elevation

- **shadow-sm:** `rgba(126, 201, 162, 0) 0px 0px 0px 8.96896px`
- **shadow-md:** `rgba(0, 0, 0, 0.65) 0px 18px 40px -18px`
- **shadow-lg:** `rgba(44, 52, 105, 0.1) 0px 3px 40px 0px`

## Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-slow:** `transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s`
- **duration-slow:** `2.4s infinite rtvpulse`

## Components

- **Buttons:** 11 detected
- **Links:** 71 detected
- **Inputs:** 2 detected
- **Navigation:** 4 elements
- **Forms:** 2 detected
- **Images:** 105 detected

## Do's and Don'ts

### Do

- Reference tokens by name, not raw values — agents and developers should use `color.text.primary`, not `#171717`.
- Define all interactive states: default, hover, focus-visible, active, disabled.
- Use the spacing scale for all padding, margin, and gap values.
- Write content in sentence case. Reserve ALL CAPS for acronyms only.
- Test every component at the smallest and largest breakpoint before shipping.

### Don't

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (20px, 25px, 50%, 50px, 100px, 999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Writing Tone

Informative, engaging, conversational. First person plural when appropriate.

## Authoring Workflow

When creating or updating a component guideline for this system, follow this sequence:

1. **State the intent** — one sentence on what the component does and why it exists.
2. **Map tokens** — list every color, spacing, typography, and radius token the component uses. No raw values.
3. **Define anatomy** — break the component into named parts (container, label, icon, etc.) with their token assignments.
4. **Specify states** — document every state: default, hover, focus-visible, active, disabled, loading, error, empty.
5. **Describe interactions** — keyboard, pointer, and touch behavior, including edge cases (long content, overflow, truncation).
6. **Add accessibility criteria** — write testable pass/fail checks (e.g. "focus ring must be visible at 3:1 contrast").
7. **List anti-patterns** — concrete examples of misuse with a brief explanation of why each is wrong.
8. **Close with a QA checklist** — a mechanical list of verifiable items (see Definition of Done below).

## Required Output Structure

Every component guideline produced from this system must contain these sections, in order:

1. Overview — purpose, when to use, when not to use.
2. Tokens and foundations — all referenced tokens from the tables above.
3. Anatomy and variants — named parts, variant matrix, responsive behavior.
4. States and interactions — full state table, keyboard/pointer/touch behavior.
5. Accessibility — ARIA attributes, contrast requirements, focus management, screen reader behavior.
6. Content guidelines — copy length, tone, capitalisation, placeholder text rules.
7. Anti-patterns — explicit examples of what not to build, with reasoning.

## Component Requirements

Every component built against this system must:

- Reference only tokens defined in the tables above — no hardcoded hex, px, or font values.
- Define all interactive states: default, hover, focus-visible, active, disabled, loading, error.
- Specify responsive behavior at the smallest and largest supported breakpoint.
- Handle edge cases: empty state, overflow / truncation, maximum content length.
- Include keyboard navigation (Tab, Enter, Escape, Arrow keys where applicable).
- Document ARIA roles, labels, and live-region behavior where relevant.
- Include known page component density: - **Buttons:** 11 detected
- **Links:** 71 detected
- **Inputs:** 2 detected
- **Navigation:** 4 elements
- **Forms:** 2 detected
- **Images:** 105 detected

## Definition of Done

A component is not complete until every item below is checked:

- Renders correctly in its default state (smoke test).
- All states documented and visually verified (hover, focus, disabled, loading, error, empty).
- All visual values use design tokens — zero hardcoded values.
- Keyboard navigation works without a pointer.
- No critical accessibility violations (contrast, ARIA, focus order).
- Tested at smallest and largest breakpoint.
- Anti-patterns section lists at least one concrete misuse example.
- Documentation covers purpose, usage, props/API, and limitations.
