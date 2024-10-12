import React, { createContext, useContext } from 'react';
import { uniqueId } from '@zc-ui/utils';
import { Dsl, FormFieldDsl } from './dsl';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  useForm,
  useFormContext,
  FormMessage,
  z,
  zodResolver,
} from '@zc-ui/form';
export const FormFieldParserContext = createContext<
  { name: string } | undefined
>(undefined);
export function useFormFieldParser() {
  const formFieldParser = useContext(FormFieldParserContext);
  return formFieldParser;
}

export function FormFieldParser(props: FormFieldParserProps) {
  const { children, dsl } = props;
  const { control } = useFormContext();
  const render: React.ComponentProps<typeof FormField>['render'] = () => {
    return (
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <FormFieldParserContext.Provider value={{ name: dsl.field }}>
            {children}
          </FormFieldParserContext.Provider>
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    );
  };
  return <FormField control={control} name={dsl.field} render={render} />;
}
export interface FormFieldParserProps extends React.PropsWithChildren {
  dsl: FormFieldDsl;
}
