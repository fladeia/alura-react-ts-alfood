import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";

export function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get('http://localhost:8000/api/v2/restaurantes/')
      .then(response => setRestaurants(response.data))
  }, [])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
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
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}