import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "@/lib/contexts/userContext";
import { BASE_API } from "../../config.json";
import useSWR from 'swr';
import Loader from "@/components/Loader";
import Login from "@/routes/Login";
import Header from "@/components/nav/Header";

export function useAuth() {
	return useContext(UserContext);
}

export function AuthWrapper({ children }) {
	const { user, updateUser } = useAuth();
	const location = useLocation();
	const auth = localStorage.getItem('token');

	const shouldFetchUser = (location.pathname.startsWith('/dash') || location.pathname.startsWith('/admin')) && auth && !(user && user.id);
	const fetcher = (url) => fetch(url, { 
		method: 'GET', 
		headers: { Authorization: `${auth}` } 
	}).then(response => response.json());
	
	const { isLoading } = useSWR(shouldFetchUser ? BASE_API + '/users/@me' : null, fetcher, {
		onSuccess: (data) => {
			if (data?.id) updateUser(data);
		},
		revalidateOnFocus: false,
		revalidateIfStale: false,
		revalidateOnReconnect: false
	});

	// if (location.pathname.startsWith('/auth/') && auth) return window.location.replace('/dash/dashboard');

	if (!location.pathname.startsWith('/dash') && !location.pathname.startsWith('/admin')) {
		return <>{children}</>;
	}

	if (!auth) {
		return <Login />;
	}

	if (isLoading) {
		return <Loader />;
	}

	// if (location.pathname.startsWith('/admin') && user && user.subTier !== 2) return <Login />;

	return user && user.id ? <Layout>{children}</Layout> : <Login />;
}

// export function AuthWrapper({ children }) {
// 	const [isLoading, setIsLoading] = useState(false);
// 	const { user, updateUser } = useAuth();
// 	const location = useLocation();
	
// 	const auth = localStorage.getItem('token');
// 	// if (location.pathname.startsWith('/auth/') && auth) return window.location.replace('/dash/dashboard');

// 	useEffect(() => {
// 		if (!location.pathname.startsWith('/dash') && !location.pathname.startsWith('/admin') || !auth || (user && user.id)) return;
// 		setIsLoading(true);

// 		async function getUser() {
// 			const data = await fetch(`${BASE_API}/v${API_VERSION}/users/@me`, { method: 'GET', headers: { 'Authorization': `${auth}` } }).then(response => response.json()).catch(() => null);

// 			if (data?.id) {
// 				updateUser(data);
// 			}
// 			setIsLoading(false);
// 		}

// 		getUser();
// 	}, []);

// 	if (!location.pathname.startsWith('/dash') && !location.pathname.startsWith('/admin')) return <>{children}</>;

// 	if (!auth) return <Login />;
// 	if (user && user.id) return <Layout>{children}</Layout>;
// 	if (isLoading) return <Loader />;

// 	return user ? <Layout>{children}</Layout> : <Login />;
// }

function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="p-6 bg-background overflow-y-auto md:px-10">
                {children}
            </div>
        </div>
    );
}