import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";

export default function Weather() {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [forecast, setForecast] = useState<any[]>([]);
  const [hourlyData, setHourlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "<INSERT API KEY HERE>";

  const fetchForecast = async () => {
    if (!city || days < 1 || days > 14) {
      setError("Please enter a city and select days between 1 and 14.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
      );

      if (!res.ok) throw new Error("Failed to fetch weather data.");
      const data = await res.json();

      const daily = data.forecast?.forecastday?.map((index: any) => ({
        date: index.date,
        maxTempC: index.day.maxtemp_c,
        minTempC: index.day.mintemp_c,
        avgHumidity: index.day.avghumidity,
        condition: index.day.condition.text,
      }));

      setForecast(daily);

      const hourly = data.forecast?.forecastday?.flatMap((day: any) =>
        day.hour.map((h: any) => ({
          time: h.time,                // e.g., "2025-06-20 14:00"
          temp_c: h.temp_c,
          pressure: h.pressure_mb,
        }))
      );

      setHourlyData(hourly);
    } catch (err: any) {
      setError(err.message || "Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="max-w-sm"
        />
        <div className="w-48">
          <Slider
            min={1}
            max={14}
            step={1}
            value={[days]}
            onValueChange={(val) => setDays(val[0])}
          />
        </div>
        <span>{days} day(s)</span>
        <Button onClick={fetchForecast} disabled={loading}>
          {loading ? "Loading..." : "Get Forecast"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {forecast.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Max Temp (°C)</TableHead>
              <TableHead>Min Temp (°C)</TableHead>
              <TableHead>Avg Humidity (%)</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forecast.map((day) => (
              <TableRow key={day.date}>
                <TableCell>{day.date}</TableCell>
                <TableCell>{day.maxTempC}°</TableCell>
                <TableCell>{day.minTempC}°</TableCell>
                <TableCell>{day.avgHumidity}%</TableCell>
                <TableCell>{day.condition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {hourlyData.length > 0 && (
        <div className="h-96">
          <h2 className="text-lg font-semibold mb-2">Hourly Temperatures</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tickFormatter={(t) => t.split(" ")[1]} />
              <YAxis domain={['auto', 'auto']} unit="mB" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#00ff00"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
