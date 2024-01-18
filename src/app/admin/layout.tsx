import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
    title: 'Amigo secretro - Admin',
}

const Layout = ({children}: {children: ReactNode}) => {
    
    return (
        <div>
            <header className="bg-gray-900 py-5 text-center">
                <h1 className="text-4xl text-yellow-400 font-bold">Amigo Secreto</h1>
                <h2 className="text-base mt-1 text-gray-300">Painel de controle</h2>
            </header>
            <main className="max-w-3xl p-3 w-full mx-auto text-center">
                {children}
            </main>
        </div>
    )
}

export default Layout