import { Main_Char } from './components/main-char'

export default function Home(): JSX.Element {
  return (
    <div className="flex gap-4">
      <Main_Char className="min-w-[38rem]" />
      <div className="w-52">a</div>
    </div>
  )
}
