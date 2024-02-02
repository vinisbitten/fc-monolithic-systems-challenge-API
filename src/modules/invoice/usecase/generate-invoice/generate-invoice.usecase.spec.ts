import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should generate a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      id: "123",
      name: "John Doe",
      document: "123456789",
      street: "Rua 1",
      number: "123",
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678",
      items: [
        {
          id: "123",
          name: "Item 1",
          price: 10,
        },
        {
          id: "456",
          name: "Item 2",
          price: 20,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items).toEqual(input.items);
    expect(result.total).toEqual(30);
  });

  it("should generate a invoice without id", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "John Doe",
      document: "123456789",
      street: "Rua 1",
      number: "123",
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678",
      items: [
        {
          name: "Item 1",
          price: 10,
        },
        {
          name: "Item 2",
          price: 20,
        },
      ],
    };

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.items[0].price).toEqual(input.items[0].price);
    expect(result.items[1].id).toBeDefined();
    expect(result.items[1].name).toEqual(input.items[1].name);
    expect(result.items[1].price).toEqual(input.items[1].price);
    expect(result.total).toEqual(30);
  });
});
