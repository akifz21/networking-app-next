export interface Company extends CompanyRequest {
  id: string;
  ownerFirstName: string;
  ownerLastName: string;
}

export interface CompanyRequest {
  ownerId: string;
  description: string;
  name: string;
  address: string;
  email: string;
  website: string;
}
