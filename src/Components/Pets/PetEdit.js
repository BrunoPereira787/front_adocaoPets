import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/UseFetch";
import PetForm from "../Forms/PetForm";
import { GET_PET, UPDATE_PET } from "../../Api";

const PetEdit = () => {
  const { error, loading, request, data } = useFetch();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const load = async () => {
      const token = window.localStorage.getItem("token");
      const { url, options } = GET_PET(id, token);
      await request(url, options);
    };
    load();
  }, [id, request]);

  const handleSubmit = async (pet) => {
    const formData = new FormData();

    const images = Array.from(pet.images);
    images.forEach((image) => {
      formData.append("images", image);
    });

    formData.append("name", pet.name);
    formData.append("age", pet.age);
    formData.append("weight", pet.weight);
    formData.append("description", pet.description);

    const token = window.localStorage.getItem("token");
    const { url, options } = UPDATE_PET(id, token, formData);

    const { json } = await request(url, options);

    if (json) {
      navigate("/mypets");
    }
  };

  if (data)
    return (
      <section className="container">
        <PetForm
          handleSubmit={handleSubmit}
          loading={loading}
          petData={data.pet}
          error={error}
          btnText="Editar"
        />
      </section>
    );
};

export default PetEdit;
