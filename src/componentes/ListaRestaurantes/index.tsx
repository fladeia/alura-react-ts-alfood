import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import IRestaurante from '../../interfaces/IRestaurante';
import iPaginacao from '../../interfaces/IPaginacao'
import Restaurante from './Restaurante';
import style from './ListaRestaurantes.module.scss';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')
  const [prevPage, setPrevPage] = useState('')
  const [searchRestaurant, setSearchRestaurant] = useState('')
  const [sort, setSort] = useState('')

  function seeMore(url: string, options: AxiosRequestConfig = {}) {
    axios.get<iPaginacao<IRestaurante>>(url, options)
      .then(response => {
        setRestaurantes(response.data.results)
        setNextPage(response.data.next)
        setPrevPage(response.data.previous)
      })
      .catch(err => console.log(err))
  }

  function Search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const options = {
      params: {

      } as IParametrosBusca
    }
    if (searchRestaurant) {
      options.params.search = searchRestaurant
    }
    if (sort) {
      options.params.ordering = sort
    }
    seeMore('http://localhost:8000/api/v1/restaurantes/', options)
  }

  useEffect(() => {
    seeMore('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <div className={style.flex}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form
        className={style.flex}
        onSubmit={Search}
      >
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sort}
          label="Age"
          onChange={event => setSort(event.target.value)}
        >
          <MenuItem value=''></MenuItem>
          <MenuItem value='id'>Por Id</MenuItem>
          <MenuItem value='nome'>Por nome</MenuItem>
        </Select>
        <TextField
          id="standard-basic"
          label="Buscar Restaurante"
          variant="standard"
          value={searchRestaurant}
          onChange={event => setSearchRestaurant(event?.target.value)}
        />
        <Button
          variant="text"
          type='submit'
        >
          Buscar
        </Button>
      </form>
    </div>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    <button onClick={() => seeMore(nextPage)} disabled={!nextPage}>Próxima</button>
    <button onClick={() => seeMore(prevPage)} disabled={!prevPage}>Anterior</button>
  </section>)
}

export default ListaRestaurantes