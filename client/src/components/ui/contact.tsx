"use client"

import { useState } from 'react';
import { Button } from '../button';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { CheckCircle, X, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error';
    }>({ show: false, message: '', type: 'success' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ show: true, message, type });
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Check internet connection
        if (!navigator.onLine) {
            showToast('No internet connection. Please check your network.', 'error');
            return;
        }

        setIsSubmitting(true);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);

        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim()
                }),
                signal: controller.signal
            });

            clearTimeout(timeout);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Clear form on success
            setFormData({ name: '', email: '', subject: '', message: '' });
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');

        } catch (error: unknown) {
            clearTimeout(timeout);

            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    showToast('Request timed out. Please try again.', 'error');
                } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    showToast('Unable to connect to server. Please try again later.', 'error');
                } else {
                    showToast(error.message || 'Failed to send message. Please try again.', 'error');
                }
            } else {
                showToast('An unexpected error occurred. Please try again.', 'error');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm">
                    <div
                        className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border backdrop-blur-sm ${
                            toast.type === 'success'
                                ? 'bg-green-500/15 border-green-500/30 text-green-400'
                                : 'bg-red-500/15 border-red-500/30 text-red-400'
                        }`}
                    >
                        <div className="flex-shrink-0 mt-0.5">
                            {toast.type === 'success' ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <X className="w-5 h-5" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <p
                                className="text-xs font-semibold mb-0.5"
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            >
                                {toast.type === 'success' ? 'Sent!' : 'Error'}
                            </p>
                            <p
                                className="text-xs opacity-80 break-words"
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            >
                                {toast.message}
                            </p>
                        </div>

                        <button
                            onClick={() => setToast({ show: false, message: '', type: 'success' })}
                            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity mt-0.5"
                            aria-label="Dismiss notification"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            )}

            <section id="contact" className="flex flex-col justify-center items-center py-24">
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
                                    autoComplete="name"
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
                                    autoComplete="email"
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
                            disabled={isSubmitting}
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