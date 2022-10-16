import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { http } from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export function AdminDishes() {
  const [dishes, setDishes] = useState<IPrato[]>([])

  useEffect(() => {
    http.get('pratos/')
      .then(response => setDishes(response.data))
      .catch(err => console.log(err))
  }, [])

  function deleteDishes(dishesId: IPrato) {
    http.delete(`pratos/${dishesId.id}/`)
      .then(() => {
        const dishesList = dishes.filter(item => item.id !== dishesId.id)
        setDishes(dishesList)
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
              Tag
            </TableCell>
            <TableCell>
              Imagem
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
            dishes.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.nome}
                </TableCell>
                <TableCell>
                  {item.tag}
                </TableCell>
                <TableCell>
                  <a href={item.imagem} target='_blank'>imagem</a>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/dishes/${item.id}`}>editar</Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color="error"
                    onClick={() => deleteDishes(item)}
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