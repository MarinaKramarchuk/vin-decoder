import { useEffect, useState } from "react";
import "./Details.scss";
import { getVehicleVariableList } from "../../services/vindecoder";
import type { VehicleVariable } from "../../types/getvehiclevariablelist";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useAutoErrorClose } from "../../hooks/useAutoErrorClose";

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

  useAutoErrorClose(error, setError);

  const variable = variables.find((v) => v.ID === id);
  return (
    <div>
      <h1>Vehicle Variable Details</h1>

      {error && <p className="error">{error}</p>}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          {variable ? (
            <div key={variable.ID}>
              <h2 className="details__name">{variable.Name}</h2>

              <div
                className="details__description"
                dangerouslySetInnerHTML={{ __html: variable.Description }}
              />

              {variable.GroupName && (
                <p className="details__group">
                  <strong>Group:</strong> {variable.GroupName}
                </p>
              )}
            </div>
          ) : (
            !isLoading && (
              <p className="no-data">Variable with ID {id} not found.</p>
            )
          )}
        </div>
      )}
      <Link className="back-link" to="/variables">
        ← Back to all variables
      </Link>
    </div>
  );
};

export default VariableDetailsPage;
