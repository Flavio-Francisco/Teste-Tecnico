import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { CustomerRides } from "../../models/rides";

export default function TravelHistory() {
  const [usuarios, setUsuarios] = useState<{ id: number; name: string }[]>([]);
  const [motoristas, setMotoristas] = useState<{ id: number; name: string }[]>(
    []
  );
  const [travelFiltered, setTravelFiltered] = useState<
    CustomerRides | undefined
  >();
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [motoristaSelecionado, setMotoristaSelecionado] = useState<{
    id: number;
    name: string;
  } | null>(null);

  function formatDate(date: string): string {
    const tripDate = new Date(date);

    const day = tripDate.getUTCDate().toString().padStart(2, "0");
    const month = (tripDate.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = tripDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:5000/api/ride");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }
    fetchUser();
  }, []);

  // Atualizar motoristas quando o usuário for selecionado
  useEffect(() => {
    async function fetchMotoristas() {
      if (!usuarioSelecionado) return;
      try {
        const response = await axios.get(
          `http://localhost:5000/api/driver?customer_id=${usuarioSelecionado.id}`
        );
        setMotoristas(response.data);
      } catch (error) {
        console.error("Erro ao carregar motoristas:", error);
      }
    }
    fetchMotoristas();
  }, [usuarioSelecionado]);

  const handleAplicarFiltro = async () => {
    if (!usuarioSelecionado || !motoristaSelecionado) {
      alert("Por favor, selecione um usuário e um motorista.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/ride/${usuarioSelecionado.id}?driver_id=${motoristaSelecionado.id}`
      );
      setTravelFiltered(response.data);
    } catch (error) {
      console.error("Erro ao filtrar viagens:", error);
      alert("Ocorreu um erro ao aplicar o filtro. Tente novamente.");
    }
  };

  return (
    <Box p={4}>
      <div className="flex justify-center">
        <Typography variant="h4" gutterBottom>
          Histórico de Viagens
        </Typography>
      </div>
      <div className="flex flex-row justify-center gap-3 mt-6">
        <Autocomplete
          className="w-4/12"
          options={usuarios}
          getOptionLabel={(option) => option.name}
          value={usuarioSelecionado}
          onChange={(event, newValue) => setUsuarioSelecionado(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecionar Usuário"
              variant="outlined"
            />
          )}
          disablePortal
        />

        <Autocomplete
          className="w-4/12"
          options={motoristas}
          getOptionLabel={(option) => option.name}
          value={motoristaSelecionado}
          onChange={(event, newValue) => setMotoristaSelecionado(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selecionar Motorista"
              variant="outlined"
            />
          )}
          disablePortal
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAplicarFiltro}
        >
          Aplicar Filtro
        </Button>
      </div>

      <TableContainer component={Paper} className="mt-5">
        <Table stickyHeader aria-label="sticky table" className="mt-3">
          <TableHead>
            <TableRow>
              <TableCell>Data e Hora</TableCell>
              <TableCell>Motorista</TableCell>
              <TableCell>Origem</TableCell>
              <TableCell>Destino</TableCell>
              <TableCell>Distância</TableCell>
              <TableCell>Tempo</TableCell>
              <TableCell>Custo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {travelFiltered?.rides ? (
              travelFiltered.rides.map((trip) => (
                <TableRow
                  className="hover:bg-sky-200"
                  role="checkbox"
                  key={trip.id}
                >
                  <TableCell>{formatDate(trip.date)}</TableCell>
                  <TableCell>{trip.driver.name.name}</TableCell>
                  <TableCell>{trip.origin}</TableCell>
                  <TableCell>{trip.destination}</TableCell>
                  <TableCell>{trip.distance}</TableCell>
                  <TableCell>{trip.duration}</TableCell>
                  <TableCell>R$ {trip.value}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhuma viagem encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
