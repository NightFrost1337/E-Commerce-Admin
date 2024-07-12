import useSWR from 'swr';
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { UserContext } from "@/helpers/contexts/User";
import { BASE_API } from "@/config.json";
import Loader from "@/components/layout/Loader";
import Layout from "@/components/layout";
import Login from "@/pages/(auth)/Login";

export function useAuth() {
	return useContext(UserContext);
}

const routes = ['dashboard', 'billsboard', 'categories', 'colors', 'orders', 'products', 'sizes'];

export function AuthWrapper({ children }) {
	const { user, updateUser, updateShops } = useAuth();
	const location = useLocation();
	const auth = localStorage.getItem('token');

	const shouldFetchUser = routes.some(route => location.pathname === '/' + route) && auth && !(user && user.id);
	const fetcher = (url) => fetch(url, { 
		method: 'GET', 
		headers: { Authorization: auth }
	}).then(response => response.json()).catch(() => null);
	
	const { isLoading } = useSWR(shouldFetchUser ? BASE_API + '/me' : null, fetcher, {
		onSuccess: (data) => {
			if (data?.id) updateUser(data);
		},
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false
	});
	useSWR(!isLoading && user?.id ? BASE_API + '/me/shops' : null, fetcher, {
		onSuccess: (data) => {
			if (Array.isArray(data)) updateShops(data);
		},
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false
	});

	// if (location.pathname.startsWith('/auth/') && auth) return window.location.replace('/dash/dashboard');

	if (!routes.some(route => location.pathname === '/' + route)) {
		return <>{children}</>;
	}

	if (!auth) {
		return <Login />;
	}

	if (isLoading) {
		return <Loader />;
	}

	return user && user.id ? (
		<ThemeProvider>
			<Layout>{children}</Layout>
		</ThemeProvider>
	) : <Login />;
}