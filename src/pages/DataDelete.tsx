import React, { useState, useEffect } from "react";
import axios from "axios";
import { clientApi } from "../api/clientApi";

const API_BASE_URL = "http://localhost:3000"; // Replace with your backend URL

const DataDelete = () => {
    // State to manage the list of namespaces
    const [namespaces, setNamespaces] = useState([]);

    // State to manage the selected namespace
    const [selectedNamespace, setSelectedNamespace] = useState("");

    // State to manage the confirmation modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to manage loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch namespaces from the backend on component mount
    useEffect(() => {
        const fetchNamespaces = async () => {
            setLoading(true);
            setError("");

            try {
                const response = await clientApi.get(`/namespaces`);
                console.log("log : ", response);
                setNamespaces(response.data.namespaces);
            } catch (err) {
                setError("Failed to fetch namespaces. Please try again.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNamespaces();
    }, []);

    // Function to handle namespace selection
    const handleSelectNamespace = (event: any) => {
        setSelectedNamespace(event.target.value);
    };

    // Function to open the confirmation modal
    const handleDeleteClick = () => {
        if (selectedNamespace) {
            setIsModalOpen(true);
        }
    };

    // Function to handle the actual deletion
    const handleConfirmDelete = async () => {
        setLoading(true);
        setError("");

        try {
            await clientApi.delete(`/namespace/${selectedNamespace}`);
            setNamespaces(namespaces.filter((ns) => ns !== selectedNamespace));
            setSelectedNamespace("");
        } catch (err) {
            setError("Failed to delete the namespace. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
            setIsModalOpen(false); // Close the modal
        }
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    Delete Namespace
                </h1>

                {/* Dropdown to select namespace */}
                <div className="mb-6">
                    <label
                        htmlFor="namespace-select"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Select a namespace to delete:
                    </label>
                    <div className="relative">
                        <select
                            id="namespace-select"
                            value={selectedNamespace}
                            onChange={handleSelectNamespace}
                            className="appearance-none block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer"
                            disabled={loading} // Disable dropdown while loading
                        >
                            <option value="">Select a namespace</option>
                            {namespaces.map((namespace, index) => (
                                <option key={index} value={namespace}>
                                    {namespace}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Delete button */}
                <button
                    onClick={handleDeleteClick}
                    disabled={!selectedNamespace || loading}
                    className={`w-full py-3 px-4 text-white font-semibold rounded-lg transition-all duration-300 ${
                        selectedNamespace && !loading
                            ? "bg-red-600 hover:bg-red-700 transform hover:scale-105"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    Delete
                </button>

                {/* Loading and error messages */}
                {loading && (
                    <p className="text-center text-gray-600 mt-4">Loading...</p>
                )}
                {error && (
                    <p className="text-center text-red-600 mt-4">{error}</p>
                )}
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the namespace{" "}
                            <strong>{selectedNamespace}</strong>? This action
                            cannot be undone.
                        </p>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold rounded-lg transition-all duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300"
                            >
                                {loading ? "Deleting..." : "Confirm Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataDelete;
