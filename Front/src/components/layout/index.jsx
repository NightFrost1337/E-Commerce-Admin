import Header from "@/components/layout/Header";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <main className="w-full bg-background p-6 sm:p-12 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}