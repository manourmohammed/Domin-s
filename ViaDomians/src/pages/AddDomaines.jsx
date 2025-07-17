import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddDomaines = () => {
    const [domaines, setDomaines] = useState('');

    const handleAddDomains = () => {
        const list = domaines
            .split('\n')
            .map(d => d.trim())
            .filter(d => d.length > 0);

        console.log('Domains to add:', list);
        // setDomaines('');
    };

    return (
        <>
            {/* Ce style est global mais pas obligatoire si tu utilises Tailwind */}
            <style>{`
                * { margin: 0; padding: 0; box-sizing: border-box; }
                html, body, #root { width: 100%; height: 100%; }
            `}</style>

            <div
                className="flex flex-col bg-white font-[Inter,_Noto_Sans,sans-serif]"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    overflowY: 'auto'
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

                {/* Content */}
                <div className="flex justify-center py-10 px-6 flex-1">
                    <div className="w-full max-w-[960px]">
                        <div className="mb-6">
                            <h1 className="text-[32px] font-bold text-[#121615]">Add New Domains</h1>
                            <p className="text-sm text-[#6a8178]">
                                Enter the domains you wish to monitor, one per line.
                            </p>
                        </div>

                        <div className="max-w-[480px] mb-6">
                            <label className="block w-full">
                                <textarea
                                    placeholder="Enter Domains (one per line)"
                                    value={domaines}
                                    onChange={(e) => setDomaines(e.target.value)}
                                    className="form-input w-full resize-none rounded-xl border border-[#dde3e1] bg-white p-[15px] text-base text-[#121615] placeholder:text-[#6a8178] focus:border-[#3dc191] focus:outline-none min-h-36"
                                />
                            </label>
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleAddDomains}
                                className="rounded-full h-10 px-5 bg-[#3dc191] text-[#121615] text-sm font-bold tracking-[0.015em] hover:brightness-110 transition"
                            >
                                Add Domains
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddDomaines;
