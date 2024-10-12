import { Input } from '@zc-ui/input';
import { Dsl, InputDsl } from './dsl';
import { useFormFieldParser } from './form-field-dsl';
import {
  Draggable,
  Sortable,
  UniqueIdentifier,
  useDndMonitor,
} from '@zc-ui/dnd';
import { Form, useForm, z, zodResolver, useController } from '@zc-ui/form';
import React, { createContext, useContext, useState } from 'react';
export function InputParser(props: InputParserProps) {
  const { dsl } = props;
  // 受控模式
  const formFieldParser = useFormFieldParser();
  let field;
  if (formFieldParser) {
    const data = useController({ name: formFieldParser.name });
    field = data.field;
  }
  //

  return (
    <Sortable id={dsl.id}>
      <Input {...field} />
    </Sortable>
  );
}

export interface InputParserProps {
  dsl: InputDsl;
}
