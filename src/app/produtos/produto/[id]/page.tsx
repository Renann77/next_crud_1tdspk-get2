"use client"
import { TipoProduto } from "@/types"
import { useEffect, useState } from "react"

export default function Produto({params}:{params:{id:number}}){

    const [produto, setProduto] = useState<TipoProduto>()

    useEffect(()=>{
        const chamadaApi = async ()=>{
            const response = await fetch(`http://localhost:3000/api/base-produtos/${params.id}`)
            const data = await response.json()
            setProduto(data)
            console.log(data);            
        }
        chamadaApi()
    },[])

    return(
        <main className="grow">
            <h2 className="text-3xl text-center text-indigo-600 mb-4">Produto</h2>

            <div className="bg-indigo-300 w-48 p-2 m-auto border border-indigo-950 rounded-md">
                <p className="text-lg funt font-medium mb-1">Id: {produto?.id}</p>
                <p className="text-lg funt font-medium mb-1">Nome: {produto?.nome}</p>
                <p className="text-lg funt font-medium mb-1">Preço: {produto?.preco}</p>
                <p className="text-lg funt font-medium mb-1">Estoque:  {produto?.estoque}</p>
            </div>
        </main>
    )
}