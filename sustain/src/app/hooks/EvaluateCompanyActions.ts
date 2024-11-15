export const FETCH_INIT = "FETCH_INIT";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";

type Action =
  | { type: typeof FETCH_INIT }
  | { type: typeof FETCH_SUCCESS; payload: any }
  | { type: typeof FETCH_FAILURE; error: string };

export type State = {
  isLoading: boolean;
  data: any | null;
  error: string | null;
};

export const evaluateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, isLoading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};
