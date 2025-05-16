// src/utils/categoryEnumUtils.ts

export function getEnumKeyByLabel<T extends Record<string, string>>(map: T, label: string): keyof T | null {
    const entry = Object.entries(map).find(([_, v]) => v === label)
    return entry ? entry[0] as keyof T : null
  }