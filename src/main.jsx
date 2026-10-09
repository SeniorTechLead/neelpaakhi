import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NeelPaakhiMasterPlan from './MasterPlan.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import Dining from './pages/Dining.jsx'
import Experiences from './pages/Experiences.jsx'
import OurStory from './pages/OurStory.jsx'

const path = window.location.pathname

function App() {
  switch (path) {
    case '/masterplan': return <NeelPaakhiMasterPlan />;
    case '/rooms': return <Rooms />;
    case '/dining': return <Dining />;
    case '/experiences': return <Experiences />;
    case '/our-story': return <OurStory />;
    default: return <Home />;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
