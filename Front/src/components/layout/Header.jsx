import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Moon, Sun, Store, Users, LockKeyhole, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function Header() {
    const { user, shops } = useAuth();
    const { theme, setTheme } = useTheme();
    const location = useLocation();
    
    const selectedStore = localStorage.getItem('store'); 

    return (
        <div className="bg-background h-16 w-full border-b flex justify-between items-center py-4 px-6">
            <div className="flex items-center gap-8">
                <Select className="flex items-center gap-3 cursor-pointer" value={selectedStore && shops.find(shop => shop.id === selectedStore) ? selectedStore : ''} onValueChange={(value) => localStorage.setItem('store', value)}>
                    <SelectTrigger className="w-[180px] bg-transparent">
                        <SelectValue placeholder="Select a Shop" />
                    </SelectTrigger>
                    <SelectContent>
                        {shops.map(store => (
                            <SelectItem
                                key={store.id}
                                value={store.id}
                                className="cursor-pointer"
                            >
                                <div className="flex items-center gap-2 py-1">
                                    <Store className="block w-5 h-5" />
                                    <span>{store.name}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex justify-start items-center space-x-8">
                    <Link
                        to="/dashboard"
                        className={`relative group ${location.pathname === '/dashboard' ? 'text-blue-500' : ''}`}
                    >
                        Overview
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/dashboard' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                    <Link
                        to="/billsboard"
                        className={`relative group ${location.pathname === '/billsboard' ? 'text-blue-500' : ''}`}
                    >
                        Billsboard
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/billsboard' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                    <Link
                        to="/categories"
                        className={`relative group ${location.pathname === '/categories' ? 'text-blue-500' : ''}`}
                    >
                        Categories
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/categories' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                    <Link
                        to="/sizes"
                        className={`relative group ${location.pathname === '/sizes' ? 'text-blue-500' : ''}`}
                    >
                        Sizes
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/sizes' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                    <Link
                        to="/colors"
                        className={`relative group ${location.pathname === '/colors' ? 'text-blue-500' : ''}`}
                    >
                        Colors
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/colors' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                    <Link
                        to="/products"
                        className={`relative group ${location.pathname === '/products' ? 'text-blue-500' : ''}`}
                    >
                        Products
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/products' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                    <Link
                        to="/orders"
                        className={`relative group ${location.pathname === '/orders' ? 'text-blue-500' : ''}`}
                    >
                        Orders
                        <span className={`absolute left-0 bottom-0 h-[2px] transition-all duration-300 ${location.pathname === '/orders' ? 'w-full bg-blue-500' : 'w-0 group-hover:w-full group-hover:bg-blue-500'}`}></span>
                    </Link>
                </div>
            </div>
            <div className="flex items-center gap-6">
                {theme === 'dark' ? <Moon className="cursor-pointer" onClick={() => setTheme('light')} /> : <Sun className="cursor-pointer" onClick={() => setTheme('dark')} />}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-4 cursor-pointer mr-2 select-none">
                            <img className="h-6" src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`} alt="Avatar" />
                            {/* <span>{user.username.lengh > 2 ? `${user.username.slice(0, 2)}...` : user.username}</span> */}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2 mr-[-0.5rem]" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal flex gap-2 items-center">
                            <img className="h-6 rounded-full" src={`https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`} alt="Avatar" />
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.username.lengh > 2 ? `${user.username.slice(0, 2)}...` : user.username}</p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {user.email}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className={'cursor-pointer'}><Users className={'w-4 h-4 mr-2'} /> Account</DropdownMenuItem>
                            <DropdownMenuItem className={'cursor-pointer'}><LockKeyhole className={'w-4 h-4 mr-2'} /> Subscription</DropdownMenuItem>
                            <DropdownMenuItem className={'cursor-pointer'}><Settings className={'w-4 h-4 mr-2'} /> Settings</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className={'cursor-pointer text-red-500 focus:text-red-500'}><LogOut className={'w-4 h-4 mr-2'} />Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
