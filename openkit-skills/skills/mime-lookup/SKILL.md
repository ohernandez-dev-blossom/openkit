---
name: mime-lookup
description: Look up MIME types by file extension or search by description. Use when the user asks what MIME type a file extension uses, asks for the Content-Type header value for .json, .png, .pdf, or any file type, or asks what extension corresponds to a MIME type.
---

# MIME Type Lookup

Return the MIME type string for a file extension, or find extensions that match a MIME type or description.

## Input
- A file extension (with or without the leading dot, e.g. `json` or `.json`)
- OR a MIME type string (e.g. `application/json`)
- OR a description keyword (e.g. "spreadsheet", "video")

## Output
- Matching entries in the format: `{extension} → {mimeType} ({description})`

## Instructions
1. Normalize the query: strip leading dot, lowercase.
2. Search the reference table below by extension, MIME type string, and description (substring match).
3. Return all matches. If there is exactly one match, present it prominently. If multiple, list them all.
4. For a direct extension lookup, also mention common use cases (e.g. setting Content-Type header).

### MIME type reference table

**Text**
- .txt → text/plain (Plain text file)
- .html → text/html (HTML document)
- .css → text/css (Cascading Style Sheet)
- .js → application/javascript (JavaScript source code)
- .mjs → application/javascript (JavaScript module)
- .json → application/json (JSON data)
- .xml → application/xml (XML document)
- .csv → text/csv (Comma-separated values)
- .md → text/markdown (Markdown document)

**Images**
- .jpg / .jpeg → image/jpeg (JPEG image)
- .png → image/png (PNG image)
- .gif → image/gif (GIF image)
- .svg → image/svg+xml (Scalable Vector Graphics)
- .webp → image/webp (WebP image)
- .ico → image/x-icon (Icon file)
- .bmp → image/bmp (Bitmap image)

**Audio**
- .mp3 → audio/mpeg (MP3 audio)
- .wav → audio/wav (WAV audio)
- .ogg → audio/ogg (OGG audio)
- .m4a → audio/mp4 (M4A audio)
- .aac → audio/aac (AAC audio)

**Video**
- .mp4 → video/mp4 (MP4 video)
- .webm → video/webm (WebM video)
- .avi → video/x-msvideo (AVI video)
- .mov → video/quicktime (QuickTime video)
- .mkv → video/x-matroska (Matroska video)

**Fonts**
- .woff → font/woff (Web Open Font Format)
- .woff2 → font/woff2 (Web Open Font Format 2)
- .ttf → font/ttf (TrueType font)
- .otf → font/otf (OpenType font)
- .eot → application/vnd.ms-fontobject (Embedded OpenType font)

**Archives**
- .zip → application/zip (ZIP archive)
- .rar → application/vnd.rar (RAR archive)
- .tar → application/x-tar (TAR archive)
- .gz → application/gzip (GZIP archive)
- .7z → application/x-7z-compressed (7-Zip archive)
- .bz2 → application/x-bzip2 (BZIP2 archive)

**Documents**
- .pdf → application/pdf (PDF document)
- .doc → application/msword (Microsoft Word document)
- .docx → application/vnd.openxmlformats-officedocument.wordprocessingml.document (Microsoft Word document)
- .xls → application/vnd.ms-excel (Microsoft Excel spreadsheet)
- .xlsx → application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (Microsoft Excel spreadsheet)
- .ppt → application/vnd.ms-powerpoint (Microsoft PowerPoint presentation)
- .pptx → application/vnd.openxmlformats-officedocument.presentationml.presentation (Microsoft PowerPoint presentation)
- .odt → application/vnd.oasis.opendocument.text (OpenDocument text)
- .ods → application/vnd.oasis.opendocument.spreadsheet (OpenDocument spreadsheet)
- .odp → application/vnd.oasis.opendocument.presentation (OpenDocument presentation)
- .rtf → application/rtf (Rich Text Format)

**Data / Config**
- .yaml / .yml → application/x-yaml (YAML document)
- .toml → application/toml (TOML configuration)
- .ini → text/plain (Configuration file)

**Binary / Executables**
- .bin → application/octet-stream (Binary data)
- .exe → application/vnd.microsoft.portable-executable (Windows executable)
- .dll → application/vnd.microsoft.portable-executable (Windows dynamic link library)
- .so → application/octet-stream (Shared object library)
- .dylib → application/octet-stream (Dynamic library)
- .wasm → application/wasm (WebAssembly)

**Packages**
- .apk → application/vnd.android.package-archive (Android application package)
- .ipa → application/octet-stream (iOS application archive)
- .deb → application/vnd.debian.binary-package (Debian package)
- .rpm → application/x-rpm (RPM package)

## Options
- Query can be extension, MIME string, or keyword — the skill handles all three.

## Examples

**Input:** `.json`
**Output:** `.json → application/json (JSON data). Use as `Content-Type: application/json` in HTTP headers.`

**Input:** `image/svg+xml`
**Output:** `.svg → image/svg+xml (Scalable Vector Graphics)`

**Input:** `spreadsheet`
**Output:**
- `.xls → application/vnd.ms-excel (Microsoft Excel spreadsheet)`
- `.xlsx → application/vnd.openxmlformats-officedocument.spreadsheetml.sheet (Microsoft Excel spreadsheet)`
- `.ods → application/vnd.oasis.opendocument.spreadsheet (OpenDocument spreadsheet)`

## Error Handling
- If no match is found, say so and suggest using `application/octet-stream` as a safe generic fallback for unknown binary files.
- If the user provides a MIME type not in the table, say it is not in the standard reference and advise checking the IANA registry.
