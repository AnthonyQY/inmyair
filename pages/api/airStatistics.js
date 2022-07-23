import axios from "axios";

export default async function handler(req, res) {
  try {
    const stats = await getAirStatistics(req.query.location);
    res.status(200).json(stats.data.list[0]);
  } catch (error) {
    return res.status(200).json({
      dt: 1605182400,
      main: {
        aqi: "N/A",
      },
      components: {
        co: "N/A",
        no: "N/A",
        no2: "N/A",
        o3: "N/A",
        so2: "N/A",
        pm2_5: "N/A",
        pm10: "N/A",
        nh3: "N/A",
      },
    });
  }
}

export async function getAirStatistics(city) {
  const geolocation = await axios.get(
    "https://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        limit: 1,
        appid: process.env.API_KEY_OPENWEATHERMAP,
      },
    }
  );
  const stats = await axios.get(
    "https://api.openweathermap.org/data/2.5/air_pollution",
    {
      params: {
        lat: geolocation.data[0].lat,
        lon: geolocation.data[0].lon,
        appid: process.env.API_KEY_OPENWEATHERMAP,
      },
    }
  );

  return stats;
}
