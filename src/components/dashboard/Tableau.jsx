import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../loading/LoadingSpinner";
// type props = {
//   viewUrl: string;
// };
const getWidth = () =>
  typeof window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const TableauEmbed = ({ viewUrl }) => {
  const [viz, setViz] = useState();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [width, setWidth] = useState(getWidth());
  const [tableauUrl, setTableauUrl] = useState("");
  const vizRef = useRef(null);

  const loadViz = () => {
    const showMobile = width <= 1050;
    setViz(
      // @ts-ignore
      <tableau-viz
        ref={vizRef}
        id="tableauViz"
        src={viewUrl}
        device={showMobile ? "phone" : "desktop"}
        hide-tabs={false}
        token={token}
        toolbar="hidden"
      />
    );
  };

  useEffect(() => {
    if (vizRef.current) {
      setLoading(false);
    } else setLoading(true);
  }, [vizRef.current]);

  useEffect(() => {
    setTableauUrl(viewUrl);
  }, [viewUrl]);

  useEffect(() => {
    fetch("/api/reports")
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw response;
      })
      .then((data) => {
        const newData = data.slice(1, -1);
        setToken(newData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (token) {
      loadViz();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, viewUrl]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) return "Error! " + JSON.stringify(error);

  return (
    <>
      <Helmet>
        <script
          type="module"
          src="https://public.tableau.com/javascripts/api/tableau.embedding.3.1.0.min.js"
          async
        ></script>
      </Helmet>
      {loading ? <LoadingSpinner /> : <div className="mx-0">{viz}</div>}
    </>
  );
};

export default TableauEmbed;
