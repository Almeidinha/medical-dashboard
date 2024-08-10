// eslint-disable-next-line no-restricted-syntax
import React, { FC as FunctionComponent, ForwardRefExoticComponent, ForwardRefRenderFunction, PropsWithChildren as PWC, PropsWithoutRef, RefAttributes } from 'react'
import { Slot } from './slot';

/** @see https://stackoverflow.com/a/49725198/29182 */
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
T,
Exclude<keyof T, Keys>
> &
{
  [K in Keys]-?: Required<Pick<T, K>> &
    Partial<Record<Exclude<Keys, K>, undefined>>;
}[Keys];

export type MappedEnum<E, T> = {
  [key in keyof E]: T;
}

export type Values<T> = T[keyof T];

export type PropsWithChildren<T = unknown> = PWC<T>

export type FC<
  P = {}, 
  E extends { [x: symbol]: FunctionComponent<PropsWithChildren> | typeof Slot } = {}
> = FunctionComponent<P> 
  & { 
    [key in keyof E]: E[key]
  }

type ExtensibleForwardRef<T, P = {}, E = {}> = ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
  & {
    [key in keyof E]: E[key]
  }

export function forwardRef<T, P = {}, E = {}>(render: ForwardRefRenderFunction<T, P>): ExtensibleForwardRef<T, P, E> {
  return React.forwardRef(render) as ExtensibleForwardRef<T, P, E>
}
