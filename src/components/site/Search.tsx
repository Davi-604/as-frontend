'use client'

import { SearchResult } from "@/types/SearchResult"
import { useState } from "react"
import { SearchForm } from "./SearchForm"
import * as api from "@/api/site"
import { SearchReveal } from "./SearchResult"

type Props = {
    id: number
}

export const Search = ({id}: Props) => {
    const [results, setResults] = useState<SearchResult>();
    const [loading, setLoading] = useState(false)

    const handleSearchBtn = async (cpf: string) => {
        if (cpf.trim() === '') return alert('Campo vazio, digite alguma coisa!');

        setLoading(true)
        const res = await api.searchCpf(id, cpf);
        setLoading(false)
        if (!res) return alert('Desculpe mas não encontramos o seu CPF');

        setResults(res)
    };

    return (
        <section className="bg-gray-900 p-5 mt-5 rounded-md">
            {!results && <SearchForm 
                onSearchBtn={handleSearchBtn}
                loading={loading}
            />}
            {results && <SearchReveal results={results} />}
        </section>
    )
}