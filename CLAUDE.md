# Căsuța din Livezi — website

Website for a family guesthouse, home kitchen (PGL) and lavender field in Cacica, Bucovina.

@AGENTS.md
@docs/design/RULES.md

## Where things are

- Plan and milestones: `docs/PLAN.md`
- Design rules, exact values, components, saved screens: `docs/design/`
- Text and facts: `src/content/` (no copy inside components)
- Tokens in code: `src/styles/tokens.css` (mirror of `docs/design/tokens.md`)

## Working rules

- The UI must match Figma exactly. Follow `docs/design/RULES.md` before any UI change.
- Always check the result visually before committing: screenshots at 390 and 1440
  next to the Figma pictures, plus a scan from 320px to 1920px for overflow. The owner
  asked for this on every change.
- Build modularly: pages only arrange sections; sections take text and photos as props.
- Agree the plan with the owner before starting a new milestone.
- Commit small and often; run `npm run lint` and `npm run build` before a commit that
  ends a milestone, then push.
