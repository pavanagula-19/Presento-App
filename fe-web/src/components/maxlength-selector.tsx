"use client";

import * as React from "react";
import { SliderProps } from "@radix-ui/react-slider";

import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface MaxLengthSelectorProps {
  defaultValue?: SliderProps["defaultValue"];
}

export function MaxLengthSelector({
  defaultValue = [16],
}: MaxLengthSelectorProps) {
  const [value, setValue] = React.useState<number[]>(defaultValue);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 42) {
      setValue([newValue]);
    }
  };

  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maxlength">Font Size</Label>
              <input
                type="number"
                value={value[0]}
                onChange={handleInputChange}
                className="w-14 rounded-md px-2 py-0.5 text-right text-sm text-muted-foreground border border-input-border no-arrows"
                min={0}
                max={42}
              />
            </div>
            <Slider
              id="maxlength"
              max={42}
              defaultValue={value}
              step={1}
              value={value}
              onValueChange={setValue}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
              aria-label="Maximum Length"
            />
          </div>
        </HoverCardTrigger>
      </HoverCard>
    </div>
  );
}
