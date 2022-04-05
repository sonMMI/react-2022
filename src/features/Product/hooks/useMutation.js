import { useState } from 'react'
import { toast } from 'react-toastify'
import { useMyContext } from '../context/store'

const useMutation = () => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { setRefetching } = useMyContext()

  const mutate = (callback) => {
    setLoading(true)
    callback()
      .then((res) => {
        setData(res.data)
        toast.success('🎉 Successful 🎉')
        setRefetching((prev) => !prev)
      })
      .catch((err) => {
        setError(err.response.data.msg)
        toast.error(`🆘 Error: ${err.response.data.msg} 🆘`)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return { mutate, data, loading, error }
}

export default useMutation
