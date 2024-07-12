import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Card } from "@/components/ui/card";
import { BASE_API } from "@/config.json";

export default function CreateShop() {
    const [name, setName] = useState('');
    const [templateId, setTemplateId] = useState('1');
    const { shops, updateShops } = useAuth();

    async function createShop() {
        if (!name) return;

        const response = await fetch(BASE_API + '/me/shops', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, templateId })
        }).catch(() => null);

        if (!response) return console.log('An error occurred while creating your shop. Try again.');

        const json = await response.json().catch(() => null);

        if (response?.status === 200 && json.id) {
            console.log(json);

            updateShops([...shops, json]);
        } else {
            console.log(json?.message || 'An error occurred while creating your shop. Try again.');
        }
    }
    
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button>{shops.length > 0 ? "Modify store" : "Create store"}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{shops.length > 0 ? "Modify your store" : "Create a new store"}</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="flex flex-col gap-2">
                    <Label>Store name</Label>
                    <Input 
                        placeholder="Store 1"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Label className="my-2">Choose a template</Label>
                    <div className="flex items-center justify-between gap-4">
                        <Card onClick={() => setTemplateId('1')} className={`cursor-pointer ${templateId === '1' && 'ring-2'}`}>
                            <img className="rounded-md select-none" src="/template1.png" alt="Template" />
                        </Card>
                        <Card onClick={() => setTemplateId('2')} className={`cursor-pointer ${templateId === '2' && 'ring-2'}`}>
                            <img className="rounded-md select-none" src="/template2.png" alt="Template" />
                        </Card>
                    </div>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction disabled={!name || !templateId} onClick={() => createShop()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}