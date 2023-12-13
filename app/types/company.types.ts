export interface Company extends CompanyRequest {
  id: string;
}

export interface CompanyRequest {
  ownerId: string;
  description: string;
  name: string;
}
