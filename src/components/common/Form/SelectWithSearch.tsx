import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/utils/cn";

interface SelectWithSearchProps {
  options: { label: string; value: string }[];
  isLoading?: boolean;
  onSelect: (value: string) => void;
  value?: string;
  placeholder: string;
}

export function SelectWithSearch({
  options,
  onSelect,
  value,
  isLoading = false,
  placeholder,
}: SelectWithSearchProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between bg-muted")}
        >
          {options.find((option) => option.value === value)?.label ??
            placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={"Search..."} className="h-9" />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              {options.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={onSelect}
                >
                  <span>{item.label}</span>
                  <Check
                    className={cn(
                      "ms-auto",
                      item.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <Skeleton className="h-4 w-32" />
    </div>
  );
}
