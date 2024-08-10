import { PureComponent } from "react";
import { PropsWithChildren } from "./generic-types";

export class Slot<T = unknown> extends PureComponent<PropsWithChildren<T>> {
  override render () {
    return this.props.children
  }
}