'use client'

import * as api from "@/api/admin";
import { Group } from "@/types/Group"
import { useEffect, useState } from "react"
import { GroupItem, GroupItemNotFound, GroupItemPlaceholder } from "./GroupItem";
import { AddGroup } from "./AddGroup";
import { EditGroup } from "./EditGroup";

type Props = {
    eventId: number
}
export const EventTabGroup = ({eventId}: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

    const loadGroups = async () => {
      setSelectedGroup(null)  
      setLoading(true);
      const groupList = await api.getGroup(eventId);
      setLoading(false);
      setGroups(groupList); 
    }
    useEffect(() => { loadGroups() }, []);

    const handleEditButton = (group: Group) => {
        setSelectedGroup(group)
    };
    
    return (
        <div className="mt-5">
            <div className="">
                {!selectedGroup && <AddGroup refreshGroups={loadGroups} eventId={eventId} />}
                {selectedGroup && <EditGroup refreshGroups={loadGroups} group={selectedGroup} />}
            </div>
            {loading && 
                <>
                    <GroupItemPlaceholder />
                    <GroupItemPlaceholder />
                </>
            }
            {!loading && groups.length > 0 &&
                groups.map(item => (
                    <GroupItem 
                        key={item.id}
                        onEdit={handleEditButton}
                        group={item}
                        refreshGroup={loadGroups}
                    />
                ))
            }
            {!loading && groups.length === 0 && <GroupItemNotFound />}
        </div>
    )
}