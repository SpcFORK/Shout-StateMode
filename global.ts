type RemovePrefix<
  P extends string,
  S extends string
> = S extends `${P}${infer R}` ? R : S;

type AddPrefix<
  P extends string,
  S extends string
> = `${P}${S}`;

export type CheckName<Name extends string> = AddPrefix<"check", Name>;
export type UseName<Name extends string> = AddPrefix<"use", Name>;
export type UndoName<Name extends string> = AddPrefix<"undo", Name>;
export type AccessName<Name extends string> = AddPrefix<"access", Name>;
export type LockUseName<Name extends string> = AddPrefix<"lockUse", Name>;
export type ModeName<Name extends string> = AddPrefix<"$$", Name>;

export type Modes = "check" | "use" | "undo" | "access" | "lockUse" | "$$";

export type GetPrefix<Name extends string> = (
  Name extends CheckName<string> ? "check" :
  Name extends UseName<string> ? "use" :
  Name extends UndoName<string> ? "undo" :
  Name extends AccessName<string> ? "access" :
  Name extends LockUseName<string> ? "lockUse" :
  Name extends ModeName<string> ? "$$" :
  never
)

export type GetName<Name extends string> =
  RemovePrefix<GetPrefix<Name>, Name>

export type NameToModes<Name extends string> = (
  `check${Name}` |
  `use${Name}` |
  `undo${Name}` |
  `access${Name}` |
  `lockUse${Name}` |
  `$$${Name}`
)

// Record of NOOP functions
type ModeCTX<Name extends string> = {
  [K in NameToModes<Name>]: () => any
}

export type CtxWithMode<Name extends string> =
  typeof globalThis & ModeCTX<Name>