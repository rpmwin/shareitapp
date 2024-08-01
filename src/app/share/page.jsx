"use client";
import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function SharePage() {
    const [shareOption, setShareOption] = useState("text");
    const [editorContent, setEditorContent] = useState("");
    const passwordRef = useRef(null);
    const fileRef = useRef(null);
    const folderRef = useRef(null);

    const changeOption = (e) => {
        setShareOption(e.target.value);
    };

    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
        console.log("Content was updated:", content);
    };

    const copyToClipboard = () => {
        if (shareOption === "text") {
            navigator.clipboard.writeText(editorContent);
        } else if (shareOption === "password") {
            navigator.clipboard.writeText(passwordRef.current.value);
        } else if (shareOption === "file") {
            navigator.clipboard.writeText(fileRef.current.files[0].name);
        } else if (shareOption === "folder") {
            const folder = Array.from(folderRef.current.files)
                .map((file) => file.webkitRelativePath)
                .join("\n");
            navigator.clipboard.writeText(folder);
        }
    };

    const shareContent = () => {
        alert("Sharing content...");
    };

    useEffect(() => {
        console.log(shareOption);
    }, [shareOption]);

    return (
        <div className="flex min-h-screen flex-col items-center p-8 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold text-center mb-8">
                SHARE - PAGE
            </h1>
            <div className="flex min-w-[400px] min-h-[200px] items-center flex-col border rounded-xl p-6 bg-gray-800">
                <div className="flex flex-row gap-4 mb-4">
                    <button
                        onClick={changeOption}
                        value="text"
                        className={`text-lg p-3 rounded font-semibold transition-colors duration-300 ${
                            shareOption === "text"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-700 hover:bg-gray-800"
                        }`}
                    >
                        TEXT
                    </button>
                    <button
                        onClick={changeOption}
                        value="password"
                        className={`text-lg p-3 rounded font-semibold transition-colors duration-300 ${
                            shareOption === "password"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-700 hover:bg-gray-800"
                        }`}
                    >
                        PASSWORD
                    </button>
                    <button
                        onClick={changeOption}
                        value="file"
                        className={`text-lg p-3 rounded font-semibold transition-colors duration-300 ${
                            shareOption === "file"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-700 hover:bg-gray-800"
                        }`}
                    >
                        FILE
                    </button>
                    <button
                        onClick={changeOption}
                        value="folder"
                        className={`text-lg p-3 rounded font-semibold transition-colors duration-300 ${
                            shareOption === "folder"
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-700 hover:bg-gray-800"
                        }`}
                    >
                        FOLDER
                    </button>
                </div>

                {shareOption === "text" && (
                    <div className="flex items-center justify-center flex-col w-full">
                        <Editor
                            apiKey="36zr59sih7n2ookxfjyz1i02rwa4dmfynsqnax66m1vae9ml"
                            value={editorContent}
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; background-color: #2d3748; color: #ffffff; }",
                            }}
                            onEditorChange={handleEditorChange}
                        />

                        <div className="flex mt-4 gap-4">
                            <button
                                onClick={copyToClipboard}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                COPY
                            </button>
                            <button
                                onClick={shareContent}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                SHARE
                            </button>
                        </div>
                    </div>
                )}

                {shareOption === "password" && (
                    <div className="flex items-center justify-center flex-col w-full">
                        <input
                            ref={passwordRef}
                            type="password"
                            className="w-full max-w-[800px] min-h-[50px] border rounded-lg p-4 m-4 bg-gray-700 text-white text-lg tracking-wide"
                            placeholder="Enter your password"
                        />
                        <div className="flex mt-4 gap-4">
                            <button
                                onClick={copyToClipboard}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                COPY
                            </button>
                            <button
                                onClick={shareContent}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                SHARE
                            </button>
                        </div>
                    </div>
                )}

                {shareOption === "file" && (
                    <div className="flex items-center justify-center flex-col w-full">
                        <input
                            ref={fileRef}
                            type="file"
                            className="w-full max-w-[800px] border rounded-lg p-4 m-4 bg-gray-700 text-white text-lg tracking-wide"
                        />
                        <div className="flex mt-4 gap-4">
                            <button
                                onClick={copyToClipboard}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                COPY
                            </button>
                            <button
                                onClick={shareContent}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                SHARE
                            </button>
                        </div>
                    </div>
                )}

                {shareOption === "folder" && (
                    <div className="flex items-center justify-center flex-col w-full">
                        <input
                            ref={folderRef}
                            type="file"
                            webkitdirectory="true"
                            directory="true"
                            className="w-full max-w-[800px] border rounded-lg p-4 m-4 bg-gray-700 text-white text-lg tracking-wide"
                        />
                        <div className="flex mt-4 gap-4">
                            <button
                                onClick={copyToClipboard}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                COPY
                            </button>
                            <button
                                onClick={shareContent}
                                className="text-lg bg-blue-600 p-3 rounded font-semibold hover:bg-blue-700 transition-colors duration-300"
                            >
                                SHARE
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
