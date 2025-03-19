import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
import Loader from "./components/Loader";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20";

const App = () => {
  const location = useLocation();  
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentUrl, setCurrentUrl] = useState(BASE_URL);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;

  // Fetch Pokemon Data
  const fetchData = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      setNextUrl(data.next);
      setPrevUrl(data.previous);

      // Fetching detailed Pokemon data
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default, // Image URL
          };
        })
      );

      setCards(pokemonDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const url = page === 1 ? BASE_URL : `${BASE_URL}&offset=${(page - 1) * 20}`;
    fetchData(url);
  }, [page]);

  const filteredCards = searchQuery
    ? cards.filter((card) =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cards;

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {loading ? (
        <Loader />
      ) : (
        <>
          {filteredCards.length > 0 ? (
            <CardList cards={filteredCards} />
          ) : (
            <p className="text-center text-gray-500 mt-5">No Pokemon found!</p>
          )}

          {/* Pagination */}
          {!searchQuery && filteredCards.length > 0 && (
            <div className="flex justify-center mt-4 space-x-4">
              {prevUrl && (
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
                  onClick={() => navigate(`?page=${page - 1}`)}
                >
                  Previous
                </button>
              )}
              {nextUrl && (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
                  onClick={() => navigate(`?page=${page + 1}`)}
                >
                  Next
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
