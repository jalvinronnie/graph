import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';
import { app } from '../../../firebase';
const storageRef = app.storage().ref();

const { Title } = Typography;
const { TextArea } = Input;

const Tags = [
    { key: 1, value: "Digital Painting" },
    { key: 2, value: "Cartoon" },
    { key: 3, value: "Pencil Drawing" },
    { key: 4, value: "Landscape" },
    { key: 5, value: "Logo" },
    { key: 6, value: "Advertisement" },
    { key: 7, value: "Font" }
]

function UploadProductPage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [TagValue, setTagValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onPriceChange = (event) => {
        setPriceValue(event.currentTarget.value)
    }

    const onTagsSelectChange = (event) => {
        setTagValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = async (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !PriceValue ||
            !TagValue || !Images) {
            return alert('fill all the fields first!')
        }

        // upload files to firebase and get download urls.
        const imgURLs = await Promise.all(Images.map(img => {
            return new Promise(async (resolve, reject) => {
                try {
                    const timeStamp = new Date().getTime();
                    const imgName = `${img.name.split('.')[0]}-${timeStamp}.${img.name.split('.')[img.name.split('.').length - 1]}`;
                    const imgStorageRef = storageRef.child(`designs/${imgName}`);

                    await imgStorageRef.put(img);
                    const url = await imgStorageRef.getDownloadURL();
                    resolve(url);

                    console.log(url);
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            })
        }))

        console.log(imgURLs);

        const variables = {
            writer: props.user.userData._id,
            title: TitleValue,
            description: DescriptionValue,
            price: PriceValue,
            images: imgURLs,
            tags: TagValue,
        }

        console.log(variables);

        Axios.post('/api/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Design Product</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />
                <select onChange={onTagsSelectChange} value={TagValue}>
                    {Tags.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadProductPage
