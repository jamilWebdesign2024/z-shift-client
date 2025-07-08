import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProfastLogo from '../Pages/shared/ProfastLogo/ProfastLogo';

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProfastLogo></ProfastLogo>
                    <li><a>Home</a></li>
                    <li><a><NavLink to="/dashboard/myParcels">My Parcels</NavLink></a></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;


// import React from 'react';
// import { Outlet } from 'react-router';

// const DashboardLayout = () => {
//     return (
//         <div className="drawer lg:drawer-open w-screen h-screen">
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

//             {/* Page content */}
//             <div className="drawer-content flex flex-col bg-base-100 lg:pl-64">
//                 {/* Navbar for mobile only */}
//                 <div className="navbar bg-base-300 lg:hidden">
//                     <div className="flex-none">
//                         <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
//                             </svg>
//                         </label>
//                     </div>
//                     <div className="flex-1 px-2 font-bold text-xl">Dashboard</div>
//                 </div>

//                 {/* Main content */}
//                 <div className="w-full p-4">
//                     <Outlet />
//                 </div>
//             </div>

//             {/* Sidebar */}
//             <div className="drawer-side">
//                 {/* Drawer overlay only for small screens */}
//                 <label htmlFor="my-drawer-2" className="drawer-overlay lg:hidden"></label>

//                 <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content 
//                     lg:fixed lg:top-0 lg:left-0 lg:h-full">
//                     <li><a>Sidebar Item 1</a></li>
//                     <li><a>Sidebar Item 2</a></li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;
