import { deepEqual } from 'fast-equals'

/**
 * Given two objects of the same shape, returns an object containing
 * entries from the first object that do NOT match the second object.
 *
 * NOTE: This is arguably a deep diff, since it does deep comparison
 * but it does not recursively return diffs of nested objects.
 * */
export function shallowObjectDiff<T extends { [K in keyof T]: T[K] }>(
  state: Partial<T>,
  defaults: T
): Partial<T> {
  const result = Object.keys(state).reduce((filteredObject, key) => {
    const stateKey = key as keyof T
    if (!deepEqual(state[stateKey], defaults[stateKey])) {
      filteredObject[stateKey] = state[stateKey]
    }
    return filteredObject
  }, {} as Partial<T>)

  return result
}
