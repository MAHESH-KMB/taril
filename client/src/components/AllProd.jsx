import React, { useEffect, useState } from 'react'
import { BiEdit } from 'react-icons/bi'
import '../css/AllProd.css'
import { Link } from 'react-router-dom'

function AllProd() {
    const api_base = 'http://localhost:3001'

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {
            const data = await (await fetch(api_base)).json()
            console.log(data)
            setData(data)
            if (data.length === 0) {
                alert('Inventory is empty')
            }
        }
        fetchData() 
    }, [])

    

  


    return (
        <div className="AllProdContainer">
            <h2>Inventory Management</h2>
            <div className="title">
                <p className='image-title'>Image</p>
                <p>Item Name</p>
                <p>Quantity</p>
                <p></p>
            </div>

            {
                data.map((obj) => {
                    return (
                        <div className="single-product">
                            <div className="item-image">
                                <img src={obj.imageLink} alt="" />
                            </div>
                            <p className="item-name">{obj.name}</p>
                            <p className="item-quantity">{obj.quantity}</p>
                            <Link to={`/update/${obj._id}`}><BiEdit className='editicon' /></Link>
                        </div>
                    )

                })
            }

            <div className="addnew">
                <Link to={'/add'}>
                    <button>Add New</button>
                </Link>
            </div>

        </div>
    )
}

export default AllProd