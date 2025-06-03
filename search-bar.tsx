"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("q", searchQuery)
      router.push(`/?${params.toString()}#products`)
    } else {
      const params = new URLSearchParams(searchParams.toString())
      params.delete("q")
      router.push(`/?${params.toString()}#products`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <div className="flex">
        <Input
          type="text"
          placeholder="Pesquise por produtos"
          className="rounded-r-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4 mr-2" /> Search
        </Button>
      </div>
    </form>
  )
}
