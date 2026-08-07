# Medium Priority

Features that extend functionality and differentiate the app.

---

## 5. Multi-Day Hourly View

**Effort:** Medium | **Impact:** Medium

Allow users to tap a day in the weekly forecast to view its detailed hourly breakdown.

**Implementation:**
- Make weekly forecast rows tappable (navigate or expand)
- Create a new screen or modal showing 24-hour forecast for selected day
- Reuse existing `HourlyColumn` component
- Update API call to fetch hourly data for the selected date range

**Dependencies:** None (Open-Meteo supports hourly data for future dates)

---

## 6. Weather Maps & Radar

**Effort:** High | **Impact:** High

Interactive map overlay showing precipitation, temperature, wind, or cloud cover.

**Implementation:**
- Use Open-Meteo's map tiles or integrate a weather tile provider
- Add layer selection (precipitation, temperature, wind, clouds)
- Use `react-native-maps` or `react-native-webview` for map rendering
- Add play/pause for radar animation (past hours)
- Include current location marker on map

**Dependencies:** `react-native-maps` or map library (needs evaluation)

---

## 7. Air Quality Index (AQI)

**Effort:** Medium | **Impact:** Medium

Display air quality data alongside weather information.

**Implementation:**
- Use Open-Meteo Air Quality API (`https://air-quality-api.open-meteo.com/v1/air-quality`)
- Fetch PM2.5, PM10, Ozone, NO2, AQI values
- Add AQI badge to current weather screen (color-coded: Good/Moderate/Unhealthy)
- Add detailed AQI breakdown screen or section
- Use US EPA or European AQI standard

**Dependencies:** None (Open-Meteo Air Quality API is free, no key needed)

---

## 8. Weather History

**Effort:** Medium | **Impact:** Medium

View past weather data for the last 7–30 days.

**Implementation:**
- Use Open-Meteo Historical Weather API (`https://archive-api.open-meteo.com/v1/archive`)
- Add a "Past Weather" section or tab
- Show daily summaries (temp, precipitation, wind) for past days
- Consider a chart/graph visualization for trends
- Cache historical data to reduce API calls

**Dependencies:** None (Open-Meteo Historical API is free)

---

## 9. Localization / i18n

**Effort:** Medium | **Impact:** Medium

Multi-language support for UI text and weather descriptions.

**Implementation:**
- Use `expo-localization` to detect device language
- Integrate `i18n-js` or `react-i18next` for translation management
- Translate: UI labels, weather condition names, day/month names, units
- Support at least: English, Spanish, French, German, Portuguese, Japanese
- Add language selector in settings

**Dependencies:** `expo-localization`, `i18n-js` or `react-i18next` (needs installation)

---

[← Back to Index](./README.md)
