import React, { useState } from "react";
import { clientApi } from "../api/clientApi";

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [websiteUrl, setWebsiteUrl] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadType, setUploadType] = useState<"file" | "website">("file");
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Handle website URL change
    const handleWebsiteUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWebsiteUrl(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (uploadType === "file" && !file) {
            setMessage("Please select a file first.");
            return;
        }

        if (uploadType === "website" && !websiteUrl) {
            setMessage("Please enter a website URL.");
            return;
        }

        const formData = new FormData();

        if (uploadType === "file") {
            formData.append("file", file!);
        } else {
            formData.append("url", websiteUrl);
        }

        setUploading(true);
        setMessage("");
        setUploadProgress(0);

        try {
            if (uploadType === "website") {
                const response = await clientApi.post("/web", formData);
                console.log("response : ", response);
            }

            if (uploadType === "file") {
                const response = await clientApi.post("/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form",
                    },
                });
                console.log("response : ", response);
            }
        } catch (error: any) {
            setMessage(error?.response?.data);
            console.error("Error uploading:", error);
        } finally {
            setUploading(false);
            setFile(null);
            setWebsiteUrl("");
            setUploadProgress(0);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 mb-10 mt-20 bg-white shadow-2xl rounded-xl border border-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Upload Content
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload Type Selection */}
                <div className="flex justify-center space-x-4">
                    <button
                        type="button"
                        onClick={() => setUploadType("file")}
                        className={`flex items-center justify-center py-2 px-6 rounded-lg transition-all duration-300 ${
                            uploadType === "file"
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <span className="mr-2">📁</span>
                        Upload File
                    </button>
                    <button
                        type="button"
                        onClick={() => setUploadType("website")}
                        className={`flex items-center justify-center py-2 px-6 rounded-lg transition-all duration-300 ${
                            uploadType === "website"
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <span className="mr-2">🌐</span>
                        Enter Website
                    </button>
                </div>

                {/* File Upload Input */}
                {uploadType === "file" && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Choose a file
                        </label>
                        <div className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-all duration-300">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="fileInput"
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer text-center"
                            >
                                <span className="text-blue-500 font-semibold text-xl">
                                    Click to upload
                                </span>{" "}
                                {/* or drag and drop */}
                                <br />
                                <span className="text-sm text-gray-500">
                                    Max file size: 50MB
                                </span>
                            </label>
                        </div>
                        {file && (
                            <div className="text-sm text-gray-600">
                                Selected file:{" "}
                                <span className="font-semibold">
                                    {file.name}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Website URL Input */}
                {uploadType === "website" && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Enter website URL
                        </label>
                        <input
                            type="url"
                            placeholder="https://example.com"
                            value={websiteUrl}
                            onChange={handleWebsiteUrlChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                )}

                {/* Progress Bar */}
                {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={uploading}
                    className={`w-full py-3 px-6 text-white font-semibold rounded-lg duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all ${
                        uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </form>

            {/* Message Display */}
            {message && (
                <div
                    className={`mt-6 p-4 rounded-lg text-center ${
                        message.includes("success")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
