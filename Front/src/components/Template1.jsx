import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function Template1({ storeName, products = [] }) {
    return (
        <div className="flex flex-col justify-center items-center bg-white">
            <div className="bg-background h-16 w-full border-b flex justify-between items-center py-4 px-6">
                <h1 className="font-bold uppercase">
                    store
                    <span className="font-normal lowercase ml-4">{storeName}</span>
                </h1>
                
                <Button className="bg-black gap-2 rounded-full">
                    <ShoppingBag />
                    <span>0</span> {/* FAUDRA MODIF AVEC LE NOMBRE DE PRODUITS AJOUTES AU PANIER */}
                </Button>
            </div>
            <div className="relative flex justify-center items-center bg-gray-200 w-[60%] h-80 mt-8 rounded-3xl select-none">
                <img
                    src="/banner.png"
                    alt="Just Do It"
                    className="absolute inset-0 rounded-3xl w-full h-full"
                />
                <div className="absolute inset-0 bg-gray-800 rounded-3xl bg-opacity-50 flex flex-col justify-center items-center">
                    <h2 className="text-white text-4xl font-bold">JUST DO IT</h2>
                </div>
            </div>
            <div className="w-full max-w-6xl p-4">
                <h2 className="text-2xl font-bold my-4">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="flex flex-col items-start bg-white border border-gray-200 rounded-lg p-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="object-cover w-full h-48 rounded-md"
                            />
                            <h3 className="mt-4 font-semibold text-lg">{product.name}</h3>
                            <p className="mt-2 text-gray-600">{product.category}</p>
                            <p className="mt-1 text-gray-800">€{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
