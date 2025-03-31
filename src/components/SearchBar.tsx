import React, { useState } from 'react';
import { Box, TextField, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

type Props = {
  onSearch: (keyword: string, page: number) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('laptop');
  const [page, setPage] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword || page <= 0) return;
    onSearch(keyword.trim(), page);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', gap: 2, mb: 4 }}
    >
      <TextField
        label="Buscar producto"
        variant="outlined"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Página"
        type="number"
        inputProps={{ min: 1 }}
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        sx={{ width: 100 }}
      />

      <Button type="submit" variant="contained" color="primary">
        Buscar
      </Button>
    </Box>
  );
};

export default SearchBar;
