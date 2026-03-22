---
name: slug-generate
description: Generate a URL-friendly slug from any text. Use when the user asks to create a slug, generate a URL slug, make a URL-safe string, slugify a title, convert a title to a URL, or create an SEO-friendly URL from text.
---

# Slug Generator

Convert any text into a URL-friendly slug by normalizing Unicode, removing special characters, and replacing spaces with a separator.

## Input
- Any text string (article title, product name, etc.)
- Separator character: `-` hyphen (default), `_` underscore, or `.` dot
- Case: lowercase (default) or preserve original case

## Output
- A URL-safe slug string
- Character count of the resulting slug

## Instructions

Apply the following transformations in order:

1. **Normalize Unicode:** Apply NFD decomposition to separate base characters from diacritics (e.g., `é` → `e` + combining accent).
2. **Strip diacritics:** Remove Unicode combining characters in range U+0300–U+036F (the accent marks left after NFD).
3. **Remove special characters:** Keep only ASCII letters (`a–z`, `A–Z`), digits (`0–9`), spaces, and hyphens. Remove everything else.
4. **Trim:** Strip leading and trailing whitespace.
5. **Replace spaces:** Replace one or more consecutive spaces with the chosen separator.
6. **Apply case:** If lowercase mode is on, convert the entire result to lowercase.
7. Output the final slug.

## Options
- `separator`: `-` | `_` | `.` — default: `-`
- `lowercase`: `true` | `false` — default: `true`

## Examples

**Basic title (default settings):**
Input: `Hello World! This is a Test String 123`
Output: `hello-world-this-is-a-test-string-123`

**With underscore separator:**
Input: `Hello World! This is a Test String 123`
Separator: `_`
Output: `hello_world_this_is_a_test_string_123`

**With dot separator:**
Input: `Hello World`
Separator: `.`
Output: `hello.world`

**Preserve case:**
Input: `My Article Title`
Lowercase: false
Output: `My-Article-Title`

**Unicode / accented characters:**
Input: `Héllo Wörld`
Output: `hello-world`

**Article title:**
Input: `10 Tips for Better Code Quality & Performance`
Output: `10-tips-for-better-code-quality-performance`

**Blog URL example:**
Input: `How to Build a Modern Web Application in 2024`
Output: `how-to-build-a-modern-web-application-in-2024`

## Error Handling
- **Empty input:** Return an empty string and note that no text was provided.
- **Input consisting only of special characters:** After stripping, the slug may be empty — notify the user.
- **Very long input:** Generate the full slug. Advise the user to trim if they need slugs under a specific length limit (e.g., 75 characters for SEO).
