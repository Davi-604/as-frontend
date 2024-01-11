'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

export const ChoiceEvent = () => {
    const [codeInput, setCodeInput] = useState('');
    const router = useRouter()

    const searchEvent = async () => {
        if (codeInput.trim() === '') return alert('Campo vazio, digite algum código!');

        router.push(`/event/${codeInput}`)
    };
    const keyUpSearchEvent = (e: KeyboardEvent) => {
        if (e.code.toLowerCase() === 'enter') {
            if (codeInput.trim() === '') return alert('Campo vazio, digite algum código!');

            router.push(`/event/${codeInput}`)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-10">
            <input
                type="text" 
                className="px-4 py-4 w-full border-2 border-gray-700  bg-gray-900  text-white placeholder:text-white
                placeholder:text-xl lg:placeholder:text-3xl  rounded-md outline-none text-center text-3xl transition-colors ease-linear focus:border-yellow-400"
                placeholder="Digite o código do evento"
                inputMode="numeric"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                onKeyUp={e => keyUpSearchEvent(e)}
            />
            <p className="mt-2 text-gray-400 text-sm">(Digite '1' para conseguir continuar)</p>
            <button
                className="w-full py-3 border-b-4 border-r-4 mt-5 border-blue-600 bg-blue-800 text-white text-4xl rounded-md 
                active:border-0"
                onClick={searchEvent}
            >
                Enviar
            </button>
        </div>
    )
}