import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

export const Search = (prop) => {
  const [rerender, setRerender] = useState(false);
  const [users, setUsers] = useState([]);
  const [condition, setCondition] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/user/')
      .then((res) => setUsers(res.data))
      .catch ((err)=>  console.log(err))
  }, [rerender])

  /*https://www.formget.com/javascript-login-form/ */
  function searchArticles(e){
    console.log(condition);
    console.log({condition: JSON.stringify(condition)});
    if (!Array.isArray(condition)) {
      console.error('condition is not an array');
      return;
    }
    
    axios.post('http://localhost:5000/user/diagnosis', {
      'condition': condition})
      .then((res) => window.$recommended)
      .then(() => window.location = "/summary")
      .catch ((err)=>  console.error(err))
  }

  function selectPatient(e,i){
    if(e.target.checked == true){
      setCondition(condition.concat(users[i].condition))
    }else{
      console.log('No condition');
  }
    
    /*selectPatient(condition+e.)*/
  }

  /* REFER TO Faults.js */
  return (
    <body>
      <div><form id="search_form_id" >
        <div class="search">
          <input id="keyword_id" type="text" class="searchTerm" placeholder="Key Words" onChange={(e) => setCondition(condition.concat(e.target.value))}/>
          <button type="submit" class="searchButton" onClick={(e)=>searchArticles(e)}>🔍</button>
        </div>

        <table class="patient_data"><thead><tr>
          <th class="column_narrow">✅</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th class="column_wide">Condition</th>
        </tr></thead>
      <tbody>
        {users.map((row, i) => (
              <tr key={row.id}>
                <td class="column_narrow"><input type="checkbox" onChange={(e) => selectPatient(e,i)}/></td>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.sex}</td>
                <td class="column_wide">{row.condition}</td>
              </tr>
            ))}
      </tbody>
      </table>
    </form></div>
    
    <div>
    
        
    </div>
    <div class="loader"></div>
    </body>
    )
}