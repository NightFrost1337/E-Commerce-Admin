import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthWrapper } from "@/hooks/useAuth";
import { UserContextProvider } from "@/helpers/contexts/User";
import useRouter from "@/hooks/useRouter";

export default function App() {
  const routes = useRouter();

  return (
    <BrowserRouter>
      <UserContextProvider>
        <AuthWrapper>
          <Routes>
            {routes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<h1>404: Not found</h1>} />
          </Routes>
        </AuthWrapper>
      </UserContextProvider>
    </BrowserRouter>
  );
}