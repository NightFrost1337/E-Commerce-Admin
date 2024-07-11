import Header from "@/components/layout/Header";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <div className="p-6 bg-background overflow-y-auto md:px-10">
                {children}
            </div>
        </div>
    );
}