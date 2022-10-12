import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

export function AdminRestaurantNew() {
  const [newRestaurant, setNewRestaurant] = useState('')
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${params.id}/`)
        .then(response => setNewRestaurant(response.data.nome))
    }
  }, [params])

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (params.id) {
      axios.put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
        nome: newRestaurant
      })
        .then(response => alert('Atualizado com sucesso!'))
        .catch(err => console.log(err))
    } else {
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: newRestaurant
      })
        .then(response => alert('Cadastrado com sucesso!'))
        .catch(err => console.log(err))
    }

  }

  return (
    <form onSubmit={submitForm}>
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        value={newRestaurant}
        onChange={event => setNewRestaurant(event.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
      >
        Enviar
      </Button>
    </form>
  )
}