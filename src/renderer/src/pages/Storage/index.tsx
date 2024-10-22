import { ToggleGroupItem } from '@radix-ui/react-toggle-group'
import { Button } from '@renderer/components/ui/button'
import { ScrollArea } from '@renderer/components/ui/scrollArea'
import { ToggleGroup } from '@renderer/components/ui/toggleGroup'
import { set } from 'date-fns'
import { IceCreamCone, LucideProps, PlusIcon } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react'

type CategoryType = {
  Icon?: JSX.Element
  name: string
  quantity: number
  CategoryId: number
}

const CategoryList: CategoryType[] = [
  {
    Icon: <IceCreamCone />,
    name: 'man',
    quantity: 5,
    CategoryId: 1
  }
]

export default function StroagePage(): JSX.Element {
  const [selectCotegory, setSelectCotegory] = useState<string[]>([])
  return (
    <div className=" flex">
      <div className="flex flex-col">
        <div className="w-52  bg-secondary px-4 pt-5 flex-grow  overflow-hidden flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Category</h2>
          <ScrollArea className=" grow max-h-[calc(100vh-10.5rem)] h-[calc(100vh-10.5rem)] ">
            <ToggleGroup type="multiple">
              {CategoryList.map((item) => (
                <ToggleGroupItem
                  value={item.CategoryId.toString()}
                  key={item.CategoryId}
                  className="w-full py-5 px-4 bg-slate-800 flex justify-between items-center"
                >
                  <div className="flex gap-2">
                    {item.Icon} {item.name}
                  </div>
                  <div className="bg-slate-600 p-2 rounded-full size-6 text-[14px] flex justify-center items-center">
                    {item.quantity}
                  </div>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Button variant={'ghost'} className="w-full h-16 border-2 border-dashed mt-4">
              <PlusIcon className="text-2xl !w-[2rem] !h-[2rem]" />
            </Button>
          </ScrollArea>
        </div>
      </div>
      <div className="flex-grow"></div>
    </div>
  )
}
