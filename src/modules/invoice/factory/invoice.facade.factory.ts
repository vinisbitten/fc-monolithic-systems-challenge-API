import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacade {
    const repository = new InvoiceRepository();
    const generateUsecase = new GenerateInvoiceUseCase(repository);
    const findUsecase = new FindInvoiceUseCase(repository);
    const facade = new InvoiceFacade({ generateUsecase, findUsecase });

    return facade;
  }
}
