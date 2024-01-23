export type EmployeeRequest = {
  userId: string;
  companyId: string;
};

export type Employee = EmployeeRequest & {
  id: string;
  userFirstName: string;
  userLastName: string;
};
