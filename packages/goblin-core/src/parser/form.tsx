import { Dsl, FormDsl } from '../dsl';
import { Form, useForm, z, zodResolver } from '@zc-ui/form';

import React, { createContext, useContext, useEffect } from 'react';
import { cn } from '@zc-ui/utils';
import { useDslStore } from '../stores';

export interface FormParserProps extends React.PropsWithChildren {
  dsl: FormDsl;
}

export function FormParser(props: FormParserProps) {
  const { children, dsl } = props;

  const formSchemaString = `z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })`;

  // 可以把dsl拿出去

  let gen = new Function('z', `return ${formSchemaString}`);
  const formSchema = gen(z) as z.ZodObject<any, any>;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('h-full bg-gray-50')}
      >
        form
        {children}
      </form>
    </Form>
  );
}
