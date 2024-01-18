import { PersonComplete } from "@/types/PersonComplete"
import { ItemButton } from "../ItemButton"
import { FaRegEdit, FaTrashAlt } from "react-icons/fa"
import * as api from "@/api/admin"

type Props = {
    person: PersonComplete;
    onEdit: (person: PersonComplete) => void;
    refreshPeople: () => void
}
export const PeopleItem = ({person, onEdit, refreshPeople}: Props) => {
    const handleDeletePerson = async () => {
        if(confirm('Tem certeza de que quer excluir essa pessoa?')) {
            await api.deletePerson(person.eventId, person.groupId, person.id);
            refreshPeople();
        }   
    }

    return (
        <div className="mt-3 p-3 flex items-center bg-gray-950 border border-gray-700 rounded-md">
            <p className="flex-1 text-lg">
                {person.name}  <span className="text-xs text-gray-300">(CPF: {person.cpf})</span>
            </p>
            <ItemButton 
                IconElement={FaRegEdit}
                onClick={() => onEdit(person)}
            />
            <ItemButton 
                IconElement={FaTrashAlt}
                onClick={handleDeletePerson}
            />
        </div>
    )
}

export const PeopleItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded-md mb-5
        bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
    )
}

export const PeopleItemNotFound = () => {
    return (
        <div className="text-center text-gray-400 pt-5">
            Não foi econtrado nenhuma pessoa neste grupo.
        </div>
    )
}