'use client'

import { Event } from "@/types/Event"
import { useState } from "react"
import { EventTabInfo } from "./EventTabInfo"
import { EventTabGroup } from "../groups/EventTabGroup"
import { EventTabPerson } from "../people/EventTabPerson"

type Props = {
    refreshAction: () => void,
    event: Event | undefined
}
type Tabs = 'info' | 'groups' | 'people';

export const EditEvent = ({refreshAction, event}: Props) => {
    if (!event) return;

    const [tab, setTab] = useState<Tabs>('info');

    return (
        <div className="">
            <div className="flex text-center border-b border-gray-500 cursor-pointer">
                <div 
                    className={`flex-1 p-2 transition-colors ease-in  active:bg-gray-600
                    ${tab === 'info' ? 'bg-gray-500' : 'hover:bg-gray-700'}`}
                    onClick={() => setTab('info')}
                >
                    Informações
                </div>
                <div 
                    className={`flex-1 p-2 transition-colors ease-in active:bg-gray-600
                    ${tab === 'groups' ? 'bg-gray-500' : 'hover:bg-gray-700'}`}
                    onClick={() => setTab('groups')}
                >
                    Grupos
                </div>
                <div 
                    className={`flex-1 p-2 transition-colors ease-in active:bg-gray-600
                    ${tab === 'people' ? 'bg-gray-500' : 'hover:bg-gray-700'}`}
                    onClick={() => setTab('people')}
                >
                    Pessoas
                </div>
            </div>
            <div className="">
                {tab === 'info' && <EventTabInfo refreshAction={refreshAction} event={event}/>}
                {tab === 'groups' && <EventTabGroup eventId={event.id}/>}
                {tab === 'people' && <EventTabPerson eventId={event.id}/>}
            </div>
        </div>
    )
}