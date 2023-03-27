import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function UpdateProd() {

    const { _id } = useParams()
    const api_base = 'http://localhost:3001'
    const [data, setData] = useState({})

    useEffect(() => {
        async function getData() {
            const data = await (await fetch(api_base + `/getProd/${_id}`)).json()
            setData(data)
            console.log(data)
        }

        getData()

    }, [])

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

     function handleInputChange(event) {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    }

    async function updateProducts(){
        await fetch(api_base+`/update/${_id}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name:data.name,
                quantity:data.quantity
            })
        })
    }

    
    return (
        <div className="container">
            <h2>Update Product</h2>
            <div className="reg-form">
                <div className="box-regist-comp">
                    <form>
                        <div class="inputBox">
                            <input type="text" name="name" required onkeyup="this.setAttribute('value', this.value);"
                                value={data.name}  onChange={handleInputChange}/>
                            <label>Product Name</label>
                        </div>
                        <div class="inputBox">
                            <input type="number" name="quantity" required
                                onkeyup="this.setAttribute('value', this.value);" value={data.quantity} onChange={handleInputChange}/>
                            <label>Quantity</label>
                        </div>

                        <Link to={'/'}>
                            <div class="reg-comp-button">
                                <input type="submit" name="sign-in" value="Update" onClick={updateProducts}/>
                            </div>
                        </Link>

                    </form>
                </div>
            </div>


        </div>
    )
}

export default UpdateProd