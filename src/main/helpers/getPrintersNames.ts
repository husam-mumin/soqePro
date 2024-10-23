import { promisify } from 'util'
import { exec } from 'child_process'
const execPromise = promisify(exec)

export const PrinterNameList = async (): Promise<string[]> => {
  try {
    const { stdout } = await execPromise('wmic printer list brief')
    const printerList: string[] = [] // Filter out empty lines
    let stdout2 = stdout.split('  ')
    let j = 0
    stdout2 = stdout2.filter((item) => item)
    for (let i = 0; i < stdout2.length; i++) {
      if (stdout2[i] == ' \r\r\n' || stdout2[i] == '\r\r\n') {
        printerList[j] = stdout2[i + 1]
        j++
      }
    }
    return printerList // Return the list of printers
  } catch (err) {
    console.error('Error retrieving printers:', err)
    return [] // Return an empty array in case of error
  }
}
