import React,{useState} from 'react'
import './style.css'
import { Link,useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

export default function NewIncident() {

    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('');
    const[value,setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents',data,{
                headers:{
                    Authorization:ongId
                }
            })

            history.push('/profile');
            
        } catch (error) {
            alert('Erro ao cadastrar tente novamente')
        }
    }


    return (
        <div className="new-incident-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"></img>

                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
                         Voltar para home
                     </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input onChange={e=>setTitle(e.target.value)}value={title} placeholder="Nome do Caso"></input>
                    <textarea onChange={e=>setDescription(e.target.value)}value={description} placeholder="Descrição"></textarea>
                    <input onChange={e=>setValue(e.target.value)}value={value} placeholder="Valor em reais"></input>

                  <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

