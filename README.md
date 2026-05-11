# Product Analytics Dashboard — Frontend

Next.js application with server-side rendering, strict TypeScript, MUI, and Recharts.

---

## Tech Stack
| Layer          | Library                        |
|---------------|-------------------------------|
| Framework      | Next.js 14                     |
| Language       | TypeScript                     |
| Component Lib  | MUI v5                         |
| Charts         | Recharts                       |
| HTTP Client    | native fetch                   |
| Styling        | Emotion / MUI                  |

---

## Folder Structure
```
frontend/src/
├── api/
│   ├── apiClient.js          # Axios instance + interceptors
│   ├── analyticsApi.js       # Analytics API calls
│   └── productsApi.js        # Products API calls
├── components/
│   ├── charts/
│   │   ├── BarChart.jsx      # Reusable generic bar chart
│   │   └── Histogram.jsx     # Discount histogram
│   ├── common/
│   │   ├── ChartCard.jsx     # Chart wrapper with loading/error
│   │   ├── ErrorAlert.jsx
│   │   └── LoadingSpinner.jsx
│   ├── dashboard/
│   │   └── SummaryCards.jsx  # KPI metric cards
│   ├── layout/
│   │   └── Sidebar.jsx       # Navigation + layout shell
│   └── products/
│       ├── FileImport.jsx    # CSV/Excel upload
│       ├── ProductFilters.jsx
│       └── ProductTable.jsx  # MUI Table with pagination
├── features/
│   ├── analytics/
│   │   └── analyticsSlice.js # RTK slice for chart data
│   └── products/
│       └── productSlice.js   # RTK slice for product CRUD
├── hooks/
│   └── useDebounce.js        # Debounce for search input
├── pages/
│   ├── DashboardPage.jsx     # Charts dashboard
│   └── ProductsPage.jsx      # Product table + import
├── store/
│   └── store.js              # Redux store setup
├── theme/
│   └── theme.js              # MUI custom theme
├── utils/
│   └── formatters.js         # Currency, number, % formatters
├── App.jsx                   # Root with router + providers
└── main.jsx                  # React DOM entry
```

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Update NEXT_PUBLIC_API_BASE_URL if the API runs on a different host
```

### 3. Start development server
```bash
npm run dev
```

App runs at **http://localhost:3000**

The Vite dev server proxies `/api` requests to `http://localhost:5000` automatically — no CORS issues in dev.

### 4. Build for production
```bash
npm run build
```

---

## Features
- **Dashboard** – KPI cards + 4 charts (products per category, top reviewed, discount histogram, avg rating per category)
- **Products Table** – paginated, searchable, filterable by category & rating
- **File Import** – drag-free CSV/Excel upload with import result feedback
- **Responsive** – MUI breakpoints; mobile-friendly sidebar
- **Loading states** – skeletons and spinners for every async operation
- **Error handling** – error alerts at component level, never silent failures

---

## Design Principles Applied
- **SOLID / SRP**: Each component owns exactly one concern
- **DRY**: `ChartCard`, `BarChart`, `formatters.js`, `addChartCases` avoid repetition
- **KISS**: No custom state machine – RTK handles async lifecycle cleanly
- **Open/Closed**: `BarChart` is open for extension via props (layout, formatter, height) without modification
- **Separation of Concerns**: API layer → Redux slices → pages → components
