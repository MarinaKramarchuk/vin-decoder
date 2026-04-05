export interface VinVariableResult {
  Value: string | null;
  ValueId: string | null;
  Variable: string;
  VariableId: number;
}

export interface DecodeVinResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VinVariableResult[];
}
