import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image, Link, Droplet } from "lucide-react";

export function CodeViewer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Insert</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[500px]">
        <DialogHeader>
          <DialogTitle>Insert Options</DialogTitle>
          <DialogDescription>
            Choose from the options below to insert content into your editor.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 overflow-y-auto max-h-[400px]">
          <Card className="border rounded-lg shadow-md">
            <CardHeader className="flex items-center gap-4">
              <Image size={24} className="text-blue-500" />
              <CardTitle>Insert Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700"
              />
            </CardContent>
          </Card>

          <Card className="border rounded-lg shadow-md">
            <CardHeader className="flex items-center gap-4">
              <Link size={24} className="text-green-500" />
              <CardTitle>Insert URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input type="url" placeholder="Enter URL" className="w-full" />
            </CardContent>
          </Card>

          <Card className="border rounded-lg shadow-md">
            <CardHeader className="flex items-center gap-4">
              <Droplet size={24} className="text-purple-500" />
              <CardTitle>Insert Watermark</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Enter watermark text" className="w-full" />
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
