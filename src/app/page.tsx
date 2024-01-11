import { ChoiceEvent } from "@/components/site/ChoiceEvent"

const Page = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl text-center font-semibold">
        HOME - Amigo Secreto
      </h1>
      <ChoiceEvent />
    </div>
  )
}

export default Page