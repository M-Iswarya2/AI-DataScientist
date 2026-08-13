import { NavLink } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Dataset Summary", path: "/dataset-summary" },
    { name: "Data Quality", path: "/data-quality" },
    { name: "Statistics", path: "/statistics" },
    { name: "Feature Analysis", path: "/feature-analysis" },
    { name: "Visualization", path: "/visualization" },
    { name: "Relationship Analysis", path: "/relationship-analysis" },
    { name: "Outlier Analysis", path: "/outlier-analysis" },
    { name: "Target Detection", path: "/target-detection" },
    { name: "Type Detection", path: "/type-detection" },
    { name: "Preprocessing", path: "/preprocessing" },
    { name: "Model Selection", path: "/model-selection" }
];

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-[#12161D] text-white border-r border-[#232933]">

            <div className="p-6 text-xl font-bold border-b border-[#232933]">
                Modules
            </div>

            <nav className="flex flex-col py-2">

                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `px-6 py-3 text-sm transition duration-200 ${
                                isActive
                                    ? "bg-[#1C2638] text-white border-l-2 border-[#5B8DEF]"
                                    : "text-[#8B93A1] hover:bg-[#161B24] hover:text-white"
                            }`
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;