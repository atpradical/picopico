import { useRouter } from 'next/router'

type ParamsType = Record<string, string>

export const usePagesRouterQueryUpdate = () => {
  const router = useRouter()
  const { query } = router

  // Update a query parameter with shallow routing
  const addRouterQueryParamShallow = (params: ParamsType) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...query,
          ...params,
        },
      },
      undefined,
      { shallow: true }
    )
  }

  // Remove a specific query parameter
  const removeRouterQueryParam = (key: string) => {
    // Create a copy of the current query
    const newQuery = { ...query }

    // Delete the specific parameter
    delete newQuery[key]

    // Push the updated query with shallow routing
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    )
  }

  return {
    addRouterQueryParamShallow,
    removeRouterQueryParam,
  }
}
