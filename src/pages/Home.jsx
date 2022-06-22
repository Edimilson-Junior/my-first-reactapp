import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    fetch('https://api.github.com/users/Edimilson-Junior')
    .then((response) => response.json() )
    .then(data => 
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    )
  }, [])

  return (
    <div className="container">
      <header>
        <h1>Lista de Alunos</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Digite um nome..."
        onChange={e => setStudentName(e.target.value)}
      />

      <button type="submit" onClick={handleAddStudent}>
        Adicionar
      </button>

      {
        students.map((student, id) => (
          <Card 
            key={"student" + id}
            name={student.name}
            time={student.time}
          />
        ))
      }
    </div>
  )
}

export default Home
