"use client"

import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/utils/data-table-view-options"



export function DataTableToolbar(){

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
         
          className="h-8 w-[150px] lg:w-[250px]"
        />
      
       
       
          <Button
            variant="ghost"
            
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
      </div>
      <DataTableViewOptions/>
    </div>
  )
}