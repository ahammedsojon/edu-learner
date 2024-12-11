import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
const InputField = ({
  name,
  label,
  form,
}: {
  name: string;
  label: string;
  form: any;
}) => {
  const placeholder = `Course ${label}`;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {name !== "description" ? (
              <Input
                type={name === "price" ? "number" : "text"}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Textarea placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
