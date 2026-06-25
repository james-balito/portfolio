"use client"

import { useState, useEffect } from 'react';
import { Button } from '../button';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { CheckCircle, X, Loader2, AlertTriangle } from 'lucide-react';

// ✅ DEBUG: Try multiple possible API URLs
const API_URLS = [
    import.meta.env.VITE_API_URL,
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    // Replace with your actual local IP for mobile testing
    // 'http://192.168.1.100:3001', 
    window.location.protocol + '//' + window.location.hostname + ':3001'
].filter(Boolean) as string[];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message from mobile'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const [debugInfo, setDebugInfo] = useState<string[]>([]);
    const [workingUrl, setWorkingUrl] = useState<string>('');
    const [networkTest, setNetworkTest] = useState<string>('');

    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'warning' | 'debug';
    }>({ show: false, message: '', type: 'success' });

    useEffect(() => {
        setIsOnline(navigator.onLine);
        
        const handleOnline = () => {
            setIsOnline(true);
            addDebug('📱 Online event detected');
        };
        
        const handleOffline = () => {
            setIsOnline(false);
            addDebug('📱 Offline event detected');
        };
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        // ✅ Test connection on mount
        testConnection();
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const addDebug = (message: string) => {
        console.log('🐛', message);
        setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const testConnection = async () => {
        addDebug('🔍 Testing API connection...');
        setNetworkTest('Testing...');
        
        for (const url of API_URLS) {
            try {
                addDebug(`🔗 Trying: ${url}/api/test`);
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 5000);
                
                const response = await fetch(`${url}/api/test`, {
                    method: 'GET',
                    signal: controller.signal,
                    mode: 'cors'
                });
                
                clearTimeout(timeout);
                
                if (response.ok) {
                    const data = await response.json();
                    addDebug(`✅ SUCCESS with ${url}: ${JSON.stringify(data)}`);
                    setWorkingUrl(url);
                    setNetworkTest(`Connected to ${url}`);
                    showToast(`Connected to backend!`, 'success');
                    return;
                } else {
                    addDebug(`❌ Failed with ${url}: Status ${response.status}`);
                }
            } catch (error: unknown) {
                // ✅ Fixed: Properly typed error handling
                if (error instanceof Error) {
                    addDebug(`❌ Error with ${url}: ${error.message}`);
                } else {
                    addDebug(`❌ Unknown error with ${url}`);
                }
            }
        }
        
        setNetworkTest('Failed to connect to any API URL');
        showToast('Cannot connect to backend. Check if server is running.', 'error');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'debug') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!navigator.onLine) {
            showToast('No internet connection', 'error');
            return;
        }

        setIsSubmitting(true);
        
        // ✅ Use working URL if found, otherwise try all
        const apiUrl = workingUrl || API_URLS[0];
        addDebug(`📤 Submitting to: ${apiUrl}/api/contact`);
        addDebug(`📦 Data: ${JSON.stringify(formData)}`);

        const controller = new AbortController();
        const timeout = setTimeout(() => {
            addDebug('⏰ Request timeout');
            controller.abort();
        }, 10000);

        try {
            addDebug('📡 Sending fetch request...');
            
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
                signal: controller.signal,
                mode: 'cors'
            });

            clearTimeout(timeout);
            
            addDebug(`📥 Response status: ${response.status}`);
            
            const data = await response.json();
            addDebug(`📨 Response data: ${JSON.stringify(data)}`);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            showToast('Message sent successfully!', 'success');
            setFormData({ name: '', email: '', subject: '', message: '' });

        } catch (error: unknown) {
            clearTimeout(timeout);
            
            // ✅ Fixed: Properly typed error handling
            if (error instanceof Error) {
                addDebug(`❌ Error: ${error.message}`);
                
                if (error.name === 'AbortError') {
                    showToast('Request timed out. Server might be down.', 'error');
                } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
                    showToast('Network error. Is the server running?', 'error');
                } else {
                    showToast(error.message, 'error');
                }
            } else {
                addDebug('❌ Unknown error occurred');
                showToast('An unexpected error occurred', 'error');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* ✅ Debug Panel - Mobile Friendly */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 text-xs text-green-400 p-2 max-h-32 overflow-y-auto font-mono">
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">🐛 Debug Console</span>
                    <div className="flex gap-2">
                        <button 
                            onClick={testConnection}
                            className="px-2 py-1 bg-blue-500/20 rounded text-blue-400"
                        >
                            Test Connection
                        </button>
                        <button 
                            onClick={() => setDebugInfo([])}
                            className="px-2 py-1 bg-red-500/20 rounded text-red-400"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                <div className="flex gap-2 mb-1">
                    <span className={isOnline ? 'text-green-400' : 'text-red-400'}>
                        {isOnline ? '🟢 Online' : '🔴 Offline'}
                    </span>
                    {workingUrl && (
                        <span className="text-green-400">✅ {workingUrl}</span>
                    )}
                </div>
                {debugInfo.map((log, i) => (
                    <div key={i} className="border-b border-gray-800 py-0.5">
                        {log}
                    </div>
                ))}
            </div>

            {/* ✅ Toast */}
            {toast.show && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
                    <div
                        className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-sm ${
                            toast.type === 'success'
                                ? 'bg-green-500/15 border-green-500/30 text-green-400'
                                : toast.type === 'warning'
                                ? 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400'
                                : toast.type === 'debug'
                                ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                                : 'bg-red-500/15 border-red-500/30 text-red-400'
                        }`}
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {toast.type === 'success' ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : toast.type === 'warning' ? (
                                <AlertTriangle className="w-5 h-5" />
                            ) : (
                                <X className="w-5 h-5" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold mb-0.5">
                                {toast.type === 'success' ? 'Success' : toast.type === 'warning' ? 'Warning' : 'Error'}
                            </p>
                            <p className="text-xs opacity-80 break-words">
                                {toast.message}
                            </p>
                        </div>
                        <button
                            onClick={() => setToast({ show: false, message: '', type: 'success' })}
                            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* ✅ Main Contact Form */}
            <section id="contact" className="flex flex-col justify-center items-center py-24 pt-40">
                <h1
                    className="text-3xl mb-6"
                    style={{
                        fontFamily: 'var(--Instrument-Serif)',
                        fontStyle: 'italic'
                    }}
                >
                    Connect with Me
                </h1>

                <p
                    className="text-center text-[var(--text-color)]/70 text-base max-w-xl mb-10 leading-relaxed"
                    style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                >
                    Have a project in mind, opportunity to collaborate, or just want to chat?
                    I'm always open to discussing new ideas, innovative solutions, and exciting ventures.
                    Drop me a message and let's build something great together.
                </p>

                <div className="flex gap-6 mb-12">
                    <a
                        href="mailto:jamesbalito@gmail.com"
                        className="flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--secondary-color)] transition-colors duration-300"
                    >
                        <HiOutlineMail className="w-5 h-5" />
                        <span style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>Email</span>
                    </a>

                    <a
                        href="https://github.com/james-balito"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--secondary-color)] transition-colors duration-300"
                    >
                        <FaGithub className="w-5 h-5" />
                        <span style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>GitHub</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/jamesbalito/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--secondary-color)] transition-colors duration-300"
                    >
                        <FaLinkedin className="w-5 h-5" />
                        <span style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>LinkedIn</span>
                    </a>
                </div>

                <div className="w-full max-w-lg px-4">
                    {/* ✅ Network Status */}
                    {networkTest && (
                        <div className="mb-4 p-2 rounded text-xs font-mono bg-gray-800/50 text-gray-400">
                            {networkTest}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-xs text-[var(--text-color)]/60"
                                    style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    maxLength={100}
                                    placeholder="John Doe"
                                    className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300"
                                    style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-xs text-[var(--text-color)]/60"
                                    style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    maxLength={200}
                                    placeholder="john@example.com"
                                    className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300"
                                    style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="subject"
                                className="text-xs text-[var(--text-color)]/60"
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                maxLength={200}
                                placeholder="Project Collaboration"
                                className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300"
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="message"
                                className="text-xs text-[var(--text-color)]/60"
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                maxLength={5000}
                                placeholder="Tell me about your project or idea..."
                                className="w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300 resize-none"
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting || !isOnline}
                            className="w-full px-6 py-3 rounded-xl border border-[var(--secondary-color)]/60 bg-[var(--secondary-color)]/10 hover:bg-[var(--secondary-color)]/20 text-[var(--secondary-color)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </Button>
                    </form>
                </div>
            </section>
        </>
    );
}