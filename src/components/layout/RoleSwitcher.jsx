import { Role } from "../../data/role";

const RoleSwitcher = ({ currentRole, onRoleChange }) => {
    const roles = [Role.Manager, Role.Server, Role.Cook, Role.Test];

    const roleConfig = {
        [Role.Manager]: { bgColor: 'bg-blue-600', hoverBgColor: 'hover:bg-blue-700', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        [Role.Server]: { bgColor: 'bg-green-600', hoverBgColor: 'hover:bg-green-700', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
        [Role.Cook]: { bgColor: 'bg-yellow-600', hoverBgColor: 'hover:bg-yellow-700', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
        [Role.Test]: { bgColor: 'bg-purple-600', hoverBgColor: 'hover:bg-purple-700', icon: 'M14 10V3L4 14h7v7l9-11h-7z' },
    };

    return (
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold tracking-wider">Restaurant POS</h1>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium mr-2">SWITCH ROLE:</span>
                {roles.map((role) => {
                    const { bgColor, hoverBgColor, icon } = roleConfig[role];
                    const isActive = currentRole === role;
                    return (
                        <button
                            key={role}
                            onClick={() => onRoleChange(role)}
                            className={`flex items-center px-4 py-2 rounded-md font-semibold transition-all duration-300 transform ${isActive ? `${bgColor} scale-105 shadow-md` : `bg-gray-700 ${hoverBgColor} hover:scale-105`}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d={icon} clipRule="evenodd" />
                            </svg>
                            {role}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RoleSwitcher;