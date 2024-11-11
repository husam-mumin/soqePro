import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/renderer/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@/renderer/pages/Setting/components/UserTable/column'
import { Input } from '@/renderer/components/ui/input'
import { Button } from '@/renderer/components/ui/button'
import Combobox from './Combobox'
import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/renderer/components/ui/popover'
import { Label } from '@/renderer/components/ui/label'
import { product, provider } from 'src/models/products'
import { toast } from '@/renderer/components/hooks/use-toast'

const formSchema = z.object({
  name: z.string().min(4, {
    message: 'المنتج يجب ان يكون من اربع احرف'
  }),
  price: z.string(),
  providerId: z.number(),
  cost: z.string(),
  quantity: z.string(),
  brandId: z.number(),
  categoryId: z.number()
})
async function getAuthUser(): Promise<User> {
  return await window.api.getAuthUser()
}

export type category = {
  id: number
  name: string
}

export type brand = {
  id: number
  name: string
}

export type setPrps = category | brand

export default function InsertItemFrom({ category }): JSX.Element {
  const [categories, setCategories] = useState<category[]>([])
  const [brands, setBrands] = useState<brand[]>([])
  const [brand, setBrand] = useState<brand | null>()
  const [brandName, setBrandName] = useState<string>()
  const [addBrandOpen, setAddBrandOpen] = useState<boolean>(false)
  const [addProviderOpen, setAddProviderOpen] = useState<boolean>(false)
  const [providers, setProviders] = useState<provider[]>([])
  const [provider, setProvider] = useState<provider>({})

  const [catego, setCategory] = useState<category | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: category
    }
  })
  function gentretyProductCode(): string {
    const productCodeArray: number[] = new Array(10)
    for (let i = 0; i < productCodeArray.length; i++) {
      productCodeArray[i] = Math.floor(Math.random() * 10)
    }

    const productCode = productCodeArray.join('')
    window.api.testProductCode(productCode).then((result) => {
      if (!result) {
        return gentretyProductCode()
      }
    })
    return productCode
  }
  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const user = await getAuthUser()

    if (!user.id) return
    const userid = user.id
    const insertProduct: product = {
      ...values,
      cost: Number.parseInt(values.cost),
      quantity: Number.parseInt(values.quantity),
      price: Number.parseInt(values.price),
      userId: userid,
      product_code: gentretyProductCode()
    }
    window.api.insertProduct(insertProduct)
    toast({
      title: 'اضف منتج بنجاح'
    })
    history.back()
  }
  useEffect(() => {
    if (!catego) return
    form.setValue('categoryId', catego.id)
  }, [catego])

  useEffect(() => {
    if (!brand) return
    form.setValue('brandId', brand.id)
  }, [brand])
  useEffect(() => {
    if (!provider.id) return
    form.setValue('providerId', provider.id)
  }, [provider.id])

  useEffect(() => {
    window.api.getCategoris().then((i) => {
      setCategories(i)
    })
    window.api.getBrand().then((i) => {
      setBrands(i)
    })
    window.api.getProviders().then((i) => {
      setProviders(i)
    })
  }, [])

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المنتج</FormLabel>
                <FormControl>
                  <Input placeholder="شخشير اسود" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6">
            <div>
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تصنيف</FormLabel>
                    <FormControl className="">
                      <Combobox
                        values={catego ? catego.name : ''}
                        data={categories}
                        className="flex"
                        setCateogry={setCategory}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سعر</FormLabel>
                    <FormControl>
                      <Input placeholder="20" type="number" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ماركة</FormLabel>
                    <div className="flex gap-2">
                      <FormControl className="">
                        <Combobox
                          data={brands}
                          values={brand ? brand.name : ''}
                          className="flex"
                          setCateogry={setBrand}
                          {...field}
                        />
                      </FormControl>

                      <Popover
                        open={addBrandOpen}
                        onOpenChange={() => setAddBrandOpen(!addBrandOpen)}
                      >
                        <PopoverTrigger asChild>
                          <Button type="button" variant={'ghost'} size={'icon'}>
                            <Plus />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-3">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">اضاقة تصنيف</h4>
                            </div>
                            <div className="grid gap-2">
                              <div className="grid grid-cols-3 items-center ">
                                <Label htmlFor="CategoryName" className="text-sm">
                                  الاسم
                                </Label>
                                <Input
                                  id="CategoryName"
                                  placeholder="رجالي"
                                  className="col-span-2 h-8"
                                  value={brandName}
                                  onChange={(e) => setBrandName(e.target.value)}
                                />
                              </div>
                              <Button
                                onClick={() => {
                                  if (!brandName) return
                                  window.api
                                    .insertBrand(brandName)
                                    .then((e) => {
                                      if (!e) return

                                      setBrands(() => [...brands, e])

                                      setAddBrandOpen(false)
                                      setBrandName('')
                                      setBrand(e)
                                    })
                                    .catch((error) => {
                                      setAddBrandOpen(false)
                                    })
                                }}
                              >
                                اضافة
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تكلفة</FormLabel>
                    <FormControl>
                      <Input placeholder="60" type="number" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الكمية</FormLabel>
                    <FormControl>
                      <Input placeholder="12" type="number" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="providerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الموزع</FormLabel>
                    <div className="flex gap-2">
                      <FormControl className="">
                        <Combobox
                          data={providers}
                          values={provider.name ? provider.name : ''}
                          className="flex"
                          setCateogry={setProvider}
                          {...field}
                        />
                      </FormControl>

                      <Popover
                        open={addProviderOpen}
                        onOpenChange={() => setAddProviderOpen(!addProviderOpen)}
                      >
                        <PopoverTrigger asChild>
                          <Button type="button" variant={'ghost'} size={'icon'}>
                            <Plus />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="grid gap-3">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">اضافة موزع</h4>
                            </div>
                            <div className="grid gap-2">
                              <div className="grid grid-cols-3 items-center gap-2 ">
                                <Label htmlFor="ProviderName" className="text-sm">
                                  اسم
                                </Label>
                                <Input
                                  id="ProviderName"
                                  placeholder="عبد الرحمن"
                                  className="col-span-2 h-8"
                                  value={provider.name}
                                  onChange={(e) =>
                                    setProvider({ ...provider, name: e.target.value })
                                  }
                                />

                                <Label htmlFor="ProviderPhone" className="text-sm">
                                  رقم
                                </Label>
                                <Input
                                  id="ProviderPhone"
                                  placeholder="091xxxxxx"
                                  className="col-span-2 h-8"
                                  value={provider.phone}
                                  onChange={(e) =>
                                    setProvider({ ...provider, phone: e.target.value })
                                  }
                                />
                              </div>
                              <Button
                                onClick={() => {
                                  if (!provider.name) return
                                  window.api
                                    .insertProvider(provider)
                                    .then((e) => {
                                      if (!e) return
                                      setProviders((i) => [...i, e])
                                      setAddProviderOpen(false)
                                      setProvider(e)
                                    })
                                    .catch((error) => {
                                      setAddBrandOpen(false)
                                    })
                                }}
                              >
                                اضافة
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">حفظ</Button>
        </form>
      </Form>
    </div>
  )
}

/*
 * 11.product_code -
 * 13.Provider -
 * 1.Product Name #
 * 2.category #
 * 5.Price #
 * 6.costs #
 * 7.Quntity #
 * 8.brand #
 * 9.user #
 * 10.imgPath x
 * 12.Entry Date #
 */
