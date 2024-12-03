import { RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";
import { Label } from "./ui/label";
import { RadioGroup } from "./ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const RadioField = ({
  name,
  label,
  form,
}: {
  name: string;
  label: string;
  form: any;
}) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender</FormLabel>
          <FormControl>
            <RadioGroup value={field.value} onValueChange={field.onChange}>
              <div className="flex gap-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="r2" />
                  <Label htmlFor="r2">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="r3" />
                  <Label htmlFor="r3">Unpublished</Label>
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioField;
