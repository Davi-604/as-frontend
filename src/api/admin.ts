import { getCookie } from "cookies-next"
import { req } from "./axios"
import { Event } from "@/types/Event"
import { Group } from "@/types/Group";
import { PersonComplete } from "@/types/PersonComplete";

export const login = async (password: string) => {
    try {
        const res = await req.post('/admin/login', {password})
        return res.data.token as string ?? false
    } catch (error) {return false}
};

// EVENTS

export const getEvents = async () => {
    const token = getCookie('token')
    const res = await req.get('/admin/events', {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.events as Event[] ?? [];
};

type AddEventType = {
    title: string,
    description: string
    grouped: boolean,
}
export const addEvent = async (data: AddEventType): Promise<Event | false> => {
    const token = getCookie('token');
    const res = await req.post('/admin/events', data, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.event as Event ?? false;
};

type UpdateEventType = {
    title?: string,
    description?: string,
    grouped?: boolean,
    status?: boolean,
}
export const updateEvent = async (id: number, data: UpdateEventType): Promise<Event | false> => {
    const token = getCookie('token');
    const res = await req.put(`/admin/events/${id}`, data , {
        headers: {'Authorization': `Token ${token}`}  
    })
    return res.data.event as Event ?? false
}

export const deleteEvent = async (id: number) => {
    const token = getCookie('token');
    const res = await req.delete(`/admin/events/${id}`, {
        headers: {'Authorization': `Token ${token}`}
    });
    return !res.data.error;
};

// GROUPS

export const getGroup = async (eventId: number) => {
    const token = getCookie('token');
    const res = await req.get(`/admin/events/${eventId}/groups`, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.groups as Group[] ?? []
};

type addGroupType = {
    name: string,
}
export const addGroup = async (eventId: number, data: addGroupType): Promise<Group | false> => {
    const token = getCookie('token');
    const res = await req.post(`/admin/events/${eventId}/groups`, data, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.group as Group ?? false
};

type updateGroupType = {
    name: string,
}
export const updateGroup = async (eventId: number, id: number, data: updateGroupType): Promise<Group | false> => {
    const token = getCookie('token');
    const res = await req.put(`/admin/events/${eventId}/groups/${id}`, data, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.group as Group ?? false
};

export const deleteGroup = async (eventId: number, id: number) => {
    const token = getCookie('token');
    const res = await req.delete(`/admin/events/${eventId}/groups/${id}`, {
        headers: {'Authorization': `Token ${token}`}
    });
    return !res.data.error
}

// PEOPLE

export const getPeople = async (eventId: number, groupId: number) => {
    const token = getCookie('token');
    const res = await req.get(`/admin/events/${eventId}/groups/${groupId}/people`, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.people as PersonComplete[] ?? []
};

type AddPersonData = {
    cpf: string,
    name: string,
}
export const addPerson = async (eventId: number, groupId: number, data: AddPersonData): Promise<PersonComplete | false> => {
    const token = getCookie('token');
    const res = await req.post(`/admin/events/${eventId}/groups/${groupId}/people`, data, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.person as PersonComplete ?? false
};

type UpdatePersonData = {
    cpf?: string,
    name?: string,
}
export const updatePerson = async (eventId: number, groupId: number, id: number, data: UpdatePersonData): Promise<PersonComplete | false> => {
    const token = getCookie('token');
    const res = await req.put(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, data, {
        headers: {'Authorization': `Token ${token}`}
    });
    return res.data.person as PersonComplete ?? false
};

export const deletePerson = async (eventId: number, groupId: number, id: number) => {
    const token = getCookie('token');
    const res = await req.delete(`/admin/events/${eventId}/groups/${groupId}/people/${id}`, {
        headers: {'Authorization': `Token ${token}`}
    });
    return !res.data.error
};