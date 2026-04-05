import { useState } from "react";
import { getCharacteristics } from "../../services/vindecoder";
import type { DecodeVinResponse } from "../../types/decodevin";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [characteristics, setCharacteristics] =
    useState<DecodeVinResponse | null>(null);
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("vin_history");
    return saved ? JSON.parse(saved) : [];
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/[а-яА-ЯёЁіІїЇєЄґҐ]/.test(value)) {
      setError(
        "Please enter only Latin letters and numbers. Cyrillic characters are not allowed.",
      );
      return;
    }

    if (/[^a-zA-Z0-9]/.test(value)) {
      setError(
        "Invalid character. Only Latin letters and numbers are allowed.",
      );
      return;
    }

    if (/[IOQioq]/.test(value)) {
      setError("Letters I, O, and Q are not used in VIN codes.");
    } else {
      setError(null);
    }

    const cleanValue = value.toUpperCase();
    if (cleanValue.length <= 17) {
      setQuery(cleanValue);
    }
  };

  const updateHistory = (newVin: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((v) => v !== newVin);
      const updated = [newVin, ...filtered].slice(0, 3); // Залишаємо тільки перші 3

      localStorage.setItem("vin_history", JSON.stringify(updated));

      return updated;
    });
  };

  const fetchCharacteristics = async (query: string): Promise<void> => {
    setIsLoading(true);
    try {
      const data = await getCharacteristics(query);
      setCharacteristics(data);
      updateHistory(query);
    } catch (err) {
      setError("Failed to fetch vehicle characteristics. Please try again.");
      console.error(err);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length !== 17) {
      setError("VIN must be exactly 17 characters long.");
      return;
    }
    fetchCharacteristics(query);
  };

  return (
    <div>
      <h1>VIN Decoder</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Enter VIN"
          maxLength={17}
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Decoding..." : "Decode VIN"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {history.length > 0 && (
        <div>
          <p>Last searched:</p>
          <div>
            {history.map((vin) => (
              <button
                type="button"
                key={vin}
                onClick={() => {
                  setQuery(vin);
                  fetchCharacteristics(vin);
                }}
              >
                {vin}
              </button>
            ))}
          </div>
        </div>
      )}

      {characteristics?.Results?.length === 0 && !isLoading && (
        <p>No data found for this VIN.</p>
      )}

      {isLoading ? (
        <p>Searching for vehicle data...</p>
      ) : (
        characteristics?.Results && (
          <div>
            <h2>Full Results:</h2>
            <ul>
              {characteristics.Results.filter(
                (result) => result.Value && result.Value.trim() !== "",
              ).map((result, index) => (
                <li key={`${result.VariableId}-${index}`}>
                  <Link to={`/variables/${result.VariableId}`}>
                    <strong>{result.Variable}:</strong>
                  </Link>{" "}
                  {result.Value}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default HomePage;
