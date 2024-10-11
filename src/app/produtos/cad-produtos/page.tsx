'use client'

import { useRouter } from "next/navigation"
import Produto from "../produto/[id]/page"
import { useState } from "react"
import { TipoProduto } from "@/types"
import Produtos from "../page"
import { headers } from "next/headers"
import { error } from "console"

export default function CadastroProdutos(){

 const navigate = useRouter()
  const [produto, setProduto]  = useState<TipoProduto>({
    id:0,
    nome:"",
    preco: 0,
    estoque: 0,
  }) 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    
    setProduto ({...produto,[name]: value})
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    
    const cabecalho={
        method :"POST",
        headers: {'Content-Type' :"application/json" },
        body : JSON.stringify(produto)
            
      

    }

    try{

        const response = await fetch ("http://localhost:3000/api/base-produtos", cabecalho)

        if (response.ok) {
            alert( `${produto.nome} cadastrado com sucesso!`)
            setProduto({id:0, nome: "", preco:0,  estoque:0})
            navigate.push('/produtos')
        }else{
            alert("Erro para se cadastrar ")
        }
    }catch(error){
        console.error("Erro ao cadastrar produto", error)

    }

  }


    return(
        <main>
            <h1>Cadastro Produtos</h1>

            <p>Aqui iserimos um novo produto assim que chega na loja.</p>


            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="idnome">Nome</label>
                    <input onChange={handleChange} type="text" name="nome" value={produto.nome} id="nome"  />
                </div>

                <div>
                        <label htmlFor="idpreco">Preco</label>
                        <input onChange={handleChange} step={'0.01'} type="text" name="preco" value={produto.preco} id="idpreco" />
                        
                </div>

                <div>

                    <label htmlFor="idestoque">Estoque</label>
                    <input onChange={handleChange} type="number" name="estoque" id="idestoque" value={produto.estoque} />
                </div>
            </form>

            <button  type="submit">Cadastrar Produto</button>
        </main>

        
    )
}