type Props = {
    onClick: () => void,
    value: string,
    disabled?: boolean
}

export const DefaultBtn = ({onClick, value, disabled}: Props) => {
    return (
        <button
            className="p-3 w-full rounded-md my-3 bg-gray-700 text-white text-center uppercase font-bold
            transition-colors ease-in-out border-b-4 border-r-4 border-white/10 shadow-sm shadow-gray-500
            hover:bg-gray-600 active:border-0 active:bg-gray-700"
            onClick={onClick}
        >
            {value}
        </button>
    )
}