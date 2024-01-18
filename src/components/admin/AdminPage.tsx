'use client'

import * as api from "@/api/admin";
import { Event } from "@/types/Event"
import { useEffect, useState } from "react"
import { EventItem, EventItemNotFound, EventItemPlaceholder } from "./events/EventItem";
import { ItemButton } from "./ItemButton";
import { FaPlus } from "react-icons/fa";
import { ModalScreens } from "@/types/ModalScreens";
import { Modal } from "./Modal";
import { AddEvent } from "./events/AddEvent";
import { EditEvent } from "./events/EditEvent";


export const AdminPage = () => {
    const [eventsToShow, setEventsToShow] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalScreen, setModalSreen] = useState<ModalScreens>(null);
    const [selectedEvent, setSelectedEvent] = useState<Event>()

    const loadEvents = async () => {
        setModalSreen(null)
        setLoading(true)
        const eventList = await api.getEvents()
        setLoading(false);
        setEventsToShow(eventList)
    };
    useEffect (() => {
        loadEvents()
    }, []);

    const editEvent = (event: Event) => {
        setSelectedEvent(event);
        setModalSreen('edit');
    };

    return (
        <div className="text-start">
            <div className="flex items-center p-3">
                <h1 className="text-2xl flex-1 font-semibold">Eventos</h1>
                <div className="">
                    <ItemButton 
                        IconElement={FaPlus}
                        onClick={() => setModalSreen('add')}
                    />
                </div>
            </div>
            <div className="my-3">
                {loading && 
                    <><EventItemPlaceholder />  <EventItemPlaceholder /></>
                }
                {!loading && eventsToShow.length > 0 &&
                    eventsToShow.map(item => (
                        <EventItem 
                            key={item.id}
                            item={item}
                            openModal={event => editEvent(event)}
                            refreshItem={loadEvents}
                        />
                    ))
                }
                {!loading && eventsToShow.length === 0 && <EventItemNotFound />}
            </div>
            {modalScreen && 
                <Modal onClose={() => setModalSreen(null)}>
                    {modalScreen === 'add' && <AddEvent refreshAction={loadEvents}/>}
                    {modalScreen === 'edit' && <EditEvent event={selectedEvent} refreshAction={loadEvents}/>}
                </Modal>
            }
        </div>
    )
}