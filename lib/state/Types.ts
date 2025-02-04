export type SetState<T> = {
    (partial: T | Partial<T> | ((state: T) => T | Partial<T>), replace?: false): void;
    (state: T | ((state: T) => T), replace: true): void;
};

export type GetState<T> = () => T;

export type CreateStateWithInitialValue<InitialState, Slice> = (initialState: InitialState, set: SetState<Slice>, get: GetState<Slice>) => Slice;
export type CreateState<Slice> = (set: SetState<Slice>, get: GetState<Slice>) => Slice;