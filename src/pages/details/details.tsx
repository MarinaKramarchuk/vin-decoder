import { useEffect, useState } from "react";
import { getVehicleVariableList } from "../../services/vindecoder";
import type { VehicleVariable } from "../../types/getvehiclevariablelist";
import { Link, useParams } from "react-router-dom";

export const VariableDetailsPage = () => {
  const { variableId } = useParams<{ variableId: string }>();
  const id = Number(variableId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [variables, setVariables] = useState<VehicleVariable[]>([]);

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
  }, [variableId]);

  const variable = variables.find((v) => v.ID === id);
  return (
    <div>
      <Link to="/variables">← Back to all variables</Link>

      <h1>Vehicle Variable Details</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading ? (
        <p>Downloading for vehicle data...</p>
      ) : (
        <div className="details-container">
          {variable ? (
            <div key={variable.ID}>
              <h2>{variable.Name}</h2>

              <div
                className="variable-description"
                dangerouslySetInnerHTML={{ __html: variable.Description }}
              />

              {variable.GroupName && (
                <p>
                  <strong>Group:</strong> {variable.GroupName}
                </p>
              )}
            </div>
          ) : (
            !isLoading && <p>Variable with ID {id} not found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VariableDetailsPage;
