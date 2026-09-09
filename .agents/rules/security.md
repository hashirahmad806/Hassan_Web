---
trigger: always_on
---

# SECURITY RULES

Treat security as part of implementation, not as an
afterthought.

Never:

- expose secrets
- hardcode API keys
- expose private credentials
- trust unvalidated user input
- disable security mechanisms merely to make code work

Consider:

- authentication
- authorization
- input validation
- API security
- environment variables
- CORS
- rate limiting
- database security
- dependency vulnerabilities

Never commit secrets to Git.
