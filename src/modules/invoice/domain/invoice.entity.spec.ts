import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "./invoice.entity";

describe("Invoice Entity unit test", () => {
  it("should create a invoice", () => {
    const invoice = new InvoiceEntity({
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
          name: "Item 1",
          price: 10,
        },
        {
          name: "Item 2",
          price: 20,
        },
      ],
    });

    expect(invoice.name).toBe("John Doe");
    expect(invoice.document).toBe("123456789");
    expect(invoice.address.street).toBe("Rua 1");
    expect(invoice.address.number).toBe("123");
    expect(invoice.address.complement).toBe("Casa");
    expect(invoice.address.city).toBe("São Paulo");
    expect(invoice.address.state).toBe("SP");
    expect(invoice.address.zipCode).toBe("12345678");
    expect(invoice.items).toHaveLength(2);
    expect(invoice.items[0].name).toBe("Item 1");
    expect(invoice.items[0].price).toBe(10);
    expect(invoice.items[1].name).toBe("Item 2");
    expect(invoice.items[1].price).toBe(20);
  });

  it("should create a invoice with id", () => {
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
          name: "Item 1",
          price: 10,
        },
        {
          name: "Item 2",
          price: 20,
        },
      ],
    });

    expect(invoice.id.id).toBe("123");
  });
});
