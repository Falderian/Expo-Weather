# Expo Weather

A weather app built with Expo and React Native.

---

## Features

- **Current Weather** — Temperature, feels like, wind, humidity, pressure, visibility, cloud cover, dew point, sunrise/sunset
- **Hourly Forecast** — Scrollable 24-hour forecast with snap-to-hour, precipitation warnings
- **7-Day Forecast** — Weekly outlook with high/low temps, precipitation, wind, sunrise/sunset
- **Location Search** — Search cities worldwide via Open-Meteo geocoding API
- **Favorites** — Save locations, view live weather previews, switch active location
- **AI Insights** — Llama 3.1-powered weather advice with severity levels
- **Dark/Light Theme** — Automatic system theme detection

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Expo ~57 | Managed workflow platform |
| React Native 0.86 | Mobile UI framework |
| React 19 | UI library |
| Expo Router | File-based navigation (tabs) |
| Zustand | Global state (favorites + current location) |
| React Query | Server state, caching, refetching |
| Open-Meteo API | Weather data (free, no API key) |
| Biome | Linting and formatting |

---

## Get Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Open in:
   - [Expo Go](https://expo.dev/go) (limited sandbox)
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)

---

## Project Structure

```
src/
├── app/                    # Expo Router screens (tabs)
│   ├── (tabs)/
│   │   ├── index.tsx              # Current weather
│   │   ├── forecast-weather.tsx   # Hourly + weekly forecast
│   │   ├── location.tsx           # Search & favorites
│   │   └── ai.tsx                 # AI weather insights
│   └── _layout.tsx         # Root layout (providers)
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── store.ts                # Zustand stores
├── types.ts                # TypeScript types
├── utils.ts                # Weather code maps, helpers
└── api.ts                  # Open-Meteo API builder
```

---

## Documentation

Future features and roadmap are documented in [`docs/features/`](./docs/features/).

| Document | Description |
|----------|-------------|
| [Feature Index](./docs/features/README.md) | All planned features |
| [High Priority](./docs/features/high-priority.md) | GPS, alerts, widgets, pull-to-refresh |
| [Medium Priority](./docs/features/medium-priority.md) | Maps, AQI, history, i18n |
| [Nice-to-Have](./docs/features/nice-to-have.md) | Lottie icons, caching, theming, sharing |
| [API Reference](./docs/features/api-reference.md) | Open-Meteo endpoints |
| [Dependencies](./docs/features/dependencies.md) | Packages to install |

---

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [Open-Meteo API](https://open-meteo.com/)

---

## License

See [LICENSE](./LICENSE) for details.
