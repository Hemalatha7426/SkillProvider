import React, { createContext, useContext, forwardRef, useId } from "react";
import { useForm, Controller, FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils"; // You can replace with your own classnames helper

// FormProvider
const Form = FormProvider;

// --- Contexts ---
const FormFieldContext = createContext({});
const FormItemContext = createContext({});

// --- FormField ---
const FormField = ({ name, control, rules, defaultValue, children }) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => React.cloneElement(children, { field, fieldState })}
      />
    </FormFieldContext.Provider>
  );
};

// --- Hook ---
const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField must be used inside a FormField");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const id = itemContext?.id || fieldContext.name;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// --- FormItem ---
const FormItem = forwardRef(({ className, children, ...props }, ref) => {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

// --- FormLabel ---
const FormLabel = forwardRef(({ className, children, ...props }, ref) => {
  const { formItemId, error } = useFormField();
  return (
    <label
      ref={ref}
      htmlFor={formItemId}
      className={cn("block text-sm font-medium", error && "text-red-600", className)}
      {...props}
    >
      {children}
    </label>
  );
});
FormLabel.displayName = "FormLabel";

// --- FormControl ---
const FormControl = forwardRef(({ field, className, ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField();
  return (
    <input
      ref={ref}
      id={formItemId}
      {...field}
      className={cn(
        "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none",
        error && "border-red-600 focus:ring-red-500",
        className
      )}
      aria-invalid={!!error}
      aria-describedby={!error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// --- FormDescription ---
const FormDescription = forwardRef(({ className, children, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <p ref={ref} id={formDescriptionId} className={cn("text-sm text-gray-500", className)} {...props}>
      {children}
    </p>
  );
});
FormDescription.displayName = "FormDescription";

// --- FormMessage ---
const FormMessage = forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  if (!error) return null;
  return (
    <p ref={ref} id={formMessageId} className={cn("text-sm text-red-600", className)} {...props}>
      {String(error?.message)}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
};
