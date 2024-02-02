import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemEntity from "./invoice-item.entity";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: {
    id?: Id;
    name: string;
    price: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class InvoiceEntity extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItemEntity[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items.map((item) => new InvoiceItemEntity(item));
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItemEntity[] {
    return this._items;
  }
}

// Criação de módulo de Invoice

// Neste desafio será necessário criar o módulo completo de invoice - Nota Fiscal do Monolito.

// Para este módulo você precisa utilizar:

// - Os use cases de find e generate
// - Especificar todas as entradas e saídas conforme o DTO exibido ao final deste enunciado.

// Os campos do invoice são:

// id?: Id // criado automaticamente
// name: string
// document: string
// address: Address // value object
// items: InvoiceItems[] // Invoice Items entity
// createdAt?: Date // criada automaticamente
// updatedAt?: Date // criada automaticamente

// * A linguagem de programação para este desafio é TypeScript.
