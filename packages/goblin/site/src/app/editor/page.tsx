'use client';
import {
  Canvas,
  Left,
  Right,
} from 'goblin';
import {
  // shadcn
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'components/ui/resizable';

export default function ResizableLayout() {
  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={20} minSize={15}>
          <Left className="h-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={15}>
          <Canvas className="h-full" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={15}>
          <Right className="h-full " />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
