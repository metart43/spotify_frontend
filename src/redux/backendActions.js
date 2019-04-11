
function createHiddenGem (props) {
return (dispatch) => {
  fetch('http://localhost:3000/hidden_gems',{
    method: 'POST',
    headers: {"Content-type" : 'application/json'},
    body: JSON.stringify({user: {user_id : props.id}})
    })
  }
}

export {createHiddenGem}
