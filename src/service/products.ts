export const fetchProducts = async (keyword: string, page: number = 1) => {
    const res = await fetch(
      `https://axesso-walmart-data-service.p.rapidapi.com/wlm/walmart-search-by-keyword?keyword=${encodeURIComponent(keyword)}&page=${page}&sortBy=best_match`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY!,
          'x-rapidapi-host': 'axesso-walmart-data-service.p.rapidapi.com',
        },
      }
    );
  
    if (!res.ok) {
      throw new Error(`Error al obtener productos: ${res.status}`);
    }
  
    return res.json();
  };
  