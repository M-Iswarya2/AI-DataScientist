import { useNavigate } from "react-router-dom";

function ModuleCard({ title, description, path, icon }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(path)}
            className="
                bg-white
                rounded-xl
                shadow-md
                hover:shadow-xl
                transition
                duration-300
                cursor-pointer
                p-6
                border
                hover:border-blue-500
            "
        >
            <div className="text-4xl mb-4">
                {icon}
            </div>

            <h2 className="text-xl font-bold text-gray-800">
                {title}
            </h2>

            <p className="text-gray-500 mt-2">
                {description}
            </p>

            <button
                className="
                    mt-6
                    bg-blue-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-blue-700
                "
            >
                Open
            </button>
        </div>
    );
}

export default ModuleCard;