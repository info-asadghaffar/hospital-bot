'use client'

import { useCallback, useState, useRef, useEffect } from "react"
import { useConversation } from "@elevenlabs/react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2Icon, PhoneIcon, PhoneOffIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { Button } from "@/components/ui/button"
import { Orb } from "@/components/ui/orb"
import { ShimmeringText } from "@/components/ui/shimmering-text"
import { useRouter } from "next/navigation"

const DEFAULT_AGENT = {
    agentId: `agent_9601kdr7btebe1aa0vkr9yjf3p6n`,
    name: "Life Saver",
    description: "Tap phone to start voice chat",
}

type AgentState = "disconnected" | "connecting" | "connected" | "disconnecting" | "chat_active" | null

export default function SidebarChatbot() {
    const [agentState, setAgentState] = useState<AgentState>("disconnected")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [messages, setMessages] = useState<{ text: string, sender: 'user' | 'bot' }[]>([
        { text: "Welcome to our website!", sender: 'bot' },
        { text: "What brought you to our website today?", sender: 'bot' }
    ])
    const [showStarterOptions, setShowStarterOptions] = useState(true)
    const [inputValue, setInputValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [sessionId] = useState(() => Math.random().toString(36).substring(2) + Date.now().toString(36))
    const router = useRouter()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const processBotResponse = (text: string) => {
        const MAX_CHUNK_LENGTH = 200;

        if (text.length <= MAX_CHUNK_LENGTH) {
            setMessages(prev => [...prev, { text, sender: 'bot' }])
            return
        }

        // Split by sentence endings (. ! ?)
        const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
        const chunks: string[] = [];
        let currentChunk = "";

        sentences.forEach(sentence => {
            if ((currentChunk + sentence).length > MAX_CHUNK_LENGTH && currentChunk.length > 0) {
                chunks.push(currentChunk.trim());
                currentChunk = sentence;
            } else {
                currentChunk += sentence;
            }
        });
        if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
        }

        // Add chunks to messages
        const newMessages = chunks.map(chunk => ({ text: chunk, sender: 'bot' } as const));
        setMessages(prev => [...prev, ...newMessages]);
    }

    const sendMessageToBot = async (text: string) => {
        setIsLoading(true)
        try {
            const response = await fetch("https://learntastic.app.n8n.cloud/webhook/d0c27b4b-f070-47e8-8101-b472128e6af5/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ chatInput: text, sessionId }),
            })

            if (!response.ok) {
                throw new Error("Failed to send message")
            }

            const data = await response.json()
            let botText = "Sorry, I couldn't understand that."

            if (data.output) {
                botText = data.output
            } else if (data.text) {
                botText = data.text
            } else if (data.message) {
                botText = data.message
            } else if (typeof data === 'string') {
                botText = data
            } else if (Array.isArray(data) && data.length > 0 && data[0].output) {
                botText = data[0].output
            }

            processBotResponse(botText)

        } catch (error) {
            console.error("Chat Error:", error)
            setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: 'bot' }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        const userMessage = inputValue.trim()
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }])
        setInputValue("")
        setShowStarterOptions(false)

        await sendMessageToBot(userMessage)
    }

    const handleOptionClick = (optionText: string) => {
        setMessages(prev => [...prev, { text: optionText, sender: 'user' }])
        setShowStarterOptions(false)
        sendMessageToBot(optionText)
    }

    const conversation = useConversation({
        clientTools: { // <--- Rename 'tools' to 'clientTools'
            urlredirect: async ({ url }: { url: string }) => {
                console.log("Redirecting to:", url);
                router.push(url);
                return "Success"; // Important: return a confirmation string
            },
        },
        onConnect: () => console.log("Connected"),
        onDisconnect: () => console.log("Disconnected"),
        onMessage: (message) => console.log("Message:", message),
        onError: (error) => {
            console.error("Error:", error)
            setAgentState("disconnected")
        },
        onToolInvoked: (tool: any) => console.log("Tool invoked:", tool),
    })

    const startConversation = useCallback(async () => {
        try {
            setErrorMessage(null)
            await navigator.mediaDevices.getUserMedia({ audio: true })
            await conversation.startSession({
                agentId: DEFAULT_AGENT.agentId,
                connectionType: "webrtc",
                onStatusChange: (status) => setAgentState(status.status),
            })
        } catch (error) {
            console.error("Error starting conversation:", error)
            setAgentState("disconnected")
            if (error instanceof DOMException && error.name === "NotAllowedError") {
                setErrorMessage("Please enable microphone permissions in your browser.")
            }
        }
    }, [conversation])

    const handleCall = useCallback(() => {
        if (agentState === "disconnected" || agentState === null || agentState === "chat_active") {
            setAgentState("connecting")
            startConversation()
        } else if (agentState === "connected") {
            conversation.endSession()
            setAgentState("disconnected")
        }
    }, [agentState, conversation, startConversation])

    const isCallActive = agentState === "connected"
    const isTransitioning = agentState === "connecting" || agentState === "disconnecting"

    const getInputVolume = useCallback(() => {
        const rawValue = conversation.getInputVolume?.() ?? 0
        return Math.min(1.0, Math.pow(rawValue, 0.5) * 2.5)
    }, [conversation])

    const getOutputVolume = useCallback(() => {
        const rawValue = conversation.getOutputVolume?.() ?? 0
        return Math.min(1.0, Math.pow(rawValue, 0.5) * 2.5)
    }, [conversation])

    return (
        <>
            {/* Chat Interface Window */}
            <AnimatePresence>
                {agentState === "chat_active" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-5 z-50 w-[380px] h-[600px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100/50 transform-gpu"
                        style={{ boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0,0,0,0.04)" }}
                    >
                        {/* Header */}
                        <div className="px-6 py-5 bg-white/80 backdrop-blur-md border-b border-gray-50 flex items-center justify-between sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                        <img src="/jyson-avatar.png" alt="Jyson" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-gray-900 tracking-tight">Jyson</h3>
                                    {/* <p className="text-[10px] text-gray-500 font-medium">Always here to help</p> */}
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setAgentState("disconnected")} // Close chat
                            >
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </Button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 p-6 bg-gradient-to-b from-gray-50 to-white overflow-y-auto flex flex-col gap-4">
                            {/* Empty state removed since we have initial messages now, but keeping the logic clean if user clears history potentially */}
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-forwards">
                                    <div className="w-16 h-16 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center shadow-inner mb-2 transform rotate-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-gray-400"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-gray-900 text-sm">Welcome Back</h4>
                                        <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                                            Ask me anything about your health or appointments.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                                ? 'bg-black text-white rounded-br-none'
                                                : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                                                }`}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    a: (props) => (
                                                        <a
                                                            {...props}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-500 underline break-all hover:text-blue-600"
                                                        />
                                                    ),
                                                    p: (props) => <p {...props} className="break-words" />
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ))
                            )}

                            {showStarterOptions && (
                                <div className="flex flex-col gap-2 items-end animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {[
                                        "I am looking for a group discount",
                                        "I'm looking for CPR/ First Aid Courses",
                                        "I'm looking for PALS/ACLS Courses",
                                        "I want to chat with your sales team",
                                        "I want to chat with your support team"
                                    ].map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionClick(option)}
                                            className="text-right text-sm text-blue-500 border border-blue-400 rounded-2xl rounded-br-none px-4 py-2 hover:bg-blue-50 transition-colors bg-white max-w-[85%]"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-50">
                            <form
                                className="relative flex items-center"
                                onSubmit={handleSendMessage}
                            >
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full pl-5 pr-12 py-3.5 bg-gray-50 text-sm text-gray-900 placeholder:text-gray-400 rounded-full border-0 focus:ring-1 focus:ring-black/5 focus:bg-white transition-all shadow-sm hover:shadow-md hover:bg-white disabled:opacity-50"
                                    placeholder="Type your message..."
                                    disabled={isLoading}
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={isLoading || !inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black text-white hover:bg-gray-800 shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                </Button>
                            </form>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-7 right-5 z-50 flex items-center gap-2 bg-white p-2 rounded-xl shadow-lg border border-gray-100">

                {/* Voice Orb - only show when voice calls are active/connecting */}
                {(agentState === "connected" || agentState === "connecting") && (
                    <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
                        <Orb
                            className="w-full h-full"
                            volumeMode="manual"
                            getInputVolume={getInputVolume}
                            getOutputVolume={getOutputVolume}
                        />
                    </div>
                )}


                {/* Agent Name or Status Text */}
                {(agentState === "connected" || agentState === "connecting") && (
                    <span className="font-semibold text-sm text-black mr-2 hidden sm:block">
                        {agentState === "connecting" ? "Connecting..." : "On Call"}
                    </span>
                )}


                {/* Toggle Buttons Container */}
                <div className="flex items-center gap-1">
                    {/* Text Chat Button */}
                    <Button
                        onClick={() => setAgentState(prev => prev === "chat_active" ? "disconnected" : "chat_active")}
                        disabled={agentState === "connecting" || agentState === 'connected'}
                        variant={agentState === "chat_active" ? "secondary" : "default"}
                        size="icon"
                        className={`h-10 w-10 rounded-full transition-all ${agentState === "chat_active" ? "bg-gray-200 text-black hover:bg-gray-300" : "bg-black text-white hover:bg-gray-800"}`}
                        title="Message"
                    >
                        <AnimatePresence mode="wait">
                            {agentState === "chat_active" ? (
                                <motion.div
                                    key="close"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="message"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>

                    <div className="w-px h-6 bg-gray-200 mx-1"></div>

                    {/* Voice Call Button */}
                    <Button
                        onClick={handleCall}
                        disabled={isTransitioning || agentState === "chat_active"}
                        size="icon"
                        variant={isCallActive ? "destructive" : "default"} // Red for hangup
                        className={`h-10 w-10 rounded-full transition-all ${isCallActive ? "bg-red-500 hover:bg-red-600 text-white" : "bg-black hover:bg-gray-800 text-white"}`}
                        title="Voice Call"
                    >
                        <AnimatePresence mode="wait">
                            {isTransitioning ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, rotate: 0 }}
                                    animate={{ opacity: 1, rotate: 360 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                                    }}
                                >
                                    <Loader2Icon className="h-4 w-4" />
                                </motion.div>
                            ) : isCallActive ? (
                                <motion.div
                                    key="end"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <PhoneOffIcon className="h-4 w-4" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="start"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                >
                                    <PhoneIcon className="h-4 w-4" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>
                </div>
            </div>
            {/* Status / Error */}
            <AnimatePresence mode="wait">
                {errorMessage ? (
                    <motion.p
                        key="error"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-red-500 text-xs text-center"
                    >
                        {errorMessage}
                    </motion.p>
                ) : (
                    <motion.p
                        key="status"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="text-gray-600 text-xs text-center"
                    >
                    </motion.p>
                )}
            </AnimatePresence>
        </>
    )
}
