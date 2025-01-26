import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Highlighter,
  ListOrdered,
  List,
  ListTodo,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CodeViewer } from "@/components/code-viewer";
import { PresetSave } from "@/components/preset-save";
import { PresetShare } from "@/components/preset-share";
import { PresetActions } from "@/components/preset-actions";
import { Separator } from "@/components/ui/separator";
import { Tabs } from "@/components/ui/tabs";
import { MaxLengthSelector } from "@/components/maxlength-selector";
import { ModelSelector } from "@/components/model-selector";
import { models } from "../utils/models";

export default function PlaygroundPage() {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHighlighter, setIsHighlighter] = useState(false);

  const textareaRef = useRef(null);

  const applyStyle = (
    command: "bold" | "italic" | "underline" | "highlighter"
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;
    const range = selection.getRangeAt(0);

    const span = document.createElement("span");

    switch (command) {
      case "bold":
        span.style.fontWeight = isBold ? "normal" : "bold";
        setIsBold(!isBold);
        break;
      case "italic":
        span.style.fontStyle = isItalic ? "normal" : "italic";
        setIsItalic(!isItalic);
        break;
      case "underline":
        span.style.textDecoration = isUnderline ? "none" : "underline";
        setIsUnderline(!isUnderline);
        break;
      case "highlighter":
        span.style.backgroundColor = isHighlighter ? "transparent" : "yellow";
        setIsHighlighter(!isHighlighter);
        break;
      default:
        return;
    }

    range.deleteContents();
    range.insertNode(span);
    span.appendChild(range.extractContents());
  };

  return (
    <>
      <div className="hidden w-full h-full flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Notes</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div>
        </div>
        <Separator />
        <Tabs defaultValue="complete" className="flex-1">
          <div className="container h-full py-6">
            <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
              <div className="hidden flex-col space-y-4 sm:flex md:order-2">
                <div className="grid gap-2">
                  <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    List Items
                  </span>
                </div>
                <div className="flex space-x-4 items-center">
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-6 h-6 rounded-md">
                          <ListOrdered />
                        </div>
                        <ChevronDown />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="p-4">
                        <h4 className="font-medium">Ordered List Styles</h4>
                        <div className="mt-2 space-y-2">
                          <Button
                            variant="outline"
                            className="w-full text-left"
                          >
                            1. 2. 3.
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-6 h-6 rounded-md">
                          <List />
                        </div>
                        <ChevronDown />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="p-4">
                        <h4 className="font-medium">Unordered List Styles</h4>
                        <div className="mt-2 space-y-2">
                          <Button
                            variant="outline"
                            className="w-full text-left"
                          >
                            • Bullet
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-6 h-6 rounded-md">
                          <ListTodo />
                        </div>
                        <ChevronDown />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="p-4">
                        <h4 className="font-medium">Checklist Styles</h4>
                        <div className="mt-2 space-y-2">
                          <Button
                            variant="outline"
                            className="w-full text-left"
                          >
                            ☐ Empty
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex space-x-4 items-center">
                  <ToggleGroup type="multiple" className="flex space-x-2">
                    <ToggleGroupItem
                      value="bold"
                      aria-label="Toggle bold"
                      className={`w-8 h-8 rounded-md border flex items-center justify-center cursor-pointer ${
                        isBold ? "bg-gray-200" : ""
                      }`}
                      onClick={() => applyStyle("bold")}
                    >
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="italic"
                      aria-label="Toggle italic"
                      className={`w-8 h-8 rounded-md border flex items-center justify-center cursor-pointer ${
                        isItalic ? "bg-gray-200" : ""
                      }`}
                      onClick={() => applyStyle("italic")}
                    >
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="underline"
                      aria-label="Toggle underline"
                      className={`w-8 h-8 rounded-md border flex items-center justify-center cursor-pointer ${
                        isUnderline ? "bg-gray-200" : ""
                      }`}
                      onClick={() => applyStyle("underline")}
                    >
                      <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="highlighter"
                      aria-label="Toggle highlighter"
                      className={`w-8 h-8 rounded-md border flex items-center justify-center cursor-pointer ${
                        isHighlighter ? "bg-gray-200" : ""
                      }`}
                      onClick={() => applyStyle("highlighter")}
                    >
                      <Highlighter className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <ModelSelector models={models} />
                <MaxLengthSelector defaultValue={[40]} />
              </div>

              <div className="md:order-1">
                <div className="flex h-[470px] flex-col">
                  <div
                    ref={textareaRef}
                    contentEditable
                    className="h-[470px] p-4 border rounded-md overflow-auto"
                    style={{
                      fontWeight: isBold ? "bold" : "normal",
                      fontStyle: isItalic ? "italic" : "normal",
                      textDecoration: isUnderline ? "underline" : "none",
                      backgroundColor: isHighlighter ? "yellow" : "transparent",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </>
  );
}
