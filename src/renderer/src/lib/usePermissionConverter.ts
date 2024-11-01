export function usePermissionConverter(id: number): string {
  window.api.getPermissions().then((data) => {
    const permisisonName = data.find((i) => id == i.id)?.name

    if (!permisisonName) return ''
    return permisisonName
  })
  return ''
}
