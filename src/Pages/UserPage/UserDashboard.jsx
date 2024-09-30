import React from 'react';

function UserDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='p-6 flex flex-col h-screen'> {/* h-screen ensures full height */}
            {/* Top greeting section */}
            <div className='flex flex-col gap-3 p-2'>
                <h1 className="text-[#872341] font-bold text-5xl">Hello, {user.name}</h1>
                <h3 className='text-2xl'>How Can I Help You Today?</h3>
            </div>
            
            {/* Search bar section */}
            <div className='flex-grow flex justify-center items-end'> {/* Centers the search bar div */}
                <div className='w-4/5 bg-black rounded-full p-1'> {/* Centered with mx-auto and width set to 80% */}
                    <form className="w-full p-2">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-white sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                type="search" 
                                id="default-search" 
                                className="h-16 block w-full p-3 ps-10 text-md text-white border border-gray-600 bg-black rounded-full focus:ring-gray-500 focus:border-gray-500" 
                                placeholder="Search Mockups, Logos..." 
                                required 
                            />
                            <button 
                                type="submit" 
                                className="text-black absolute end-3 bottom-3 bg-white border rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2"
                            >
                                Shop
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
