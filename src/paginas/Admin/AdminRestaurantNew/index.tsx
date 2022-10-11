import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

export function AdminRestaurantNew() {
  const [newRestaurant, setNewRestaurant] = useState('')

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: newRestaurant
    })
      .then(response => alert('Cadastrado com sucesso!'))
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