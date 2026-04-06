import { useEffect, useState } from "react";
import "./VinSearchForm.scss";

type VinSearchProps = {
  onSearch: (vin: string) => void;
  isLoading: boolean;
  initialValue?: string;
};

const VinSearchFormt = ({
  onSearch,
  isLoading,
  initialValue = "",
}: VinSearchProps) => {
  const [query, setQuery] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

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

    setQuery(value.toUpperCase());
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length !== 17) {
      setError("VIN must be exactly 17 characters long.");
      return;
    }
    onSearch(query);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} className="input">
        <input
          className="input__field"
          type="text"
          placeholder="Enter VIN"
          maxLength={17}
          minLength={17}
          value={query}
          onChange={handleInputChange}
        />
        <button className="input__button" type="submit" disabled={isLoading}>
          {isLoading ? "Decoding..." : "Decode VIN"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default VinSearchFormt;
