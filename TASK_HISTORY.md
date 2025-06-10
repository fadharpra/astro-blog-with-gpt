## 2025-06-09 - Implement custom scrollspy logic with scroll listener

- Replaced the previous `IntersectionObserver`-based scrollspy with a custom implementation using `scroll` event and `requestAnimationFrame` for better accuracy and flexibility.
- The new scrollspy logic calculates the active heading based on its position relative to the viewport, with dynamic adjustment for the header height.
- Added fallback behavior to detect the closest heading above the viewport or the next visible one below it.
- Included `astro:before-swap` cleanup to prevent duplicated event listeners when navigating between pages.
- This approach proved more reliable in handling dynamic layouts and varying header sizes.
- Original scrollspy logic was provided by a contributor.

