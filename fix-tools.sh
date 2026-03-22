#!/bin/bash

# Add Link import and back link to all tool pages

for tool in colors timestamp base64 hash lorem markdown qr diff regex words; do
  file="src/app/$tool/page.tsx"
  
  if [ -f "$file" ]; then
    echo "Fixing $tool..."
    
    # Check if already has Link import
    if ! grep -q "import Link from" "$file"; then
      # Add Link import after the first import line
      sed -i '0,/^import/s/^import \(.*\)$/import Link from "next\/link";\nimport \1/' "$file"
    fi
    
    # Find footer and add back link if not present
    if ! grep -q "Back to tools" "$file"; then
      # Add back link to footer
      sed -i 's|<p className="mt-2">|<p className="mt-2 flex flex-wrap justify-center gap-2">\n            <Link href="/" className="hover:text-white transition">← Back to tools</Link> •{" "}|' "$file"
    fi
  fi
done

echo "Done!"
