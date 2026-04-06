import "./VariableItem.scss";
import type { VehicleVariable } from "../../types/getvehiclevariablelist";
import { Link } from "react-router-dom";

const VariableItem: React.FC<{ variable: VehicleVariable }> = ({
  variable,
}) => {
  return (
    <li className="variable">
      <Link to={`/variables/${variable.ID}`}>
        <h3 className="variable__name">{variable.Name}</h3>
      </Link>

      <div
        className="variable__description"
        dangerouslySetInnerHTML={{ __html: variable.Description }}
      />
      {variable.GroupName && (
        <p className="variable__group">
          <strong>Group:</strong> {variable.GroupName}
        </p>
      )}
    </li>
  );
};

export default VariableItem;
