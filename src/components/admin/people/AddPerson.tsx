import { useState } from "react"
import { InputField } from "../InputField"
import { DefaultBtn } from "../DefaultBtn"
import { z } from "zod"
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod"
import * as api from "@/api/admin"

type Props = {
    eventId: number,
    groupId: number,
    refreshPeople: () => void
}
export const AddPerson = ({eventId, groupId, refreshPeople}: Props) => {
    const [nameField, setNameField] = useState('');
    const [cpfField, setCpfField] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErros] = useState<ErrorItem[]>([]);
    
    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome.'),
        cpfField: z.string().min(11, 'CPF inválido')
    });

    const handleAddPerson = async () => {
        setErros([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErros(getErrorsFromZod(data.error));

        setLoading(true)
        const res = await api.addPerson(eventId, groupId, { name: nameField, cpf: cpfField });
        setLoading(false);

        if (res) {
            setCpfField('');
            setNameField('');
            refreshPeople();
        } else return alert('Ocorreu um erro') 
    };

    return (
        <div className="">
            <h3 className="text-xl">Nova Pessoa</h3>
            <InputField 
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder="Digite o nome da pessoa"
                disabled={loading}
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
            />
            <InputField 
                value={cpfField}
                onChange={e => setCpfField(e.target.value)}
                placeholder="Digite o cpf da pessoa"
                disabled={loading}
                errorMessage={errors.find(item => item.field === 'cpfField')?.message}
            />
            <DefaultBtn 
                onClick={handleAddPerson}
                value={loading ? 'Adicionando...' : 'Adiconar'}
                disabled={loading}
            />
        </div>
    )
}