export interface EmptyResource {
  status: "idle";
}

export interface LoadingResource {
  status: "loading";
}

export interface ValidResource<T> {
  status: "valid";
  value: T;
}

export interface BrokenResource {
  status: "error";
}

export type Resource<T> = EmptyResource | LoadingResource | ValidResource<T> | BrokenResource;

export function emptyResource(): EmptyResource {
  return {
    status: "idle",
  };
}
