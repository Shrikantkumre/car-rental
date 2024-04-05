import React,{ useState, useEffect } from 'react'
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import PuffLoader from "react-spinners/PuffLoader";
const DataFiltering = () => {

    const [active, setActive] = useState('confirm');
    let [loading, setLoading] = useState(true);
    const categorizeData = async () => {
        
      const querySnapshot = await getDocs(collection(db, 'bookings'));

      const completed = [];
      const reject = [];
      const drop = [];
      const confirm = [];
      const pickup = [];
  
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        if (docData.isdropOff === true) {
          completed.push({ ...doc.data(), id: doc.id });
        } else if (docData.isrejected === true) {
            reject.push({ ...doc.data(), id: doc.id });
        } else if (docData.ispickUp === true) {
            drop.push({ ...doc.data(), id: doc.id });
        } else if (docData.confirmed === false) {
            confirm.push({ ...doc.data(), id: doc.id });
        } else {
          pickup.push({ ...doc.data(), id: doc.id });
        }
      });

      return {
        completed,
        reject,
        drop,
        confirm,
        pickup,
      };
    };

    const getData = async () => {
      const { completed, reject, drop, confirm, pickup } =
        await categorizeData();
      return { completed, reject, drop, confirm, pickup };
    };
  
    const [data, setData] = useState({});
  
    const getDataAndSetActive = async () => {
      const { completed, reject, drop, confirm, pickup } =
        await getData();
      const dataMap = { completed, reject, drop, confirm, pickup };
      setData(dataMap);
      setLoading(false);
    };
    useEffect(() => {
      getDataAndSetActive();
    },[]);

    const filteredData = data[active] || [];

    const handleConfirm = async (id)=>{
        setLoading(true);
        const bookingRef = doc(db, "bookings", id);

        if(active=== 'confirm') {
            await updateDoc(bookingRef, {
                confirmed: true
              });
        }else if(active=== 'pickup') {
            await updateDoc(bookingRef, {
                ispickUp: true
              });
        }else if(active === 'drop'){
            await updateDoc(bookingRef, {
                isdropOff: true
              });
        }else if(active === 'reject' || active === 'completed'){
            await updateDoc(bookingRef, {
                confirmed: false,
                isrejected:false,
                ispickUp: false,
                isdropOff: false,
              });
        }


        getDataAndSetActive();
    };

    const handleReject = async (id)=>{
        setLoading(true);
        const bookingRef = doc(db, "bookings", id);
            await updateDoc(bookingRef, {
                isrejected: true
              });

        getDataAndSetActive();
    };

    console.log(data)
    return (
    <div>
        <div className="wrapper">
  <div className="title">
    Admin Panel
  </div>
  <div className="tabs_wrap">
    <ul>
      <li onClick={()=>{setActive("confirm")}} className={`${active==='confirm'?'active':''}`}>Confirm</li>
      <li onClick={()=>{setActive("pickup")}} className={`${active==='pickup'?'active':''}`}>Pick Up</li>
      <li onClick={()=>{setActive("drop")}} className={`${active==='drop'?'active':''}`}>Drop off</li>
      <li onClick={()=>{setActive("reject")}} className={`${active==='reject'?'active':''}`}>Rejected</li>
      <li onClick={()=>{setActive("completed")}} className={`${active==='completed'?'active':''}`}>Completed</li>
    </ul>
  </div>
    {loading && <PuffLoader cssOverride={{margin:'10px auto'}} color="#ff4d30" />}
  
  {!loading && <div className="container-heading">
    <div>User Details</div>
    <div>Car Details</div>
    <div>Actions</div>
  </div>}
  <div className="list-container">
    <ul>

  {!loading && filteredData?.map(({carType,
    pickUp,
    dropOff,
    pickTime,
    dropTime,
    carImg,
    id,
    name,
    lastName,
    phone,
    age,
    email,
    address,
    city,
    zipcode,})=>{

        return <li className="item_wrap male online" key={id}>
        <div className="item">
          <div className="item_left">
            <div className="data">
              <p className="name">{`${name} ${lastName}, ${age}`}</p>
              <p className="distance">{`${phone}, ${email}`}</p>
              <p className="distance">{`${address}, [${city}], ${zipcode}`}</p>
            </div>
          </div>
          <div className="data">
              <p className="name">{`${carImg}`}</p>
              <p className="distance">{`PickUp Date: ${pickTime}`}</p>
              <p className="distance">{`Drop Date ${dropTime}`}</p>
              <p className="distance">{`${pickUp} -> ${dropOff}`}</p>
          </div>
          <div className="item_right">
            <div className="status">
                {active !== 'completed' ?<><button className='reject' onClick={()=>{handleReject(id)}}>Reject</button>
                <button className='confirm' onClick={()=>{handleConfirm(id)}}>Confirm</button></>:<button className='reject' onClick={()=>{handleConfirm(id)}}>Confirm Again</button>}
            </div>
          </div>
        </div>
      </li>
      })}
      {!loading && filteredData?.length < 1 && <div style={{margin:20,textAlign:'center'}}>No data to display</div>}
    </ul>
  </div>
</div>
    </div>
  )
}

export default DataFiltering