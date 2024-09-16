import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchInputProps {
    placeholder?: string;
    className?: string;
}

const SearchInput = ({
    placeholder,
    className
}: SearchInputProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="search"
        placeholder={placeholder || "Search..."}
        className={className || 'pl-8'}
      />
    </div>
  )
}

export default SearchInput