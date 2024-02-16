import { shallowObjectDiff } from './shallowObjectDiff'

export const urls = {
  home: '/',

  api: {
    users: {
      me: '/users/me',
      create: '/users',
      completeOnboarding: '/users/onboarding',
      updateSettings: '/users/settings',
    },
  } as const,
} as const

/**
 * Interpolates params into the given path.
 * eg:
 *   urlFor('/:foo/:bar', { foo: 'foo', bar: 'bar' }) => '/foo/bar'
 *   urlFor(urls.capture, { is: 123 }) => '/capture/123'
 */
export function urlFor(
  path: string,
  params?: Record<string, unknown> | null,
  query?: Record<string, unknown>
) {
  const formattedPath = params
    ? Object.keys(params).reduce(
        (accumulator, key) =>
          accumulator.replace(
            `:${key}`,
            encodeURIComponent(String(params[key]))
          ),
        path
      )
    : path

  return formattedPath + (query ? `?${stringifyQuery(query)}` : '')
}

function formatPath(fullPath: string) {
  return (
    fullPath.split('?')[0].split('#')[0].toLowerCase().replace(/\/$/, '') + '/'
  )
}

/**
 * Returns whether `fullPath` is a subpath of `prefixPath`
 * EXCEPTION: if prefixPath is '/' then it must match exactly
 * eg:
 *   isSubPath('/foo/bar', '/foo') => true
 *   isSubPath('/foo/bar', '/foo', ['bar']) => false
 *   isSubPath('/foo/bar', '/') => false
 *   isSubPath('/', '/') => true
 * @param fullPath The path to check.
 * @param prefixPath The root path to check against.
 * @param ignorePaths Prevent true if prefix path contains a string
 */
export function isSubPath(
  fullPath: string,
  prefixPath: string,
  ignorePaths: string[] = []
) {
  // Strip out ignored paths
  const containsIgnored = ignorePaths.some((path) => {
    return fullPath.includes(path)
  })
  if (containsIgnored) return false

  // Strip query params, trailing slash, and hash
  // Add a trailing slash to both so /some is not considered a subpath of /something
  const root = formatPath(prefixPath)
  const subpath = formatPath(fullPath)
  if (root === '/') return subpath === '/'
  return subpath.startsWith(root)
}

/**
 * Given a path like `/my/captures` this returns `/my`. Used to ensure the
 * main nav highlights the correct link.
 * @param path Path to extract prefix from
 * @returns The prefix if it exists or just the root path
 */
export function getPrefixPath(path?: string) {
  if (!path) return '/'
  const [prefix] = path.slice(1).split('/')
  return '/' + prefix ?? ''
}

/**
 * Compares path1 and path2 and determines if they have matching query parameters.
 * @param path1 1st path to check
 * @param path2 2nd path to compare with
 */
export function isMatchingQueryParams(path1: string, path2: string) {
  const queryParams1 = path1.split('?')[1]
  const queryParams2 = path2.split('?')[1]

  // If neither path contains query params, they match
  if (!queryParams1 && !queryParams2) return true

  // If the characters don't match, they're not the same
  if (
    !queryParams1 ||
    !queryParams2 ||
    queryParams1.length !== queryParams2.length
  )
    return false

  // Sort query params and compare
  const queryPairs1 = queryParams1.split('&').sort()
  const queryPairs2 = queryParams2.split('&').sort()

  if (JSON.stringify(queryPairs1) !== JSON.stringify(queryPairs2)) return false

  return true
}

function parseQueryValue(value: string) {
  if (/^(\d+|\d+.\d+)$/.test(value)) {
    return Number(value)
  }

  if (value.toLowerCase() === 'true') {
    return true
  }

  if (value.toLowerCase() === 'false') {
    return false
  }

  return value
}

export function parseQuery<
  T extends Record<string, unknown> = Record<string, unknown>,
>(queryString: string) {
  const params = new URLSearchParams(queryString)
  const result: Record<string, unknown> = {}

  for (const [key, value] of params) {
    const parsed = value.includes(',')
      ? value.split(',').map((value) => parseQueryValue(value))
      : [parseQueryValue(value)]

    if (result[key]) {
      if (Array.isArray(result[key])) {
        ;(result[key] as unknown[]).push(...parsed)
      } else {
        result[key] = [result[key], ...parsed]
      }
    } else {
      result[key] = parsed.length === 1 ? parsed[0] : parsed
    }
  }

  return result as T
}

export function stringifyQuery<T extends object>(
  query: Partial<T>,
  defaults?: T
) {
  const nonDefaultFilters = shallowObjectDiff(query, defaults ?? {})
  const entries = Object.entries(nonDefaultFilters)
    .filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        (Array.isArray(value) ? value.length > 0 : true)
    )
    .map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(',') : String(value),
    ])
  const params = new URLSearchParams(entries)
  params.sort()
  return params.toString()
}
