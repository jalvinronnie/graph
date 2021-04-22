import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = async (files) => {
        try {
            const file = files[0];
            // const timeStamp = new Date().getTime();
            // const fileName = `${file.name.split('.')[0]}-${timeStamp}.${file.name.split('.')[file.name.split('.').length - 1]}`;
            // const fileStorageRef = storageRef.child(`designs/${fileName}`);

            // await fileStorageRef.put(file);
            // const url = await fileStorageRef.getDownloadURL();

            setImages(prev => [...prev, URL.createObjectURL(file)]);
            props.refreshFunction(prev => [...prev, file])

        } catch (error) {
            console.log(error);
            alert('Some problem occurred');
        }
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(prevImages => prevImages.filter((x, index) => index !== currentIndex))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />

                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
