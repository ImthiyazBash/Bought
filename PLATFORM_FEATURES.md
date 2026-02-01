# Bought - SME Succession Marketplace Platform Features

## Overview
Bought is a web-based platform for discovering succession opportunities in Hamburg SMEs (Small and Medium Enterprises). The platform helps identify companies with potential succession needs based on shareholder demographics, financial health, and business characteristics.

---

## Core Features

### 1. Multi-Language Support
**Languages:** English (default) & German

- **Language Switcher**: Toggle between EN/DE in the top-right navigation
- **Comprehensive Translation**: All UI elements, labels, and content translated
- **Locale-Based Routing**: URLs structured as `/en/` or `/de/` for SEO and shareability
- **Custom i18n Implementation**: Built with React Context for static export compatibility

### 2. Nachfolge-Score System (Succession Opportunity Scoring)
**Scale:** 1-10 (higher = greater succession opportunity)

**Scoring Logic:**
- **Score 10**: Shareholder age 65+ (highest succession opportunity)
- **Score 7-9**: Shareholder age 55-64 (medium-high opportunity)
- **Score 1-6**: Shareholder age <55 (lower opportunity)

**Calculation Method:**
- Based on the oldest shareholder's age
- Linear scaling within age ranges
- Displayed on both company cards and detail pages with color-coded badges:
  - Red (Score 10): High succession opportunity
  - Amber (Score 7-9): Medium succession opportunity
  - Green (Score 1-6): Lower succession opportunity

### 3. Advanced Search & Filtering

**Search Capabilities:**
- Company name search (case-insensitive)
- City-based search
- Real-time filtering with instant results

**Filter Options:**
1. **Employee Count Range**
   - Minimum: 0 employees
   - Maximum: 1,000 employees
   - Slider-based selection

2. **Equity Range**
   - Minimum: €0
   - Maximum: €50,000,000
   - Financial health indicator

3. **Net Income Range**
   - Minimum: -€1,000,000 (losses)
   - Maximum: €10,000,000 (profits)
   - Profitability assessment

4. **Minimum Nachfolge-Score**
   - Range: 1-10
   - Filter companies by succession opportunity level

5. **City Filter**
   - Hamburg
   - Buxtehude
   - "All Cities" option
   - Integrated with map zoom functionality

**Results Display:**
- Shows filtered count vs. total count
- "Clear all filters" quick reset option

### 4. Intelligent Data Completeness Sorting

**Primary Sort:** Data completeness score (highest first)

**Completeness Scoring Criteria:**
- **Core Business Data** (highest weight):
  - Company name (2 points)
  - Employee count >0 (3 points)
  - Equity ≠0 (3 points)
  - Net income ≠0 (3 points)
  - Total assets >0 (2 points)

- **Financial Details** (medium weight):
  - Retained earnings (1 point)
  - Liabilities (1 point)
  - Receivables (1 point)
  - Cash assets (1 point)

- **Location Data** (medium weight):
  - Street address (2 points)
  - ZIP code (1 point)
  - City (2 points)
  - Country (1 point)

- **Industry Classification** (medium weight):
  - WZ code (2 points)
  - WZ description (1 point)

- **Shareholder Data** (high weight):
  - Shareholder details array (3 points)
  - Shareholder names (2 points)
  - Dates of birth (2 points)
  - Last ownership change year (2 points)

- **Data Recency** (medium weight):
  - Report year ≥2020 (2 points)
  - Report year ≥2015 (1 point)

**Secondary Sort:** Nachfolge-Score (higher scores first)

**Tertiary Sort:** Alphabetical by company name

**User Benefit:** Companies with complete, actionable data appear first, reducing time spent on incomplete profiles.

### 5. Interactive Map Visualization

**Technology:** Mapbox GL JS

**Features:**
- **Real-Time Geocoding**: Converts company addresses to map coordinates
- **Clustered Markers**: Color-coded by Nachfolge-Score
  - Red circles: Score 10 (age 65+)
  - Amber circles: Score 7-9 (age 55-64)
  - Green circles: Score 1-6 (age <55)
- **Hover Interactions**:
  - Hover over marker → highlights corresponding company card
  - Hover over company card → highlights map marker
  - Synchronized highlighting between map and list
- **Click Navigation**: Click marker to view company detail page
- **Score Legend**: Visual guide showing color meanings
- **City Zoom**: Automatically zooms to selected city bounds when filtered
- **Responsive Display**: Hidden on mobile, visible on desktop (lg+ breakpoint)

**Map Coverage:**
- Default view: Hamburg metropolitan area
- Zoom levels: City-specific bounds for Hamburg and Buxtehude
- Fallback: Default Hamburg center if no city selected

### 6. Company Cards (List View)

**Display Format:** 2-column responsive grid

**Card Components:**

1. **Header Section** (Gradient background)
   - Company name (large, bold)
   - Short address (city display)

2. **Badge Row**
   - Nachfolge-Score badge (color-coded)
   - "Years since ownership change" badge (if >10 years)

3. **Industry Classification**
   - WZ code badge (e.g., "WZ 47.11.1")
   - Industry description (2-line truncated text)
   - Separated by border for clarity

4. **Financial Metrics Grid** (2x2)
   - Equity (€)
   - Net Income (€, color-coded: green=profit, red=loss)
   - Total Assets (€)
   - Employee count

5. **Footer**
   - Data year: "Data from {year}"
   - "View Details →" link with hover underline

**Interaction:**
- Hover effect: Border color change, shadow, slight scale increase
- Synchronized with map markers
- Click anywhere to navigate to detail page

### 7. Company Detail Pages

**URL Structure:** `/{locale}/company/{id}`

**Page Sections:**

1. **Hero Section** (Dark gradient background)
   - Company name (large heading)
   - Full address with location icon
   - Nachfolge-Score badge
   - Years since ownership change badge
   - "Back to listings" link

2. **Key Metrics** (4 elevated cards)
   - Equity (with report year subtext)
   - Total Assets
   - Net Income (with trend indicator: ↑ positive, ↓ negative)
   - Employee count

3. **Financial Charts** (Left column, 2/3 width)
   - Multi-year financial trends (if historical data available)
   - Visualizations for equity, assets, income over time
   - Built with Recharts library
   - Fallback message if insufficient historical data

4. **Company Details Card** (Right column, 1/3 width)
   - **Data Year**: Report year for financial data
   - **Corporate Purpose**:
     - WZ code badge (on separate line)
     - Full industry description (readable paragraph)
   - **Last Ownership Change**: Year and "X years ago" calculation
   - **Financial Details**:
     - Receivables
     - Cash Assets
     - Liabilities
     - Retained Earnings

5. **Location Card**
   - Full street address
   - ZIP code and city
   - Country
   - "View on Google Maps" link (opens in new tab)

6. **Contact CTA Card** (Gradient background)
   - "Interested in this opportunity?" heading
   - Description text
   - "Request Information" button
   - Positioned for high visibility

7. **Shareholder Information Section**
   - **High Opportunity Alert**: Banner if shareholders age 65+
   - **Ownership Distribution Chart**: Pie chart showing percentage ownership
   - **Shareholder Details Table**:
     - Name
     - Ownership percentage
     - Date of birth
     - Age (calculated)
     - Nachfolge-Score (individual, color-coded badge)
   - **Missing Data Handling**: "No shareholder information available" message

### 8. Shareholder Analysis

**Data Processing:**
- Parses shareholder_names and shareholder_dobs fields
- Calculates current age from date of birth
- Computes individual Nachfolge-Scores
- Identifies multiple shareholders with ownership percentages
- Handles missing or incomplete data gracefully

**Visualization:**
- Ownership distribution pie chart (Recharts)
- Table view with sortable columns
- Age-based color coding in badges
- Clear indication of high succession opportunities

### 9. Navigation & User Experience

**Navigation Bar:**
- Fixed position at top
- Logo/brand name with home link
- Language switcher (EN/DE toggle)
- Sign In button (styled, currently non-functional)
- Responsive on all screen sizes

**Routing:**
- Locale-aware URLs for all pages
- Breadcrumb-style "Back to listings" on detail pages
- Automatic locale preservation when navigating
- Clean URLs with trailing slashes

**Loading States:**
- Spinner with "Loading companies..." text on main page
- "Loading company details..." on individual pages
- Centered, branded loading indicators

**Error Handling:**
- Connection error messages with retry button
- 404 "Company Not Found" page with home link
- "No companies found" state with filter reset option
- Graceful handling of missing data fields (displays "N/A")

### 10. Performance & Optimization

**Static Site Generation:**
- Pre-rendered pages at build time
- 202+ static pages generated (2 locales × 101 companies)
- Instant page loads with static HTML
- No server-side rendering overhead

**Data Fetching:**
- Direct Supabase client-side queries
- Cached company data in component state
- Efficient filtering with useMemo hooks
- Real-time search without API calls

**Map Performance:**
- Custom marker implementation for better control
- Efficient event listeners with cleanup
- Throttled hover events
- Conditional rendering (desktop only)

**Code Splitting:**
- Next.js automatic code splitting
- Lazy loading of map components
- Optimized bundle sizes

### 11. Responsive Design

**Breakpoints:**
- Mobile: Single column layout
- Tablet (md): 2-column company cards
- Desktop (lg): Split view with map + cards

**Mobile Optimizations:**
- Map hidden on mobile devices
- Touch-friendly button sizes
- Simplified navigation
- Readable font sizes
- Proper spacing and padding

**Desktop Features:**
- Side-by-side map and list view
- Hover interactions
- Larger data displays
- Multi-column layouts

### 12. Data Integration

**Database Schema:**
- **Table**: "Hamburg Targets"
- **Key Fields**:
  - `id`, `created_at`, `company_name`
  - `report_year`, `equity_eur`, `total_assets_eur`, `net_income_eur`
  - `retained_earnings_eur`, `liabilities_eur`, `receivables_eur`, `cash_assets_eur`
  - `employee_count`
  - `shareholder_names`, `shareholder_dobs`, `shareholder_details`
  - `last_ownership_change_year`
  - `address_street`, `address_zip`, `address_city`, `address_country`
  - `wz_code`, `wz_description`

**Data Quality:**
- Handles null values gracefully
- Formats currencies with proper locale (€ symbol, comma separators)
- Calculates derived metrics (age, years since change, scores)
- Validates and parses complex fields (shareholder arrays)

### 13. Industry Classification

**WZ Code System** (Wirtschaftszweig / Economic Sector):
- German standard industry classification
- Displayed as badge (e.g., "WZ 47.11.1")
- Full text description provided
- Helps users quickly identify business sectors
- Searchable and filterable

**Display Locations:**
- Company cards (truncated to 2 lines)
- Company detail pages (full description)
- Part of data completeness scoring

### 14. Deployment & Hosting

**Platform:** GitHub Pages

**Build Configuration:**
- Next.js static export (`output: 'export'`)
- Base path: `/Bought` for GitHub Pages subdirectory
- Environment variables for Supabase and Mapbox credentials
- Automatic deployment via GitHub Actions

**CI/CD Pipeline:**
1. Push to main branch triggers workflow
2. Checkout code and setup Node.js
3. Install dependencies with `npm ci`
4. Build with production environment variables
5. Add `.nojekyll` file for proper routing
6. Upload build artifact
7. Deploy to GitHub Pages

**Accessibility:**
- Public URL: `https://imthiyazbasha13.github.io/Bought/`
- HTTPS enabled by default
- Fast CDN delivery via GitHub

---

## Technical Stack

### Frontend
- **Framework**: Next.js 15.5.11 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Routing**: Next.js file-based routing with locale support

### Libraries
- **Mapping**: Mapbox GL JS
- **Charts**: Recharts
- **Internationalization**: Custom React Context implementation
- **Database**: Supabase (PostgreSQL)

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Code Quality**: TypeScript strict mode, ESLint

---

## User Workflows

### Workflow 1: Browse Companies
1. User lands on homepage (`/en/` or `/de/`)
2. Views list of companies sorted by data completeness
3. Hovers over companies to see map location
4. Applies filters (city, score, employees, equity, income)
5. Clicks on company card to view details

### Workflow 2: Identify High-Opportunity Targets
1. User sets minimum Nachfolge-Score filter to 10
2. System shows only companies with shareholders age 65+
3. User reviews financial metrics on cards
4. Clicks through to detailed pages
5. Reviews shareholder information and ownership distribution
6. Requests more information via CTA button

### Workflow 3: Geographic Exploration
1. User selects city filter (Hamburg or Buxtehude)
2. Map automatically zooms to city bounds
3. User views only companies in selected city
4. Hovers over map markers to highlight company cards
5. Clicks markers for direct navigation to detail pages

### Workflow 4: Language Preference
1. User clicks language switcher in nav bar
2. Entire UI translates to selected language
3. URL updates to reflect locale (e.g., `/en/` → `/de/`)
4. Preference maintained during navigation
5. All labels, buttons, and content translated

---

## Data Privacy & Security

### Current Implementation
- **Read-Only Access**: Application uses Supabase anonymous key (read-only)
- **Public Data**: All displayed data is publicly accessible
- **No User Authentication**: Sign In button currently non-functional
- **Client-Side Processing**: All calculations performed in browser
- **No Personal Data Collection**: No cookies, tracking, or analytics

### Future Considerations
- Authentication system for gated content
- Role-based access control for sensitive data
- Contact form submissions with encryption
- GDPR compliance for European users
- Privacy policy and terms of service

---

## Future Enhancement Opportunities

1. **Advanced Filtering**
   - Industry sector filters
   - Revenue growth trends
   - Profitability ratios
   - Multi-select city filters

2. **Comparison Features**
   - Side-by-side company comparison
   - Benchmark against industry averages
   - Save favorites/watchlist

3. **Analytics Dashboard**
   - Market trends visualization
   - Sector analysis
   - Succession opportunity heatmaps

4. **User Accounts**
   - Saved searches
   - Email alerts for new matches
   - Custom filter presets
   - Interaction history

5. **Data Enrichment**
   - News integration (company mentions)
   - Social media presence
   - Website quality assessment
   - Review/rating system

6. **Export Capabilities**
   - PDF company reports
   - Excel export of filtered results
   - Email sharing functionality

7. **Communication Features**
   - Direct messaging to company owners
   - Request information workflow
   - Schedule meeting/call functionality

---

## Success Metrics

### Current Capabilities
- Total companies in database: ~100 Hamburg SMEs
- Data completeness range: 1-40 points
- Average Nachfolge-Score: Distribution across 1-10 scale
- Page load time: <2s for static pages
- Mobile responsive: 100% functional on all devices

### KPIs to Track (Future)
- User engagement: Time on site, pages per session
- Conversion: Information requests per visit
- Search effectiveness: Filters used, results clicked
- Geographic reach: User locations accessing platform
- Language preference: EN vs DE usage ratio

---

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios meeting WCAG standards
- Screen reader compatible
- Responsive text sizing
- Touch-friendly tap targets (44px minimum)

---

## Browser Compatibility

**Tested Browsers:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

**Requirements:**
- JavaScript enabled
- Modern CSS support (Grid, Flexbox)
- ES6+ JavaScript features

---

## Maintenance & Updates

### Content Updates
- Database refreshed via Supabase admin panel
- New companies automatically appear after page rebuild
- Financial data updated annually (based on report_year)

### Code Updates
- Continuous deployment via GitHub Actions
- Version control with Git
- Pull request workflow for changes
- Automated build verification before deployment

### Dependencies
- Regular npm package updates
- Security vulnerability monitoring
- Next.js framework updates as released
- Tailwind CSS updates for new features

---

## Contact & Support

**Repository**: https://github.com/ImthiyazBasha13/Bought

**Live Site**: https://imthiyazbasha13.github.io/Bought/

**Documentation**: This file (PLATFORM_FEATURES.md)

---

## Conclusion

Bought is a comprehensive, production-ready platform for discovering SME succession opportunities in Hamburg. The platform combines intelligent scoring algorithms, advanced filtering, interactive mapping, and multi-language support to provide users with actionable insights into potential business acquisition targets.

The data completeness scoring ensures users spend time on high-quality leads, while the Nachfolge-Score system prioritizes companies with imminent succession needs. The dual-language support makes the platform accessible to both local German businesses and international investors.

With its modern tech stack, responsive design, and user-friendly interface, Bought demonstrates best practices in web development while solving a real-world business challenge in the SME succession market.

---

**Last Updated**: February 1, 2026
**Version**: 1.0
**Platform Status**: Production Ready
