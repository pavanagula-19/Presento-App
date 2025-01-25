import "./App.css";
import { LoginForm } from "./pages/Login";
// import { AppSidebar } from "./components/dashboard";
// import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
    // <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    //   <div className="w-full max-w-sm">
    //     <SidebarProvider>
    //       <AppSidebar />
    //     </SidebarProvider>
    //   </div>
    // </div>
  );
}

export default App;
