'use client'

import { escapeCpf } from "@/utils/escapeCpf"
import { KeyboardEvent, useState } from "react"

type Props = {
    onSearchBtn: (cpf: string) => void,
    loading: boolean
}

export const SearchForm = ({onSearchBtn, loading}: Props) => {
    const [cpfInput, setCpfInput] = useState('');

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code.toLowerCase() === 'enter') {
            onSearchBtn(cpfInput)
        }
    }

    return (
        <div className="">
            <p className="mb-3 text-xl">Qual o seu CPF?</p>
            <input 
                type="text"
                inputMode="numeric"
                autoFocus
                disabled={loading}
                placeholder="Digite o seu CPF"
                className="px-3 py-3 text-center text-3xl w-full bg-white text-black outline-none rounded-lg disabled:opacity-80"
                value={cpfInput}
                onChange={e => setCpfInput(escapeCpf(e.target.value))}
                onKeyUp={e => handleKeyUp(e)}
            />
            <button
                disabled={loading}
                className="w-full py-3 border-b-4 border-r-4 mt-5 border-blue-600 bg-blue-800 text-white text-4xl rounded-md 
                active:border-0 disabled:opacity-80"
                onClick={() => onSearchBtn(cpfInput)}
            >
                {loading ? 'Buscando...' : 'Enviar'}
            </button>
        </div>
    )
}