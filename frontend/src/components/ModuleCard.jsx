import { useNavigate } from "react-router-dom";

function ModuleCard({ title, description, path, icon }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(path)}
            className="
                bg-[#12161D]
                border border-[#232933]
                rounded-md
                p-6
                cursor-pointer
                transition
                duration-200
                hover:border-[#5B8DEF]
                hover:bg-[#161B24]
            "
        >
            <div className="text-3xl mb-4">
                {icon}
            </div>

            <h2 className="text-xl font-semibold text-white">
                {title}
            </h2>

            <p className="text-[#8B93A1] mt-2 text-sm leading-relaxed">
                {description}
            </p>

            <button
                onClick={(event) => {
                    event.stopPropagation();
                    navigate(path);
                }}
                className="
                    mt-6
                    bg-[#5B8DEF]
                    text-white
                    px-4
                    py-2
                    rounded-md
                    text-sm
                    font-medium
                    hover:bg-[#4A7FE0]
                    transition
                "
            >
                Open
            </button>
        </div>
    );
}

export default ModuleCard;