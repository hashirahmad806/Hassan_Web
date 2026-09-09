---
trigger: always_on
---

# DEBUGGING RULES

Never randomly modify code to remove an error.

Follow this process:

ERROR
↓
REPRODUCE
↓
LOCATE
↓
UNDERSTAND ROOT CAUSE
↓
FORM HYPOTHESIS
↓
TEST HYPOTHESIS
↓
APPLY MINIMAL FIX
↓
RUN REGRESSION CHECK

Before fixing:

1. Read the complete error.
2. Identify the source file.
3. Trace the execution path.
4. Determine the root cause.
5. Fix the smallest relevant area.

Do not modify unrelated files.

Do not introduce a dependency simply to hide an error.

After fixing, verify that the original functionality
still works.