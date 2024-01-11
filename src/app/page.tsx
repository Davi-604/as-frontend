'use client'

import { ChoiceEvent } from "@/components/site/ChoiceEvent"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter();

    const handleRedirect = (id: string) => {
      if (id.trim() === '') return alert('Campo vazio, digite algum código!');

      router.push(`/event/${id}`)
    }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold">
        HOME - Amigo Secreto
      </h1>
      <ChoiceEvent
        onClick={handleRedirect}
      />
    </div>
  )
}

export default Page