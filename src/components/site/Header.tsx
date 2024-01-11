import { Event } from "@/types/Event"

type Props = {
    item: Event
}

export const Header = ({item}: Props) => {
    return (
        <header>
                <h2 className="text-yellow-400 font-semibold text-2xl">
                    Amigo Secreto
                </h2>
                <h1 className="text-3xl mt-5 mb-2 font-bold">
                    {item.title}
                </h1>
                <p>
                    {item.description}
                </p>
        </header>
    )
}