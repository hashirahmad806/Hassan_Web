---
trigger: always_on
---

# FRONTEND ENGINEERING RULES

Use the existing frontend architecture.

Before creating code:

1. Inspect existing components.
2. Inspect hooks and utilities.
3. Inspect routing.
4. Inspect state management.
5. Inspect API integration.
6. Reuse existing patterns.

Prefer:

- reusable components
- clean component boundaries
- predictable state management
- accessible HTML
- responsive layouts
- modular code

Avoid:

- unnecessary dependencies
- duplicated logic
- huge components
- inline duplicated styles
- unnecessary abstraction
- unrelated refactoring

Do not rewrite working components unless there is
a clear technical reason.