// Static reference list of major cities (India, United States, Europe, China) with
// latitude/longitude and IANA timezone, used for Kundli birth-place lookup.
//
// IMPORTANT: `tz` is the IANA timezone *name*, not a fixed UTC offset. Some regions (India, China)
// use a single timezone with no daylight saving, so a fixed offset would happen to work for them —
// but the US and Europe observe DST, so the true UTC offset for a given city depends on the actual
// calendar date of the birth (and, for historical dates, on when local DST rules changed). The
// offset for a city + date is therefore computed dynamically at calculation time (see
// `zonedTimeToUtcMs` in `src/lib/kundli.ts`), never stored here. Coordinates are city-center
// approximations (a few km precision), which is sufficient for ascendant calculation — a
// difference of even 20-30 km at most latitudes shifts the ascendant by well under a minute of
// birth time equivalent, negligible next to the "exact birth time" precision this feature already
// depends on.

export interface CityInfo {
  name: string;
  state: string; // state / province / region label
  country: string;
  lat: number;
  lng: number;
  tz: string; // IANA timezone name, e.g. "America/New_York"
}

const IST = "Asia/Kolkata";

const INDIA_CITIES: CityInfo[] = [
  { name: "New Delhi", state: "Delhi", country: "India", lat: 28.6139, lng: 77.209, tz: IST },
  { name: "Mumbai", state: "Maharashtra", country: "India", lat: 19.076, lng: 72.8777, tz: IST },
  { name: "Bengaluru", state: "Karnataka", country: "India", lat: 12.9716, lng: 77.5946, tz: IST },
  { name: "Chennai", state: "Tamil Nadu", country: "India", lat: 13.0827, lng: 80.2707, tz: IST },
  { name: "Kolkata", state: "West Bengal", country: "India", lat: 22.5726, lng: 88.3639, tz: IST },
  { name: "Hyderabad", state: "Telangana", country: "India", lat: 17.385, lng: 78.4867, tz: IST },
  { name: "Ahmedabad", state: "Gujarat", country: "India", lat: 23.0225, lng: 72.5714, tz: IST },
  { name: "Pune", state: "Maharashtra", country: "India", lat: 18.5204, lng: 73.8567, tz: IST },
  { name: "Surat", state: "Gujarat", country: "India", lat: 21.1702, lng: 72.8311, tz: IST },
  { name: "Jaipur", state: "Rajasthan", country: "India", lat: 26.9124, lng: 75.7873, tz: IST },
  { name: "Lucknow", state: "Uttar Pradesh", country: "India", lat: 26.8467, lng: 80.9462, tz: IST },
  { name: "Kanpur", state: "Uttar Pradesh", country: "India", lat: 26.4499, lng: 80.3319, tz: IST },
  { name: "Nagpur", state: "Maharashtra", country: "India", lat: 21.1458, lng: 79.0882, tz: IST },
  { name: "Indore", state: "Madhya Pradesh", country: "India", lat: 22.7196, lng: 75.8577, tz: IST },
  { name: "Bhopal", state: "Madhya Pradesh", country: "India", lat: 23.2599, lng: 77.4126, tz: IST },
  { name: "Patna", state: "Bihar", country: "India", lat: 25.5941, lng: 85.1376, tz: IST },
  { name: "Vadodara", state: "Gujarat", country: "India", lat: 22.3072, lng: 73.1812, tz: IST },
  { name: "Ghaziabad", state: "Uttar Pradesh", country: "India", lat: 28.6692, lng: 77.4538, tz: IST },
  { name: "Ludhiana", state: "Punjab", country: "India", lat: 30.901, lng: 75.8573, tz: IST },
  { name: "Agra", state: "Uttar Pradesh", country: "India", lat: 27.1767, lng: 78.0081, tz: IST },
  { name: "Nashik", state: "Maharashtra", country: "India", lat: 19.9975, lng: 73.7898, tz: IST },
  { name: "Faridabad", state: "Haryana", country: "India", lat: 28.4089, lng: 77.3178, tz: IST },
  { name: "Meerut", state: "Uttar Pradesh", country: "India", lat: 28.9845, lng: 77.7064, tz: IST },
  { name: "Rajkot", state: "Gujarat", country: "India", lat: 22.3039, lng: 70.8022, tz: IST },
  { name: "Varanasi", state: "Uttar Pradesh", country: "India", lat: 25.3176, lng: 82.9739, tz: IST },
  { name: "Srinagar", state: "Jammu & Kashmir", country: "India", lat: 34.0837, lng: 74.7973, tz: IST },
  { name: "Jammu", state: "Jammu & Kashmir", country: "India", lat: 32.7266, lng: 74.857, tz: IST },
  { name: "Amritsar", state: "Punjab", country: "India", lat: 31.634, lng: 74.8723, tz: IST },
  { name: "Chandigarh", state: "Chandigarh", country: "India", lat: 30.7333, lng: 76.7794, tz: IST },
  { name: "Gwalior", state: "Madhya Pradesh", country: "India", lat: 26.2183, lng: 78.1828, tz: IST },
  { name: "Vijayawada", state: "Andhra Pradesh", country: "India", lat: 16.5062, lng: 80.648, tz: IST },
  { name: "Visakhapatnam", state: "Andhra Pradesh", country: "India", lat: 17.6868, lng: 83.2185, tz: IST },
  { name: "Amaravati", state: "Andhra Pradesh", country: "India", lat: 16.5131, lng: 80.5165, tz: IST },
  { name: "Guwahati", state: "Assam", country: "India", lat: 26.1445, lng: 91.7362, tz: IST },
  { name: "Dispur", state: "Assam", country: "India", lat: 26.1433, lng: 91.7898, tz: IST },
  { name: "Bhubaneswar", state: "Odisha", country: "India", lat: 20.2961, lng: 85.8245, tz: IST },
  { name: "Ranchi", state: "Jharkhand", country: "India", lat: 23.3441, lng: 85.3096, tz: IST },
  { name: "Raipur", state: "Chhattisgarh", country: "India", lat: 21.2514, lng: 81.6296, tz: IST },
  { name: "Dehradun", state: "Uttarakhand", country: "India", lat: 30.3165, lng: 78.0322, tz: IST },
  { name: "Shimla", state: "Himachal Pradesh", country: "India", lat: 31.1048, lng: 77.1734, tz: IST },
  { name: "Panaji", state: "Goa", country: "India", lat: 15.4909, lng: 73.8278, tz: IST },
  { name: "Thiruvananthapuram", state: "Kerala", country: "India", lat: 8.5241, lng: 76.9366, tz: IST },
  { name: "Kochi", state: "Kerala", country: "India", lat: 9.9312, lng: 76.2673, tz: IST },
  { name: "Kozhikode", state: "Kerala", country: "India", lat: 11.2588, lng: 75.7804, tz: IST },
  { name: "Coimbatore", state: "Tamil Nadu", country: "India", lat: 11.0168, lng: 76.9558, tz: IST },
  { name: "Madurai", state: "Tamil Nadu", country: "India", lat: 9.9252, lng: 78.1198, tz: IST },
  { name: "Tiruchirappalli", state: "Tamil Nadu", country: "India", lat: 10.7905, lng: 78.7047, tz: IST },
  { name: "Mysuru", state: "Karnataka", country: "India", lat: 12.2958, lng: 76.6394, tz: IST },
  { name: "Mangaluru", state: "Karnataka", country: "India", lat: 12.9141, lng: 74.856, tz: IST },
  { name: "Hubballi", state: "Karnataka", country: "India", lat: 15.3647, lng: 75.124, tz: IST },
  { name: "Itanagar", state: "Arunachal Pradesh", country: "India", lat: 27.0844, lng: 93.6053, tz: IST },
  { name: "Imphal", state: "Manipur", country: "India", lat: 24.817, lng: 93.9368, tz: IST },
  { name: "Shillong", state: "Meghalaya", country: "India", lat: 25.5788, lng: 91.8933, tz: IST },
  { name: "Aizawl", state: "Mizoram", country: "India", lat: 23.7271, lng: 92.7176, tz: IST },
  { name: "Kohima", state: "Nagaland", country: "India", lat: 25.6751, lng: 94.1086, tz: IST },
  { name: "Agartala", state: "Tripura", country: "India", lat: 23.8315, lng: 91.2868, tz: IST },
  { name: "Gangtok", state: "Sikkim", country: "India", lat: 27.3389, lng: 88.6065, tz: IST },
  { name: "Panchkula", state: "Haryana", country: "India", lat: 30.6942, lng: 76.8606, tz: IST },
  { name: "Gandhinagar", state: "Gujarat", country: "India", lat: 23.2156, lng: 72.6369, tz: IST },
  { name: "Jodhpur", state: "Rajasthan", country: "India", lat: 26.2389, lng: 73.0243, tz: IST },
  { name: "Udaipur", state: "Rajasthan", country: "India", lat: 24.5854, lng: 73.7125, tz: IST },
  { name: "Kota", state: "Rajasthan", country: "India", lat: 25.2138, lng: 75.8648, tz: IST },
  { name: "Ajmer", state: "Rajasthan", country: "India", lat: 26.4499, lng: 74.6399, tz: IST },
  { name: "Allahabad (Prayagraj)", state: "Uttar Pradesh", country: "India", lat: 25.4358, lng: 81.8463, tz: IST },
  { name: "Noida", state: "Uttar Pradesh", country: "India", lat: 28.5355, lng: 77.391, tz: IST },
  { name: "Aurangabad", state: "Maharashtra", country: "India", lat: 19.8762, lng: 75.3433, tz: IST },
  { name: "Thane", state: "Maharashtra", country: "India", lat: 19.2183, lng: 72.9781, tz: IST },
  { name: "Solapur", state: "Maharashtra", country: "India", lat: 17.6599, lng: 75.9064, tz: IST },
  { name: "Jabalpur", state: "Madhya Pradesh", country: "India", lat: 23.1815, lng: 79.9864, tz: IST },
  { name: "Ujjain", state: "Madhya Pradesh", country: "India", lat: 23.1765, lng: 75.7885, tz: IST },
  { name: "Jamshedpur", state: "Jharkhand", country: "India", lat: 22.8046, lng: 86.2029, tz: IST },
  { name: "Dhanbad", state: "Jharkhand", country: "India", lat: 23.7957, lng: 86.4304, tz: IST },
  { name: "Cuttack", state: "Odisha", country: "India", lat: 20.4625, lng: 85.8828, tz: IST },
  { name: "Siliguri", state: "West Bengal", country: "India", lat: 26.7271, lng: 88.3953, tz: IST },
  { name: "Asansol", state: "West Bengal", country: "India", lat: 23.6739, lng: 86.9524, tz: IST },
  { name: "Durgapur", state: "West Bengal", country: "India", lat: 23.5204, lng: 87.3119, tz: IST },
  { name: "Bikaner", state: "Rajasthan", country: "India", lat: 28.0229, lng: 73.3119, tz: IST },
  { name: "Warangal", state: "Telangana", country: "India", lat: 17.9689, lng: 79.5941, tz: IST },
  { name: "Guntur", state: "Andhra Pradesh", country: "India", lat: 16.3067, lng: 80.4365, tz: IST },
  { name: "Tirupati", state: "Andhra Pradesh", country: "India", lat: 13.6288, lng: 79.4192, tz: IST },
  { name: "Puducherry", state: "Puducherry", country: "India", lat: 11.9416, lng: 79.8083, tz: IST },
  { name: "Port Blair", state: "Andaman & Nicobar Islands", country: "India", lat: 11.6234, lng: 92.7265, tz: IST },
  { name: "Silvassa", state: "Dadra & Nagar Haveli", country: "India", lat: 20.2766, lng: 73.0169, tz: IST },
  { name: "Daman", state: "Daman & Diu", country: "India", lat: 20.3974, lng: 72.8328, tz: IST },
  { name: "Kavaratti", state: "Lakshadweep", country: "India", lat: 10.5669, lng: 72.642, tz: IST },
  { name: "Leh", state: "Ladakh", country: "India", lat: 34.1526, lng: 77.577, tz: IST },
  { name: "Varkala", state: "Kerala", country: "India", lat: 8.7379, lng: 76.7163, tz: IST },
];

const ET = "America/New_York";
const CT = "America/Chicago";
const MT = "America/Denver";
const PT = "America/Los_Angeles";
const AZ = "America/Phoenix"; // Mountain Standard Time year-round, no DST

const US_CITIES: CityInfo[] = [
  // Eastern
  { name: "New York", state: "New York", country: "United States", lat: 40.7128, lng: -74.006, tz: ET },
  { name: "Philadelphia", state: "Pennsylvania", country: "United States", lat: 39.9526, lng: -75.1652, tz: ET },
  { name: "Boston", state: "Massachusetts", country: "United States", lat: 42.3601, lng: -71.0589, tz: ET },
  { name: "Washington", state: "District of Columbia", country: "United States", lat: 38.9072, lng: -77.0369, tz: ET },
  { name: "Atlanta", state: "Georgia", country: "United States", lat: 33.749, lng: -84.388, tz: ET },
  { name: "Miami", state: "Florida", country: "United States", lat: 25.7617, lng: -80.1918, tz: ET },
  { name: "Orlando", state: "Florida", country: "United States", lat: 28.5383, lng: -81.3792, tz: ET },
  { name: "Charlotte", state: "North Carolina", country: "United States", lat: 35.2271, lng: -80.8431, tz: ET },
  { name: "Detroit", state: "Michigan", country: "United States", lat: 42.3314, lng: -83.0458, tz: ET },
  { name: "Jacksonville", state: "Florida", country: "United States", lat: 30.3322, lng: -81.6557, tz: ET },
  { name: "Columbus", state: "Ohio", country: "United States", lat: 39.9612, lng: -82.9988, tz: ET },
  { name: "Pittsburgh", state: "Pennsylvania", country: "United States", lat: 40.4406, lng: -79.9959, tz: ET },
  { name: "Baltimore", state: "Maryland", country: "United States", lat: 39.2904, lng: -76.6122, tz: ET },
  { name: "Raleigh", state: "North Carolina", country: "United States", lat: 35.7796, lng: -78.6382, tz: ET },
  { name: "Tampa", state: "Florida", country: "United States", lat: 27.9506, lng: -82.4572, tz: ET },
  { name: "Cleveland", state: "Ohio", country: "United States", lat: 41.4993, lng: -81.6944, tz: ET },
  { name: "Cincinnati", state: "Ohio", country: "United States", lat: 39.1031, lng: -84.512, tz: ET },
  { name: "Buffalo", state: "New York", country: "United States", lat: 42.8864, lng: -78.8784, tz: ET },
  // Central
  { name: "Chicago", state: "Illinois", country: "United States", lat: 41.8781, lng: -87.6298, tz: CT },
  { name: "Houston", state: "Texas", country: "United States", lat: 29.7604, lng: -95.3698, tz: CT },
  { name: "San Antonio", state: "Texas", country: "United States", lat: 29.4241, lng: -98.4936, tz: CT },
  { name: "Dallas", state: "Texas", country: "United States", lat: 32.7767, lng: -96.797, tz: CT },
  { name: "Austin", state: "Texas", country: "United States", lat: 30.2672, lng: -97.7431, tz: CT },
  { name: "Fort Worth", state: "Texas", country: "United States", lat: 32.7555, lng: -97.3308, tz: CT },
  { name: "Memphis", state: "Tennessee", country: "United States", lat: 35.1495, lng: -90.049, tz: CT },
  { name: "Nashville", state: "Tennessee", country: "United States", lat: 36.1627, lng: -86.7816, tz: CT },
  { name: "Milwaukee", state: "Wisconsin", country: "United States", lat: 43.0389, lng: -87.9065, tz: CT },
  { name: "Kansas City", state: "Missouri", country: "United States", lat: 39.0997, lng: -94.5786, tz: CT },
  { name: "Oklahoma City", state: "Oklahoma", country: "United States", lat: 35.4676, lng: -97.5164, tz: CT },
  { name: "Minneapolis", state: "Minnesota", country: "United States", lat: 44.9778, lng: -93.265, tz: CT },
  { name: "New Orleans", state: "Louisiana", country: "United States", lat: 29.9511, lng: -90.0715, tz: CT },
  { name: "St. Louis", state: "Missouri", country: "United States", lat: 38.627, lng: -90.1994, tz: CT },
  // Mountain
  { name: "Denver", state: "Colorado", country: "United States", lat: 39.7392, lng: -104.9903, tz: MT },
  { name: "Phoenix", state: "Arizona", country: "United States", lat: 33.4484, lng: -112.074, tz: AZ },
  { name: "Albuquerque", state: "New Mexico", country: "United States", lat: 35.0844, lng: -106.6504, tz: MT },
  { name: "Colorado Springs", state: "Colorado", country: "United States", lat: 38.8339, lng: -104.8214, tz: MT },
  { name: "Salt Lake City", state: "Utah", country: "United States", lat: 40.7608, lng: -111.891, tz: MT },
  { name: "Tucson", state: "Arizona", country: "United States", lat: 32.2226, lng: -110.9747, tz: AZ },
  { name: "Boise", state: "Idaho", country: "United States", lat: 43.615, lng: -116.2023, tz: MT },
  { name: "El Paso", state: "Texas", country: "United States", lat: 31.7619, lng: -106.485, tz: MT },
  // Pacific
  { name: "Los Angeles", state: "California", country: "United States", lat: 34.0522, lng: -118.2437, tz: PT },
  { name: "San Diego", state: "California", country: "United States", lat: 32.7157, lng: -117.1611, tz: PT },
  { name: "San Jose", state: "California", country: "United States", lat: 37.3382, lng: -121.8863, tz: PT },
  { name: "San Francisco", state: "California", country: "United States", lat: 37.7749, lng: -122.4194, tz: PT },
  { name: "Seattle", state: "Washington", country: "United States", lat: 47.6062, lng: -122.3321, tz: PT },
  { name: "Portland", state: "Oregon", country: "United States", lat: 45.5152, lng: -122.6784, tz: PT },
  { name: "Sacramento", state: "California", country: "United States", lat: 38.5816, lng: -121.4944, tz: PT },
  { name: "Las Vegas", state: "Nevada", country: "United States", lat: 36.1699, lng: -115.1398, tz: PT },
  { name: "Fresno", state: "California", country: "United States", lat: 36.7378, lng: -119.7871, tz: PT },
  { name: "Oakland", state: "California", country: "United States", lat: 37.8044, lng: -122.2712, tz: PT },
  // Alaska / Hawaii
  { name: "Anchorage", state: "Alaska", country: "United States", lat: 61.2181, lng: -149.9003, tz: "America/Anchorage" },
  { name: "Honolulu", state: "Hawaii", country: "United States", lat: 21.3069, lng: -157.8583, tz: "Pacific/Honolulu" },
];

const EUROPE_CITIES: CityInfo[] = [
  // UK & Ireland
  { name: "London", state: "England", country: "United Kingdom", lat: 51.5072, lng: -0.1276, tz: "Europe/London" },
  { name: "Manchester", state: "England", country: "United Kingdom", lat: 53.4808, lng: -2.2426, tz: "Europe/London" },
  { name: "Birmingham", state: "England", country: "United Kingdom", lat: 52.4862, lng: -1.8904, tz: "Europe/London" },
  { name: "Liverpool", state: "England", country: "United Kingdom", lat: 53.4084, lng: -2.9916, tz: "Europe/London" },
  { name: "Edinburgh", state: "Scotland", country: "United Kingdom", lat: 55.9533, lng: -3.1883, tz: "Europe/London" },
  { name: "Glasgow", state: "Scotland", country: "United Kingdom", lat: 55.8642, lng: -4.2518, tz: "Europe/London" },
  { name: "Belfast", state: "Northern Ireland", country: "United Kingdom", lat: 54.5973, lng: -5.9301, tz: "Europe/London" },
  { name: "Bristol", state: "England", country: "United Kingdom", lat: 51.4545, lng: -2.5879, tz: "Europe/London" },
  { name: "Leeds", state: "England", country: "United Kingdom", lat: 53.8008, lng: -1.5491, tz: "Europe/London" },
  { name: "Dublin", state: "Leinster", country: "Ireland", lat: 53.3498, lng: -6.2603, tz: "Europe/Dublin" },
  // Central Europe
  { name: "Paris", state: "Île-de-France", country: "France", lat: 48.8566, lng: 2.3522, tz: "Europe/Paris" },
  { name: "Berlin", state: "Berlin", country: "Germany", lat: 52.52, lng: 13.405, tz: "Europe/Berlin" },
  { name: "Munich", state: "Bavaria", country: "Germany", lat: 48.1351, lng: 11.582, tz: "Europe/Berlin" },
  { name: "Frankfurt", state: "Hesse", country: "Germany", lat: 50.1109, lng: 8.6821, tz: "Europe/Berlin" },
  { name: "Hamburg", state: "Hamburg", country: "Germany", lat: 53.5511, lng: 9.9937, tz: "Europe/Berlin" },
  { name: "Madrid", state: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, tz: "Europe/Madrid" },
  { name: "Barcelona", state: "Catalonia", country: "Spain", lat: 41.3874, lng: 2.1686, tz: "Europe/Madrid" },
  { name: "Rome", state: "Lazio", country: "Italy", lat: 41.9028, lng: 12.4964, tz: "Europe/Rome" },
  { name: "Milan", state: "Lombardy", country: "Italy", lat: 45.4642, lng: 9.19, tz: "Europe/Rome" },
  { name: "Amsterdam", state: "North Holland", country: "Netherlands", lat: 52.3676, lng: 4.9041, tz: "Europe/Amsterdam" },
  { name: "Brussels", state: "Brussels", country: "Belgium", lat: 50.8503, lng: 4.3517, tz: "Europe/Brussels" },
  { name: "Vienna", state: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, tz: "Europe/Vienna" },
  { name: "Zurich", state: "Zurich", country: "Switzerland", lat: 47.3769, lng: 8.5417, tz: "Europe/Zurich" },
  { name: "Geneva", state: "Geneva", country: "Switzerland", lat: 46.2044, lng: 6.1432, tz: "Europe/Zurich" },
  { name: "Warsaw", state: "Masovian", country: "Poland", lat: 52.2297, lng: 21.0122, tz: "Europe/Warsaw" },
  { name: "Prague", state: "Prague", country: "Czechia", lat: 50.0755, lng: 14.4378, tz: "Europe/Prague" },
  { name: "Budapest", state: "Budapest", country: "Hungary", lat: 47.4979, lng: 19.0402, tz: "Europe/Budapest" },
  { name: "Stockholm", state: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686, tz: "Europe/Stockholm" },
  { name: "Oslo", state: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522, tz: "Europe/Oslo" },
  { name: "Copenhagen", state: "Capital Region", country: "Denmark", lat: 55.6761, lng: 12.5683, tz: "Europe/Copenhagen" },
  { name: "Lisbon", state: "Lisbon", country: "Portugal", lat: 38.7223, lng: -9.1393, tz: "Europe/Lisbon" },
  // Eastern Europe
  { name: "Athens", state: "Attica", country: "Greece", lat: 37.9838, lng: 23.7275, tz: "Europe/Athens" },
  { name: "Helsinki", state: "Uusimaa", country: "Finland", lat: 60.1699, lng: 24.9384, tz: "Europe/Helsinki" },
  { name: "Bucharest", state: "Bucharest", country: "Romania", lat: 44.4268, lng: 26.1025, tz: "Europe/Bucharest" },
  { name: "Kyiv", state: "Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234, tz: "Europe/Kyiv" },
  { name: "Moscow", state: "Moscow", country: "Russia", lat: 55.7558, lng: 37.6173, tz: "Europe/Moscow" },
  { name: "Saint Petersburg", state: "Leningrad Oblast", country: "Russia", lat: 59.9311, lng: 30.3609, tz: "Europe/Moscow" },
  { name: "Istanbul", state: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, tz: "Europe/Istanbul" },
  { name: "Sofia", state: "Sofia", country: "Bulgaria", lat: 42.6977, lng: 23.3219, tz: "Europe/Sofia" },
  { name: "Riga", state: "Riga", country: "Latvia", lat: 56.9496, lng: 24.1052, tz: "Europe/Riga" },
  { name: "Vilnius", state: "Vilnius", country: "Lithuania", lat: 54.6872, lng: 25.2797, tz: "Europe/Vilnius" },
  { name: "Tallinn", state: "Harju", country: "Estonia", lat: 59.437, lng: 24.7536, tz: "Europe/Tallinn" },
];

const CN = "Asia/Shanghai"; // single nationwide timezone, no DST

const CHINA_CITIES: CityInfo[] = [
  { name: "Beijing", state: "Beijing", country: "China", lat: 39.9042, lng: 116.4074, tz: CN },
  { name: "Shanghai", state: "Shanghai", country: "China", lat: 31.2304, lng: 121.4737, tz: CN },
  { name: "Guangzhou", state: "Guangdong", country: "China", lat: 23.1291, lng: 113.2644, tz: CN },
  { name: "Shenzhen", state: "Guangdong", country: "China", lat: 22.5431, lng: 114.0579, tz: CN },
  { name: "Chengdu", state: "Sichuan", country: "China", lat: 30.5728, lng: 104.0668, tz: CN },
  { name: "Chongqing", state: "Chongqing", country: "China", lat: 29.563, lng: 106.5516, tz: CN },
  { name: "Tianjin", state: "Tianjin", country: "China", lat: 39.3434, lng: 117.3616, tz: CN },
  { name: "Wuhan", state: "Hubei", country: "China", lat: 30.5928, lng: 114.3055, tz: CN },
  { name: "Xi'an", state: "Shaanxi", country: "China", lat: 34.3416, lng: 108.9398, tz: CN },
  { name: "Hangzhou", state: "Zhejiang", country: "China", lat: 30.2741, lng: 120.1551, tz: CN },
  { name: "Nanjing", state: "Jiangsu", country: "China", lat: 32.0603, lng: 118.7969, tz: CN },
  { name: "Suzhou", state: "Jiangsu", country: "China", lat: 31.2989, lng: 120.5853, tz: CN },
  { name: "Qingdao", state: "Shandong", country: "China", lat: 36.0671, lng: 120.3826, tz: CN },
  { name: "Dalian", state: "Liaoning", country: "China", lat: 38.914, lng: 121.6147, tz: CN },
  { name: "Xiamen", state: "Fujian", country: "China", lat: 24.4798, lng: 118.0894, tz: CN },
  { name: "Harbin", state: "Heilongjiang", country: "China", lat: 45.8038, lng: 126.5349, tz: CN },
  { name: "Shenyang", state: "Liaoning", country: "China", lat: 41.8057, lng: 123.4315, tz: CN },
  { name: "Jinan", state: "Shandong", country: "China", lat: 36.6512, lng: 117.1201, tz: CN },
  { name: "Zhengzhou", state: "Henan", country: "China", lat: 34.7466, lng: 113.6254, tz: CN },
  { name: "Changsha", state: "Hunan", country: "China", lat: 28.2282, lng: 112.9388, tz: CN },
  { name: "Kunming", state: "Yunnan", country: "China", lat: 25.0389, lng: 102.7183, tz: CN },
  { name: "Urumqi", state: "Xinjiang", country: "China", lat: 43.8256, lng: 87.6168, tz: CN },
  { name: "Lhasa", state: "Tibet", country: "China", lat: 29.652, lng: 91.1721, tz: CN },
  { name: "Nanning", state: "Guangxi", country: "China", lat: 22.817, lng: 108.3665, tz: CN },
  { name: "Hong Kong", state: "Hong Kong", country: "China", lat: 22.3193, lng: 114.1694, tz: "Asia/Hong_Kong" },
  { name: "Macau", state: "Macau", country: "China", lat: 22.1987, lng: 113.5439, tz: "Asia/Macau" },
];

export const ALL_CITIES: CityInfo[] = [
  ...INDIA_CITIES,
  ...US_CITIES,
  ...EUROPE_CITIES,
  ...CHINA_CITIES,
];

// Kept for compatibility with any code that referred to the India-only list by name.
export const INDIAN_CITIES = INDIA_CITIES;

export const CITY_GROUPS: { country: string; cities: CityInfo[] }[] = [
  { country: "India", cities: INDIA_CITIES },
  { country: "United States", cities: US_CITIES },
  { country: "Europe", cities: EUROPE_CITIES },
  { country: "China", cities: CHINA_CITIES },
];
