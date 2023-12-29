import Form from './components/form/form';

import './App.css';
import Cards from './components/cards/cards';

function App() {

  // function send() {
  //   fetch('http://localhost:3003/api/test', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify({title: 'Title', text: 'Text'})
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // }

  // function getAll() {
  //   fetch('http://localhost:3003/api/test', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //   });
  // }

  return (
    <div className="App">
     <Form />
     <Cards />
     {/* <button onClick={() => send()}>SEND TODO</button>
     <button onClick={() => getAll()}>GET ALL TODO</button> */}
    </div>
  );
}

export default App;
