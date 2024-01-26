import { PersonComplete } from "@/types/PersonComplete";
import { ErrorItem, getErrorsFromZod } from "@/utils/getErrorsFromZod";
import { useEffect, useState } from "react";
import { z } from "zod";
import { InputField } from "../InputField";
import { DefaultBtn } from "../DefaultBtn";
import * as api from "@/api/admin";

type Props = {
    person: PersonComplete;
    refreshPeople: () => void
}
export const EditPerson = ({person, refreshPeople}: Props) => {
    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [loading, setLoading] = useState(false);
    const [errors, setErros] = useState<ErrorItem[]>([]);
    
    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome.'),
        cpfField: z.string().min(11, 'CPF inválido')
    });

    useEffect (() => {
        setErros([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErros(getErrorsFromZod(data.error));
    }, [nameField, cpfField]);

    const handleSavePerson = async () => {
       if (errors.length > 0) return;

       setLoading(true);
       const res = await api.updatePerson(person.id_event, person.id_group, person.id, 
       { name: nameField, cpf: cpfField });
       setLoading(false);
       
       if (res) { 
        refreshPeople()
       } else return alert('Ocorreu um erro')
    }

    return (
        <div className="">
            <h3 className="text-xl">Editar Dados</h3>
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
            <div className="flex gap-3">
                <DefaultBtn 
                    onClick={handleSavePerson}
                    value={loading ? 'Salvando...' : 'Salvar'}
                    disabled={loading}
                />
                <DefaultBtn 
                    onClick={() => refreshPeople()}
                    value='Cancelar'
                    disabled={loading}
                />
            </div>
        </div>
    )
}