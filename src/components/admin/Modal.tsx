import { ReactNode } from "react"

type Props = {
    children: ReactNode,
    onClose: () => void
}
export const Modal = ({children, onClose}: Props) => {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/70 flex flex-col items-center overflow-y-auto">
            <div className="max-w-xl w-full my-4">
                <div 
                    onClick={onClose}
                    className="font-semibold text-xl w-9 h-9 flex items-center justify-center bg-gray-700
                    rounded-full cursor-pointer transition-colors ease-in-out hover:bg-gray-800 active:text-yellow-400"
                >
                    X
                </div>
            </div>
            <div className="max-w-xl w-full p-4 bg-gray-900 rounded-md mb-5">
                {children}
            </div>
        </div>
    )
}