import React from 'react'
import { NavLink, Link } from 'react-router-dom';
export default function Header() {
    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <NavLink to="/">
                        <span className='font-bold text-2xl text-zinc-400'>leet</span><span className='font-bold text-2xl text-yellow-500'>Bud</span>
                    </NavLink>

                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 ${isActive ? "text-yellow-500" : "text-white"} duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/stats"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 ${isActive ? "text-yellow-500" : "text-white"} duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Stats
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 ${isActive ? "text-yellow-500" : "text-white"} duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

