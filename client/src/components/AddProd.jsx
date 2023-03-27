import React, { useState } from 'react'
import '../css/Add.css'
import { CloudinaryContext, Image } from 'cloudinary-react'
import { ScaleLoader } from 'react-spinners'
import { Link } from 'react-router-dom'

function AddProd() {
    const [link1, setLink1] = useState()
    const [isLoading1, setisLoading1] = useState(false)
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const cloudName = 'dfs1badkm'
    const uploadPreset = 'zomato'
    const apiKey = '994475553562163'

    const api_base = 'http://localhost:3001'

    const uploadimage = async (event, num) => {
        console.log("function called")
        const file = event.target.files[0]
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)
        formData.append('cloud_name', cloudName)
        let data = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                setLink1(data.url)
                console.log(data.url)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleFile1Upload = () => {
        setisLoading1(true)
        setLink1(false)
    }

    const sendDetails = async()=>{
        await fetch(api_base+'/add',{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({
                name,
                quantity,
                imageLink:link1
            })
        })
    }

    return (
        <div className="container">
            <h2>Add Product</h2>
            <div className="reg-form">
                <div className="box-regist-comp">
                    <form>
                        <div class="inputBox">
                            <input type="text" name="name" required="" onkeyup="this.setAttribute('value', this.value);"
                                value={name} onChange={(e)=>setName(e.target.value)}/>
                            <label>Product Name</label>
                        </div>
                        <div class="inputBox">
                            <input type="number" name="quantity" required=""
                                onkeyup="this.setAttribute('value', this.value);" value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                            <label>Quantity</label>
                        </div>

                        <input type="file" id='file1' name='file1' onChange={(event) => {
                            handleFile1Upload()
                            uploadimage(event)

                        }} />
                        <div className="load">
                            {isLoading1 && !link1 ? <ScaleLoader
                                color="green"
                                height={13}
                                loading
                                width={6}
                            /> : null}
                        </div>


                        <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                            <div>
                                <Image publicId={link1} className='uploadedimage' />
                            </div>
                        </CloudinaryContext>

                        <div class="reg-comp-button">
                            <Link to={'/'}>
                            <input type="submit"  value="Add" onClick={sendDetails}/>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    )

   
}

export default AddProd