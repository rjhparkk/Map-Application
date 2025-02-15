let map;
let markers = [];
let userMarker;
let directionsService;
let directionsRenderer;

// Wineries data
const wineries = [
    {
      NAME: "Peller Estates Winery",
      LATITUDE: 43.2485,
      LONGITUDE: -79.0717,
      CATEGORY: "restaurant",
      ADDRESS: "290 John St E, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Wayne Gretzky Estates",
      LATITUDE: 43.2491,
      LONGITUDE: -79.0731,
      CATEGORY: "tours",
      ADDRESS: "1219 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Reif Estate Winery",
      LATITUDE: 43.2374,
      LONGITUDE: -79.0833,
      CATEGORY: "organic wine",
      ADDRESS: "15608 Niagara Pkwy, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Jackson-Triggs",
      LATITUDE: 43.2447,
      LONGITUDE: -79.0828,
      CATEGORY: "tours",
      ADDRESS: "2145 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Inniskillin Wines",
      LATITUDE: 43.2283,
      LONGITUDE: -79.0833,
      CATEGORY: "restaurant",
      ADDRESS: "1499 Line 3, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Stratus Vineyards",
      LATITUDE: 43.2512,
      LONGITUDE: -79.0812,
      CATEGORY: "organic wine",
      ADDRESS: "2059 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Konzelmann Estate Winery",
      LATITUDE: 43.2347,
      LONGITUDE: -79.0922,
      CATEGORY: "tours",
      ADDRESS: "1096 Lakeshore Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Trius Winery",
      LATITUDE: 43.2485,
      LONGITUDE: -79.0821,
      CATEGORY: "restaurant",
      ADDRESS: "1249 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Ravine Vineyard Estate Winery",
      LATITUDE: 43.2401,
      LONGITUDE: -79.0893,
      CATEGORY: "organic wine",
      ADDRESS: "1366 York Rd, St. Davids, ON"
    },
    {
      NAME: "Two Sisters Vineyards",
      LATITUDE: 43.2429,
      LONGITUDE: -79.0756,
      CATEGORY: "restaurant",
      ADDRESS: "240 John St E, Niagara-on-the-Lake, ON"
    }
];