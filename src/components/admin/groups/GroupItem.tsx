import { Group } from "@/types/Group";
import { ItemButton } from "../ItemButton";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import * as api from "@/api/admin";

type Props = {
    refreshGroup: () => void;
    group: Group,
    onEdit: (group: Group) => void
}
export const GroupItem = ({refreshGroup, group, onEdit}: Props) => {

    const handleDeleteBtn = async () => {
        if (confirm('Tem certeza de que quer deletar esse grupo?')) {
            await api.deleteGroup(group.id_event, group.id);
            refreshGroup();
        }
    };

    return (
        <div className="mb-3 p-3 bg-gray-900 border border-gray-700 rounded-md flex items-center">
            <p className="flex-1">{group.name}</p>
            <ItemButton 
                IconElement={FaRegEdit}
                onClick={() => onEdit(group)}
            />
            <ItemButton 
                IconElement={FaRegTrashAlt}
                onClick={handleDeleteBtn}
            />
        </div>
    )
}

export const GroupItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded-md mb-2
        bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
    )
}

export const GroupItemNotFound = () => {
    return (
        <div className="text-center text-gray-400 pt-5">
            Não foi econtrado nenhum grupo neste evento.
        </div>
    )
}