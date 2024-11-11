import { Input } from '@/renderer/components/ui/input'
import { ReactElementType } from '@/renderer/types/ReactElementType'

type SearchBoxType = {
  setSearch: React.Dispatch<React.SetStateAction<string>>
} & ReactElementType

export default function Searchbox({ className, setSearch }: SearchBoxType): JSX.Element {
  return (
    <Input
      placeholder="البحث"
      className={` 
    
    ${className ? className : ''}`}
      onChange={(e) => setSearch(() => e.target.value)}
    ></Input>
  )
}
