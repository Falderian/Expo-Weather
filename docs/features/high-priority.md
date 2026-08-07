# High Priority

Core UX improvements that should be tackled first.

---

## 1. GPS Auto-Detection

**Effort:** Low | **Impact:** High

Automatically detect the user's current location on app launch and fetch weather data without manual search.

**Current State:**
- `useUserLocation` hook exists in `src/hooks/use-user-location.ts`
- Hook is **disabled** (`enabled: false`) and not imported in any screen
- Uses `expo-location` with foreground permission already configured in `app.json`

**Implementation:**
- Enable the hook and wire it into the root layout or home screen
- Request location permission on first launch
- Fall back to a default city or prompt manual search if permission denied
- Auto-set GPS location as the current active location in Zustand store
- Consider caching last-known GPS location for faster initial load

**Dependencies:** `expo-location` (already installed)

---

## 2. Weather Alerts & Notifications

**Effort:** High | **Impact:** High

Push notifications for severe weather events (storms, extreme temperatures, heavy rain, etc.).

**Implementation:**
- Use Open-Meteo's weather code mapping to detect severe conditions
- Register for push notifications via `expo-notifications`
- Schedule local notifications based on forecast data
- Allow users to configure alert thresholds (e.g., alert if temp > 35°C)
- Add an alerts tab or section in settings

**Dependencies:** `expo-notifications` (needs installation)

---

## 3. Home Screen Widgets

**Effort:** High | **Impact:** High

Native home screen widgets showing current weather and forecast summary.

**Implementation:**
- Use `expo-widgets` or native module for widget support
- Display: current temp, weather icon, city name, high/low for today
- Consider a 4-day forecast widget variant
- Update widget data on app background refresh

**Dependencies:** Widget library (needs evaluation and installation)

---

## 4. Pull-to-Refresh

**Effort:** Low | **Impact:** Medium

Swipe down on any weather tab to manually refresh data.

**Implementation:**
- Wrap scrollable content in `RefreshControl` (React Native built-in)
- Trigger React Query `refetch()` on pull
- Show loading indicator during refresh
- Apply to: Current Weather, Forecast, and AI tabs

**Dependencies:** None (React Native built-in)

---

[← Back to Index](./README.md)
