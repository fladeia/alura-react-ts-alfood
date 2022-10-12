import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export function AdminRestaurantNew() {
  const [newRestaurant, setNewRestaurant] = useState('')
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      http.get<IRestaurante>(`restaurantes/${params.id}/`)
        .then(response => setNewRestaurant(response.data.nome))
    }
  }, [params])

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (params.id) {
      http.put(`restaurantes/${params.id}/`, {
        nome: newRestaurant
      })
        .then(response => alert('Atualizado com sucesso!'))
        .catch(err => console.log(err))
    } else {
      http.post('restaurantes/', {
        nome: newRestaurant
      })
        .then(response => alert('Cadastrado com sucesso!'))
        .catch(err => console.log(err))
    }

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component='h1' variant='h6' >Formulário de Restaurantes</Typography>
      <Box component='form' onSubmit={submitForm}>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={newRestaurant}
          onChange={event => setNewRestaurant(event.target.value)}
          fullWidth
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 1 }}
          fullWidth
        >
          Enviar
        </Button>
      </Box>
    </Box>
  )
}