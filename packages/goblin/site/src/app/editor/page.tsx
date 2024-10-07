'use client';
import {
  // shadcn
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  //
  Canvas,
  Left,
  Right,
  useDslStore,
} from 'goblin';

export default function ResizableLayout() {
  const dsl = useDslStore((state) => state.dsl);
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={20} minSize={15}>
          <Left className="h-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={15}>
          <Canvas data={dsl} className="h-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15}>
          <Right className="h-full " />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
