import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { BASE_API } from '@/config.json';
import Template1 from '@/components/Template1';

export const fakeProducts = [
    {
        "id": "1",
        "name": "Air Jordan 1 Mid",
        "category": "Shoes",
        "price": 139.99,
        "image": "/air-jordan-1-mid.png"
    },
    {
        "id": "2",
        "name": "Air Jordan 4 Craft",
        "category": "Shoes",
        "price": 219.99,
        "image": "/air-jordan-4-craft.png"
    },
    {
        "id": "3",
        "name": "Jordan One Take 4",
        "category": "Shoes",
        "price": 99.99,
        "image": "/jordan-one-take-4.png"
    },
    {
        "id": "4",
        "name": "Nike Air Force 1 '07 LV8",
        "category": "Shoes",
        "price": 129.99,
        "image": "/nike-air-force.png"
    }
];

export default function Store() {
    const { username, store } = useParams();

    const fetcher = (url) => fetch(url, { 
        method: 'GET', 
        headers: { Authorization: localStorage.getItem('token') } 
    }).then(response => response.json()).catch(() => null);

    const { isLoading, data } = useSWR(BASE_API + '/store/' + username + '/' + store, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        revalidateOnReconnect: false
    });

    useEffect(() => {
        if (data?.name) {
            document.title = `STORE - ${data.name}`;
        }
    }, [data]);

    if (isLoading) return (
        <div>Loading...</div>
    );

    if (!data?.id) return (
        <div>This shop doesn't exist</div>
    );

    const storeData = {
        name: data.name,
        products: data.products && fakeProducts, // data.products || fakeProducts
        templateId: data.templateId
    };

    return (
        <>
            {storeData.templateId === '1' ? <Template1 storeName={storeData.name} products={storeData.products} /> : <div>Template 2</div>}
        </>
    );
}
