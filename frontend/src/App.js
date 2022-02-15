import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import AddSongForm from "./components/AddSongForm"
import SongList from './components/SongList'
import EditSongForm from './components/EditSongForm'
import SongPage from "./components/SongPage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/addsong" component={AddSongForm} />
        <Route exact path="/" component={SongList} />
        <Route path="/editsong/:id" component={EditSongForm} />
        <Route path="/song/:id" component={SongPage} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
