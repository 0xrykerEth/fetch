import './Form.css'
import {useState} from 'react'


const Form = ()=> {
const initialData = {
    title: '',
    date: '',
    director: '',
};

const [data,setData] = useState({
    title : '',
    date : '',
    director : '',
})

const submitHandler = (e)=> {
    e.preventDefault();
    console.log(data)
    setData(initialData);

}

    return(
        <form onSubmit={submitHandler}>
            <label htmlFor="title">Title</label>
            <input id="title" placeholder="Enter Title" type="text" value={data.title} onChange={(e) => setData({...data, title : e.target.value})}/>
            <label htmlFor="date">Date</label>
            <input id="date" placeholder="Enter Date" type="date" value={data.date} onChange={(e) => setData({...data, date : e.target.value})}/>
            <label htmlFor="director">Director</label>
            <input id="director" placeholder="Enter director Name" type="text" value={data.director} onChange={(e) => setData({...data, director : e.target.value})}/>
            <button>Submit</button>
        </form>
    )
}


export default Form;