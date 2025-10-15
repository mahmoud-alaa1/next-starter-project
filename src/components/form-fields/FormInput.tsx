import { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { Input } from "../ui/input";

interface FormInputProps<TFormValues extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "defaultValue"> {
  name: Path<TFormValues>;
  label?: React.ReactNode;
  description?: string;
  Icon?: React.ReactNode;
  labelClassName?: string;
  defaultValue?: string | number | readonly string[];
  labelPosition?: "top" | "side";
}

export default function FormInput<TFormValues extends FieldValues>({
  label,
  name,
  Icon,
  description,
  className,
  labelClassName,
  labelPosition = "top",
  ...inputProps
}: FormInputProps<TFormValues>) {
  const form = useFormContext<TFormValues>();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div
            className={`${
              labelPosition == "side" && "flex items-center gap-2"
            }`}>
            {label && (
              <FormLabel htmlFor={name} className={cn(labelClassName)}>
                {label}
              </FormLabel>
            )}
            <FormControl>
              <div className="relative h-fit">
                {Icon && (
                  <div className="absolute inset-y-0 end-2.5 flex items-center justify-center">
                    {Icon}
                  </div>
                )}
                <Input
                  id={name}
                  {...field}
                  {...inputProps}
                  className={cn(Icon && "pe-9  transition-all", className)}
                  value={field.value}
                />
              </div>
            </FormControl>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
