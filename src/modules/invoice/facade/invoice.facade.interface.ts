export interface FindInvoiceFacadeInputDTO {
  id: string;
}

export interface FindInvoiceFacadeOutputDTO {
  id: string;
  name: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
}

export interface GenerateInvoiceFacadeInputDto {
  id?: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id?: string;
    name: string;
    price: number;
  }[];
}

export default interface FindInvoiceFacadeInterface {
  generate(input: GenerateInvoiceFacadeInputDto): Promise<void>;
  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
}
