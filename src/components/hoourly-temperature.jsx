import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { format } from "date-fns"

function HourlyTemperature({ data }) {

    const chartData = data.list.slice(0, 8).map(getItem => ({
        time: format(new Date(getItem.dt * 1000), "ha"),
        temp: Math.round(getItem.main.temp),
        feels_like: Math.round(getItem.main.feels_like) 
    }));

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>Today's Temperature</CardTitle>
                <CardDescription>Hourly temperature forecast</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='h-[200px] w-full'>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                            <XAxis
                                dataKey="time"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°`}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <span className="text-[0.7rem] uppercase text-muted-foreground">Temperature</span>
                                                        <span className="font-bold">{payload[0].value}°</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[0.7rem] uppercase text-muted-foreground">Feels Like</span>
                                                        <span className="font-bold">{payload[1]?.value}°</span> 
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="temp"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="feels_like"
                                stroke="#64748b"
                                strokeWidth={2}
                                dot={false}
                                strokeDasharray="5 5"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}

export default HourlyTemperature
