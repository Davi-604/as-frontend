import { Event } from "@/types/Event"
import { ItemButton } from "../ItemButton"
import { FaLink, FaRegEdit, FaRegTrashAlt } from "react-icons/fa"
import * as api from "@/api/admin"

type Props = {
    item: Event,
    refreshItem: () => void,
    openModal: (event: Event) => void
}
export const EventItem = ({item, refreshItem, openModal}: Props) => {

    const handleEditBtn = () => openModal(item);

    const handleDeleteBtn = async () => {
        if (confirm('Tem certeza de que quer excluir este item?')) {
            await api.deleteEvent(item.id);
            refreshItem();
        }
    }

    return (
        <div className="flex flex-col items-center p-3 mb-3 rounded-md border border-gray-700 md:flex-row">
            <div className="flex-1 font-semibold text-xl ">{item.title}</div>
            <div className="flex items-center gap-1 mt-3 md:mt-0">
                {item.status &&
                    <div className="border border-dashed border-gray-400 rounded ">
                        <ItemButton
                            IconElement={FaLink}
                            label="Link do evento" 
                            href={`/event/${item.id}`}
                            target="_blank"
                        />
                    </div>
                }
                <ItemButton 
                    IconElement={FaRegEdit}
                    onClick={handleEditBtn}
                    label="Editar"
                />
                <ItemButton 
                    IconElement={FaRegTrashAlt}
                    onClick={handleDeleteBtn}
                    label="Excluir"
                />
            </div>
        </div>
    )
}

export const EventItemPlaceholder = () => {
    return (
        <div className="w-full h-16 border border-gray-700 rounded-md mb-2
        bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
    )
}

export const EventItemNotFound = () => {
    return (
        <div className="text-center text-gray-400 pt-5">
            Não foi econtrado nenhum evento.
        </div>
    )
}