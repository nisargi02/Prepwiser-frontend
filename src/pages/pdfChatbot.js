import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css'; // Custom toast styles
import TopNavigation from './topNavigation.js';
import SideNavigation from './sideNavigation.js';
import { useUser } from './userContext.js'; 

const PDFChatbot = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const { user } = useUser(); 

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFileUploaded(false); // Reset file uploaded state on new file selection
    };

    const handleFileSubmit = async () => {
        if (!selectedFile) {
            toast.error("Please select a file first!", { 
                className: 'toast-container', 
                progressClassName: 'toast-progress-bar',
                bodyClassName: 'toast-progress-bar-bg',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 toast-error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/upload/`, {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Upload successful:', data);
                setIsFileUploaded(true);
                toast.success('File uploaded successfully!', { 
                    className: 'toast-container', 
                    progressClassName: 'toast-progress-bar',
                    bodyClassName: 'toast-progress-bar-bg',
                });
            } else {
                throw new Error('Failed to upload file.');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Error uploading file!', { 
                className: 'toast-container', 
                progressClassName: 'toast-progress-bar',
                bodyClassName: 'toast-progress-bar-bg',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 toast-error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            });
        }
    };

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!userInput.trim()) {
            toast.error("Please enter a question.", { 
                className: 'toast-container', 
                progressClassName: 'toast-progress-bar',
                bodyClassName: 'toast-progress-bar-bg',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 toast-error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            });
            return;
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: userInput })
            });
            if (response.ok) {
                const data = await response.json();
                setChatHistory(chatHistory.concat({
                    user: userInput,
                    bot: data.answer
                }));
                setUserInput(''); // Clear input after sending
            } else {
                throw new Error('Failed to get response.');
            }
        } catch (error) {
            console.error('Chat error:', error);
            setChatHistory(chatHistory.concat({
                user: userInput,
                bot: "Error fetching response."
            }));
        }
    };

    return (
        <div className="h-[90vh]">
            <TopNavigation />
            <div className="flex h-screen">
                <SideNavigation />
                <div className="flex-1 flex flex-col relative">
                    <div className="w-3/5 mx-auto bg-white p-8 rounded-lg shadow my-6">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-dark-blue">PDF Chatbot</h1>
                            <p className="text-dark-blue">Upload your PDF document and ask questions about its content.</p>
                        </div>
                        <div className="mb-6 flex items-center justify-start gap-4">
                            <input 
                                type="file" 
                                accept=".pdf" 
                                onChange={handleFileChange} 
                                className="block w-64 text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-purple-50 file:text-dark-purple
                                    hover:file:bg-purple-100
                                " 
                            />
                            <button 
                                onClick={handleFileSubmit} 
                                className="bg-button hover:bg-button-hover text-white font-bold py-2 px-4 rounded"
                            >
                                Upload PDF
                            </button>
                        </div>
                        <div className="chat-interface border-t pt-4">
                            <ul className="space-y-2">
                                {chatHistory.map((entry, index) => (
                                    <li key={index} className="text-sm text-dark-blue">
                                        <div className="user-message bg-button text-white p-3 relative">
                                            <div >{entry.user}</div>
                                            <div className="message-footer text-white text-xs absolute bottom-2 right-4 font-bold">{user.first_name}</div>
                                        </div>
                                        <div className="bot-message bg-gray-300 text-dark-blue p-3 my-4 relative">
                                            <div>{entry.bot}</div>
                                            <div className="message-footer text-dark-blue text-xs absolute bottom-2 right-4 font-bold">Bot</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className='flex w-full mt-8 gap-4'>
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={handleInputChange}
                                    placeholder="Ask a question..."
                                    className="flex-1 rounded py-2 px-4 border"
                                    disabled={!isFileUploaded} // Disable input if file is not uploaded
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className={`text-white font-bold py-2 px-4 rounded ${isFileUploaded ? 'bg-button hover:bg-button-hover' : 'bg-gray-400 cursor-not-allowed'}`}
                                    disabled={!isFileUploaded} // Disable button if file is not uploaded
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default PDFChatbot;
