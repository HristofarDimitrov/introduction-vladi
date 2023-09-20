import React from "react"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

type Match = {
  position: number
  team: string
  points: number
}

const columnHelper = createColumnHelper<Match>()
