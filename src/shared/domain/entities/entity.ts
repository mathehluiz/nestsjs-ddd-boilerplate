import { v4 as uuidv4 } from 'uuid';

export abstract class Entity<Props = any> {
  public readonly _id: string;
  public readonly props: Props;

  constructor(props: Props, id?: string) {
    this._id = id || uuidv4();
    this.props = props;
  }

  get id() {
    return this._id;
  }

  toJSON(): Required<Props & { id: string }> {
    return {
      ...this.props,
      id: this._id,
    } as Required<Props & { id: string }>;
  }
}
