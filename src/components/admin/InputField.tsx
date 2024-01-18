import { ChangeEvent, KeyboardEvent } from "react"

type Props = {
    type?: 'text' | 'password'
    disabled?: boolean,
    errorMessage?: string,
    onEnter?: (event: KeyboardEvent<HTMLInputElement>) => void,
    placeholder?: string, 
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const InputField = ({type, value, disabled, errorMessage, onChange, placeholder, onEnter}: Props) => {
    return (
        <div className="w-full my-3">
            <input 
                type={type || 'text'}
                placeholder={placeholder}
                onChange={onChange}
                onKeyUp={onEnter}
                value={value}
                disabled={disabled}
                className={`p-3 w-full block rounded-md bg-gray-800 text-white outline-none
                border-b-2 ${errorMessage ? 'border-red-600' : 'border-gray-600'}
                transition-colors ease-linear focus:border-white`}
            />
            {errorMessage && 
                <div className="text-right text-sm text-red-600">{errorMessage}</div>
            }
        </div>
    )
}