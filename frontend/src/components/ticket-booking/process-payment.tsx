import { useState, useEffect } from 'react';
import { CircleCheck, CircleX, CreditCard, User } from 'lucide-react';

export default function PaymentProcessingAnimation() {
    const [stage, setStage] = useState('processing');
    const [progress, setProgress] = useState(0);
    const [showProfileButton, setShowProfileButton] = useState(false);
    const [outcome, setOutcome] = useState(null);

    const startProcessing = () => {
        setStage('processing');
        setProgress(0);
        setOutcome(null);
        setShowProfileButton(false);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setOutcome('success'); // Always successful
                    setStage('completed');
                    setTimeout(() => setShowProfileButton(true), 2000);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
    };

    const statusMessages = {
        idle: 'Ready to process your payment',
        processing: [
            'Connecting to payment provider...',
            'Verifying card details...',
            'Processing transaction...',
            'Securing your payment...',
            'Almost there...'
        ],
        completed: 'Payment processed successfully!'
    };

    const getMessage = () => {
        if (stage !== 'processing') return statusMessages[stage];
        const index = Math.min(
            Math.floor(progress / 20),
            statusMessages.processing.length - 1
        );
        return statusMessages.processing[index];
    };

    // Card animation setup
    const [cardPosition, setCardPosition] = useState(0);

    useEffect(() => {
        // Start processing immediately when component mounts
        startProcessing();
    }, []);

    useEffect(() => {
        if (stage === 'processing') {
            const cardInterval = setInterval(() => {
                setCardPosition(prev => (prev + 1) % 20);
            }, 150);

            return () => clearInterval(cardInterval);
        }
    }, [stage]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-[100vh] p-6 bg-gray-100 rounded-lg shadow-lg">
            <div className="w-full max-w-md">
                {/* Main animation container */}
                <div className="bg-white p-8 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                        {stage === 'idle' ? 'Payment Details' : 'Processing Payment'}
                    </h2>

                    {/* Progress visualization */}
                    <div className="relative h-24 mb-8">
                        {stage === 'idle' && (
                            <div className="flex justify-center items-center h-full">
                                <CreditCard size={64} className="text-blue-500" />
                            </div>
                        )}

                        {stage === 'processing' && (
                            <div className="relative h-full flex items-center justify-center overflow-hidden">
                                {/* Animated payment path */}
                                <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                                <div
                                    className="absolute h-2 bg-blue-500 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%`, left: 0 }}
                                ></div>

                                {/* Card animation */}
                                <div
                                    className="absolute transition-all duration-150 ease-in-out"
                                    style={{
                                        left: `${cardPosition * 5}%`,
                                        transform: `translateX(-50%) rotate(${Math.sin(cardPosition / 3) * 15}deg)`
                                    }}
                                >
                                    <CreditCard size={48} className="text-blue-600" />
                                </div>

                                {/* Particle effects */}
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute bg-blue-400 rounded-full opacity-80"
                                        style={{
                                            width: `${6 + Math.random() * 8}px`,
                                            height: `${6 + Math.random() * 8}px`,
                                            top: `${30 + Math.sin(cardPosition/2 + i) * 20}%`,
                                            left: `${cardPosition * 5 + (Math.random() * 20 - 10)}%`,
                                            opacity: Math.random() * 0.7 + 0.3,
                                            transform: 'translateX(-50%)',
                                        }}
                                    />
                                ))}

                                {/* Digital pulse effect */}
                                {progress > 10 && (
                                    <div className="absolute w-full flex justify-around">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-12 bg-blue-500 opacity-30 rounded-full"
                                                style={{
                                                    width: '2px',
                                                    opacity: Math.sin((progress/10) + i) > 0.7 ? 0.6 : 0.1,
                                                    height: `${10 + Math.sin((progress/10) + i) * 20}px`,
                                                    transform: 'translateY(-50%)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {stage === 'completed' && (
                            <div className="flex justify-center items-center h-full">
                                <div className="text-green-500 flex flex-col items-center">
                                    <CircleCheck size={64} className="animate-bounce" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Status message */}
                    <div className="text-center mb-6">
                        <p className={`text-lg font-medium ${
                            stage === 'completed' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                            {getMessage()}
                        </p>

                        {stage === 'processing' && (
                            <p className="text-sm text-gray-500 mt-2">
                                {progress}% complete
                            </p>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center">


                        {showProfileButton && (
                            <button
                                onClick={() => {window.location.href = '/profile';}}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors flex items-center"
                            >
                                Go to Profile <User className="ml-2" size={18} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Payment information */}
                {stage === 'completed' && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-center mb-4">
                            <CreditCard className="text-gray-500 mr-2" size={20} />
                            <span className="text-gray-700">Payment successful with card ending in **** 4242</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Transaction ID: #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}