import { DataTable } from "@/components/notes-data";


import { UserNav } from "@/components/user-nav";

export default function TaskPage() {
  return (
    <>
      <title>Tasks</title>
      <meta
        name="description"
        content="A task and issue tracker built using Tanstack Table."
      />
      <div className="md:hidden">
        <img
          src="/examples/tasks-light.png"
          width="1280"
          height="998"
          alt="Playground"
          className="block dark:hidden"
        />
        <img
          src="/examples/tasks-dark.png"
          width="1280"
          height="998"
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex">
            <p className="text-muted-foreground">
              Here&apos;s a list of your created Notes!
            </p>
            
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <DataTable />
      </div>
    </>
  );
}
