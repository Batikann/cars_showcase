'use client'

import { useState, Fragment } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProps } from '@/types'
import { updateSearchParams } from '@/utils'

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const [selectedValue, setSelectedValue] = useState(options[0])
  const router = useRouter()

  interface UpdateParams {
    title: string
    value: string
  }

  const handleUpdateParams = (e: UpdateParams) => {
    const newPathName = updateSearchParams(title, e.value.toString())
    router.push(newPathName, { scroll: false })
  }

  return (
    <div className="w-fit">
      <Listbox
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e)
          handleUpdateParams(e)
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            {selectedValue.title}
            <Image
              src="/chevron-up-down.svg"
              alt="up-down-icon"
              width={20}
              height={20}
              className="object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition duration-105 ease-in"
            leaveFrom="opacity-100"
            leaveTo=" opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? ' text-white bg-blue-600' : 'text-gray-900'
                    }`
                  }
                  key={option.title}
                  value={option}
                >
                  {({ selected }) => {
                    return (
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.title}
                      </span>
                    )
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
export default CustomFilter
