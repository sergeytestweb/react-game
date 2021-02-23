
const Table = () => {
   const data = JSON.parse(localStorage.getItem('stat'))
   return (
      <div style={{marginLeft: "35px", display: "flex"}}>
         <ol className="table__win">
            {Array.isArray(data) ?
               data.map((item, index) => {
                  return (
                  <li key={index} style={{color: "white"}}>winner {item.winner}</li>
                  )
               }) : 'no data'
            }
         </ol>
         <ol className="table__win" style={{listStyleType: 'none', marginLeft: '20px'}}>
            {Array.isArray(data) ?
               data.map((item, index) => {
                  return (
                  <li key={index} style={{color: "white"}}> {item.date}</li>
                  )
               }) : 'no data'
            }
         </ol>
      </div>
   )
}
export default Table