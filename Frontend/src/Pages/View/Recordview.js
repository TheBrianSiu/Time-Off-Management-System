import { useMemo,useState,useEffect } from "react";
import { getAllrecords } from "../../Service/UserService";
import Table from "../../Component/Table/Table"


const Recordview = () =>{
    const columns = useMemo(() => [
        {
          Header: "Name",
          accessor: 'firstname'
        },
        {
          Header: "Begin Date",
          accessor: 'begindate',
        }, 
        {
          Header: "End Date",
          accessor: 'enddate',
        },
        {
          Header: "Hours",
          accessor: 'hours',
        },
        {
            Header: "Reason",
            accessor: 'message',
          }
      ], [])

    // const record = [];
    
    // const retrieve = () => record;

    // const getData = () => {
    //     return record;
    //   }   

    // const data = useMemo(()=> getData(), []);

    //   useEffect(() => {
    //     (async () => {
    //       const result = await axios("https://localhost:44327/Submit/get/records");
    //       setData(result.data);
    //     })();
    //   }, []);

    const [data, setData] = useState([]);

    useEffect(()=>{
        getAllrecords()
          .then(users => {
            console.log(users);
            setData(users);
          })
    },[]);
    
    return(
        <div className="min-h-screen bg-gray-100 text-gray-900">
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 spt-4">
          <div className="">
            <h1 className="text-xl font-semibold font-b">submission records</h1>
          </div>
          <div className="mt-6">
            <Table columns={columns} data={data} />
          </div>
        </main>
        </div>
    )

    

}
export default Recordview;