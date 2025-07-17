import React from "react";
import {Link} from "react-router-dom";

const Statistics = () => {
    return (
        <div
            className="flex flex-col min-h-screen bg-white font-[Inter,_Noto_Sans,sans-serif]"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh'
            }}
        >
            {/* Header */}
            <header className="flex items-center justify-between border-b border-[#f0f4f3] px-10 py-4">
                <div className="flex items-center gap-3 text-[#111815]">
                    <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.578 8.578C5.528 11.628 3.451 15.514 2.609 19.745 1.768 23.976 2.2 28.361 3.851 32.346c1.65 3.985 4.446 7.392 8.032 9.788C15.47 44.53 19.687 45.81 24 45.81s8.53-1.279 12.117-3.676c3.586-2.396 6.382-5.803 8.033-9.788 1.65-3.985 2.082-8.37 1.241-12.601-.842-4.231-2.919-8.117-5.97-11.167L24 24 8.578 8.578Z"
                            fill="currentColor"
                        />
                    </svg>
                    <h2 className="text-lg font-bold tracking-tight">Domain Monitor</h2>
                </div>
                <nav className="flex gap-8 text-sm font-medium text-[#111815]">
                    <Link to="/home" className="hover:text-green-600">Dashboard</Link>
                    <Link to="/alerts" className="hover:text-green-600">Alertes</Link>
                    <Link to="/statistics" className="hover:text-green-600">Statistiques</Link>
                    <Link to="/add-domaine" className="hover:text-green-600">Ajouter un domaine</Link>
                </nav>
                <div
                ></div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full">
                <div className="w-full max-w-screen-lg mx-auto px-4 md:px-8 py-8">
                    {/* Title */}
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold text-[#111815] mb-2">Monitoring Statistics</h1>
                        <p className="text-sm text-[#63887a]">
                            Visual overview of the monitored domains: total, status, WordPress usage, and trends.
                        </p>
                    </div>

                    {/* Total Domains */}
                    <div className="grid grid-cols-1 mb-6">
                        <div className="bg-[#f0f4f3] rounded-xl p-6">
                            <p className="text-base font-medium text-[#111815]">Total Domains Monitored</p>
                            <p className="text-2xl font-bold text-[#111815]">150</p>
                        </div>
                    </div>

                    {/* Other cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* WordPress vs. No WP */}
                        <div className="border border-[#dce5e2] rounded-xl p-6 h-full">
                            <p className="text-base font-medium text-[#111815]">Domains with WordPress vs. Without</p>
                            <p className="text-2xl font-bold text-[#111815]">100</p>
                            <p className="text-sm text-[#63887a]">
                                Total <span className="text-green-600 font-semibold">+10%</span>
                            </p>
                            <div className="h-24 mt-4 flex items-end gap-4">
                                <div className="w-1/2 h-2/5 bg-[#f0f4f3] border-t-2 border-[#63887a]"></div>
                                <div className="w-1/2 h-3/5 bg-[#f0f4f3] border-t-2 border-[#63887a]"></div>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-[#63887a] mt-2">
                                <span>WordPress</span>
                                <span>No WP</span>
                            </div>
                        </div>

                        {/* Status Changes */}
                        <div className="border border-[#dce5e2] rounded-xl p-6 h-full">
                            <p className="text-base font-medium text-[#111815]">Status Changes (30 Days)</p>
                            <p className="text-2xl font-bold text-[#111815]">25</p>
                            <p className="text-sm text-[#63887a]">
                                Last 30 Days <span className="text-red-600 font-semibold">-5%</span>
                            </p>
                            <div className="mt-4">
                                <svg
                                    width="100%"
                                    height="100"
                                    viewBox="0 0 478 150"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 109C18 109 18 21 36 21s36 20 54 20 36 52 54 52 36-60 54-60 36 68 54 68 36-40 54-40 36-16 54-16 36 76 54 76 36 28 54 28V149H0V109Z"
                                        fill="#f0f4f3"
                                    />
                                    <path
                                        d="M0 109C18 109 18 21 36 21s36 20 54 20 36 52 54 52 36-60 54-60 36 68 54 68 36-40 54-40 36-16 54-16 36 76 54 76 36 28 54 28"
                                        stroke="#63887a"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="flex justify-between text-xs font-bold text-[#63887a] mt-2">
                                    <span>Day 1</span>
                                    <span>Day 5</span>
                                    <span>Day 10</span>
                                    <span>Day 15</span>
                                    <span>Day 20</span>
                                    <span>Day 25</span>
                                    <span>Day 30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Statistics;