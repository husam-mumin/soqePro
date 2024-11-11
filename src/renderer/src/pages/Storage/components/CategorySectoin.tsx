import { Button } from '@/renderer/components/ui/button'
import { Input } from '@/renderer/components/ui/input'
import { Label } from '@/renderer/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/renderer/components/ui/popover'
import { ScrollArea } from '@/renderer/components/ui/scrollArea'
import { ToggleGroup, ToggleGroupItem } from '@/renderer/components/ui/toggleGroup'
import { ReactElementType } from '@/renderer/types/ReactElementType'
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

type CategoryType = {
  name: string
  quantity: number
  id: number
}

export default function CategorySectoin(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [CategoryList, setCategoryList] = useState<CategoryType[]>([])
  const [categoryName, setCategoryName] = useState<string>('')
  useEffect(() => {
    window.api
      .getCategoris()
      .then((data) => setCategoryList(data))
      .catch((error) => console.log(error))
  }, [])
  return (
    <div className="flex flex-col">
      <div className="w-52  bg-secondary px-4 pt-5 flex-grow  overflow-hidden flex flex-col">
        <h2 className="text-2xl font-bold mb-4">تصنيف</h2>
        <ScrollArea className=" grow max-h-[calc(100vh-10.5rem)] h-[calc(100vh-10.5rem)] ">
          <ToggleGroup type="multiple" className="flex flex-col">
            {CategoryList.map((item) => (
              <ToggleGroupItem
                value={item.id.toString()}
                key={item.id}
                className="w-full py-6 px-4 bg-slate-800 flex rtl:flex-row-reverse justify-between items-center"
              >
                <div className="flex gap-2">{item.name}</div>
                <div className="bg-slate-600 p-2 rounded-full size-6 text-[14px] flex justify-center items-center">
                  {item.quantity}
                </div>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <PopoverTrigger asChild>
              <Button variant={'ghost'} className="w-full h-12 border-2 border-dashed mt-4">
                <PlusIcon className="text-2xl !w-[2rem] !h-[1.5rem]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-3">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">اضافة تصنيف</h4>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center ">
                    <Label htmlFor="CategoryName" className="text-sm">
                      اسم
                    </Label>
                    <Input
                      id="CategoryName"
                      placeholder="Enter the name"
                      className="col-span-2 h-8"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      window.api
                        .insertCategoris(categoryName)
                        .then((e) => {
                          setCategoryList([...CategoryList, e[0]])
                          setIsOpen(false)
                          setCategoryName('')
                        })
                        .catch((error) => {
                          setIsOpen(false)
                        })
                    }}
                  >
                    اضافة
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </ScrollArea>
      </div>
    </div>
  )
}
