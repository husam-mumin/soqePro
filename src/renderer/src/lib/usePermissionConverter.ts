export function usePermissionConverter(id: number): string {
  window.api.getPermissions().then((data) => {
    const permissionName = data.find((i) => id == i.id)?.name

    if (!permissionName) return ''
    return permissionName
  })
  return ''
}
