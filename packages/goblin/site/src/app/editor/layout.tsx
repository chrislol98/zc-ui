'use client';
import { Dnd } from 'goblin';
export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Dnd>
      <>{children}</>
    </Dnd>
  );
}
