import React from 'react';
import useSWR from 'swr';
import Dash from '@/components/Dash';
import CreateShop from '@/components/CreateShop';
import { useAuth } from "@/hooks/useAuth";
import { BASE_API } from "../../config.json";

export default function Dashboard() {
    const { user, shops, updateShops } = useAuth();

    const fetcher = (url) => fetch(url, { 
		method: 'GET', 
		headers: { Authorization: `${localStorage.getItem('token')}` } 
	}).then(response => response.json()).catch(() => []);
    useSWR(BASE_API + '/me/shops', fetcher, { revalidateOnFocus: false, revalidateIfStale: false, revalidateOnReconnect: false, onSuccess: (data) => (Array.isArray(data) && updateShops(data)) });

    return (
        <>
            <div className="flex flex-col justify-start h-screen">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mb-6">Welcome {user.username}</p>
                <hr />
                {Array.isArray(shops) && shops.length ? <Dash shops={shops} /> : <CreateShop />}
            </div>
       </>
    );
}
