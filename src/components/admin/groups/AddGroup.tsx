import { useState } from "react"
import { InputField } from "../InputField"
import { z } from "zod"
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod"
import * as api from "@/api/admin"
import { DefaultBtn } from "../DefaultBtn"

type Props = {
    refreshGroups: () => void,
    eventId: number    
}

export const AddGroup = ({refreshGroups, eventId}: Props) => {
    const [groupName, setGroupName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErros] = useState<ErrorItem[]>([]);

    const groupSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome do grupo.')
    });

    const addGroupBtn = async () => {
        setErros([]);
        const data = groupSchema.safeParse({nameField: groupName});
        if (!data.success) return setErros(getErrorsFromZod(data.error));

        setLoading(true)
        const addGroup = await api.addGroup(eventId, {name: groupName});
        setLoading(false);

        if (addGroup) {
            setGroupName('');
            refreshGroups();
        } else {
            alert('Ocorreu algum erro')
        }
    }   


    return (
        <div className="p-3 my-3 border border-dashed rounded-md border-gray-400">
            <p className="text-lg">Adicionar um grupo:</p>
            <InputField 
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Digite o nome do grupo"
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
            />
            <DefaultBtn 
                onClick={addGroupBtn}
                value={loading ? 'Adiconando...' : 'Adicionar'}
            />
        </div>
    )
}