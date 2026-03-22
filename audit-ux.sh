#!/bin/bash

echo "=== OPENKIT.TOOLS UX AUDIT ==="
echo ""
echo "📊 BOTONES AUDIT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Count Button component usage
echo "✅ Usando componente <Button>:"
grep -r "import.*Button.*from.*ui/button" src --include="*.tsx" | wc -l

echo ""
echo "⚠️  Botones nativos <button>:"
grep -r "<button" src --include="*.tsx" | grep -v "Button" | grep -v "import" | wc -l

echo ""
echo "📍 Archivos con botones nativos que NO importan Button:"
echo ""
for file in $(grep -r "<button" src --include="*.tsx" -l | grep -v "Button"); do
  if ! grep -q "import.*Button.*from.*ui/button" "$file" 2>/dev/null; then
    echo "  - $file"
  fi
done

echo ""
echo ""
echo "📝 HEADERS AUDIT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Find all h1 tags and their classes
echo "🎯 H1 headers (tool pages):"
grep -r "<h1" src/app --include="*.tsx" | grep -o 'className="[^"]*"' | sort | uniq -c | sort -rn

echo ""
echo "🎯 H2 headers (sections):"
grep -r "<h2" src/app --include="*.tsx" | grep -o 'className="[^"]*"' | sort | uniq -c | sort -rn

echo ""
echo "🎯 H3 headers (subsections):"
grep -r "<h3" src/app --include="*.tsx" | grep -o 'className="[^"]*"' | sort | uniq -c | sort -rn

echo ""
echo "✅ Audit complete!"
