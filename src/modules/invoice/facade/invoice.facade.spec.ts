import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { InvoiceModel } from "../repository/invoice.model";

describe("Invoice Facade unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

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

    await facade.generate(input);
    await expect(InvoiceModel.count()).resolves.toBe(1);

    const invoice = await InvoiceModel.findOne({
      where: { document: input.document },
      include: [InvoiceItemModel],
    });

    expect(invoice).toBeDefined();
    expect(invoice.id).toBeDefined();
    expect(invoice.name).toBe(input.name);
    expect(invoice.document).toBe(input.document);
    expect(invoice.street).toBe(input.street);
    expect(invoice.number).toBe(input.number);
    expect(invoice.complement).toBe(input.complement);
    expect(invoice.city).toBe(input.city);
    expect(invoice.state).toBe(input.state);
    expect(invoice.zipCode).toBe(input.zipCode);
    expect(invoice.items).toHaveLength(2);
    expect(invoice.items[0].id).toBeDefined();
    expect(invoice.items[0].name).toBe(input.items[0].name);
    expect(invoice.items[0].price).toBe(input.items[0].price);
  });

  it("should find a invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const invoice = await InvoiceModel.create(
      {
        id: "123",
        name: "John Doe",
        document: "123456789",
        street: "Rua 1",
        number: "123",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
        createdAt: new Date(),
        updatedAt: new Date(),
        items: [
          {
            id: "123",
            name: "Item 1",
            price: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "456",
            name: "Item 2",
            price: 20,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
      { include: [InvoiceItemModel] }
    );

    const result = await facade.find({ id: invoice.id });

    expect(result.id).toBe(invoice.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.street);
    expect(result.address.number).toBe(invoice.number);
    expect(result.address.complement).toBe(invoice.complement);
    expect(result.address.city).toBe(invoice.city);
    expect(result.address.state).toBe(invoice.state);
    expect(result.address.zipCode).toBe(invoice.zipCode);
    expect(result.items[0].id).toBe(invoice.items[0].id);
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBe(invoice.items[1].id);
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(30);
  });
});
