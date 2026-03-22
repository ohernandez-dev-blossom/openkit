---
name: lorem-generate
description: Generate lorem ipsum placeholder text. Use when the user asks to generate placeholder text, dummy text, filler text, lorem ipsum, sample text for mockups, or test content.
---

# Lorem Ipsum Generator

Generate lorem ipsum placeholder text as words, sentences, or paragraphs.

## Input
- `count` — number of units to generate (default: 3)
- `unit` — `words`, `sentences`, or `paragraphs` (default: `paragraphs`)
- `startWithLorem` — whether to begin with the classic opening (default: true)

## Output
- Plain text containing the requested lorem ipsum content
- Report the word count and character count

## Instructions

1. Parse the user's request to extract `count`, `unit`, and `startWithLorem`.
2. Use this fixed word bank for generation (draw randomly from it):
   lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, sed, do, eiusmod, tempor, incididunt, ut, labore, et, dolore, magna, aliqua, enim, ad, minim, veniam, quis, nostrud, exercitation, ullamco, laboris, nisi, aliquip, ex, ea, commodo, consequat, duis, aute, irure, in, reprehenderit, voluptate, velit, esse, cillum, fugiat, nulla, pariatur, excepteur, sint, occaecat, cupidatat, non, proident, sunt, culpa, qui, officia, deserunt, mollit, anim, id, est, laborum, at, vero, eos, accusamus, iusto, odio, dignissimos, ducimus, blanditiis, praesentium, voluptatum, deleniti, atque, corrupti, quos, dolores, quas, molestias, excepturi, obcaecati, cupiditate, provident, similique, mollitia, animi, perspiciatis, unde, omnis, iste, natus, error, quasi, architecto, beatae, vitae, dicta, explicabo

3. The classic first sentence is fixed: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."`

4. **If unit = `paragraphs`:**
   - Generate `count` paragraphs
   - Each paragraph: 4–8 sentences, each sentence 8–15 words
   - If `startWithLorem` is true, prepend the classic sentence to the first paragraph (then add 3–6 more sentences to it)
   - Capitalize the first word of each sentence; end each sentence with a period
   - Separate paragraphs with a blank line

5. **If unit = `sentences`:**
   - Generate `count` sentences, each 8–15 words
   - If `startWithLorem` is true, make the first sentence the classic sentence
   - Capitalize the first word; end with a period

6. **If unit = `words`:**
   - Generate a single space-separated string of `count` random words (all lowercase)
   - If `startWithLorem` is true and count >= 2, start with "lorem ipsum"

7. After generating, count total words and characters, then report them.

## Options
- `count` — integer, 1–100 for words, 1–10 for sentences/paragraphs (default: 3)
- `unit` — `words` | `sentences` | `paragraphs` (default: `paragraphs`)
- `startWithLorem` — `true` | `false` (default: `true`)

## Examples

**Request:** "Generate 2 paragraphs of lorem ipsum"

**Output:**
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse. Cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.

Perspiciatis unde omnis iste natus error sit voluptatem accusantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit. Neque porro quisquam est qui dolorem ipsum quia dolor sit. Ut labore et dolore magnam aliquam quaerat voluptatem.

---
**Words:** 78 | **Characters:** 468

---

**Request:** "Give me 5 lorem ipsum sentences"

**Output:**
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.
Deserunt mollit anim id est laborum at vero eos accusamus.

---

**Request:** "10 lorem words"

**Output:**
lorem ipsum dolor sit amet consectetur adipiscing elit sed do

## Error Handling
- If `count` is 0 or negative, use 1
- If `count` exceeds 100 for words or 10 for sentences/paragraphs, cap at the maximum and note the adjustment
- If `unit` is unrecognized, default to `paragraphs` and inform the user
