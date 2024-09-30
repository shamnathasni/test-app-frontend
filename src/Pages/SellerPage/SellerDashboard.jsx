import React from 'react';
import { useNavigate } from 'react-router-dom';

function SellerDashboard() {
    const seller = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleAddProduct = () => {
        navigate('/seller-addProduct'); // Navigate to the Add Product form
    };

    const handleShowProducts = () => {
        navigate('/show-products'); // Navigate to the Show Products page
    };

    return (
        <div className="flex flex-col items-center  h-screen p-8">
            <h1 className="p-4 text-3xl font-bold text-[#872341] mb-4">Welcome to Our APP, {seller.name}!</h1>
            <p className="text-lg text-white mb-4 text-center">
                As a Seller, you can list your valuable products here without any commission charges.
                We only charge a small registration amount to help you start your selling journey!
            </p>
            <p className="text-md text-gray-300 mb-8 text-center">
                Whether you’re a new seller or an experienced one, our platform is designed to empower you.
                Enjoy a seamless experience and maximize your profits with our user-friendly interface.
            </p>
            <div className="flex flex-col space-y-4">
                <button
                    onClick={handleAddProduct}
                    className="bg-[#872341] text-white p-2 rounded hover:bg-[#a23e55] transition duration-200 w-64 shadow-lg"
                >
                    Add Product
                </button>
                <button
                    onClick={handleShowProducts}
                    className="bg-[#872341] text-white p-2 rounded hover:bg-[#a23e55] transition duration-200 w-64 shadow-lg"
                >
                    Show Products
                </button>
            </div>
        </div>
    );
}

export default SellerDashboard;
