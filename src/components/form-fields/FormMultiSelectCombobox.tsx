import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldValues, Path, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, ChevronDown } from "lucide-react";
import useInfinite from "@/hooks/useInfinite";
import { useState, useMemo } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useTranslations } from "next-intl";
import Spinner from "@/components/ui/spinner";

interface FormInfiniteMultiComboboxProps<
  TFormValues extends FieldValues,
  TData
> {
  label?: React.ReactNode;
  description?: string;
  labelClassName?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  queryKey: string[];
  fetchFn: (
    pageNumber: number,
    search: string
  ) => Promise<IPaginatedResponse<TData>>;
  getOptionLabel: (item: TData) => string;
  getOptionValue: (item: TData) => string | number;
  control?: Control<TFormValues>;
  name: Path<TFormValues>;
  maxDisplayItems?: number;
  showCount?: boolean;
  onOptionsChange?: (options: TData[]) => void;
}

export default function FormInfiniteMultiCombobox<
  TFormValues extends FieldValues,
  TData
>({
  name,
  label,
  description,
  className,
  labelClassName,
  disabled,
  queryKey,
  fetchFn,
  getOptionLabel,
  getOptionValue,
  onOptionsChange,
}: FormInfiniteMultiComboboxProps<TFormValues, TData>) {
  const t = useTranslations("FormMultiSelectCombobox");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isFetching, ref, hasNextPage } = useInfinite<TData>({
    queryKey: [...queryKey, debouncedSearchTerm],
    fetchFn: (pageNumber) => fetchFn(pageNumber, debouncedSearchTerm),
  });

  const form = useFormContext<TFormValues>();

  const options = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  const [open, setOpen] = useState(false);

  useMemo(() => {
    if (onOptionsChange && options.length > 0) {
      onOptionsChange(options);
    }
  }, [options, onOptionsChange]);

  const getSelectedOptionLabels = (selectedValues: (string | number)[]) => {
    return selectedValues
      .map((value) => {
        const option = options.find(
          (opt) => getOptionValue(opt).toString() === value.toString()
        );
        return option && getOptionLabel(option);
      })
      .filter(Boolean);
  };

  // Toggle selection
  const toggleOption = (
    optionValue: string | number,
    currentValues: (string | number)[],
    onChange: (values: (string | number)[]) => void
  ) => {
    const isSelected = currentValues.includes(optionValue);

    if (isSelected) {
      onChange(currentValues.filter((value) => value !== optionValue));
    } else {
      onChange([...currentValues, optionValue]);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const rawValue = field.value as unknown;
        const selectedValues: (string | number)[] = Array.isArray(rawValue)
          ? rawValue
          : typeof rawValue === "string"
          ? rawValue.split(",").filter((v) => v !== "")
          : [];
        return (
          <FormItem className="w-[500px]">
            {description && <FormDescription>{description}</FormDescription>}

            {label && (
              <FormLabel htmlFor={name} className={cn("mb-1", labelClassName)}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id={name}
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-start hover:scale-100 h-auto min-h-[40px] px-3 py-2",
                      selectedValues.length === 0 && "text-muted-foreground",
                      className
                    )}
                    disabled={disabled}>
                    <div className="w-full flex flex-wrap gap-1 items-center justify-between">
                      <div className="flex flex-wrap gap-1 flex-1 min-w-0">
                        {selectedValues.length === 0 ? (
                          <span className="text-muted-foreground">
                            {t("placeholder")}
                          </span>
                        ) : (
                          <>
                            {getSelectedOptionLabels(selectedValues).map(
                              (label, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs max-w-[120px] truncate">
                                  {label}
                                </Badge>
                              )
                            )}
                          </>
                        )}
                      </div>
                      <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder={t("searchPlaceholder")}
                      className="h-9"
                      disabled={disabled}
                      onValueChange={setSearchTerm}
                    />

                    <CommandGroup className="h-60 overflow-auto">
                      {options
                        .filter(
                          (item) =>
                            !selectedValues.includes(getOptionValue(item))
                        )
                        .map((item) => {
                          const value = getOptionValue(item).toString();
                          const label = getOptionLabel(item);
                          const isSelected = selectedValues.some(
                            (v) => v.toString() === value
                          );

                          return (
                            <CommandItem
                              key={value}
                              value={label}
                              onSelect={() => {
                                toggleOption(
                                  value,
                                  selectedValues,
                                  field.onChange
                                );
                              }}
                              className={cn(
                                "flex items-center justify-between cursor-pointer",
                                isSelected && "bg-accent"
                              )}>
                              <span className="flex-1 text-right">{label}</span>
                              <div
                                className={cn(
                                  "flex h-5 w-5 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-primary text-primary"
                                    : "opacity-50 [&_svg]:invisible"
                                )}>
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            </CommandItem>
                          );
                        })}

                      {!isFetching && !hasNextPage && (
                        <div className="text-muted-foreground py-2 text-center text-sm">
                          {t("noMoreData")}
                        </div>
                      )}
                      <div ref={ref} className="h-1" />
                    </CommandGroup>
                    {isFetching ? (
                      <div className="py-6 flex justify-center items-center">
                        <Spinner />
                      </div>
                    ) : (
                      <CommandEmpty>{t("noResults")}</CommandEmpty>
                    )}
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
