import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

// Redux
import { useSelector } from  "react-redux";

// Components

// template
import Button from "components-template/CustomButtons/Button.js";

const ImageUpload = ({ avatar, addButtonProps, changeButtonProps, removeButtonProps }) => {
  const { credentials } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  let fileInput = createRef();

  useEffect(() => {
    setFile(credentials.imageUrl);
    setImagePreviewUrl(credentials.imageUrl);
  }, [credentials]);

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };

  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="user" />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? "Add Photo" : "Select image"}
          </Button>
        ) : (
          <span>
            <Button {...changeButtonProps} onClick={() => handleClick()}>
              Change
            </Button>
            {avatar ? <br /> : null}
            <Button {...removeButtonProps} onClick={() => handleRemove()}>
              <i className="fas fa-times" /> Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  addButtonProps: PropTypes.object,
  changeButtonProps: PropTypes.object,
  removeButtonProps: PropTypes.object
};

export default ImageUpload;