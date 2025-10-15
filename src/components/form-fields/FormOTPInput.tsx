import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

import { FieldValues, Path, useFormContext } from "react-hook-form";

interface FormOTPInputProps<TFormValues extends FieldValues> {
  name: Path<TFormValues>;
  label?: React.ReactNode;
  description?: string;
  slotCount?: number; // default to 6
  className?: string;
  slotClassName?: string;
}

export default function FormOTPInput<TFormValues extends FieldValues>({
  name,
  label,
  description,
  slotCount = 6,
  className,
  slotClassName,
}: FormOTPInputProps<TFormValues>) {
  const form = useFormContext<TFormValues>();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-center space-y-2">
          {label && <FormLabel className="text-center">{label}</FormLabel>}
          <FormControl>
            <InputOTP
              maxLength={slotCount}
              value={field.value}
              onChange={field.onChange}
              className={className}>
              <InputOTPGroup>
                {Array.from({ length: slotCount }).map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className={slotClassName || "h-12 w-12 text-lg"}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
