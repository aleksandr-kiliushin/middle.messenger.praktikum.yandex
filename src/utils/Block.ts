export abstract class Block<TProps> {
  protected props: TProps

  constructor(props: TProps) {
    this.props = props
  }

  public render(): string {
    return ""
  }
}
