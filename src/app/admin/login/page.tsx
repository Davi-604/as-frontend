'use client'

import * as api from "@/api/admin"
import { DefaultBtn } from "@/components/admin/DefaultBtn"
import { InputField } from "@/components/admin/InputField"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { KeyboardEvent, useState } from "react"

const Page = () => {
    const [passwordInput, setPasswordInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState('');

    const router = useRouter();

    const checkKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code.toLowerCase() === 'enter') {handleSendBtn()}
    }
    const handleSendBtn = async () => {
        if (passwordInput.trim() !== '') {
            setWarning('');

            setLoading(true)
            const token = await api.login(passwordInput)
            setLoading(false);
            
            if (!token) {
                setWarning('Senha inválida')
            } else {
                setCookie('token', token);
                router.push('/admin')
            }
        } else { alert('Campo vazio, digite alguma senha!') }
    }

    return (
        <div className="mt-3">
            <h1 className="text-2xl font-bold mb-5">Qual a sua senha secreta?</h1>
            <div className="mx-auto max-w-lg">
                <InputField 
                    type="password"
                    placeholder="Digite a sua senha"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    onEnter={e => checkKey(e)}
                />
                <DefaultBtn 
                    value={`${loading ? 'Buscando...' : 'Enviar'}`}
                    onClick={handleSendBtn}
                    disabled={loading}
                />
                {warning &&
                    <div className="border-2 border-gray-400 border-dashed p-3 text-lg">
                        {warning}
                    </div>
                }
            </div>
        </div>
    )   
}

export default Page