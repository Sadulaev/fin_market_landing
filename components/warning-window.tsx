import { AlertTriangle, X } from 'lucide-react'
import React from 'react'

type Props = {
    setShowWarning: (open: boolean) => void;
}

const WarningWindow = ({ setShowWarning }: Props) => {
    return (
        <div
            className="fixed bottom-4 right-4 z-[999] p-4 rounded-lg shadow-lg border-l-4 max-w-sm animate-in slide-in-from-right-5 bg-gray-accent"
            style={{
                borderColor: "#10B981",
                border: "1px solid #808080",
            }}
        >
            <div className="flex items-start space-x-3">
                <AlertTriangle className="h-10 w-10 mt-0.5 text-white" />
                <div>
                    <h4 className="font-semibold text-sm text-white">
                        Внимание!
                    </h4>
                    <p className="text-sm mt-1 text-white">
                        Убедитесь что все данные заполнены корректно перед оформлением.
                    </p>
                </div>
                <button onClick={() => setShowWarning(false)} className="text-gray-medium hover:text-white ml-auto cursor-pointer">
                    <X />
                </button>
            </div>
        </div>
    )
}

export default WarningWindow