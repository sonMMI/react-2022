export const initialState = {
  data: undefined,
  loading: false,
  error: undefined,
}

export function reduce(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, data: undefined, loading: true, error: undefined }
    case 'SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: undefined,
      }
    case 'ERROR':
      return {
        ...state,
        data: undefined,
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}
