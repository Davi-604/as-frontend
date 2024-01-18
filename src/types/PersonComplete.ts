import { Person } from "./Person";

export type PersonComplete = Person & {
    cpf: string,
    eventId: number,
    groupId: number
}