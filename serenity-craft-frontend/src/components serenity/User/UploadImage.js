import React, { useState, useEffect, createRef } from "react";
import { defaultUserImage } from "util/general";
// import defaultImage from "asstes/img/no-image.jpg";

// Redux
import { useSelector, useDispatch } from  "react-redux";
import { changeImage } from '../../redux/actions/userActions';

// components
import Button from "components/CustomButtons/Button.js";

// Styles

const UploadImage = ({ changeButtonProps, removeButtonProps }) => {
    const dispatch = useDispatch();
    const { credentials } = useSelector((state) => state.user);
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [noImage, setNoImage] = useState(false);
    let fileInput = createRef();

    useEffect(() => {
        setFile(credentials.imageUrl);
        setImagePreviewUrl(credentials.imageUrl);
        setNoImage(credentials.imageUrl === defaultUserImage);
    }, [credentials]);

    const handleImageChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result);
        };
        
        if (file) {
            setNoImage(false);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('image', file, file.name);

        if(imagePreviewUrl !== credentials.imageUrl) dispatch(changeImage(formData));
    };

    const handleRemove = () => {
        setFile(null);
        setImagePreviewUrl(defaultUserImage);
        setNoImage(true);
        fileInput.current.value = null;
    };

    return (
        <div className="text-center">
            <div className="picture-container">
                <div className="picture">
                    <img src={imagePreviewUrl} className="picture-src" alt="..." />
                    <input type="file" onChange={handleImageChange} ref={fileInput} />
                </div>
                <h6 className="description">Choose Picture</h6>
            </div>
            <div>
                {
                    noImage ? null : (
                    <span>
                        <Button {...removeButtonProps} onClick={() => handleRemove()}>
                            <i className="fas fa-times" /> Remove
                        </Button>
                    </span>
                    )
                }
                <Button {...changeButtonProps} disabled={imagePreviewUrl === credentials.imageUrl} onClick={() => handleSubmit()}>
                    UPDATE
                </Button>
            </div>
        </div>
    )
}

export default UploadImage;
