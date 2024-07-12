import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_API } from "@/config.json";

export default function Register() {
    const [datas, setDatas] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    async function login() {
        if (!datas.email) return setError('Email is required.');
        if (!datas.password) return setError('Password is required.');
        
        fetch(BASE_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datas)
        })
            .then(response => response.json())
            .then(json => {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    window.location.replace('/dashboard');
                } else {
                    setError(json.message || 'An error occured.');
                }
            })
            .catch(() => setError('An error occured.'));
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen py-8">
            <div className="flex flex-col items-center justify-center w-full max-w-96">
                <h1 className="text-center text-4xl font-extrabold">Login</h1>
                {error ? <p className="text-red-500 mt-10">{error}</p> : null}
                <label htmlFor="email" className="relative w-full mt-4">
                    <box-icon class="fill-white opacity-30 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" type='solid' name='user'></box-icon>
                    <Input onChange={(e) => setDatas(prev => ({ ...prev, email: e.target.value }))} type="email" name="email" id="email" placeholder="Email"></Input>
                </label>
                <label htmlFor="password" className="relative w-full mt-4">
                    <box-icon class="fill-white opacity-30 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" type='solid' name='lock-alt'></box-icon>
                    <Input onChange={(e) => setDatas(prev => ({ ...prev, password: e.target.value }))} type="password" name="password" id="password" placeholder="Password"></Input>
                </label>
                <div className="flex items-center justify-between w-full px-8 mt-6">
                    {/* <h2 className="text-2xl font-extrabold mt-2 mb-2">Login</h2> */}
                    <div></div>
                    <Button size='icon' onClick={() => login()}><ArrowRight className="h-6 w-6" /></Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 mt-8 w-full">
                <Link to="/register" className="text-muted-foreground font-light cursor-pointer">I don't have an account yet</Link>
            </div>
        </div>
    )
}