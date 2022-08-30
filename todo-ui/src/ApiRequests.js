import axios from 'axios'

// export function deleteItem (id) {
//   return axios
//     .delete(`https://localhost:7059/api/delete/${id}`)
//     .catch(e => {
//       console.log(e)
//     })
// }

const ApiRequests = {
  deleteItem: (id) => {
    return axios
      .delete(`https://localhost:7059/api/delete/${id}`)
      .catch(e => {
        console.log(e)
      })
  },
  getTodoItems: () => {
    return axios
    .get('https://localhost:7059/api/all-items')
    .catch(e => {
      console.log(e)
    })
  }
}

export default ApiRequests;