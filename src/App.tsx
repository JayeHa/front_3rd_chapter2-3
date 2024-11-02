import { QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import PostsManagerPage from "./pages/PostsManagerPage.tsx"
import { queryClient } from "./shared/api"
import { Footer, Header } from "./widgets/ui"

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <PostsManagerPage />
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
