import type { DecodeVinResponse } from "../types/decodevin";
import type {
  VehicleVariable,
  VehicleVariablesResponse,
} from "../types/getvehiclevariablelist";

const API_BASE_URL = "https://vpic.nhtsa.dot.gov/api/";

export const getCharacteristics = async (
  vin: string,
): Promise<DecodeVinResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}vehicles/decodevin/${vin}?format=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DecodeVinResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching vehicle variables:", error);
    throw error;
  }
};

export const getVehicleVariableList = async (): Promise<VehicleVariable[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}vehicles/getvehiclevariablelist?format=json`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: VehicleVariablesResponse = await response.json();
    return data.Results;
  } catch (error) {
    console.error("Error fetching vehicle variable list:", error);
    throw error;
  }
};
