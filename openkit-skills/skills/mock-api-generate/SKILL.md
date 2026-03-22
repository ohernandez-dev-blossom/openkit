---
name: mock-api-generate
description: Generate realistic mock API data for testing and prototyping. Use when the user asks to create fake API data, generate mock users, products, posts, comments, todos, or a custom JSON array for testing an API endpoint.
---

# Mock API Generator

Generate a realistic JSON array of mock records for a given schema type and size.

## Input
- `schema` — one of: `users`, `products`, `posts`, `comments`, `todos`, `custom`
- `count` — number of records to generate (1–100, default: 5)
- `custom_template` — JSON object with placeholder strings (only when schema is `custom`)

## Output
A JSON array containing `count` generated records, formatted with 2-space indentation.

## Instructions
1. Identify the schema type. If `custom`, parse the template and replace placeholders.
2. Generate `count` records using the field definitions below.
3. Use varied, realistic-looking values. Increment `id` from 1.
4. Return only the JSON array.

### Schema field definitions

**users** (fields: id, firstName, lastName, email, age, active, createdAt)
- firstName: pick from [Alice, Bob, Charlie, Diana, Eve, Frank, Grace, Henry, Ivy, Jack]
- lastName: pick from [Smith, Johnson, Williams, Brown, Jones, Garcia, Miller, Davis, Rodriguez, Martinez]
- email: `{firstName.lower}.{lastName.lower}@{domain}` where domain ∈ [example.com, mail.com, test.org, demo.net, sample.io]
- age: random int 18–65
- active: random boolean (70% true)
- createdAt: random ISO date within past 2 years

**products** (fields: id, name, category, price, inStock, rating, reviews, createdAt)
- name: `{adjective} {noun}` — adjectives: [Premium, Deluxe, Essential, Classic, Modern, Vintage, Professional]; nouns: [Widget, Gadget, Tool, Kit, Set, Bundle, Collection]
- category: pick from [Electronics, Clothing, Books, Home & Garden, Sports, Toys, Food]
- price: float 10.00–510.00 (2 decimal places)
- inStock: random boolean (80% true)
- rating: float 3.0–5.0 (1 decimal place)
- reviews: random int 0–500
- createdAt: random ISO date within past 2 years

**posts** (fields: id, title, body, userId, published, views, likes, createdAt)
- title: lorem-ipsum-style sentence, 4–8 words, capitalized first word
- body: lorem-ipsum-style sentence, 15–30 words
- userId: random int 1–20
- published: random boolean (80% true)
- views: random int 10–10000
- likes: random int 0–500
- createdAt: random ISO date within past 2 years

**comments** (fields: id, postId, author, email, body, createdAt)
- postId: random int 1–50
- author: `{firstName} {lastName}`
- email: derived from author name
- body: lorem-ipsum-style sentence, 8–20 words
- createdAt: random ISO date within past 2 years

**todos** (fields: id, title, completed, userId, priority, dueDate)
- title: lorem-ipsum-style sentence, 3–6 words
- completed: random boolean (50% true)
- userId: random int 1–20
- priority: pick from [low, medium, high]
- dueDate: random ISO date within past 6 months

**custom** — Replace placeholders in the provided JSON template object:
- `"{{id}}"` → sequential integer starting at 1
- `"{{name}}"` → `{firstName} {lastName}`
- `"{{email}}"` → generated email
- `"{{number}}"` → random int 1–1000
- `"{{boolean}}"` → random true/false
- `"{{date}}"` → random ISO date-time
- `"{{text}}"` → lorem-ipsum sentence

## Options
- `schema` — users | products | posts | comments | todos | custom (default: users)
- `count` — integer 1–100 (default: 5)
- `custom_template` — JSON object with placeholder strings (required when schema is custom)

## Examples

**Input:** schema=users, count=2

**Output:**
```json
[
  {
    "id": 1,
    "firstName": "Alice",
    "lastName": "Smith",
    "email": "alice.smith@example.com",
    "age": 28,
    "active": true,
    "createdAt": "2025-03-14T09:22:00.000Z"
  },
  {
    "id": 2,
    "firstName": "Bob",
    "lastName": "Johnson",
    "email": "bob.johnson@mail.com",
    "age": 41,
    "active": false,
    "createdAt": "2024-11-02T15:08:00.000Z"
  }
]
```

**Input:** schema=custom, count=2, custom_template=`{"id": "{{id}}", "label": "{{text}}", "score": "{{number}}"}`

**Output:** 2 objects with id=1,2 and randomized label/score values.

## Error Handling
- If `count` is outside 1–100, clamp it and note the adjustment.
- If `schema` is not one of the valid options, list valid options and ask for clarification.
- If `schema=custom` and no template is provided, ask the user to supply a JSON template with placeholder strings.
- If the custom template contains invalid JSON, report the parse error.
