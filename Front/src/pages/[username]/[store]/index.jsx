import useSWR from "swr";
import { useParams } from "react-router-dom";
import { BASE_API } from "@/config.json";

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

    if (isLoading) return (
        <div>Loading...</div>
    )

    if (!data?.id) return (
        <div>This shop doesn't exist</div>
    )

    return (
        <>
            {data.templateId === '1' ? <div>Template 1</div> : <div>Template 2</div>}
        </>
    )
}