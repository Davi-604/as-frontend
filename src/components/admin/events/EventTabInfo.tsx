import { Event } from "@/types/Event"
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod"
import { useEffect, useState } from "react"
import { InputField } from "../InputField"
import { DefaultBtn } from "../DefaultBtn"
import { z } from "zod"
import * as api from "@/api/admin"

type Props = {
    refreshAction: () => void,
    event: Event
}

export const EventTabInfo = ({event, refreshAction}: Props) => {
    const [titleField, setTitleField] = useState(event.title);
    const [descField, setDescField] = useState(event.description);
    const [groupedField, setGroupedField] = useState(event.grouped);
    const [statusField, setStatusField] = useState(event.status);
    const [erros, setErros] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const eventSchema = z.object({
        titleField: z.string().min(1, 'Preencha o campo de título'),
        descField: z.string().min(1, 'Preencha o campo de descrição'),
        groupedField: z.boolean(),
        statusField: z.boolean(),
    });

    useEffect (() => {
        setErros([])
        const data = eventSchema.safeParse({titleField, descField, groupedField, statusField});
        if (!data.success) setErros(getErrorsFromZod(data.error));
    }, [titleField, descField, groupedField, statusField])

    const handleSaveBtn = async () => {
        if (erros.length > 0) return;

        setLoading(true)
        const updateEvent = await api.updateEvent(event.id, {
            title: titleField,
            desc: descField,
            grouped: groupedField,
            status: statusField
        });
        setLoading(false)

        if (updateEvent) {
            refreshAction()
        } else {
            alert('Não foi possível sortear com esses grupos/pessoas')
        };
    };

    return (
        <div className="mt-5">
            <div className="mb-5">
                <p>Título</p>
                <InputField 
                    onChange={e => setTitleField(e.target.value)}
                    value={titleField}
                    placeholder="Digite o título do evento"
                    disabled={loading}
                    errorMessage={erros.find(item => item.field === 'titleField')?.message}
                />
            </div>
            <div className="mb-5">
                <p>Descrição</p>
                <InputField 
                    onChange={e => setDescField(e.target.value)}
                    value={descField}
                    placeholder="Digite o descrição do evento"
                    disabled={loading}
                    errorMessage={erros.find(item => item.field === 'descField')?.message}
                />
            </div>
            <div className="flex mb-5">
                <label className="flex-1">Agrupar sorteio?</label>
                <input 
                    type="checkbox"
                    checked={groupedField}
                    onChange={() => setGroupedField(!groupedField)}
                    className="w-5 h-5 mt-5 block"
                />
            </div>
            <div className="flex mb-5">
                <label className="flex-1">Liberar sorteio?</label>
                <input 
                    type="checkbox"
                    checked={statusField}
                    onChange={() => setStatusField(!statusField)}
                    className="w-5 h-5 mt-5 block"
                />
            </div>
            <div>
                <DefaultBtn 
                    onClick={handleSaveBtn}
                    value={loading ? 'Salvando...' : 'Salvar'}
                    disabled={loading}
                />
            </div>
        </div>
    )
}