import React, { useState, useEffect } from 'react';
import './style.css';

import { Card } from '../../components/Card'

export function Home() {
  const [studentname, setStudentName] = useState('');
  const [students, setStudent] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ''});


  function handleAddStudent(){
    const newStudent = {
      name: studentname,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        secund: '2-digit',
      })
    };

    setStudent(prevState => [...prevState, newStudent]);
  }

useEffect(() => {
  async function fetchData() {
    const response = await fetch('https://api.github.com/users/Ivan-Jaskiu')
    const data = await response.json();
    setUser({
      nome: data.name,
      avatar: data.avatar_url
    })
  }

  fetchData();

}, []);





  return (
  <div className="container">
    <header>
      <h1> Listinha</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto pergil" />
      </div>
    </header>
    
    <input type="text" placeholder="digite seu nome"  onChange={e => setStudentName(e.target.value)}/>
    <button type="button" onClick={handleAddStudent}>Adicionar</button>

    {
      students.map(student => <Card key={student.time} name={student.name} time={student.time}/>
      )
    }
  </div>
    )
}

