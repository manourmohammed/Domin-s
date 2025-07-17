import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Logo
const DomainWatchLogo = () => (
    <div className="flex items-center gap-4 text-[#141414]">
        <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="currentColor"
                    d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                ></path>
            </svg>
        </div>
        <h2 className="text-lg font-bold">Surveillance Domaine</h2>
    </div>
);

// Composants UI
const SearchInput = ({ placeholder, value, onChange }) => (
    <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 rounded-xl bg-[#ededed] text-[#141414] focus:outline-none"
    />
);

const FilterDropdown = ({ options, selected, onSelect, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#ededed] px-4 py-2 rounded-full text-sm"
            >
                {label}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-md border border-[#dbdbdb]">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                onSelect(option.value);
                                setIsOpen(false);
                            }}
                            className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#ededed] ${
                                selected === option.value ? 'bg-[#dbdbdb]' : ''
                            }`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const StatusButton = ({ status }) => (
    <span className="bg-[#ededed] text-sm rounded-full px-4 py-1">{status}</span>
);

const AlertTable = ({ alerts }) => (
    <div className="overflow-auto mt-4">
        <table className="min-w-full bg-white border border-[#dbdbdb] rounded-xl overflow-hidden">
            <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-[#141414]">
                <th className="px-4 py-3">Nom de domaine</th>
                <th className="px-4 py-3">Type d'alerte</th>
                <th className="px-4 py-3">Déclenchée le</th>
                <th className="px-4 py-3">Statut</th>
            </tr>
            </thead>
            <tbody>
            {alerts.map((alert) => (
                <tr key={alert.id} className="border-t border-[#dbdbdb] text-sm">
                    <td className="px-4 py-2">{alert.domain}</td>
                    <td className="px-4 py-2">{alert.type}</td>
                    <td className="px-4 py-2">{alert.time}</td>
                    <td className="px-4 py-2">
                        <StatusButton status={alert.status} />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);

// Gestionnaire principal
const AlertManagement = () => {
    const [alerts] = useState([
        { id: 1, domain: 'exemple.com', type: 'Expiration', time: '2024-03-15 10:00', status: 'Non reconnu' },
        { id: 2, domain: 'autre-site.net', type: 'Hors ligne', time: '2024-03-14 14:30', status: 'Reconnu' },
        { id: 3, domain: 'test-site.org', type: 'Expiration', time: '2024-03-13 09:15', status: 'Rejeté' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);

    const filteredAlerts = alerts.filter((alert) => {
        const matchSearch = alert.domain.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType = typeFilter ? alert.type === typeFilter : true;
        const matchStatus = statusFilter ? alert.status === statusFilter : true;
        return matchSearch && matchType && matchStatus;
    });

    const alertTypes = [
        { value: null, label: 'Tous les types' },
        { value: 'Expiration', label: 'Expiration' },
        { value: 'Hors ligne', label: 'Hors ligne' }
    ];

    const alertStatuses = [
        { value: null, label: 'Tous les statuts' },
        { value: 'Non reconnu', label: 'Non reconnu' },
        { value: 'Reconnu', label: 'Reconnu' },
        { value: 'Rejeté', label: 'Rejeté' }
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-2">Gestion des alertes</h1>
            <p className="text-neutral-500 mb-4">Gérez les alertes des domaines expirés ou hors ligne.</p>

            <div className="mb-4">
                <SearchInput
                    placeholder="Rechercher un domaine..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <FilterDropdown
                    options={alertTypes}
                    selected={typeFilter}
                    onSelect={setTypeFilter}
                    label={typeFilter ? `Type : ${typeFilter}` : 'Type d\'alerte'}
                />
                <FilterDropdown
                    options={alertStatuses}
                    selected={statusFilter}
                    onSelect={setStatusFilter}
                    label={statusFilter ? `Statut : ${statusFilter}` : 'Statut'}
                />
            </div>

            <AlertTable alerts={filteredAlerts} />
        </div>
    );
};

// App principale
const Alerts = () => (
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
            <header className="flex items-center justify-between border-b border-[#f0f4f3] px-10 py-4">
                {/* Logo + Titre */}
                <div className="flex items-center gap-3 text-[#111815]">
                    <svg className="w-6 h-6" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.578 8.578C5.528 11.628 3.451 15.514 2.609 19.745 1.768 23.976 2.2 28.361 3.851 32.346c1.65 3.985 4.446 7.392 8.032 9.788C15.47 44.53 19.687 45.81 24 45.81s8.53-1.279 12.117-3.676c3.586-2.396 6.382-5.803 8.033-9.788 1.65-3.985 2.082-8.37 1.241-12.601-.842-4.231-2.919-8.117-5.97-11.167L24 24 8.578 8.578Z"
                            fill="currentColor"
                        />
                    </svg>
                    <h2 className="text-lg font-bold tracking-tight">Surveillance Domaine</h2>
                </div>

                {/* Navigation */}
                <nav className="flex gap-8 text-sm font-medium text-[#111815]">
                    <Link to="/home" className="hover:text-green-600">Dashboard</Link>
                    <Link to="/alerts" className="hover:text-green-600">Alertes</Link>
                    <Link to="/statistics" className="hover:text-green-600">Statistiques</Link>
                    <Link to="/add-domaine" className="hover:text-green-600">Ajouter un domaine</Link>
                </nav>

                {/* Espace pour futur bouton utilisateur ou langue */}
                <div></div>
            </header>


            <main className="p-6">
                <AlertManagement/>
            </main>
        </div>
    </>
);

export default Alerts;
