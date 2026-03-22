## Description

<!-- Provide a clear and concise description of your changes -->

## Type of Change

<!-- Mark the relevant option with an "x" -->

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [ ] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 📝 Documentation update
- [ ] 🎨 UI/UX improvement
- [ ] ⚡ Performance improvement
- [ ] ♻️ Code refactoring
- [ ] ✅ Test update

## New Tool Checklist

<!-- If adding a new tool, ensure all items are checked -->

- [ ] Tool component created in `src/app/[tool-name]/page.tsx`
- [ ] Client component follows existing patterns
- [ ] Registered in `src/lib/tool-registry.tsx`
- [ ] Added to `src/app/sitemap.ts`
- [ ] Proper SEO metadata (title, description, keywords)
- [ ] OpenGraph and Twitter Card metadata
- [ ] Related tools section included
- [ ] Privacy-first: all processing is client-side
- [ ] Accessibility: proper ARIA labels and keyboard support
- [ ] Dark mode support
- [ ] Tool tracking implemented (`useToolTracker`)
- [ ] Analytics events added for key actions
- [ ] Error handling implemented
- [ ] Loading states for async operations
- [ ] Responsive design (mobile, tablet, desktop)

## Testing

<!-- Describe the tests you ran and their results -->

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested on mobile devices
- [ ] E2E tests pass (`npm run test`)
- [ ] No console errors
- [ ] Dark mode tested
- [ ] Keyboard navigation tested

## Screenshots

<!-- Add screenshots for UI changes (before/after if applicable) -->

## Performance

<!-- For performance-related changes -->

- [ ] Bundle size impact assessed
- [ ] No unnecessary re-renders
- [ ] Async operations optimized
- [ ] Large dependencies lazy-loaded

## Privacy & Security

<!-- Confirm these for all changes -->

- [ ] No user data sent to external servers
- [ ] No sensitive data stored in localStorage without encryption
- [ ] No tracking of user input in analytics
- [ ] All external libraries reviewed for privacy implications

## Breaking Changes

<!-- List any breaking changes and migration steps -->

## Additional Notes

<!-- Any additional information that reviewers should know -->

## Checklist

- [ ] My code follows the project's code style
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published
- [ ] I have updated the documentation accordingly
- [ ] All code, comments, and commits are in English

---

**Note**: Please ensure you've read [CONTRIBUTING.md](../CONTRIBUTING.md) before submitting.
