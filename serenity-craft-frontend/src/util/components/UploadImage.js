import React, { useState, useEffect, createRef } from "react";
import { defaultUserImage, defaultBookImage } from "util/general";
// import defaultImage from "asstes/img/no-image.jpg";

// Redux
import { useSelector, useDispatch } from  "react-redux";
import { changeImage, removeImage } from '../../redux/actions/userActions';
import { changeCoverImage, removeCover } from '../../redux/actions/bookActions';

// Components

// template
import Button from "components-template/CustomButtons/Button.js";

// @material-ui core
import { CircularProgress } from "@material-ui/core";

const UploadImage = ({ changeButtonProps, removeButtonProps, bookCover }) => {
    const dispatch = useDispatch();
    const { credentials } = useSelector((state) => state.user);
    const { book, justAdded } = useSelector((state) => state.books);
    const { loadingButton } = useSelector((state) => state.ui);
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [noImage, setNoImage] = useState(false);
    let fileInput = createRef();

    useEffect(() => {
        setFile();
        setImagePreviewUrl(bookCover ? book.coverImage : credentials.imageUrl);
        setNoImage(bookCover ? book.coverImage === defaultBookImage : credentials.imageUrl === defaultUserImage);
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

        if (!bookCover && imagePreviewUrl === defaultUserImage) {
            dispatch(removeImage());
        } else if (bookCover && imagePreviewUrl === defaultBookImage) {
            dispatch(removeCover(book.bookId));
        } else {
            const formData = new FormData();
            formData.append('image', file, file.name);

            if (bookCover && imagePreviewUrl !== book.coverImage) dispatch(changeCoverImage(formData, book.bookId, justAdded));
            else if (imagePreviewUrl !== credentials.imageUrl)  dispatch(changeImage(formData));
        }    
    };

    const handleRemove = () => {
        setFile(null);
        setImagePreviewUrl(bookCover ? defaultBookImage : defaultUserImage);
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
                <Button {...changeButtonProps} disabled={bookCover ? (imagePreviewUrl === book.coverImage) || loadingButton : (imagePreviewUrl === credentials.imageUrl) || loadingButton} onClick={() => handleSubmit()}>
                    UPDATE
                    {
                        loadingButton && (
                            <CircularProgress style={{position: 'absolute'}} size={32} color='secondary' />
                        )
                    }
                </Button>
            </div>
        </div>
    )
}

export default UploadImage;
