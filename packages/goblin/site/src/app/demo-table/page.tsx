
'use server'
import { promises as fs } from 'fs';
import path from 'path';
import { taskSchema } from './schema';
import { z } from 'components/ui/form';
import { columns } from './columns';
import { DataTable } from 'components/data-table';
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/demo-table/tasks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}
export default async function DemoTablePage() {
  const tasks = await getTasks();
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8">
      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
