import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import React from "react";
// import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  // RouterProvider,
  Routes,
  // Link,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  
  const apiKey = process.env.REACT_APP_NEWS_API;
  // const apiKey = process.env.REACT_APP_NEWS_API;
  let pageSize = 6;

  const [state, setState] = useState({
    progress:0
  })

  const setProgress = (progress) => {
    setState({progress: progress});
  }

    return (
      <Router>
        <div>
          <LoadingBar
            color='#f11946'
            progress={state.progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey= {apiKey} key="general" pageSize={pageSize} country="in" category="general" />} /><Route />
            {/* <Route path="/about" element={<News setProgress={setProgress} apiKey= {apiKey} pageSize={pageSize} country="in" category="about"/>} /> */}
            <Route exact path="/business" element={<News setProgress={setProgress} apiKey= {apiKey} key="business" pageSize={pageSize} country="in" category="business" />} /><Route />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey= {apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} /><Route />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey= {apiKey} key="health" pageSize={pageSize} country="in" category="health" />} /><Route />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey= {apiKey} key="science" pageSize={pageSize} country="in" category="science" />} /><Route />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey= {apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} /><Route />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey= {apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} /><Route />
          </Routes>
        </div>
      </Router>
    )

}

export default App;