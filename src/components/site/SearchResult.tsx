import { SearchResult } from "@/types/SearchResult"

type Props = {
    results: SearchResult,
}

export const SearchReveal = ({results}: Props) => {
    return (
        <div className="">
            <h1 className="text-3xl font-semibold">
                Parabéns<br />
                {results.person.name}
            </h1>
            <p className="mt-5 mb-2 font-bold text-yellow-400">Você tirou:</p>
            <div className="p-5 border-2 border-gray-600 border-dashed bg-gray-950 rounded-md">
                <p className="text-3xl font-semibold">
                    {results.personMatched.name}, <br/>
                    como o seu amigo secreto
                </p>
            </div>
        </div>
    )
}