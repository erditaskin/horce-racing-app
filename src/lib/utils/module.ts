/**
 * Extracts module name from a file path
 * @param path - File path like './dashboard/index.ts'
 * @returns Module name like 'dashboard'
 */
export const extractModuleName = (path: string): string => {
  return path.split('/')[1]
}

/**
 * Transforms glob import result to use module names as keys
 * @param modulesGlob - Raw glob import result
 * @returns Transformed object with module names as keys
 */
export const transformModules = <T>(
  modulesGlob: Record<string, { default: T }>,
): Record<string, T> => {
  const modules: Record<string, T> = {}

  Object.entries(modulesGlob).forEach(([path, module]) => {
    const moduleName = extractModuleName(path)
    modules[moduleName] = module.default
  })

  return modules
}
