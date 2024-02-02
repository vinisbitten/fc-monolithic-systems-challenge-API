import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceEntity from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.usecase.dto";

export default class GenerateInvoiceUseCase {
  private _InvoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._InvoiceRepository = invoiceRepository;
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    );

    const props = {
      id: input.id ? new Id(input.id) : undefined,
      name: input.name,
      document: input.document,
      address,
      items: input.items.map((item) => ({
        id: item.id ? new Id(item.id) : undefined,
        name: item.name,
        price: item.price,
      })),
    };

    const invoice = new InvoiceEntity(props);
    this._InvoiceRepository.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: (invoice.items || []).reduce((acc, item) => acc + item.price, 0),
    };
  }
}
