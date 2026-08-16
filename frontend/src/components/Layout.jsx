import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <div className="h-screen bg-[#0B0E12] overflow-hidden">

            <Navbar />

            <div className="flex h-[calc(100vh-64px)]">

                <aside className="h-full overflow-y-auto flex-shrink-0">
                    <Sidebar />
                </aside>

                <main className="flex-1 min-w-0 h-full overflow-y-auto p-8">
                    {children}
                </main>

            </div>

        </div>
    );
}

export default Layout;