"use client"

import { useState } from 'react';
import { Button } from '../button';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { CheckCircle, X } from 'lucide-react';

export default function Contact() {
    /**
     * STATE MANAGEMENT
     * These useState hooks manage all the dynamic data in the form
     */

    // Tracks all form input values (controlled components)
    // Each field (name, email, subject, message) is stored in this single object
    const [formData, setFormData] = useState({
        name: '',      // User's full name
        email: '',     // User's email address
        subject: '',   // Message subject/topic
        message: ''    // Main message content
    });

    // Tracks whether the form is currently being submitted
    // Used to show loading state and prevent double submissions
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Controls the toast notification display
    // show: whether toast is visible
    // message: the text to display
    // type: 'success' (green) or 'error' (red) styling
    const [toast, setToast] = useState<{
        show: boolean;
        message: string;
        type: 'success' | 'error';
    }>({ show: false, message: '', type: 'success' });

    /**
     * HANDLECHANGE FUNCTION
     * Purpose: Updates formData state whenever user types in any input field
     * 
     * How it works:
     * 1. Receives the change event from an input/textarea
     * 2. Extracts the field name (e.g., "email") and new value
     * 3. Uses spread operator (...) to keep existing formData values
     * 4. Updates only the specific field that changed using [e.target.name]
     * 
     * Example: If user types in email field:
     * - e.target.name = "email"
     * - e.target.value = "john@example.com"
     * - Result: { name: '...', email: 'john@example.com', ... }
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,                    // Keep all existing values
            [e.target.name]: e.target.value // Update only the changed field
        });
    };

    /**
     * SHOWTOAST FUNCTION
     * Purpose: Displays a temporary notification message to the user
     * 
     * Parameters:
     * - message: The text to show in the toast
     * - type: 'success' or 'error' (determines color and icon)
     * 
     * How it works:
     * 1. Sets toast state to visible with the provided message and type
     * 2. Uses setTimeout to automatically hide the toast after 4 seconds
     * 3. After 4 seconds, resets toast state to hidden/empty
     * 
     * This prevents the toast from staying visible forever
     */
    const showToast = (message: string, type: 'success' | 'error') => {
        // Show the toast with message and type
        setToast({ show: true, message, type });

        // Auto-hide after 4 seconds (4000 milliseconds)
        setTimeout(() => {
            setToast({ show: false, message: '', type: 'success' });
        }, 4000);
    };

    /**
     * HANDLESUBMIT FUNCTION
     * Purpose: Processes form submission (connects frontend to backend)
     * 
     * FRONTEND PROCESS:
     * 1. Prevents default form behavior (page reload)
     * 2. Sets isSubmitting to true (shows loading state, disables button)
     * 3. Simulates API call with a 1.5 second delay (in production, this would be a real API call)
     * 4. On success: clears form fields, shows success toast
     * 5. On error: shows error toast
     * 6. Finally: sets isSubmitting back to false (re-enables button)
     * 
     * BACKEND INTEGRATION (What you need to add):
     * - Replace the setTimeout with an actual fetch/axios call to your API
     * - Example API call would look like:
     *   const response = await fetch('/api/contact', {
     *     method: 'POST',
     *     headers: { 'Content-Type': 'application/json' },
     *     body: JSON.stringify(formData)
     *   });
     * 
     * The backend would typically:
     * 1. Validate the incoming data
     * 2. Store in database or send email notification
     * 3. Return success/error response
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send to backend API
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Clear form on success
            setFormData({ name: '', email: '', subject: '', message: '' });
            showToast('Message sent successfully!', 'success');

        } catch (error) {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <section id="contact" className='flex flex-col justify-center items-center py-24'>
            {/* 
                SECTION HEADER
                Displays the main title of the contact section 
            */}
            <h1
                className="text-3xl mb-6"
                style={{
                    fontFamily: 'var(--Instrument-Serif)',
                    fontStyle: 'italic'
                }}
            >
                Connect with Me
            </h1>

            {/* 
                DESCRIPTION PARAGRAPH
                Brief message encouraging visitors to reach out
                max-w-xl limits width for better readability
                leading-relaxed adds comfortable line spacing
            */}
            <p
                className='text-center text-[var(--text-color)]/70 text-base max-w-xl mb-10 leading-relaxed'
                style={{
                    fontFamily: 'var(--Jetbrains-Mono)'
                }}
            >
                Have a project in mind, opportunity to collaborate, or just want to chat?
                I'm always open to discussing new ideas, innovative solutions, and exciting ventures.
                Drop me a message and let's build something great together.
            </p>

            {/* 
                SOCIAL LINKS SECTION
                Direct links to email, GitHub, and LinkedIn
                target="_blank" opens in new tab
                rel="noopener noreferrer" is a security best practice for external links
            */}
            <div className='flex gap-6 mb-12'>
                {/* Email link - opens default email client */}
                <a
                    href="mailto:jamesbalito@gmail.com"
                    className='flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--secondary-color)] transition-colors duration-300'
                >
                    <HiOutlineMail className="w-5 h-5" />
                    <span style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>Email</span>
                </a>

                {/* GitHub profile link */}
                <a
                    href="https://github.com/james-balito"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--secondary-color)] transition-colors duration-300'
                >
                    <FaGithub className="w-5 h-5" />
                    <span style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>GitHub</span>
                </a>

                {/* LinkedIn profile link */}
                <a
                    href="https://www.linkedin.com/in/jamesbalito/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='flex items-center gap-2 text-sm text-[var(--text-color)]/70 hover:text-[var(--secondary-color)] transition-colors duration-300'
                >
                    <FaLinkedin className="w-5 h-5" />
                    <span style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>LinkedIn</span>
                </a>
            </div>

            {/* 
                FORM CONTAINER
                Wraps the form and any inline elements
                items-start aligns children to the top
                gap-8 adds space between form and toast if side by side
            */}
            <div className='flex items-start gap-8 max-w-2xl'>
                {/* 
                    CONTACT FORM
                    Uses onSubmit event to trigger handleSubmit function
                    space-y-5 adds vertical spacing between form groups
                */}
                <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5">
                    {/* 
                        NAME & EMAIL ROW
                        grid-cols-1: stacks on mobile
                        md:grid-cols-2: side by side on tablets and larger
                        gap-5: spacing between fields
                    */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {/* 
                            FULL NAME FIELD
                            Each input field follows the same pattern:
                            1. Label with htmlFor matching input id (accessibility)
                            2. Input with controlled value from formData state
                            3. onChange triggers handleChange to update state
                            4. required attribute for form validation
                            5. placeholder for user guidance
                        */}
                        <div className='space-y-2'>
                            <label
                                htmlFor="name"
                                className='text-xs text-[var(--text-color)]/60'
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"                    // Matches formData.name key
                                value={formData.name}          // Controlled component value
                                onChange={handleChange}        // Updates state on input
                                required                       // HTML5 validation
                                placeholder='John Doe'
                                className='w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300'
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            />
                        </div>

                        {/* 
                            EMAIL FIELD
                            type="email" provides built-in email validation
                        */}
                        <div className='space-y-2'>
                            <label
                                htmlFor="email"
                                className='text-xs text-[var(--text-color)]/60'
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            >
                                Email
                            </label>
                            <input
                                type="email"                   // HTML5 email validation
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder='john@example.com'
                                className='w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300'
                                style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            />
                        </div>
                    </div>

                    {/* 
                        SUBJECT FIELD
                        Single full-width input for message subject
                    */}
                    <div className='space-y-2'>
                        <label
                            htmlFor="subject"
                            className='text-xs text-[var(--text-color)]/60'
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
                            placeholder='Project Collaboration'
                            className='w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300'
                            style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                        />
                    </div>

                    {/* 
                        MESSAGE FIELD
                        textarea instead of input for multi-line text
                        rows={5} sets initial height
                        resize-none prevents user from resizing (maintains design)
                    */}
                    <div className='space-y-2'>
                        <label
                            htmlFor="message"
                            className='text-xs text-[var(--text-color)]/60'
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
                            rows={5}                       // Shows 5 lines of text initially
                            placeholder='Tell me about your project or idea...'
                            className='w-full bg-transparent border border-[var(--border-color)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 focus:outline-none focus:border-[var(--secondary-color)]/50 transition-colors duration-300 resize-none'
                            style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                        />
                    </div>

                    {/* 
                        TOAST NOTIFICATION
                        Only renders when toast.show is true
                        Displays success (green) or error (red) messages
                        Positioned absolutely relative to the form container
                        
                        toast.type determines:
                        - Background color (green for success, red for error)
                        - Icon displayed (CheckCircle or X)
                        - Text shown ("Success!" or "Error!")
                    */}
                    {toast.show && (
                        <div className="absolute w-70 bottom-20 left-260 right-0 flex justify-center animate-slide-down my-10">
                            <div className={`flex-shrink-0 w-fit flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg border ${toast.type === 'success'
                                    ? 'bg-green-500/10 border-green-500/30 text-green-400'  // Success styling
                                    : 'bg-red-500/10 border-red-500/30 text-red-400'        // Error styling
                                }`}>
                                {/* Show appropriate icon based on toast type */}
                                {toast.type === 'success' ? (
                                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                ) : (
                                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                )}

                                {/* Toast text content */}
                                <div className='flex-1'>
                                    <p className='text-xs font-semibold mb-0.5' style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>
                                        {toast.type === 'success' ? 'Success!' : 'Error!'}
                                    </p>
                                    <p className='text-xs opacity-80' style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>
                                        {toast.message}
                                    </p>
                                </div>

                                {/* Close button - manually hides the toast */}
                                <button
                                    onClick={() => setToast({ show: false, message: '', type: 'success' })}
                                    className='text-current opacity-50 hover:opacity-100 transition-opacity flex-shrink-0'
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 
                        SUBMIT BUTTON
                        type="submit" triggers form's onSubmit handler
                        disabled={isSubmitting} prevents double submission
                        Shows "Sending..." text while submitting
                        Changes opacity when disabled for visual feedback
                    */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}  // Disabled while form is submitting
                        className='w-full px-6 py-3 rounded-xl border border-[var(--secondary-color)]/60 bg-[var(--secondary-color)]/10 hover:bg-[var(--secondary-color)]/20 text-[var(--secondary-color)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                        style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                    >
                        {/* Conditional button text based on submission state */}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                </form>
            </div>
        </section>
    )
}