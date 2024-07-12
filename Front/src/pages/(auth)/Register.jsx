import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BASE_API } from "@/config.json";

export default function Register() {
    const [datas, setDatas] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    async function register() {
        if (!datas.username) return setError('Username is required.');
        if (!datas.email) return setError('Email is required.');
        if (!datas.password) return setError('Password is required.');
        if (!datas.confirmPassword) return setError('Password is required.');
        if (datas.password !== datas.confirmPassword) return setError('Passwords are not matching.');

        fetch(BASE_API + '/auth/register', {
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
                <h1 className="text-center text-4xl font-extrabold">Register</h1>
                {error ? <p className="text-red-500 mt-10">{error}</p> : null}
                <label htmlFor="username" className={`relative w-full ${error ? 'mt-2' : 'mt-12'}`}>
                    <box-icon class="fill-white opacity-30 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" type='solid' name='user'></box-icon>
                    <Input onChange={(e) => setDatas(prev => ({ ...prev, username: e.target.value }))} type="username" name="username" id="username" placeholder="Username"></Input>
                </label>
                <label htmlFor="email" className="relative w-full mt-4">
                    <box-icon class="fill-white opacity-30 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" type='solid' name='user'></box-icon>
                    <Input onChange={(e) => setDatas(prev => ({ ...prev, email: e.target.value }))} type="email" name="email" id="email" placeholder="Email"></Input>
                </label>
                <label htmlFor="password" className="relative w-full mt-4">
                    <box-icon class="fill-white opacity-30 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" type='solid' name='lock-alt'></box-icon>
                    <Input onChange={(e) => setDatas(prev => ({ ...prev, password: e.target.value }))} type="password" name="password" id="password" placeholder="Password"></Input>
                </label>
                <label htmlFor="confirmPassword" className="relative w-full mt-4">
                    <box-icon class="fill-white opacity-30 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" type='solid' name='lock-alt'></box-icon>
                    <Input onChange={(e) => setDatas(prev => ({ ...prev, confirmPassword: e.target.value }))} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password"></Input>
                </label>
                <div className="flex items-center justify-between w-full px-8 mt-6">
                    <div></div>
                    <Button size='icon' onClick={() => register()}><ArrowRight className="h-6 w-6" /></Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 mt-8 w-full">
                <Link to={'/login'} className="text-muted-foreground font-light cursor-pointer">I'm already registered</Link>
            </div>
        </div>
    )
}