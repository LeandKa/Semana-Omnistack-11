import React, { useEffect, useState } from 'react'
import './style.css'
import { Link ,useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

export default function Profile() {

    const [incidents, setIncidents] = useState([])
    const history = useHistory();


    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            console.log(response.data)
            setIncidents(response.data)
        })
    }, [ongId])


    async function handleDeleteIncident(id){
      try {
          await api.delete(`incidents/${id}`,{
              headers:{
                  Authorization:ongId
              }
          });

          setIncidents(incidents.filter(incidents=> incidents.id !== id ));

      } catch (error) {
          alert('Erro ao deletar caso,tente novamente')
      }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"></img>
                <span>Bem vinda,{ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo Caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"></FiPower>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    incidents.map(incidents => (
                        <li key={incidents.id}>
                            <strong>Caso:</strong>
                            <p>{incidents.title}</p>
                            <strong>Descrição</strong>
                            <p>{incidents.description}</p>

                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incidents.value)}</p>

                            <button onClick={()=>handleDeleteIncident(incidents.id)} type="button">
                                <FiTrash2 size={20} color="a8a8b3"></FiTrash2>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}