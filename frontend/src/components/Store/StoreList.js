
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getStores } from '../../services/api';

function StoreList() {
    const [stores, setStores] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [error, setError] = useState('');

    const fetchStores = useCallback(async () => {
        try {
            const response = await getStores({ name: searchName, address: searchAddress });
            setStores(response);
        } catch (err) {
            setError(err.message || 'Failed to fetch stores');
        }
    }, [searchName, searchAddress, getStores]);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    return (
        <div>
            <h2>Store Listings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Search by Address"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                />
            </div>
            <ul>
                {stores.map(store => (
                    <li key={store.id}>
                        <Link to={`/stores/${store.id}`}>
                            {store.name} - {store.address}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StoreList;