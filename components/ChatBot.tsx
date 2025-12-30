'use client'

import { useCallback, useState } from "react"
import { useConversation } from "@elevenlabs/react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2Icon, PhoneIcon, PhoneOffIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Orb } from "@/components/ui/orb"
import { ShimmeringText } from "@/components/ui/shimmering-text"
import { useRouter } from "next/navigation"

const DEFAULT_AGENT = {
    agentId: `agent_9601kdr7btebe1aa0vkr9yjf3p6n`,
    name: "Life Saver",
    description: "Tap phone to start voice chat",
}

type AgentState = "disconnected" | "connecting" | "connected" | "disconnecting" | null

export default function SidebarChatbot() {
    const [agentState, setAgentState] = useState<AgentState>("disconnected")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const router = useRouter()

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
        if (agentState === "disconnected" || agentState === null) {
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
            <div className="fixed bottom-7 right-5 z-50 flex items-center gap-4 bg-white p-2 rounded-xl shadow-lg :">

                {/* Orb */}
                <div className="w-10 h-10 bg-gray-200 rounded-full">
                    <Orb
                        className="w-full h-full"
                        volumeMode="manual"
                        getInputVolume={getInputVolume}
                        getOutputVolume={getOutputVolume}
                    />
                </div>

                {/* Agent Name */}
                <span className="font-semibold text-sm text-black">{DEFAULT_AGENT.name}</span>

                {/* Call Button */}
                <Button
                    onClick={handleCall}
                    disabled={isTransitioning}
                    size="icon"
                    variant={isCallActive ? "secondary" : "default"}
                    className="h-12 w-12 rounded-full bg-black"
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
                                <Loader2Icon className="h-5 w-5" />
                            </motion.div>
                        ) : isCallActive ? (
                            <motion.div
                                key="end"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <PhoneOffIcon className="h-5 w-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="start"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                            >
                                <PhoneIcon className="h-5 w-5 text-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
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
