    import React, { useState } from 'react';
    import { Eye, X, Globe, Calendar, File, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
    import { Link } from 'react-router-dom';
    import {
    FaWordpress,
    FaJoomla,
    FaDrupal,
    FaMagento,
    FaShopify,
    FaSquarespace,
    FaGhost,
    FaBan,
        FaQuestionCircle
    } from 'react-icons/fa';



    // Composant DomainDetailsPopup
    const DomainDetailsPopup = ({ isOpen, onClose, domainData }) => {
        if (!isOpen) return null;

        // Données par défaut enrichies avec les données du domaine
        const defaultData = {
            name: 'example.com',
            status: 'Online',
            expirationDate: '2024-12-31',
            wordpressDetected: 'Not Detected',
            ipAddress: '192.168.1.1',
            serverLocation: 'New York, USA',
            sslCertificate: 'Valid',
            responseTime: '250ms',
            uptime: '99.9%',
            uptimeChange: '+0.2%',
            lastCheck: '2024-07-26 14:30',
            httpStatus: '200 OK',
            contentMatch: 'Match Found',
            securityHeaders: 'Secure',
            loadTime: '1.2s',
            networkStatus: 'Connected',
            ping: '15ms',
            downloadSpeed: '100 Mbps',
            uploadSpeed: '50 Mbps',
            packetLoss: '0%',
            jitter: '2ms',
            lastNetworkCheck: '2024-07-26 14:35'
        };

        // Mapper les données du domaine avec les données par défaut
        const data = {
            ...defaultData,
            name: domainData?.name || defaultData.name,
            status: domainData?.status || defaultData.status,
            expirationDate: domainData?.expiration || defaultData.expirationDate,
            cms: domainData?.cms || 'none',  // Valeur CMS provenant des données, ou 'none' par défaut
            lastCheck: domainData?.lastChecked || defaultData.lastCheck
        };


        const getNetworkStatusIcon = (status) => {
            switch (status) {
                case 'Connected':
                    return <Wifi size={24} className="text-green-600" />;
                case 'Disconnected':
                    return <WifiOff size={24} className="text-red-600" />;
                case 'Unstable':
                    return <AlertTriangle size={24} className="text-yellow-600" />;
                default:
                    return <Wifi size={24} className="text-gray-600" />;
            }
        };

        const getNetworkStatusColor = (status) => {
            switch (status) {
                case 'Connected':
                    return 'text-green-600';
                case 'Disconnected':
                    return 'text-red-600';
                case 'Unstable':
                    return 'text-yellow-600';
                default:
                    return 'text-gray-600';
            }
        };



        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header avec bouton de fermeture */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Domain Details</h1>
                            <p className="text-gray-500 text-sm mt-1">Explore detailed information about {data.name}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Domain Overview */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Domain Overview</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="bg-gray-200 p-3 rounded-lg">
                                        <Globe size={24} className="text-gray-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Domain Status</p>
                                        <p className={`text-sm ${data.status === 'Online' ? 'text-green-600' : 'text-red-600'}`}>
                                            {data.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="bg-gray-200 p-3 rounded-lg">
                                        <Calendar size={24} className="text-gray-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Expiration Date</p>
                                        <p className="text-gray-500 text-sm">{data.expirationDate}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="bg-gray-200 p-3 rounded-lg">
                                        <File size={24} className="text-gray-700" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">CMS Detection</p>
                                        <p className="text-gray-500 text-sm">{data.cms}</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Current Status */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Status</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Domain Name</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.name}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">IP Address</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.ipAddress}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Server Location</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.serverLocation}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">SSL Certificate</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.sslCertificate}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Response Time</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.responseTime}</p>
                                </div>
                            </div>
                        </section>

                        {/* Network Status Check */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Network Status</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center gap-3 mb-3">
                                        {getNetworkStatusIcon(data.networkStatus)}
                                        <div>
                                            <p className="font-medium text-gray-900">Network Status</p>
                                            <p className={`text-sm ${getNetworkStatusColor(data.networkStatus)}`}>
                                                {data.networkStatus}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Last checked: {data.lastNetworkCheck}</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Ping</p>
                                            <p className="text-2xl font-bold text-gray-900">{data.ping}</p>
                                        </div>
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Latency to server</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Download</p>
                                            <p className="text-2xl font-bold text-gray-900">{data.downloadSpeed}</p>
                                        </div>
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Download speed</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Upload</p>
                                            <p className="text-2xl font-bold text-gray-900">{data.uploadSpeed}</p>
                                        </div>
                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Upload speed</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Packet Loss</p>
                                            <p className="text-2xl font-bold text-gray-900">{data.packetLoss}</p>
                                        </div>
                                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Packet loss rate</p>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">Jitter</p>
                                            <p className="text-2xl font-bold text-gray-900">{data.jitter}</p>
                                        </div>
                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Network jitter</p>
                                </div>
                            </div>

                            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-4">Network Performance (Last 24h)</h3>
                                <div className="h-24 bg-white rounded border flex items-end justify-between p-2">
                                    <div className="flex items-end gap-1 w-full">
                                        {Array.from({ length: 24 }, (_, index) => (
                                            <div key={index} className="flex flex-col items-center flex-1">
                                                <div
                                                    className="w-full rounded-t"
                                                    style={{
                                                        height: `${Math.random() * 40 + 10}px`,
                                                        backgroundColor: Math.random() > 0.9 ? '#ef4444' : '#22c55e'
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    <span>00:00</span>
                                    <span>12:00</span>
                                    <span>24:00</span>
                                </div>
                            </div>
                        </section>

                        {/* Historical Data */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Historical Data</h2>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <div className="mb-4">
                                    <p className="text-gray-900 font-medium">Domain Status Over Time</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{data.uptime} Uptime</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-gray-500">Last 30 Days</p>
                                        <p className="text-green-600 font-medium">{data.uptimeChange}</p>
                                    </div>
                                </div>

                                <div className="h-32 bg-white rounded border flex items-end justify-between p-4">
                                    <div className="flex items-end gap-2 w-full">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, index) => (
                                            <div key={month} className="flex flex-col items-center flex-1">
                                                <div
                                                    className="w-full rounded-t"
                                                    style={{
                                                        height: `${Math.random() * 60 + 20}px`,
                                                        backgroundColor: index === 6 ? '#10b981' : '#6b7280'
                                                    }}
                                                />
                                                <p className="text-xs text-gray-500 mt-2">{month}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Last Check Results */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Last Check Results</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Check Time</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.lastCheck}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">HTTP Status Code</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.httpStatus}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Content Match</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.contentMatch}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Security Headers</p>
                                    <p className="text-gray-900 text-sm col-span-2">{data.securityHeaders}</p>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                                    <p className="text-gray-500 text-sm">Performance Metrics</p>
                                    <p className="text-gray-900 text-sm col-span-2">Load Time: {data.loadTime}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    };

    // Composant Dashboard principal
    const Home = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [selectedDomain, setSelectedDomain] = useState(null);
        const [showDetails, setShowDetails] = useState(false);

        const domains = [
            {
                name: 'example.com',
                status: 'Online',
                expiration: '2024-12-31',
                cms: 'wordpress',
                lastChecked: '2024-07-26 10:00 AM',
            },
            {
                name: 'sample.net',
                status: 'Offline',
                expiration: '2025-01-15',
                cms: 'joomla',
                lastChecked: '2024-07-26 09:45 AM',
            },
            {
                name: 'website.org',
                status: 'Online',
                expiration: '2024-11-20',
                cms: 'drupal',
                lastChecked: '2024-07-26 10:15 AM',
            },
            {
                name: 'domain.info',
                status: 'Online',
                expiration: '2025-02-28',
                cms: 'magento',
                lastChecked: '2024-07-26 09:30 AM',
            },
            {
                name: 'site.co',
                status: 'Offline',
                expiration: '2024-10-05',
                cms: 'shopify',
                lastChecked: '2024-07-26 10:05 AM',
            },
            {
                name: 'myblog.io',
                status: 'Online',
                expiration: '2024-12-10',
                cms: 'squarespace',
                lastChecked: '2024-07-26 11:00 AM',
            },
            {
                name: 'technews.com',
                status: 'Online',
                expiration: '2024-09-30',
                cms: 'ghost',
                lastChecked: '2024-07-26 08:45 AM',
            },
            {
                name: 'unknownsite.xyz',
                status: 'Offline',
                expiration: '2025-03-15',
                cms: 'none',
                lastChecked: '2024-07-26 07:30 AM',
            },
            {
                name: 'oldsite.net',
                status: 'Online',
                expiration: '2024-08-21',
                cms: 'customcms', // CMS inconnu, pour tester le cas "Unknown CMS"
                lastChecked: '2024-07-26 06:20 AM',
            },
        ];




        const filteredDomains = domains.filter(domain =>
            domain.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const handleShowDetails = (domain) => {
            setSelectedDomain(domain);
            setShowDetails(true);
        };

        const handleCloseDetails = () => {
            setShowDetails(false);
            setSelectedDomain(null);
        };


        const CmsIcon = ({ cms }) => {
            switch (cms?.toLowerCase()) {
                case 'wordpress':
                    return <FaWordpress className="text-blue-600" size={20} title="WordPress"/>;
                case 'joomla':
                    return <FaJoomla className="text-red-600" size={20} title="Joomla"/>;
                case 'drupal':
                    return <FaDrupal className="text-blue-400" size={20} title="Drupal"/>;
                case 'magento':
                    return <FaMagento className="text-orange-600" size={20} title="Magento"/>;
                case 'shopify':
                    return <FaShopify className="text-green-600" size={20} title="Shopify"/>;
                case 'squarespace':
                    return <FaSquarespace className="text-gray-700" size={20} title="Squarespace"/>;
                case 'ghost':
                    return <FaGhost className="text-gray-800" size={20} title="Ghost"/>;
                case 'none':
                case null:
                case undefined:
                    return <span className="text-gray-400 italic flex items-center gap-1">
          <FaBan/> No CMS
        </span>
                default:
                    return <span className="text-gray-600 italic flex items-center gap-1">
          <FaQuestionCircle/> Unknown CMS
        </span>;
            }
        };


        return (
            <>
                <style>{`
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { margin: 0; padding: 0; width: 100%; }
                    #root { width: 100%; }
                `}</style>

                <div
                    className="flex flex-col min-h-screen bg-white font-[Inter,_Noto_Sans,sans-serif]"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <div className="min-h-screen font-sans bg-white">
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
                                <Link to="/Alerts" className="hover:text-green-600">Alertes</Link>
                                <Link to="/statistics" className="hover:text-green-600">Statistiques</Link>
                                <Link to="/add-domaine" className="hover:text-green-600">Ajouter un domaine</Link>
                            </nav>

                            <div
                            ></div>
                        </header>

                        <main className="px-40 py-5">
                            <h1 className="text-3xl font-bold mb-2">Domain Monitoring Dashboard</h1>
                            <p className="text-[#63887a] text-sm mb-4">
                                Overview of your monitored domains and their current status.
                            </p>

                            <div className="flex gap-4 mb-6">
                                <div className="flex-1 border p-6 rounded-xl">
                                    <p className="text-base font-medium">Total Domains Monitored</p>
                                    <p className="text-2xl font-bold">25</p>
                                </div>
                                <div className="flex-1 border p-6 rounded-xl">
                                    <p className="text-base font-medium">Total Active Alerts</p>
                                    <p className="text-2xl font-bold">3</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search domains"
                                    className="w-full h-12 px-4 rounded-xl bg-[#f0f4f3] placeholder:text-[#63887a] text-sm"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="overflow-x-auto border rounded-xl">
                                <table className="min-w-full text-sm text-left">
                                    <thead className="text-[#111815]">
                                    <tr>
                                        <th className="px-4 py-3">Domain Name</th>
                                        <th className="px-4 py-3">Online Status</th>
                                        <th className="px-4 py-3">Expiration Date</th>
                                        <th className="px-4 py-3">CMS Detected</th>
                                        <th className="px-4 py-3">Last Checked</th>
                                        <th className="px-4 py-3 text-[#63887a]">Details</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {filteredDomains.map((domain, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-4 py-2">{domain.name}</td>
                                            <td className="px-4 py-2">
                                            <span className={`inline-block px-4 py-1 rounded-full ${
                                                domain.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                              {domain.status}
                                            </span>
                                            </td>
                                            <td className="px-4 py-2 text-[#63887a]">{domain.expiration}</td>
                                            <td className="px-4 py-2 text-center">
                                                <CmsIcon cms={domain.cms}/>
                                            </td>
                                            <td className="px-4 py-2 text-[#63887a]">{domain.lastChecked}</td>
                                            <td className="px-4 py-2 text-[#63887a] cursor-pointer hover:text-[#111815]">
                                                <Eye
                                                    className="w-5 h-5 hover:text-blue-600 transition-colors"
                                                    onClick={() => handleShowDetails(domain)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>

                                </table>
                            </div>

                            <DomainDetailsPopup
                                isOpen={showDetails}
                                onClose={handleCloseDetails}
                                domainData={selectedDomain}
                            />
                        </main>
                    </div>
                </div>
            </>
        );
    };

    export default Home;