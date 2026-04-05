export interface VehicleVariable {
  ID: number;
  Name: string;
  Description: string;
  GroupName: string | null;
}

export interface VehicleVariablesResponse {
  Count: number;
  Message: string;
  SearchCriteria: null;
  Results: VehicleVariable[];
}
