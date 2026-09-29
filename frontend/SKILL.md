---
name: design-system-care-hands-webflow-html-website-template
description: >
  Apply the Care-hands - Webflow HTML website template design system when building or updating UI.
  Use when creating components, choosing colors or typography,
  or reviewing designs for blog interfaces.
---

# Care-hands - Webflow HTML website template — Design System Skill

## When to Use

- Building new UI components for Care-hands - Webflow HTML website template.
- Reviewing or updating existing component styles.
- Choosing colors, typography, or spacing for blog pages.
- Checking designs against the extracted token set.

## Context

- **Product:** Care-hands - Webflow HTML website template — https://care-hands.webflow.io/service
- **Surface:** blog
- **Audience:** General readers
- **Character:** Content-first editorial layout with a rich, diverse color palette and single-typeface typography.

## Tokens

### Colors

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

### Typography

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

### Spacing

**Base unit:** 4px

`space-1: 4px` · `space-2: 5px` · `space-3: 10px` · `space-4: 11px` · `space-5: 13px` · `space-6: 15px` · `space-7: 17px` · `space-8: 20px` · `space-9: 22px` · `space-10: 85px` · `space-11: 119px` · `space-12: 130px` · `space-13: 393px`

### Shapes

**Border radius:** `radius-sm: 20px` · `radius-md: 25px` · `radius-full: 50%` · `radius-xl: 50px` · `radius-full: 100px` · `radius-6: 999px`

### Elevation

- **shadow-sm:** `rgba(126, 201, 162, 0) 0px 0px 0px 8.96896px`
- **shadow-md:** `rgba(0, 0, 0, 0.65) 0px 18px 40px -18px`
- **shadow-lg:** `rgba(44, 52, 105, 0.1) 0px 3px 40px 0px`

### Motion

- **duration-fast:** `all`
- **duration-fast:** `none`
- **duration-slow:** `transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s`
- **duration-slow:** `2.4s infinite rtvpulse`

## Component Inventory

- **Buttons:** 11 detected
- **Links:** 71 detected
- **Inputs:** 2 detected
- **Navigation:** 4 elements
- **Forms:** 2 detected
- **Images:** 105 detected

## Constraints

### Always

- Use tokens from the tables above — do not introduce new values.
- Include hover, focus-visible, and disabled states for interactive elements.
- Follow the 4px spacing grid.
- Meet WCAG 2.2 AA contrast minimums.

### Never

- Do not introduce colors outside the extracted palette.
- Do not use arbitrary spacing values — stick to the scale.
- Do not mix border-radius values. Pin to the detected set (20px, 25px, 50%, 50px, 100px, 999px).
- Do not use full-uppercase text for body or paragraph content.
- Do not nest interactive elements (e.g. buttons inside links).
- Do not ship components without defining hover, focus-visible, and disabled states.

## Tone

Informative, engaging, conversational. First person plural when appropriate.

## Authoring Workflow

When creating or documenting a component for this system:

1. State intent — one sentence on purpose.
2. Map tokens — list every token the component uses.
3. Define anatomy — named parts with token assignments.
4. Specify states — default, hover, focus-visible, active, disabled, loading, error, empty.
5. Describe interactions — keyboard, pointer, touch, edge cases.
6. Add a11y criteria — testable pass/fail checks.
7. List anti-patterns — concrete misuse examples.
8. Close with the Definition of Done checklist.

## Output Structure

Component guidelines must contain, in order:

1. Overview (purpose, when to use, when not to use)
2. Tokens and foundations
3. Anatomy, variants, responsive behavior
4. States and interactions
5. Accessibility (ARIA, contrast, focus, screen reader)
6. Content guidelines (copy rules, tone)
7. Anti-patterns with reasoning

## Component Requirements

- Reference only tokens from the tables above.
- Define all states: default, hover, focus-visible, active, disabled, loading, error.
- Handle edge cases: empty, overflow, truncation, max content.
- Include keyboard navigation behavior.
- Document ARIA roles and labels.

## Definition of Done

- Default state renders (smoke test).
- All states visually verified.
- Zero hardcoded visual values — tokens only.
- Keyboard navigation works without pointer.
- No critical a11y violations.
- Tested at min and max breakpoint.
- At least one anti-pattern documented.
- Purpose, usage, and limitations documented.
