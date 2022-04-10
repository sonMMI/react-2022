import { useReducer } from 'react'
import { toast } from 'react-toastify'
import { initialState, reduce } from '../context/reducers/queryReducer'
import { useMyContext } from '../context/store'

const useMutation = () => {
  const [query, dispatch] = useReducer(reduce, initialState)

  const { setRefetching } = useMyContext()

  const mutate = (callback) => {
    dispatch({ type: 'LOADING' })
    callback()
      .then((res) => {
        dispatch({ type: 'SUCCESS', payload: res.data })
        toast.success('🎉 Successful 🎉')
        setRefetching((prev) => !prev)
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', payload: err.response.data.msg })
        toast.error(`🆘 Error: ${err.response.data.msg} 🆘`)
      })
  }

  return { mutate, ...query }
}

export default useMutation
