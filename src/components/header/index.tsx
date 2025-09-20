import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  leftNode?: ReactNode
}
export function Header(props: IProps) {
  const { t } = useTranslation()

  return (
    <div className="flex w-full items-center justify-between border bg-amber-400 bg-opacity-70 px-4 py-4 md:px-12">
      {/*<a href="/" className="text-xs md:text-base">*/}
      {/*  Vite React TS Tailwind Starter*/}
      {/*</a>*/}
      {/*<div className="flex items-center gap-4">*/}
      {/*  <LanguageSelector />*/}
      {/*  <Button size={'icon'} asChild className="rounded-full">*/}
      {/*    <a href="https://github.com/Quilljou/vite-react-ts-tailwind-starter" target="_blank" rel="noreferrer">*/}
      {/*      <Github />*/}
      {/*    </a>*/}
      {/*  </Button>*/}
      {/*</div>*/}
      header
    </div>
  )
}
