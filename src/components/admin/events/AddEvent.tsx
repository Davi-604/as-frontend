'use client'

import { useState } from "react"
import { InputField } from "../InputField"
import { DefaultBtn } from "../DefaultBtn"
import * as api from "@/api/admin"
import { z } from "zod"
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod"

type Props = { refreshAction: () => void}
export const AddEvent = ({refreshAction}: Props) => {
    const [titleField, setTitleField] = useState('');
    const [descField, setDescField] = useState('');
    const [groupedField, setGroupedField] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<ErrorItem[]>([])

    const eventSchema = z.object({
        titleField: z.string().min(1, 'Preencha o campo de título.'),
        descField: z.string().min(1, 'Preencha o campo de descrição'),
        groupedField: z.boolean()
    });

    const handleAddBtn = async () => {
        setErrors([])
        const data = eventSchema.safeParse({titleField, descField, groupedField});
        if (!data.success) return setErrors(getErrorsFromZod(data.error));

        setLoading(true)
        const res = await api.addEvent({
            title: titleField,
            desc: descField,
            grouped: groupedField,
        });
        setLoading(false);

        if (res) refreshAction()
        if (!res) return console.log(res)
    }

    return (
        <div className="">
            <div className="mb-5">
                <label>
                    <p>Título</p>
                    <InputField 
                        placeholder="Digite o título do evento"
                        value={titleField}
                        onChange={e => setTitleField(e.target.value)}
                        errorMessage={errors.find(item => item.field === 'titleField')?.message}
                        disabled={loading}
                    />
                </label>
            </div>
            <div className="mb-5">
                <label>
                    <p>Descrição</p>
                    <InputField 
                        placeholder="Digite a descrição do evento"
                        value={descField}
                        onChange={e => setDescField(e.target.value)}
                        errorMessage={errors.find(item => item.field === 'descField')?.message}
                        disabled={loading}
                    />
                </label>
            </div>
            <div className="mb-5">
                <label>Agrupar sorteio?</label>
                <input 
                    type="checkbox"
                    checked={groupedField}
                    onChange={() => setGroupedField(!groupedField)}
                    className="w-5 h-5 block mt-3"
                />
            </div>
            <div className="">
                <DefaultBtn 
                    onClick={handleAddBtn}
                    value={loading ? 'Adicionando...' : 'Adicionar'}
                    disabled={loading}
                />
            </div>
        </div>
    )
}