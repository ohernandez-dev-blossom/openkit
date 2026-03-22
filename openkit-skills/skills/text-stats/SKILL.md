---
name: text-stats
description: Analyze text and return word count, character count, sentence count, reading time, speaking time, readability scores, and word frequency. Use when the user asks to count words, count characters, how long to read, reading time, text statistics, analyze text, readability score, or Flesch-Kincaid score.
---

# Text Statistics Analyzer

Compute comprehensive statistics for any block of text: basic counts, reading/speaking time, word analysis, character frequency, and Flesch readability scores.

## Input
- A text string of any length

## Output
A structured report with:
- **Basic counts:** words, characters (with and without spaces), sentences, paragraphs, lines
- **Reading & speaking time**
- **Word analysis:** unique words, average word length, longest word
- **Top 10 most frequent words** (excluding the word itself as a filter)
- **Readability:** Flesch Reading Ease score, Flesch-Kincaid Grade Level, and a human-readable level label

## Instructions

### Basic counts
- `characters` = `text.length`
- `charactersNoSpaces` = `text.replace(/\s/g, "").length`
- `words` = `text.trim().split(/\s+/).filter(Boolean).length` (0 if blank)
- `sentences` = count of `.`, `!`, `?` occurrences (or 1 if text is non-empty but has none)
- `paragraphs` = `text.trim().split(/\n\n+/).filter(Boolean).length`
- `lines` = `text.split("\n").length`

### Reading & speaking time
- Reading: `ceil(words / 200)` minutes (200 wpm average)
- Speaking: `ceil(words / 150)` minutes (150 wpm average)

### Word analysis
- Extract lowercase words via `/\b[a-z]+\b/g`
- `uniqueWords` = count of distinct entries in the word list
- `avgWordLength` = total character count of all words ÷ word count (2 decimal places)
- `longestWord` = word with maximum length

### Word frequency
- Count occurrences of each lowercase word
- Return top 10 by count, sorted descending

### Syllable counting (for readability)
For each word:
1. Lowercase.
2. If ≤ 3 characters, return 1 syllable.
3. Strip trailing silent-e patterns: `(?:[^laeiouy]es|ed|[^laeiouy]e)$`
4. Strip leading `y`.
5. Count vowel groups matching `/[aeiouy]{1,2}/g`.
6. Return count (minimum 1).

### Flesch Reading Ease
```
FRE = 206.835 - 1.015 × (words / sentences) - 84.6 × (totalSyllables / words)
```
Score interpretation:
- ≥ 90: Very Easy (5th grade)
- ≥ 80: Easy (6th grade)
- ≥ 70: Fairly Easy (7th grade)
- ≥ 60: Standard (8th–9th grade)
- ≥ 50: Fairly Difficult (10th–12th grade)
- ≥ 30: Difficult (College)
- < 30: Very Difficult (College graduate)

### Flesch-Kincaid Grade Level
```
FKGL = 0.39 × (words / sentences) + 11.8 × (totalSyllables / words) - 15.59
```

## Options
None — all statistics are always computed.

## Examples

**Input:** `"The quick brown fox jumps over the lazy dog."`

**Output:**
- Words: 9
- Characters: 44
- Characters (no spaces): 36
- Sentences: 1
- Paragraphs: 1
- Lines: 1
- Reading time: 1 min
- Speaking time: 1 min
- Unique words: 9
- Avg word length: 3.89
- Longest word: `jumps` (5 chars)
- Flesch Reading Ease: ~97 (Very Easy)
- Flesch-Kincaid Grade: ~1.5
- Level: Very Easy (5th grade)

## Error Handling
- **Empty input:** Return all counts as 0. Reading/speaking time: 0 min. Readability: N/A.
- **Text with no sentence-ending punctuation:** Count as 1 sentence for readability calculations.
- **Very short text (< 5 words):** Compute stats normally; note that readability scores are less reliable for very short texts.
