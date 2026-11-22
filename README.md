<div align="center">


<br/>

[![GitHub](https://img.shields.io/badge/🌐%20GitHub-HeatBD-ff6b00?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nayeem131136/heatbd)
&nbsp;
[![Live](https://img.shields.io/badge/🔴%20Live-https://heat-bd.vercel.app/-ff2d00?style=for-the-badge&logo=vercel&logoColor=white)](https://heatbd.vercel.app)
&nbsp;
[![React](https://img.shields.io/badge/React%2018-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
&nbsp;
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

<br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=600&amp;size=18&amp;pause=1000&amp;color=FF6B00&amp;center=true&amp;vCenter=true&amp;width=700&amp;lines=Real-Time+Feels-Like+Temperature+for+All+64+Districts+%F0%9F%93%8D;3-Day+Heat+%26+Rain+Forecast+with+Smart+Alerts+%E2%9A%A0%EF%B8%8F;Daily+Hydration+Tracker+with+Streaks+%26+Reminders+%F0%9F%92%A7;Bangla-First+Emergency+%26+First-Aid+Guide+%F0%9F%9A%A8" alt="Typing SVG"/>

</div>

---

## 📖 About

**HeatBD** is a Bangla-first, mobile-web app built to help people across Bangladesh stay safe during heatwaves. It turns raw weather data into plain-language, actionable guidance — how hot it *actually* feels, whether it's dangerous to go outside right now, and what to do if someone around you is having a heat-related emergency — all localized to the nearest of Bangladesh's 64 districts.

> *"গরম থেকে বাঁচুন, সুস্থ থাকুন — heat safety that speaks your language."*

---

## ✨ Key Features

<div align="center">

| Feature | Description |
|---|---|
| 🌡️ **Live Feels-Like Temperature** | Real geolocation + OpenWeatherMap data, auto-mapped to the nearest of all 64 Bangladeshi districts |
| 🚦 **5-Level Severity System** | স্বাভাবিক → মাঝারি গরম → গরম বাড়ছে → বিপদ সংকেত → জরুরি সতর্কতা, each with its own color, message and toast alert |
| 📅 **3-Day Forecast** | Daily max/min feels-like, humidity and condition, with proactive heat/rain/cold warnings for upcoming days |
| 💧 **Hydration Tracker** | 8-glass daily tracker with a progress ring, ml-consumed stats, a timeline of when you drank, and day-streaks |
| 💡 **Contextual Health Tips** | A rotating carousel of Bangla health & safety tips that change based on current weather (heat, rain, cold) |
| 🚨 **Emergency Guide** | One-tap CPR steps and first-aid cards for heatstroke, heart attack, snake bite, burns, seizures & more — with direct `tel:999` calling |
| 📤 **Share Card** | Share your current conditions and hydration progress straight to Facebook or clipboard |
| 🎨 **Weather-Reactive UI** | Background gradients and animated rain/snow/sun effects that shift live with real conditions |
| ⚡ **Offline-Friendly Caching** | Weather and forecast are cached locally so the app stays useful on flaky mobile connections |
| 📱 **Installable, App-Like Feel** | Bottom tab navigation, safe-area insets and a floating emergency button — built mobile-first |

</div>

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React%2018-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/OpenWeatherMap-EB6E4B?style=flat-square&logo=openweathermap&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 🏗️ Project Structure

```
heatbd/
├── 🎨 src/components/          # UI building blocks
│   ├── Header.tsx               # Logo, live badge, last-updated time, manual refresh
│   ├── WeatherCard.tsx          # Animated feels-like temperature + condition icons
│   ├── AlertBanner.tsx          # Danger/extreme severity banner
│   ├── ForecastSection.tsx      # 3-day forecast cards + upcoming-day alerts
│   ├── TipsCarousel.tsx         # Rotating weather-aware health tips
│   ├── HydrationTracker.tsx     # 8-glass tracker, streaks, timeline, celebration modal
│   ├── EmergencyTab.tsx         # CPR guide + first-aid accordion cards
│   ├── ShareCard.tsx            # Facebook / clipboard sharing
│   ├── WeatherAnimations.tsx    # Rain / snow / cloud canvas effects
│   ├── BottomNav.tsx            # 3-tab bottom navigation
│   └── ui/                      # shadcn/ui primitives
│
├── 🪝 src/hooks/                # Data & state
│   ├── useWeather.ts             # Geolocation + live weather fetch, caching, refresh
│   ├── useForecast.ts            # 3-day forecast fetch, grouped & cached
│   └── useHydration.ts           # Glasses, streaks, timeline, midnight reset
│
├── 🧮 src/utils/
│   ├── heatLogic.ts              # Severity levels, tips data, emergency cards
│   └── bdDistricts.ts            # All 64 districts with centroid lat/lon (Bangla names)
│
└── 📄 src/pages/
    ├── Index.tsx                 # Main app shell (tabs, toasts, layout)
    └── NotFound.tsx               # 404 page
```

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Nayeem131136/heatbd.git
cd heatbd

# 2. Install dependencies
npm install

# 3. Set up your API key
cp .env.example .env
# then edit .env and add your OpenWeatherMap API key
# get a free key at https://openweathermap.org/api

# 4. Start the dev server
npm run dev
```

Then visit `http://localhost:8080/`.

```bash
# Build for production
npm run build

# Run unit tests
npm run test
```

> Weather and forecast data are cached in `localStorage` for 10 and 30 minutes respectively, so the app stays fast and usable even on a spotty connection. Manual refresh always fetches fresh data.

---

## 🚦 How It Works

```
📍 Grant location access → nearest of 64 districts detected
        ↓
🌡️ Live feels-like temperature fetched from OpenWeatherMap
        ↓
🚦 Severity calculated → স্বাভাবিক / মাঝারি গরম / গরম বাড়ছে / বিপদ সংকেত / জরুরি সতর্কতা
        ↓
🔔 Toast alerts fire automatically for dangerous conditions
        ↓
💡 Health tips + 3-day forecast update to match current weather
        ↓
💧 Log water intake throughout the day → streaks & progress tracked
        ↓
🚨 One tap away: CPR steps, first-aid cards, and direct emergency calling
```

---

## 📐 Data Flow Highlights

```
Geolocation ──── nearest District (of 64) ──── OpenWeatherMap API
                                                      │
                                          ┌───────────┴───────────┐
                                     Current Weather          5-Day Forecast
                                          │                        │
                                    getSeverity()            grouped by day
                                          │                        │
                                  Severity + Tips              ForecastDay[]
                                          │                        │
                                          └──────────┬─────────────┘
                                                      │
                                            UI (cards, alerts, animations)

Hydration state ──── localStorage (per-day key) ──── streak calculated on 8/8 completion
```

**Core logic:**
- `getSeverity(feelsLike)` — maps temperature to one of 5 Bangla severity levels with color, label & message
- `getWeatherConditions(conditionId, feelsLike)` — derives rain/cold/hot/thunderstorm flags from OpenWeatherMap condition codes
- `findNearestDistrict(lat, lon)` — nearest-centroid lookup across all 64 districts
- `getFilteredTips(conditionId, feelsLike)` — filters the tips pool by current weather type

---

## 👥 Author

<div align="center">

| Name | Portfolio | GitHub |
|---|---|---|
| **Md. Mahdi Hasan Nayeem** | [mahdi-hasan-nayeem-portfolio.vercel.app](https://mahdi-hasan-nayeem-portfolio.vercel.app/) | [@Nayeem131136](https://github.com/Nayeem131136) |

</div>

---

## 📦 Requirements

```txt
Node.js 18+
npm
An OpenWeatherMap API key (free tier)
```

---

<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:ffb300,50:ff2d00,100:ff6b00&amp;height=120&amp;section=footer"/>

**⭐ Star this repo if it helped you!**

[![GitHub stars](https://img.shields.io/github/stars/Nayeem131136/heatbd?style=social)](https://github.com/Nayeem131136/heatbd/stargazers)
&nbsp;
[![GitHub forks](https://img.shields.io/github/forks/Nayeem131136/heatbd?style=social)](https://github.com/Nayeem131136/heatbd/network/members)

*© 2025 HeatBD.com — সকলের জন্য বিনামূল্যে*

</div>
