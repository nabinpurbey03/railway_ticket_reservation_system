import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowUpRight } from 'lucide-react';

// Updated EBITDA data with 5 series
const ebitdaData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    total: Math.sin(i * 0.2) * 500 + 3000 + Math.random() * 200,
    economicClass: Math.sin(i * 0.2) * 200 + 1000 + Math.random() * 100,
    firstClass: Math.sin(i * 0.2) * 150 + 800 + Math.random() * 80,
    businessClass: Math.sin(i * 0.2) * 120 + 700 + Math.random() * 60,
    ladiesClass: Math.sin(i * 0.2) * 100 + 500 + Math.random() * 40,
}));

const profitMarginData = [
    { name: '1', value: 6 },
    { name: '2', value: 9 },
    { name: '3', value: 12 },
    { name: '4', value: 9 },
    { name: '5', value: 4 },
    { name: '6', value: 6 },
];

const debtToEquityData = [
    { name: '1', blue: 5, red: 1 },
    { name: '2', blue: 7.5, red: 2 },
    { name: '3', blue: 3.5, red: 1.5 },
    { name: '4', blue: 2, red: 1 },
    { name: '5', blue: 3, red: 1 },
    { name: '6', blue: 4, red: 1.5 },
];

export default function Home() {
    return (
        <div className="bg-gray-100 p-6 rounded-lg w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Data Dashboard</h1>

            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center bg-white p-2 rounded">
                    <span className="text-sm text-gray-500 mr-2">Auto date range:</span>
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-1" checked />
                        <span className="text-sm">This Week</span>
                    </div>
                </div>

                <div className="bg-white p-2 rounded flex items-center justify-between w-40">
                    <span className="text-sm">Services</span>
                    <span className="text-sm">All</span>
                    <span className="text-gray-400">▼</span>
                </div>

                <div className="bg-white p-2 rounded flex items-center justify-between w-40">
                    <span className="text-sm">Posts</span>
                    <span className="text-sm">All</span>
                    <span className="text-gray-400">▼</span>
                </div>
            </div>

            {/* EBITDA Chart with 5 series */}
            <div className="bg-white p-4 rounded-lg mb-4">
                <h2 className="text-md text-gray-600 mb-2">Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)</h2>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ebitdaData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="colorEconomic" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d4a76a" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#d4a76a" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="colorFirst" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="colorBusiness" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ffc658" stopOpacity={0.2}/>
                                </linearGradient>
                                <linearGradient id="colorLadies" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#ff8042" stopOpacity={0.2}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e0e0e0" />
                            <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                            <Tooltip />
                            <Area type="monotone" dataKey="total" name="Total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorTotal)" />
                            <Area type="monotone" dataKey="economicClass" name="Economic Class" stroke="#d4a76a" fillOpacity={1} fill="url(#colorEconomic)" />
                            <Area type="monotone" dataKey="firstClass" name="First Class" stroke="#8884d8" fillOpacity={1} fill="url(#colorFirst)" />
                            <Area type="monotone" dataKey="businessClass" name="Business Class" stroke="#ffc658" fillOpacity={1} fill="url(#colorBusiness)" />
                            <Area type="monotone" dataKey="ladiesClass" name="Ladies Class" stroke="#ff8042" fillOpacity={1} fill="url(#colorLadies)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Net Profit Margin */}
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-md text-gray-600 mb-2">Net Profit Margin</h2>
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={profitMarginData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e0e0e0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#4a90e2" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Debt-to-Equity Ratio */}
                <div className="bg-white p-4 rounded-lg">
                    <h2 className="text-md text-gray-600 mb-2">Debt-to-Equity Ratio</h2>
                    <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={debtToEquityData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e0e0e0" />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Bar dataKey="blue" stackId="a" fill="#4a90e2" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="red" stackId="a" fill="#d97171" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
                    <h2 className="text-md text-gray-600 mb-2 self-start">Revenue</h2>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-4xl font-bold">$24.5</div>
                        <div className="flex items-center text-green-500">
                            <ArrowUpRight size={16} />
                            <span>13%</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">vs previous 7 days</div>
                    </div>
                </div>

                {/* Avg Profit Margin */}
                <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
                    <h2 className="text-md text-gray-600 mb-2 self-start">Avg Profit Margin</h2>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-4xl font-bold">9.5%</div>
                        <div className="flex items-center text-green-500">
                            <ArrowUpRight size={16} />
                            <span>1%</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">vs previous 7 days</div>
                    </div>
                </div>

                {/* ROI */}
                <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
                    <h2 className="text-md text-gray-600 mb-2 self-start">Return On Investment (ROI)</h2>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-4xl font-bold">19.1%</div>
                        <div className="flex items-center text-green-500">
                            <ArrowUpRight size={16} />
                            <span>8%</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">vs previous 7 days</div>
                    </div>
                </div>

                {/* CLV */}
                <div className="bg-white p-4 rounded-lg flex flex-col justify-center items-center">
                    <h2 className="text-md text-gray-600 mb-2 self-start">CLV</h2>
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-4xl font-bold">$2,176</div>
                        <div className="flex items-center text-green-500">
                            <ArrowUpRight size={16} />
                            <span>2.3%</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">vs previous 7 days</div>
                    </div>
                </div>
            </div>
        </div>
    );
}