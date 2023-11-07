"use client" // Renderizado do lado do cliente, e não do servidor.
import { useState } from "react" 
import { useEffect } from "react"

export default function Incluir({params}){

    const prodId = params.id == 0 ? '' : params.id

    const [novo, setNovo] = useState({
        titulo: "",
        quantidade: "",
        preco: ""
    })
    
    let metodo = 'post'
    if(prodId) metodo = 'put'

    const handleChange = e => {
        setNovo({...novo, [e.target.name]: e.target.value})
    }

    useEffect(()=>{ //Cuida do ciclo de vida do componente, executa através de um gatilho, que no caso é quando recebe um parâmetro (prodId)
        if(prodId){
            fetch(`http://localhost:5000/produto/${prodId}`)
            .then(resp => resp.json())
            .then(resp=> setNovo(resp))
            .catch(error => console.error(error))
        }
    }, [prodId])
    
    const handleSubmit = e => {
        e.preventDefault()
        fetch(`http://localhost:5000/produto/${prodId}`, {
            method: metodo, 
            headers: {"Content-Type": "application/json"}, // Tipo da informação que está trafegando
            body: JSON.stringify(novo) 
        })
        .then(window.location = '/')
        .catch(error => console.error(error))
    }

    return(
        <main>
            <h1>Formulário de produtos</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="titulo" value={novo.titulo}
                placeholder="Título" onChange={handleChange}/><br/>
                <input type="number" name="quantidade" value={novo.quantidade}
                placeholder="Quantidade" onChange={handleChange}/><br/>
                <input type="number" name="preco" value={novo.preco}
                placeholder="Preço" onChange={handleChange} step={0.01}/><br/>
                <button type="submit">Enviar</button>
            </form>
        </main>
    )
}