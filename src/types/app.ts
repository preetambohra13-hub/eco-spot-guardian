export type UserRole = "user" | "host";

export type ReportStatus = "reported" | "team_assigned" | "cleaning" | "cleaned";

export type WasteCategory = "Plastic" | "Organic" | "Paper" | "Glass" | "E-Waste" | "Hazardous";

export interface WasteReport {
  id: string;
  imageUrl: string;
  wasteType: WasteCategory;
  binSuggestion: string;
  description: string;
  confidence: number;
  lat: number;
  lng: number;
  address: string;
  timestamp: number;
  status: ReportStatus;
  userId: string;
  userName: string;
  co2Saved: number;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  totalItems: number;
  co2Saved: number;
  joinedAt: number;
}
