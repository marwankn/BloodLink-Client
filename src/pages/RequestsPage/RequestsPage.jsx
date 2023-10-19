import { useEffect, useState } from "react";
import CreateRequestForm from "../../components/CreateRequestForm/CreateRequestForm";
import RequestsCard from "../../components/RequestsCard/RequestsCard";
import { getRequests } from "../../utils/apiUtils";

export default function RequestsPage() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRequests()
      .then((response) => {
        if (response.data.message) {
          setMessage(response.data.message);
        } else {
          setData(response.data.requests);
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <RequestsCard message={message} data={data} />
    </>
  );
}
