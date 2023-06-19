import React from "react";
import { useForm } from "react-hook-form";

export default function LocalidadesRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });
  const onSubmit = (data) => {
    Grabar(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">

        <fieldset disabled={AccionABMC === "C"}>

          {/* campo nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre_Localidad">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("Nombre_Localidad", {
                    required: { value: true, message: "Nombre es requerido" },
                    minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                    },
                    maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                    },
                })}
                autoFocus
                className={
                    "form-control " + (errors?.Nombre_Localidad ? "is-invalid" : "")
                }
            />
            {errors?.Nombre_Localidad && touchedFields.Nombre_Localidad && (
            <div className="invalid-feedback">
                {errors?.Nombre_Localidad?.message}
            </div>
          )}

            </div>
          </div>

          {/* campo CodigoPostal */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="CodigoPostal">
                Codigo Postal<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
            <input
                type="text"
                {...register("CodigoPostal", {
                required: {
                    value: true,
                    message: "Codigo De Barra es requerido",
                },
            })}
            className={
             "form-control" + (errors?.CodigoPostal ? " is-invalid" : "")
            }
        />
        <div className="invalid-feedback">
            {errors?.CodigoPostal?.message}
        </div>

            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver' */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
            <div className="row alert alert-danger mensajesAlert">
                <i className="fa fa-exclamation-sign"></i>
                Revisar los datos ingresados...
            </div>
        )}


      </div>
    </form>
  );
}
