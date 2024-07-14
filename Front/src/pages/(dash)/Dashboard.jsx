import React from 'react';
import Dash from '@/components/Dash';
import CreateShop from '@/components/CreateShop';
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";

export default function Dashboard() {
    const { user, shops } = useAuth();

    return (
        <div className="flex flex-col justify-start">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p>Welcome {user.username}</p>
                </div>
                <CreateShop />
            </div>
            <Separator />
            {Array.isArray(shops) && shops.length ? (
                <Dash shops={shops} />
            ) : (
                <div className="flex flex-col items-center justify-center mt-14 gap-4">
                    <img 
                        className="w-28" 
                        src='https://asset.zcache.be/assets/graphics/z4/stores/No_Store_300_Icon.png' 
                        alt="No store"
                    />
                    <h2 className="font-bold text-2xl">No store</h2>
                    <span className="text-muted-foreground mb-4">
                        You don't have any store at this time. Click below to create one.
                    </span>   
                    <CreateShop />
                </div>
            )}
        </div>
    );
}
