import { Sequelize } from "sequelize-typescript";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "../domain/invoice.entity";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";

describe("Invoice Repository unit test", () => {
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
    const invoice = new InvoiceEntity({
      id: new Id("123"),
      name: "John Doe",
      document: "123456789",
      address: new Address(
        "Rua 1",
        "123",
        "Casa",
        "São Paulo",
        "SP",
        "12345678"
      ),
      items: [
        {
          id: new Id("123"),
          name: "Item 1",
          price: 10,
        },
        {
          id: new Id("456"),
          name: "Item 2",
          price: 20,
        },
      ],
    });

    const repository = new InvoiceRepository();

    await repository.generate(invoice);

    const result = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [{ model: InvoiceItemModel, as: "items" }],
    });

    expect(result.id).toEqual("123");
    expect(result.name).toEqual("John Doe");
    expect(result.document).toEqual("123456789");
    expect(result.street).toEqual("Rua 1");
    expect(result.number).toEqual("123");
    expect(result.complement).toEqual("Casa");
    expect(result.city).toEqual("São Paulo");
    expect(result.state).toEqual("SP");
    expect(result.zipCode).toEqual("12345678");
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id).toEqual("123");
    expect(result.items[0].name).toEqual("Item 1");
    expect(result.items[0].price).toEqual(10);
    expect(result.items[1].id).toEqual("456");
    expect(result.items[1].name).toEqual("Item 2");
    expect(result.items[1].price).toEqual(20);
  });

  it("should find a invoice", async () => {
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

    const repository = new InvoiceRepository();
    const result = await repository.find(invoice.id);

    expect(result.id.id).toEqual("123");
    expect(result.name).toEqual("John Doe");
    expect(result.document).toEqual("123456789");
    expect(result.address.street).toEqual("Rua 1");
    expect(result.address.number).toEqual("123");
    expect(result.address.complement).toEqual("Casa");
    expect(result.address.city).toEqual("São Paulo");
    expect(result.address.state).toEqual("SP");
    expect(result.address.zipCode).toEqual("12345678");
    expect(result.items.length).toEqual(2);
    expect(result.items[0].id.id).toEqual("123");
    expect(result.items[0].name).toEqual("Item 1");
    expect(result.items[0].price).toEqual(10);
    expect(result.items[1].id.id).toEqual("456");
    expect(result.items[1].name).toEqual("Item 2");
    expect(result.items[1].price).toEqual(20);
  });
});
