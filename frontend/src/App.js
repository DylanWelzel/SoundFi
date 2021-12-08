import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import AddSongForm from "./components/AddSongForm"
import SongList from './components/SongList'
import EditSongForm from './components/EditSongForm'

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
        <Route exact path="/songlist" component={SongList} />
        <Route exact path="/editsong" component={EditSongForm} />
      </Switch>
    </>
  );
}

export default App;
