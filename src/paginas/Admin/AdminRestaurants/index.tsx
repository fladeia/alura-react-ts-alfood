import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import IRestaurante from "../../../interfaces/IRestaurante";
import { http } from "../../../http";

export function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get('restaurantes/')
      .then(response => setRestaurants(response.data))
      .catch(err => console.log(err))
  }, [])

  function deleteRestaurant(restaurantsId: IRestaurante) {
    http.delete(`restaurantes/${restaurantsId.id}/`)
      .then(() => {
        const restaurantsList = restaurants.filter(item => item.id !== restaurantsId.id)
        setRestaurants(restaurantsList)
      })
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            restaurants.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.nome}
                </TableCell>
                <TableCell>
                  <Link to={`/admin/restaurantes/${item.id}`}>editar</Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color="error"
                    onClick={() => deleteRestaurant(item)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}