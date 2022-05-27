import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Footer from "../components/Footer";
import { Header } from "../components/Header";
import ApiService from "../services/ApiService";

const ResultsPage = () => {
  const [result, setResult] = useState({});
  const request = useOutletContext()[0];

  useEffect(() => {
    search();

    async function search() {
      setResult(await ApiService.findFalcone(request.payload));
    }
  }, [request]);

  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <Header buttonName="Start Again" onClick={back} />
      <br />
      {result.status === "success" && (
        <main style={{ textAlign: "center" }}>
          <p>
            Success! Congractulations on finding Falcone. King shan is mighty
            pleased.
          </p>
          <br />
          <p>Time taken: {request.time}</p>
          <p>Planet Found on: {result.planet_name}</p>
        </main>
      )}
      {result.status === "false" && (
        <main style={{ textAlign: "center" }}>
          <p>
            Failure! Falcone is not on any of the planets searched. She has been
            exiled for another 15 years and King shan has to search for her
            again.
          </p>
        </main>
      )}
      {result.error !== undefined && (
        <main>
          <p>{result.error}</p>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default ResultsPage;
