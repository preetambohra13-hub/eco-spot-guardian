export type UserRole = "user" | "host";

export type ReportStatus = "reported" | "team_assigned" | "cleaning" | "cleaned";

export interface WasteReport {
  id: string;
  imageUrl: string;
  wasteType: "Dry" | "Wet";
  binSuggestion: "Blue" | "Green";
  lat: number;
  lng: number;
  address: string;
  timestamp: number;
  status: ReportStatus;
  userId: string;
}

export interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  points: number;
}
