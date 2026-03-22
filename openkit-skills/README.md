# OpenKit Skills

80+ privacy-first developer tools as Agent Skills. Swiss army knife for AI agents.

## Install

### Claude Code
```bash
claude plugin add openkit/openkit-skills
```

### ClawHub (OpenClaw)
```bash
clawhub install openkit
```

### Manual
Clone this repo into your agent's skills directory.

## Skills

### Formatters
json-format, json-repair, css-format, html-format, xml-format, sql-format, yaml-format, code-format, js-format

### Encoders/Decoders
base64-encode, url-parse, jwt-decode, html-entities

### Generators
lorem-generate, random-generate, uuid-generate*, password-generate*, hash-generate*, hmac-generate*, bcrypt-generate*

### Converters
csv-to-json, toml-to-json, html-to-markdown, epoch-convert, unit-convert, json-to-typescript, color-convert

### Text
case-convert, slug-generate, text-stats, text-sort, text-diff, extract-emails, text-replace

### CSS/Design
gradient-generate, gradient-advanced, shadow-generate, border-radius, css-animate, clip-path-generate, css-filter, font-pairs, contrast-check, aspect-calc, color-picker

### DevTools
regex-test, docker-compose, gitignore-generate, meta-tags-generate, http-status, cron-parse, cidr-calc, mime-lookup, json-path, json-schema-generate, mock-api-generate, chmod-calc, curl-build, nginx-config, openapi-validate, webhook-test

### Security
encrypt-decrypt*, cert-decode*, ssh-keygen*, totp-generate*

### Calculators
tip-calc, vat-calc, fee-calc, discount-calc, loan-calc, percent-calc

### Trading
position-size, risk-reward, fibonacci-levels, pivot-points, drawdown-calc, kelly-criterion, compound-growth, pip-value, margin-calc, dca-calc

\* Shell-assisted — requires specific CLI tools (shasum, openssl, python3, uuidgen, ssh-keygen)

## License

MIT-0
