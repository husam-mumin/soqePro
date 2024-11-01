import Searchbox from './components/Searchbox'
import CategorySectoin from './components/CategorySectoin'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@renderer/components/ui/button'
import { List, Plus } from 'lucide-react'
import { ReactElementType } from '@renderer/types/ReactElementType'
import { Toggle } from '@renderer/components/ui/toggle'
import ListItem from './components/ListItem'
import { useNavigate } from 'react-router-dom'
import { showProduct } from 'src/models/products'
import { ScrollArea } from '@renderer/components/ui/scrollArea'
import { DataTable } from '@renderer/components/data-table'
import { getDate } from 'date-fns'
import { getProductCulumns } from './components/productTable/column'
import useConfirmationStore from './components/confirmationStore'
import { Input } from '@renderer/components/ui/input'

export type prodcutType = {
  id: number
  name: string
  price: number
  quantity: number
  imagePath: string
  sizes: string[]
  color: string[]
  category: string
}

export type StoragePageProps = ReactElementType

function muckdata() {}

export default function StroagePage({}: StoragePageProps): JSX.Element {
  const [selectCotegory, setSelectCotegory] = useState<string[]>([])
  const [search, setSearch] = useState<string>('')
  const [filterData, setFilterData] = useState<showProduct[]>([])
  const [datas, setDatas] = useState<showProduct[]>([])
  const [labelNumber, setlabelNumber] = useState(0)
  const nav = useNavigate()
  const { openConfirmation } = useConfirmationStore()

  async function getdata(): Promise<void> {
    const products = await window.api.getShowProducts()
    console.log(products)

    setDatas(products)
  }

  useEffect(() => {
    getdata()
  }, [])

  useEffect(() => {
    console.log(datas)
    console.log('search ' + search)

    if (search == '') {
      console.log('inter the if')

      setFilterData(datas)
      return
    }
    const searchText = new RegExp(search, 'g')
    const data = datas.filter((item) => searchText.test(item.productname))
    if (data) return
    setFilterData(data)
  }, [datas, search])

  const onDelete = (id: number): void => {
    window.api.deleteProduct(id)
    getdata().then(() => {})
  }

  const onPrint = (product: showProduct) => {
    const data: {
      marketName?: string
      copies: number
      barcode: string
      name: string
      price: number
    } = {
      marketName: 'بن عمورة',
      copies: labelNumber,
      barcode: product.prodcut_code,
      name: product.productname,
      price: product.price
    }

    openConfirmation({
      title: 'Print Label',
      description: 'are you sure you want to print copis' + labelNumber,
      cancelLabel: 'Cancel',
      actionLabel: 'Print',
      onAction: () => {
        window.api.printLabel(data)
      },
      onCancel: () => {}
    })
  }
  const columns = useMemo(() => getProductCulumns({ onDelete, onPrint }), [labelNumber])
  return (
    <div className="flex grow">
      <CategorySectoin />
      <div className="flex-grow">
        <div>
          <div className="flex gap-4">
            <Searchbox setSearch={setSearch} className="ml-4 w-60" />
            <Button
              onClick={() => {
                nav('/Storage/insertItemFrom')
              }}
            >
              <Plus /> add
            </Button>
            <Toggle
              disabled
              aria-label="Toggle List"
              defaultPressed={true}
              onPressedChange={() => {}}
            >
              <List />
            </Toggle>
          </div>
          <ScrollArea className="max-h-[calc(100vh-10em)] mx-4 my-4">
            <DataTable columns={columns} data={filterData} />
          </ScrollArea>
          <div className="flex gap-2 items-center ml-4">
            Copies
            <Input
              type="number"
              value={labelNumber}
              onChange={(e) => {
                setlabelNumber(parseInt(e.target.value))
              }}
              className="w-12"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
