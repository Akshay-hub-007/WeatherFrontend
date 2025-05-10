import { Compass, Sunrise, Sunset } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

function WeatherDetails({ data }) {
  const { wind, main, sys } = data;

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: format(new Date(sys.sunrise * 1000), "hh:mm a"),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: format(new Date(sys.sunset * 1000), "hh:mm a"),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Compass,
      color: "text-purple-500",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((data, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg border p-4">
              <data.icon className={`${data.color} h-5 w-5`} />
              <div>
                <p className='text-sm font-medium leading-none'>{data.title}</p>
                <p className="text-sm text-muted-foreground">{data.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default WeatherDetails;
