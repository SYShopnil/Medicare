import React from "react";

export default function ImageUploader({ filePassHandler }) {
  const handleChange = (e) => {
    e.preventDefault();
    // console.log("changed");
    const file = e.target.files[0];

    // console.log(file);
    if (file.name) {
      const { size } = file;
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result);
        filePassHandler({
          base64: reader.result,
          size,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <input
          onChange={handleChange}
          placeholder=""
          type="file"
          className="form-control"
        ></input>
      </div>
    </div>
  );
}
