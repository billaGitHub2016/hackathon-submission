"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange, Matcher } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
// import the locale object
import { zhCN } from "date-fns/locale";

export function DateRangePicker({
  className,
  value,
  onChange,
  disabled
}: {
  className?: string
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
  disabled?: Matcher
}) {
  return (
    <div className={cn("grid gap-2 max-w-sm", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 max-w-[none]" align="start">
          <div className="flex flex-col sm:flex-row">
            <Calendar
              mode="range"
              defaultMonth={value?.from}
              selected={value}
              onSelect={onChange}
              numberOfMonths={2}
              className="sm:pr-4"
              locale={zhCN}
              disabled={disabled}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
