import { useState } from "react";
import "./Home.scss";
import { getCharacteristics } from "../../services/vindecoder";
import type { DecodeVinResponse } from "../../types/decodevin";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import VinSearchFormt from "../../components/VinSearchForm/VinSearchForm";
import { useAutoErrorClose } from "../../hooks/useAutoErrorClose";

export const HomePage = () => {
  const [selectedVin, setSelectedVin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [characteristics, setCharacteristics] =
    useState<DecodeVinResponse | null>(null);

  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem("vin_history");
    return saved ? JSON.parse(saved) : [];
  });

  const updateHistory = (newVin: string) => {
    setHistory((prev) => {
      const filtered = prev.filter((v) => v !== newVin);
      const updated = [newVin, ...filtered].slice(0, 3);

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

  useAutoErrorClose(error, setError);

  return (
    <section>
      <h1>VIN Decoder</h1>
      <VinSearchFormt
        onSearch={fetchCharacteristics}
        isLoading={isLoading}
        initialValue={selectedVin}
      />

      {error && <p className="error">{error}</p>}

      {history.length > 0 && (
        <div className="history">
          <p className="history__text">Last searched:</p>
          <div className="history__block">
            {history.map((vin) => (
              <button
                className="history__button"
                type="button"
                key={vin}
                onClick={() => {
                  setSelectedVin(vin);
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
        <p className="no-data">No data found for this VIN.</p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        characteristics?.Results && (
          <div className="vin-result">
            <h2 className="vin-result__header">Full Results:</h2>
            <ul>
              {characteristics.Results.filter(
                (result) => result.Value && result.Value.trim() !== "",
              ).map((result, index) => (
                <li className="vin-result__item" key={`${result.VariableId}-${index}`}>
                  <Link className="vin-result__link" to={`/variables/${result.VariableId}`}>
                    <strong>{result.Variable}:</strong>
                  </Link>{" "}
                  {result.Value}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </section>
  );
};

export default HomePage;
