'use client';
import { DndContext } from 'goblin';
export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DndContext id="zc-ui">
      <>{children}</>
    </DndContext>
  );
}
