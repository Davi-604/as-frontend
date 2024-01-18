import * as api from "@/api/admin";
import { Group } from "@/types/Group";
import { useEffect, useState } from "react";
import { GroupItemNotFound, GroupItemPlaceholder } from "../groups/GroupItem";
import { PersonComplete } from "@/types/PersonComplete";
import { PeopleItem, PeopleItemNotFound, PeopleItemPlaceholder } from "./PeopleItem";
import { AddPerson } from "./AddPerson";
import { EditPerson } from "./EditPerson";

type Props = {
    eventId: number
}
export const EventTabPerson = ({eventId}: Props) => {
    // Group

    const [groups, setGroups] = useState<Group[]>([]);
    const [groupLoading, setGroupLoading] = useState(true);
    const [selectedGroupId, setSelectedGroupId] = useState(0);

    const loadGroups = async () => {
        setSelectedGroupId(0);
        setGroupLoading(true);
        const groupList = await api.getGroup(eventId);
        setGroupLoading(false);
        setGroups(groupList);
    }
    useEffect(() => { loadGroups() }, []);

    // People

    const [people, setPeople] = useState<PersonComplete[]>([]);
    const [peopleLoading, setPeopleLoading] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null >(null)

    const loadPeople = async () => {
        setPeople([]);
        setSelectedPerson(null);
        setPeopleLoading(true);
        const peopleList = await api.getPeople(eventId, selectedGroupId);
        setPeopleLoading(false);
        setPeople(peopleList)
    };
    useEffect(() => { loadPeople() }, [selectedGroupId])

    return (
        <div>
            <div className="my-5">
                {groupLoading && <GroupItemPlaceholder />}
                {!groupLoading && groups.length > 0 && 
                    <select 
                        onChange={e => setSelectedGroupId(parseInt(e.target.value))}
                        className="w-full bg-gray-900 border-0 text-white text-xl p-3 outline-none"
                    >
                        <option value={0}>Selecione um grupo</option>
                        {groups.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                }
                {!groupLoading && groups.length === 0 && <GroupItemNotFound />}
            </div>
            <div className="p-5 mb-5 border-2 border-dashed border-gray-400 rounded-md">
                {!selectedPerson && 
                    <AddPerson 
                        eventId={eventId}
                        groupId={selectedGroupId}
                        refreshPeople={loadPeople}
                    />
                }
                {selectedPerson &&
                    <EditPerson 
                        person={selectedPerson}
                        refreshPeople={loadPeople}
                    />
                }
            </div>
            <div className="">
                {peopleLoading && 
                    <><PeopleItemPlaceholder />  <PeopleItemPlaceholder /></>
                }
                {!peopleLoading && people.length > 0 &&
                    people.map(item => (
                        <PeopleItem 
                            person={item} 
                            onEdit={person => setSelectedPerson(person)}
                            refreshPeople={loadPeople}
                        />
                    ))
                }
                {!peopleLoading && people.length === 0 && <PeopleItemNotFound />}
            </div>
        </div>
    )
}