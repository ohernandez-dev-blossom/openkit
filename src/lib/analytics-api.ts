/**
 * Google Analytics 4 API Integration
 * 
 * This file provides functions to fetch analytics data from Google Analytics 4.
 * 
 * SETUP REQUIRED:
 * 1. Create a Google Cloud project
 * 2. Enable Google Analytics Data API
 * 3. Create a service account with Analytics Viewer role
 * 4. Download service account JSON key
 * 5. Set environment variables (see .env.example)
 */

export interface GA4Credentials {
  projectId: string;
  privateKey: string;
  clientEmail: string;
}

export interface AnalyticsDateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface ToolAnalytics {
  slug: string;
  name: string;
  pageViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  bounceRate: number;
  trend: number;
}

export interface TrafficSourceData {
  source: string;
  sessions: number;
  percentage: number;
  trend: number;
}

export interface AnalyticsData {
  totalPageViews: number;
  totalUniqueUsers: number;
  avgSessionDuration: number;
  bounceRate: number;
  topTools: ToolAnalytics[];
  trafficSources: TrafficSourceData[];
  dailyStats: { date: string; views: number; users: number }[];
}

/**
 * Fetch analytics data from Google Analytics 4
 * 
 * @param propertyId - GA4 property ID (format: properties/123456789)
 * @param dateRange - Date range for the query
 * @param credentials - Service account credentials
 * @returns Analytics data
 */
export async function fetchGA4Data(
  _propertyId: string,
  _dateRange: AnalyticsDateRange,
  _credentials: GA4Credentials
): Promise<AnalyticsData> {
  // This is a placeholder implementation
  // In production, this would use the Google Analytics Data API
  
  throw new Error("GA4 integration not yet implemented. See docs/ANALYTICS_SETUP.md for setup instructions.");
  
  // Example implementation structure:
  // 1. Authenticate with service account
  // 2. Make API request to runReport endpoint
  // 3. Parse response and transform to AnalyticsData format
  // 4. Calculate trends by comparing with previous period
  
  /* Example API request structure:
  
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'},
      body: JSON.stringify({
        dateRanges: [{ startDate: dateRange.startDate, endDate: dateRange.endDate }],
        dimensions: [
          { name: 'pagePath' },
          { name: 'source' },
        ],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ]})}
  );
  
  */
}

/**
 * Get date range based on preset
 */
export function getDateRange(preset: '7d' | '30d' | '90d' | 'all'): AnalyticsDateRange {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (preset) {
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
    case 'all':
      startDate.setFullYear(2024, 0, 1); // Adjust to your launch date
      break;
  }
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]};
}

/**
 * Calculate percentage change between two values
 */
export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Extract tool slug from page path
 * e.g., "/json" -> "json", "/base64" -> "base64"
 */
export function extractToolSlug(pagePath: string): string | null {
  const match = pagePath.match(/^\/([a-z0-9-]+)$/);
  return match ? match[1] : null;
}

/**
 * Mock data generator for development/demo
 */
export function generateMockAnalytics(preset: '7d' | '30d' | '90d' | 'all'): AnalyticsData {
  const days = preset === '7d' ? 7 : preset === '30d' ? 30 : preset === '90d' ? 90 : 365;
  const multiplier = preset === 'all' ? 10 : 1;
  
  // Generate daily stats
  const dailyStats = Array.from({ length: Math.min(days, 30) }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (Math.min(days, 30) - 1 - i));
    return {
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 500 + 200) * multiplier,
      users: Math.floor(Math.random() * 300 + 100) * multiplier};
  });
  
  const totalPageViews = dailyStats.reduce((sum, d) => sum + d.views, 0);
  const totalUniqueUsers = dailyStats.reduce((sum, d) => sum + d.users, 0);
  
  return {
    totalPageViews,
    totalUniqueUsers,
    avgSessionDuration: Math.floor(Math.random() * 120 + 180),
    bounceRate: Math.random() * 20 + 30,
    topTools: [
      { slug: "json", name: "JSON Formatter", pageViews: 15234 * multiplier, uniqueVisitors: 12456 * multiplier, avgTimeOnPage: 145, bounceRate: 32.4, trend: 12.5 },
      { slug: "base64", name: "Base64 Encoder", pageViews: 12891 * multiplier, uniqueVisitors: 10234 * multiplier, avgTimeOnPage: 98, bounceRate: 28.1, trend: 8.3 },
      { slug: "uuid", name: "UUID Generator", pageViews: 11456 * multiplier, uniqueVisitors: 9876 * multiplier, avgTimeOnPage: 67, bounceRate: 45.2, trend: -2.1 },
      { slug: "colors", name: "Color Converter", pageViews: 9876 * multiplier, uniqueVisitors: 8234 * multiplier, avgTimeOnPage: 234, bounceRate: 21.5, trend: 15.7 },
      { slug: "hash", name: "Hash Generator", pageViews: 8765 * multiplier, uniqueVisitors: 7456 * multiplier, avgTimeOnPage: 112, bounceRate: 35.8, trend: -5.2 },
      { slug: "regex", name: "Regex Tester", pageViews: 7654 * multiplier, uniqueVisitors: 6543 * multiplier, avgTimeOnPage: 456, bounceRate: 18.9, trend: 22.1 },
      { slug: "qr", name: "QR Code Generator", pageViews: 6543 * multiplier, uniqueVisitors: 5432 * multiplier, avgTimeOnPage: 89, bounceRate: 41.2, trend: 3.4 },
      { slug: "jwt", name: "JWT Decoder", pageViews: 5432 * multiplier, uniqueVisitors: 4321 * multiplier, avgTimeOnPage: 178, bounceRate: 29.7, trend: -1.8 },
      { slug: "markdown", name: "Markdown Editor", pageViews: 4321 * multiplier, uniqueVisitors: 3456 * multiplier, avgTimeOnPage: 567, bounceRate: 15.3, trend: 18.9 },
      { slug: "password", name: "Password Generator", pageViews: 3987 * multiplier, uniqueVisitors: 3124 * multiplier, avgTimeOnPage: 45, bounceRate: 52.1, trend: 7.2 },
    ],
    trafficSources: [
      { source: "direct", sessions: 12456 * multiplier, percentage: 42.3, trend: 5.2 },
      { source: "organic search", sessions: 8765 * multiplier, percentage: 29.8, trend: 12.7 },
      { source: "social", sessions: 4321 * multiplier, percentage: 14.7, trend: -3.4 },
      { source: "referral", sessions: 2876 * multiplier, percentage: 9.8, trend: 8.1 },
      { source: "email", sessions: 1002 * multiplier, percentage: 3.4, trend: -1.2 },
    ],
    dailyStats};
}
