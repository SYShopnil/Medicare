import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl/baseurl";
import Navbar from "../Home/Navber/Navber";
const Appoinments = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  // view all doctor handler
  const viewAllHandler = async (e, category) => {
    e.preventDefault();
    history.push(`/doctor/show/?category=${category}`);
  };

  //get all category
  useEffect(() => {
    return (async () => {
      try {
        const response = await axios.get(`${baseUrl}/doctor/get/all/category`);
        const { status } = response; //get the status of the response
        if (status == 202) {
          const { allCategory } = response.data; //get the category data from response
          setCategory(allCategory); //set the category
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
      }
    })();
  }, []);
  return (
    <div>
      <Navbar />
      {!isLoading ? (
        <>
          {category.length != 0 ? (
            <>
              <div>
                <h1 className={`text-center mt-2 mb-2`}>Doctor's Category</h1>
              </div>
              <div className={`row container-fluid`}>
                {category.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`col-12 col-md-3  mt-3 text-center`}
                    >
                      <div className="card bg-dark-grey">
                        <div className="card-body">
                          <p className={`text-center`}>{data}</p>
                          <button
                            className={`btn btn-primary`}
                            onClick={(e) => viewAllHandler(e, data)}
                          >
                            View all
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <h1>No category found</h1>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Appoinments;
