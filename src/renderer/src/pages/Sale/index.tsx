import { Button } from '@renderer/components/ui/button'

export default function Sale(): JSX.Element {
  return (
    <div>
      <Button onClick={() => window.electron.ipcRenderer.send('printRe')}>Print Recuipt</Button>
    </div>
  )
}
