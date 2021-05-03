// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useSyncLocalStorageWithState(key, defaultValue = ''){
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if(valueInLocalStorage){
      return JSON.parse(valueInLocalStorage)
    }
    return defaultValue
  });
  React.useEffect(() =>{
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function Greeting({initialName = ''}) {

  //const [name, setName] = React.useState(window.localStorage.getItem('name') || initialName)
  console.log('rendering');

  //extra01
  // function getInitName(){
  //   return window.localStorage.getItem('name') || initialName;
  // }
  // const [name, setName] = React.useState(getInitName);
  // const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName);


  // React.useEffect(() =>{
  //   window.localStorage.setItem('name', name);
  // }, [name])

  const [name, setName] = useSyncLocalStorageWithState('name', initialName);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
