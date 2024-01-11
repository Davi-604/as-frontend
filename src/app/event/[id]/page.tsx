import * as api from "@/api/site";
import { Header } from "@/components/site/Header";
import { Search } from "@/components/site/Search";
import { redirect } from "next/navigation";

type Props = {params: { id: string }}
const Page = async ({params}: Props) => {
    const eventItem = await api.getEvent(parseInt(params.id));
    if(!eventItem || !eventItem.status) return redirect('/');

    return (
        <main className="text-center mx-auto max-w-lg p-5">
            <Header item={eventItem}/>
            
            <Search id={eventItem.id}/> 

            <footer className="text-sm mt-5 text-center">
                Criado por Davi <br/>
                - baseado na B7web
            </footer>
        </main>
    )
};

export default Page