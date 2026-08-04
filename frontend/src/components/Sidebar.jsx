import { NavLink } from "react-router-dom";

const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Dataset Summary", path: "/dataset-summary" },
    { name: "Data Quality", path: "/data-quality" },
    { name: "Statistics", path: "/statistics" },
    { name: "Feature Analysis", path: "/feature-analysis" },
    { name: "Relationship Analysis", path: "/relationship-analysis" },
    { name: "Outlier Analysis", path: "/outlier-analysis" },
    { name: "Target Detection", path: "/target-detection" },
    { name: "Type Detection", path: "/type-detection" },
    { name: "Preprocessing", path: "/preprocessing" },
    { name: "Model Selection", path: "/model-selection" }
];

function Sidebar() {

    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white">

            <div className="p-6 text-xl font-bold border-b border-gray-700">
                Modules
            </div>

            <nav className="flex flex-col">

                {menuItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `px-6 py-4 transition duration-200 ${
                                isActive
                                    ? "bg-blue-600"
                                    : "hover:bg-gray-800"
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