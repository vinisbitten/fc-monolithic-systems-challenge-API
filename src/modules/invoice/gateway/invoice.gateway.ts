import InvoiceEntity from "../domain/invoice.entity";

export default interface InvoiceGateway {
  generate(invoice: InvoiceEntity): Promise<void>;
  find(id: string): Promise<InvoiceEntity>;
}
