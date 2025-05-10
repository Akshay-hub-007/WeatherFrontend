import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import {
  Biohazard,
  Flame,
  Zap,
  ZapOff,
  CloudSun,
  Dot,
  Grip,
  Wind,
  GaugeCircle
} from 'lucide-react'

const AirPollution = ({ data }) => {
  const Quality = ["Good", "Fair", "Moderate", "Poor", "Very Poor"]
  const list = data?.list || []
  const AirQuality = list[0]?.main?.aqi || 1
  const gases = list[0]?.components || {}
  const {
    co, nh3, no, no2, o3, pm2_5, pm10, so2
  } = gases

  return (
    <div>
      
      <Card className="space-y-2 p-4">
          <h2 className='font-bold'>Air Quality Index (AQI) & Pollutants</h2>

        <CardHeader className="flex items-center justify-center rounded-lg border p-4 gap-2 text-xl">
          <GaugeCircle className="text-indigo-600" /> AQI - {AirQuality} ({Quality[AirQuality - 1]})
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <div className="border flex items-center justify-between p-4"><Biohazard className="text-red-500" /> CO: {co}</div>
            <div className="border flex items-center justify-between p-4"><Flame className="text-orange-500" /> NH₃: {nh3}</div>
            <div className="border flex items-center justify-between p-4"><Zap className="text-yellow-500" /> NO: {no}</div>
            <div className="border flex items-center justify-between p-4"><ZapOff className="text-amber-600" /> NO₂: {no2}</div>
            <div className="border flex items-center justify-between p-4"><CloudSun className="text-blue-500" /> O₃: {o3}</div>
            <div className="border flex items-center justify-between p-4"><Dot className="text-pink-500" /> PM2.5: {pm2_5}</div>
            <div className="border flex items-center justify-between p-4"><Grip className="text-purple-500" /> PM10: {pm10}</div>
            <div className="border flex items-center justify-between p-4"><Wind className="text-gray-500" /> SO₂: {so2}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AirPollution
