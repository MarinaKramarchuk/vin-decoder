import { useEffect, useState } from "react";
import { getVehicleVariableList } from "../../services/vindecoder";
import type { VehicleVariable } from "../../types/getvehiclevariablelist";
import { Link } from "react-router-dom";

const preparedvariables = (
  vars: VehicleVariable[],
  text: string,
): VehicleVariable[] => {
  return vars.filter((variable) =>
    variable.Name.toLowerCase().includes(text.trim().toLowerCase()),
  );
};

export const VariablesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [variables, setVariables] = useState<VehicleVariable[]>([]);

  const filteredVariables = preparedvariables(variables, query);

  useEffect(() => {
    setIsLoading(true);
    const fetchVariables = async () => {
      try {
        const variables: VehicleVariable[] = await getVehicleVariableList();
        console.log("Vehicle Variables:", variables);
        setVariables(variables);
      } catch (error) {
        console.error("Error fetching vehicle variables:", error);
        setError("Failed to fetch vehicle variables. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVariables();
  }, []);
  return (
    <div>
      <h1>Vehicle Variables</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        value={query}
        placeholder="Enter Variable's Name"
        onChange={(e) => setQuery(e.target.value.trimStart())}
      />

      {isLoading ? (
        <p>Downloading for vehicle data...</p>
      ) : (
        <ul>
          {filteredVariables.map((variable) => (
            <li key={variable.ID}>
              <Link to={`/variables/${variable.ID}`}>
                <h3>{variable.Name}</h3>
              </Link>

              <div
                className="variable-description"
                dangerouslySetInnerHTML={{ __html: variable.Description }}
              />
              {variable.GroupName && (
                <p>
                  <strong>Group:</strong> {variable.GroupName}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VariablesPage;
