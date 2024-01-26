import { Group } from "@/types/Group"
import { InputField } from "../InputField"
import { useEffect, useState } from "react";
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import { z } from "zod";
import { DefaultBtn } from "../DefaultBtn";
import * as api from "@/api/admin";

type Props = {
    refreshGroups: () => void,
    group: Group,
}

export const EditGroup = ({refreshGroups, group}: Props) => {
    const [nameField, setNameField] = useState(group.name);
    const [loading, setLoading] = useState(false);
    const [errors, setErros] = useState<ErrorItem[]>([]);

    const groupSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome do grupo.')
    });

    useEffect (() => {
        setErros([]);
        const data = groupSchema.safeParse({nameField});
        if (!data.success) return setErros(getErrorsFromZod(data.error))
    }, [nameField]);

    const handleUpdateBtn = async () => {
        if (errors.length > 0) return;

        setLoading(true);
        const updateGroup = await api.updateGroup(group.id_event, group.id, { name: nameField })
        setLoading(false);

        if (updateGroup) {
            refreshGroups();
        } else {
            alert('Ocorreu um erro')
        }
    }

    return (
        <div className="p-3 my-3 border border-dashed rounded-md border-gray-400">
            <p className="text-lg">Adicionar um grupo:</p>
            <InputField 
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                disabled={loading}
            />
            <div className="flex gap-3">    
                <DefaultBtn 
                    onClick={handleUpdateBtn}
                    value={loading ? 'Salvando...' : 'Salvar'}
                />
                <DefaultBtn 
                    onClick={() => refreshGroups()}
                    value='Cancelar'
                />
            </div>
        </div>
    )
}