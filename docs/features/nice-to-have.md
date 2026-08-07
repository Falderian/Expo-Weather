# Nice-to-Have

Polish features that enhance visual appeal and retention.

---

## 10. Animated Weather Icons (Lottie)

**Effort:** Medium | **Impact:** Medium

Replace static weather icons with smooth Lottie animations.

**Implementation:**
- Find or commission Lottie animations for each weather code
- Use `lottie-react-native` for rendering
- Create animation variants for day/night
- Ensure animations are lightweight (< 50KB each)
- Add fallback to static icons if animation fails to load

**Dependencies:** `lottie-react-native` (needs installation)

---

## 11. Offline Caching

**Effort:** Medium | **Impact:** Medium

Cache weather data locally for offline viewing.

**Implementation:**
- Use React Query's built-in cache (already enabled) with extended stale time
- Persist last-fetched data to AsyncStorage
- Show cached data with "last updated" timestamp when offline
- Detect network status via `@react-native-community/netinfo`
- Background refresh when connectivity returns

**Dependencies:** `@react-native-community/netinfo` (needs installation)

---

## 12. Custom Theming

**Effort:** Medium | **Impact:** Low

User-selectable color themes beyond system light/dark mode.

**Implementation:**
- Add theme options: Default, Ocean, Forest, Sunset, Midnight, Custom
- Extend existing `theme.ts` with additional palettes
- Store user preference in Zustand (already has persist middleware)
- Add theme picker in settings screen
- Ensure all components consume theme via the existing `useTheme` hook

**Dependencies:** None (theme infrastructure already exists)

---

## 13. Weather Sharing

**Effort:** Low | **Impact:** Low

Share weather summary as an image or text to social media or messaging apps.

**Implementation:**
- Use `react-native-view-shot` to capture weather card as image
- Use `expo-sharing` to share the captured image
- Generate a styled text summary as alternative
- Include: city, temp, condition, high/low, precipitation chance
- Add share button to current weather and forecast screens

**Dependencies:** `react-native-view-shot`, `expo-sharing` (needs installation)

---

[← Back to Index](./README.md)
