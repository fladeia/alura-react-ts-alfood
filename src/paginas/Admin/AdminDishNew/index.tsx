import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { http } from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import { iTag } from "../../../interfaces/ITag";


export function AdminDishNew() {
  const [newDish, setnewDish] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<iTag[]>([])
  const [tag, setTag] = useState('')
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [restaurant, setRestaurant] = useState('')
  const [image, setImage] = useState<File | null>(null)

  function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData()

    formData.append('nome', newDish)
    formData.append('descricao', description)
    formData.append('tag', tag)
    formData.append('restaurante', restaurant)

    if (image) {
      formData.append('imagem', image)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => {
        setnewDish('')
        setDescription('')
        setTag('')
        setRestaurant('')
        alert('Arquivo enviado com sucesso!')
      })
      .catch(err => console.log(err))

  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files?.length)
      setImage(event.target.files[0])
  }

  useEffect(() => {
    http.get<{ tags: iTag[] }>('tags/')
      .then(response => setTags(response.data.tags))

    http.get<IRestaurante[]>('restaurantes/')
      .then(response => setRestaurants(response.data))
  }, [])

  console.log(restaurants)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography component='h1' variant='h6' >Formulário de Pratos</Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={submitForm}>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={newDish}
          onChange={event => setnewDish(event.target.value)}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          value={description}
          onChange={event => setDescription(event.target.value)}
          fullWidth
          margin="dense"
          required
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={event => setTag(event.target.value)}
          >
            {
              tags.map(item =>
                <MenuItem key={item.id} value={item.value}>
                  {item.value}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Restaurantes</InputLabel>
          <Select
            labelId="select-tag"
            value={restaurant}
            onChange={event => setRestaurant(event.target.value)}
          >
            {
              restaurants.map(item =>
                <MenuItem key={item.id} value={item.id}>
                  {item.nome}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>

        <input
          type='file'
          onChange={handleOnChange}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 1 }}
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  )
}